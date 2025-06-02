"use client";

import React, { useState, memo } from "react";

interface ButtonProps {
    width?: number;
    height?: number;
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

export const Button: React.FC<ButtonProps> = memo(
    ({
         width = 120,
         height = 40,
         disabled = false,
         onClick,
         children,
         className = "",
         ...props
     }) => {
        const [isHovered, setIsHovered] = useState(false);
        const [isClicked, setIsClicked] = useState(false);

        const handleMouseDown = () => {
            if (!disabled) {
                setIsClicked(true);
            }
        };

        const handleMouseUp = () => {
            if (!disabled) {
                setIsClicked(false);
                onClick?.();
            }
        };

        const handleMouseLeave = () => {
            setIsClicked(false);
            setIsHovered(false);
        };

        const getBorderStyle = () => {
            if (isHovered && !disabled && !isClicked) {
                return {
                    border: "3px solid cyan",
                };
            } else if (isClicked && !disabled) {
                // Inverse gradient for clicked state
                return {
                    border: "3px solid transparent",
                    background: `
            linear-gradient(#696969, #696969) padding-box,
            linear-gradient(135deg, #000000 0%, #555555 40%, #555555 50%, #ffffff 65%) border-box
          `,
                };
            } else {
                // Normal gradient border
                return {
                    border: "3px solid transparent",
                    background: `
            linear-gradient(#696969, #696969) padding-box,
            linear-gradient(135deg, #ffffff 35%, #555555 50%, #555555 60%, #000000 100%) border-box
          `,
                };
            }
        };

        return (
            <button
                className={`
          relative rounded-sm text-white font-medium text-center cursor-pointer
          transition-all duration-100 select-none flex items-center justify-center
          ${disabled ? "cursor-not-allowed text-gray-400" : "text-white"}
          ${isClicked && !disabled ? "bg-gray-400" : ""}
          ${className}
        `}
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: isClicked && !disabled ? "#a0a0a0" : "#696969",
                    ...getBorderStyle(),
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                disabled={disabled}
                {...props}
            >
        <span className={`text-lg ${disabled ? "text-gray-400" : "text-white"}`}>
          {children}
        </span>
            </button>
        );
    }
);
