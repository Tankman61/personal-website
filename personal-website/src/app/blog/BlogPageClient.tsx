
"use client";

import { useState, useEffect } from "react";
import { useRouter} from "next/navigation";
import { Button } from "@/components/Button";
import { BlogPostRow } from "@/components/BlogPostRow";
import type { BlogPostMeta } from "../../../lib/posts";

interface Props {
    posts: BlogPostMeta[];
}

const NUM_BLOG_ROWS = 9;

export default function BlogPageClient({ posts }: Props) {
    const router = useRouter();
    const [scrollPos, setScrollPos] = useState(0);

    const scrollPage = (direction: number) => {
        setScrollPos((prev) => Math.max(Math.min(prev + direction, posts.length - NUM_BLOG_ROWS), 0));
    };

    const openPost = (slug: string) => {
        router.push(`/blog/${slug}`);
    };

    useEffect(() => {
        posts.forEach(post => {
            router.prefetch(`/blog/${post.slug}`);
        });
    }, [posts, router]);


    return (
        <main className="px-8 flex items-start justify-center">
            <div className="w-full flex flex-col items-center min-h-[632px]">
                {/* Column Headers */}
                <div className="flex justify-between w-full max-w-[612px] px-4 mb-2">
                    <span className="text-white text-xl">TITLE</span>
                    <span className="text-white text-xl">DATE</span>
                </div>

                {/* Separator */}
                <div className="w-full max-w-[612px] h-px bg-gray-300 mb-6"></div>

                {/* Blog Posts */}
                <div className="relative w-full max-w-[612px]">
                    <svg width="612" height="500" className="block">
                        {posts.slice(scrollPos, scrollPos + NUM_BLOG_ROWS).map((post, displayIndex) => {
                            const actualIndex = scrollPos + displayIndex;
                            return (
                                <BlogPostRow
                                    key={`blogpost-${actualIndex}`}
                                    index={displayIndex}
                                    post={post}
                                    active={false}
                                    color="lime"
                                    onClick={() => openPost(post.slug)}
                                    followsLeg={displayIndex > 0}
                                    precedesLeg={displayIndex < NUM_BLOG_ROWS - 1 && actualIndex < posts.length - 1}
                                    hideDiamond={false}
                                    visible={true}
                                />
                            );
                        })}
                    </svg>
                </div>

                {/* Bottom Stats */}
                <div className="w-full max-w-[612px] h-[0.5px] bg-gray-300 mb-4"></div>
                <div className="flex justify-between items-center w-full max-w-[512px] pb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-airbus-green text-xl">{posts.length}</span>
                        <span className="text-airbus-dark-blue text-xl">
                            {posts.length === 1 ? "POST" : "POSTS"}
                        </span>
                    </div>

                    <div className="flex gap-0">
                        <Button width={40} height={25} fontSize={16} onClick={() => scrollPage(-1)} disabled={scrollPos === 0}>
                            ▲
                        </Button>
                        <Button
                            width={40}
                            height={25}
                            fontSize={16}
                            onClick={() => scrollPage(1)}
                            disabled={scrollPos === posts.length - NUM_BLOG_ROWS || posts.length <= NUM_BLOG_ROWS}
                        >
                            ▼
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
