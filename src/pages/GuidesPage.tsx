import React from 'react';
import { ChevronRight, ArrowRight, Clock, Calendar, BookOpen, Share2, Printer } from 'lucide-react';
import { POSTS } from '../config/site.js';
import { useRouter, Link } from '../context/RouterContext';

export const GuidesPage: React.FC = () => {
  const { routeMatch } = useRouter();
  const guideSlug = routeMatch.params.slug;

  const currentGuide = guideSlug ? POSTS.find((p: any) => p.slug === guideSlug) : null;

  if (currentGuide) {
    // Individual Article View
    return (
      <div className="bg-slate-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 space-x-1 font-medium">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/guides/" className="hover:text-slate-900">Guides</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold truncate max-w-sm" aria-current="page">{currentGuide.title}</span>
          </nav>

          {/* Article Header */}
          <header className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-4">
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="text-cyan-700 font-semibold uppercase tracking-wider">{currentGuide.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>{currentGuide.publishedAt}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentGuide.readTime}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {currentGuide.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed italic border-l-2 border-amber-500 pl-4 py-1">
              {currentGuide.excerpt}
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Published by Bar Freezer Technical Engineering Desk</span>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Guide</span>
              </button>
            </div>
          </header>

          {/* Article Body */}
          <article className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-10 shadow-xs prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4">
            {currentGuide.content.split('\n\n').map((paragraph: string, i: number) => (
              <p key={i} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Related Articles Footer */}
          <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              More Australian Refrigeration Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {POSTS.filter((p: any) => p.slug !== currentGuide.slug).slice(0, 2).map((other: any) => (
                <Link
                  key={other.slug}
                  href={`/guides/${other.slug}/`}
                  className="p-4 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 block transition-all group"
                >
                  <span className="text-[11px] text-cyan-400 font-mono block">{other.category}</span>
                  <span className="text-sm font-bold text-white group-hover:text-amber-400 block mt-1 line-clamp-1">
                    {other.title}
                  </span>
                  <span className="text-xs text-slate-400 block mt-2 line-clamp-2">
                    {other.excerpt}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Guides Hub View
  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 space-x-1 font-medium">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Buying Guides & Technical Advice</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider">
            <span>HOSPITALITY REFRIGERATION ADVISORY</span>
            <span>·</span>
            <span>WRITTEN BY LICENSED MECHANICS</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Commercial Bar Refrigeration Guides & Australian Standards
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Essential sizing rules, cabinetry ventilation calculations, MEPS greenhouse ratings, and hospitality financing comparisons to ensure you select the correct equipment for your venue.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post: any) => (
            <article 
              key={post.slug}
              className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="text-cyan-700 font-semibold">{post.category}</span>
                  <span className="font-mono">{post.readTime}</span>
                </div>

                <h2 className="text-base font-bold text-slate-900 leading-snug">
                  <Link href={`/guides/${post.slug}/`} className="hover:text-cyan-700 transition-colors">
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">{post.publishedAt}</span>
                <Link
                  href={`/guides/${post.slug}/`}
                  className="font-bold text-slate-800 hover:text-amber-600 flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
