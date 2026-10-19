// Keyword-informed titles and meta descriptions for the highest-volume category pages.
// Source: Semrush AU keyword research (docs/keyword-map.md). Volumes are monthly AU searches.
// Titles are final (60 characters or fewer); the page template does not add a suffix.
export const KEYWORD_META: Record<string, { title: string; description: string }> = {
  // "bar fridge" 22.2K, "bar fridges" 4.4K, "bar refrigerators australia" 2.9K
  '/bar-fridges/': {
    title: 'Bar Fridges Australia | Glass Door & Under Bar',
    description: 'Shop bar fridges in Australia: under bar, glass door, back bar, bottle coolers and outdoor models from leading brands. Compare sizes and prices, delivered Australia-wide.',
  },
  // "bar freezer" 480, "bar freezers", "under bar freezer"
  '/bar-freezers/': {
    title: 'Bar Freezers Australia | Under Bar & Back Bar',
    description: 'Commercial bar freezers for pubs, cocktail bars and home bars: under bar, back bar, glass door display and chest freezers. Compare models and prices, delivered Australia-wide.',
  },
  // "wine fridge" 8.1K, "wine cooler" 2.9K, "wine storage" 1.9K
  '/bar-fridges/wine-fridges/': {
    title: 'Wine Fridges & Coolers Australia | Bar Freezer',
    description: 'Single and dual zone wine fridges and wine coolers for home, bar and restaurant use. Compare capacity, bottle count and price, delivered Australia-wide.',
  },
  // "kegerator" 4.4K, "keg fridge"
  '/bar-fridges/kegerators-dispensers/': {
    title: 'Kegerators & Keg Fridges Australia | Bar Freezer',
    description: 'Kegerators, keg fridges and beer dispensers for bars, venues and home use. Single and multi-tap options, delivered Australia-wide.',
  },
  // "outdoor bar fridge" 1.9K, "outdoor fridge" 1.9K
  '/bar-fridges/outdoor-alfresco-fridges/': {
    title: 'Outdoor Bar Fridges Australia | Bar Freezer',
    description: 'Outdoor and alfresco bar fridges built for Australian conditions. Single, double and triple door models for patios, BBQ areas and outdoor bars.',
  },
  // "beer fridge" 1.6K, "drinks fridge" 1.6K
  '/bar-fridges/beer-beverage-fridges/': {
    title: 'Beer Fridges & Drink Fridges Australia',
    description: 'Beer fridges, sub-zero beer coolers and beverage merchandisers for bars, bottle shops and home. Compare models and prices, delivered Australia-wide.',
  },
  // "under bench fridge" 1.6K, "under counter bar fridge" 320
  '/bar-fridges/under-bar-fridges/': {
    title: 'Under Bar & Under Bench Fridges Australia',
    description: 'Under bar and under bench fridges in single, double and triple door sizes, with glass or solid doors. Compare dimensions and prices.',
  },
  // "bar fridge glass door" 1.0K, "glass door bar fridge"
  '/bar-fridges/under-bar-fridges/glass-door/': {
    title: 'Glass Door Bar Fridges Australia | Bar Freezer',
    description: 'Glass door bar fridges for displaying drinks behind the bar or at home. Compare sizes, door counts and prices.',
  },
  // "chest freezer" is high volume but domestic; keep the bar/commercial angle
  '/bar-freezers/chest-bench-freezers/': {
    title: 'Chest & Bench Freezers Australia | Bar Freezer',
    description: 'Commercial chest and bench freezers, including sliding glass lid models, for bars, cafes and venues. Compare capacity and prices.',
  },
  // "upright freezer" 5.4K
  '/bar-freezers/upright-commercial-freezers/': {
    title: 'Upright Commercial Freezers Australia',
    description: 'Upright commercial freezers in 1, 2 and 3 door sizes for restaurants, cafes and bars. Compare capacity, dimensions and prices.',
  },
  // "ice maker" 5.4K, "ice machine" 3.6K
  '/accessories-parts/ice-machines-storage/': {
    title: 'Commercial Ice Makers & Machines Australia',
    description: 'Under bar ice makers, commercial ice machines and insulated ice bins for bars, cafes and restaurants. Compare output and prices.',
  },
  '/bar-freezers/glass-frosters-specialty/glass-frosters/': {
    title: 'Glass Frosters & Mug Chillers Australia',
    description: 'Glass frosters and mug chillers that serve beer in frosted glasses. Compare capacity and prices for bars and pubs.',
  },
};
