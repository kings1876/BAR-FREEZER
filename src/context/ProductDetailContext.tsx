'use client';

import React, { createContext, useContext } from 'react';

// Detail fields (specs, full description, dimension guide, related ids) for the product page being rendered.
// Supplied by the server render so they are part of the page HTML and not shipped in the shared JS bundle.
export interface ProductDetail {
  id: string;
  base?: any;
  alts?: any[];
  related?: any[];
  guide?: { slug: string; content: string; faqs?: { q: string; a: string }[] };
  images?: string[];
  features?: string[];
  shortDescription?: string;
  specs?: Record<string, any>;
  fullDescription?: string;
  dimensionGuide?: any;
  sourceUrl?: string;
  alternatives?: string[];
  frequentlyBoughtTogether?: string[];
  h1?: string;
  term?: string;
  intro?: string;
}

const Ctx = createContext<ProductDetail | null>(null);

export const ProductDetailProvider: React.FC<{ detail: ProductDetail | null; children: React.ReactNode }> = ({ detail, children }) => (
  <Ctx.Provider value={detail}>{children}</Ctx.Provider>
);

export const useProductDetail = () => useContext(Ctx);
