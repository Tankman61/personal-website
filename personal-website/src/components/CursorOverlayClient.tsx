'use client';
import { useState, useEffect } from "react";
import CursorOverlay from "./CursorOverlay";

export default function CursorOverlayClient() {
    const [showCursor, setShowCursor] = useState(false);
    const [hasMoved, setHasMoved] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("hasSeenSplash")) {
            setShowCursor(true);
        }

        // Listen for splash completion
        const handler = () => setShowCursor(true);
        window.addEventListener('splash-complete', handler);

        // Detect first mouse movement
        const moveHandler = () => {
            setHasMoved(true);
            window.removeEventListener('mousemove', moveHandler);
        };
        window.addEventListener('mousemove', moveHandler);

        return () => {
            window.removeEventListener('splash-complete', handler);
            window.removeEventListener('mousemove', moveHandler);
        };
    }, []);

    if (!showCursor || !hasMoved) return null;

    return <CursorOverlay />;
}
