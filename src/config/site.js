/**
 * Bar Freezer Australia - Central Site Configuration
 * Domain: barfreezer.com.au
 * All navigation, taxonomy, products, venues, cities, FAQs, and guides are derived from here.
 */

import productsData from './products.light.json';
import { EXTRA_POSTS } from './guides-extra.js';


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
          { name: "Man Cave & Home Bar", slug: "man-cave-home-bar", path: "/bar-freezers/home-bar-outdoor-freezers/man-cave-home-bar/" }
        ]
      },
      {
        name: "Ex-Display & Clearance",
        slug: "clearance-ex-display",
        path: "/bar-freezers/clearance-ex-display/",
        description: "Ex-display and refurbished commercial freezers. Each listing shows its condition.",
        types: [
          { name: "Ex-Display Freezers", slug: "ex-display", path: "/bar-freezers/clearance-ex-display/ex-display/" },
          { name: "Refurbished", slug: "refurbished", path: "/bar-freezers/clearance-ex-display/refurbished/" }
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
        description: "Under bar fridges designed to fit beneath a counter. Measure the opening and allow ventilation.",
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
        description: "Bottle coolers that keep bottles and cans cold behind the bar, in 1 to 4 door sizes.",
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
        description: "Back bar fridges with hinged or sliding glass doors that show stock behind the bar.",
        types: [
          { name: "Hinged Glass Back Bar", slug: "hinged-glass", path: "/bar-fridges/back-bar-fridges/hinged-glass/" },
          { name: "Sliding Glass Back Bar", slug: "sliding-glass", path: "/bar-fridges/back-bar-fridges/sliding-glass/" }
        ]
      },
      {
        name: "Beer & Beverage Fridges",
        slug: "beer-beverage-fridges",
        path: "/bar-fridges/beer-beverage-fridges/",
        description: "Beer fridges and beverage merchandisers that keep drinks at serving temperature.",
        types: [
          { name: "Sub-Zero Beer Fridges", slug: "sub-zero-beer", path: "/bar-fridges/beer-beverage-fridges/sub-zero-beer/" },
          { name: "Beverage Merchandisers", slug: "beverage-merchandisers", path: "/bar-fridges/beer-beverage-fridges/beverage-merchandisers/" }
        ]
      },
      {
        name: "Wine Fridges (Single & Dual Zone)",
        slug: "wine-fridges",
        path: "/bar-fridges/wine-fridges/",
        description: "Wine fridges and cabinets in single zone and dual zone models. Compare bottle capacity.",
        types: [
          { name: "Single Zone Wine Cabinets", slug: "single-zone", path: "/bar-fridges/wine-fridges/single-zone/" },
          { name: "Dual Zone Wine Cabinets", slug: "dual-zone", path: "/bar-fridges/wine-fridges/dual-zone/" }
        ]
      },
      {
        name: "Kegerators & Beer Dispensers",
        slug: "kegerators-dispensers",
        path: "/bar-fridges/kegerators-dispensers/",
        description: "Kegerators and beer dispensers for home bars and venues. Check keg size and gas requirements.",
        types: [
          { name: "Single Tap Kegerators", slug: "single-tap", path: "/bar-fridges/kegerators-dispensers/single-tap/" },
          { name: "Multi-Tap Commercial Dispensers", slug: "multi-tap", path: "/bar-fridges/kegerators-dispensers/multi-tap/" }
        ]
      },
      {
        name: "Combination Fridge-Freezers",
        slug: "combination-fridge-freezers",
        path: "/bar-fridges/combination-fridge-freezers/",
        description: "Combination bar units with a chilled section and a freezer section. Compare the capacity of each.",
        types: [
          { name: "Split Dual Temperature", slug: "split-dual-temp", path: "/bar-fridges/combination-fridge-freezers/split-dual-temp/" }
        ]
      },
      {
        name: "Outdoor / Alfresco Bar Fridges",
        slug: "outdoor-alfresco-fridges",
        path: "/bar-fridges/outdoor-alfresco-fridges/",
        description: "Outdoor and alfresco bar fridges. Check the rated operating temperature in each specification.",
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

// Real manufacturer products, generated by scripts/sourcing/*.mjs into products.generated.json.
// Prices and stock are not published by manufacturers: price/stock are null until supplied.
export const PRODUCTS = productsData;

// Accessories are not yet loaded (the previous sample accessories were removed).
export const ACCESSORY_PRODUCTS = [];

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
  ...EXTRA_POSTS,
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
