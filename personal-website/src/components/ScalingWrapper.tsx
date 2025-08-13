"use client";
// this needs to be fixed - certain zooms break the layout/clip into stuff
import React, { useEffect, useState } from "react";

export default function ScalingWrapper({ children }: { children: React.ReactNode }) {
    const [zoomedOut, setZoomedOut] = useState(false);

    useEffect(() => {
        function handleResize() {
            setZoomedOut(window.innerWidth < 700 || window.innerHeight < 500);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100vw",
                height: "100vh",
            }}
        >
            <div
                style={{
                    width: zoomedOut ? "150vw" : "100vw",
                    transform: zoomedOut ? "scale(0.5)" : "scale(1)",
                    transformOrigin: "top center",
                }}
            >
                {children}
            </div>
        </div>


    );
}
