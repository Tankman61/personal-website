"use client";
import { useEffect, useState } from "react";
import SplashScreen from "../components/SplashScreen";

export default function Home() {
    const [loading, setLoading] = useState(
        typeof window === "undefined"
            ? false
            : !localStorage.getItem("hasSeenSplash")
    );

    useEffect(() => {
        const hasSeenSplash = localStorage.getItem("hasSeenSplash");
        if (!hasSeenSplash) {
            setLoading(true);
            const timer = setTimeout(() => {
                setLoading(false);
                localStorage.setItem("hasSeenSplash", "true");
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <main className="flex items-center justify-center min-h-screen">
            <h1 className="text-4xl">HELLO WORLD</h1>
        </main>
    );
}
