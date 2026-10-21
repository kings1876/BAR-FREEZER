import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ChevronRight, ArrowUpDown, RotateCcw, AlertCircle } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../config/site.js';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar, initialFilterState, FilterState } from '../components/FilterSidebar';
import { useRouter, Link } from '../context/RouterContext';
import { Product } from '../types';
import { CATEGORY_COPY } from '../config/seo-category-copy';
import { KEYWORD_META } from '../config/seo-keywords';
import { PagedGrid } from '../components/PagedGrid';
import { RelatedSearches } from '../components/RelatedSearches';

export const CategoryPage: React.FC = () => {
  const { currentPath, routeMatch } = useRouter();
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'capacity-desc' | 'brand-asc'>('featured');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Determine current active category from route
  const rootSlug = routeMatch.slugs[0] || 'bar-freezers';
  const subSlug = routeMatch.slugs[1];
  const typeSlug = routeMatch.slugs[2];

  const rootCategory = CATEGORIES.find((c: any) => c.slug === rootSlug) || CATEGORIES[0];
  const activeSubCategory = subSlug ? rootCategory.subcategories.find((s: any) => s.slug === subSlug) : null;
  const activeType = typeSlug && activeSubCategory ? activeSubCategory.types.find((t: any) => t.slug === typeSlug) : null;

  // Title & description
  const pageTitle = activeType 
    ? `${activeType.name} ${rootCategory.name}` 
    : activeSubCategory 
    ? activeSubCategory.name 
    : rootCategory.name;

  const pageDescription = activeType
    ? `Compare ${activeType.name.toLowerCase()} by size, capacity and price. Check the specifications on each product, and request a quote for multiple units.`
    : activeSubCategory
    ? activeSubCategory.description
    : rootCategory.description;

  const kwCopy = (CATEGORY_COPY as any)[currentPath];

  // Filter products based on route category and active faceted filters
  const categoryBaseProducts = useMemo(() => {
    return PRODUCTS.filter((p: any) => {
      // If root category matches
      const matchesRoot = 
        (rootSlug === 'bar-freezers' && p.primaryCategory === 'Bar Freezers') ||
        (rootSlug === 'bar-fridges' && p.primaryCategory === 'Bar Fridges & Coolers') ||
        (rootSlug === 'accessories-parts' && p.primaryCategory === 'Accessories & Parts');

      if (!matchesRoot) return false;

      // If subcategory is selected
      if (activeSubCategory && p.categorySlug !== activeSubCategory.slug) {
        return false;
      }

      // If specific type is selected
      if (activeType && p.type.toLowerCase() !== activeType.name.toLowerCase() && !p.name.toLowerCase().includes(activeType.name.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [rootSlug, activeSubCategory, activeType]);

  // Apply faceted filters & search
  const filteredProducts = useMemo(() => {
    return categoryBaseProducts.filter((product: any) => {
      // Doors
      if (filters.doors.length > 0) {
        const matchesDoor = filters.doors.some((d) => (d === 4 ? product.doorCount >= 4 : product.doorCount === d));
        if (!matchesDoor) return false;
      }

      // Door Type
      if (filters.doorType.length > 0 && !filters.doorType.includes(product.doorType)) {
        return false;
      }

      // Width Range
      if (filters.widthRange.length > 0 && !filters.widthRange.includes(product.widthRange)) {
        return false;
      }

      // Brand
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) {
        return false;
      }

      // Price Range
      if (filters.priceRange.length > 0) {
        if (product.price == null) return false;
        const matchesPrice = filters.priceRange.some((range) => {
          if (range === '<1000') return product.price < 1000;
          if (range === '1000-2000') return product.price >= 1000 && product.price <= 2000;
          if (range === '2000-3500') return product.price > 2000 && product.price <= 3500;
          if (range === '3500-5000') return product.price > 3500 && product.price <= 5000;
          if (range === '5000+') return product.price > 5000;
          return true;
        });
        if (!matchesPrice) return false;
      }

      // Finish
      if (filters.finish.length > 0 && !filters.finish.includes(product.finish)) {
        return false;
      }

      // Use
      if (filters.use.length > 0 && !filters.use.includes(product.use)) {
        return false;
      }

      // Warranty Years
      if (filters.warrantyYears.length > 0 && !filters.warrantyYears.includes(product.warrantyYears)) {
        return false;
      }

      return true;
    });
  }, [categoryBaseProducts, filters]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    } else if (sortBy === 'capacity-desc') {
      list.sort((a, b) => b.capacityLitres - a.capacityLitres);
    } else if (sortBy === 'brand-asc') {
      list.sort((a, b) => a.brand.localeCompare(b.brand));
    }
    return list;
  }, [filteredProducts, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumbs with trailing slashes */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 space-x-1 font-medium">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href={rootCategory.path} className="hover:text-slate-900">{rootCategory.name}</Link>
          {activeSubCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href={activeSubCategory.path} className="hover:text-slate-900">{activeSubCategory.name}</Link>
            </>
          )}
          {activeType && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-semibold" aria-current="page">{activeType.name}</span>
            </>
          )}
        </nav>

        {/* Category Header Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider">
            <span>BAR FRIDGES, FREEZERS &amp; ACCESSORIES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {(() => { const h = kwCopy ? kwCopy.h1 : pageTitle; const mt = (KEYWORD_META as any)[currentPath]?.title; return mt && String(mt).trim().toLowerCase() === String(h).trim().toLowerCase() ? (/australia/i.test(h) ? `${h}: Compare Models` : `${h} in Australia`) : h; })()}
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            {kwCopy ? kwCopy.intro : pageDescription}
          </p>
          {kwCopy && kwCopy.guide && (
            <p className="text-xs">
              <Link href={kwCopy.guide.href} className="font-semibold text-cyan-700 hover:text-cyan-800">{kwCopy.guide.label} &rarr;</Link>
            </p>
          )}

          {/* Subcategories Selector Tabs */}
          {rootCategory.subcategories.length > 0 && !activeType && (
            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
              <Link
                href={rootCategory.path}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  !activeSubCategory
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All {rootCategory.name}
              </Link>
              {rootCategory.subcategories.map((sub: any) => (
                <Link
                  key={sub.slug}
                  href={sub.path}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    activeSubCategory?.slug === sub.slug
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
          {!activeSubCategory && rootCategory.subcategories.some((s: any) => s.types && s.types.length > 0) && (
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Browse {rootCategory.name} by type:</span>
              {rootCategory.subcategories.flatMap((s: any) => s.types || []).map((t: any) => (
                <Link key={t.path} href={t.path} className="px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                  {t.name}
                </Link>
              ))}
            </div>
          )}
          {activeSubCategory && activeSubCategory.types && activeSubCategory.types.length > 0 && (
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Browse {activeSubCategory.name} by type:</span>
              {activeSubCategory.types.map((t: any) => (
                <Link
                  key={t.slug}
                  href={t.path}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeType?.slug === t.slug ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {t.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Layout (Sidebar + Grid) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            totalProductsCount={categoryBaseProducts.length}
            filteredCount={filteredProducts.length}
            isMobileDrawerOpen={isMobileDrawerOpen}
            setIsMobileDrawerOpen={setIsMobileDrawerOpen}
          />

          {/* Right Product Grid Area */}
          <div className="flex-1 w-full space-y-4">
            
            {/* Toolbar: Count + Mobile Filter Trigger + Sort dropdown */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMobileDrawerOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-md transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4 text-cyan-600" />
                  <span>Filter Equipment ({filteredProducts.length})</span>
                </button>

                <span className="text-xs text-slate-500 font-mono">
                  Showing <strong>{filteredProducts.length}</strong> of {categoryBaseProducts.length} commercial units
                </span>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Sort by:</span>
                <select
                  aria-label="Sort products"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-amber-500"
                >
                  <option value="featured">Best Sellers & Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="capacity-desc">Capacity: Largest First</option>
                  <option value="brand-asc">Brand: A to Z</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {sortedProducts.length > 0 ? (
              <PagedGrid
                items={sortedProducts}
                pageSize={8}
                resetKey={`${currentPath}|${sortBy}|${JSON.stringify(filters)}`}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                render={(product: any) => <ProductCard key={product.id} product={product} />}
              />
            ) : (
              <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No equipment matches current filter criteria</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing some filter options or reset all filters to view our full commercial inventory.
                </p>
                <button
                  onClick={() => setFilters(initialFilterState)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {categoryBaseProducts.length > 0 && (
              <nav aria-label={`All ${pageTitle} models`} className="mt-10">
                <h2 className="text-base font-bold text-slate-900">All {pageTitle} models ({categoryBaseProducts.length})</h2>
                <ul className="mt-3 columns-1 sm:columns-2 gap-6 text-xs text-slate-700 space-y-1">
                  {categoryBaseProducts.map((p: any) => (
                    <li key={p.id} className="break-inside-avoid">
                      <Link href={`/product/${p.slug}/`} className="hover:text-cyan-700 hover:underline">{p.name}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <RelatedSearches
              path={currentPath}
              noun={(kwCopy && kwCopy.h1 ? String(kwCopy.h1).replace(/ for Sale.*$/i, '').replace(/ in Australia$/i, '') : pageTitle).toLowerCase()}
              minPrice={(() => { const ps = categoryBaseProducts.map((p: any) => p.price).filter((n: any) => typeof n === 'number' && n > 0); return ps.length ? Math.min(...ps) : null; })()}
            />

            {/* Quick Trade Quote Callout at bottom of category */}
            <div className="bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-800 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h2 className="text-base font-bold text-white">Need multiple units or custom stainless benchwork?</h2>
                <p className="text-xs text-slate-400">Send us your list for a delivered price on multiple units.</p>
              </div>
              <Link
                href="/quote/"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md transition-colors whitespace-nowrap"
              >
                Request Trade Quote &rarr;
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
