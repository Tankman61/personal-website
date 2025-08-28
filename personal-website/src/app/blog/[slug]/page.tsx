import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";               // <-- add
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

    // Parse frontmatter and separate content
    const { content, data } = matter(source);

    // Serialize only the content (not the frontmatter).
    // Pass frontmatter into `scope` so MDXRemote can access it if needed.
    const mdxSource = await serialize(content, { scope: data });

    return (
        <div>
            <PostContent source={mdxSource} frontmatter={data} />
        </div>
    );
}
