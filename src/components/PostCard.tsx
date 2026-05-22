import { Clock, Heart, Eye, ArrowRight, MessageCircle } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onView: (post: Post) => void;
  variant?: 'default' | 'featured' | 'compact';
}

const categoryColors: Record<string, string> = {
  Technology: 'bg-blue-50 text-blue-700 border-blue-100',
  Design: 'bg-rose-50 text-rose-700 border-rose-100',
  Programming: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Career: 'bg-amber-50 text-amber-700 border-amber-100',
  Productivity: 'bg-cyan-50 text-cyan-700 border-cyan-100',
};

export default function PostCard({ post, onView, variant = 'default' }: PostCardProps) {
  const colorClass = categoryColors[post.category] ?? 'bg-gray-50 text-gray-700 border-gray-100';
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (variant === 'compact') {
    return (
      <button
        onClick={() => onView(post)}
        className="flex gap-4 group text-left w-full p-4 rounded-xl hover:bg-gray-50 transition-colors"
      >
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-20 h-20 rounded-lg object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border ${colorClass} mb-2`}>
            {post.category}
          </span>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-gray-600 transition-colors leading-snug">
            {post.title}
          </h3>
          <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
            <Clock size={11} /> {post.readTime} min · {date}
          </p>
        </div>
      </button>
    );
  }

  if (variant === 'featured') {
    return (
      <button
        onClick={() => onView(post)}
        className="group relative overflow-hidden rounded-2xl text-left w-full h-full min-h-[360px] flex flex-col justify-end"
      >
        <img
          src={post.coverImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        <div className="relative p-6">
          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-3 ${colorClass}`}>
            {post.category}
          </span>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors leading-tight">
            {post.title}
          </h3>
          <p className="text-gray-300 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-7 h-7 rounded-full object-cover border border-white/30"
              />
              <span className="text-white/80 text-xs">{post.author.name}</span>
            </div>
            <span className="text-white/60 text-xs flex items-center gap-1">
              <Clock size={11} /> {post.readTime} min
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => onView(post)}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 text-left w-full flex flex-col"
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {post.featured && (
          <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${colorClass}`}>
            {post.category}
          </span>
          <span className="text-gray-400 text-xs flex items-center gap-1">
            <Clock size={11} /> {post.readTime} min read
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors leading-snug line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2.5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-xs font-semibold text-gray-800">{post.author.name}</p>
              <p className="text-xs text-gray-400">{date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <span className="flex items-center gap-1"><Heart size={12} /> {post.likes}</span>
            <span className="flex items-center gap-1"><MessageCircle size={12} /> {post.comments.length}</span>
            <span className="flex items-center gap-1 text-gray-900 font-medium group-hover:gap-2 transition-all">
              Read <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
