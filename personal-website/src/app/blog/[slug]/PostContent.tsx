"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface Props {
    source: MDXRemoteSerializeResult;
}

export default function PostContent({ source }: Props) {
    return <MDXRemote {...source} />;
}
