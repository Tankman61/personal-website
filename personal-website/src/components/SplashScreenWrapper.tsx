'use client';

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import ExternalPower from "./ExternalPower";

export function SplashScreenWrapper({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [powerState, setPowerState] = useState<'AVAIL' | 'AUTO'>('AVAIL');

    // Startup sequence when powerState transitions to 'AUTO'
    useEffect(() => {
        if (powerState === 'AUTO') {
            setTimeout(() => {
                setShowButton(false);
                const audio = new Audio('/assets/startup.mp3');
                audio.play();
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    localStorage.setItem("hasSeenSplash", "true");
                }, 3000);
            }, 1000);
        }
    }, [powerState]);

    useEffect(() => {
        const hasSeenSplash = localStorage.getItem("hasSeenSplash");
        if (hasSeenSplash) {
            setShowButton(false);
        }
    }, []);

    if (loading) {
        return (
            <main>
                <SplashScreen />
            </main>
        );
    }

    if (showButton) {
        return (
            <main className="flex items-center justify-center min-h-screen">
                <ExternalPower
                    powerState={powerState}
                    setPowerState={setPowerState}
                />
            </main>
        );
    }

    return <>{children}</>;
}
