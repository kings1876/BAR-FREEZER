/**
 * Bar Freezer Australia - Central Site Configuration
 * Domain: barfreezer.com.au
 * All navigation, taxonomy, products, venues, cities, FAQs, and guides are derived from here.
 */

export const SITE = {
  name: "Bar Freezer",
  legalName: "Bar Freezer Australia Pty Ltd",
  domain: "barfreezer.com.au",
  url: "https://barfreezer.com.au",
  phone: "1300 858 290",
  phoneDisplay: "1300 858 290",
  phoneAlt: "+61 2 9188 4400",
  mobileSales: "0480 092 110",
  email: "sales@barfreezer.com.au",
  quoteEmail: "trade@barfreezer.com.au",
  supportEmail: "service@barfreezer.com.au",
  abn: "88 642 901 328",
  acn: "642 901 328",
  headOffice: "Unit 4, 18-24 Commercial Rd, Kingsgrove NSW 2208",
  dispatchDepots: [
    { city: "Sydney", address: "Distribution Centre 3, Chullora NSW 2190" },
    { city: "Melbourne", address: "Logistics Hub B, Truganina VIC 3029" },
    { city: "Brisbane", address: "Industrial Way, Yatala QLD 4207" },
    { city: "Perth", address: "Airport Freight Estate, Hazelmere WA 6055" },
    { city: "Adelaide", address: "Freightlink Hub, Regency Park SA 5010" }
  ],
  tradingHours: "Mon - Fri: 7:30am - 5:30pm AEST (Sat: 8:30am - 1:00pm trade line)",
  tagline: "Commercial & Home Bar Refrigeration Delivered Australia-Wide",
  subheading: "Australia's specialist trade importer and stockist of underbar freezers, back bar coolers, glass frosters and beverage systems.",
  trustpilot: {
    rating: 4.9,
    maxRating: 5.0,
    reviewCount: 3142,
    badgeText: "Rated 4.9 / 5 from 3,140+ Australian hospitality businesses & home bar owners",
    trustScore: "Excellent",
    url: "https://au.trustpilot.com/review/barfreezer.com.au"
  },
  financePartners: [
    { name: "SilverChef", type: "Rent-Try-Buy & Commercial Lease", highlight: "100% Tax Deductible", tag: "Hospitality Trade" },
    { name: "Zip Business", type: "Up to $150k Line of Credit", highlight: "Interest-Free Terms Available", tag: "Flexible Capital" },
    { name: "Afterpay", type: "Pay in 4 installments (up to $2,000)", highlight: "Instant Approval", tag: "Home Bars & Small Orders" }
  ]
};

export const CATEGORIES = [
  {
    name: "Bar Freezers",
    slug: "bar-freezers",
    path: "/bar-freezers/",
    description: "Heavy-duty commercial underbar, back bar, upright display, and glass froster freezers built for high-ambient Australian venues.",
    subcategories: [
      {
        name: "Under Bar / Undercounter Freezers",
        slug: "under-bar-freezers",
        path: "/bar-freezers/under-bar-freezers/",
        description: "Low-height commercial bench freezers designed to fit beneath standard 900mm Australian bar countertops.",
        types: [
          { name: "Single Door", slug: "single-door", path: "/bar-freezers/under-bar-freezers/single-door/" },
          { name: "Double Door", slug: "double-door", path: "/bar-freezers/under-bar-freezers/double-door/" },
          { name: "Triple Door", slug: "triple-door", path: "/bar-freezers/under-bar-freezers/triple-door/" },
          { name: "Drawer Freezers (1-4 drawer)", slug: "drawer-freezers", path: "/bar-freezers/under-bar-freezers/drawer-freezers/" },
          { name: "Stainless Steel Top", slug: "stainless-steel", path: "/bar-freezers/under-bar-freezers/stainless-steel/" },
          { name: "Compact & Slimline", slug: "compact-slimline", path: "/bar-freezers/under-bar-freezers/compact-slimline/" }
        ]
      },
      {
        name: "Back Bar Freezers",
        slug: "back-bar-freezers",
        path: "/bar-freezers/back-bar-freezers/",
        description: "Eye-level and rear bench commercial freezers for high-frequency spirit service, craft garnishes, and premium bottles.",
        types: [
          { name: "Glass Door Back Bar", slug: "glass-door", path: "/bar-freezers/back-bar-freezers/glass-door/" },
          { name: "Solid Door Back Bar", slug: "solid-door", path: "/bar-freezers/back-bar-freezers/solid-door/" },
          { name: "Sliding Door Back Bar", slug: "sliding-door", path: "/bar-freezers/back-bar-freezers/sliding-door/" }
        ]
      },
      {
        name: "Glass Door Display Freezers",
        slug: "glass-door-display-freezers",
        path: "/bar-freezers/glass-door-display-freezers/",
        description: "Illuminated glass display freezers showcasing premium vodkas, spirits, gelato, and frozen cocktail ingredients.",
        types: [
          { name: "Upright Single Glass Door", slug: "upright-single-glass", path: "/bar-freezers/glass-door-display-freezers/upright-single-glass/" },
          { name: "Upright Double Glass Door", slug: "upright-double-glass", path: "/bar-freezers/glass-door-display-freezers/upright-double-glass/" },
          { name: "Counter-top Display", slug: "counter-top-display", path: "/bar-freezers/glass-door-display-freezers/counter-top-display/" },
          { name: "Ice Cream & Gelato Display", slug: "ice-cream-gelato", path: "/bar-freezers/glass-door-display-freezers/ice-cream-gelato/" }
        ]
      },
      {
        name: "Chest & Bench Freezers",
        slug: "chest-bench-freezers",
        path: "/bar-freezers/chest-bench-freezers/",
        description: "High-capacity chest and bench-top deep freezers for heavy ice storage, event reserves, and bulk frozen stock.",
        types: [
          { name: "Bar Chest Freezers", slug: "bar-chest", path: "/bar-freezers/chest-bench-freezers/bar-chest/" },
          { name: "Sliding Glass Lid Chest", slug: "sliding-glass-lid", path: "/bar-freezers/chest-bench-freezers/sliding-glass-lid/" },
          { name: "Bench-top Freezers", slug: "bench-top", path: "/bar-freezers/chest-bench-freezers/bench-top/" }
        ]
      },
      {
        name: "Glass Frosters & Specialty",
        slug: "glass-frosters-specialty",
        path: "/bar-freezers/glass-frosters-specialty/",
        description: "Instant sub-zero beer stein and martini glass chillers, shot freezers, and frozen beverage service.",
        types: [
          { name: "Glass Frosters & Mug Chillers", slug: "glass-frosters", path: "/bar-freezers/glass-frosters-specialty/glass-frosters/" },
          { name: "Cocktail & Ice Freezers", slug: "cocktail-ice", path: "/bar-freezers/glass-frosters-specialty/cocktail-ice/" },
          { name: "Bottle Freezers (Vodka/Spirits)", slug: "bottle-freezers", path: "/bar-freezers/glass-frosters-specialty/bottle-freezers/" },
          { name: "Slush & Frozen Drink Freezers", slug: "slush-frozen-drink", path: "/bar-freezers/glass-frosters-specialty/slush-frozen-drink/" }
        ]
      },
      {
        name: "Upright Commercial Freezers",
        slug: "upright-commercial-freezers",
        path: "/bar-freezers/upright-commercial-freezers/",
        description: "Gastronorm-compatible 1, 2, and 3 door upright stainless steel deep freeze storage for busy cellar and kitchen prep.",
        types: [
          { name: "Upright 1 Door (Single)", slug: "upright-1-door", path: "/bar-freezers/upright-commercial-freezers/upright-1-door/" },
          { name: "Upright 2 Door (Double)", slug: "upright-2-door", path: "/bar-freezers/upright-commercial-freezers/upright-2-door/" },
          { name: "Upright 3 Door (Triple)", slug: "upright-3-door", path: "/bar-freezers/upright-commercial-freezers/upright-3-door/" }
        ]
      },
      {
        name: "Home Bar & Outdoor Freezers",
        slug: "home-bar-outdoor-freezers",
        path: "/bar-freezers/home-bar-outdoor-freezers/",
        description: "Architectural luxury freezers engineered for outdoor BBQ kitchens, alfresco entertainment, and premium man caves.",
        types: [
          { name: "Alfresco & Outdoor-Rated (IPX4)", slug: "alfresco-outdoor", path: "/bar-freezers/home-bar-outdoor-freezers/alfresco-outdoor/" },
          { name: "Man Cave & Home Bar", slug: "man-cave-home-bar", path: "/bar-freezers/home-bar-outdoor-freezers/man-cave-home-bar/" }
        ]
      },
      {
        name: "Ex-Display, Clearance & Second Hand",
        slug: "clearance-ex-display",
        path: "/bar-freezers/clearance-ex-display/",
        description: "Fully tested factory seconds, showroom ex-displays, and verified second-hand trade units with 12-month warranty.",
        types: [
          { name: "Ex-Display Freezers", slug: "ex-display", path: "/bar-freezers/clearance-ex-display/ex-display/" },
          { name: "Clearance Overstock", slug: "overstock", path: "/bar-freezers/clearance-ex-display/overstock/" },
          { name: "Refurbished Second Hand", slug: "refurbished", path: "/bar-freezers/clearance-ex-display/refurbished/" }
        ]
      }
    ]
  },
  {
    name: "Bar Fridges & Coolers",
    slug: "bar-fridges",
    path: "/bar-fridges/",
    description: "Commercial underbench bottle coolers, back bar display fridges, wine cellaring cabinets, and outdoor alfresco fridges.",
    subcategories: [
      {
        name: "Under Bar Fridges",
        slug: "under-bar-fridges",
        path: "/bar-fridges/under-bar-fridges/",
        description: "Rapid pull-down commercial fridges built under standard 840mm-900mm bar heights.",
        types: [
          { name: "Single Door Under Bar", slug: "1-door", path: "/bar-fridges/under-bar-fridges/1-door/" },
          { name: "Double Door Under Bar", slug: "2-door", path: "/bar-fridges/under-bar-fridges/2-door/" },
          { name: "Triple Door Under Bar", slug: "3-door", path: "/bar-fridges/under-bar-fridges/3-door/" },
          { name: "Glass Door Under Bar", slug: "glass-door", path: "/bar-fridges/under-bar-fridges/glass-door/" },
          { name: "Solid Door Under Bar", slug: "solid-door", path: "/bar-fridges/under-bar-fridges/solid-door/" }
        ]
      },
      {
        name: "Bottle Coolers (1-4 door)",
        slug: "bottle-coolers",
        path: "/bar-fridges/bottle-coolers/",
        description: "High-capacity horizontal and vertical bottle cooling for speed-rail bar setups and beer bottle service.",
        types: [
          { name: "1 Door Bottle Cooler", slug: "1-door", path: "/bar-fridges/bottle-coolers/1-door/" },
          { name: "2 Door Bottle Cooler", slug: "2-door", path: "/bar-fridges/bottle-coolers/2-door/" },
          { name: "3 Door Bottle Cooler", slug: "3-door", path: "/bar-fridges/bottle-coolers/3-door/" },
          { name: "4 Door Bottle Cooler", slug: "4-door", path: "/bar-fridges/bottle-coolers/4-door/" }
        ]
      },
      {
        name: "Back Bar Fridges",
        slug: "back-bar-fridges",
        path: "/bar-fridges/back-bar-fridges/",
        description: "Display glass and sliding door back bar chillers with Low-E glass and LED shelf strip lighting.",
        types: [
          { name: "Hinged Glass Back Bar", slug: "hinged-glass", path: "/bar-fridges/back-bar-fridges/hinged-glass/" },
          { name: "Sliding Glass Back Bar", slug: "sliding-glass", path: "/bar-fridges/back-bar-fridges/sliding-glass/" }
        ]
      },
      {
        name: "Beer & Beverage Fridges",
        slug: "beer-beverage-fridges",
        path: "/bar-fridges/beer-beverage-fridges/",
        description: "Heavy refrigeration systems pulling beverages down to ice-cold +0.5°C to +2°C for crisp Australian lager service.",
        types: [
          { name: "Sub-Zero Beer Fridges", slug: "sub-zero-beer", path: "/bar-fridges/beer-beverage-fridges/sub-zero-beer/" },
          { name: "Beverage Merchandisers", slug: "beverage-merchandisers", path: "/bar-fridges/beer-beverage-fridges/beverage-merchandisers/" }
        ]
      },
      {
        name: "Wine Fridges (Single & Dual Zone)",
        slug: "wine-fridges",
        path: "/bar-fridges/wine-fridges/",
        description: "Vibration-free compressor cabinets with carbon filtration and dual-zone climate controls for reds and whites.",
        types: [
          { name: "Single Zone Wine Cabinets", slug: "single-zone", path: "/bar-fridges/wine-fridges/single-zone/" },
          { name: "Dual Zone Wine Cabinets", slug: "dual-zone", path: "/bar-fridges/wine-fridges/dual-zone/" }
        ]
      },
      {
        name: "Kegerators & Beer Dispensers",
        slug: "kegerators-dispensers",
        path: "/bar-fridges/kegerators-dispensers/",
        description: "Commercial draft beer dispensers supporting 1, 2, 3 or 4 kegs with stainless steel fonts and tap towers.",
        types: [
          { name: "Single Tap Kegerators", slug: "single-tap", path: "/bar-fridges/kegerators-dispensers/single-tap/" },
          { name: "Multi-Tap Commercial Dispensers", slug: "multi-tap", path: "/bar-fridges/kegerators-dispensers/multi-tap/" }
        ]
      },
      {
        name: "Combination Fridge-Freezers",
        slug: "combination-fridge-freezers",
        path: "/bar-fridges/combination-fridge-freezers/",
        description: "Dual compartment bar units offering chilled beer storage on one side and deep freezing on the other.",
        types: [
          { name: "Split Dual Temperature", slug: "split-dual-temp", path: "/bar-fridges/combination-fridge-freezers/split-dual-temp/" }
        ]
      },
      {
        name: "Outdoor / Alfresco Bar Fridges",
        slug: "outdoor-alfresco-fridges",
        path: "/bar-fridges/outdoor-alfresco-fridges/",
        description: "304-grade stainless steel exterior fridges rated up to 43°C ambient temperature with heated glass doors.",
        types: [
          { name: "Single Door Alfresco", slug: "single-door", path: "/bar-fridges/outdoor-alfresco-fridges/single-door/" },
          { name: "Double Door Alfresco", slug: "double-door", path: "/bar-fridges/outdoor-alfresco-fridges/double-door/" },
          { name: "Triple Door Alfresco", slug: "triple-door", path: "/bar-fridges/outdoor-alfresco-fridges/triple-door/" }
        ]
      }
    ]
  },
  {
    name: "Accessories & Parts",
    slug: "accessories-parts",
    path: "/accessories-parts/",
    description: "Genuine OEM commercial refrigeration spare parts, shelves, gaskets, castors, and bar maintenance accessories.",
    subcategories: [
      {
        name: "Shelving, Baskets & Trays",
        slug: "shelving-baskets-trays",
        path: "/accessories-parts/shelving-baskets-trays/",
        description: "PVC-coated heavy wire shelves, wine cradle shelves, and gastronorm tray slides.",
        types: [
          { name: "Wire Shelves & Clips", slug: "wire-shelves", path: "/accessories-parts/shelving-baskets-trays/wire-shelves/" },
          { name: "Wine Cradles", slug: "wine-cradles", path: "/accessories-parts/shelving-baskets-trays/wine-cradles/" }
        ]
      },
      {
        name: "Door Locks & Gaskets",
        slug: "door-locks-gaskets",
        path: "/accessories-parts/door-locks-gaskets/",
        description: "Magnetic push-in door seals, cylinder barrel key locks, and heavy-duty slam latches.",
        types: [
          { name: "Magnetic Door Seals", slug: "magnetic-seals", path: "/accessories-parts/door-locks-gaskets/magnetic-seals/" },
          { name: "Key Lock Assemblies", slug: "key-locks", path: "/accessories-parts/door-locks-gaskets/key-locks/" }
        ]
      },
      {
        name: "Castors, Legs & Stands",
        slug: "castors-legs-stands",
        path: "/accessories-parts/castors-legs-stands/",
        description: "Heavy lockable 100mm swivel castors, height-adjustable stainless steel legs, and floor plinths.",
        types: [
          { name: "Lockable Swivel Castors", slug: "swivel-castors", path: "/accessories-parts/castors-legs-stands/swivel-castors/" },
          { name: "Adjustable Stainless Legs", slug: "adjustable-legs", path: "/accessories-parts/castors-legs-stands/adjustable-legs/" }
        ]
      },
      {
        name: "Glass Frosting Accessories",
        slug: "glass-frosting-accessories",
        path: "/accessories-parts/glass-frosting-accessories/",
        description: "CO2 glass chillers, froster wire baskets, thermal insulated bar trays, and cold stein holders.",
        types: [
          { name: "CO2 Rapid Glass Frosters", slug: "co2-frosters", path: "/accessories-parts/glass-frosting-accessories/co2-frosters/" }
        ]
      },
      {
        name: "Ice Machines & Ice Storage",
        slug: "ice-machines-storage",
        path: "/accessories-parts/ice-machines-storage/",
        description: "Underbar gourmet cube and crescent ice makers, insulated transport ice caddies, and scoops.",
        types: [
          { name: "Underbar Ice Makers", slug: "underbar-ice-makers", path: "/accessories-parts/ice-machines-storage/underbar-ice-makers/" },
          { name: "Insulated Ice Bins", slug: "insulated-ice-bins", path: "/accessories-parts/ice-machines-storage/insulated-ice-bins/" }
        ]
      },
      {
        name: "Covers & Cleaning",
        slug: "covers-cleaning",
        path: "/accessories-parts/covers-cleaning/",
        description: "Heavy-duty outdoor weather covers, condenser coil cleaning brushes, and stainless steel sanitiser polish.",
        types: [
          { name: "Outdoor Protective Covers", slug: "outdoor-covers", path: "/accessories-parts/covers-cleaning/outdoor-covers/" },
          { name: "Refrigeration Coil Cleaners", slug: "coil-cleaners", path: "/accessories-parts/covers-cleaning/coil-cleaners/" }
        ]
      },
      {
        name: "Spare Parts (Compressors, Fans, Thermostats)",
        slug: "spare-parts",
        path: "/accessories-parts/spare-parts/",
        description: "Embraco & Secop R290 compressors, Carel & Dixell digital controllers, evaporator fans, and LED strips.",
        types: [
          { name: "Digital Thermostats & Probes", slug: "thermostats", path: "/accessories-parts/spare-parts/thermostats/" },
          { name: "Evaporator & Condenser Fans", slug: "fans", path: "/accessories-parts/spare-parts/fans/" },
          { name: "Commercial Compressors (R290)", slug: "compressors", path: "/accessories-parts/spare-parts/compressors/" },
          { name: "LED Strips & Transformers", slug: "led-strips", path: "/accessories-parts/spare-parts/led-strips/" }
        ]
      }
    ]
  }
];

export const BRANDS = [
  { name: "Skope", slug: "skope", country: "New Zealand", warrantyYears: 5, tag: "Premium Tier 1 Commercial", description: "Market leader in high-efficiency, ultra-reliable commercial bar refrigeration engineered for 43°C tropical ambient conditions." },
  { name: "Bromic", slug: "bromic", country: "Australia", warrantyYears: 2, tag: "Industry Standard B2B", description: "Bromic Refrigeration has supplied Australian venues with heavy-duty bottle coolers and back bar freezers for over 30 years." },
  { name: "Williams", slug: "williams", country: "Australia / UK", warrantyYears: 3, tag: "Award-Winning Energy Efficiency", description: "Renowned for robust Australian-manufactured undercounter bar freezers, Cameo front-of-house glass cabinets, and modular bar designs." },
  { name: "Foster", slug: "foster", country: "UK", warrantyYears: 2, tag: "Hospitality Heavyweight", description: "Commercial European engineering with rapid thermal pull-down times and ultra-low noise compressors." },
  { name: "Polar", slug: "polar", country: "UK / Global", warrantyYears: 2, tag: "Value Trade Workhorse", description: "Exceptional price-to-performance commercial refrigeration for cafes, cocktail bars, and small restaurant operations." },
  { name: "Thermaster", slug: "thermaster", country: "Global", warrantyYears: 2, tag: "High-Volume Stockist", description: "Durable stainless steel underbar freezers and fridges designed for continuous multi-shift venue operations." },
  { name: "Atosa", slug: "atosa", country: "USA / Global", warrantyYears: 4, tag: "Heavy Duty Eco-Friendly", description: "All stainless steel build with natural R290 refrigerant and Italian Dixell digital controllers standard on all units." },
  { name: "F.E.D.", slug: "fed", country: "Australia", warrantyYears: 2, tag: "Leading Catering Equipment", description: "Federal Hospitality Equipment offers an extensive range of back bar freezers, glass frosters, and refrigerated drawers." },
  { name: "Anvil", slug: "anvil", country: "South Africa", warrantyYears: 1, tag: "Compact Foodservice", description: "Countertop display freezers and compact bar chillers built for rapid service in tight bar footprint spaces." },
  { name: "Exquisite", slug: "exquisite", country: "Germany / Global", warrantyYears: 2, tag: "Commercial Display Specialist", description: "Precision display freezers and beverage chillers with heated anti-condensation double-glazed doors." },
  { name: "Husky", slug: "husky", country: "UK / Australia", warrantyYears: 3, tag: "Bar & Alfresco Leader", description: "Specialists in undercounter outdoor-rated alfresco bar fridges, wine coolers, and retro commercial bar fridges." },
  { name: "Vestfrost", slug: "vestfrost", country: "Denmark", warrantyYears: 3, tag: "Danish Precision Cold", description: "Ultra-low power consumption chest freezers and laboratory-grade glass door display units." },
  { name: "Tefcold", slug: "tefcold", country: "Denmark", warrantyYears: 2, tag: "Modern Hospitality Coolers", description: "Sleek matte black and stainless steel bar merchandisers with low acoustic footprints." },
  { name: "Hoshizaki", slug: "hoshizaki", country: "Japan", warrantyYears: 3, tag: "World Ice & Cold Benchmark", description: "Pinnacle Japanese engineering for glass frosters, underbar freezers, and commercial ice dispensing." },
  { name: "Maxx Ice", slug: "maxx-ice", country: "USA", warrantyYears: 2, tag: "Speed Rail Ice Solutions", description: "Reliable commercial ice storage bins and bar freezers for cocktail bars and night venues." },
  { name: "Haier", slug: "haier", country: "Global", warrantyYears: 2, tag: "Smart Value Cold", description: "High-capacity compact bench freezers and bar chillers for home bars, offices, and low-intensity venues." },
  { name: "Hisense", slug: "hisense", country: "Global", warrantyYears: 3, tag: "Value Bar Champion", description: "Quiet running, frost-free bar freezers and beverage chillers ideal for man caves and entertainment areas." },
  { name: "Westinghouse", slug: "westinghouse", country: "Australia", warrantyYears: 2, tag: "Trusted Australian Household", description: "Dependable upright and bar freezers designed specifically for domestic entertainment and rumpus rooms." },
  { name: "Electrolux", slug: "electrolux", country: "Sweden", warrantyYears: 2, tag: "Gastronomic Excellence", description: "Premium European kitchen and bar refrigeration with precision airflow and energy class A efficiency." },
  { name: "Liebherr", slug: "liebherr", country: "Germany", warrantyYears: 5, tag: "Ultra-Premium German Engineering", description: "The gold standard in precision wine climate cabinets, ultra-quiet bar freezers, and luxury built-in bar appliances." },
  { name: "Dometic", slug: "dometic", country: "Sweden / Australia", warrantyYears: 3, tag: "Outdoor, Marine & Mobile", description: "Heavy-duty 12V/24V and 240V refrigeration for outdoor entertainment areas, mobile bars, yachts, and food trailers." },
  { name: "Vintec", slug: "vintec", country: "France / Australia", warrantyYears: 2, tag: "Sommelier Wine Cabinets", description: "Endorsed by Australian sommeliers for precise humidity, UV-resistant glass, and vibration absorption." },
  { name: "Schmick", slug: "schmick", country: "Australia", warrantyYears: 2, tag: "Tropical Rated Alfresco", description: "Designed in Australia specifically to run outside in 40°C+ heat with triple-glazed heated Low-E glass." }
];

export const VENUES = [
  {
    name: "Pubs & Hotels",
    slug: "pubs-hotels",
    path: "/venues/pubs-hotels/",
    intro: "High-turnover Australian front-of-house and backbar refrigeration engineered for brutal Friday and Saturday night rushes. Fast thermal recovery, heavy slam-latches, and 43°C tropical rating.",
    heroStat: "Up to 1,200 bottles chilled per hour",
    setups: {
      small: {
        name: "Small Front Bar Setup",
        budget: "$4,200 - $6,500 AUD",
        capacity: "120-200 patrons",
        equipment: ["1x 2-Door Underbar Glass Chiller (Bromic BB0200)", "1x 1-Door Stainless Bar Freezer for Frosted Mugs", "1x Built-in Speed Rail Speed-Chiller"],
        summary: "Ideal for boutique hotel lounges or secondary public bar stations needing fast cold glass turnarounds."
      },
      medium: {
        name: "Standard Venue Public Bar Setup",
        budget: "$9,500 - $14,800 AUD",
        capacity: "250-450 patrons",
        equipment: ["2x 3-Door Underbar Glass Chillers with Sliding Doors", "1x Skope Backbar Single Door Glass Froster (-18°C to -22°C)", "1x Underbench 2-Drawer Service Freezer"],
        summary: "The definitive setup for Australian suburban pubs, RSL bars, and hotel front service stations."
      },
      large: {
        name: "High-Volume Multi-Station Hotel Setup",
        budget: "$22,000 - $38,000 AUD",
        capacity: "500+ patrons (multi-bar)",
        equipment: ["4x 3-Door Remote or Self-Contained Underbar Units", "2x High-Output Commercial Glass Frosters", "1x 2-Door Upright Solid Storage Freezer", "1x Bulk Ice Machine & Insulated Caddy"],
        summary: "Master equipment bundle for large hospitality groups, multi-level venues, and waterfront hotel venues."
      }
    },
    relatedCategories: ["under-bar-freezers", "back-bar-fridges", "glass-frosters-specialty"]
  },
  {
    name: "Cocktail Bars",
    slug: "cocktail-bars",
    path: "/venues/cocktail-bars/",
    intro: "Precision sub-zero temperature zones for super-chilled coupe glasses, crystal-clear block ice storage, infused spirit bottles, and craft garnishes.",
    heroStat: "-22°C sub-zero frosted glassware in seconds",
    setups: {
      small: {
        name: "Intimate Speakeasy Setup",
        budget: "$3,800 - $5,400 AUD",
        capacity: "40-70 patrons",
        equipment: ["1x Compact 600mm Glass Froster Unit", "1x 1-Door Underbar Solid Freezer for Clear Ice blocks", "1x 2-Door Low-Profile Backbar Fridge"],
        summary: "Designed for compact craft cocktail stations where temperature consistency and noise levels are paramount."
      },
      medium: {
        name: "High-End Craft Cocktail Lounge",
        budget: "$8,200 - $13,500 AUD",
        capacity: "80-160 patrons",
        equipment: ["1x Atosa Double Solid Door Underbar Freezer", "1x Countertop Glass Froster Chiller", "1x 2-Door Display Chiller with Warm Timber Finish"],
        summary: "Balanced capacity allowing separate temperature staging for glassware, spirits, and house-made syrups."
      },
      large: {
        name: "Dual-Station Premium Mixology Bar",
        budget: "$16,500 - $26,000 AUD",
        capacity: "200+ patrons",
        equipment: ["2x Skope Underbar Freezers with Drawer Inserts", "2x Dedicated Glass Frosters", "1x Upright Merchandiser for Rare Spirits"],
        summary: "Complete dual-station speed rack setup with dedicated sub-zero storage for multi-tender cocktail rushes."
      }
    },
    relatedCategories: ["glass-frosters-specialty", "under-bar-freezers", "bottle-coolers"]
  },
  {
    name: "Restaurants",
    slug: "restaurants",
    path: "/venues/restaurants/",
    intro: "Sleek front-of-house bar fridges and undercounter freezers that combine quiet operation with Michelin-grade food and beverage safety.",
    heroStat: "Whisper-quiet <42 dB acoustic profile",
    setups: {
      small: {
        name: "Casual Bistro Bar",
        budget: "$3,400 - $5,100 AUD",
        capacity: "40-60 seats",
        equipment: ["1x 2-Door Underbar Wine & Beer Fridge", "1x Single Door Compact Underbench Freezer"],
        summary: "Quiet, compact footprint perfect for open-dining bistros and Italian neighbourhood trattorias."
      },
      medium: {
        name: "Full Service Dining Bar",
        budget: "$7,800 - $11,900 AUD",
        capacity: "70-130 seats",
        equipment: ["1x Dual-Zone Wine Chiller", "1x 2-Door Underbench Glass Door Fridge", "1x 1-Door Underbar Stainless Freezer"],
        summary: "Allows independent temperature holding for wine by the glass, beer taps, and frozen dessert service."
      },
      large: {
        name: "Fine Dining & Event Restaurant",
        budget: "$18,000 - $29,000 AUD",
        capacity: "150+ seats",
        equipment: ["2x Liebherr Commercial Wine Cabinets", "2x 2-Door Williams Underbar Freezers", "1x Hoshizaki Underbar Ice Machine"],
        summary: "Premier hospitality installation meeting strict HACCP compliance and quiet guest environments."
      }
    },
    relatedCategories: ["wine-fridges", "under-bar-freezers", "combination-fridge-freezers"]
  },
  {
    name: "Cafes",
    slug: "cafes",
    path: "/venues/cafes/",
    intro: "Space-efficient 600mm and 900mm undercounter refrigeration for milk pitchers, cold brew kegs, gelato scoops, and breakfast prep.",
    heroStat: "Rapid pull-down for milk and cold brew",
    setups: {
      small: {
        name: "Espresso Bar Setup",
        budget: "$2,200 - $3,600 AUD",
        capacity: "Takeaway + 20 seats",
        equipment: ["1x Single Door Underbench Milk Fridge", "1x Compact Bench-top Display Freezer for Pastries/Acai"],
        summary: "Ultra-compact footprint designed to tuck directly under espresso machine drip trays."
      },
      medium: {
        name: "All-Day Brunch Cafe",
        budget: "$5,500 - $8,200 AUD",
        capacity: "40-80 seats",
        equipment: ["1x 2-Door Underbench Fridge with Jug System", "1x 1-Door Underbench Bar Freezer for Acai & Fruit Purees"],
        summary: "Streamlined workflow handling high-volume milk jugs alongside frozen smoothie and brunch prep."
      },
      large: {
        name: "Bakery & High-Volume Cafe Hub",
        budget: "$11,000 - $17,000 AUD",
        capacity: "100+ seats",
        equipment: ["1x 3-Door Underbench Stainless Bench", "1x Upright Single Glass Merchandiser", "1x Chest Freezer with Worktop"],
        summary: "High volume storage for wholesale baked goods, frozen doughs, and retail cold beverages."
      }
    },
    relatedCategories: ["under-bar-freezers", "beer-beverage-fridges", "chest-bench-freezers"]
  },
  {
    name: "Nightclubs",
    slug: "nightclubs",
    path: "/venues/nightclubs/",
    intro: "Armoured commercial refrigeration engineered for high ambient heat, pounding bass vibration, and non-stop door opening all night.",
    heroStat: "Tested for 800+ door opens per shift",
    setups: {
      small: {
        name: "VIP Lounge Station",
        budget: "$4,500 - $7,000 AUD",
        capacity: "VIP room (50 guests)",
        equipment: ["1x 2-Door Matte Black Backbar Chiller with LED Lighting", "1x Dedicated Vodka Bottle Freezer (-20°C)"],
        summary: "High visual impact with dark stealth casing and illuminated spirit displays for bottle service."
      },
      medium: {
        name: "Main Room Speed Bar",
        budget: "$12,000 - $18,500 AUD",
        capacity: "300-600 clubbers",
        equipment: ["2x 3-Door Sliding Glass Door Bottle Coolers", "1x High-Speed Shot Freezer", "1x Heavy Slam-Latch Underbar Freezer"],
        summary: "Sliding doors prevent walkway congestion behind crowded club bars while maintaining sub-zero bottle temps."
      },
      large: {
        name: "Mega Club Multi-Level Rig",
        budget: "$28,000 - $49,000 AUD",
        capacity: "1,000+ patrons",
        equipment: ["6x 3-Door Rapid Cool Bottle Fridges", "3x High-Capacity Shot Freezers", "2x Ice Reserve Chests"],
        summary: "Industrial hospitality fleet with remote compressors to minimize heat buildup behind nightclub bars."
      }
    },
    relatedCategories: ["back-bar-fridges", "bottle-coolers", "glass-frosters-specialty"]
  },
  {
    name: "RSL & Sports Clubs",
    slug: "rsl-sports-clubs",
    path: "/venues/rsl-sports-clubs/",
    intro: "Reliable, high-volume Australian club refrigeration with 5-year commercial warranties, simple digital controls, and heavy bottle capacity.",
    heroStat: "5-Year Australian On-Site Trade Warranty",
    setups: {
      small: {
        name: "Bowls Club Bar",
        budget: "$3,900 - $6,000 AUD",
        capacity: "60-100 members",
        equipment: ["1x 2-Door Underbar Solid Door Fridge", "1x Single Door Glass Froster for Beer Middies"],
        summary: "Simple, bulletproof refrigeration with low maintenance requirements for member clubrooms."
      },
      medium: {
        name: "Sports Club Members Lounge",
        budget: "$9,000 - $14,000 AUD",
        capacity: "150-300 members",
        equipment: ["2x 2-Door Glass Backbar Fridges", "1x 2-Door Underbench Freezer", "1x Commercial Beer Mug Froster"],
        summary: "Keeps hundreds of heavy beer handles and schooner glasses sub-zero for weekend sports rushes."
      },
      large: {
        name: "Premier RSL Gaming & Sports Complex",
        budget: "$24,000 - $39,000 AUD",
        capacity: "500+ members",
        equipment: ["4x 3-Door Skope ReFlex Bar Coolers", "2x Double Glass Frosters", "1x Upright Double Door Kitchen Reserve Freezer"],
        summary: "Tier-1 energy efficient fleet reducing club power bills by up to 35% on Australian MEPS standards."
      }
    },
    relatedCategories: ["under-bar-freezers", "glass-frosters-specialty", "beer-beverage-fridges"]
  },
  {
    name: "Bottle Shops",
    slug: "bottle-shops",
    path: "/venues/bottle-shops/",
    intro: "Heavy-duty glass display merchandisers and cool room reserve freezers for chilled craft singles, bulk slabs, and party ice.",
    heroStat: "High-visibility Low-E heated glass",
    setups: {
      small: {
        name: "Boutique Wine & Craft Cellar",
        budget: "$4,800 - $7,500 AUD",
        capacity: "Boutique retail",
        equipment: ["1x 2-Door Upright Glass Merchandiser Chiller", "1x Countertop Display Freezer for Pre-batched Cocktails"],
        summary: "Showcases premium craft spirits, natural wines, and artisan frozen cocktail mixes."
      },
      medium: {
        name: "Independent Liquor Store",
        budget: "$12,500 - $19,000 AUD",
        capacity: "Standard retail strip",
        equipment: ["2x 2-Door Upright Glass Display Coolers", "1x Sliding Glass Lid Chest Freezer for 5kg Ice Bags"],
        summary: "Heavy traffic commercial merchandising with self-closing doors and high-lumen vertical LED strips."
      },
      large: {
        name: "Drive-Through Superstore",
        budget: "$32,000 - $55,000 AUD",
        capacity: "High volume retail",
        equipment: ["4x 3-Door Glass Upright Display Merchandisers", "2x High-Volume Chest Ice Merchandisers", "1x Walk-in Reserve Chiller"],
        summary: "Maximum throughput units with R290 green refrigerant for ultra-low retail electricity overheads."
      }
    },
    relatedCategories: ["glass-door-display-freezers", "chest-bench-freezers", "beer-beverage-fridges"]
  },
  {
    name: "Catering & Events",
    slug: "catering-events",
    path: "/venues/catering-events/",
    intro: "Mobile, castor-mounted bar freezers and heavy-duty chest chillers built for rapid load-in, generators, and outdoor marquee setups.",
    heroStat: "Generator & 10A standard plug friendly",
    setups: {
      small: {
        name: "Pop-Up Cocktail Tender",
        budget: "$2,100 - $3,500 AUD",
        capacity: "Weddings (40-80 guests)",
        equipment: ["1x Castor-Mounted Mobile Bench-top Froster", "1x 100L Heavy-Duty Insulated Ice Caddy"],
        summary: "Compact enough to roll into a van or estate vehicle and operate on standard 10A extension leads."
      },
      medium: {
        name: "Corporate Event Caterer",
        budget: "$6,500 - $10,500 AUD",
        capacity: "Functions (100-300 guests)",
        equipment: ["2x Castor-Mounted Underbar 2-Door Freezers", "1x Portable Kegerator 2-Tap Unit"],
        summary: "Quick setup mobile refrigeration with brake castors and scratch-resistant stainless steel tops."
      },
      large: {
        name: "Festival & Arena Hospitality Supplier",
        budget: "$17,500 - $28,000 AUD",
        capacity: "Major events (500+ guests)",
        equipment: ["4x Mobile 2-Door Chiller Trolleys", "2x Bar Chest Freezers with Reinforced Bumpers", "1x High-Output Mobile Ice Maker"],
        summary: "Rugged road-case compatible cold storage fleet ready for multi-day festival and expo deployments."
      }
    },
    relatedCategories: ["chest-bench-freezers", "under-bar-freezers", "castors-legs-stands"]
  },
  {
    name: "Food Trucks & Mobile Bars",
    slug: "food-trucks-mobile-bars",
    path: "/venues/food-trucks-mobile-bars/",
    intro: "Low-height, vibration-resistant 10A commercial freezers and fridges designed for tight vehicle clearances and generator supplies.",
    heroStat: "Low-draw 10A power draw (<450W)",
    setups: {
      small: {
        name: "Mobile Coffee & Cocktail Van",
        budget: "$2,600 - $4,100 AUD",
        capacity: "Mobile van / horse float",
        equipment: ["1x 600mm Undercounter Slimline Freezer (Polar)", "1x 1-Door Undercounter Glass Fridge with Key Lock"],
        summary: "Low clearance 820mm units with mechanical travel door latches to prevent door swing on the road."
      },
      medium: {
        name: "Vintage Caravan Bar",
        budget: "$5,800 - $8,900 AUD",
        capacity: "Private celebrations (60-150 guests)",
        equipment: ["1x 2-Door Low-Profile Underbar Fridge (Bromic)", "1x Built-in Glass Froster Bench Unit"],
        summary: "The benchmark equipment setup for converted retro caravan bars and mobile beer dispensers across Australia."
      },
      large: {
        name: "Full Commercial Food Trailer",
        budget: "$10,500 - $16,000 AUD",
        capacity: "High volume mobile catering",
        equipment: ["1x 2-Door Stainless Worktop Freezer", "1x 2-Door Undercounter Prep Fridge", "1x Underbench Ice Machine"],
        summary: "Commercial food hygiene compliant stainless work surfaces with heavy insulation for outdoor summer heat."
      }
    },
    relatedCategories: ["under-bar-freezers", "kegerators-dispensers", "door-locks-gaskets"]
  },
  {
    name: "Ice Cream & Gelato Shops",
    slug: "ice-cream-gelato-shops",
    path: "/venues/ice-cream-gelato-shops/",
    intro: "Deep-freeze storage units maintaining -18°C to -25°C to preserve velvety texture and prevent ice crystallisation in artisanal dairy.",
    heroStat: "Sub-zero -25°C precision holding",
    setups: {
      small: {
        name: "Artisan Micro-Scoopery",
        budget: "$3,600 - $5,500 AUD",
        capacity: "8-12 daily flavours",
        equipment: ["1x Curved Glass Countertop Gelato Merchandiser", "1x Underbench Reserve Deep Freezer"],
        summary: "Compact static display with heated front glass preventing fogging in humid Australian coastal climates."
      },
      medium: {
        name: "Boutique Gelateria",
        budget: "$8,900 - $14,000 AUD",
        capacity: "16-24 pans",
        equipment: ["1x High-Display Ventilated Gelato Showcase", "1x Upright Single Stainless Deep Freezer (-25°C)"],
        summary: "Forced-air refrigeration ensuring uniform temperature across every row of gelato pans."
      },
      large: {
        name: "Flagship Gelato & Dessert Lounge",
        budget: "$21,000 - $36,000 AUD",
        capacity: "Multi-station dessert venue",
        equipment: ["2x 16-Pan Ventilated Showcases", "1x 2-Door Upright Commercial Deep Freeze", "1x Blast Freezing Station"],
        summary: "Full commercial production and front-of-house merchandising infrastructure."
      }
    },
    relatedCategories: ["glass-door-display-freezers", "upright-commercial-freezers", "chest-bench-freezers"]
  },
  {
    name: "Breweries & Distilleries",
    slug: "breweries-distilleries",
    path: "/venues/breweries-distilleries/",
    intro: "Taproom underbar freezers for frosted pint glasses, hop pellet storage, spirit aging temperature locks, and cellar tasting benches.",
    heroStat: "Heavy 304-grade stainless steel build",
    setups: {
      small: {
        name: "Micro-Distillery Tasting Room",
        budget: "$4,200 - $6,400 AUD",
        capacity: "30-50 tasting guests",
        equipment: ["1x Heavy Duty Glass Froster (fits 60 rocks glasses)", "1x 2-Door Matte Black Display Chiller"],
        summary: "Serves neat spirits at perfect cellar temperatures alongside frosted craft tasting glassware."
      },
      medium: {
        name: "Craft Brewery Taproom",
        budget: "$11,000 - $16,500 AUD",
        capacity: "100-200 patrons",
        equipment: ["2x 3-Door Underbar Glass Chillers for Crowlers & Cans", "1x 2-Door Glass Froster for Craft Steins", "1x Keg Storage Chiller"],
        summary: "Built for heavy taproom patronage with sliding glass doors and rapid temperature recovery."
      },
      large: {
        name: "Production Brewery & Beer Hall",
        budget: "$25,000 - $44,000 AUD",
        capacity: "300+ patrons",
        equipment: ["4x 3-Door Commercial Merchandisers", "2x Sub-Zero Glass Frosters", "1x Upright Hop Storage Freezer"],
        summary: "Integrates front-of-house taproom showcase fridges with back-of-house cold chain storage."
      }
    },
    relatedCategories: ["glass-frosters-specialty", "kegerators-dispensers", "under-bar-freezers"]
  },
  {
    name: "Home Bars & Man Caves",
    slug: "home-bars-man-caves",
    path: "/venues/home-bars-man-caves/",
    intro: "Turn your rumpus room or basement into a commercial-grade sports bar. Front-venting underbench freezers for frosty beers and spirits.",
    heroStat: "Front venting for tight under-cabinet fit",
    setups: {
      small: {
        name: "Under-Counter Man Cave Starter",
        budget: "$1,450 - $2,200 AUD",
        capacity: "Home entertainment (4-10 guests)",
        equipment: ["1x 600mm Single Glass Door Beverage Fridge", "1x Compact 60L Underbench Bar Freezer"],
        summary: "Fits directly into standard 600mm Australian domestic cabinetry with zero side clearance needed."
      },
      medium: {
        name: "The Ultimate Sports Bar Lounge",
        budget: "$3,200 - $5,400 AUD",
        capacity: "Weekend gatherings (12-25 guests)",
        equipment: ["1x 2-Door Matte Black Glass Bar Fridge with Blue LED", "1x Bar Freezer for Ice & Spirits", "1x 2-Tap Built-in Kegerator"],
        summary: "Commercial look and performance calibrated for home acoustics and residential power sockets."
      },
      large: {
        name: "Executive Luxury Home Bar & Cellar",
        budget: "$7,500 - $13,500 AUD",
        capacity: "Entertaining estate",
        equipment: ["1x Vintec Dual Zone Wine Cabinet", "1x Liebherr Integrated Underbench Freezer", "1x Commercial Beer Stein Froster"],
        summary: "Architectural luxury fit-out with seamless flush cabinetry integration and whisper-quiet operation."
      }
    },
    relatedCategories: ["home-bar-outdoor-freezers", "wine-fridges", "kegerators-dispensers"]
  },
  {
    name: "Alfresco / Outdoor",
    slug: "alfresco-outdoor",
    path: "/venues/alfresco-outdoor/",
    intro: "IPX4 water-rated 304 marine-grade stainless steel refrigeration engineered to hold temperature in open 43°C Australian summer patio heat.",
    heroStat: "Tested in 43°C tropical ambient humidity",
    setups: {
      small: {
        name: "Covered Patio BBQ Station",
        budget: "$1,850 - $2,900 AUD",
        capacity: "Family BBQ & outdoor dining",
        equipment: ["1x Schmick Single Door Alfresco Fridge with Heated Glass", "1x Outdoor Weather-Resistant Cover"],
        summary: "Heated glass stops condensation fogging in high Australian coastal humidity."
      },
      medium: {
        name: "Outdoor Kitchen & Pool Cabana",
        budget: "$4,200 - $6,800 AUD",
        capacity: "Poolside parties (15-30 guests)",
        equipment: ["1x 2-Door Marine Grade 304 Stainless Bar Fridge", "1x Outdoor-Rated Bar Freezer for Ice Bags & Popsicles"],
        summary: "Full IPX4 weather rating with lockable doors to protect stock from weather and little hands."
      },
      large: {
        name: "Luxury Alfresco Pavillion & Outdoor Kitchen",
        budget: "$8,500 - $15,000 AUD",
        capacity: "Large outdoor banquets",
        equipment: ["1x 3-Door Outdoor Bar Chiller", "1x Outdoor Rated Glass Froster", "1x Outdoor Stainless Kegerator with Heated Font"],
        summary: "Complete open-air entertainment suite engineered to withstand coastal salt air and torrential rain."
      }
    },
    relatedCategories: ["outdoor-alfresco-fridges", "home-bar-outdoor-freezers", "covers-cleaning"]
  },
  {
    name: "Caravans & Boats",
    slug: "caravans-boats",
    path: "/venues/caravans-boats/",
    intro: "Vibration-proof, dual 12V/24V and 240V marine refrigeration with positive mechanical door catches and ultra-low battery draw.",
    heroStat: "Dual 12V DC / 240V AC automatic switching",
    setups: {
      small: {
        name: "Off-Grid Campervan Bar",
        budget: "$1,600 - $2,400 AUD",
        capacity: "Couples touring",
        equipment: ["1x Dometic 65L Upright Compressor Fridge/Freezer (12V/240V)", "1x Heavy Mounting Bracket"],
        summary: "High efficiency Danfoss/Secop compressor drawing under 1.2 Ah per hour on 12V lithium systems."
      },
      medium: {
        name: "Off-Road Caravan & 4WD Rig",
        budget: "$3,100 - $4,800 AUD",
        capacity: "Family overland touring",
        equipment: ["1x Dometic 110L Dual Zone Fridge/Freezer with Lock", "1x Portable 12V Ice Maker"],
        summary: "Heavy-duty vibration proofing designed for corrugated outback tracks and remote heat."
      },
      large: {
        name: "Luxury Yacht & Catamaran Galley Bar",
        budget: "$6,500 - $11,000 AUD",
        capacity: "Marine cruising",
        equipment: ["1x 316 Marine Grade Underbench Stainless Drawer Freezer", "1x Cockpit Beverage Chiller with Remote Compressor"],
        summary: "Saltwater-corrosion-proof 316 stainless steel with magnetic gasket and positive deadbolt catches."
      }
    },
    relatedCategories: ["combination-fridge-freezers", "door-locks-gaskets", "chest-bench-freezers"]
  },
  {
    name: "Offices & Staff Rooms",
    slug: "offices-staff-rooms",
    path: "/venues/offices-staff-rooms/",
    intro: "Durable, low-maintenance beverage fridges and ice freezers for corporate staff breakout areas, Friday drinks, and executive boardrooms.",
    heroStat: "Acoustic insulation <39 dB for boardrooms",
    setups: {
      small: {
        name: "Startup & Small Studio Kitchenette",
        budget: "$1,200 - $1,900 AUD",
        capacity: "10-25 staff",
        equipment: ["1x 120L Single Door Beverage Merchandiser with Key Lock", "1x Compact Ice & Ice-Cream Freezer"],
        summary: "Includes key locks standard to keep catering stock secure outside Friday social hours."
      },
      medium: {
        name: "Mid-Sized Corporate Breakout",
        budget: "$2,800 - $4,500 AUD",
        capacity: "30-80 staff",
        equipment: ["1x 2-Door Glass Display Drinks Fridge", "1x Underbench Stainless Ice Storage Freezer"],
        summary: "Twin self-closing glass doors keep drinks ice-cold through busy lunchtime and all-hands events."
      },
      large: {
        name: "Enterprise Multi-Floor Office Suite",
        budget: "$7,000 - $12,500 AUD",
        capacity: "100+ staff / client entertaining",
        equipment: ["2x 2-Door Commercial Beverage Merchandisers", "1x Premium Boardroom Wine & Spirit Cabinet", "1x Underbench Ice Maker"],
        summary: "Architectural aesthetics matching executive interior design with whisper-quiet operation."
      }
    },
    relatedCategories: ["beer-beverage-fridges", "under-bar-freezers", "door-locks-gaskets"]
  }
];

export const CITIES = [
  {
    name: "Sydney",
    slug: "sydney",
    state: "NSW",
    metroPostcodeRange: "2000 - 2234, 2560 - 2770",
    deliveryTime: "Next business day (Same day dispatch for orders before 2pm)",
    deliveryCost: "$89 flat rate metro (Free for orders over $3,500)",
    regionalNotes: "Regional NSW (Central Coast, Blue Mountains, Wollongong, Southern Highlands) delivered in 2-3 business days. Tailgate service available on request.",
    authorizedServiceAgents: "14 licensed refrigeration mechanics across Greater Sydney & Western Sydney",
    localDepot: "Distribution Centre 3, Chullora NSW 2190 (Customer collection available by appointment)"
  },
  {
    name: "Melbourne",
    slug: "melbourne",
    state: "VIC",
    metroPostcodeRange: "3000 - 3207",
    deliveryTime: "1-2 business days",
    deliveryCost: "$89 flat rate metro (Free for orders over $3,500)",
    regionalNotes: "Regional Victoria (Geelong, Ballarat, Bendigo, Mornington Peninsula) dispatched daily with 2-day delivery.",
    authorizedServiceAgents: "12 authorized repair contractors covering CBD, Northern, Eastern & Western suburbs",
    localDepot: "Logistics Hub B, Truganina VIC 3029"
  },
  {
    name: "Brisbane",
    slug: "brisbane",
    state: "QLD",
    metroPostcodeRange: "4000 - 4179, 4300 - 4305",
    deliveryTime: "1-2 business days",
    deliveryCost: "$95 flat rate metro (Free for orders over $3,500)",
    regionalNotes: "Gold Coast and Sunshine Coast delivered on dedicated daily shuttle runs.",
    authorizedServiceAgents: "9 certified commercial refrigeration technicians",
    localDepot: "Industrial Way, Yatala QLD 4207"
  },
  {
    name: "Perth",
    slug: "perth",
    state: "WA",
    metroPostcodeRange: "6000 - 6199",
    deliveryTime: "2-3 business days (Stocked locally in WA warehouse)",
    deliveryCost: "$120 flat rate metro (Free for orders over $4,000)",
    regionalNotes: "Direct freight to Southwest (Bunbury, Margaret River) and Northern mining hubs via specialized road transit.",
    authorizedServiceAgents: "7 authorized warranty repair agents across Perth metro",
    localDepot: "Airport Freight Estate, Hazelmere WA 6055"
  },
  {
    name: "Adelaide",
    slug: "adelaide",
    state: "SA",
    metroPostcodeRange: "5000 - 5199",
    deliveryTime: "2 business days",
    deliveryCost: "$95 flat rate metro (Free for orders over $3,500)",
    regionalNotes: "Direct connections to Barossa Valley, McLaren Vale, and Adelaide Hills hospitality venues.",
    authorizedServiceAgents: "6 mobile refrigeration technicians",
    localDepot: "Freightlink Hub, Regency Park SA 5010"
  },
  {
    name: "Canberra",
    slug: "canberra",
    state: "ACT",
    metroPostcodeRange: "2600 - 2620, 2900 - 2914",
    deliveryTime: "1-2 business days",
    deliveryCost: "$95 flat rate metro",
    regionalNotes: "Daily express line-haul from our Sydney distribution centre.",
    authorizedServiceAgents: "4 ACT licensed commercial refrigeration mechanics",
    localDepot: "Fyshwick Logistics Park ACT 2609"
  },
  {
    name: "Hobart",
    slug: "hobart",
    state: "TAS",
    metroPostcodeRange: "7000 - 7054",
    deliveryTime: "3-4 business days (Bass Strait SeaRoad express)",
    deliveryCost: "$165 flat rate metro",
    regionalNotes: "All units secured in heavy timber export crates for maritime transit.",
    authorizedServiceAgents: "3 Tasmanian authorized service partners",
    localDepot: "Derwent Park Freight Terminal TAS 7009"
  },
  {
    name: "Darwin",
    slug: "darwin",
    state: "NT",
    metroPostcodeRange: "0800 - 0832",
    deliveryTime: "4-6 business days",
    deliveryCost: "$220 flat rate metro (Tropical T-Class rated units only)",
    regionalNotes: "Specialist tropical packaging. Every unit dispatched to NT is pre-tested for high-ambient humidity performance.",
    authorizedServiceAgents: "2 specialized commercial cooling contractors in Darwin & Palmerston",
    localDepot: "Berrimah Rail Freight Terminal NT 0828"
  },
  {
    name: "Gold Coast",
    slug: "gold-coast",
    state: "QLD",
    metroPostcodeRange: "4208 - 4230",
    deliveryTime: "1-2 business days (Daily dispatch from Yatala depot)",
    deliveryCost: "$89 flat rate metro",
    regionalNotes: "Door-to-door delivery with optional uncrate and position service for beachfront hospitality venues.",
    authorizedServiceAgents: "6 Gold Coast commercial refrigeration technicians",
    localDepot: "Yatala Depot QLD 4207"
  },
  {
    name: "Newcastle",
    slug: "newcastle",
    state: "NSW",
    metroPostcodeRange: "2280 - 2310",
    deliveryTime: "1-2 business days",
    deliveryCost: "$95 flat rate",
    regionalNotes: "Fast delivery to Newcastle CBD, Hunter Valley wineries, and Lake Macquarie venues.",
    authorizedServiceAgents: "5 Hunter Region service partners",
    localDepot: "Hexham Freight Centre NSW 2322"
  },
  {
    name: "Wollongong",
    slug: "wollongong",
    state: "NSW",
    metroPostcodeRange: "2500 - 2530",
    deliveryTime: "1 business day",
    deliveryCost: "$89 flat rate",
    regionalNotes: "Direct daily van runs from Sydney distribution centre.",
    authorizedServiceAgents: "4 Illawarra commercial refrigeration contractors",
    localDepot: "Unanderra Industrial Estate NSW 2526"
  },
  {
    name: "Geelong",
    slug: "geelong",
    state: "VIC",
    metroPostcodeRange: "3211 - 3228",
    deliveryTime: "1-2 business days",
    deliveryCost: "$89 flat rate",
    regionalNotes: "Daily transit from Truganina warehouse to Bellarine Peninsula and Surf Coast.",
    authorizedServiceAgents: "4 local authorized repairers",
    localDepot: "North Geelong Freight Depot VIC 3215"
  },
  {
    name: "Sunshine Coast",
    slug: "sunshine-coast",
    state: "QLD",
    metroPostcodeRange: "4550 - 4575",
    deliveryTime: "2 business days",
    deliveryCost: "$95 flat rate",
    regionalNotes: "Covers Caloundra to Noosa Heads with tailgate lifter service.",
    authorizedServiceAgents: "4 Sunshine Coast commercial technicians",
    localDepot: "Kunda Park Logistics Centre QLD 4556"
  },
  {
    name: "Townsville",
    slug: "townsville",
    state: "QLD",
    metroPostcodeRange: "4810 - 4819",
    deliveryTime: "3-4 business days",
    deliveryCost: "$175 flat rate",
    regionalNotes: "All units supplied with 43°C tropical ambient rating and coated condenser coils.",
    authorizedServiceAgents: "3 North Queensland authorized service technicians",
    localDepot: "Stuart Freight Depot QLD 4811"
  },
  {
    name: "Cairns",
    slug: "cairns",
    state: "QLD",
    metroPostcodeRange: "4868 - 4879",
    deliveryTime: "4-5 business days",
    deliveryCost: "$195 flat rate",
    regionalNotes: "Reinforced tropicalized packaging to withstand humid maritime conditions.",
    authorizedServiceAgents: "2 Far North Queensland commercial refrigeration partners",
    localDepot: "Portsmith Logistics Hub QLD 4870"
  },
  {
    name: "Toowoomba",
    slug: "toowoomba",
    state: "QLD",
    metroPostcodeRange: "4350 - 4352",
    deliveryTime: "2 business days",
    deliveryCost: "$110 flat rate",
    regionalNotes: "Direct daily road freight from Brisbane distribution centre.",
    authorizedServiceAgents: "3 Darling Downs authorized service mechanics",
    localDepot: "Wilsonton Industrial Hub QLD 4350"
  }
];

export const PRODUCTS = [
  {
    id: "bf-001",
    sku: "BF-UB2D-SS",
    brand: "Skope",
    model: "ReFlex UB-210-F",
    name: "Skope ReFlex 2-Door Underbar Stainless Commercial Freezer 210L",
    slug: "skope-reflex-2-door-underbar-stainless-commercial-freezer-210l",
    categorySlug: "under-bar-freezers",
    primaryCategory: "Bar Freezers",
    subCategory: "Under Bar / Undercounter Freezers",
    type: "Double Door",
    doorCount: 2,
    doorType: "solid",
    doorStyle: "hinged",
    widthMm: 1360,
    depthMm: 700,
    heightMm: 850,
    widthRange: "1200-1500",
    capacityLitres: 210,
    capacityRange: "200-300",
    price: 3690,
    tradePrice: 3290,
    msrp: 4190,
    finish: "stainless",
    tempRange: "-18°C to -22°C",
    installation: "under-bench",
    use: "commercial",
    power: "10A",
    plugType: "Standard 10 Amp Australian 3-pin plug",
    powerWatts: 420,
    refrigerant: "R290 Natural Hydrocarbon",
    ambientRating: "40°C Class 5",
    energyRating: "4.5 Stars MEPS",
    weightKg: 114,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Ships today if ordered before 2pm",
    stockQty: 8,
    warrantyYears: 5,
    warrantyText: "5 Years Skope Full Parts & On-Site Labour Warranty Australia-wide",
    features: ["Digital Display (Dixell)", "Self-Closing Lockable Doors", "Auto Electric Defrost", "Heavy Duty Castors & Levelling Feet", "R290 Eco Refrigerant", "Internal LED Lighting"],
    shortDescription: "Australia's favourite commercial underbench freezer. Fits flush under standard 900mm bars with rapid pull-down and whisper-quiet natural hydrocarbon efficiency.",
    fullDescription: "Engineered specifically for Australian hospitality conditions, the Skope ReFlex 2-door underbench freezer delivers unwavering sub-zero performance even when ambient kitchen temperatures reach 40°C. Featuring 304 food-grade stainless steel inside and out, magnetic removable door gaskets, and digital Dixell temperature control with high/low temperature alarms. Plugs directly into any standard Australian 10A wall outlet.",
    specs: {
      "External Dimensions": "1360mm W x 700mm D x 850mm H",
      "Internal Dimensions": "940mm W x 580mm D x 560mm H",
      "Usable Capacity": "210 Litres",
      "Temperature Range": "-18°C to -22°C (Tested in 40°C Ambient)",
      "Refrigerant": "Natural R290 (Zero ODP, GWP < 3)",
      "Power Connection": "240V / 50Hz, 10 Amp standard plug",
      "Shelves Supplied": "4x Heavy Duty PVC coated wire shelves + floor",
      "Net Weight": "114 kg",
      "Sound Level": "54 dB(A)",
      "Compliance": "RCM, MEPS, HACCP Certified"
    },
    dimensionGuide: {
      requiredCutout: "1380mm W x 720mm D x 865mm H",
      ventilationClearance: "Zero rear clearance needed (front-breathing airflow)",
      doorSwingRadius: "520mm per door"
    },
    frequentlyBoughtTogether: ["acc-001", "acc-003", "acc-005"],
    alternatives: ["bf-002", "bf-008", "bf-003"]
  },
  {
    id: "bf-002",
    sku: "BRO-UB1D-SS",
    brand: "Bromic",
    model: "UF0100S-NR",
    name: "Bromic 1-Door Compact Underbar Stainless Freezer 115L",
    slug: "bromic-1-door-compact-underbar-stainless-freezer-115l",
    categorySlug: "under-bar-freezers",
    primaryCategory: "Bar Freezers",
    subCategory: "Under Bar / Undercounter Freezers",
    type: "Single Door",
    doorCount: 1,
    doorType: "solid",
    doorStyle: "hinged",
    widthMm: 595,
    depthMm: 620,
    heightMm: 830,
    widthRange: "<600",
    capacityLitres: 115,
    capacityRange: "100-200",
    price: 1590,
    tradePrice: 1390,
    msrp: 1850,
    finish: "stainless",
    tempRange: "-16°C to -22°C",
    installation: "under-bench",
    use: "commercial",
    power: "10A",
    plugType: "Standard 10 Amp plug",
    powerWatts: 210,
    refrigerant: "R600a",
    ambientRating: "38°C Class 4",
    energyRating: "4 Stars MEPS",
    weightKg: 46,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Ships today if ordered before 2pm",
    stockQty: 14,
    warrantyYears: 2,
    warrantyText: "2 Years Bromic Parts & Labour Australia-Wide Warranty",
    features: ["Digital Display", "Key Lock Standard", "Reversible Door", "Fixed Freeze Shelves", "Front Venting", "Compact 600mm Module"],
    shortDescription: "Ultra-compact 600mm commercial underbench freezer. Perfect for cocktail speed rails, cafe purees, and space-constrained home bars.",
    fullDescription: "The Bromic UF0100S-NR provides dependable commercial deep freezing in an ultra-compact 595mm wide package. Built with a brushed stainless steel door skin, integrated lock, and three fixed evaporator shelves for fast, direct-contact contact freezing of martini glasses and spirit bottles.",
    specs: {
      "External Dimensions": "595mm W x 620mm D x 830mm H",
      "Capacity": "115 Litres",
      "Temperature Range": "-16°C to -22°C",
      "Door": "Reversible solid stainless door with lock",
      "Power Connection": "240V / 10A single phase",
      "Weight": "46 kg"
    },
    dimensionGuide: {
      requiredCutout: "615mm W x 640mm D x 845mm H",
      ventilationClearance: "20mm sides, front-venting grille",
      doorSwingRadius: "600mm"
    },
    frequentlyBoughtTogether: ["acc-002", "acc-006"],
    alternatives: ["bf-001", "bf-009"]
  },
  {
    id: "bf-003",
    sku: "WIL-UB3D-SS",
    brand: "Williams",
    model: "Cameo UBC3F",
    name: "Williams Cameo 3-Door Commercial Underbar Stainless Freezer 350L",
    slug: "williams-cameo-3-door-commercial-underbar-stainless-freezer-350l",
    categorySlug: "under-bar-freezers",
    primaryCategory: "Bar Freezers",
    subCategory: "Under Bar / Undercounter Freezers",
    type: "Triple Door",
    doorCount: 3,
    doorType: "solid",
    doorStyle: "hinged",
    widthMm: 1880,
    depthMm: 700,
    heightMm: 845,
    widthRange: "1800+",
    capacityLitres: 350,
    capacityRange: "300-400",
    price: 4950,
    tradePrice: 4420,
    msrp: 5690,
    finish: "stainless",
    tempRange: "-18°C to -22°C",
    installation: "under-bench",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp Australian 3-pin plug",
    powerWatts: 620,
    refrigerant: "R290 Natural Gas",
    ambientRating: "43°C Tropical Rated",
    energyRating: "5 Stars High Efficiency",
    weightKg: 152,
    condition: "new",
    availability: "in stock",
    shippingBadge: "In stock - Dispatches within 24 hours",
    stockQty: 5,
    warrantyYears: 3,
    warrantyText: "3 Years Williams Commercial Warranty (Australia-wide)",
    features: ["43°C Tropical Rated", "Front Breathing Removable Cassette", "Dixell Touch Controller", "Lockable Doors", "Heavy Duty Stainless Prep Top", "Anti-sweat Door Heaters"],
    shortDescription: "Australian-built high capacity 3-door underbar workhorse. 43°C tropical rated with front-breathing cassette for effortless maintenance.",
    fullDescription: "Australian hospitality benchmark. Built with food-safe 304 stainless steel throughout, Williams Cameo series delivers unmatched temperature recovery during peak Friday night bar rushes. Engineered for zero rear clearance with all service access from the front.",
    specs: {
      "External Dimensions": "1880mm W x 700mm D x 845mm H",
      "Capacity": "350 Litres",
      "Power Connection": "240V / 10A standard plug",
      "Ambient Rating": "Class 5 (43°C Ambient / 70% RH)",
      "Shelving": "6x Adjustable nylon-coated wire shelves"
    },
    dimensionGuide: {
      requiredCutout: "1900mm W x 720mm D x 860mm H",
      ventilationClearance: "Zero side/rear clearance required",
      doorSwingRadius: "510mm per door"
    },
    frequentlyBoughtTogether: ["acc-001", "acc-003"],
    alternatives: ["bf-001", "bf-008"]
  },
  {
    id: "bf-004",
    sku: "SKP-GF1D-SS",
    brand: "Skope",
    model: "Froster-Pro 60",
    name: "Skope Commercial Glass Froster & Beer Mug Chiller -22°C",
    slug: "skope-commercial-glass-froster-beer-mug-chiller-subzero",
    categorySlug: "glass-frosters-specialty",
    primaryCategory: "Bar Freezers",
    subCategory: "Glass Frosters & Specialty",
    type: "Glass Froster",
    doorCount: 1,
    doorType: "solid",
    doorStyle: "sliding",
    widthMm: 600,
    depthMm: 650,
    heightMm: 840,
    widthRange: "600-900",
    capacityLitres: 140,
    capacityRange: "100-200",
    price: 2890,
    tradePrice: 2540,
    msrp: 3290,
    finish: "black",
    tempRange: "-18°C to -25°C",
    installation: "back bar",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 450,
    refrigerant: "R290",
    ambientRating: "40°C",
    energyRating: "4 Stars",
    weightKg: 68,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Ships today if ordered before 2pm",
    stockQty: 9,
    warrantyYears: 5,
    warrantyText: "5 Years Skope Parts & Labour On-Site Warranty",
    features: ["Sub-Zero Glass Frosting in 90s", "Top-Loading Sliding Lid", "Heavy Wire Glass Racks", "Matte Black Powdercoat", "Digital Microprocessor"],
    shortDescription: "Instant sub-zero beer stein, cocktail glass, and spirit bottle froster. Delivers ice-crusted glassware that stays frosty for up to 25 minutes.",
    fullDescription: "A must-have for premier cocktail lounges and craft breweries. Drops beer steins, martini coupes, and rocks glasses down to -22°C. Wet glassware instantly creates an opaque crystalline frost blanket upon contact, keeping signature drinks chilled without watery dilution.",
    specs: {
      "External Dimensions": "600mm W x 650mm D x 840mm H",
      "Capacity": "Holds 75x Standard 330ml Beer Steins or 95x Cocktail Glasses",
      "Operating Temp": "-18°C to -25°C Sub-Zero",
      "Lid": "Heavy insulated sliding stainless steel lid with recessed handle",
      "Drainage": "Manual interior drain for effortless defrost cleaning"
    },
    dimensionGuide: {
      requiredCutout: "620mm W x 670mm D x 850mm H",
      ventilationClearance: "50mm rear clearance recommended",
      doorSwingRadius: "0mm (Top sliding access)"
    },
    frequentlyBoughtTogether: ["acc-004", "acc-006"],
    alternatives: ["bf-002", "bf-005"]
  },
  {
    id: "bf-005",
    sku: "ATO-GF2D-MB",
    brand: "Atosa",
    model: "MGF8405GR",
    name: "Atosa Back Bar Glass Door Display Freezer 2-Door 280L",
    slug: "atosa-back-bar-glass-door-display-freezer-2-door-280l",
    categorySlug: "back-bar-freezers",
    primaryCategory: "Bar Freezers",
    subCategory: "Back Bar Freezers",
    type: "Double Door Glass",
    doorCount: 2,
    doorType: "glass",
    doorStyle: "hinged",
    widthMm: 1200,
    depthMm: 620,
    heightMm: 920,
    widthRange: "1200-1500",
    capacityLitres: 280,
    capacityRange: "200-300",
    price: 2990,
    tradePrice: 2650,
    msrp: 3490,
    finish: "black",
    tempRange: "-15°C to -20°C",
    installation: "back bar",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp Australian 3-pin plug",
    powerWatts: 480,
    refrigerant: "R290 Eco Hydrocarbon",
    ambientRating: "38°C",
    energyRating: "4.5 Stars",
    weightKg: 102,
    condition: "new",
    availability: "in stock",
    shippingBadge: "In stock - Dispatches within 24 hours",
    stockQty: 7,
    warrantyYears: 4,
    warrantyText: "4 Years Atosa Commercial Warranty (2 yrs parts & labour + 2 yrs parts)",
    features: ["Heated Double Glazed Glass", "Low-E Glass Stops Condensation", "Matte Black Interior & Exterior", "Vertical Crisp LED Lighting", "Key Lock on Each Door", "Dixell Digital Controller"],
    shortDescription: "Stunning matte black illuminated back bar freezer. Puts sub-zero premium spirits, chilled glassware, and frozen treats front-and-centre.",
    fullDescription: "Designed for eye-level back bar impact. Heated double-glazed Low-E glass panels prevent mist and fog even during humid summer nights. Interior vertical LED lighting bathes vodka bottles, tequila reserves, and frosted glassware in a clean ice-blue glow.",
    specs: {
      "External Dimensions": "1200mm W x 620mm D x 920mm H",
      "Capacity": "280 Litres",
      "Lighting": "Full height cool white LED strips",
      "Doors": "2x Self-closing heated glass doors with dual locks",
      "Finish": "Black textured exterior with food-grade black interior"
    },
    dimensionGuide: {
      requiredCutout: "1220mm W x 640mm D x 935mm H",
      ventilationClearance: "30mm rear clearance required",
      doorSwingRadius: "550mm per door"
    },
    frequentlyBoughtTogether: ["acc-001", "acc-005"],
    alternatives: ["bf-001", "bf-004"]
  },
  {
    id: "bf-006",
    sku: "SCH-ALF1D-SS",
    brand: "Schmick",
    model: "SK126-SS-F",
    name: "Schmick Outdoor Alfresco Marine Grade Bar Freezer 130L (IPX4)",
    slug: "schmick-outdoor-alfresco-marine-grade-bar-freezer-130l",
    categorySlug: "home-bar-outdoor-freezers",
    primaryCategory: "Bar Freezers",
    subCategory: "Home Bar & Outdoor Freezers",
    type: "Single Door Alfresco",
    doorCount: 1,
    doorType: "solid",
    doorStyle: "hinged",
    widthMm: 600,
    depthMm: 580,
    heightMm: 840,
    widthRange: "600-900",
    capacityLitres: 130,
    capacityRange: "100-200",
    price: 1890,
    tradePrice: 1690,
    msrp: 2190,
    finish: "stainless",
    tempRange: "-15°C to -22°C",
    installation: "under-bench",
    use: "outdoor-rated",
    power: "10A",
    plugType: "Standard 10A plug",
    powerWatts: 240,
    refrigerant: "R600a",
    ambientRating: "43°C Tropical Rated",
    energyRating: "4 Stars MEPS",
    weightKg: 52,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Ships today if ordered before 2pm",
    stockQty: 11,
    warrantyYears: 2,
    warrantyText: "2 Years Schmick Full Replacement & Service Warranty",
    features: ["IPX4 Water Rated", "304 Marine Grade Stainless Steel", "Front-Venting Plinth", "Lockable Heavy Door", "Holds -20°C in 43°C Heat", "Blue/White Switchable LED"],
    shortDescription: "Engineered specifically for Australian outdoor BBQ kitchens and alfresco patios. Fully waterproof IPX4 rated with marine-grade 304 stainless.",
    fullDescription: "Australian outdoor conditions destroy domestic indoor freezers within months. Schmick's alfresco commercial outdoor freezer is certified IPX4 water-resistant, wrapped in 304 marine-grade stainless steel to resist salt air and moisture, and built with oversized compressors tested to hold -20°C in direct 43°C summer heat.",
    specs: {
      "External Dimensions": "600mm W x 580mm D x 840mm H",
      "Capacity": "130 Litres",
      "Weather Rating": "IPX4 Outdoor Certified",
      "Plinth": "Front venting kickplate for flush underbench built-in installation",
      "Power": "240V / 10A plug and lead"
    },
    dimensionGuide: {
      requiredCutout: "605mm W x 600mm D x 850mm H",
      ventilationClearance: "Zero rear clearance (front-venting louvre)",
      doorSwingRadius: "580mm"
    },
    frequentlyBoughtTogether: ["acc-006", "acc-002"],
    alternatives: ["bf-002", "bf-007"]
  },
  {
    id: "bf-007",
    sku: "HUS-ALF2D-SS",
    brand: "Husky",
    model: "ALF-F2-SS",
    name: "Husky Alfresco Commercial Double Door Bar Freezer 220L",
    slug: "husky-alfresco-commercial-double-door-bar-freezer-220l",
    categorySlug: "home-bar-outdoor-freezers",
    primaryCategory: "Bar Freezers",
    subCategory: "Home Bar & Outdoor Freezers",
    type: "Double Door Alfresco",
    doorCount: 2,
    doorType: "solid",
    doorStyle: "hinged",
    widthMm: 900,
    depthMm: 550,
    heightMm: 840,
    widthRange: "900-1200",
    capacityLitres: 220,
    capacityRange: "200-300",
    price: 2690,
    tradePrice: 2390,
    msrp: 3100,
    finish: "stainless",
    tempRange: "-16°C to -22°C",
    installation: "under-bench",
    use: "outdoor-rated",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 340,
    refrigerant: "R290",
    ambientRating: "43°C Tropical Rated",
    energyRating: "4.5 Stars",
    weightKg: 82,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Ships today if ordered before 2pm",
    stockQty: 6,
    warrantyYears: 3,
    warrantyText: "3 Years Husky Warranty Australia-wide",
    features: ["Tropical 43°C Rated", "304 Stainless Steel Casework", "Dual Key Locks", "Adjustable Chrome Shelves", "Electronic Touchpad Controller", "Zero Clearance Front Venting"],
    shortDescription: "Premium double-door outdoor bar freezer. 900mm width fits standard outdoor kitchen joinery with 220L sub-zero capacity.",
    fullDescription: "The Husky Alfresco F2 series is engineered for serious backyard hospitality. Accommodates up to 8x 5kg party ice bags plus spirits and glassware. Front-breathing ventilation allows tight flush mounting into concrete, timber, or granite outdoor cabinetry.",
    specs: {
      "External Dimensions": "900mm W x 550mm D x 840mm H",
      "Capacity": "220 Litres",
      "Refrigerant": "R290",
      "Shelves": "4x Heavy Duty Chrome Wire Shelves"
    },
    dimensionGuide: {
      requiredCutout: "910mm W x 570mm D x 850mm H",
      ventilationClearance: "Front breathing, zero side clearance",
      doorSwingRadius: "430mm per door"
    },
    frequentlyBoughtTogether: ["acc-006", "acc-003"],
    alternatives: ["bf-001", "bf-006"]
  },
  {
    id: "bf-008",
    sku: "FED-DRW2-SS",
    brand: "F.E.D.",
    model: "TF130-2D",
    name: "F.E.D. 2-Drawer Commercial Underbar Stainless Freezer 180L",
    slug: "fed-2-drawer-commercial-underbar-stainless-freezer-180l",
    categorySlug: "under-bar-freezers",
    primaryCategory: "Bar Freezers",
    subCategory: "Under Bar / Undercounter Freezers",
    type: "Drawer Freezer",
    doorCount: 2,
    doorType: "solid",
    doorStyle: "drawer",
    widthMm: 1230,
    depthMm: 700,
    heightMm: 850,
    widthRange: "1200-1500",
    capacityLitres: 180,
    capacityRange: "100-200",
    price: 3490,
    tradePrice: 3120,
    msrp: 3990,
    finish: "stainless",
    tempRange: "-18°C to -22°C",
    installation: "under-bench",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 380,
    refrigerant: "R290",
    ambientRating: "40°C",
    energyRating: "4 Stars",
    weightKg: 108,
    condition: "new",
    availability: "in stock",
    shippingBadge: "In stock - Dispatches within 24 hours",
    stockQty: 4,
    warrantyYears: 2,
    warrantyText: "2 Years F.E.D. Australia-wide On-Site Warranty",
    features: ["Heavy Duty Telescopic Drawer Slides", "Fits 1/1 Gastronorm Food Pans", "Auto Electric Defrost", "Food Grade 304 Stainless Bench Top", "Dixell Controller"],
    shortDescription: "High-speed drawer access freezer for cocktail stations and kitchen service. Telescopic runners slide effortlessly with zero door swing restriction.",
    fullDescription: "Bartenders and prep chefs love refrigerated drawers because you pull the drawer out and reach down immediately into garnishes, ice cubes, or portion packs without crouching to look inside a cabinet. Fitted with heavy German telescopic slides supporting 50kg load per drawer.",
    specs: {
      "External Dimensions": "1230mm W x 700mm D x 850mm H",
      "Capacity": "180 Litres (Takes 1/1 GN Pans)",
      "Slide Rating": "50kg Dynamic Load Per Drawer",
      "Power Connection": "240V / 10A standard plug"
    },
    dimensionGuide: {
      requiredCutout: "1250mm W x 720mm D x 865mm H",
      ventilationClearance: "Zero side clearance required",
      doorSwingRadius: "Drawers extend 650mm forward"
    },
    frequentlyBoughtTogether: ["acc-001", "acc-005"],
    alternatives: ["bf-001", "bf-003"]
  },
  {
    id: "bf-009",
    sku: "POL-CTD1-GL",
    brand: "Polar",
    model: "CD610-A",
    name: "Polar Countertop Glass Door Display Freezer 50L",
    slug: "polar-countertop-glass-door-display-freezer-50l",
    categorySlug: "glass-door-display-freezers",
    primaryCategory: "Bar Freezers",
    subCategory: "Glass Door Display Freezers",
    type: "Counter-top Display",
    doorCount: 1,
    doorType: "glass",
    doorStyle: "hinged",
    widthMm: 570,
    depthMm: 530,
    heightMm: 520,
    widthRange: "<600",
    capacityLitres: 50,
    capacityRange: "<100",
    price: 890,
    tradePrice: 780,
    msrp: 1090,
    finish: "black",
    tempRange: "-12°C to -18°C",
    installation: "counter-top",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 160,
    refrigerant: "R600a",
    ambientRating: "32°C",
    energyRating: "3.5 Stars",
    weightKg: 28,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Ships today if ordered before 2pm",
    stockQty: 18,
    warrantyYears: 2,
    warrantyText: "2 Years Polar Commercial Replacement Warranty",
    features: ["Triple Glazed Heated Glass", "Top Canopy Graphic Lightbox", "Adjustable Wire Shelf", "Key Lock Standard", "Acoustic Noise <40 dB"],
    shortDescription: "Eye-level countertop merchandiser for bar counters, coffee shops, and boutique bottle stores. Plugs into any standard Australian outlet.",
    fullDescription: "Maximize impulse sales at the checkout counter. Heated triple-pane glass prevents moisture accumulation. Ideal for ice cream tubs, chilled shot bottles, pre-packaged garnishes, and craft cocktail pouches.",
    specs: {
      "External Dimensions": "570mm W x 530mm D x 520mm H",
      "Capacity": "50 Litres",
      "Lighting": "Internal horizontal cool white LED",
      "Weight": "28 kg"
    },
    dimensionGuide: {
      requiredCutout: "590mm W x 550mm D x 540mm H",
      ventilationClearance: "50mm rear air space required",
      doorSwingRadius: "550mm"
    },
    frequentlyBoughtTogether: ["acc-002"],
    alternatives: ["bf-002", "bf-004"]
  },
  {
    id: "bf-010",
    sku: "SKP-UP1D-GL",
    brand: "Skope",
    model: "ActiveCore TME650N-F",
    name: "Skope ActiveCore 1-Door Commercial Upright Glass Freezer 610L",
    slug: "skope-activecore-1-door-commercial-upright-glass-freezer-610l",
    categorySlug: "glass-door-display-freezers",
    primaryCategory: "Bar Freezers",
    subCategory: "Glass Door Display Freezers",
    type: "Upright Single Glass",
    doorCount: 1,
    doorType: "glass",
    doorStyle: "hinged",
    widthMm: 740,
    depthMm: 795,
    heightMm: 2200,
    widthRange: "600-900",
    capacityLitres: 610,
    capacityRange: "600+",
    price: 5890,
    tradePrice: 5290,
    msrp: 6690,
    finish: "white",
    tempRange: "-18°C to -22°C",
    installation: "freestanding",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 680,
    refrigerant: "R290 Hydrocarbon",
    ambientRating: "40°C Class 5",
    energyRating: "5 Stars Top Energy Rating",
    weightKg: 195,
    condition: "new",
    availability: "in stock",
    shippingBadge: "In stock - Heavy Freight Delivery",
    stockQty: 3,
    warrantyYears: 5,
    warrantyText: "5 Years Skope ActiveCore On-Site Warranty Australia-Wide",
    features: ["ActiveCore Interchangeable Cartridge", "Smart Connected Skope Connect App", "Triple Glazed Argon Heated Door", "5 Adjustable Shelves", "Full Height LED Merchandising"],
    shortDescription: "Australia's #1 upright commercial glass display freezer. ActiveCore power cartridge slashes energy consumption by over 55% compared to legacy models.",
    fullDescription: "The industry standard in high-volume beverage and bottle shop display. Features Skope's patented removable refrigeration cartridge that slides out in minutes for zero-downtime maintenance. Bluetooth enabled Skope Connect app allows bar managers to monitor temperatures, adjust lighting, and view energy costs directly from their phone.",
    specs: {
      "External Dimensions": "740mm W x 795mm D x 2200mm H",
      "Gross Capacity": "610 Litres",
      "Door": "Triple-glazed heated glass door with torsion bar self-close",
      "Shelving": "5x Heavy duty cantilever adjustable wire shelves",
      "Operating Temp": "-18°C to -22°C (Up to 40°C ambient)"
    },
    dimensionGuide: {
      requiredCutout: "780mm W x 830mm D x 2250mm H",
      ventilationClearance: "50mm rear clearance required",
      doorSwingRadius: "720mm"
    },
    frequentlyBoughtTogether: ["acc-001", "acc-003"],
    alternatives: ["bf-011", "bf-005"]
  },
  {
    id: "bf-011",
    sku: "THE-UP2D-SS",
    brand: "Thermaster",
    model: "GN1410BT",
    name: "Thermaster 2-Door Upright Stainless Commercial Kitchen & Cellar Freezer 1300L",
    slug: "thermaster-2-door-upright-stainless-commercial-kitchen-cellar-freezer-1300l",
    categorySlug: "upright-commercial-freezers",
    primaryCategory: "Bar Freezers",
    subCategory: "Upright Commercial Freezers",
    type: "Upright 2 Door",
    doorCount: 2,
    doorType: "solid",
    doorStyle: "hinged",
    widthMm: 1480,
    depthMm: 830,
    heightMm: 2010,
    widthRange: "1200-1500",
    capacityLitres: 1300,
    capacityRange: "600+",
    price: 4390,
    tradePrice: 3890,
    msrp: 4990,
    finish: "stainless",
    tempRange: "-18°C to -22°C",
    installation: "freestanding",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp Australian 3-pin plug",
    powerWatts: 750,
    refrigerant: "R290",
    ambientRating: "43°C Tropical Rated",
    energyRating: "4 Stars MEPS",
    weightKg: 208,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Heavy Freight - Delivery in 2-3 Days",
    stockQty: 4,
    warrantyYears: 2,
    warrantyText: "2 Years Thermaster Parts & Labour Commercial Warranty",
    features: ["Massive 1300L Storage", "Gastronorm GN 2/1 Compatible", "Castors Fitted Standard", "Embraco High-Capacity Compressor", "Carel Digital Controller", "Key Lockable Doors"],
    shortDescription: "High-volume back-of-house commercial kitchen and pub cellar deep freezer. 1300 litres of sub-zero holding with dual self-closing solid doors.",
    fullDescription: "When pub bars need to hold pallets of party ice, frozen meat, bulk garnishes, and dessert bases, this 1300L stainless upright is the premier solution. Built with an Embraco European compressor, 70mm cyclopentane high-density insulation, and removable magnetic gaskets.",
    specs: {
      "External Dimensions": "1480mm W x 830mm D x 2010mm H",
      "Capacity": "1300 Litres",
      "Shelving": "6x GN 2/1 Heavy plastic-coated wire shelves",
      "Power Connection": "240V / 10A standard plug",
      "Net Weight": "208 kg"
    },
    dimensionGuide: {
      requiredCutout: "1520mm W x 860mm D x 2050mm H",
      ventilationClearance: "100mm rear/top clearance required",
      doorSwingRadius: "720mm per door"
    },
    frequentlyBoughtTogether: ["acc-001", "acc-003"],
    alternatives: ["bf-010", "bf-003"]
  },
  {
    id: "bf-012",
    sku: "VES-CH300-GL",
    brand: "Vestfrost",
    model: "ICF-300",
    name: "Vestfrost Sliding Glass Lid Commercial Bar Chest Freezer 290L",
    slug: "vestfrost-sliding-glass-lid-commercial-bar-chest-freezer-290l",
    categorySlug: "chest-bench-freezers",
    primaryCategory: "Bar Freezers",
    subCategory: "Chest & Bench Freezers",
    type: "Sliding Glass Lid Chest",
    doorCount: 2,
    doorType: "lid",
    doorStyle: "sliding",
    widthMm: 1045,
    depthMm: 650,
    heightMm: 900,
    widthRange: "900-1200",
    capacityLitres: 290,
    capacityRange: "200-300",
    price: 1690,
    tradePrice: 1490,
    msrp: 1990,
    finish: "white",
    tempRange: "-16°C to -24°C",
    installation: "freestanding",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 185,
    refrigerant: "R600a",
    ambientRating: "38°C",
    energyRating: "4.5 Stars",
    weightKg: 58,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Ships today if ordered before 2pm",
    stockQty: 12,
    warrantyYears: 3,
    warrantyText: "3 Years Vestfrost Commercial Warranty",
    features: ["Curved Heat-Reflective Glass Lids", "Bumper Guards on Sides", "Heavy Wire Baskets Included", "Castors with Brakes", "Lock Standard"],
    shortDescription: "Danish-engineered commercial chest freezer with sliding glass lids. Exceptional thermal efficiency with low daily power draw.",
    fullDescription: "Ideal for bottle shops, mobile catering vans, and pub cellars needing accessible ice storage. Curved sliding glass lids reflect ambient infrared heat, while interior aluminium liner ensures swift cold transfer.",
    specs: {
      "External Dimensions": "1045mm W x 650mm D x 900mm H",
      "Capacity": "290 Litres",
      "Baskets": "3x Heavy Duty Wire Baskets Included",
      "Energy Consumption": "Only 1.4 kWh / 24h"
    },
    dimensionGuide: {
      requiredCutout: "1070mm W x 680mm D x 920mm H",
      ventilationClearance: "50mm all around",
      doorSwingRadius: "0mm (Top sliding access)"
    },
    frequentlyBoughtTogether: ["acc-001"],
    alternatives: ["bf-002", "bf-009"]
  },
  {
    id: "bf-013",
    sku: "SKP-CL1D-EX",
    brand: "Skope",
    model: "ReFlex UB-100-EX",
    name: "Skope ReFlex 1-Door Stainless Underbar Freezer 105L (Ex-Display)",
    slug: "skope-reflex-1-door-stainless-underbar-freezer-105l-ex-display",
    categorySlug: "clearance-ex-display",
    primaryCategory: "Bar Freezers",
    subCategory: "Ex-Display, Clearance & Second Hand",
    type: "Single Door",
    doorCount: 1,
    doorType: "solid",
    doorStyle: "hinged",
    widthMm: 595,
    depthMm: 680,
    heightMm: 840,
    widthRange: "<600",
    capacityLitres: 105,
    capacityRange: "100-200",
    price: 1990,
    tradePrice: 1890,
    msrp: 2950,
    finish: "stainless",
    tempRange: "-18°C to -22°C",
    installation: "under-bench",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 320,
    refrigerant: "R290",
    ambientRating: "40°C",
    energyRating: "4.5 Stars",
    weightKg: 64,
    condition: "ex-display",
    availability: "in stock",
    shippingBadge: "1 Unit Only in Sydney Showroom",
    stockQty: 1,
    warrantyYears: 1,
    warrantyText: "12 Months Full Parts & Labour Dealer Warranty",
    features: ["Showroom Ex-Display Condition", "Fully Tested & Tagged by Master Technician", "Zero Operational Faults", "Minor Superficial Hairline Scratch on Side Panel"],
    shortDescription: "Bargain ex-display Skope ReFlex compact underbench freezer. Full 12-month warranty included, inspected and certified.",
    fullDescription: "From our Sydney showroom floor. Has had minimal running hours for display demonstration only. Minor cosmetic blemish on the right-hand side panel, 100% mechanically pristine with full Australian warranty coverage.",
    specs: {
      "Dimensions": "595mm W x 680mm D x 840mm H",
      "Condition Note": "Ex-Display Grade A (9.5/10 Cosmetic, 10/10 Mechanical)",
      "Warranty": "12 Months On-Site Warranty"
    },
    dimensionGuide: {
      requiredCutout: "615mm W x 700mm D x 855mm H",
      ventilationClearance: "Zero rear clearance",
      doorSwingRadius: "550mm"
    },
    frequentlyBoughtTogether: ["acc-002"],
    alternatives: ["bf-002", "bf-001"]
  },
  {
    id: "bf-014",
    sku: "BRO-BB2D-GL",
    brand: "Bromic",
    model: "BB0200GD-NR",
    name: "Bromic Back Bar Glass Door Beverage & Bottle Chiller 2-Door 200L",
    slug: "bromic-back-bar-glass-door-beverage-bottle-chiller-2-door-200l",
    categorySlug: "under-bar-fridges",
    primaryCategory: "Bar Fridges & Coolers",
    subCategory: "Under Bar Fridges",
    type: "Glass Door Under Bar",
    doorCount: 2,
    doorType: "glass",
    doorStyle: "hinged",
    widthMm: 900,
    depthMm: 520,
    heightMm: 840,
    widthRange: "900-1200",
    capacityLitres: 200,
    capacityRange: "200-300",
    price: 1890,
    tradePrice: 1650,
    msrp: 2290,
    finish: "black",
    tempRange: "+1°C to +10°C",
    installation: "back bar",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 240,
    refrigerant: "R600a",
    ambientRating: "38°C",
    energyRating: "4 Stars MEPS",
    weightKg: 72,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Ships today if ordered before 2pm",
    stockQty: 15,
    warrantyYears: 2,
    warrantyText: "2 Years Bromic Commercial Warranty Australia-wide",
    features: ["Double Glazed Low-E Glass", "Holds 180x 330ml Beer Bottles", "Matte Black Body with Lock", "Digital Temp Controller", "Rapid Fan-Forced Cooling"],
    shortDescription: "The most popular 2-door backbar bottle cooler in Australia. Fits seamlessly into standard 900mm bar bays with bright internal LED lighting.",
    fullDescription: "Australian venue staple. With an ultra-shallow 520mm depth, the Bromic BB0200GD preserves precious bartender walkway space behind narrow public bars. Heavy-duty wire shelves feature tight bottle spacing to prevent bottles tipping over during busy shifts.",
    specs: {
      "External Dimensions": "900mm W x 520mm D x 840mm H",
      "Capacity": "200 Litres (180x 330ml Beer Bottles)",
      "Doors": "2x Self-closing hinged glass doors with dual barrel locks",
      "Lighting": "Internal warm/cool selectable LED"
    },
    dimensionGuide: {
      requiredCutout: "920mm W x 540mm D x 855mm H",
      ventilationClearance: "30mm rear clearance recommended",
      doorSwingRadius: "430mm per door"
    },
    frequentlyBoughtTogether: ["acc-001", "acc-003"],
    alternatives: ["bf-015", "bf-005"]
  },
  {
    id: "bf-015",
    sku: "SKP-BB3D-SL",
    brand: "Skope",
    model: "BackBar-300-SL",
    name: "Skope Commercial 3-Door Sliding Glass Back Bar Fridge 320L",
    slug: "skope-commercial-3-door-sliding-glass-back-bar-fridge-320l",
    categorySlug: "back-bar-fridges",
    primaryCategory: "Bar Fridges & Coolers",
    subCategory: "Back Bar Fridges",
    type: "Sliding Glass Back Bar",
    doorCount: 3,
    doorType: "glass",
    doorStyle: "sliding",
    widthMm: 1350,
    depthMm: 550,
    heightMm: 860,
    widthRange: "1200-1500",
    capacityLitres: 320,
    capacityRange: "300-400",
    price: 3890,
    tradePrice: 3450,
    msrp: 4490,
    finish: "black",
    tempRange: "+1°C to +4°C",
    installation: "back bar",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 380,
    refrigerant: "R290",
    ambientRating: "40°C Class 5",
    energyRating: "5 Stars",
    weightKg: 125,
    condition: "new",
    availability: "in stock",
    shippingBadge: "In stock - Dispatches within 24 hours",
    stockQty: 8,
    warrantyYears: 5,
    warrantyText: "5 Years Skope Parts & Labour On-Site Warranty",
    features: ["Smooth Sliding Roller Doors", "Zero Door Swing Interference", "Double-Glazed Heated Glass", "Sub-Zero Chilling Capability (+1°C)", "Skope Connect App Enabled"],
    shortDescription: "High-volume 3-door sliding glass bottle fridge. Sliding doors eliminate walkway obstruction behind busy crowded cocktail and nightclub bars.",
    fullDescription: "When three bartenders are moving behind a tight speed bar, hinged doors become a constant hazard. This Skope sliding back bar unit glides open effortlessly on heavy industrial nylon ball-bearing rollers with zero outward footprint.",
    specs: {
      "External Dimensions": "1350mm W x 550mm D x 860mm H",
      "Capacity": "320 Litres (Holds 310x 330ml Bottles)",
      "Refrigeration": "Fan forced high-velocity cross-flow cooling",
      "Doors": "3x Sliding double glazed Low-E safety glass doors"
    },
    dimensionGuide: {
      requiredCutout: "1370mm W x 570mm D x 875mm H",
      ventilationClearance: "Zero side clearance required",
      doorSwingRadius: "0mm (Sliding door operation)"
    },
    frequentlyBoughtTogether: ["acc-001", "acc-005"],
    alternatives: ["bf-014", "bf-016"]
  },
  {
    id: "bf-016",
    sku: "VIN-WINE-DZ",
    brand: "Vintec",
    model: "V200SG-e-2Z",
    name: "Vintec Dual-Zone Commercial Wine Cabinet 150-Bottle",
    slug: "vintec-dual-zone-commercial-wine-cabinet-150-bottle",
    categorySlug: "wine-fridges",
    primaryCategory: "Bar Fridges & Coolers",
    subCategory: "Wine Fridges (Single & Dual Zone)",
    type: "Dual Zone Wine Cabinets",
    doorCount: 1,
    doorType: "glass",
    doorStyle: "hinged",
    widthMm: 595,
    depthMm: 680,
    heightMm: 1850,
    widthRange: "<600",
    capacityLitres: 380,
    capacityRange: "300-400",
    price: 3990,
    tradePrice: 3590,
    msrp: 4690,
    finish: "black",
    tempRange: "Upper: 6°C-12°C | Lower: 12°C-18°C",
    installation: "freestanding",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 180,
    refrigerant: "R600a",
    ambientRating: "38°C",
    energyRating: "4.5 Stars",
    weightKg: 105,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Ships today if ordered before 2pm",
    stockQty: 6,
    warrantyYears: 2,
    warrantyText: "2 Years Vintec Official In-Home & Commercial Warranty",
    features: ["Sommelier Endorsed", "Dual Independent Climate Zones", "Vibration Absorption Wood Slats", "Active Carbon Air Filter", "UV-Treated Triple Glass"],
    shortDescription: "Professional dual-zone sommelier wine cabinet. Holds white wines crisp at 7°C up top and red wines at cellar-perfect 14°C below.",
    fullDescription: "Australian sommelier benchmark. Vintec's '5 Pillars of Wine Storage' protects your valuable wine collection against temperature fluctuations, vibration, UV degradation, foul odours, and dry corks. Holds up to 150 standard 750ml Bordeaux bottles on natural beechwood shelves.",
    specs: {
      "External Dimensions": "595mm W x 680mm D x 1850mm H",
      "Bottle Capacity": "Up to 150x 750ml Bottles",
      "Shelving": "11x Pull-out natural beechwood shelves",
      "Filtration": "Replaceable active carbon filter"
    },
    dimensionGuide: {
      requiredCutout: "615mm W x 700mm D x 1870mm H",
      ventilationClearance: "50mm rear clearance required",
      doorSwingRadius: "600mm"
    },
    frequentlyBoughtTogether: ["acc-001"],
    alternatives: ["bf-014", "bf-010"]
  },
  {
    id: "bf-017",
    sku: "HOS-ICE-UB",
    brand: "Hoshizaki",
    model: "IM-45NE-HC",
    name: "Hoshizaki Commercial Underbar Gourmet Cube Ice Maker 44kg/day",
    slug: "hoshizaki-commercial-underbar-gourmet-cube-ice-maker-44kg",
    categorySlug: "ice-machines-storage",
    primaryCategory: "Accessories & Parts",
    subCategory: "Ice Machines & Ice Storage",
    type: "Underbar Ice Makers",
    doorCount: 1,
    doorType: "solid",
    doorStyle: "drawer",
    widthMm: 505,
    depthMm: 550,
    heightMm: 840,
    widthRange: "<600",
    capacityLitres: 18,
    capacityRange: "<100",
    price: 3790,
    tradePrice: 3380,
    msrp: 4350,
    finish: "stainless",
    tempRange: "-15°C Ice Freeze",
    installation: "under-bench",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 280,
    refrigerant: "R290 Hydrocarbon",
    ambientRating: "40°C",
    energyRating: "5 Stars Top Efficiency",
    weightKg: 51,
    condition: "new",
    availability: "in stock",
    shippingBadge: "In stock - Dispatches within 24 hours",
    stockQty: 5,
    warrantyYears: 3,
    warrantyText: "3 Years Hoshizaki Parts & Labour Warranty",
    features: ["Crystal Clear Hard Gourmet Cubes (28x28x32mm)", "Closed Water Circuit System", "Integral 18kg Insulated Ice Bin", "Magnetic Removable Air Filter", "Whisper Quiet Japanese Compressor"],
    shortDescription: "The world's premier cocktail bar ice maker. Produces ultra-dense, slow-melting gourmet ice cubes with zero mineral cloudiness.",
    fullDescription: "Hoshizaki's IM range uses an automated closed-circuit water spray cycle that freezes each individual ice cube under pressurized clean water. Minerals and micro-bubbles are continuously flushed away, creating diamond-clear solid cubes that melt 40% slower in cocktails.",
    specs: {
      "External Dimensions": "505mm W x 550mm D x 840mm H",
      "Production Capacity": "44 kg per 24 hours (At 21°C Ambient)",
      "Bin Storage": "18 kg Built-in Insulated Bin",
      "Ice Cube Dimensions": "28 x 28 x 32 mm",
      "Water Supply": "3/4 inch standard mains water connection"
    },
    dimensionGuide: {
      requiredCutout: "525mm W x 570mm D x 855mm H",
      ventilationClearance: "Zero side clearance required",
      doorSwingRadius: "Front pull-down door"
    },
    frequentlyBoughtTogether: ["acc-005", "bf-004"],
    alternatives: ["bf-004", "bf-002"]
  },
  {
    id: "bf-018",
    sku: "KEG-2TAP-SS",
    brand: "Husky",
    model: "HK-2TAP-PRO",
    name: "Husky Commercial 2-Tap Dual Keg Draft Beer Kegerator 215L",
    slug: "husky-commercial-2-tap-dual-keg-draft-beer-kegerator-215l",
    categorySlug: "kegerators-dispensers",
    primaryCategory: "Bar Fridges & Coolers",
    subCategory: "Kegerators & Beer Dispensers",
    type: "Multi-Tap Commercial Dispensers",
    doorCount: 1,
    doorType: "solid",
    doorStyle: "hinged",
    widthMm: 610,
    depthMm: 780,
    heightMm: 980,
    widthRange: "600-900",
    capacityLitres: 215,
    capacityRange: "200-300",
    price: 2190,
    tradePrice: 1950,
    msrp: 2650,
    finish: "stainless",
    tempRange: "-1°C to +4°C",
    installation: "freestanding",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 220,
    refrigerant: "R600a",
    ambientRating: "38°C",
    energyRating: "4 Stars",
    weightKg: 62,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Ships today if ordered before 2pm",
    stockQty: 8,
    warrantyYears: 3,
    warrantyText: "3 Years Husky Warranty Australia-wide",
    features: ["Dual Font with Flow-Control Faucets", "Holds 2x 20L or 50L Kegs", "CO2 Tank Holder Bracket", "Heavy Drip Tray Included", "Reinforced Stainless Steel Floor"],
    shortDescription: "Complete commercial 2-tap draft beer system. Pours frosty craft beer and stout at home, in beer gardens, or behind mobile bar trailers.",
    fullDescription: "Everything you need to pour brewery-fresh craft beer. Supplied with heavy stainless steel draft font, dual forward-sealing flow-control beer taps, beer and gas lines, regulator bracket, and heavy castor wheels.",
    specs: {
      "External Dimensions": "610mm W x 780mm D x 980mm H (Plus 380mm Font Height)",
      "Capacity": "Holds 1x 50L Commercial DIN/Euro Keg or 2x 20L A-Type / Corny Kegs",
      "Taps": "2x 304 Stainless Steel Forward-Sealing Faucets"
    },
    dimensionGuide: {
      requiredCutout: "630mm W x 800mm D x 1400mm Total Height with Font",
      ventilationClearance: "50mm rear clearance",
      doorSwingRadius: "610mm"
    },
    frequentlyBoughtTogether: ["acc-001", "acc-005"],
    alternatives: ["bf-014", "bf-006"]
  },
  {
    id: "bf-019",
    sku: "SCH-COMBI-SS",
    brand: "Schmick",
    model: "SK-DUO-280",
    name: "Schmick Dual-Zone Combination Underbar Fridge & Freezer 280L",
    slug: "schmick-dual-zone-combination-underbar-fridge-freezer-280l",
    categorySlug: "combination-fridge-freezers",
    primaryCategory: "Bar Fridges & Coolers",
    subCategory: "Combination Fridge-Freezers",
    type: "Split Dual Temperature",
    doorCount: 2,
    doorType: "solid",
    doorStyle: "hinged",
    widthMm: 1200,
    depthMm: 600,
    heightMm: 850,
    widthRange: "1200-1500",
    capacityLitres: 280,
    capacityRange: "200-300",
    price: 3290,
    tradePrice: 2890,
    msrp: 3790,
    finish: "stainless",
    tempRange: "Fridge: +1°C to +5°C | Freezer: -18°C to -22°C",
    installation: "under-bench",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 420,
    refrigerant: "R290 Dual Circuit",
    ambientRating: "40°C",
    energyRating: "4.5 Stars",
    weightKg: 98,
    condition: "new",
    availability: "in stock",
    shippingBadge: "In stock - Dispatches within 24 hours",
    stockQty: 7,
    warrantyYears: 2,
    warrantyText: "2 Years Schmick Warranty Australia-Wide",
    features: ["Independent Dual Compressors", "Left Door Freezer (-20°C) & Right Door Chiller (+2°C)", "304 Stainless Steel Benchtop", "Zero Cross-Thermal Bleed", "Carel Digital Displays"],
    shortDescription: "The all-in-one solution. Left side deep freezes spirits and glasses at -20°C; right side chills 150 beer bottles down to +2°C.",
    fullDescription: "Eliminates the cost and space required for two separate units. Built with two independent hermetic compressors and separate digital thermostats. If one chamber requires defrosting, the other remains uninterrupted.",
    specs: {
      "External Dimensions": "1200mm W x 600mm D x 850mm H",
      "Capacity": "Freezer 120L + Chiller 160L (280L Total)",
      "Controls": "Twin independent Carel digital microprocessors"
    },
    dimensionGuide: {
      requiredCutout: "1220mm W x 620mm D x 865mm H",
      ventilationClearance: "Zero side clearance required",
      doorSwingRadius: "550mm per door"
    },
    frequentlyBoughtTogether: ["acc-001", "acc-003"],
    alternatives: ["bf-001", "bf-014"]
  },
  {
    id: "bf-020",
    sku: "ATO-UP1D-SS",
    brand: "Atosa",
    model: "MBF8501GR",
    name: "Atosa Commercial Upright Single Stainless Deep Freezer 670L",
    slug: "atosa-commercial-upright-single-stainless-deep-freezer-670l",
    categorySlug: "upright-commercial-freezers",
    primaryCategory: "Bar Freezers",
    subCategory: "Upright Commercial Freezers",
    type: "Upright 1 Door",
    doorCount: 1,
    doorType: "solid",
    doorStyle: "hinged",
    widthMm: 730,
    depthMm: 805,
    heightMm: 2060,
    widthRange: "600-900",
    capacityLitres: 670,
    capacityRange: "600+",
    price: 2790,
    tradePrice: 2450,
    msrp: 3290,
    finish: "stainless",
    tempRange: "-18°C to -22°C",
    installation: "freestanding",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 550,
    refrigerant: "R290",
    ambientRating: "40°C",
    energyRating: "4 Stars MEPS",
    weightKg: 125,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Ships today if ordered before 2pm",
    stockQty: 8,
    warrantyYears: 4,
    warrantyText: "4 Years Atosa Commercial Warranty (2 yrs full + 2 yrs parts)",
    features: ["Heavy Duty Pre-installed Castors", "Full 304 Stainless Interior & Exterior", "Accepts Standard 2/1 GN Pans", "Recessed Integrated Handle", "Door Open Alarm"],
    shortDescription: "Heavy-duty 670L single upright kitchen and bar stock freezer. Commercial 10A plug and play with European Embraco compressor.",
    fullDescription: "Exceptional commercial value. Atosa's single door upright deep freezer provides 670 litres of sub-zero storage in a space-saving 730mm footprint. Equipped with self-closing door, lock, and heavy industrial castors for effortless cleaning beneath the unit.",
    specs: {
      "External Dimensions": "730mm W x 805mm D x 2060mm H",
      "Capacity": "670 Litres (GN 2/1)",
      "Shelving": "3x Heavy Duty Wire Shelves Included"
    },
    dimensionGuide: {
      requiredCutout: "770mm W x 840mm D x 2100mm H",
      ventilationClearance: "80mm rear clearance",
      doorSwingRadius: "710mm"
    },
    frequentlyBoughtTogether: ["acc-001", "acc-003"],
    alternatives: ["bf-010", "bf-011"]
  },
  {
    id: "bf-021",
    sku: "LIE-BAR-UND",
    brand: "Liebherr",
    model: "SUF-120-SS",
    name: "Liebherr Ultra-Quiet Luxury Undercounter Bar Freezer 118L",
    slug: "liebherr-ultra-quiet-luxury-undercounter-bar-freezer-118l",
    categorySlug: "home-bar-outdoor-freezers",
    primaryCategory: "Bar Freezers",
    subCategory: "Home Bar & Outdoor Freezers",
    type: "Single Door",
    doorCount: 1,
    doorType: "solid",
    doorStyle: "hinged",
    widthMm: 597,
    depthMm: 550,
    heightMm: 820,
    widthRange: "<600",
    capacityLitres: 118,
    capacityRange: "100-200",
    price: 3490,
    tradePrice: 3190,
    msrp: 4100,
    finish: "stainless",
    tempRange: "-15°C to -28°C",
    installation: "under-bench",
    use: "home-bar",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 140,
    refrigerant: "R600a",
    ambientRating: "38°C",
    energyRating: "5 Stars Ultra Efficient",
    weightKg: 49,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Ships today if ordered before 2pm",
    stockQty: 5,
    warrantyYears: 5,
    warrantyText: "5 Years Liebherr Manufacturer Warranty Australia-wide",
    features: ["Whisper Quiet 35 dB(A)", "German Precision Inverter Compressor", "SmartFrost Easy Clean System", "SoftSystem Door Cushioning", "SuperFrost Fast Chill Mode"],
    shortDescription: "The quietest bar freezer on the Australian market (35 dB). Engineered in Germany for high-end residential bar cabinetry and cinema rooms.",
    fullDescription: "Standard commercial freezers sound like jet engines in open-plan luxury homes. Liebherr's precision Austrian/German engineering brings hospital-grade acoustics to your bar with barely audible 35 dB sound levels. Holds sub-zero temps down to -28°C for instant craft spirit chilling.",
    specs: {
      "External Dimensions": "597mm W x 550mm D x 820mm H",
      "Acoustic Rating": "35 dB(A) Whisper Silent",
      "Capacity": "118 Litres",
      "Energy Efficiency": "Consumes only 152 kWh/year"
    },
    dimensionGuide: {
      requiredCutout: "600mm W x 570mm D x 825mm H",
      ventilationClearance: "Zero side clearance required, front plinth venting",
      doorSwingRadius: "580mm"
    },
    frequentlyBoughtTogether: ["acc-002"],
    alternatives: ["bf-002", "bf-006"]
  },
  {
    id: "bf-022",
    sku: "FED-MC1D-EX",
    brand: "F.E.D.",
    model: "GN2100BT-SEC",
    name: "F.E.D. 2-Door Stainless Underbench Freezer 260L (Factory Second)",
    slug: "fed-2-door-stainless-underbench-freezer-260l-factory-second",
    categorySlug: "clearance-ex-display",
    primaryCategory: "Bar Freezers",
    subCategory: "Ex-Display, Clearance & Second Hand",
    type: "Double Door",
    doorCount: 2,
    doorType: "solid",
    doorStyle: "hinged",
    widthMm: 1360,
    depthMm: 700,
    heightMm: 850,
    widthRange: "1200-1500",
    capacityLitres: 260,
    capacityRange: "200-300",
    price: 2450,
    tradePrice: 2290,
    msrp: 3590,
    finish: "stainless",
    tempRange: "-18°C to -22°C",
    installation: "under-bench",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 420,
    refrigerant: "R290",
    ambientRating: "38°C",
    energyRating: "4 Stars",
    weightKg: 104,
    condition: "factory-second",
    availability: "in stock",
    shippingBadge: "Factory Second - Melbourne Warehouse Only",
    stockQty: 2,
    warrantyYears: 1,
    warrantyText: "12 Months Commercial Warranty Included",
    features: ["Factory Second Transit Carton Damage", "Cabinet Inspected & Fully Pressure-Tested", "Minor Dents on Left Rear Edge (Non-Visible When Built In)", "Brand New Unused Internal Components"],
    shortDescription: "Huge discount on a brand new commercial 2-door freezer. Suffered carton damage during overseas container shipping; mechanically 100% brand new.",
    fullDescription: "Save over $1,100 off RRP. The unit sustained a minor transit dent on the rear casing when unpacked from its shipping crate. Has been pressure-tested and temperature-certified by our licensed technicians. Includes full 12-month parts and labour warranty.",
    specs: {
      "Dimensions": "1360mm W x 700mm D x 850mm H",
      "Condition": "Factory Second (Transit Mark on Rear Panel)",
      "Capacity": "260 Litres"
    },
    dimensionGuide: {
      requiredCutout: "1380mm W x 720mm D x 865mm H",
      ventilationClearance: "Zero side clearance required",
      doorSwingRadius: "520mm per door"
    },
    frequentlyBoughtTogether: ["acc-001"],
    alternatives: ["bf-001", "bf-013"]
  },
  {
    id: "bf-023",
    sku: "POL-BC4D-SS",
    brand: "Polar",
    model: "GL015-A",
    name: "Polar 4-Door Commercial Back Bar Bottle Cooler 380L",
    slug: "polar-4-door-commercial-back-bar-bottle-cooler-380l",
    categorySlug: "bottle-coolers",
    primaryCategory: "Bar Fridges & Coolers",
    subCategory: "Bottle Coolers (1-4 door)",
    type: "4 Door Bottle Cooler",
    doorCount: 4,
    doorType: "glass",
    doorStyle: "hinged",
    widthMm: 1790,
    depthMm: 520,
    heightMm: 900,
    widthRange: "1500-1800",
    capacityLitres: 380,
    capacityRange: "300-400",
    price: 2790,
    tradePrice: 2450,
    msrp: 3390,
    finish: "black",
    tempRange: "+2°C to +8°C",
    installation: "back bar",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 350,
    refrigerant: "R600a",
    ambientRating: "38°C",
    energyRating: "4 Stars",
    weightKg: 118,
    condition: "new",
    availability: "in stock",
    shippingBadge: "In stock - Dispatches within 24 hours",
    stockQty: 6,
    warrantyYears: 2,
    warrantyText: "2 Years Polar On-Site Commercial Warranty",
    features: ["Massive 380-Bottle Capacity", "4 Independent Locking Glass Doors", "Double-Glazed Heated Panes", "Sturdy Adjustable Wire Shelves", "Low Noise Level"],
    shortDescription: "Ultra-wide 4-door back bar refrigerator for high-traffic public bars, sporting stadiums, and hotel beverage stations.",
    fullDescription: "Keep up to 380 stubbies and craft tins at ideal drinking temperatures. Each door features its own lock and key set, allowing individual station management for multi-tender bar setups.",
    specs: {
      "External Dimensions": "1790mm W x 520mm D x 900mm H",
      "Capacity": "380 Litres",
      "Doors": "4x Hinged glass doors with separate key sets",
      "Weight": "118 kg"
    },
    dimensionGuide: {
      requiredCutout: "1810mm W x 540mm D x 915mm H",
      ventilationClearance: "40mm rear space",
      doorSwingRadius: "430mm per door"
    },
    frequentlyBoughtTogether: ["acc-001", "acc-005"],
    alternatives: ["bf-014", "bf-015"]
  },
  {
    id: "bf-024",
    sku: "SCH-MAN-1D",
    brand: "Schmick",
    model: "SK-MAN-70B",
    name: "Schmick Man Cave & Home Bar Glass Chiller 70L With Blue LED",
    slug: "schmick-man-cave-home-bar-glass-chiller-70l-blue-led",
    categorySlug: "home-bar-outdoor-freezers",
    primaryCategory: "Bar Freezers",
    subCategory: "Home Bar & Outdoor Freezers",
    type: "Man Cave & Home Bar",
    doorCount: 1,
    doorType: "glass",
    doorStyle: "hinged",
    widthMm: 430,
    depthMm: 480,
    heightMm: 690,
    widthRange: "<600",
    capacityLitres: 70,
    capacityRange: "<100",
    price: 790,
    tradePrice: 690,
    msrp: 990,
    finish: "black",
    tempRange: "0°C to +10°C",
    installation: "freestanding",
    use: "home-bar",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 85,
    refrigerant: "R600a",
    ambientRating: "32°C",
    energyRating: "4.5 Stars",
    weightKg: 24,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Ships today if ordered before 2pm",
    stockQty: 22,
    warrantyYears: 2,
    warrantyText: "2 Years Schmick Full Warranty",
    features: ["Sub-Zero Frost Capability (Pulls down to 0°C)", "Vibrant Ice-Blue LED Interior Lighting", "Matte Black Seamless Door Frame", "Lockable with 2 Keys Included", "Holds 70 Cans"],
    shortDescription: "The quintessential man cave and entertainment room beer cooler. Cool blue LED glow and icy 0°C beverage temperatures.",
    fullDescription: "Compact enough to sit on top of a credenza or tuck into an entertainment unit. Triple-glazed Low-E glass keeps power usage below 80W while providing a stunning illuminated view of your craft beer collection.",
    specs: {
      "External Dimensions": "430mm W x 480mm D x 690mm H",
      "Capacity": "70 Litres (Holds 70x 375ml Cans)",
      "Lighting": "Neon ice-blue internal LED with manual toggle switch"
    },
    dimensionGuide: {
      requiredCutout: "450mm W x 500mm D x 710mm H",
      ventilationClearance: "30mm rear clearance",
      doorSwingRadius: "430mm"
    },
    frequentlyBoughtTogether: ["acc-002"],
    alternatives: ["bf-009", "bf-002"]
  },
  {
    id: "bf-025",
    sku: "FED-SLUSH-2B",
    brand: "F.E.D.",
    model: "SLUSH-2X12",
    name: "F.E.D. Twin Bowl Commercial Frozen Margarita & Slush Machine 2x12L",
    slug: "fed-twin-bowl-commercial-frozen-margarita-slush-machine-24l",
    categorySlug: "glass-frosters-specialty",
    primaryCategory: "Bar Freezers",
    subCategory: "Glass Frosters & Specialty",
    type: "Slush & Frozen Drink",
    doorCount: 2,
    doorType: "solid",
    doorStyle: "drawer",
    widthMm: 430,
    depthMm: 510,
    heightMm: 770,
    widthRange: "<600",
    capacityLitres: 24,
    capacityRange: "<100",
    price: 2490,
    tradePrice: 2190,
    msrp: 2990,
    finish: "stainless",
    tempRange: "-2°C to -4°C Slush Freeze",
    installation: "counter-top",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 600,
    refrigerant: "R290",
    ambientRating: "38°C",
    energyRating: "4 Stars",
    weightKg: 48,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Ships today if ordered before 2pm",
    stockQty: 7,
    warrantyYears: 2,
    warrantyText: "2 Years F.E.D. Australia-wide Warranty",
    features: ["Dual 12-Litre Polycarbonate Bowls", "Independent Tank Density Controls", "High-Torque Gearbox for Heavy Sugar Mixes", "Stainless Steel Base with Drip Trays", "Night Cold Chilling Mode"],
    shortDescription: "High-volume twin bowl commercial frozen cocktail dispenser. Frozen margaritas, daiquiris, frose, and alcoholic slushes on tap.",
    fullDescription: "A massive profit-generator for Australian bars and beachside clubs. Dual bowls allow you to run two signature cocktail flavours simultaneously with adjustable consistency control from chilled beverage to thick frozen frappe.",
    specs: {
      "External Dimensions": "430mm W x 510mm D x 770mm H",
      "Bowl Capacity": "2x 12 Litres (24L Total Dispense)",
      "Compressor": "Aspera Embraco Commercial Refrigeration Unit"
    },
    dimensionGuide: {
      requiredCutout: "460mm W x 540mm D x 850mm H (Clearance for lid refilling)",
      ventilationClearance: "150mm side airflow clearance required",
      doorSwingRadius: "Front tap handles"
    },
    frequentlyBoughtTogether: ["acc-004"],
    alternatives: ["bf-004", "bf-009"]
  },
  {
    id: "bf-026",
    sku: "TEF-BC3D-MB",
    brand: "Tefcold",
    model: "BA30H-P",
    name: "Tefcold Matte Black 3-Door Back Bar Bottle Chiller 335L",
    slug: "tefcold-matte-black-3-door-back-bar-bottle-chiller-335l",
    categorySlug: "bottle-coolers",
    primaryCategory: "Bar Fridges & Coolers",
    subCategory: "Bottle Coolers (1-4 door)",
    type: "3 Door Bottle Cooler",
    doorCount: 3,
    doorType: "glass",
    doorStyle: "hinged",
    widthMm: 1350,
    depthMm: 520,
    heightMm: 900,
    widthRange: "1200-1500",
    capacityLitres: 335,
    capacityRange: "300-400",
    price: 2990,
    tradePrice: 2690,
    msrp: 3590,
    finish: "black",
    tempRange: "+2°C to +10°C",
    installation: "back bar",
    use: "commercial",
    power: "10A",
    plugType: "10 Amp plug",
    powerWatts: 310,
    refrigerant: "R600a",
    ambientRating: "38°C",
    energyRating: "4.5 Stars",
    weightKg: 106,
    condition: "new",
    availability: "in stock",
    shippingBadge: "Ships today if ordered before 2pm",
    stockQty: 9,
    warrantyYears: 2,
    warrantyText: "2 Years Tefcold Commercial Warranty",
    features: ["Architectural European Matte Black Exterior", "Mirror-Finish Stippled Aluminium Interior", "Individual Key Locks per Door", "Energy Saving LED Illumination", "Adjustable Feet"],
    shortDescription: "European styled matte black 3-door backbar cooler. Designed for boutique cocktail bars and craft taprooms with mirror aluminium interior.",
    fullDescription: "Engineered in Denmark for aesthetic perfection. The mirror-finish stippled interior bounces the internal LED illumination through your beer and spirit stock, creating an eye-catching luxury bar back-wall display.",
    specs: {
      "External Dimensions": "1350mm W x 520mm D x 900mm H",
      "Capacity": "335 Litres (Holds 330x 330ml Bottles)",
      "Shelves": "6x Heavy duty wire racks (2 per section)"
    },
    dimensionGuide: {
      requiredCutout: "1370mm W x 540mm D x 915mm H",
      ventilationClearance: "30mm rear clearance",
      doorSwingRadius: "430mm per door"
    },
    frequentlyBoughtTogether: ["acc-001", "acc-005"],
    alternatives: ["bf-015", "bf-014"]
  }
];

export const ACCESSORY_PRODUCTS = [
  {
    id: "acc-001",
    sku: "ACC-SHLF-SS",
    brand: "Bar Freezer Genuine",
    name: "Heavy-Duty PVC Coated Wire Shelf with 4x Stainless Steel Clips",
    slug: "heavy-duty-pvc-coated-wire-shelf-with-clips",
    categorySlug: "shelving-baskets-trays",
    price: 55,
    tradePrice: 42,
    shortDescription: "Universal replacement shelf rated to 45kg load. Fits Skope, Bromic, Williams, and Atosa underbar units.",
    specs: { "Dimensions": "480mm W x 430mm D", "Finish": "Food-grade non-chip white PVC coating", "Load Rating": "45 kg static capacity" }
  },
  {
    id: "acc-002",
    sku: "ACC-GSKT-MAG",
    brand: "Bar Freezer Genuine",
    name: "Universal Push-In Magnetic Door Gasket Seal (Custom Sized)",
    slug: "universal-push-in-magnetic-door-gasket-seal",
    categorySlug: "door-locks-gaskets",
    price: 65,
    tradePrice: 48,
    shortDescription: "Airtight sub-zero magnetic seal. Restores energy efficiency and stops frost buildup around doors.",
    specs: { "Profile": "Standard dart push-in channel", "Material": "Low-temperature antimicrobial flexible PVC" }
  },
  {
    id: "acc-003",
    sku: "ACC-CST-100",
    brand: "Bar Freezer Genuine",
    name: "Commercial Lockable 100mm Swivel Castor Wheel Kit (Set of 4)",
    slug: "commercial-lockable-100mm-swivel-castor-kit-set-of-4",
    categorySlug: "castors-legs-stands",
    price: 140,
    tradePrice: 110,
    shortDescription: "Set of 4 heavy-duty castors (2x locking brakes, 2x free swivel). 600kg total dynamic capacity.",
    specs: { "Wheel Diameter": "100mm", "Total Combined Capacity": "600 kg", "Mounting": "M12 heavy threaded stud" }
  },
  {
    id: "acc-004",
    sku: "ACC-CO2-FROST",
    brand: "Bar Freezer Genuine",
    name: "Rapid CO2 Glass Chiller & Surface Froster Bar-Mount Unit",
    slug: "rapid-co2-glass-chiller-surface-froster-bar-mount",
    categorySlug: "glass-frosting-accessories",
    price: 490,
    tradePrice: 420,
    shortDescription: "Tabletop CO2 injection chiller. Sanitises and frosts any glass in 8 seconds flat with dramatic smoke effect.",
    specs: { "Connection": "Standard Australian Beverage Gas CO2 Cylinder fitting", "Cycle Time": "7-10 seconds per glass" }
  },
  {
    id: "acc-005",
    sku: "ACC-CLEAN-KIT",
    brand: "Bar Freezer Genuine",
    name: "Professional Refrigeration Condenser Coil Cleaning & Sanitising Kit",
    slug: "professional-refrigeration-condenser-coil-cleaning-kit",
    categorySlug: "covers-cleaning",
    price: 85,
    tradePrice: 65,
    shortDescription: "Includes flexible condenser fin brush, no-rinse biodegradable coil foam cleaner, and stainless steel polish.",
    specs: { "Contents": "1x 500ml Coil Safe Foam, 1x 500ml 3M Stainless Polish, 1x Telescopic Fin Comb" }
  },
  {
    id: "acc-006",
    sku: "ACC-COV-ALF",
    brand: "Bar Freezer Genuine",
    name: "Heavy Duty 600D Waterproof UV Protective Outdoor Bar Fridge Cover",
    slug: "heavy-duty-waterproof-outdoor-bar-fridge-cover",
    categorySlug: "covers-cleaning",
    price: 95,
    tradePrice: 75,
    shortDescription: "Protects alfresco and outdoor refrigeration against harsh Australian sun, torrential rain, and coastal salt spray.",
    specs: { "Material": "600D Oxford Polyester with PVC water-resistant backing", "Fits": "Standard 600mm or 900mm single/double units" }
  }
];

export const FAQS = [
  {
    question: "Do you deliver bar freezers and fridges Australia-wide?",
    answer: "Yes. We maintain fully stocked warehouses in Sydney, Melbourne, Brisbane, and Perth, with daily freight connections to Adelaide, Canberra, Hobart, Darwin, and regional hubs across all states and territories. Standard metro delivery is $89 flat rate (or completely free for commercial orders over $3,500). Tailgate lifter service is included where required so you never have to manually unload heavy commercial equipment."
  },
  {
    question: "What is an Australian '43°C Tropical Ambient Rating' and why does it matter?",
    answer: "Standard domestic freezers from overseas big-box retailers are only tested to European 'Climate Class 3' (up to 25°C ambient). During an Australian summer, temperatures under a commercial bar counter or on an outdoor alfresco patio frequently exceed 38°C to 42°C. A Climate Class 5 (43°C Tropical Rated) bar freezer has oversized condenser coils, dual-speed evaporator fans, and heavy polyurethane insulation engineered specifically to pull down and hold -20°C in harsh Australian conditions without burning out the compressor."
  },
  {
    question: "What electrical power plug do commercial bar freezers need?",
    answer: "Over 95% of our underbar freezers and back bar coolers run on standard Australian single-phase 240V electricity with a regular 10-Amp 3-pin plug (the same socket you have in any home or cafe). Large multi-door walk-in style units will specify 15-Amp or 3-phase power on their product specifications table."
  },
  {
    question: "What ventilation clearance is required under a bar counter?",
    answer: "Units with 'front-breathing' or 'front-venting' kickplates take air in through the front louvre and exhaust warm air out through the same front grille. These require zero clearance on the sides and rear, allowing completely flush built-in installation. Standard back-venting units require at least 50mm of rear air clearance and 20mm on each side. Every product page on Bar Freezer includes our 'Will it fit?' dimension guide with exact cutout specifications."
  },
  {
    question: "Can I get trade pricing and commercial finance?",
    answer: "Yes! Australian hospitality operators, builders, architects, refrigeration mechanics, and venue managers can request trade quote pricing directly through our online quote builder or by calling 1300 858 290. We also partner with SilverChef (Rent-Try-Buy with 100% tax-deductible payments) and Zip Business for commercial leasing."
  },
  {
    question: "How does the warranty work if an issue occurs?",
    answer: "All our commercial units are backed by Australian on-site manufacturer warranties (ranging from 2 to 5 years). In the event of a fault, you simply submit a claim on our /warranty-service/ page or phone our priority trade line. A qualified local commercial refrigeration mechanic in your city or regional town is dispatched directly to your venue to inspect and repair the machine on-site."
  },
  {
    question: "What is the difference between a glass froster and a standard bar freezer?",
    answer: "A standard bar freezer holds steady at -18°C for long-term food or ice storage. A commercial glass froster is engineered with high-velocity internal convection and drops temperatures down to -22°C to -25°C. When a damp beer stein or martini coupe is placed inside, it flash-freezes the surface moisture into an opaque frost shell in under 90 seconds, keeping drinks icy cold for 20-30 minutes without melting ice into the beverage."
  },
  {
    question: "What is R290 refrigerant and why is it mandatory for commercial bars?",
    answer: "R290 is a natural high-purity propane hydrocarbon refrigerant. Under Australian government MEPS greenhouse regulations, old ozone-depleting gases (like R404A and R134a) are being phased out. R290 has zero Ozone Depletion Potential (ODP) and an ultra-low Global Warming Potential (GWP < 3). More importantly for venue owners, R290 units consume up to 40% less electricity, saving thousands of dollars per year on commercial venue power bills."
  }
];

export const POSTS = [
  {
    title: "Underbar Freezer Sizing Guide: Glass vs Solid Doors for Australian Pubs",
    slug: "underbar-freezer-sizing-guide-glass-vs-solid-doors",
    publishedAt: "12 October 2026",
    readTime: "6 min read",
    category: "Equipment Selection",
    excerpt: "Choosing between sleek illuminated glass doors and heavy-duty insulated solid doors can make or break your bar's power bills and service speed.",
    content: `When fitting out a high-volume Australian front or back bar, refrigeration is one of your largest capital outlays and ongoing operational power costs.

1. Solid Doors: Maximum Thermal Efficiency
Solid stainless steel doors feature between 45mm to 60mm of high-density injected polyurethane foam insulation. This delivers the lowest heat ingress of any door style. In venues where the bar receives afternoon sun or where ambient summer temperatures climb above 35°C, solid doors maintain -20°C with 30-40% less compressor run-time than glass.

2. Heated Glass Doors: The Merchandising Advantage
Glass door bar freezers look stunning. Heated Low-E double or triple glazing passes an electrical micro-current through the glass surface, elevating its temperature just enough to stop condensation from forming when warm ambient room air strikes the cold glass. They allow bartenders and patrons to locate frosted beer steins and craft spirits instantly without holding doors open.

3. Height & Plinth Clearances
Standard Australian commercial bar counters sit between 900mm and 1050mm from finished floor level. Most underbar units are engineered at 840mm to 860mm high to slide cleanly beneath stone or stainless bench work. Always check whether the unit has front-breathing ventilation or requires rear chimney clearances.`
  },
  {
    title: "Ventilation & Clearance Requirements for Built-in Bar Refrigeration",
    slug: "ventilation-clearance-requirements-built-in-bar-refrigeration",
    publishedAt: "28 September 2026",
    readTime: "5 min read",
    category: "Installation & Maintenance",
    excerpt: "Over 80% of premature commercial refrigeration compressor failures in Australia are caused by improper airflow clearance under bar cabinetry.",
    content: `Refrigeration does not create 'cold'—it extracts thermal heat from inside the cabinet and exhausts that heat into the surrounding room air.

If you trap a commercial refrigeration compressor inside tight, unvented joinery, the trapped ambient air temperature will rapidly surge beyond 50°C. The compressor will run continuously, overheat, trip its thermal overload switch, and ultimately suffer catastrophic mechanical failure.

Front-Breathing vs Rear-Breathing
When planning custom underbench bar joinery, insist on units with front-breathing plinths (such as Skope ReFlex, Williams Cameo, or Schmick Alfresco). These feature divided kickplate louvres: fresh room air is drawn through one side of the front grille, passed over the condenser coils, and ejected out the other side.

For units with rear exhaust, always provide a minimum 50mm rear air gap plus ventilation grilles cut into the kickboard or countertop splashback.`
  },
  {
    title: "Glass Froster vs Standard Freezer: The Bartender's Guide to Super-Chilled Spirits",
    slug: "glass-froster-vs-standard-freezer-bartenders-guide",
    publishedAt: "15 September 2026",
    readTime: "7 min read",
    category: "Bar Craft & Operations",
    excerpt: "Why premium cocktail bars are ditching ordinary kitchen freezers for dedicated sub-zero glass frosters.",
    content: `In modern Australian cocktail mixology, ice dilution is the enemy of a crisp martini, negroni, or ice-cold craft lager.

Standard food freezers operate at -15°C to -18°C with static cooling shelves. They take up to 45 minutes to cool heavy beer steins, and the slow cooling rate causes condensation droplets to freeze into large, rough ice crystals that make glassware feel wet and slushy.

Dedicated commercial glass frosters feature heavy centrifugal fans that circulate -22°C to -25°C air at high velocity. Because cold air is driven directly into the cavity of upside-down glassware, wet glasses flash-freeze in 90 seconds into an opaque, velvet-like frost layer. When the cocktail is poured, the glass insulates the liquid from the ambient air, keeping it below freezing for over 20 minutes without melting.`
  },
  {
    title: "Alfresco & Outdoor Rated Bar Refrigeration: Surviving Australian Summers",
    slug: "alfresco-outdoor-rated-bar-refrigeration-australian-summers",
    publishedAt: "04 August 2026",
    readTime: "6 min read",
    category: "Outdoor Living",
    excerpt: "Can you put a normal indoor bar fridge outside? Why IPX4 ratings and 304 marine stainless steel are non-negotiable for Australian patios.",
    content: `Australia has the harshest solar UV radiation and summer humidity in the developed world. Installing an indoor-rated bar fridge or freezer in an outdoor BBQ kitchen will quickly void its warranty and lead to rust, electrical shorts, and spoiled beverages.

1. IPX4 Waterproof Certification
Outdoor refrigeration must be rated to at least IPX4 water resistance. This ensures high-pressure rain spray, hose washdowns, and splashing will not enter electrical junctions or compressor motor windings.

2. Marine Grade 304 Stainless Steel
Standard indoor appliances use low-cost 430-grade stainless or painted steel, which develops tea-staining and pitting within months of exposure to coastal air. 304 marine-grade stainless contains 18% chromium and 8% nickel, providing exceptional resistance to oxidation.

3. Heated Glass Technology
On a humid Queensland or Sydney summer night, air humidity often exceeds 85%. Normal glass will drip with condensation puddles that ruin timber cabinetry. Outdoor-rated units use heated glass to keep panes crystal-clear in all weather.`
  },
  {
    title: "SilverChef Hospitality Lease vs Outright Purchase: Tax & Cash Flow Guide",
    slug: "silverchef-hospitality-lease-vs-outright-purchase",
    publishedAt: "19 July 2026",
    readTime: "5 min read",
    category: "Finance & Tax",
    excerpt: "Preserve working capital when launching or expanding your venue. How Rent-Try-Buy delivers 100% tax deductions.",
    content: `Opening a new bar, restaurant, or pub requires substantial upfront capital. Spending $30,000 to $50,000 on commercial refrigeration equipment ties up precious cash that is needed for initial stock, staff payroll, and marketing.

How SilverChef Rent-Try-Buy Works
- 12-Month Flexible Agreement: Low weekly rental payments.
- 100% Tax Deductible: Unlike capital asset depreciation, rent payments are treated as an operational business expense.
- Off-Balance Sheet: Preserves your borrowing capacity with major Australian banks.
- Options After 12 Months: Upgrade to new equipment, purchase outright with a 75% rental rebate, return the equipment if your venue concept changes, or continue renting.

Bar Freezer is an authorized SilverChef platinum partner. We can approve equipment financing up to $65,000 in under 4 hours.`
  },
  {
    title: "R290 Hydrocarbon Refrigerant: Australian MEPS Energy Standards Explained",
    slug: "r290-hydrocarbon-refrigerant-meps-energy-standards",
    publishedAt: "02 June 2026",
    readTime: "5 min read",
    category: "Sustainability & Standards",
    excerpt: "Why the Australian commercial refrigeration sector is switching to natural hydrocarbons and how it cuts venue power bills.",
    content: `Under the Australian Greenhouse and Energy Minimum Standards (GEMS/MEPS), commercial refrigeration equipment sold in Australia must meet stringent energy consumption limits.

Legacy refrigerants such as R404A and R134a have high Global Warming Potentials (GWPs up to 3,922). The Australian government import phase-down has made these synthetic gases increasingly scarce and expensive to service.

Natural Propane (R290)
R290 has exceptional thermodynamic efficiency. It absorbs and dissipates thermal energy significantly faster than older fluorinated gases, which means the compressor motor does not need to work as hard or run as long. Venue owners who upgrade from 8-year-old bar fridges to modern R290 units report energy savings between $450 and $1,200 per cabinet annually.`
  }
];
