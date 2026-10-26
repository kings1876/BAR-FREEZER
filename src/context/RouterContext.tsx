import React, { createContext, useContext, useState, useCallback } from 'react';
import { usePathname, useRouter as useNextRouter } from 'next/navigation';
import NextLink from 'next/link';

export interface RouteMatch {
  pathname: string;
  routeType:
    | 'home'
    | 'category'
    | 'product'
    | 'brand'
    | 'venue'
    | 'delivery'
    | 'guide'
    | 'guides-hub'
    | 'trade'
    | 'quote'
    | 'finance'
    | 'warranty'
    | 'deals'
    | 'compare'
    | 'reviews'
    | 'about'
    | 'contact'
    | 'faq'
    | 'returns'
    | 'payment-methods'
    | 'pay-crypto'
    | 'cart'
    | 'checkout'
    | 'search'
    | '404';
  params: Record<string, string>;
  slugs: string[];
}

interface RouterContextType {
  currentPath: string;
  routeMatch: RouteMatch;
  navigate: (to: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function normalizePath(path: string): string {
  if (!path) return '/';
  let p = path.split('?')[0].split('#')[0];
  if (!p.startsWith('/')) p = '/' + p;
  if (!p.endsWith('/')) p = p + '/';
  return p;
}

export function parseRoute(pathname: string): RouteMatch {
  const norm = normalizePath(pathname);

  if (norm === '/') {
    return { pathname: norm, routeType: 'home', params: {}, slugs: [] };
  }

  // Exact static routes
  if (norm === '/trade/') return { pathname: norm, routeType: 'trade', params: {}, slugs: [] };
  if (norm === '/quote/') return { pathname: norm, routeType: 'quote', params: {}, slugs: [] };
  if (norm === '/finance/') return { pathname: norm, routeType: 'finance', params: {}, slugs: [] };
  if (norm === '/warranty-service/' || norm === '/warranty/') return { pathname: norm, routeType: 'warranty', params: {}, slugs: [] };
  if (norm === '/deals/' || norm === '/clearance/') return { pathname: norm, routeType: 'deals', params: {}, slugs: [] };
  if (norm === '/compare/') return { pathname: norm, routeType: 'compare', params: {}, slugs: [] };
  if (norm === '/reviews/') return { pathname: norm, routeType: 'reviews', params: {}, slugs: [] };
  if (norm === '/about/') return { pathname: norm, routeType: 'about', params: {}, slugs: [] };
  if (norm === '/contact/') return { pathname: norm, routeType: 'contact', params: {}, slugs: [] };
  if (norm === '/faq/') return { pathname: norm, routeType: 'faq', params: {}, slugs: [] };
  if (norm === '/payment-methods/') return { pathname: norm, routeType: 'payment-methods', params: {}, slugs: [] };
  if (norm === '/pay-crypto/') return { pathname: norm, routeType: 'pay-crypto', params: {}, slugs: [] };
  if (norm === '/returns/') return { pathname: norm, routeType: 'returns', params: {}, slugs: [] };
  if (norm === '/cart/') return { pathname: norm, routeType: 'cart', params: {}, slugs: [] };
  if (norm === '/checkout/') return { pathname: norm, routeType: 'checkout', params: {}, slugs: [] };
  if (norm === '/search/') return { pathname: norm, routeType: 'search', params: {}, slugs: [] };
  if (norm === '/delivery/') return { pathname: norm, routeType: 'delivery', params: {}, slugs: [] };
  if (norm === '/guides/') return { pathname: norm, routeType: 'guides-hub', params: {}, slugs: [] };

  // Dynamic segments
  const segments = norm.split('/').filter(Boolean);

  // /product/[slug]/
  if (segments[0] === 'product' && segments[1]) {
    return {
      pathname: norm,
      routeType: 'product',
      params: { slug: segments[1] },
      slugs: [segments[1]]
    };
  }

  // /brands/[brand]/
  if (segments[0] === 'brands' && segments[1]) {
    return {
      pathname: norm,
      routeType: 'brand',
      params: { brand: segments[1] },
      slugs: [segments[1]]
    };
  }

  // /venues/[venue]/
  if (segments[0] === 'venues' && segments[1]) {
    return {
      pathname: norm,
      routeType: 'venue',
      params: { venue: segments[1] },
      slugs: [segments[1]]
    };
  }

  // /delivery/[city]/
  if (segments[0] === 'delivery' && segments[1]) {
    return {
      pathname: norm,
      routeType: 'delivery',
      params: { city: segments[1] },
      slugs: [segments[1]]
    };
  }

  // /guides/[slug]/
  if (segments[0] === 'guides' && segments[1]) {
    return {
      pathname: norm,
      routeType: 'guide',
      params: { slug: segments[1] },
      slugs: [segments[1]]
    };
  }

  // Category routes:
  // /bar-freezers/[...slug], /bar-fridges/[...slug], /accessories-parts/[...slug]
  if (segments[0] === 'bar-freezers' || segments[0] === 'bar-fridges' || segments[0] === 'accessories-parts') {
    return {
      pathname: norm,
      routeType: 'category',
      params: { rootCategory: segments[0] },
      slugs: segments
    };
  }

  return { pathname: norm, routeType: '404', params: {}, slugs: segments };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const nextRouter = useNextRouter();
  const currentPath = normalizePath(pathname || '/');

  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigate = useCallback((to: string) => {
    const normalized = normalizePath(to);
    if (typeof window !== 'undefined' && window.location.pathname !== normalized) {
      nextRouter.push(normalized);
    }
  }, [nextRouter]);

  const routeMatch = parseRoute(currentPath);

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        routeMatch,
        navigate,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ href, children, className, onClick, ...props }) => {
  const isInternal = href.startsWith('/') && !props.target;
  if (!isInternal) {
    return (
      <a href={href} onClick={onClick} className={className} {...props}>
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href} onClick={onClick} className={className} {...(props as any)}>
      {children}
    </NextLink>
  );
};
