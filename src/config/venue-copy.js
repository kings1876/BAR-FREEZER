// On-page copy for the /venues/ pages. General buying guidance only: no performance statistics, prices, patron
// counts, certifications or warranty claims. Product details come from the catalogue pages themselves.
export const VENUE_COPY = {
  'pubs-hotels': {
    intro: 'Pubs and hotels need refrigeration that copes with constant door opening on busy nights. Compare under bar fridges, back bar fridges, bottle coolers, glass frosters, kegerators and ice machines for the front bar, and upright freezers for the kitchen.',
    tips: [
      'Count the metres of bar frontage first, then choose door counts and widths that fit without blocking staff movement.',
      'Glass doors help staff see stock at a glance. Solid doors suit storage that customers never see.',
      'Check the climate class and ventilation clearance for each unit, especially in a warm back bar or plant room.',
      'Plan ice, glass chilling and keg storage together so the bar layout flows.',
    ],
    setups: [
      { name: 'Small front bar', summary: 'A compact set for a lounge bar or secondary service point.', equipment: ['2-door under bar glass fridge', 'Single door under bar freezer', 'Ice bin or compact ice maker'] },
      { name: 'Standard public bar', summary: 'A typical set for a main public bar.', equipment: ['Two 3-door under bar fridges', 'Back bar glass froster', '2-drawer service freezer'] },
      { name: 'Multi-station venue', summary: 'A larger set for venues with several bars.', equipment: ['Several 3-door under bar fridges', 'Glass frosters for each station', 'Upright storage freezer', 'Commercial ice machine and insulated bin'] },
    ],
  },
  'cocktail-bars': {
    intro: 'Cocktail bars rely on cold glassware, ice and chilled spirits within arm\'s reach. Compare back bar fridges, under bar freezers, glass frosters and ice machines, and choose finishes that suit your fit-out.',
    tips: [
      'Keep ice storage and glass chilling close to the main well to cut walking time.',
      'A back bar fridge with glass doors doubles as a display for premium bottles.',
      'Check noise information if the bar is a quiet room, and place compressors where heat can escape.',
      'Allow for garnish and syrup storage in a small under bar fridge.',
    ],
    setups: [
      { name: 'Compact bar', summary: 'A small set for a craft cocktail station.', equipment: ['Compact glass froster', 'Single door under bar freezer', '2-door low back bar fridge'] },
      { name: 'Standard bar', summary: 'A balanced set with separate cold zones.', equipment: ['Double door under bar freezer', 'Countertop glass froster', '2-door display fridge'] },
      { name: 'Dual-station bar', summary: 'A larger set for bars with two stations.', equipment: ['Two under bar freezers', 'Two glass frosters', 'Upright merchandiser for bottles'] },
    ],
  },
  restaurants: {
    intro: 'Restaurants need bar and kitchen refrigeration that suits the dining room as well as the pass. Compare under counter fridges, wine fridges, bar fridges, upright freezers and ice machines.',
    tips: [
      'Choose quiet models for open dining rooms, and check the noise information on each product page.',
      'Wine fridges with dual zones let you serve reds and whites at their own temperatures.',
      'Match freezer size to how much prepared food you hold, not just peak service.',
      'Leave ventilation clearance around under counter units in tight kitchens.',
    ],
    setups: [
      { name: 'Small dining room', summary: 'A compact set for a bistro bar.', equipment: ['2-door under bar fridge', 'Single door under bench freezer'] },
      { name: 'Standard restaurant', summary: 'A typical set with wine and food storage.', equipment: ['Dual zone wine fridge', '2-door under bench glass fridge', 'Single door under bar freezer'] },
      { name: 'Large restaurant', summary: 'A larger set for high-volume service.', equipment: ['Several wine cabinets', 'Two 2-door under bar freezers', 'Under bar ice maker'] },
    ],
  },
  cafes: {
    intro: 'Cafes need compact refrigeration under the espresso bench and at the counter. Compare under counter fridges and freezers, display fridges, bench-top display freezers and bottle coolers.',
    tips: [
      'Measure the space under the machine and grinder, and check the height of the unit with its legs or castors.',
      'Choose a fridge that holds milk jugs and cold drinks without crowding.',
      'A glass door display fridge sells cold drinks and cakes without opening the door.',
      'Check shelf spacing for tall bottles and trays.',
    ],
    setups: [
      { name: 'Small cafe', summary: 'A compact set for a coffee counter.', equipment: ['Single door under bench fridge', 'Compact bench-top display freezer'] },
      { name: 'Standard cafe', summary: 'A typical set for a cafe with a small menu.', equipment: ['2-door under bench fridge', 'Single door under bench freezer'] },
      { name: 'Large cafe', summary: 'A larger set with retail display.', equipment: ['3-door stainless under bench fridge', 'Upright single glass door fridge', 'Chest freezer'] },
    ],
  },
  nightclubs: {
    intro: 'Nightclubs open the door constantly in warm rooms. Compare bottle coolers, back bar fridges, under bar freezers and chest freezers for ice, and check the climate class of each unit.',
    tips: [
      'Sliding glass doors save space where staff pass behind a crowded bar.',
      'Locks help secure stock when the bar is closed.',
      'Ventilation matters in a hot back bar. Allow the clearances in the manual.',
      'Plan extra ice storage for peak nights.',
    ],
    setups: [
      { name: 'Small club bar', summary: 'A compact set for a single bar.', equipment: ['2-door back bar fridge with lighting', 'Single door freezer for bottles'] },
      { name: 'Standard club bar', summary: 'A typical set for a main bar.', equipment: ['Two 3-door sliding glass bottle coolers', 'Shot freezer', 'Under bar freezer'] },
      { name: 'Multi-bar club', summary: 'A larger set for several bars.', equipment: ['Several 3-door bottle fridges', 'Several shot freezers', 'Chest freezers for ice'] },
    ],
  },
  'rsl-sports-clubs': {
    intro: 'RSL and sports clubs serve large crowds on match days and weekends. Compare back bar fridges, glass frosters, under bar freezers and kegerators that suit simple, reliable service.',
    tips: [
      'Choose simple digital controls that volunteers and casual staff can use.',
      'Plan for peak-day demand rather than average days.',
      'Consider kegerators or keg coolers if you pour draught beer.',
      'Check the warranty terms on each product before you order.',
    ],
    setups: [
      { name: 'Small clubroom', summary: 'A simple set for a members bar.', equipment: ['2-door solid door under bar fridge', 'Single door glass froster'] },
      { name: 'Standard club bar', summary: 'A typical set for a busy club bar.', equipment: ['Two 2-door glass back bar fridges', '2-door under bench freezer', 'Beer mug froster'] },
      { name: 'Large club', summary: 'A larger set for several service points.', equipment: ['Several 3-door bar coolers', 'Two double glass frosters', 'Upright 2-door kitchen freezer'] },
    ],
  },
  'bottle-shops': {
    intro: 'Bottle shops need glass door merchandisers to show stock and freezers for ice. Compare glass door beverage fridges, bottle coolers, display freezers and chest freezers.',
    tips: [
      'Glass door merchandisers sell the product, so check the lighting and glass type.',
      'Measure shelf spacing for tall bottles and cartons.',
      'Allow space for ice storage near the register.',
      'Check the electrical load if you run several units on one circuit.',
    ],
    setups: [
      { name: 'Small bottle shop', summary: 'A compact set for a boutique shop.', equipment: ['2-door upright glass merchandiser', 'Countertop display freezer'] },
      { name: 'Standard bottle shop', summary: 'A typical set for a neighbourhood shop.', equipment: ['Two 2-door upright glass display fridges', 'Sliding glass lid chest freezer for ice'] },
      { name: 'Large bottle shop', summary: 'A larger set for a high-traffic store.', equipment: ['Several 3-door glass upright merchandisers', 'Chest freezers for ice', 'Reserve chiller'] },
    ],
  },
  'catering-events': {
    intro: 'Caterers and event operators move refrigeration often. Compare castor-mounted freezers, bar chest freezers, bar fridges and kegerators that suit transport and quick set-up.',
    tips: [
      'Check weight and dimensions against your vehicle and doorways.',
      'Castors with brakes help in marquees and on uneven floors.',
      'Confirm the power draw and plug type for generators and extension leads.',
      'Pack units upright and let them settle before switching on.',
    ],
    setups: [
      { name: 'Small event', summary: 'A compact set for small functions.', equipment: ['Castor-mounted bench-top freezer', 'Insulated ice caddy'] },
      { name: 'Standard event', summary: 'A typical set for mid-size events.', equipment: ['Two castor-mounted 2-door under bar freezers', '2-tap kegerator'] },
      { name: 'Large event', summary: 'A larger set for festivals and expos.', equipment: ['Several mobile 2-door fridges', 'Bar chest freezers', 'Ice maker'] },
    ],
  },
  'food-trucks-mobile-bars': {
    intro: 'Food trucks and mobile bars have little space and limited power. Compare compact under counter fridges and freezers, and check height, power draw and door latches before you order.',
    tips: [
      'Measure the cut-out and the height, including legs or castors.',
      'Check the power draw against your generator or inverter.',
      'Choose models with locks or latches if the door might swing in transit.',
      'Allow ventilation, because heat builds quickly in a small vehicle.',
    ],
    setups: [
      { name: 'Small truck', summary: 'A compact set for a small vehicle.', equipment: ['600mm under counter slimline freezer', 'Single door under counter glass fridge with lock'] },
      { name: 'Standard truck', summary: 'A typical set for a mobile bar.', equipment: ['2-door low under bar fridge', 'Bench-top glass froster'] },
      { name: 'Large truck', summary: 'A larger set for a full kitchen.', equipment: ['2-door stainless worktop freezer', '2-door under counter prep fridge', 'Under bench ice maker'] },
    ],
  },
  'ice-cream-gelato-shops': {
    intro: 'Gelato and ice cream shops need display freezers at the counter and deep freezers in the back. Compare gelato display cabinets, scoop cabinets, counter-top displays and upright freezers.',
    tips: [
      'Check the number of pans each display holds, and the pan size.',
      'Curved or heated glass helps keep the display clear in humid conditions.',
      'Match back-of-house freezer size to your production batches.',
      'Allow clearance around the display for ventilation.',
    ],
    setups: [
      { name: 'Small shop', summary: 'A compact set for a counter display.', equipment: ['Countertop gelato display', 'Under bench reserve freezer'] },
      { name: 'Standard shop', summary: 'A typical set for a full gelato counter.', equipment: ['Ventilated gelato showcase', 'Upright single door freezer'] },
      { name: 'Large shop', summary: 'A larger set with production storage.', equipment: ['Two multi-pan ventilated showcases', '2-door upright freezer'] },
    ],
  },
  'breweries-distilleries': {
    intro: 'Breweries, taprooms and distilleries need keg cooling, glass chilling and display fridges. Compare kegerators, keg coolers, glass frosters and glass door fridges.',
    tips: [
      'Check keg sizes and the number of taps each dispenser supports.',
      'Plan gas and drainage for draught equipment.',
      'Use glass door fridges to display cans and crowlers.',
      'Allow space for cleaning access behind taps and lines.',
    ],
    setups: [
      { name: 'Small taproom', summary: 'A compact set for a tasting room.', equipment: ['Glass froster for rocks glasses', '2-door display chiller'] },
      { name: 'Standard taproom', summary: 'A typical set for a busy taproom.', equipment: ['Two 3-door under bar glass fridges for cans', '2-door glass froster for steins', 'Keg cooler'] },
      { name: 'Large venue', summary: 'A larger set for a brewery with retail.', equipment: ['Several 3-door merchandisers', 'Two glass frosters', 'Upright freezer for hops'] },
    ],
  },
  'home-bars-man-caves': {
    intro: 'A home bar or man cave needs a fridge that fits your cabinetry and suits a living space. Compare bar fridges, beer fridges, wine fridges, kegerators and bar freezers.',
    tips: [
      'Measure the cabinet opening and check whether the unit needs ventilation at the front or the back.',
      'Check noise information if the bar is in a living area.',
      'A glass door shows off your drinks. A solid door is simpler and holds temperature well.',
      'Check the climate class if the bar is in a garage or outdoors.',
    ],
    setups: [
      { name: 'Compact bar', summary: 'A small set for a corner bar.', equipment: ['600mm single glass door beverage fridge', 'Compact under bench bar freezer'] },
      { name: 'Entertainer\'s bar', summary: 'A typical set for a games room.', equipment: ['2-door glass bar fridge', 'Bar freezer for ice and spirits', '2-tap kegerator'] },
      { name: 'Premium bar', summary: 'A larger set for a fitted bar.', equipment: ['Dual zone wine cabinet', 'Integrated under bench freezer', 'Beer stein froster'] },
    ],
  },
  'alfresco-outdoor': {
    intro: 'Outdoor bars and alfresco areas expose refrigeration to heat, humidity and weather. Compare outdoor bar fridges, outdoor freezers and kegerators, and check each product\'s rated operating temperature.',
    tips: [
      'Use units that are made for outdoor use. Indoor fridges are not designed for heat and moisture.',
      'Place the fridge in shade and away from the barbecue where possible.',
      'Check the ventilation needs, particularly for built-in installations.',
      'Choose lockable doors if the area is shared or open to children.',
    ],
    setups: [
      { name: 'Small patio', summary: 'A compact set for a patio.', equipment: ['Single door alfresco fridge', 'Weather cover'] },
      { name: 'Standard alfresco bar', summary: 'A typical set for an outdoor kitchen.', equipment: ['2-door outdoor bar fridge', 'Outdoor-rated bar freezer'] },
      { name: 'Large entertaining area', summary: 'A larger set for entertaining.', equipment: ['3-door outdoor bar fridge', 'Outdoor-rated glass froster', 'Outdoor kegerator'] },
    ],
  },
  'caravans-boats': {
    intro: 'Caravans and boats need compact fridges that suit tight spaces. Most fridges we list run on 240V mains power, so check each specification for the supply, the size and the ventilation needs before you order.',
    tips: [
      'Confirm the power supply. Most listings are 240V, and 12V or 24V models are noted in the specification.',
      'Measure the space and allow ventilation around the unit.',
      'Check how the door is secured if the vehicle or vessel will move.',
      'Compare weight and capacity so the fridge suits your storage.',
    ],
    setups: [
      { name: 'Compact', summary: 'A small fridge for a caravan or cabin.', equipment: ['Compact upright fridge', 'Mounting bracket if supplied'] },
      { name: 'Standard', summary: 'A typical fridge for a boat or motorhome.', equipment: ['Dual zone fridge with lock', 'Ice storage'] },
      { name: 'Large', summary: 'A larger set for a cabin cruiser.', equipment: ['Stainless under bench drawer fridge', 'Beverage chiller'] },
    ],
  },
  'offices-staff-rooms': {
    intro: 'Offices and staff rooms need beverage fridges and ice storage that are simple to maintain. Compare glass door drink fridges, bar fridges, wine fridges and freezers.',
    tips: [
      'A lock keeps catering stock secure outside social hours.',
      'Check noise information for fridges in meeting areas.',
      'Choose a size that matches the number of staff and events.',
      'Allow ventilation clearance around the fridge.',
    ],
    setups: [
      { name: 'Small office', summary: 'A compact set for a staff kitchen.', equipment: ['Single door beverage fridge with lock', 'Compact freezer'] },
      { name: 'Standard office', summary: 'A typical set for a larger team.', equipment: ['2-door glass drinks fridge', 'Under bench freezer'] },
      { name: 'Large office', summary: 'A larger set with events.', equipment: ['Two 2-door beverage merchandisers', 'Wine and spirits cabinet', 'Under bench ice maker'] },
    ],
  },
};

// Short descriptors shown in menus and venue switchers (no performance claims).
export const VENUE_TAGLINE = {
  'pubs-hotels': 'Bar fridges, freezers and kegerators',
  'cocktail-bars': 'Back bar fridges and glass frosters',
  restaurants: 'Under counter fridges and wine fridges',
  cafes: 'Under bench fridges and display fridges',
  nightclubs: 'Bottle coolers and under bar freezers',
  'rsl-sports-clubs': 'Back bar fridges and kegerators',
  'bottle-shops': 'Glass door fridges and bottle coolers',
  'catering-events': 'Castor-mounted freezers and kegerators',
  'food-trucks-mobile-bars': 'Compact under counter fridges',
  'ice-cream-gelato-shops': 'Gelato display and deep freezers',
  'breweries-distilleries': 'Kegerators and glass frosters',
  'home-bars-man-caves': 'Bar fridges, wine fridges and kegerators',
  'alfresco-outdoor': 'Outdoor and alfresco bar fridges',
  'caravans-boats': 'Compact fridges for small spaces',
  'offices-staff-rooms': 'Drink fridges and staff room freezers',
};
