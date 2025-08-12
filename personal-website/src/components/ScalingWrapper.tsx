"use client";

// with this scaling wrapper i need to fix the weird svg clipping between tabs - just make the tab fills extra long
import React, { useEffect, useState } from "react";

export default function ScalingWrapper({ children }: { children: React.ReactNode }) {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        function handleResize() {
            setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            id="scaling-wrapper"
            style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: "1920px",
                height: "1080px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {children}
        </div>
    );
}