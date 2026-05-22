import { ArrowRight, TrendingUp, BookOpen, Users } from 'lucide-react';
import { Post, ViewType } from '../types';

interface HeroSectionProps {
  featuredPost: Post | null;
  totalPosts: number;
  onNavigate: (view: ViewType) => void;
  onViewPost: (post: Post) => void;
}

export default function HeroSection({ featuredPost, totalPosts, onNavigate, onViewPost }: HeroSectionProps) {
  if (!featuredPost) return null;

  return (
    <section className="relative min-h-screen bg-gray-950 flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={featuredPost.coverImage}
          alt={featuredPost.title}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-950/30" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-32">
        {/* Stats row */}
        <div className="flex gap-8 mb-12">
          {[
            { icon: BookOpen, label: 'Articles', value: totalPosts },
            { icon: TrendingUp, label: 'Topics', value: 5 },
            { icon: Users, label: 'Authors', value: 3 },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-2">
              <stat.icon size={16} className="text-gray-400" />
              <span className="text-white font-semibold">{stat.value}</span>
              <span className="text-gray-400 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Featured badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Featured Story
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl mb-6">
          {featuredPost.title}
        </h1>

        {/* Excerpt */}
        <p className="text-gray-300 text-lg max-w-2xl leading-relaxed mb-8">
          {featuredPost.excerpt}
        </p>

        {/* Author + CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-3">
            <img
              src={featuredPost.author.avatar}
              alt={featuredPost.author.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
            />
            <div>
              <p className="text-white font-medium text-sm">{featuredPost.author.name}</p>
              <p className="text-gray-400 text-xs">
                {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {featuredPost.readTime} min read
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onViewPost(featuredPost)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold text-sm rounded-xl hover:bg-gray-100 transition-colors"
            >
              Read Article
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium text-sm rounded-xl hover:bg-white/20 transition-colors"
            >
              All Posts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
