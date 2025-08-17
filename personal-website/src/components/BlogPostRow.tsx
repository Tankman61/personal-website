"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

const rowSpacing = 61.6

interface RowBaseProps {
    index: number
    visible: boolean
}

interface BlogPostDisplayData {
    title: string
    date: string
    likes: number
    comments: number
    views: number
    category?: string
}

interface BlogPostRowProps extends RowBaseProps {
    post: BlogPostDisplayData
    active: boolean
    color: string
    selected?: boolean
    onClick?: () => void
    followsLeg?: boolean
    precedesLeg?: boolean
    hideDiamond?: boolean
    isFirstRow?: boolean
    isLastRow?: boolean
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
    const [hovered, setHovered] = useState(false)
    const [bbox, setBBox] = useState({ x: 0, y: 0, width: 0, height: 0 })
    const textRef = useRef<SVGTextElement>(null)

    useEffect(() => {
        if (textRef.current) {
            const box = textRef.current.getBBox()
            setBBox(box)
        }
    }, [post.title])

    if (!visible) return null

    // Extra padding to avoid clipping and ensure horizontal coverage
    const paddingX = 10  // wider horizontal padding
    const paddingY = 3   // taller vertical padding

    return (
        <g transform={`translate(0, ${index * rowSpacing})`}>
            {/* Hover outline */}
            {hovered && (
                <rect
                    x={bbox.x - paddingX}
                    y={bbox.y - paddingY}
                    width={bbox.width + paddingX * 2}
                    height={bbox.height + paddingY * 2}
                    fill="none"
                    stroke="cyan"
                    strokeWidth={2}
                />
            )}

            {/* Title */}
            <text
                ref={textRef}
                x={20}
                y={15}
                fontSize={20}
                fill={color}
                textAnchor="start"
                alignmentBaseline="middle"
                cursor="pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={onClick}
            >
                {post.title}
            </text>

            {/* Date */}
            <text
                x={520}
                y={15}
                fontSize={18}
                fill={color}
                textAnchor="middle"
                alignmentBaseline="middle"
            >
                {post.date}
            </text>

            <g stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round">
                {/* Diamond */}
                <path
                    d="m386,15 h8 l6,-9 l6,9 l-6,9 l-6,-9"
                    fill="none"
                    style={{ visibility: !hideDiamond ? "inherit" : "hidden" }}
                />

                {/* Horizontal lines */}
                <path
                    d="m386,15 h14"
                    style={{ visibility: hideDiamond && followsLeg ? "inherit" : "hidden" }}
                />
                <path
                    d="m405,15 h13"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    style={{ visibility: !hideDiamond ? "inherit" : "hidden" }}
                />

                {/* Vertical legs */}
                {!isLastRow && precedesLeg && !hideDiamond && (
                    <path d="m400,24 v24" stroke={color === "white" ? "lime" : color} strokeLinecap="butt" />
                )}
                {!isFirstRow && followsLeg && !hideDiamond && (
                    <path d="m400,5 v-19" stroke={color} strokeWidth={2} strokeLinecap="round" />
                )}
            </g>
        </g>
    )
}
