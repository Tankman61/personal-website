'use client';

import React, { useState, memo } from 'react';

interface ButtonProps {
  width?: number;
  height?: number;
  fontSize?: number;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean; // Added this prop
  disabled?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  width = 120,
  height = 40,
  fontSize = 16,
  onClick,
  children,
  className = '',
  isActive = false,
  disabled = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Reset hover and click states when button becomes disabled
  React.useEffect(() => {
    if (disabled) {
      setIsHovered(false);
      setIsClicked(false);
    }
  }, [disabled]);

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
      fontSize: `${fontSize}px`,
      border: '2px solid transparent',
    };

    // Disabled state takes precedence over all
    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: 'var(--color-airbus-light-gray)',
        background: `
                    linear-gradient(var(--color-airbus-light-gray), var(--color-airbus-light-gray)) padding-box,
                    linear-gradient(145deg, #d0d0d2 0%, #48495b 50%, #292a34 100%) border-box
                `,
      };
    }

    // Active state takes precedence
    if (isActive) {
      return {
        ...baseStyle,
        backgroundColor: '#868995',
        background: `
                    linear-gradient(#868995, #868995) padding-box,
                    linear-gradient(162deg, #292a34 0%, #48495b 50%, #d0d0d2 100%) border-box
                `,
      };
    }

    if (isHovered && !isClicked) {
      return {
        ...baseStyle,
        backgroundColor: 'var(--color-airbus-gray)',
        border: '2px solid var(--color-airbus-blue)',
        background: 'var(--color-airbus-gray)',
      };
    }

    if (isClicked) {
      return {
        ...baseStyle,
        backgroundColor: 'var(--color-airbus-light-gray)',
        background: `
                    linear-gradient(var(--color-airbus-light-gray), var(--color-airbus-light-gray)) padding-box,
                    linear-gradient(162deg, #292a34 0%, #48495b 50%, #d0d0d2 100%) border-box
                `,
      };
    }

    // Default state
    return {
      ...baseStyle,
      backgroundColor: 'var(--color-airbus-gray)',
      background: `
                linear-gradient(var(--color-airbus-gray), var(--color-airbus-gray)) padding-box,
                linear-gradient(163deg, #d0d0d2 0%, #5a5b6b 50%, #292a34 100%) border-box
            `,
    };
  };

  return (
    <button
      className={`
                relative rounded-xs font-medium text-center
                select-none flex items-center justify-center
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                ${className}
            `}
      style={getButtonStyle()}
      onMouseDown={disabled ? undefined : handleMouseDown}
      onMouseUp={disabled ? undefined : handleMouseUp}
      onMouseEnter={disabled ? undefined : () => setIsHovered(true)}
      onMouseLeave={disabled ? undefined : handleMouseLeave}
      disabled={disabled}
      {...props}
    >
      <span style={{ fontSize: `${fontSize}px`, color: 'white' }}>{children}</span>
    </button>
  );
};

export const Button = memo(ButtonComponent);
