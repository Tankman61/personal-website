"use client";
import React, { useEffect, useState } from "react";

export default function ScalingWrapper({ children }: { children: React.ReactNode }) {
    const BASE_WIDTH = 1664;
    const BASE_HEIGHT = 936;

    const [scale, setScale] = useState<number | null>(null);
    const [isMobileMode, setIsMobileMode] = useState(false);
    const [zoomedOut, setZoomedOut] = useState(false);

    useEffect(() => {
        function handleResize() {
            const aspectRatio = window.innerWidth / window.innerHeight;
            const mobileLike = aspectRatio < 1 || window.innerWidth < 800;
            setIsMobileMode(mobileLike);

            if (mobileLike) {
                setZoomedOut(window.innerWidth < 700 || window.innerHeight < 500);
            } else {
                const scaleX = window.innerWidth / BASE_WIDTH;
                const scaleY = window.innerHeight / BASE_HEIGHT;
                setScale(Math.min(scaleX, scaleY));
            }
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Wait until client calculation is done to render
    if (scale === null && !isMobileMode) {
        return null;
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {isMobileMode ? (
                <div
                    style={{
                        width: zoomedOut ? "150vw" : "100vw",
                        transform: zoomedOut ? "scale(0.5)" : "scale(1)",
                        transformOrigin: "top center",
                    }}
                >
                    {children}
                </div>
            ) : (
                <div
                    style={{
                        width: BASE_WIDTH,
                        height: BASE_HEIGHT,
                        transform: `scale(${scale})`,
                        transformOrigin: "top center",
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    );
}
