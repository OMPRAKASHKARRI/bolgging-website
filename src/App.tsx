import { useState, useEffect } from 'react';
import { useBlog } from './hooks/useBlog';
import { Post, ViewType } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import BlogList from './components/BlogList';
import PostView from './components/PostView';
import PostEditor from './components/PostEditor';
import AboutPage from './components/AboutPage';
import SearchResults from './components/SearchResults';

interface NavigationState {
  view: ViewType;
  post?: Post;
}

export default function App() {
  const { posts, createPost, updatePost, deletePost, likePost, incrementViews, addComment, likeComment } = useBlog();
  const [nav, setNav] = useState<NavigationState>({ view: 'home' });
  const [searchQuery, setSearchQuery] = useState('');
  const [editTarget, setEditTarget] = useState<Post | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [nav.view]);

  function navigate(view: ViewType, data?: unknown) {
    if (view === 'edit' && data) {
      setEditTarget(data as Post);
    }
    setNav({ view, post: (view === 'post' ? data : undefined) as Post | undefined });
  }

  function handleSearch(query: string) {
    setSearchQuery(query);
    setNav({ view: 'search' });
  }

  function handleViewPost(post: Post) {
    incrementViews(post.id);
    // Get updated post from store (with incremented views)
    setNav({ view: 'post', post });
  }

  // Always get fresh post data from store when viewing
  const currentPost = nav.post
    ? (posts.find(p => p.id === nav.post!.id) ?? nav.post)
    : null;

  const relatedPosts = currentPost
    ? posts
        .filter(p => p.id !== currentPost.id && p.category === currentPost.category)
        .slice(0, 3)
    : [];

  const showNavbarFooter = nav.view !== 'write' && nav.view !== 'edit';

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {showNavbarFooter && (
        <Navbar currentView={nav.view} onNavigate={navigate} onSearch={handleSearch} />
      )}

      <main className={showNavbarFooter ? '' : ''}>
        {nav.view === 'home' && (
          <HomePage posts={posts} onViewPost={handleViewPost} onNavigate={navigate} />
        )}

        {nav.view === 'blog' && (
          <div className="pt-16">
            <BlogList
              posts={posts}
              onViewPost={handleViewPost}
              title="All Posts"
              subtitle="Explore articles on technology, design, programming, and more."
            />
          </div>
        )}

        {nav.view === 'post' && currentPost && (
          <div className="pt-16">
            <PostView
              post={currentPost}
              onBack={() => setNav({ view: 'blog' })}
              onNavigate={navigate}
              onLike={likePost}
              onAddComment={addComment}
              onLikeComment={likeComment}
              onDelete={deletePost}
              relatedPosts={relatedPosts}
              onViewPost={handleViewPost}
            />
          </div>
        )}

        {nav.view === 'write' && (
          <div className="pt-16">
            <PostEditor
              onSave={post => {
                createPost(post);
                setNav({ view: 'blog' });
              }}
              onBack={() => setNav({ view: 'blog' })}
            />
          </div>
        )}

        {nav.view === 'edit' && editTarget && (
          <div className="pt-16">
            <PostEditor
              existingPost={editTarget}
              onSave={updates => {
                updatePost(editTarget.id, updates);
                setEditTarget(null);
                setNav({ view: 'post', post: { ...editTarget, ...updates } });
              }}
              onBack={() => {
                setEditTarget(null);
                setNav({ view: 'post', post: editTarget });
              }}
            />
          </div>
        )}

        {nav.view === 'search' && (
          <div className="pt-16">
            <SearchResults
              query={searchQuery}
              posts={posts}
              onViewPost={handleViewPost}
              onClear={() => setNav({ view: 'home' })}
            />
          </div>
        )}

        {nav.view === 'about' && (
          <AboutPage totalPosts={posts.length} onNavigate={navigate} />
        )}
      </main>

      {showNavbarFooter && <Footer onNavigate={navigate} />}
    </div>
  );
}
