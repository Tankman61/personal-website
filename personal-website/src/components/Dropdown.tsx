"use client";

import React, { useRef, useState, useEffect } from 'react';

interface DropdownProps {
    options: string[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    style?: React.CSSProperties;
}

export const Dropdown: React.FC<DropdownProps> = ({
                                                      options,
                                                      value,
                                                      onChange,
                                                      placeholder = 'Select...',
                                                      style,
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
            minWidth: 60,
            height: 28,
            border: '2px solid transparent',
            borderRadius: 2,
            padding: '2px 24px 2px 8px',
            color: 'cyan',
            fontSize: 15,
            cursor: 'pointer',
            position: 'relative' as const,
            userSelect: 'none' as const,
            transition: 'background 0.2s, border 0.2s',
            backgroundClip: 'padding-box',
            outline: 'none',
            boxSizing: 'border-box' as const,
            background: 'linear-gradient(to right, black 50%, var(--color-airbus-gray) 50%)',
        };

        // Open (active) state
        if (open) {
            return {
                ...baseStyle,
                backgroundColor: 'var(--color-airbus-light-gray)',
                background: `
                linear-gradient(to right, black 85%, var(--color-airbus-gray) 15%) padding-box,
                linear-gradient(163deg, #d0d0d2 0%, #5a5b6b 50%, #292a34 100%) border-box
            `,
                border: '2px solid cyan',
            };
        }

        // Hovered state
        if (isHovered) {
            return {
                ...baseStyle,
                backgroundColor: 'var(--color-airbus-gray)',
                border: '2px solid cyan',
                background: `
                linear-gradient(to right, black 85%, var(--color-airbus-gray) 15%) padding-box,
                linear-gradient(163deg, #d0d0d2 0%, #5a5b6b 50%, #292a34 100%) border-box
            `,
            };
        }

        // Default state
        return {
            ...baseStyle,
            backgroundColor: 'var(--color-airbus-gray)',
            background: `
                linear-gradient(to right, black 85%, var(--color-airbus-gray) 15%) padding-box,
                linear-gradient(163deg, #d0d0d2 0%, #5a5b6b 50%, #292a34 100%) border-box
            `,
            border: '2px solid transparent',
        };
    };

    // Dropdown menu border gradient style (external border only)
    const getDropdownMenuStyle = () => ({
        position: 'absolute' as const,
        top: 30,
        left: 0,
        width: '100%',
        minWidth: 60,
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
                width: 120,
                minWidth: 60,
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
                {value || placeholder}
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
                    {/* Triangle down */}
                    <svg width="16" height="16" viewBox="0 0 18 18" style={{ transform: 'translateX(7px)' }}>
                        <polygon
                            points="4,7 14,7 9,13"
                            fill={open ? 'cyan' : 'white'}
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
                                    width: '100%',
                                    minWidth: 60,
                                    height: 28,
                                    boxSizing: 'border-box',
                                    padding: '2px 24px 2px 8px',
                                    fontSize: 15,
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s, color 0.2s',
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
                                onMouseDown={e => e.preventDefault()}
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
