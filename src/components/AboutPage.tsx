import { Mail, Twitter, Github, BookOpen, Target, Users } from 'lucide-react';
import { authors } from '../data/initialData';
import { ViewType } from '../types';

interface AboutPageProps {
  totalPosts: number;
  onNavigate: (view: ViewType) => void;
}

export default function AboutPage({ totalPosts, onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-semibold px-4 py-2 rounded-full mb-6">
          <BookOpen size={13} /> About BlogCraft
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Ideas worth<br />reading about.
        </h1>
        <p className="text-gray-500 text-xl leading-relaxed max-w-2xl mx-auto">
          BlogCraft is an independent publication exploring technology, design, and the craft of building software.
          Written by engineers, for engineers — and anyone curious about how the digital world is built.
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: BookOpen, label: 'Articles published', value: totalPosts },
            { icon: Users, label: 'Authors', value: authors.length },
            { icon: Target, label: 'Topics covered', value: 5 },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon size={20} className="text-white" />
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">{stat.value}+</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="bg-gray-950 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We believe that sharing knowledge is one of the highest-leverage activities in software.
            When experienced engineers write clearly about what they've learned — the hard lessons,
            the elegant patterns, the mistakes — the whole field moves forward. That's what we're building.
          </p>
        </div>
      </div>

      {/* Authors */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Meet the Authors</h2>
        <p className="text-gray-500 text-center mb-12">The people behind the words.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {authors.map(author => (
            <div key={author.id} className="bg-gray-50 rounded-2xl p-8 text-center group hover:shadow-lg transition-all">
              <div className="relative inline-block mb-5">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-md group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-0.5">{author.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{author.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{author.bio}</p>
              <div className="flex justify-center gap-2">
                {[Twitter, Github, Mail].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-400 transition-all"
                  >
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-center">
        <div className="bg-gray-50 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Want to contribute?</h2>
          <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
            We welcome guest contributors. If you have something interesting to say about technology, design, or engineering, we'd love to publish it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('write')}
              className="px-8 py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
            >
              Write a Post
            </button>
            <button className="px-8 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
