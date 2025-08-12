"use client";

// with this scaling wrapper i need to fix the weird svg clipping between tabs - just make the tab fills extra long
import React, { useEffect, useState } from "react";

export default function ScalingWrapper({ children }: { children: React.ReactNode }) {
    const [zoomedOut, setZoomedOut] = useState(false);

    useEffect(() => {
        function handleResize() {
            // Example threshold: width < 700px or height < 500px triggers zoom out
            setZoomedOut(window.innerWidth < 700 || window.innerHeight < 500);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            id="scaling-wrapper"
            style={{
                zoom: zoomedOut ? 0.3 : 1,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {children}
        </div>
    );
}