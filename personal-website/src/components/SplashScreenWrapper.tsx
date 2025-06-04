// me when the metadata wont work if client-side rendered
// so i have to do all this :sob:

'use client';

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";

export default function SplashScreenWrapper({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const hasSeenSplash = localStorage.getItem("hasSeenSplash");
        if (!hasSeenSplash) {
            setLoading(true);
            const timer = setTimeout(() => {
                setLoading(false);
                localStorage.setItem("hasSeenSplash", "true");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    if (loading) {
        return (
            <main>
                <SplashScreen />
            </main>
        );
    }

    return <>{children}</>;
}
