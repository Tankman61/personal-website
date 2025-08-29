import fs from "fs";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import path from "path";
import PostContent from "./PostContent";

// In Next.js 15, both params and searchParams can be promises.
type PageProps = {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PostPage({ params, searchParams }: PageProps) {
    // Await the params to get the slug
    const { slug } = await params;

    // Although searchParams is not used in this component,
    // you would await it here if you needed to access it.
    // const sParams = searchParams ? await searchParams : {};

    const postsDir = path.resolve(process.cwd(), "src/app/blog/posts");
    const postDir = path.join(postsDir, slug);
    const postFile = path.join(postDir, "page.mdx");

    if (!fs.existsSync(postFile)) {
        notFound();
    }

    const source = fs.readFileSync(postFile, "utf-8");
    const { content, data } = matter(source);

    // Dynamically collect all images in the post folder
    const imageFiles = fs.readdirSync(postDir)
        .filter(f => /\.(png|jpg|jpeg|webp|gif)$/.test(f))
        .reduce((acc, filename, index) => {
            // imageRef, imageRef2, imageRef3...
            const key = index === 0 ? "imageRef" : `imageRef${index + 1}`;
            acc[key] = `/blog/posts/${slug}/${filename}`;
            return acc;
        }, {} as Record<string, string>);

    // Serialize MDX with all images in scope
    const mdxSource = await serialize(content, {
        scope: {
            ...data,
            ...imageFiles
        }
    });

    return (
        <div>
            <PostContent source={mdxSource} frontmatter={data} />
        </div>
    );
}