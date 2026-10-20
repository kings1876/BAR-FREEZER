// Keyword-led metadata and on-page copy for the /bar-fridges/ pages not already covered in seo-keywords.ts.
// Titles are final (60 characters or fewer). Descriptions are 110-158 characters. General buying information only.
type Meta = { title: string; description: string };
type Copy = { h1: string; intro: string };

export const FRIDGE_META: Record<string, Meta> = {
  '/bar-fridges/under-bar-fridges/1-door/': {
    title: 'Single Door Under Bar Fridges for Sale Australia',
    description: 'Buy single door under bar fridges that fit beneath a counter. Compare width, capacity and price, with delivery Australia-wide.',
  },
  '/bar-fridges/under-bar-fridges/2-door/': {
    title: 'Double Door Under Bar Fridges for Sale Australia',
    description: 'Buy double door under bar fridges for busy bars and cafes. Compare widths, litres and prices, with delivery Australia-wide.',
  },
  '/bar-fridges/under-bar-fridges/3-door/': {
    title: 'Triple Door Under Bar Fridges for Sale Australia',
    description: 'Buy triple door under bar fridges for high-volume chilled storage. Compare widths, capacity and prices, delivered Australia-wide.',
  },
  '/bar-fridges/under-bar-fridges/solid-door/': {
    title: 'Solid Door Under Bar Fridges for Sale Australia',
    description: 'Buy solid door under bar fridges for chilled storage beneath the counter. Compare widths, capacity and prices, delivered Australia-wide.',
  },
  '/bar-fridges/bottle-coolers/': {
    title: 'Bottle Coolers for Sale Australia | Back Bar Coolers',
    description: 'Buy bottle coolers with 1 to 4 doors for bars, pubs and cafes. Compare widths, capacity and prices, delivered Australia-wide.',
  },
  '/bar-fridges/bottle-coolers/1-door/': {
    title: '1 Door Bottle Coolers for Sale Australia',
    description: 'Buy 1 door bottle coolers for compact bars and cafes. Compare width, capacity and price, with delivery Australia-wide.',
  },
  '/bar-fridges/bottle-coolers/2-door/': {
    title: '2 Door Bottle Coolers for Sale Australia',
    description: 'Buy 2 door bottle coolers for bars, pubs and function rooms. Compare width, capacity and price, with delivery Australia-wide.',
  },
  '/bar-fridges/bottle-coolers/3-door/': {
    title: '3 Door Bottle Coolers for Sale Australia',
    description: 'Buy 3 door bottle coolers for busy bars and venues. Compare width, capacity and price, with delivery Australia-wide.',
  },
  '/bar-fridges/bottle-coolers/4-door/': {
    title: '4 Door Bottle Coolers for Sale Australia',
    description: 'Buy 4 door bottle coolers for high-volume bars and clubs. Compare width, capacity and price, with delivery Australia-wide.',
  },
  '/bar-fridges/back-bar-fridges/': {
    title: 'Back Bar Fridges for Sale | Glass Door Australia',
    description: 'Buy back bar fridges with hinged or sliding glass doors for pubs and bars. Compare widths, capacity and prices, delivered Australia-wide.',
  },
  '/bar-fridges/back-bar-fridges/hinged-glass/': {
    title: 'Hinged Glass Door Back Bar Fridges for Sale',
    description: 'Buy back bar fridges with hinged glass doors. Compare widths, capacity and prices, with delivery Australia-wide.',
  },
  '/bar-fridges/back-bar-fridges/sliding-glass/': {
    title: 'Sliding Glass Door Back Bar Fridges for Sale',
    description: 'Buy back bar fridges with sliding glass doors that save space behind the bar. Compare widths and prices, delivered Australia-wide.',
  },
  '/bar-fridges/beer-beverage-fridges/sub-zero-beer/': {
    title: 'Sub-Zero Beer Fridges for Sale Australia',
    description: 'Buy sub-zero beer fridges that serve beer extra cold. Compare size, capacity and price, with delivery Australia-wide.',
  },
  '/bar-fridges/beer-beverage-fridges/beverage-merchandisers/': {
    title: 'Beverage Merchandisers & Drink Fridges for Sale',
    description: 'Buy beverage merchandisers and glass door drink fridges for shops, cafes and venues. Compare sizes and prices, delivered Australia-wide.',
  },
  '/bar-fridges/wine-fridges/single-zone/': {
    title: 'Single Zone Wine Fridges for Sale Australia',
    description: 'Buy single zone wine fridges and wine cabinets. Compare bottle capacity, size and price, with delivery Australia-wide.',
  },
  '/bar-fridges/wine-fridges/dual-zone/': {
    title: 'Dual Zone Wine Fridges for Sale Australia',
    description: 'Buy dual zone wine fridges that hold reds and whites at different temperatures. Compare capacity and price, delivered Australia-wide.',
  },
  '/bar-fridges/kegerators-dispensers/single-tap/': {
    title: 'Single Tap Kegerators for Sale Australia',
    description: 'Buy single tap kegerators for home bars and small venues. Compare keg capacity and price, with delivery Australia-wide.',
  },
  '/bar-fridges/kegerators-dispensers/multi-tap/': {
    title: 'Multi-Tap Commercial Beer Dispensers for Sale',
    description: 'Buy multi-tap commercial beer dispensers and keg coolers for venues. Compare keg capacity and price, delivered Australia-wide.',
  },
  '/bar-fridges/combination-fridge-freezers/': {
    title: 'Bar Fridge Freezers for Sale | Combination Units',
    description: 'Buy combination bar fridge freezers with separate fridge and freezer sections. Compare capacity and prices, delivered Australia-wide.',
  },
  '/bar-fridges/combination-fridge-freezers/split-dual-temp/': {
    title: 'Dual Temperature Fridge Freezers for Sale Australia',
    description: 'Buy split dual temperature fridge freezers with chilled and frozen sections. Compare capacity and price, delivered Australia-wide.',
  },
  '/bar-fridges/outdoor-alfresco-fridges/single-door/': {
    title: 'Single Door Outdoor Bar Fridges for Sale Australia',
    description: 'Buy single door outdoor and alfresco bar fridges. Compare capacity and climate rating, with delivery Australia-wide.',
  },
  '/bar-fridges/outdoor-alfresco-fridges/double-door/': {
    title: 'Double Door Outdoor Bar Fridges for Sale Australia',
    description: 'Buy double door outdoor and alfresco bar fridges. Compare capacity and climate rating, with delivery Australia-wide.',
  },
  '/bar-fridges/outdoor-alfresco-fridges/triple-door/': {
    title: 'Triple Door Outdoor Bar Fridges for Sale Australia',
    description: 'Buy triple door outdoor and alfresco bar fridges. Compare capacity and climate rating, with delivery Australia-wide.',
  },
};

export const FRIDGE_COPY: Record<string, Copy> = {
  '/bar-fridges/under-bar-fridges/1-door/': { h1: 'Single Door Under Bar Fridges for Sale', intro: 'Single door under bar fridges suit compact bars and cafes. Measure the opening, allow ventilation and compare capacity in litres.' },
  '/bar-fridges/under-bar-fridges/2-door/': { h1: 'Double Door Under Bar Fridges for Sale', intro: 'Double door under bar fridges give more chilled storage for busy bars. Compare overall width, litres and finish before you buy.' },
  '/bar-fridges/under-bar-fridges/3-door/': { h1: 'Triple Door Under Bar Fridges for Sale', intro: 'Triple door under bar fridges give the most chilled storage beneath a long counter. Check the available width and the delivery route.' },
  '/bar-fridges/under-bar-fridges/solid-door/': { h1: 'Solid Door Under Bar Fridges for Sale', intro: 'Solid door under bar fridges suit storage beneath the counter and hold temperature well. Compare widths and capacity.' },
  '/bar-fridges/bottle-coolers/': { h1: 'Bottle Coolers for Sale in Australia', intro: 'Bottle coolers keep bottles and cans cold behind the bar. Compare 1, 2, 3 and 4 door models by width, capacity and finish.' },
  '/bar-fridges/bottle-coolers/1-door/': { h1: '1 Door Bottle Coolers for Sale', intro: '1 door bottle coolers suit compact bars and cafes. Compare width and capacity in each specification.' },
  '/bar-fridges/bottle-coolers/2-door/': { h1: '2 Door Bottle Coolers for Sale', intro: '2 door bottle coolers suit bars, pubs and function rooms. Compare width, capacity and finish.' },
  '/bar-fridges/bottle-coolers/3-door/': { h1: '3 Door Bottle Coolers for Sale', intro: '3 door bottle coolers hold more stock for busy venues. Check the available width before you order.' },
  '/bar-fridges/bottle-coolers/4-door/': { h1: '4 Door Bottle Coolers for Sale', intro: '4 door bottle coolers suit high-volume bars and clubs. Check the width and the delivery access.' },
  '/bar-fridges/back-bar-fridges/': { h1: 'Back Bar Fridges for Sale in Australia', intro: 'Back bar fridges sit behind the bar so staff can reach bottles quickly. Choose hinged or sliding glass doors and compare width and capacity.' },
  '/bar-fridges/back-bar-fridges/hinged-glass/': { h1: 'Hinged Glass Door Back Bar Fridges for Sale', intro: 'Hinged glass door back bar fridges open wide for easy loading. Leave room for the door swing.' },
  '/bar-fridges/back-bar-fridges/sliding-glass/': { h1: 'Sliding Glass Door Back Bar Fridges for Sale', intro: 'Sliding glass door back bar fridges save space where there is no room for a door swing. Compare widths and capacity.' },
  '/bar-fridges/beer-beverage-fridges/sub-zero-beer/': { h1: 'Sub-Zero Beer Fridges for Sale', intro: 'Sub-zero beer fridges chill beer colder than a standard fridge. Check the temperature range in each specification.' },
  '/bar-fridges/beer-beverage-fridges/beverage-merchandisers/': { h1: 'Beverage Merchandisers & Drink Fridges for Sale', intro: 'Beverage merchandisers display drinks behind glass doors in shops, cafes and venues. Compare capacity, width and lighting.' },
  '/bar-fridges/wine-fridges/single-zone/': { h1: 'Single Zone Wine Fridges for Sale', intro: 'Single zone wine fridges hold all bottles at one steady temperature. Compare bottle capacity and size.' },
  '/bar-fridges/wine-fridges/dual-zone/': { h1: 'Dual Zone Wine Fridges for Sale', intro: 'Dual zone wine fridges store reds and whites at different temperatures. Compare bottle capacity per zone.' },
  '/bar-fridges/kegerators-dispensers/single-tap/': { h1: 'Single Tap Kegerators for Sale', intro: 'Single tap kegerators suit home bars and small venues. Check the keg size and CO2 requirements.' },
  '/bar-fridges/kegerators-dispensers/multi-tap/': { h1: 'Multi-Tap Commercial Beer Dispensers for Sale', intro: 'Multi-tap dispensers pour several beers at once. Check keg capacity, tap count and gas requirements.' },
  '/bar-fridges/combination-fridge-freezers/': { h1: 'Bar Fridge Freezers for Sale in Australia', intro: 'Combination bar fridge freezers hold chilled and frozen stock in one cabinet. Compare the capacity of each section.' },
  '/bar-fridges/combination-fridge-freezers/split-dual-temp/': { h1: 'Dual Temperature Fridge Freezers for Sale', intro: 'Split dual temperature units have separate chilled and frozen sections. Compare the litres of each section.' },
  '/bar-fridges/outdoor-alfresco-fridges/single-door/': { h1: 'Single Door Outdoor Bar Fridges for Sale', intro: 'Single door outdoor fridges suit small alfresco areas. Check the rated operating temperature in each specification.' },
  '/bar-fridges/outdoor-alfresco-fridges/double-door/': { h1: 'Double Door Outdoor Bar Fridges for Sale', intro: 'Double door outdoor fridges hold more drinks for entertaining. Check the climate rating and ventilation needs.' },
  '/bar-fridges/outdoor-alfresco-fridges/triple-door/': { h1: 'Triple Door Outdoor Bar Fridges for Sale', intro: 'Triple door outdoor fridges suit large alfresco bars. Check the climate rating and ventilation needs.' },
};
