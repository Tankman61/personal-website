import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import PostContent from "./PostContent";

interface Props {
    params: { slug: string };
}

export default async function PostPage({ params }: Props) {
    const postsDir = path.resolve(process.cwd(), "src/app/blog/posts");
    const postFile = path.join(postsDir, params.slug, "page.mdx");

    if (!fs.existsSync(postFile)) {
        notFound();
    }

    const source = fs.readFileSync(postFile, "utf-8");
    const mdxSource = await serialize(source);

    return (
        <div className="prose mx-auto py-8 px-4">
            <PostContent source={mdxSource} /> {/* Client component renders MDX */}
        </div>
    );
}
