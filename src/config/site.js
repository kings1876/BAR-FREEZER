// Barrel for server code and scripts. Client components import core.js / products-data.js directly so that
// pages which do not need the product catalogue do not download it.
import { EXTRA_POSTS } from './guides-extra.js';

export * from './core.js';
export { PRODUCTS, ACCESSORY_PRODUCTS } from './products-data.js';
export const POSTS = [...EXTRA_POSTS];
