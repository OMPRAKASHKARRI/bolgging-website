import { BookOpen, Twitter, Github, Rss, Heart } from 'lucide-react';
import { ViewType } from '../types';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 mb-4 group"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <BookOpen size={16} className="text-gray-900" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">BlogCraft</span>
            </button>
            <p className="text-sm leading-relaxed max-w-xs">
              A space for ideas, tutorials, and stories about technology, design, and the craft of building software.
            </p>
            <div className="flex gap-3 mt-6">
              {[Twitter, Github, Rss].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  <Icon size={16} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', view: 'home' },
                { label: 'All Posts', view: 'blog' },
                { label: 'Write a Post', view: 'write' },
                { label: 'About', view: 'about' },
              ].map(item => (
                <li key={item.view}>
                  <button
                    onClick={() => onNavigate(item.view as ViewType)}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Topics</h4>
            <ul className="space-y-3">
              {['Technology', 'Design', 'Programming', 'Career', 'Productivity'].map(topic => (
                <li key={topic}>
                  <button className="text-sm hover:text-white transition-colors">{topic}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} BlogCraft. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Made with <Heart size={12} className="text-rose-500 fill-rose-500" /> using React
          </p>
        </div>
      </div>
    </footer>
  );
}
