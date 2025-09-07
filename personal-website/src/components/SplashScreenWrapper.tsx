'use client';

import { useEffect, useRef, useState } from 'react';
import SplashScreen from './SplashScreen';
import ExternalPower from './ExternalPower';

export function SplashScreenWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [powerState, setPowerState] = useState<'AVAIL' | 'AUTO'>('AVAIL');
  const [spamCount, setSpamCount] = useState(0);
  const [alert, setAlert] = useState<'none' | 'caution' | 'warning'>('none');

  const alertAudioRef = useRef<HTMLAudioElement | null>(null);

  // Ensure client-only logic runs after mount to avoid SSR/client mismatch
  useEffect(() => {
    setMounted(true);
    const hasSeen = localStorage.getItem('hasSeenSplash');
    setShowButton(!hasSeen);
  }, []);

  // Startup sequence
  useEffect(() => {
    if (!mounted) return;
    if (powerState === 'AUTO' && spamCount < 7) {
      let cancelled = false;
      const timer = setTimeout(() => {
        if (!cancelled && powerState === 'AUTO') {
          setShowButton(false);
          const audio = new Audio('/assets/sounds/startup.mp3');
          audio.volume = 0.5;
          // play may fail without user gesture; ignore errors
          audio.play().catch(() => {});
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            localStorage.setItem('hasSeenSplash', 'true');

            // Notify other components immediately
            window.dispatchEvent(new Event('splash-complete'));
          }, 3000);
        }
      }, 1000);

      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }
  }, [powerState, spamCount, mounted]);

  // Play looped alert sound if spam gets too high
  useEffect(() => {
    if (!mounted) return;
    if (alert === 'warning') {
      if (!alertAudioRef.current) {
        const audio = new Audio('/assets/sounds/masterwarning.mp3');
        audio.loop = true;
        audio.volume = 0.5;
        alertAudioRef.current = audio;
        audio.play().catch(() => {});
      }
    } else {
      if (alertAudioRef.current) {
        alertAudioRef.current.pause();
        alertAudioRef.current.currentTime = 0;
        alertAudioRef.current = null;
      }
    }
  }, [alert, mounted]);

  const handlePowerStateChange = (state: 'AVAIL' | 'AUTO') => {
    if (state === 'AUTO') {
      setSpamCount((prev) => {
        const newCount = prev + 1;
        if (newCount === 3) {
          setAlert('caution');
        } else if (newCount >= 7) {
          setAlert('warning');
        }
        return newCount;
      });
    }
    setPowerState(state);
  };

  // Render nothing special until mounted to keep server/client HTML identical
  if (!mounted) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <main>
        <SplashScreen />
      </main>
    );
  }

  if (showButton) {
    return (
      <main
        className="flex items-center justify-center min-h-screen force-default-cursor"
        style={{ backgroundColor: 'black' }}
      >
        <div className="absolute top-10 text-white bg-black p-2 rounded shadow-md">
          EXTERNAL POWER IS AVAILABLE: POWER ON THE PORTFOLIO
        </div>
        {alert === 'caution' && (
          <div className="absolute bottom-10 text-amber-500 bg-black p-2 rounded shadow-md">
            WAIT A SECOND INSTEAD OF SPAMMING THE BUTTON
          </div>
        )}
        {alert === 'warning' && (
          <div className="absolute bottom-10 text-red-600 bg-black p-2 rounded shadow-md">
            BRUH :/ (REFRESH PAGE TO RESET)
          </div>
        )}
        <ExternalPower powerState={powerState} setPowerState={handlePowerStateChange} />
      </main>
    );
  }

  return <>{children}</>;
}
