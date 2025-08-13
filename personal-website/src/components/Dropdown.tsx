"use client";

import React, { useRef, useState, useEffect } from 'react';

interface DropdownProps {
    options: string[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    style?: React.CSSProperties;
    height?: number;
    width?: number;
    fontSize?: number;
}

export const Dropdown: React.FC<DropdownProps> = ({
                                                      options,
                                                      value,
                                                      onChange,
                                                      placeholder = 'Select...',
                                                      style,
                                                      height = 28,
                                                      width = 120,
                                                      fontSize = 15,
                                                  }) => {
    const [open, setOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        if (open) {
            window.addEventListener('mousedown', handleClick);
        }
        return () => window.removeEventListener('mousedown', handleClick);
    }, [open]);

    const handleSelect = (option: string) => {
        onChange?.(option);
        setOpen(false);
    };

    const getButtonStyle = () => {
        const baseStyle = {
            width: '100%',
            minWidth: width,
            height: `${height}px`,
            border: '2px solid transparent',
            display: 'flex',
            alignItems: 'center',
            padding: '4px 24px 4px 8px',

            color: 'var(--color-airbus-blue)',
            fontSize: `${fontSize}px`,
            cursor: 'pointer',
            position: 'relative' as const,
            userSelect: 'none' as const,
            backgroundClip: 'padding-box',
            outline: 'none',
            boxSizing: 'border-box' as const,
        };

        // Use only background, not backgroundColor, to avoid conflicts
        if (open) {
            return {
                ...baseStyle,
                backgroundImage: `linear-gradient(to right, black calc(100% - 20px), var(--color-airbus-gray) 20px), linear-gradient(163deg, #d0d0d2 0%, #5a5b6b 50%, #292a34 100%)`,
                backgroundClip: 'padding-box, border-box',
                color: 'black',
                border: '2px solid var(--color-airbus-blue)',
            };
        }

        if (isHovered) {
            return {
                ...baseStyle,
                border: '2px solid var(--color-airbus-blue)',
                background: `
                    linear-gradient(to right, black calc(100% - 20px), var(--color-airbus-gray) 20px) padding-box,
                    linear-gradient(163deg, #d0d0d2 0%, #5a5b6b 50%, #292a34 100%) border-box
                `,
            };
        }

        return {
            ...baseStyle,
            background: `
                linear-gradient(to right, black calc(100% - 20px), var(--color-airbus-gray) 20px) padding-box,
                linear-gradient(163deg, #d0d0d2 0%, #5a5b6b 50%, #292a34 100%) border-box
            `,
            border: '2px solid transparent',
        };
    };

    const getDropdownMenuStyle = () => ({
        position: 'absolute' as const,
        top: height + 2,
        left: 0,
        width: '100%',
        minWidth: width,
        background: 'var(--color-airbus-gray)',
        borderRadius: 2,
        marginTop: 0,
        zIndex: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        maxHeight: 200,
        overflowY: 'auto' as const,
        boxSizing: 'border-box' as const,
        padding: 0,
        border: '2px solid',
        borderImage: 'linear-gradient(163deg, #d0d0d2 0%, #5a5b6b 50%, #292a34 100%) 1',
    });

    return (
        <div
            ref={ref}
            style={{
                position: 'relative',
                width: width,
                minWidth: width,
                height: `${height}px`,
                fontSize: `${fontSize}px`,
                userSelect: 'none',
                ...style,
            }}
        >
            <div
                onClick={() => setOpen((o) => !o)}
                style={getButtonStyle()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                tabIndex={0}
            >
                <span style={{
                    position: 'relative',
                    zIndex: 2,
                    paddingTop: '2px',
                }}>
                    {open && (
                        <span style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'var(--color-airbus-blue)',
                            width: 'calc(100%)',
                            height: '95%',
                            zIndex: -1,
                        }} />
                    )}
                    {value || placeholder}
                </span>
                <span
                    style={{
                        position: 'absolute',
                        right: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 18 18"
                        style={{
                            position: 'absolute',
                            left: 'calc(100% - 2px)',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <polygon
                            points="4,7 14,7 9,13"
                            fill={open ? 'var(--color-airbus-blue)' : 'white'}
                        />
                    </svg>
                </span>
            </div>
            {open && (
                <div style={getDropdownMenuStyle()}>
                    {options.map((option) => {
                        const isOptionHovered = hoveredOption === option;
                        return (
                            <div
                                key={option}
                                onClick={() => handleSelect(option)}
                                style={{
                                    height: `${height}px`,
                                    boxSizing: 'border-box',
                                    padding: '2px 24px 2px 8px',
                                    fontSize: `${fontSize}px`,
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    borderRadius: 0,
                                    lineHeight: 1.5,
                                    outline: 'none',
                                    border: isOptionHovered
                                        ? '2px solid var(--color-airbus-blue)'
                                        : '2px solid transparent',
                                    backgroundImage: 'none',
                                    backgroundOrigin: undefined,
                                    backgroundClip: undefined,
                                }}
                                onMouseDown={(e) => e.preventDefault()}
                                onMouseEnter={() => setHoveredOption(option)}
                                onMouseLeave={() => setHoveredOption(null)}
                            >
                                {option}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
