import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Eye, MessageCircle, Clock, Share2, Bookmark, Edit2, Trash2, ThumbsUp, Send, Tag } from 'lucide-react';
import { Post, ViewType } from '../types';

interface PostViewProps {
  post: Post;
  onBack: () => void;
  onNavigate: (view: ViewType, data?: unknown) => void;
  onLike: (id: string) => void;
  onAddComment: (postId: string, comment: { author: string; email: string; content: string }) => void;
  onLikeComment: (postId: string, commentId: string) => void;
  onDelete: (id: string) => void;
  relatedPosts: Post[];
  onViewPost: (post: Post) => void;
}

const categoryColors: Record<string, string> = {
  Technology: 'bg-blue-50 text-blue-700',
  Design: 'bg-rose-50 text-rose-700',
  Programming: 'bg-emerald-50 text-emerald-700',
  Career: 'bg-amber-50 text-amber-700',
  Productivity: 'bg-cyan-50 text-cyan-700',
};

function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCode = false;
  let codeLines: string[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (inCode) {
        elements.push(
          <pre key={key++} className="bg-gray-950 text-gray-100 rounded-xl p-5 my-5 overflow-x-auto text-sm leading-relaxed font-mono">
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        codeLines = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="text-xl font-semibold text-gray-900 mt-8 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      elements.push(<p key={key++} className="font-semibold text-gray-900 mt-4">{line.slice(2, -2)}</p>);
    } else if (line.match(/^\d+\. /)) {
      elements.push(<li key={key++} className="ml-6 text-gray-600 leading-relaxed list-decimal">{line.replace(/^\d+\. /, '')}</li>);
    } else if (line.startsWith('- ')) {
      elements.push(<li key={key++} className="ml-6 text-gray-600 leading-relaxed list-disc">{line.slice(2)}</li>);
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      // inline formatting
      const formatted = line
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>');
      elements.push(
        <p key={key++} className="text-gray-600 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: formatted }} />
      );
    }
  }

  return elements;
}

export default function PostView({
  post,
  onBack,
  onNavigate,
  onLike,
  onAddComment,
  onLikeComment,
  onDelete,
  relatedPosts,
  onViewPost,
}: PostViewProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [comment, setComment] = useState({ author: '', email: '', content: '' });
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const colorClass = categoryColors[post.category] ?? 'bg-gray-100 text-gray-700';
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  function handleLike() {
    if (!liked) {
      onLike(post.id);
      setLiked(true);
    }
  }

  function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (comment.author && comment.content) {
      onAddComment(post.id, comment);
      setComment({ author: '', email: '', content: '' });
      setCommentSubmitted(true);
      setTimeout(() => setCommentSubmitted(false), 3000);
    }
  }

  function handleDelete() {
    onDelete(post.id);
    onBack();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-80 sm:h-[28rem] overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-20 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {/* Content wrapper */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Card header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${colorClass}`}>{post.category}</span>
            <span className="text-gray-400 text-sm flex items-center gap-1"><Clock size={13} /> {post.readTime} min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-6">{post.excerpt}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>

          {/* Author + Meta */}
          <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-gray-900">{post.author.name}</p>
                <p className="text-xs text-gray-400">{post.author.role} · {date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1"><Eye size={14} /> {post.views.toLocaleString()}</span>
              <span className="flex items-center gap-1"><Heart size={14} /> {post.likes}</span>
              <span className="flex items-center gap-1"><MessageCircle size={14} /> {post.comments.length}</span>
            </div>
          </div>

          {/* Action bar */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                liked ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-rose-50 hover:text-rose-600'
              }`}
            >
              <Heart size={15} className={liked ? 'fill-rose-500 text-rose-500' : ''} />
              {liked ? 'Liked' : 'Like'}
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                bookmarked ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-amber-50 hover:text-amber-600'
              }`}
            >
              <Bookmark size={15} className={bookmarked ? 'fill-amber-500 text-amber-500' : ''} />
              {bookmarked ? 'Saved' : 'Save'}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-all">
              <Share2 size={15} /> Share
            </button>
            <div className="flex-1" />
            <button
              onClick={() => onNavigate('edit', post)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-all"
            >
              <Edit2 size={15} /> Edit
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-all"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        {/* Article body */}
        <div className="prose-custom mb-12 space-y-2">
          {renderContent(post.content)}
        </div>

        {/* Author bio */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12 flex gap-5">
          <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-full object-cover shrink-0" />
          <div>
            <p className="font-bold text-gray-900 mb-0.5">{post.author.name}</p>
            <p className="text-sm text-gray-500 mb-2">{post.author.role}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{post.author.bio}</p>
          </div>
        </div>

        {/* Comments */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <MessageCircle size={22} />
            {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
          </h2>

          {post.comments.length > 0 && (
            <div className="space-y-4 mb-10">
              {post.comments.map(c => (
                <div key={c.id} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {c.author[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{c.author}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onLikeComment(post.id, c.id)}
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <ThumbsUp size={13} /> {c.likes}
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* Comment form */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="font-semibold text-gray-900 mb-6">Leave a Comment</h3>
            {commentSubmitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ThumbsUp size={20} className="text-emerald-600" />
                </div>
                <p className="text-emerald-700 font-medium">Comment posted!</p>
              </div>
            ) : (
              <form onSubmit={handleComment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Name *</label>
                    <input
                      type="text"
                      required
                      value={comment.author}
                      onChange={e => setComment(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      value={comment.email}
                      onChange={e => setComment(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Comment *</label>
                  <textarea
                    required
                    rows={4}
                    value={comment.content}
                    onChange={e => setComment(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                    placeholder="Share your thoughts..."
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
                >
                  <Send size={15} /> Post Comment
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map(rp => (
                <button
                  key={rp.id}
                  onClick={() => onViewPost(rp)}
                  className="group text-left bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-all"
                >
                  <img src={rp.coverImage} alt={rp.title} className="w-full h-32 object-cover group-hover:opacity-90 transition-opacity" />
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">{rp.category}</p>
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-gray-600 transition-colors">{rp.title}</h4>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-rose-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Post</h3>
            <p className="text-gray-500 text-sm text-center mb-6">This action cannot be undone. Are you sure you want to delete this post?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-rose-600 text-white text-sm font-medium rounded-xl hover:bg-rose-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
