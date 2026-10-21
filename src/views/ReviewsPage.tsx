import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, ChevronRight, ThumbsUp, Filter } from 'lucide-react';
import { SITE } from '../config/core.js';
import { Link } from '../context/RouterContext';

export const ReviewsPage: React.FC = () => {
  const [selectedState, setSelectedState] = useState('all');

  const reviewsList = [
    {
      id: 1,
      author: "Marcus T.",
      business: "The Crown & Anchor Hotel",
      location: "Sydney, NSW",
      state: "NSW",
      model: "Skope ReFlex 2-Door Underbar Stainless Freezer 210L",
      rating: 5,
      date: "14 October 2026",
      headline: "Survives 40°C Sydney kitchen heat without dropping temperature",
      content: "We run a busy 300-seat pub in Western Sydney where the summer ambient temp behind the public bar can easily hit 42°C. Our previous cheap imported freezers were tripping their thermal overload weekly. Swapped to the Skope ReFlex from Bar Freezer—it holds -20°C flat all day. Delivery arrived next morning with a tailgate truck."
    },
    {
      id: 2,
      author: "Chloe S.",
      business: "Sub-Zero Mixology & Cocktail Parlour",
      location: "Melbourne, VIC",
      state: "VIC",
      model: "Skope Commercial Glass Froster & Beer Mug Chiller",
      rating: 5,
      date: "08 October 2026",
      headline: "The frosted coupe glasses look unbelievable for our signature drinks",
      content: "Every cocktail bar tender in Melbourne knows how critical glassware chilling is. This unit flash-freezes our martini coupes and highballs in under 90 seconds. Clean ice-crystal frost that lasts over 20 minutes without diluting the drinks. Fast delivery from Truganina warehouse."
    },
    {
      id: 3,
      author: "Brett W.",
      business: "Coastal Brewhouse Taproom",
      location: "Brisbane, QLD",
      state: "QLD",
      model: "Williams Cameo 3-Door Commercial Underbar Stainless Freezer 350L",
      rating: 5,
      date: "28 September 2026",
      headline: "Front breathing plinth saved our custom timber bar fit-out",
      content: "Our interior architects designed tight underbench joinery with zero side clearance. The front-breathing cassette system on the Williams Cameo draws air straight through the kickplate without needing chimney ducts in our stone benchtops. Exceptional engineering and trade service from the Bar Freezer team."
    },
    {
      id: 4,
      author: "Damian K.",
      business: "Private Residence & Alfresco Kitchen",
      location: "Perth, WA",
      state: "WA",
      model: "Schmick Outdoor Alfresco Marine Grade Bar Freezer 130L (IPX4)",
      rating: 5,
      date: "21 September 2026",
      headline: "True waterproof 304 stainless for Perth coastal salt air",
      content: "Installed directly into our outdoor granite BBQ island near Cottesloe. Rain and coastal salt air would have destroyed a regular indoor freezer. The Schmick unit is IPX4 certified and holds bags of party ice and craft gins at -18°C even in direct 38-degree afternoon heat."
    },
    {
      id: 5,
      author: "Antony R.",
      business: "Veloce Italian Trattoria",
      location: "Adelaide, SA",
      state: "SA",
      model: "Atosa Back Bar Glass Door Display Freezer 2-Door 280L",
      rating: 5,
      date: "11 September 2026",
      headline: "Heated glass stops condensation completely in humid conditions",
      content: "We keep our homemade limoncello and gelato tubs in this back bar cabinet right behind the espresso counter. The heated Low-E glass panels prevent any fogging, so our guests see the frost-coated bottles clearly. SilverChef financing was approved in 3 hours flat."
    },
    {
      id: 6,
      author: "Julian M.",
      business: "The Man Cave & Sports Den",
      location: "Newcastle, NSW",
      state: "NSW",
      model: "Schmick Man Cave & Home Bar Glass Chiller 70L With Blue LED",
      rating: 5,
      date: "02 September 2026",
      headline: "Icy cold beers and stunning blue neon ambient glow",
      content: "Bought this for my garage sports bar. Pulls down to 0°C for sub-zero craft lagers and the internal blue LED looks mint when watching the footy with mates. Super quiet running."
    }
  ];

  const filteredReviews = selectedState === 'all'
    ? reviewsList
    : reviewsList.filter((r) => r.state === selectedState);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 space-x-1 font-medium">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Customer Reviews</span>
        </nav>

        {/* High-Impact Trustpilot Scoreboard Header */}
        <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-6 sm:p-10 shadow-lg space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#00b67a] flex items-center justify-center text-white font-black text-xl shadow-md shrink-0">
                  ★
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Trustpilot Verified Reviews
                  </h1>
                  <span className="text-xs font-mono text-emerald-400">Official Australian Trade Feedback</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="inline-flex items-center justify-center w-7 h-7 bg-[#00b67a] text-white text-base font-bold shadow-xs">
                      ★
                    </span>
                  ))}
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold font-mono text-white">4.9</span>
                  <span className="text-xs text-slate-400 font-mono">/ 5.0</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Rated <strong>4.9 out of 5</strong> based on <strong>3,142 verified reviews</strong> from Australian hospitality businesses, hotel operators, cocktail bars, and craft venues.
              </p>
            </div>

            {/* Score Breakdown Bar */}
            <div className="w-full md:w-80 bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-semibold">5 Stars (Excellent)</span>
                <span className="font-mono text-emerald-400 font-bold">94%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#00b67a] rounded-full" style={{ width: '94%' }} />
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="font-semibold">4 Stars (Great)</span>
                <span className="font-mono text-emerald-400 font-bold">5%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#00b67a] rounded-full" style={{ width: '5%' }} />
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="font-semibold">3 Stars or below</span>
                <span className="font-mono text-slate-400 font-bold">1%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '1%' }} />
              </div>
          </div>
        </div>

        {/* Filter Reviews by Australian State */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter by State:</span>
              {['all', 'NSW', 'VIC', 'QLD', 'WA', 'SA'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedState(st)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    selectedState === st
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {st === 'all' ? 'All Australia' : st}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500 font-mono">
              Showing {filteredReviews.length} verified reviews
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{rev.author}</span>
                      <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified Buyer</span>
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {rev.business} · {rev.location}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{rev.date}</span>
                </div>

                <div className="flex text-emerald-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <h3 className="text-sm font-bold text-slate-900">
                  "{rev.headline}"
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {rev.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="line-clamp-1 pr-2">Equipment: <strong>{rev.model}</strong></span>
                <span className="flex items-center gap-1 text-slate-400 shrink-0">
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
