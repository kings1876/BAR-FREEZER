import type { MetadataRoute } from 'next';

const DISALLOW = ['/api/', '/admin/', '/order/', '/cart/', '/checkout/', '/search/'];

// Search engines and AI assistants are welcome on the public catalogue; private paths are blocked for everyone.
const AI_BOTS = ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Applebot', 'Amazonbot', 'Google-Extended', 'CCBot', 'cohere-ai', 'Meta-ExternalAgent'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: 'https://barfreezer.com.au/sitemap.xml',
  };
}
