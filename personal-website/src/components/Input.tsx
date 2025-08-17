// FIXME: FIX THE INPUT COLOR SCHEMA AND REMOVE ANY VIBECODE HALLUCINATIONS
"use client";

import React, { useState, memo, useRef } from "react";

interface InputProps {
    width?: number;
    height?: number;
    fontSize?: number;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onEnter?: (value: string) => void;
    className?: string;
}

const InputComponent: React.FC<InputProps> = ({
                                                  width = 200,
                                                  height = 40,
                                                  fontSize = 16,
                                                  placeholder = "",
                                                  value: controlledValue,
                                                  onChange,
                                                  onEnter,
                                                  className = "",
                                                  ...props
                                              }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState("");
    const [isCommitted, setIsCommitted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    };

    const handleFocus = () => {
        setIsFocused(true);
        setIsCommitted(false);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsCommitted(true);
            setIsFocused(false);
            onEnter?.(value);
            inputRef.current?.blur();
        }
    };

    const getInputStyle = () => {
        const baseStyle = {
            width: `${width}px`,
            height: `${height}px`,
            fontSize: `${fontSize}px`,
            border: "2px solid transparent",
            backgroundColor: "black",
        };

        if (isCommitted) {
            return {
                ...baseStyle,
                background: `
                    linear-gradient(black, black) padding-box,
                    linear-gradient(162deg, #292a34 0%, #48495b 50%, #d0d0d2 100%) border-box
                `,
            };
        }

        if (isFocused || isHovered) {
            return {
                ...baseStyle,
                border: "2px solid #4a9eff",
                background: "black",
            };
        }

        // Default state
        return {
            ...baseStyle,
            background: `
                linear-gradient(black, black) padding-box,
                linear-gradient(162deg, #292a34 0%, #48495b 50%, #d0d0d2 100%) border-box
            `,
        };
    };

    return (
        <div className="relative inline-block">
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                placeholder={placeholder}
                className={`
                    rounded-sm font-medium outline-none px-3
                    text-blue-400 placeholder-gray-500
                    ${className}
                `}
                style={getInputStyle()}
                {...props}
            />
        </div>
    );
};

export const Input = memo(InputComponent);