export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  category: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  featured: boolean;
  likes: number;
  views: number;
  comments: Comment[];
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  postCount: number;
}

export type ViewType = 'home' | 'blog' | 'post' | 'category' | 'write' | 'edit' | 'search' | 'about';
