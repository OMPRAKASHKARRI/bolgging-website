import { ArrowRight, TrendingUp, BookOpen, Cpu, Palette, Code2, Briefcase, Zap } from 'lucide-react';
import { Post, ViewType } from '../types';
import HeroSection from './HeroSection';
import PostCard from './PostCard';

interface HomePageProps {
  posts: Post[];
  onViewPost: (post: Post) => void;
  onNavigate: (view: ViewType) => void;
}

const categoryMeta: Record<string, { icon: React.ComponentType<{ size?: number; className?: string }>, color: string, bg: string }> = {
  Technology: { icon: Cpu, color: 'text-blue-600', bg: 'bg-blue-50' },
  Design: { icon: Palette, color: 'text-rose-600', bg: 'bg-rose-50' },
  Programming: { icon: Code2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  Career: { icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50' },
  Productivity: { icon: Zap, color: 'text-cyan-600', bg: 'bg-cyan-50' },
};

export default function HomePage({ posts, onViewPost, onNavigate }: HomePageProps) {
  const featured = posts.find(p => p.featured) ?? posts[0] ?? null;
  const trending = [...posts].sort((a, b) => b.views - a.views).slice(0, 3);
  const recent = [...posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6);

  const categoryCounts = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <HeroSection
        featuredPost={featured}
        totalPosts={posts.length}
        onNavigate={onNavigate}
        onViewPost={onViewPost}
      />

      {/* Categories section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Browse by Topic</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(categoryMeta).map(([cat, meta]) => {
            const Icon = meta.icon;
            const count = categoryCounts[cat] ?? 0;
            return (
              <button
                key={cat}
                onClick={() => onNavigate('blog')}
                className={`group ${meta.bg} rounded-2xl p-5 text-left hover:shadow-md transition-all`}
              >
                <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
                  <Icon size={18} className={meta.color} />
                </div>
                <p className="font-semibold text-gray-900 text-sm">{cat}</p>
                <p className="text-xs text-gray-500 mt-0.5">{count} {count === 1 ? 'post' : 'posts'}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Trending + Sidebar layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Recent posts */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
              <button
                onClick={() => onNavigate('blog')}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
              >
                View all <ArrowRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recent.map(post => (
                <PostCard key={post.id} post={post} onView={onViewPost} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trending */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp size={18} className="text-gray-700" />
                <h3 className="font-bold text-gray-900">Trending Now</h3>
              </div>
              <div className="space-y-1">
                {trending.map((post, i) => (
                  <PostCard key={post.id} post={post} onView={onViewPost} variant="compact" />
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                <BookOpen size={18} className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Stay in the loop</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Get the latest posts delivered straight to your inbox every week.
              </p>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-white/30 mb-3"
              />
              <button className="w-full bg-white text-gray-900 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>

            {/* Featured post cards */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                Editor's Picks
              </h3>
              <div className="space-y-3">
                {posts.filter(p => p.featured).slice(0, 2).map(post => (
                  <PostCard key={post.id} post={post} onView={onViewPost} variant="compact" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Write CTA */}
      <section className="bg-gray-950 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Have something to share?</h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Write about what you know, what you've learned, or what you're thinking about.
          </p>
          <button
            onClick={() => onNavigate('write')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors text-lg"
          >
            Start Writing <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
