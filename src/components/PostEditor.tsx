import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Eye, EyeOff, Tag, X, AlertCircle } from 'lucide-react';
import { Post, Author } from '../types';
import { authors } from '../data/initialData';

interface PostEditorProps {
  existingPost?: Post;
  onSave: (post: Omit<Post, 'id' | 'publishedAt' | 'updatedAt' | 'likes' | 'views' | 'comments'>) => void;
  onBack: () => void;
}

const categories = ['Technology', 'Design', 'Programming', 'Career', 'Productivity'];

const coverOptions = [
  'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800',
];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function PostEditor({ existingPost, onSave, onBack }: PostEditorProps) {
  const [title, setTitle] = useState(existingPost?.title ?? '');
  const [excerpt, setExcerpt] = useState(existingPost?.excerpt ?? '');
  const [content, setContent] = useState(existingPost?.content ?? '');
  const [category, setCategory] = useState(existingPost?.category ?? categories[0]);
  const [coverImage, setCoverImage] = useState(existingPost?.coverImage ?? coverOptions[0]);
  const [customCover, setCustomCover] = useState('');
  const [featured, setFeatured] = useState(existingPost?.featured ?? false);
  const [readTime, setReadTime] = useState(existingPost?.readTime ?? 5);
  const [author, setAuthor] = useState<Author>(existingPost?.author ?? authors[0]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(existingPost?.tags ?? []);
  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const words = content.trim().split(/\s+/).length;
    setReadTime(Math.max(1, Math.round(words / 200)));
  }, [content]);

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const t = tagInput.trim().replace(/,/g, '');
      if (t && !tags.includes(t) && tags.length < 6) {
        setTags(prev => [...prev, t]);
      }
      setTagInput('');
    }
  }

  function removeTag(tag: string) {
    setTags(prev => prev.filter(t => t !== tag));
  }

  function validate(): boolean {
    const errs: string[] = [];
    if (!title.trim()) errs.push('Title is required');
    if (!excerpt.trim()) errs.push('Excerpt is required');
    if (!content.trim()) errs.push('Content is required');
    setErrors(errs);
    return errs.length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    onSave({
      title: title.trim(),
      slug: slugify(title),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category,
      tags,
      coverImage: customCover.trim() || coverImage,
      featured,
      readTime,
      author,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="font-semibold text-gray-900 text-sm">
            {existingPost ? 'Edit Post' : 'New Post'}
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreview(!preview)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg transition-colors"
            >
              {preview ? <EyeOff size={14} /> : <Eye size={14} />}
              {preview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                saved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-900 text-white hover:bg-gray-700'
              }`}
            >
              <Save size={14} />
              {saved ? 'Saved!' : existingPost ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {errors.length > 0 && (
          <div className="mb-6 bg-rose-50 border border-rose-200 rounded-xl p-4 flex gap-3">
            <AlertCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
            <ul className="space-y-1">
              {errors.map(e => (
                <li key={e} className="text-sm text-rose-700">{e}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main editor */}
          <div className="lg:col-span-2 space-y-6">
            {preview ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{title || 'Untitled'}</h1>
                <p className="text-gray-500 text-lg mb-6">{excerpt}</p>
                <div className="prose space-y-3 text-gray-600 leading-relaxed">
                  {content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Title *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Enter a compelling title..."
                      className="w-full text-2xl font-bold text-gray-900 outline-none border-b-2 border-gray-100 focus:border-gray-900 pb-3 transition-colors placeholder-gray-300"
                    />
                    {title && (
                      <p className="text-xs text-gray-400 mt-1.5">Slug: <span className="font-mono">{slugify(title)}</span></p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Excerpt *</label>
                    <textarea
                      value={excerpt}
                      onChange={e => setExcerpt(e.target.value)}
                      placeholder="Write a brief description that will appear in post cards..."
                      rows={3}
                      className="w-full text-gray-600 outline-none resize-none border border-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm leading-relaxed"
                    />
                    <p className="text-xs text-gray-400 mt-1">{excerpt.length}/300 characters</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Content *</label>
                  <p className="text-xs text-gray-400 mb-3">Supports Markdown: ## Heading, **bold**, `code`, ```code block```</p>
                  <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Write your post content here... Use ## for headings, **bold** for emphasis, and ```code``` for code blocks."
                    rows={20}
                    className="w-full text-gray-700 text-sm leading-relaxed outline-none resize-none border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono"
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-gray-400">{content.trim().split(/\s+/).filter(Boolean).length} words</p>
                    <p className="text-xs text-gray-400">~{readTime} min read</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Category */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      category === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Tags</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                    #{tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 text-gray-400 hover:text-gray-700">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
                <Tag size={13} className="text-gray-400" />
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  placeholder="Add tag, press Enter"
                  className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-300"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">{tags.length}/6 tags</p>
            </div>

            {/* Author */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Author</label>
              <div className="space-y-2">
                {authors.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setAuthor(a)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                      author.id === a.id ? 'bg-gray-100 ring-2 ring-gray-900' : 'hover:bg-gray-50'
                    }`}
                  >
                    <img src={a.avatar} alt={a.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{a.name}</p>
                      <p className="text-xs text-gray-400">{a.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cover image */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Cover Image</label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {coverOptions.map(url => (
                  <button
                    key={url}
                    onClick={() => { setCoverImage(url); setCustomCover(''); }}
                    className={`relative rounded-lg overflow-hidden h-14 transition-all ${
                      coverImage === url && !customCover ? 'ring-2 ring-gray-900' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <input
                type="url"
                value={customCover}
                onChange={e => { setCustomCover(e.target.value); if (e.target.value) setCoverImage(e.target.value); }}
                placeholder="Or paste custom URL..."
                className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              {(customCover || coverImage) && (
                <div className="mt-3 rounded-xl overflow-hidden h-28">
                  <img
                    src={customCover || coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={e => (e.currentTarget.src = coverOptions[0])}
                  />
                </div>
              )}
            </div>

            {/* Options */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Options</label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700">Featured post</span>
                <div
                  onClick={() => setFeatured(!featured)}
                  className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${featured ? 'bg-gray-900' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${featured ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
