import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPostMeta {
    slug: string;
    title: string;
    date: string;
    tags?: string;
}

export function getAllPosts(): BlogPostMeta[] {
    const postsDir = path.resolve(process.cwd(), "src", "app", "blog", "posts");

    if (!fs.existsSync(postsDir)) {
        throw new Error(`Posts folder not found at ${postsDir}`);
    }

    const folders = fs.readdirSync(postsDir).filter(f =>
        fs.statSync(path.join(postsDir, f)).isDirectory()
    );

    const posts = folders.map((slug) => {
        const filePath = path.join(postsDir, slug, "page.mdx");

        if (!fs.existsSync(filePath)) {
            console.warn(`MDX file not found for post: ${slug}`);
            return null;
        }

        const source = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(source);

        return {
            slug,
            title: data.TITLE ?? "UNTITLED",
            date: data.DATE ?? "NO DATE",
            tags: data.TAGS ?? undefined,
        };
    }).filter(Boolean) as BlogPostMeta[];

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
