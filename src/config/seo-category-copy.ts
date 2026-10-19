// On-page H1 and opening copy for the highest-volume category pages (keywords: docs/keyword-map.md).
// General buying information only; no unverified claims.
export const CATEGORY_COPY: Record<string, { h1: string; intro: string; guide?: { href: string; label: string } }> = {
  '/bar-fridges/': {
    h1: 'Bar Fridges for Sale in Australia',
    intro: 'Bar fridges keep bottles, cans and mixers cold at the point of service. Choose an under bar fridge to fit beneath the counter, a glass door model to display drinks, a bottle cooler for high-volume service, or an outdoor-rated fridge for alfresco areas. Use the filters to narrow by width, doors, capacity and brand.',
    guide: { href: '/guides/under-bench-fridge-buying-guide/', label: 'Read the under bench fridge buying guide' },
  },
  '/bar-freezers/': {
    h1: 'Bar Freezers for Sale in Australia',
    intro: 'Bar freezers store ice, frozen garnishes, frozen drinks and glass chillers where staff need them. Compare under bar, back bar, glass door display, chest and upright commercial freezers by width, door type and capacity.',
    guide: { href: '/guides/bar-fridge-freezer-buying-guide/', label: 'Read the bar fridge and freezer buying guide' },
  },
  '/bar-fridges/wine-fridges/': {
    h1: 'Wine Fridges & Wine Coolers',
    intro: 'Wine fridges hold bottles at a steady, cellar-style temperature. Choose a single zone model for one style of wine, or a dual zone model to store reds and whites at different temperatures. Check bottle capacity and bottle size before you buy.',
  },
  '/bar-fridges/kegerators-dispensers/': {
    h1: 'Kegerators & Keg Fridges',
    intro: 'Kegerators and keg fridges chill and dispense draught beer. Compare single tap models for home bars with multi-tap commercial dispensers for venues, and check keg size and CO2 requirements.',
  },
  '/bar-fridges/outdoor-alfresco-fridges/': {
    h1: 'Outdoor Bar Fridges & Alfresco Fridges',
    intro: "Outdoor and alfresco bar fridges are designed for patios, BBQ areas and outdoor bars. Check each product's rated operating temperature and ventilation needs, and compare single, double and triple door models.",
  },
  '/bar-fridges/beer-beverage-fridges/': {
    h1: 'Beer Fridges & Drink Fridges',
    intro: 'Beer fridges and beverage fridges keep drinks at serving temperature. Compare sub-zero beer fridges, beverage merchandisers and glass door models by capacity, width and brand.',
  },
  '/bar-fridges/under-bar-fridges/': {
    h1: 'Under Bar & Under Bench Fridges',
    intro: 'Under bar and under bench fridges are designed to fit beneath a counter. Measure the opening and allow ventilation clearance, then compare single, double and triple door models with glass or solid doors.',
    guide: { href: '/guides/under-bench-fridge-buying-guide/', label: 'Read the under bench fridge buying guide' },
  },
  '/bar-fridges/under-bar-fridges/glass-door/': {
    h1: 'Glass Door Bar Fridges',
    intro: 'Glass door bar fridges display drinks while keeping them cold. Compare door counts, widths and capacities, and check the specifications for glass type and lighting.',
  },
  '/bar-freezers/chest-bench-freezers/': {
    h1: 'Chest & Bench Freezers',
    intro: 'Chest and bench freezers suit bars and cafes that need deep frozen storage or a work surface above the freezer. Compare bar chest, sliding glass lid and bench-top models by capacity and size.',
  },
  '/bar-freezers/upright-commercial-freezers/': {
    h1: 'Upright Commercial Freezers',
    intro: 'Upright commercial freezers store frozen stock vertically and take up less floor space than a chest freezer. Compare 1, 2 and 3 door models by capacity, width and brand.',
  },
  '/accessories-parts/ice-machines-storage/': {
    h1: 'Commercial Ice Makers & Ice Machines',
    intro: 'Ice makers and ice machines supply ice for drinks service. Compare under bar ice makers by daily output and bin capacity, and consider an insulated ice bin for storage.',
  },
  '/bar-freezers/glass-frosters-specialty/glass-frosters/': {
    h1: 'Glass Frosters & Mug Chillers',
    intro: 'Glass frosters and mug chillers pre-chill glassware so beer is served in a frosted glass. Compare capacity and dimensions to fit your bar.',
  },
};
