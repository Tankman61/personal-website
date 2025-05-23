import React, { memo } from 'react';

export interface CursorProps {
    x: number;
    y: number;
    visible?: boolean;
}

const Cursor: React.FC<CursorProps> = memo(function Cursor({ x, y, visible = true }) {
    return (
        <g
            transform={`translate(${x} ${y})`}
            visibility={visible ? 'inherit' : 'hidden'}
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
            pointerEvents="none"
        >
            <g stroke="black">
                <path d="m-3,0 h6 m-3,-3 v6" strokeWidth={2} />
                <path d="m-36,-47 l36,36 l36,-36" strokeWidth={3} />
                <path d="m-36,47 l36,-36 l36,36" strokeWidth={3} />
            </g>
            <g stroke="yellow">
                <path d="m-3,0 h6 m-3,-3 v6" strokeWidth={1} />
                <path d="m-36,-47 l36,36 l36,-36" strokeWidth={2} />
                <path d="m-36,47 l36,-36 l36,36" strokeWidth={2} />
            </g>
        </g>
    );
});

export default Cursor;
