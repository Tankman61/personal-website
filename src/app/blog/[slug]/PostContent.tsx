'use client';

import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import NextImage from 'next/image';

interface Props {
  source: MDXRemoteSerializeResult;
  frontmatter?: Record<string, unknown>;
}

export default function PostContent({ source, frontmatter }: Props) {
  // Handle tags
  const rawTags = frontmatter?.TAGS ?? frontmatter?.tags;
  const tags: string[] = Array.isArray(rawTags)
    ? rawTags
    : typeof rawTags === 'string'
      ? rawTags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

  // Format date
  const dateRaw = frontmatter?.DATE ?? frontmatter?.date;
  const formattedDate =
    dateRaw && typeof dateRaw !== 'object'
      ? new Date(dateRaw as string | number | Date)
          .toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
          .replace(/,/g, '')
      : 'NO DATE';

  const title = (frontmatter?.TITLE ?? frontmatter?.title ?? 'UNTITLED').toString().toUpperCase();
  const tagsDisplay = tags.length ? tags.map((t) => t.toUpperCase()).join(' - ') : 'NONE';

  return (
    <main className="px-8 flex items-start justify-center min-h-[632px] max-h-[632px] mx-auto">
      <div className="w-full flex flex-col items-center max-w-[612px] h-full">
        {/* Header */}
        <div className="flex justify-between w-full px-4 mb-2">
          <span className="text-white text-xl uppercase tracking-wider">{title}</span>
          <span className="text-white text-xl uppercase">
            {String(formattedDate).toUpperCase()}
          </span>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-gray-300"></div>

        <div className="w-full max-w-full">
          <div
            className="prose prose-invert max-w-full max-h-[610px] overflow-y-auto
                        [&::-webkit-scrollbar]:w-2.5
                        [&::-webkit-scrollbar-track]:bg-[var(--color-airbus-gray)]
                        [&::-webkit-scrollbar-thumb]:bg-[var(--color-airbus-light-gray)] [&::-webkit-scrollbar-thumb]:rounded-sm"
          >
            {/* Tags */}
            <div className="text-sm text-airbus-dark-blue uppercase mt-2 mb-2">
              <span className="font-semibold">TAGS:</span>{' '}
              <span className="text-airbus-green">{tagsDisplay}</span>
            </div>

            {/* MDX content */}
            <MDXRemote
              {...source}
              components={{
                // Images use runtime scope (imageRef, imageRef2...)
                Image: (props: React.ComponentProps<typeof NextImage>) => {
                  const src =
                    typeof props.src === 'string' ? props.src : source.scope?.imageRef || '';

                  if (!src) {
                    console.error('Image source not found:', props);
                    return <div>Image not found</div>;
                  }

                  return (
                    <div className="w-full flex justify-center">
                      <NextImage
                        {...props}
                        style={{
                          maxWidth: '100%',
                          height: props.height ? props.height + 'px' : 'auto',
                          objectFit: 'contain',
                          ...props.style,
                        }}
                      />
                    </div>
                  );
                },
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
