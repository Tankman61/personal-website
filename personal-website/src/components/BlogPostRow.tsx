'use client';

import type React from 'react';
import { useState } from 'react';

const rowSpacing = 61.6;

interface RowBaseProps {
  index: number;
  visible: boolean;
}

interface BlogPostDisplayData {
  title: string;
  date: string;
  category?: string;
}

interface BlogPostRowProps extends RowBaseProps {
  post: BlogPostDisplayData;
  active: boolean;
  color: string;
  selected?: boolean;
  onClick?: () => void;
  followsLeg?: boolean;
  precedesLeg?: boolean;
  hideDiamond?: boolean;
  isFirstRow?: boolean;
  isLastRow?: boolean;
}

export const BlogPostRow: React.FC<BlogPostRowProps> = ({
  index,
  post,
  color,
  onClick,
  followsLeg,
  precedesLeg,
  hideDiamond,
  visible,
  isFirstRow,
  isLastRow,
}) => {
  const [hovered, setHovered] = useState(false);
  const boxWidth = 360; // Fixed width that should work for most titles
  const boxHeight = 28;

  if (!visible) return null;

  return (
    <g transform={`translate(0, ${index * rowSpacing})`}>
      {/* Title with hover highlight box */}
      <g
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        {/* Invisible full-size clickable area */}
        <rect x={10} y={1} width={boxWidth} height={boxHeight} fill="transparent" stroke="none" />

        {/* Visible highlight box when hovered */}
        {hovered && (
          <rect
            x={10}
            y={1}
            width={boxWidth}
            height={boxHeight}
            fill="none"
            stroke="#00EAFF"
            strokeWidth={2}
          />
        )}

        {/* Title text */}
        <foreignObject x={20} y={2} width={boxWidth - 20} height={boxHeight}>
          <div
            className="h-[28px] flex items-center text-[20px] text-left overflow-hidden whitespace-nowrap text-ellipsis"
            style={{ color: color }}
          >
            {post.title}
          </div>
        </foreignObject>
      </g>

      {/* Date */}
      <foreignObject x={520 - 45} y={2} width={120} height={boxHeight}>
        <div
          className="h-[28px] flex items-center justify-center text-[18px] text-center overflow-hidden whitespace-nowrap text-ellipsis"
          style={{ color: color }}
        >
          {post.date}
        </div>
      </foreignObject>

      <g stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round">
        {/* Diamond */}
        <path
          d="m386,15 h8 l6,-9 l6,9 l-6,9 l-6,-9"
          fill="none"
          style={{ visibility: !hideDiamond ? 'inherit' : 'hidden' }}
        />

        {/* Horizontal lines */}
        <path
          d="m386,15 h14"
          style={{ visibility: hideDiamond && followsLeg ? 'inherit' : 'hidden' }}
        />
        <path
          d="m405,15 h13"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          style={{ visibility: !hideDiamond ? 'inherit' : 'hidden' }}
        />

        {/* Vertical legs */}
        {!isLastRow && precedesLeg && !hideDiamond && (
          <path d="m400,24 v24" stroke={color === 'white' ? 'lime' : color} strokeLinecap="butt" />
        )}
        {!isFirstRow && followsLeg && !hideDiamond && (
          <path d="m400,5 v-19" stroke={color} strokeWidth={2} strokeLinecap="round" />
        )}
      </g>
    </g>
  );
};
