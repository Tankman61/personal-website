import BlogPageClient from './BlogPageClient';
import { getAllPosts, type BlogPostMeta } from '../../../lib/posts';

export default async function BlogPage() {
  const posts: BlogPostMeta[] = getAllPosts(); // runs server-side
  console.log('Posts found:', getAllPosts());
  return <BlogPageClient posts={posts} />;
}
