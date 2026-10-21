// Keyword-led metadata and on-page copy for the /accessories-parts/ pages (the ice machines parent page lives in seo-keywords.ts).
// Titles are final (60 characters or fewer). Descriptions are 110-158 characters. General buying information only.
type Meta = { title: string; description: string };
type Copy = { h1: string; intro: string };

export const ACCESSORY_META: Record<string, Meta> = {
  '/accessories-parts/': {
    title: 'Fridge Accessories & Spare Parts for Sale Australia',
    description: 'Buy fridge and freezer accessories and spare parts: shelves, castors, door locks, gaskets, ice makers, cleaners and more. Delivered Australia-wide.',
  },
  '/accessories-parts/shelving-baskets-trays/': {
    title: 'Fridge Shelves, Baskets & Trays for Sale Australia',
    description: 'Buy replacement fridge shelves, wire baskets, trays and clips for bar fridges and freezers. Compare sizes and prices, delivered Australia-wide.',
  },
  '/accessories-parts/shelving-baskets-trays/wire-shelves/': {
    title: 'Wire Shelves & Shelf Clips for Fridges for Sale',
    description: 'Buy wire shelves, shelf clips and supports for commercial fridges and freezers. Check the size and model, delivered Australia-wide.',
  },
  '/accessories-parts/shelving-baskets-trays/wine-cradles/': {
    title: 'Wine Cradles & Wine Shelves for Sale Australia',
    description: 'Buy wine cradles and slide-out wine shelves for wine fridges and cabinets. Check the model fit, with delivery Australia-wide.',
  },
  '/accessories-parts/door-locks-gaskets/': {
    title: 'Fridge Door Locks, Seals & Gaskets for Sale',
    description: 'Buy fridge door locks, door seals, gaskets and hinges for commercial fridges and freezers. Check the model fit, delivered Australia-wide.',
  },
  '/accessories-parts/door-locks-gaskets/key-locks/': {
    title: 'Fridge Key Locks & Lock Assemblies for Sale',
    description: 'Buy key locks and lock assemblies for fridge and freezer doors. Check the part number for your model, with delivery Australia-wide.',
  },
  '/accessories-parts/castors-legs-stands/': {
    title: 'Fridge Castors, Legs & Stands for Sale Australia',
    description: 'Buy castors, adjustable legs and stands for fridges, freezers and benches. Compare load ratings and sizes, delivered Australia-wide.',
  },
  '/accessories-parts/castors-legs-stands/swivel-castors/': {
    title: 'Lockable Swivel Castors for Fridges for Sale',
    description: 'Buy lockable swivel castors for fridges, freezers and benches. Compare wheel size and load rating, with delivery Australia-wide.',
  },
  '/accessories-parts/castors-legs-stands/adjustable-legs/': {
    title: 'Adjustable Stainless Legs for Fridges for Sale',
    description: 'Buy adjustable stainless steel legs for fridges, freezers and benches. Compare height range and load rating, delivered Australia-wide.',
  },
  '/accessories-parts/glass-frosting-accessories/': {
    title: 'Glass Frosting Accessories for Sale Australia',
    description: 'Buy glass frosting accessories, including CO2 rapid glass frosters, for bars and pubs. Compare prices, delivered Australia-wide.',
  },
  '/accessories-parts/glass-frosting-accessories/co2-frosters/': {
    title: 'CO2 Rapid Glass Frosters for Sale Australia',
    description: 'Buy CO2 rapid glass frosters that frost beer glasses on demand. Check the gas and setup details, delivered Australia-wide.',
  },
  '/accessories-parts/ice-machines-storage/underbar-ice-makers/': {
    title: 'Underbar Ice Makers for Sale Australia',
    description: 'Buy underbar ice makers for bars and cafes. Compare daily ice output, bin capacity and prices, with delivery Australia-wide.',
  },
  '/accessories-parts/ice-machines-storage/insulated-ice-bins/': {
    title: 'Insulated Ice Bins & Ice Storage for Sale',
    description: 'Buy insulated ice bins and ice storage for ice machines. Compare storage capacity and size, delivered Australia-wide.',
  },
  '/accessories-parts/covers-cleaning/': {
    title: 'Fridge Cleaning Products & Covers for Sale',
    description: 'Buy coil cleaners, glass cleaners and covers to keep bar fridges, freezers and display cabinets clean. Delivered Australia-wide.',
  },
  '/accessories-parts/covers-cleaning/coil-cleaners/': {
    title: 'Refrigeration Coil Cleaners for Sale Australia',
    description: 'Buy condenser coil cleaners that keep fridge and freezer coils clean for better airflow. Compare sizes, delivered Australia-wide.',
  },
  '/accessories-parts/spare-parts/': {
    title: 'Fridge Spare Parts | Compressors, Fans, Thermostats',
    description: 'Buy refrigeration spare parts: compressors, fans, thermostats and LED strips. Check the part number for your model, delivered Australia-wide.',
  },
  '/accessories-parts/spare-parts/thermostats/': {
    title: 'Digital Fridge Thermostats & Probes for Sale',
    description: 'Buy digital thermostats, controllers and temperature probes for commercial fridges and freezers. Delivered Australia-wide.',
  },
  '/accessories-parts/spare-parts/fans/': {
    title: 'Evaporator & Condenser Fans for Fridges for Sale',
    description: 'Buy evaporator and condenser fan motors and blades for commercial fridges and freezers. Check the part number, delivered Australia-wide.',
  },
  '/accessories-parts/spare-parts/compressors/': {
    title: 'Commercial Fridge Compressors (R290) for Sale',
    description: 'Buy R290 commercial compressors for refrigeration equipment. Check the model and part number, with delivery Australia-wide.',
  },
  '/accessories-parts/spare-parts/led-strips/': {
    title: 'Fridge LED Strips & Transformers for Sale',
    description: 'Buy LED strip lights and transformers for display fridges and freezers. Check the length and fit, delivered Australia-wide.',
  },
};

export const ACCESSORY_COPY: Record<string, Copy> = {
  '/accessories-parts/': { h1: 'Fridge Accessories & Spare Parts for Sale', intro: 'Find shelves, castors, door locks and seals, ice makers, cleaners and spare parts for commercial and bar refrigeration. Always match the part number or model before you order.' },
  '/accessories-parts/shelving-baskets-trays/': { h1: 'Fridge Shelves, Baskets & Trays for Sale', intro: 'Replacement shelves, baskets and trays for bar fridges and freezers. Check the internal width and depth against your cabinet.' },
  '/accessories-parts/shelving-baskets-trays/wire-shelves/': { h1: 'Wire Shelves & Shelf Clips for Sale', intro: 'Wire shelves, clips and supports for commercial fridges and freezers. Match the size and model.' },
  '/accessories-parts/shelving-baskets-trays/wine-cradles/': { h1: 'Wine Cradles & Wine Shelves for Sale', intro: 'Wine cradles and slide-out wine shelves for wine fridges and cabinets. Check which cabinet models each shelf fits.' },
  '/accessories-parts/door-locks-gaskets/': { h1: 'Fridge Door Locks, Seals & Gaskets for Sale', intro: 'Door locks, seals, gaskets and hinges for commercial fridges and freezers. A worn seal lets cold air escape, so replace it promptly.' },
  '/accessories-parts/door-locks-gaskets/key-locks/': { h1: 'Fridge Key Locks & Lock Assemblies for Sale', intro: 'Key lock assemblies for fridge and freezer doors. Match the part number to your model.' },
  '/accessories-parts/castors-legs-stands/': { h1: 'Fridge Castors, Legs & Stands for Sale', intro: 'Castors, adjustable legs and stands for fridges, freezers and benches. Check the load rating and the mounting thread.' },
  '/accessories-parts/castors-legs-stands/swivel-castors/': { h1: 'Lockable Swivel Castors for Sale', intro: 'Lockable swivel castors make heavy cabinets easier to move. Compare wheel size and load rating per castor.' },
  '/accessories-parts/castors-legs-stands/adjustable-legs/': { h1: 'Adjustable Stainless Legs for Sale', intro: 'Adjustable stainless steel legs raise and level fridges, freezers and benches. Check the height range and load rating.' },
  '/accessories-parts/glass-frosting-accessories/': { h1: 'Glass Frosting Accessories for Sale', intro: 'Accessories for frosting beer glasses at the bar. Check the gas and setup details on each listing.' },
  '/accessories-parts/glass-frosting-accessories/co2-frosters/': { h1: 'CO2 Rapid Glass Frosters for Sale', intro: 'CO2 rapid glass frosters frost a glass on demand. Check the gas supply and setup needs.' },
  '/accessories-parts/ice-machines-storage/underbar-ice-makers/': { h1: 'Underbar Ice Makers for Sale', intro: 'Underbar ice makers fit beneath the counter. Compare daily ice output, bin capacity and water supply needs.' },
  '/accessories-parts/ice-machines-storage/insulated-ice-bins/': { h1: 'Insulated Ice Bins & Ice Storage for Sale', intro: 'Insulated ice bins hold ice made by an ice machine. Match the bin size to the machine.' },
  '/accessories-parts/covers-cleaning/': { h1: 'Fridge Cleaning Products & Covers for Sale', intro: 'Coil cleaners, glass cleaners and covers help keep refrigeration equipment clean and running well.' },
  '/accessories-parts/covers-cleaning/coil-cleaners/': { h1: 'Refrigeration Coil Cleaners for Sale', intro: 'Condenser coil cleaners remove dust and grease so air can flow through the coil. Follow the directions on each product.' },
  '/accessories-parts/spare-parts/': { h1: 'Fridge Spare Parts for Sale', intro: 'Compressors, fans, thermostats and LED strips for commercial and bar refrigeration. Match the part number or model before you order.' },
  '/accessories-parts/spare-parts/thermostats/': { h1: 'Digital Fridge Thermostats & Probes for Sale', intro: 'Digital thermostats, controllers and probes for commercial fridges and freezers. Check the voltage and the sensor type.' },
  '/accessories-parts/spare-parts/fans/': { h1: 'Evaporator & Condenser Fans for Sale', intro: 'Evaporator and condenser fan motors and blades for commercial refrigeration. Match the size, voltage and part number.' },
  '/accessories-parts/spare-parts/compressors/': { h1: 'Commercial Fridge Compressors (R290) for Sale', intro: 'R290 compressors for commercial refrigeration equipment. Check the model, refrigerant and part number.' },
  '/accessories-parts/spare-parts/led-strips/': { h1: 'Fridge LED Strips & Transformers for Sale', intro: 'LED strips and transformers for display fridges and freezers. Check the length and connector.' },
};
