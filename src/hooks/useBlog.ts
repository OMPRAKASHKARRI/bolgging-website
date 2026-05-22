import { useState, useEffect, useCallback } from 'react';
import { Post, Comment } from '../types';
import { initialPosts } from '../data/initialData';

const STORAGE_KEY = 'blogcraft_posts';

function loadPosts(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Post[];
  } catch {
    // ignore parse errors
  }
  return initialPosts;
}

function savePosts(posts: Post[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function useBlog() {
  const [posts, setPosts] = useState<Post[]>(loadPosts);

  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  const createPost = useCallback((post: Omit<Post, 'id' | 'publishedAt' | 'updatedAt' | 'likes' | 'views' | 'comments'>) => {
    const newPost: Post = {
      ...post,
      id: `post-${Date.now()}`,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      views: 0,
      comments: [],
    };
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  }, []);

  const updatePost = useCallback((id: string, updates: Partial<Post>) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );
  }, []);

  const deletePost = useCallback((id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  }, []);

  const likePost = useCallback((id: string) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  }, []);

  const incrementViews = useCallback((id: string) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, views: p.views + 1 } : p))
    );
  }, []);

  const addComment = useCallback((postId: string, comment: Omit<Comment, 'id' | 'postId' | 'createdAt' | 'likes'>) => {
    const newComment: Comment = {
      ...comment,
      id: `c-${Date.now()}`,
      postId,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    setPosts(prev =>
      prev.map(p =>
        p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
      )
    );
  }, []);

  const likeComment = useCallback((postId: string, commentId: string) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? {
              ...p,
              comments: p.comments.map(c =>
                c.id === commentId ? { ...c, likes: c.likes + 1 } : c
              ),
            }
          : p
      )
    );
  }, []);

  return {
    posts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    incrementViews,
    addComment,
    likeComment,
  };
}
