import { Search, X } from 'lucide-react';
import { Post } from '../types';
import PostCard from './PostCard';

interface SearchResultsProps {
  query: string;
  posts: Post[];
  onViewPost: (post: Post) => void;
  onClear: () => void;
}

export default function SearchResults({ query, posts, onViewPost, onClear }: SearchResultsProps) {
  const results = posts.filter(p => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      p.author.name.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Search size={20} className="text-gray-400" />
              <h1 className="text-2xl font-bold text-gray-900">
                Results for "{query}"
              </h1>
            </div>
            <p className="text-gray-500 text-sm">
              {results.length} {results.length === 1 ? 'post' : 'posts'} found
            </p>
          </div>
          <button
            onClick={onClear}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 border border-gray-200 px-4 py-2 rounded-lg transition-colors"
          >
            <X size={14} /> Clear
          </button>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No results found</h3>
            <p className="text-gray-400">Try different keywords or browse all posts.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(post => (
              <PostCard key={post.id} post={post} onView={onViewPost} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
