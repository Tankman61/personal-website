"use client";

import React, { useState, memo } from "react";

interface ButtonProps {
    width?: number;
    height?: number;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({
                                                    width = 120,
                                                    height = 40,
                                                    onClick,
                                                    children,
                                                    className = "",
                                                    ...props
                                                }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleMouseDown = () => {
        setIsClicked(true);
    };

    const handleMouseUp = () => {
        setIsClicked(false);
        onClick?.();
    };

    const handleMouseLeave = () => {
        setIsClicked(false);
        setIsHovered(false);
    };

    const getButtonStyle = () => {
        const baseStyle = {
            width: `${width}px`,
            height: `${height}px`,
            border: "2px solid transparent",
        };

        if (isHovered && !isClicked) {
            return {
                ...baseStyle,
                backgroundColor: "#48495a",
                border: "2px solid cyan",
                background: "#48495a",
            };
        }

        if (isClicked) {
            return {
                ...baseStyle,
                backgroundColor: "#868995",
                background: `
                    linear-gradient(#868995, #868995) padding-box,
                    linear-gradient(162deg, #292a34 0%, #48495b 50%, #d0d0d2 100%) border-box
                `,
            };
        }

        // Default state
        return {
            ...baseStyle,
            backgroundColor: "#48495a",
            background: `
                linear-gradient(#48495a, #48495a) padding-box,
                linear-gradient(163deg, #d0d0d2 0%, #5a5b6b 50%, #292a34 100%) border-box
            `,
        };
    };

    return (
        <button
            className={`
                relative rounded-xs font-medium text-center cursor-pointer
                transition-all duration-100 select-none flex items-center justify-center
                ${className}
            `}
            style={getButtonStyle()}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <span className="text-lg text-white">
                {children}
            </span>
        </button>
    );
};

export const Button = memo(ButtonComponent);