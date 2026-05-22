import { useState, useEffect } from 'react';
import { PenSquare, Search, Menu, X, BookOpen, Rss } from 'lucide-react';
import { ViewType } from '../types';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onSearch: (query: string) => void;
}

export default function Navbar({ currentView, onNavigate, onSearch }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', view: 'home' as ViewType },
    { label: 'Blog', view: 'blog' as ViewType },
    { label: 'About', view: 'about' as ViewType },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <BookOpen size={16} className="text-white" />
              </div>
              <span className={`font-bold text-lg tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}>
                BlogCraft
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <button
                  key={link.view}
                  onClick={() => onNavigate(link.view)}
                  className={`text-sm font-medium transition-colors relative group ${
                    currentView === link.view
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gray-900 transition-all duration-200 ${
                      currentView === link.view ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <button
                onClick={() => onNavigate('write')}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                <PenSquare size={14} />
                Write
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-gray-500 hover:text-gray-900 rounded-lg"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <button
                  key={link.view}
                  onClick={() => { onNavigate(link.view); setMenuOpen(false); }}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentView === link.view
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { onNavigate('write'); setMenuOpen(false); }}
                className="flex items-center gap-2 mt-2 px-4 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg"
              >
                <PenSquare size={14} />
                Write a Post
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-slideDown">
            <form onSubmit={handleSearch} className="flex items-center gap-3 p-4">
              <Search size={20} className="text-gray-400 shrink-0" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search posts, topics, tags..."
                className="flex-1 text-gray-900 text-lg outline-none placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </form>
            <div className="border-t border-gray-100 px-4 py-3">
              <p className="text-xs text-gray-400">Press Enter to search or Esc to close</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
