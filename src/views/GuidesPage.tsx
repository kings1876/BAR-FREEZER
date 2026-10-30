import React from 'react';
import { ChevronRight, ArrowRight, Clock, Calendar, BookOpen, Share2, Printer } from 'lucide-react';
import { POSTS } from '../config/posts-list.js';
import { useRouter, Link } from '../context/RouterContext';
import { useProductDetail } from '../context/ProductDetailContext';

const renderInline = (text: string) => {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\((\/[^)]*)\)/g;
  let last = 0; let m: RegExpExecArray | null; let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(<Link key={k++} href={m[2]} className="text-cyan-700 font-semibold hover:underline">{m[1]}</Link>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
};

const renderBody = (content: string, thumbs: Record<string, string> = {}) =>
  content.split('\n\n').map((block: string, i: number) => {
    if (block.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-slate-900 pt-2">{block.slice(3)}</h2>;
    if (block.startsWith('|')) {
      const rows = block.split('\n').filter((l) => !/^\|[\s|:-]+\|?$/.test(l)).map((l) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim()));
      const [head, ...body] = rows;
      return (
        <div key={i} className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full text-xs text-left border-collapse min-w-[34rem]">
            <thead><tr>{head.map((h, n) => <th key={n} scope="col" className="bg-slate-100 border border-slate-200 px-3 py-2 font-bold text-slate-900">{h}</th>)}</tr></thead>
            <tbody>{body.map((r, n) => <tr key={n} className="odd:bg-white even:bg-slate-50">{r.map((c, m) => <td key={m} className="border border-slate-200 px-3 py-2 align-top">{renderInline(c)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
    }
    const lines = block.split('\n');
    const bullets = lines.filter((l) => l.startsWith('- '));
    if (bullets.length && bullets.length >= lines.length - 1) {
      const intro = lines.filter((l) => !l.startsWith('- '));
      return (
        <div key={i}>
          {intro.map((t, n) => <p key={n} className="whitespace-pre-line">{renderInline(t)}</p>)}
          <ul className="list-disc pl-5 space-y-1 mt-1">{bullets.map((b, n) => {
            const ps = b.match(/\]\(\/product\/([^/)]+)\/\)/);
            const thumb = ps ? thumbs[ps[1]] : null;
            return thumb ? (
              <li key={n} className="list-none -ml-5 flex gap-3 items-start py-1">
                <img src={thumb} alt={(b.match(/\[([^\]]+)\]\(\/product\//) || [])[1] || ''} width={96} height={96} loading="lazy" decoding="async" className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 object-contain rounded-md border border-slate-200 bg-white" />
                <span>{renderInline(b.slice(2))}</span>
              </li>
            ) : <li key={n}>{renderInline(b.slice(2))}</li>;
          })}</ul>
        </div>
      );
    }
    return <p key={i} className="whitespace-pre-line">{renderInline(block)}</p>;
  });

export const GuidesPage: React.FC = () => {
  const { routeMatch } = useRouter();
  const guideSlug = routeMatch.params.slug;

  const detail = useProductDetail();
  const guideBody = detail && detail.guide && detail.guide.slug === guideSlug ? detail.guide : null;
  const currentGuide: any = guideSlug ? { ...POSTS.find((p: any) => p.slug === guideSlug), content: guideBody ? guideBody.content : '', faqs: guideBody ? guideBody.faqs : [] } : null;

  if (currentGuide && currentGuide.title) {
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
              <span>Published by Bar Freezer Australia</span>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Guide</span>
              </button>
            </div>
          </header>

          {guideBody && guideBody.hero && (
            <figure className="bg-white rounded-xl border border-slate-200/90 overflow-hidden">
              <img src={guideBody.hero.src} alt={guideBody.hero.alt} width={800} height={500} fetchPriority="high" decoding="async" className="w-full h-56 sm:h-80 object-contain bg-white p-4" />
              <figcaption className="px-4 pb-3 text-xs text-slate-500">Pictured: <Link href={`/product/${guideBody.hero.slug}/`} className="text-cyan-700 font-semibold hover:underline">{guideBody.hero.name}</Link></figcaption>
            </figure>
          )}

          {/* Article Body */}
          <article className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-10 shadow-xs prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4">
            {renderBody(currentGuide.content, guideBody?.thumbs || {})}
            {currentGuide.faqs && currentGuide.faqs.length > 0 && (
              <section aria-labelledby="guide-faqs" className="pt-4 space-y-3">
                <h2 id="guide-faqs" className="text-xl font-bold text-slate-900">Frequently asked questions</h2>
                {currentGuide.faqs.map((f: any, i: number) => (
                  <div key={i} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                    <h3 className="text-sm font-bold text-slate-900">{f.q}</h3>
                    <p className="mt-1">{f.a}</p>
                  </div>
                ))}
              </section>
            )}
          </article>

          {/* Related Articles Footer */}
          <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              More buying guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {(() => {
                const i = POSTS.findIndex((p: any) => p.slug === currentGuide.slug);
                return [POSTS[(i + 1) % POSTS.length], POSTS[(i + 2) % POSTS.length]];
              })().map((other: any) => (
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
          <span className="text-slate-900 font-semibold">Bar Fridge and Freezer Buying Guides</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider">
            <span>BUYING GUIDES</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bar Fridge and Freezer Buying Guides
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Practical guides to sizing, ventilation, door types, outdoor use and finance, so you can choose the right bar fridge, freezer, kegerator or ice machine for your venue or home bar.
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
