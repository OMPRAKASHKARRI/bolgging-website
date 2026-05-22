import { useState, useMemo } from 'react';
import { Filter, SortAsc, Grid, List } from 'lucide-react';
import { Post } from '../types';
import PostCard from './PostCard';

interface BlogListProps {
  posts: Post[];
  onViewPost: (post: Post) => void;
  title?: string;
  subtitle?: string;
}

type SortOption = 'newest' | 'oldest' | 'popular' | 'trending';

const categories = ['All', 'Technology', 'Design', 'Programming', 'Career', 'Productivity'];

export default function BlogList({ posts, onViewPost, title = 'All Posts', subtitle }: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    let result = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);
    switch (sortBy) {
      case 'oldest':
        return [...result].sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
      case 'popular':
        return [...result].sort((a, b) => b.likes - a.likes);
      case 'trending':
        return [...result].sort((a, b) => b.views - a.views);
      default:
        return [...result].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
  }, [posts, activeCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        {subtitle && <p className="text-gray-500 text-lg">{subtitle}</p>}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap flex-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort + Layout */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg px-3 py-2">
            <SortAsc size={14} className="text-gray-500" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Most Liked</option>
              <option value="trending">Trending</option>
            </select>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setLayout('grid')}
              className={`p-1.5 rounded-md transition-colors ${layout === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`p-1.5 rounded-md transition-colors ${layout === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-400 mb-6">
        {filtered.length} {filtered.length === 1 ? 'post' : 'posts'} found
      </p>

      {/* Posts */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Filter size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No posts found</h3>
          <p className="text-gray-400">Try changing the filter or sort options.</p>
        </div>
      ) : (
        <div
          className={
            layout === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-4'
          }
        >
          {filtered.map(post =>
            layout === 'list' ? (
              <div
                key={post.id}
                onClick={() => onViewPost(post)}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all cursor-pointer p-6 flex gap-6"
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-40 h-28 rounded-xl object-cover shrink-0 group-hover:opacity-90 transition-opacity"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.readTime} min read</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-gray-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-xs text-gray-500">{post.author.name}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <PostCard key={post.id} post={post} onView={onViewPost} />
            )
          )}
        </div>
      )}
    </div>
  );
}
