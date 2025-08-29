"use client";

import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import NextImage from "next/image";

interface Props {
    source: MDXRemoteSerializeResult;
    frontmatter?: Record<string, unknown>;
}

export default function PostContent({ source, frontmatter }: Props) {
    const rawTags = frontmatter?.TAGS ?? frontmatter?.tags;
    const tags: string[] = Array.isArray(rawTags)
        ? rawTags
        : typeof rawTags === "string"
            ? rawTags.split(",").map((t: string) => t.trim()).filter(Boolean)
            : [];

    const dateRaw = frontmatter?.DATE ?? frontmatter?.date;
    const formattedDate = dateRaw && typeof dateRaw !== 'object'
        ? new Date(dateRaw as string | number | Date).toLocaleDateString("en-CA", {
            year: "numeric", month: "short", day: "numeric"
        }).replace(/,/g, '')
        : "NO DATE";

    const title = (frontmatter?.TITLE ?? frontmatter?.title ?? "UNTITLED").toString().toUpperCase();
    const tagsDisplay = tags.length ? tags.map(t => t.toUpperCase()).join(" - ") : "NONE";

    return (
        <main className="px-8 flex items-start justify-center min-h-[632px] max-h-[632px] mx-auto">
            <div className="w-full flex flex-col items-center max-w-[612px] h-full">
                {/* COLUMN-STYLE HEADER (MATCHES BLOG PAGE SIZING) */}
                <div className="flex justify-between w-full px-4 mb-2">
                    <span className="text-white text-xl uppercase tracking-wider">{title}</span>
                    <span className="text-white text-xl uppercase">{String(formattedDate).toUpperCase()}</span>
                </div>

                {/* SEPARATOR */}
                <div className="w-full h-px bg-gray-300"></div>

                    <div className="w-full max-w-full">
                        <div className="prose prose-invert max-w-full max-h-[610px] overflow-y-auto
                            [&::-webkit-scrollbar]:w-2.5
                            [&::-webkit-scrollbar-track]:bg-[var(--color-airbus-gray)]
                            [&::-webkit-scrollbar-thumb]:bg-[var(--color-airbus-light-gray)] [&::-webkit-scrollbar-thumb]:rounded-sm"
                             >
                            <div className="text-sm text-airbus-dark-blue uppercase mt-4">
                                <span className="font-semibold">TAGS:</span> <span className="text-airbus-green">{tagsDisplay}</span>
                            </div>
                            <MDXRemote
                                {...source}
                                components={{
                                    Image: (props: React.ComponentProps<typeof NextImage>) => {
                                        // Ensure the image has proper dimensions
                                        return (
                                            <div className="my-6">
                                                <NextImage
                                                    {...props}
                                                    width={800}
                                                    height={500}
                                                    style={{
                                                        maxWidth: '100%',
                                                        height: 'auto',
                                                        objectFit: 'contain'
                                                    }}
                                                />
                                            </div>
                                        );
                                    },
                                    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => {
                                        // Check if the children contain paragraph elements
                                        const hasNestedP = React.Children.toArray(props.children).some(
                                            child => React.isValidElement(child) && child.type === 'p'
                                        );

                                        // If nested paragraphs detected, use a div instead
                                        return hasNestedP ?
                                            <div {...props} /> :
                                            <p {...props} />;
                                    },
                                    // Add other components here if needed
                                }}
                            />
                        </div>
                    </div>
            </div>
        </main>
    );
}
