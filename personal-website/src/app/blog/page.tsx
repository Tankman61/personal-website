"use client"

// FIXME: THERE IS CLIPPING/INCONSISTENCY BETWEEN OUTLINED BLUE BOX AND TITLE TEXT WHEN HOVERING OVER TITLE
// also im pretty sure the ishighlighted stuff isnt even needed LOL
// FIXME: UP/DOWN BUTTON DISABLED STATE NEEDS TO USE NEW PROP

import { useState } from "react"
import { Button } from '@/components/Button';
import { BlogPostRow } from '@/components/BlogPostRow';

enum ContentLineType {
    BlogPost = "blogpost",
    Category = "category",
}

interface ContentLineDisplayData {
    type: ContentLineType
    originalIndex: number | null
    isHighlighted: boolean
}

interface BlogPostLineDisplayData extends ContentLineDisplayData {
    type: ContentLineType.BlogPost
    title: string
    date: string
    likes: number
    comments: number
    views: number
    category?: string
}

const NUM_BLOG_ROWS = 9

const sampleBlogData: ContentLineDisplayData[] = [
    {
        type: ContentLineType.BlogPost,
        originalIndex: 0,
        isHighlighted: false,
        title: "WORK IN PROGRESS",
        date: "2025-01-15",
        likes: 142,
        comments: 23,
        views: 100,
        category: "React",
    } as BlogPostLineDisplayData,
    {
        type: ContentLineType.BlogPost,
        originalIndex: 1,
        isHighlighted: false,
        title: ":)",
        date: "2025-01-10",
        likes: 89,
        comments: 15,
        views: 1,
        category: "TypeScript",
    } as BlogPostLineDisplayData,
]

export default function BlogPage() {
    const [lineData] = useState<ContentLineDisplayData[]>(sampleBlogData)
    const [scrollPos, setScrollPos] = useState(0)
    const [selectedPost, setSelectedPost] = useState<{ index: number; isHighlighted: boolean }>({
        index: -1,
        isHighlighted: false,
    })

    const scrollPage = (direction: number) => {
        setScrollPos((prev) => Math.max(Math.min(prev + direction, lineData.length - NUM_BLOG_ROWS), 0))
    }

    const selectPost = (index: number, isHighlighted: boolean) => {
        if (selectedPost.index === index && selectedPost.isHighlighted === isHighlighted) {
            setSelectedPost({ index: -1, isHighlighted: false })
        } else {
            setSelectedPost({ index, isHighlighted })
        }
    }

    const getLineColor = (index: number, line: ContentLineDisplayData) => {
        if (line.isHighlighted) return "cyan"
        return "lime"
    }

    const totalViews = sampleBlogData
        .filter((line) => line.type === ContentLineType.BlogPost)
        .reduce((sum, line) => sum + (line as BlogPostLineDisplayData).views, 0)

    return (
        <main className="px-8 flex items-start justify-center">
            <div className="w-full flex flex-col items-center min-h-[632px]">
                {/* Column Headers */}
                <div className="flex justify-between w-full max-w-[612px] px-4 mb-2">
                    <span className="text-white text-xl">TITLE</span>
                    <span className="text-white text-xl">DATE</span>
                </div>

                {/* Separator Line */}
                <div className="w-full max-w-[612px] h-px bg-gray-300 mb-6"></div>

                {/* Blog Posts Container */}
                <div className="relative w-full max-w-[612px]">
                    <svg width="612" height="500" className="block">
                        {lineData.slice(scrollPos, scrollPos + NUM_BLOG_ROWS).map((line, displayIndex) => {
                            const actualIndex = scrollPos + displayIndex
                            const selected = selectedPost.isHighlighted
                                ? line.isHighlighted && selectedPost.index === line.originalIndex
                                : !line.isHighlighted && selectedPost.index === line.originalIndex
                            const color = getLineColor(actualIndex, line)

                            if (line.type === ContentLineType.BlogPost) {
                                const blogLine = line as BlogPostLineDisplayData
                                return (
                                    <BlogPostRow
                                        key={`blogpost-${actualIndex}`}
                                        index={displayIndex}
                                        post={{
                                            title: blogLine.title,
                                            date: blogLine.date,
                                            likes: blogLine.likes,
                                            comments: blogLine.comments,
                                            views: blogLine.views,
                                            category: blogLine.category,
                                        }}
                                        active={false}
                                        color={color === "lime" ? "lime" : color}
                                        selected={selected}
                                        onClick={() => selectPost(line.originalIndex!, line.isHighlighted)}
                                        followsLeg={displayIndex > 0}
                                        precedesLeg={displayIndex < NUM_BLOG_ROWS - 1 && actualIndex < lineData.length - 1}
                                        hideDiamond={false}
                                        visible={true}
                                    />
                                )
                            }

                            return null
                        })}
                    </svg>
                </div>

                {/* Bottom Separator */}
                <div className="w-full max-w-[612px] h-[0.5px] bg-gray-300 mb-4"></div>

                {/* Bottom Stats and Controls */}
                <div className="flex justify-between items-center w-full max-w-[512px] px-4 pb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-airbus-green text-xl">2</span>
                        <span className="text-blue-400 text-xl">POSTS</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-airbus-green text-xl">{(totalViews / 1000).toFixed(1)}K</span>
                        <span className="text-blue-400 text-xl">VIEWS</span>
                    </div>

                    <div className="flex gap-0">
                        <Button width={40} height={25} fontSize={16} onClick={() => scrollPage(-1)} isActive={scrollPos === 0}>
                            ▲
                        </Button>
                        <Button
                            width={40}
                            height={25}
                            fontSize={16}
                            onClick={() => scrollPage(1)}
                            isActive={scrollPos === lineData.length - NUM_BLOG_ROWS || lineData.length < NUM_BLOG_ROWS}
                        >
                            ▼
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}
