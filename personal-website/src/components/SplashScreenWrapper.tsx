'use client';

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import ExternalPower from "./ExternalPower";

export function SplashScreenWrapper({ children }: { children: React.ReactNode }) {
    const [initialized, setInitialized] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [powerState, setPowerState] = useState<'AVAIL' | 'AUTO'>('AVAIL');

    useEffect(() => {
        const hasSeen = localStorage.getItem("hasSeenSplash");
        if (hasSeen) {
            setShowButton(false);
        }
        setInitialized(true);
    }, []);

    // Startup sequence when powerState transitions to 'AUTO'
    // Startup sequence: powerState must remain 'AUTO' for the full 1s before starting
    useEffect(() => {
        if (powerState === 'AUTO') {
            let cancelled = false;
            const timer = setTimeout(() => {
                if (!cancelled && powerState === 'AUTO') {
                    setShowButton(false);
                    const audio = new Audio('/assets/startup.mp3');
                    audio.play();
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        localStorage.setItem("hasSeenSplash", "true");
                    }, 3000);
                }
            }, 1000);

            return () => {
                cancelled = true;
                clearTimeout(timer);
            };
        }
    }, [powerState]);

    if (!initialized) {
        return (
            <main style={{ backgroundColor: 'black', minHeight: '100vh' }}></main>
        );
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
            <main className="flex items-center justify-center min-h-screen force-default-cursor" style={{ backgroundColor: 'black' }}>
                <ExternalPower powerState={powerState} setPowerState={setPowerState} />
            </main>
        );
    }

    return <>{children}</>;
}
