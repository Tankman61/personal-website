import fs from "fs";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import path from "path";
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
    // Get image path from the post directory
    const imagePath = `/blog/posts/${params.slug}/image.png`;

    // Pass frontmatter and image path into `scope` so MDXRemote can access it
    const mdxSource = await serialize(content, {
        scope: {
            ...data,
            imageRef: imagePath
        }
    });
    return (
        <div>
            <PostContent source={mdxSource} frontmatter={data} />
        </div>
    );
}
