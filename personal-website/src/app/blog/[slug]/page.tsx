import fs from 'fs';
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import path from 'path';
import PostContent from './PostContent';

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PostPage(props: PageProps) {
  const { slug } = await props.params;

  const postsDir = path.resolve(process.cwd(), 'src/app/blog/posts');
  const postDir = path.join(postsDir, slug);
  const postFile = path.join(postDir, 'page.mdx');

  if (!fs.existsSync(postFile)) {
    notFound();
  }

  const source = fs.readFileSync(postFile, 'utf-8');
  const { content, data } = matter(source);

  // Import image if it exists
  let imageRef = null;
  const imagePath = path.join(postDir, 'image.png');
  if (fs.existsSync(imagePath)) {
    // Dynamically import the image
    imageRef = await import(`@/app/blog/posts/${slug}/image.png`);
  }

  // serialize
  const mdxSource = await serialize(content, {
    scope: {
      ...data,
      imageRef: imageRef?.default || null,
    },
  });

  return (
    <div>
      <PostContent source={mdxSource} frontmatter={data} />
    </div>
  );
}
