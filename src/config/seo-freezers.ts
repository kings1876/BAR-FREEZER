// Keyword-led metadata and on-page copy for every sub-page under /bar-freezers/ that is not already in seo-keywords.ts.
// Titles are final (60 characters or fewer, no suffix is added). Descriptions are 110-158 characters.
// General buying information only; no unverified claims.
type Meta = { title: string; description: string };
type Copy = { h1: string; intro: string };

export const FREEZER_META: Record<string, Meta> = {
  '/bar-freezers/under-bar-freezers/': {
    title: 'Under Bar Freezers for Sale | Undercounter Australia',
    description: 'Buy under bar and undercounter freezers for bars and cafes. Compare single, double and triple door sizes, prices and delivery Australia-wide.',
  },
  '/bar-freezers/under-bar-freezers/single-door/': {
    title: 'Single Door Under Bar Freezers for Sale Australia',
    description: 'Buy single door under bar freezers that fit beneath a counter. Compare width, capacity and price, with delivery Australia-wide.',
  },
  '/bar-freezers/under-bar-freezers/double-door/': {
    title: 'Double Door Under Bar Freezers for Sale Australia',
    description: 'Buy double door under bar freezers for busy bars and kitchens. Compare widths, litres and prices, with delivery Australia-wide.',
  },
  '/bar-freezers/under-bar-freezers/triple-door/': {
    title: 'Triple Door Under Bar Freezers for Sale Australia',
    description: 'Buy triple door under bar freezers for high-volume frozen storage. Compare widths, capacity and prices, delivered Australia-wide.',
  },
  '/bar-freezers/under-bar-freezers/drawer-freezers/': {
    title: 'Drawer Freezers for Sale | Under Bar Drawer Units',
    description: 'Buy drawer freezers with 1 to 4 drawers for under bar and kitchen use. Compare widths, capacity and prices, delivered Australia-wide.',
  },
  '/bar-freezers/under-bar-freezers/stainless-steel/': {
    title: 'Stainless Steel Top Bar Freezers for Sale Australia',
    description: 'Buy stainless steel top under bar freezers that double as a work surface. Compare sizes and prices, delivered Australia-wide.',
  },
  '/bar-freezers/under-bar-freezers/compact-slimline/': {
    title: 'Compact & Slimline Bar Freezers for Sale Australia',
    description: 'Buy compact and slimline bar freezers for tight spaces under bars and benches. Compare widths, capacity and prices, with Australia-wide delivery.',
  },
  '/bar-freezers/back-bar-freezers/': {
    title: 'Back Bar Freezers for Sale | Bar Freezer Australia',
    description: 'Buy back bar freezers for frozen garnishes, ice and spirits behind the bar. Compare glass and solid door models, delivered Australia-wide.',
  },
  '/bar-freezers/back-bar-freezers/glass-door/': {
    title: 'Glass Door Back Bar Freezers for Sale Australia',
    description: 'Buy glass door back bar freezers that show stock behind the bar. Compare widths, capacity and prices, delivered Australia-wide.',
  },
  '/bar-freezers/back-bar-freezers/solid-door/': {
    title: 'Solid Door Back Bar Freezers for Sale Australia',
    description: 'Buy solid door back bar freezers for frozen stock behind the bar. Compare widths, capacity and prices, delivered Australia-wide.',
  },
  '/bar-freezers/glass-door-display-freezers/': {
    title: 'Glass Door Display Freezers for Sale Australia',
    description: 'Buy glass door display freezers for gelato, spirits and frozen stock. Compare upright, counter-top and ice cream models, delivered Australia-wide.',
  },
  '/bar-freezers/glass-door-display-freezers/upright-single-glass/': {
    title: 'Single Glass Door Upright Freezers for Sale',
    description: 'Buy upright single glass door freezers to display frozen stock. Compare capacity, width and price, with delivery Australia-wide.',
  },
  '/bar-freezers/glass-door-display-freezers/upright-double-glass/': {
    title: 'Double Glass Door Upright Freezers for Sale',
    description: 'Buy upright double glass door freezers for shops, cafes and venues. Compare capacity, width and price, with delivery Australia-wide.',
  },
  '/bar-freezers/glass-door-display-freezers/counter-top-display/': {
    title: 'Counter-top Display Freezers for Sale Australia',
    description: 'Buy counter-top display freezers for point-of-sale frozen products. Compare sizes and prices, with delivery Australia-wide.',
  },
  '/bar-freezers/glass-door-display-freezers/ice-cream-gelato/': {
    title: 'Ice Cream & Gelato Display Freezers for Sale',
    description: 'Buy ice cream and gelato display freezers and scoop cabinets for shops and cafes. Compare sizes and prices, delivered Australia-wide.',
  },
  '/bar-freezers/chest-bench-freezers/bar-chest/': {
    title: 'Bar Chest Freezers for Sale | Commercial Chest Australia',
    description: 'Buy bar chest freezers for bulk ice and frozen stock storage. Compare capacity, lid style and price, delivered Australia-wide.',
  },
  '/bar-freezers/chest-bench-freezers/sliding-glass-lid/': {
    title: 'Sliding Glass Lid Chest Freezers for Sale Australia',
    description: 'Buy sliding glass lid chest freezers that display frozen stock. Compare capacity, size and price, delivered Australia-wide.',
  },
  '/bar-freezers/chest-bench-freezers/bench-top/': {
    title: 'Bench-top Freezers for Sale | Compact Bar Freezers',
    description: 'Buy bench-top freezers for counters and small bars. Compare compact sizes, capacity and prices, delivered Australia-wide.',
  },
  '/bar-freezers/glass-frosters-specialty/': {
    title: 'Glass Frosters & Slush Machines for Sale Australia',
    description: 'Buy glass frosters, mug chillers and slush machines for bars and cafes. Compare capacity, size and price, delivered Australia-wide.',
  },
  '/bar-freezers/glass-frosters-specialty/slush-frozen-drink/': {
    title: 'Slush Machines & Frozen Drink Makers for Sale',
    description: 'Buy slush machines, granita makers and frozen drink dispensers. Compare bowl capacity and prices, with delivery Australia-wide.',
  },
  '/bar-freezers/upright-commercial-freezers/upright-1-door/': {
    title: 'Single Door Upright Commercial Freezers for Sale',
    description: 'Buy single door upright commercial freezers for kitchens and bars. Compare capacity, width and price, delivered Australia-wide.',
  },
  '/bar-freezers/upright-commercial-freezers/upright-2-door/': {
    title: 'Double Door Upright Commercial Freezers for Sale',
    description: 'Buy double door upright commercial freezers for restaurants and venues. Compare capacity, width and price, delivered Australia-wide.',
  },
  '/bar-freezers/upright-commercial-freezers/upright-3-door/': {
    title: 'Triple Door Upright Commercial Freezers for Sale',
    description: 'Buy triple door upright commercial freezers for high-volume frozen storage. Compare capacity and price, delivered Australia-wide.',
  },
  '/bar-freezers/home-bar-outdoor-freezers/': {
    title: 'Home Bar Freezers for Sale | Outdoor & Alfresco',
    description: 'Buy home bar and outdoor freezers for man caves, games rooms and alfresco areas. Compare sizes and prices, delivered Australia-wide.',
  },
  '/bar-freezers/home-bar-outdoor-freezers/man-cave-home-bar/': {
    title: 'Man Cave & Home Bar Freezers for Sale Australia',
    description: 'Buy man cave and home bar freezers for ice, mugs and frozen stock. Compare compact sizes and prices, delivered Australia-wide.',
  },
  '/bar-freezers/clearance-ex-display/': {
    title: 'Ex-Display & Clearance Freezers for Sale Australia',
    description: 'Buy ex-display and refurbished commercial freezers. Each listing shows its condition, size and price, with delivery Australia-wide.',
  },
  '/bar-freezers/clearance-ex-display/ex-display/': {
    title: 'Ex-Display Freezers for Sale | Showroom Stock',
    description: 'Buy ex-display commercial freezers. Each listing shows condition, size and price, with delivery Australia-wide.',
  },
  '/bar-freezers/clearance-ex-display/refurbished/': {
    title: 'Refurbished Commercial Freezers for Sale Australia',
    description: 'Buy refurbished commercial freezers. Compare condition, size and price on each listing, with delivery Australia-wide.',
  },
};

export const FREEZER_COPY: Record<string, Copy> = {
  '/bar-freezers/under-bar-freezers/': {
    h1: 'Under Bar Freezers for Sale in Australia',
    intro: 'Under bar freezers fit beneath the counter and keep ice, garnishes and frozen stock within reach. Measure the opening, allow ventilation, then compare single, double, triple door and drawer models.',
  },
  '/bar-freezers/under-bar-freezers/single-door/': {
    h1: 'Single Door Under Bar Freezers for Sale',
    intro: 'A single door under bar freezer suits compact bars and cafes. Check the width, depth and height against your opening and compare capacity in litres.',
  },
  '/bar-freezers/under-bar-freezers/double-door/': {
    h1: 'Double Door Under Bar Freezers for Sale',
    intro: 'Double door under bar freezers add frozen storage for busy bars and kitchens. Compare overall width, litres and finish before you buy.',
  },
  '/bar-freezers/under-bar-freezers/triple-door/': {
    h1: 'Triple Door Under Bar Freezers for Sale',
    intro: 'Triple door under bar freezers give the most frozen storage beneath a long counter. Check the available width and the delivery route before you order.',
  },
  '/bar-freezers/under-bar-freezers/drawer-freezers/': {
    h1: 'Drawer Freezers for Sale (1 to 4 Drawers)',
    intro: 'Drawer freezers let staff reach frozen stock without bending into a cabinet. Compare the number of drawers, width and capacity.',
  },
  '/bar-freezers/under-bar-freezers/stainless-steel/': {
    h1: 'Stainless Steel Top Bar Freezers for Sale',
    intro: 'A stainless steel top gives you a wipe-clean work surface above the freezer. Compare widths, capacity and door counts.',
  },
  '/bar-freezers/under-bar-freezers/compact-slimline/': {
    h1: 'Compact & Slimline Bar Freezers for Sale',
    intro: 'Compact and slimline bar freezers suit narrow gaps and small bars. Measure the space carefully and compare capacity in litres.',
  },
  '/bar-freezers/back-bar-freezers/': {
    h1: 'Back Bar Freezers for Sale in Australia',
    intro: 'Back bar freezers sit behind the bar for quick access to frozen garnishes, ice and chilled spirits. Choose a glass door model to display stock or a solid door model for storage.',
  },
  '/bar-freezers/back-bar-freezers/glass-door/': {
    h1: 'Glass Door Back Bar Freezers for Sale',
    intro: 'Glass door back bar freezers show stock while keeping it frozen. Check the glazing, lighting and width in each specification.',
  },
  '/bar-freezers/back-bar-freezers/solid-door/': {
    h1: 'Solid Door Back Bar Freezers for Sale',
    intro: 'Solid door back bar freezers suit storage behind the bar. Compare widths, capacity and finish.',
  },
  '/bar-freezers/glass-door-display-freezers/': {
    h1: 'Glass Door Display Freezers for Sale',
    intro: 'Glass door display freezers show frozen products to customers and staff. Compare upright, counter-top and ice cream display models by capacity and width.',
  },
  '/bar-freezers/glass-door-display-freezers/upright-single-glass/': {
    h1: 'Single Glass Door Upright Freezers for Sale',
    intro: 'A single glass door upright freezer displays frozen stock in a small footprint. Compare capacity, width and lighting.',
  },
  '/bar-freezers/glass-door-display-freezers/upright-double-glass/': {
    h1: 'Double Glass Door Upright Freezers for Sale',
    intro: 'Double glass door upright freezers suit shops and venues that need larger frozen display space. Compare capacity and width.',
  },
  '/bar-freezers/glass-door-display-freezers/counter-top-display/': {
    h1: 'Counter-top Display Freezers for Sale',
    intro: 'Counter-top display freezers sit at the point of sale and show small frozen items. Compare footprints and capacity.',
  },
  '/bar-freezers/glass-door-display-freezers/ice-cream-gelato/': {
    h1: 'Ice Cream & Gelato Display Freezers for Sale',
    intro: 'Ice cream and gelato display freezers hold tubs and trays at scooping temperature. Compare pan capacity, width and lid type.',
  },
  '/bar-freezers/chest-bench-freezers/bar-chest/': {
    h1: 'Bar Chest Freezers for Sale in Australia',
    intro: 'Bar chest freezers store bulk ice and frozen stock. Compare capacity, lid style and size to suit your venue.',
  },
  '/bar-freezers/chest-bench-freezers/sliding-glass-lid/': {
    h1: 'Sliding Glass Lid Chest Freezers for Sale',
    intro: 'Sliding glass lid chest freezers let customers see frozen stock. Compare capacity, lid design and size.',
  },
  '/bar-freezers/chest-bench-freezers/bench-top/': {
    h1: 'Bench-top Freezers for Sale in Australia',
    intro: 'Bench-top freezers sit on a counter and hold small quantities of frozen stock. Check the dimensions and ventilation needs.',
  },
  '/bar-freezers/glass-frosters-specialty/': {
    h1: 'Glass Frosters & Slush Machines for Sale',
    intro: 'Glass frosters chill mugs and glasses for frosted beer service, while slush machines and frozen drink makers serve iced drinks. Compare capacity and size.',
  },
  '/bar-freezers/glass-frosters-specialty/slush-frozen-drink/': {
    h1: 'Slush Machines & Frozen Drink Makers for Sale',
    intro: 'Slush machines, granita makers and frozen drink dispensers serve iced drinks at the counter. Compare bowl capacity and size.',
  },
  '/bar-freezers/upright-commercial-freezers/upright-1-door/': {
    h1: 'Single Door Upright Commercial Freezers for Sale',
    intro: 'Single door upright commercial freezers suit kitchens and bars with limited floor space. Compare capacity and width.',
  },
  '/bar-freezers/upright-commercial-freezers/upright-2-door/': {
    h1: 'Double Door Upright Commercial Freezers for Sale',
    intro: 'Double door upright commercial freezers provide more frozen storage for restaurants and venues. Compare capacity and width.',
  },
  '/bar-freezers/upright-commercial-freezers/upright-3-door/': {
    h1: 'Triple Door Upright Commercial Freezers for Sale',
    intro: 'Triple door upright commercial freezers suit high-volume kitchens. Check the available width and delivery access.',
  },
  '/bar-freezers/home-bar-outdoor-freezers/': {
    h1: 'Home Bar & Outdoor Freezers for Sale',
    intro: 'Home bar freezers keep ice, mugs and frozen stock close to the entertaining area. For outdoor use, check the climate rating in each specification.',
  },
  '/bar-freezers/home-bar-outdoor-freezers/man-cave-home-bar/': {
    h1: 'Man Cave & Home Bar Freezers for Sale',
    intro: 'Man cave and home bar freezers suit games rooms and entertaining spaces. Compare compact sizes and noise information.',
  },
  '/bar-freezers/clearance-ex-display/': {
    h1: 'Ex-Display & Clearance Freezers for Sale',
    intro: 'Browse ex-display and refurbished commercial freezers. Each listing shows its condition, so check the description and warranty details before you order.',
  },
  '/bar-freezers/clearance-ex-display/ex-display/': {
    h1: 'Ex-Display Freezers for Sale',
    intro: 'Ex-display freezers have been used for showroom display. Check the condition notes on each listing.',
  },
  '/bar-freezers/clearance-ex-display/refurbished/': {
    h1: 'Refurbished Commercial Freezers for Sale',
    intro: 'Refurbished units are listed as refurbished. Check each listing for condition notes and warranty terms.',
  },
};
