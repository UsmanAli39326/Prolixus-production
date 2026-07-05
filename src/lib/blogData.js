import { apiService } from "@/lib/api";

import { formatDate } from "@/utitlis/formatters";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function mapBlogPost(blog) {
  return {
    id: blog.id ?? 0,
    slug: blog.slug ?? "",
    thumbnailImg: blog.file?.thumbnailUrl
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${blog.file.thumbnailUrl}`
      : "",
    img: blog.file?.url
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${blog.file.url}`
      : "",
    href: `/blog/${blog.id}`,
    title: blog.title ?? "",
    excerpt: blog.shortDescription ?? "",
    date: formatDate(blog.createdDateTime, 'date') ?? "",
    category: blog.category ?? "",
    author: blog.author ?? "",
    readTime: blog.readTime ?? "",
    content: blog.description,
  };
}

/**
 * Fetch all blog posts from the admin API.
 */
export async function getAllPosts() {
  try {
    const res = await apiService.get(
      "/Configuration/blogs",
      {},
      { next: { revalidate: 1 } }
    );


    if (res?.success && Array.isArray(res.data)) {
      return res.data.map(mapBlogPost);
    }
    return [];
  } catch (err) {
    console.error("Blog API Error:", err);
    return [];
  }
}

/**
 * Fetch a single post by ID.
 */
export async function getPostById(id) {
  const posts = await getAllPosts();
  return posts.find((post) => post.id === Number(id)) || null;
}

/**
 * Get related posts (all posts except the current one).
 */
export async function getRelatedPostsById(currentId, count = 3) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.id !== Number(currentId)).slice(0, count);
}
