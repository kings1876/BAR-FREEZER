// Keyword-informed titles and meta descriptions for the highest-volume category pages.
// Source: Semrush AU keyword research (docs/keyword-map.md). Volumes are monthly AU searches.
// Titles are final (60 characters or fewer); the page template does not add a suffix.
import { FREEZER_META } from './seo-freezers';
import { FRIDGE_META } from './seo-fridges';
import { ACCESSORY_META } from './seo-accessories';

export const KEYWORD_META: Record<string, { title: string; description: string }> = {
  '/bar-fridges/': {
    title: "Bar Fridges for Sale Australia | Glass Door & Under Bar",
    description: "Compare 750+ bar fridges in Australia: under bar, glass door, back bar, beer and outdoor models. Get a free quote, delivered Australia-wide.",
  },
  '/bar-freezers/': {
    title: "Bar Freezers for Sale Australia | Under Bar & Back Bar",
    description: "Compare 500+ commercial bar freezers: under bar, back bar, glass door display, chest and upright models. Free quote, delivered Australia-wide.",
  },
  '/bar-fridges/wine-fridges/': {
    title: "Wine Fridges for Sale Australia | Wine Coolers",
    description: "Compare 63 single and dual zone wine fridges and coolers for home, bar and restaurant. Get a free quote, delivered Australia-wide.",
  },
  '/bar-fridges/kegerators-dispensers/': {
    title: "Kegerators for Sale Australia | Keg Fridges",
    description: "Compare 23 kegerators, keg fridges and beer dispensers for bars, venues and home. Single and multi-tap, free quote, delivered Australia-wide.",
  },
  '/bar-fridges/outdoor-alfresco-fridges/': {
    title: "Outdoor Bar Fridges for Sale | Alfresco Fridges",
    description: "Buy outdoor and alfresco bar fridges for patios, BBQ areas and outdoor bars. Single, double and triple door models, delivered Australia-wide.",
  },
  '/bar-fridges/beer-beverage-fridges/': {
    title: "Beer Fridges for Sale | Drink Fridges Australia",
    description: "Buy beer fridges, sub-zero beer coolers and beverage merchandisers for bars, bottle shops and home. Compare models, delivered Australia-wide.",
  },
  '/bar-fridges/under-bar-fridges/': {
    title: "Under Bench Fridges for Sale | Under Bar Fridges",
    description: "Buy under bar and under bench fridges in single, double and triple door sizes, with glass or solid doors. Compare dimensions and prices.",
  },
  '/bar-fridges/under-bar-fridges/glass-door/': {
    title: "Glass Door Bar Fridges for Sale Australia",
    description: "Buy glass door bar fridges to display drinks behind the bar or at home. Compare sizes, door counts and prices, delivered Australia-wide.",
  },
  '/bar-freezers/chest-bench-freezers/': {
    title: "Chest Freezers for Sale | Bench Freezers Australia",
    description: "Buy commercial chest and bench freezers, including sliding glass lid models, for bars, cafes and venues. Compare capacity and prices.",
  },
  '/bar-freezers/upright-commercial-freezers/': {
    title: "Commercial Upright Freezers for Sale Australia",
    description: "Compare 85 upright commercial freezers in 1, 2 and 3 door sizes for restaurants, cafes and bars. Free quote, delivered Australia-wide.",
  },
  '/accessories-parts/ice-machines-storage/': {
    title: "Commercial Ice Makers for Sale | Ice Machines",
    description: "Buy under bar ice makers, commercial ice machines and insulated ice bins for bars, cafes and restaurants. Compare output and prices.",
  },
  '/bar-freezers/glass-frosters-specialty/glass-frosters/': {
    title: "Glass Frosters for Sale | Mug Chillers Australia",
    description: "Buy glass frosters and mug chillers that serve beer in frosted glasses. Compare capacity and prices for bars and pubs.",
  },
};

Object.assign(KEYWORD_META, FREEZER_META, FRIDGE_META, ACCESSORY_META);
