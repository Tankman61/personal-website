import React, { ReactNode, useRef, useEffect, useState } from "react";

interface ScrollbarProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    debug?: boolean;
}

export default function Scrollbar({ children, className = "", style = {}, debug = false }: ScrollbarProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    const [thumbHeight, setThumbHeight] = useState(0);
    const [thumbTop, setThumbTop] = useState(0);
    const [scrollable, setScrollable] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [debugInfo, setDebugInfo] = useState({ contentHeight: 0, containerHeight: 0 });

    const updateThumb = () => {
        const container = containerRef.current;
        if (!container) return;

        const contentHeight = container.scrollHeight;
        const containerHeight = container.clientHeight;

        if (debug) {
            setDebugInfo({ contentHeight, containerHeight });
            console.log("Scrollbar Debug:", { contentHeight, containerHeight, isScrollable: contentHeight > containerHeight });
        }

        // Check if content is scrollable
        const isScrollable = contentHeight > containerHeight;
        setScrollable(isScrollable);

        if (!isScrollable) return;

        // Calculate thumb dimensions
        const ratio = containerHeight / contentHeight;
        const height = Math.max(ratio * containerHeight, 30); // Minimum thumb height
        setThumbHeight(height);

        // Calculate thumb position
        const scrollRatio = container.scrollTop / (contentHeight - containerHeight || 1); // Prevent division by zero
        const newThumbTop = scrollRatio * (containerHeight - height);
        setThumbTop(newThumbTop);
    };

    const startDrag = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const startY = e.clientY;
        const startTop = thumbTop;
        setIsDragging(true);

        const container = containerRef.current;
        if (!container) return;

        const onMouseMove = (moveEvent: MouseEvent) => {
            moveEvent.preventDefault();
            moveEvent.stopPropagation();
            const delta = moveEvent.clientY - startY;
            const containerHeight = container.clientHeight;
            const maxThumbTop = containerHeight - thumbHeight;
            const newTop = Math.min(Math.max(startTop + delta, 0), maxThumbTop);

            setThumbTop(newTop);

            // Calculate new scroll position
            const scrollRatio = newTop / (maxThumbTop || 1); // Prevent division by zero
            container.scrollTop = scrollRatio * (container.scrollHeight - containerHeight);
        };

        const onMouseUp = () => {
            setIsDragging(false);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    // Update thumb after content renders
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Force a layout reflow to ensure scrollHeight is calculated correctly
        setTimeout(() => {
            updateThumb();
        }, 0);

        // Use ResizeObserver to detect content changes
        const resizeObserver = new ResizeObserver(() => {
            updateThumb();
        });

        resizeObserver.observe(container);
        container.addEventListener("scroll", updateThumb);
        window.addEventListener("resize", updateThumb);

        // Force periodic updates during initial render
        const initialUpdateInterval = setInterval(() => {
            updateThumb();
        }, 500);

        // Clear interval after 2 seconds
        setTimeout(() => {
            clearInterval(initialUpdateInterval);
        }, 2000);

        return () => {
            clearInterval(initialUpdateInterval);
            resizeObserver.disconnect();
            container.removeEventListener("scroll", updateThumb);
            window.removeEventListener("resize", updateThumb);
        };
    }, [children]); // re-run when children change

    return (
        <div className={`custom-scrollbar-container relative ${className}`} style={{
            ...style,
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div
                ref={containerRef}
                className="overflow-y-auto h-full w-full custom-scrollbar-content"
                style={{ paddingRight: '20px' }}
            >
                {children}
            </div>

            {scrollable && (
                <>
                    <div
                        className="scrollbar-track"
                        style={{
                            zIndex: 50,
                            opacity: 0.3
                        }}
                    />
                    <div
                        ref={thumbRef}
                        className="scrollbar-thumb"
                        style={{
                            height: `${thumbHeight}px`,
                            top: `${thumbTop}px`,
                            zIndex: 50,
                            opacity: 0.8
                        }}
                        onMouseDown={startDrag}
                    />
                </>
            )}

            {debug && (
                <div className="fixed bottom-0 left-0 bg-black text-white p-2 text-xs z-50">
                    Content Height: {debugInfo.contentHeight}px<br/>
                    Container Height: {debugInfo.containerHeight}px<br/>
                    Scrollable: {scrollable ? 'Yes' : 'No'}
                </div>
            )}
        </div>
    );
}
