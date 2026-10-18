import React from 'react';
import { Snowflake, ShieldCheck, Zap, Thermometer, Layers } from 'lucide-react';
import { Product } from '../types';

interface ProductImageProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

/**
 * Clean commercial 4:3 placeholder product visualizer.
 * Renders high-fidelity, scalable SVG schematics of Australian commercial refrigeration equipment
 * matching the user's requirement: "clean white 4:3 frame, object-fit contain".
 */
export const ProductImage: React.FC<ProductImageProps> = ({ product, className = "h-48", priority = false }) => {
  const isStainless = product.finish === 'stainless';
  const isBlack = product.finish === 'black';
  const isGlass = product.doorType === 'glass';
  const isDrawer = product.doorStyle === 'drawer';
  const isUpright = product.heightMm > 1500;
  const isChest = product.doorType === 'lid';
  const isIce = product.categorySlug.includes('ice') || product.slug.includes('ice');

  // Surface colors
  const bodyFill = isBlack ? '#1e293b' : isStainless ? '#e2e8f0' : '#f8fafc';
  const bodyStroke = isBlack ? '#0f172a' : isStainless ? '#94a3b8' : '#cbd5e1';
  const highlightStroke = isBlack ? '#334155' : '#ffffff';
  const accentLight = isGlass ? '#38bdf8' : '#0284c7';

  if (product.images && product.images.length > 0) {
    const hasHeight = /(^|\s)h-/.test(className);
    return (
      <div className={`bg-white flex items-center justify-center overflow-hidden ${hasHeight ? "" : "aspect-[4/3]"} ${className}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          width={1200}
          height={900}
          loading={priority ? "eager" : "lazy"}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-[4/3] bg-white rounded-md border border-slate-100 flex items-center justify-center p-4 overflow-hidden group select-none ${className}`}>
      {/* Background subtle grid for engineering precision */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '16px 16px' }}
      />

      {/* Product Illustration */}
      <svg 
        className="w-full h-full max-h-[85%] max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105" 
        viewBox="0 0 280 210" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`${product.name} technical illustration`}
      >
        <defs>
          <linearGradient id={`grad-steel-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="30%" stopColor="#e2e8f0" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id={`grad-glass-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.25)" />
            <stop offset="50%" stopColor="rgba(186, 230, 253, 0.15)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0.3)" />
          </linearGradient>
          <linearGradient id={`grad-dark-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* Shadow under unit */}
        <ellipse cx="140" cy="195" rx={isUpright ? 60 : 105} ry="8" fill="#0f172a" fillOpacity="0.08" />

        {/* Chassis */}
        {isUpright ? (
          // Upright Single/Double tall unit
          <g>
            {/* Main Tall Cabinet */}
            <rect x="85" y="20" width="110" height="170" rx="4" fill={isBlack ? `url(#grad-dark-${product.id})` : isStainless ? `url(#grad-steel-${product.id})` : '#f8fafc'} stroke={bodyStroke} strokeWidth="2.5" />
            {/* Top Lightbox / Branding Canopy */}
            <rect x="91" y="26" width="98" height="20" rx="2" fill="#0284c7" fillOpacity="0.85" />
            <text x="140" y="40" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" letterSpacing="1">{product.brand.toUpperCase()}</text>
            
            {/* Glass or Solid Door Area */}
            {isGlass ? (
              <g>
                <rect x="91" y="52" width="98" height="120" rx="3" fill={`url(#grad-glass-${product.id})`} stroke="#38bdf8" strokeWidth="1.5" />
                {/* Internal Wire Shelves */}
                <line x1="95" y1="76" x2="185" y2="76" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="95" y1="104" x2="185" y2="104" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="95" y1="132" x2="185" y2="132" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="95" y1="160" x2="185" y2="160" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="3 2" />
                {/* Vertical illuminated LED light tubes */}
                <line x1="94" y1="56" x2="94" y2="168" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.8" />
                <line x1="186" y1="56" x2="186" y2="168" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.8" />
                {/* Glass reflections */}
                <line x1="105" y1="60" x2="125" y2="160" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" />
                {/* Full-length Door Handle */}
                <rect x="178" y="70" width="4" height="60" rx="2" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
              </g>
            ) : (
              <g>
                <rect x="91" y="52" width="98" height="120" rx="2" fill={bodyFill} stroke={bodyStroke} strokeWidth="1.5" />
                <line x1="91" y1="112" x2="189" y2="112" stroke={highlightStroke} strokeWidth="1" strokeOpacity="0.6" />
                <rect x="178" y="75" width="4" height="40" rx="2" fill="#64748b" />
                {product.doorCount > 1 && <rect x="178" y="125" width="4" height="40" rx="2" fill="#64748b" />}
              </g>
            )}
            {/* Castors / Feet */}
            <circle cx="100" cy="192" r="4" fill="#334155" />
            <circle cx="180" cy="192" r="4" fill="#334155" />
          </g>
        ) : isChest ? (
          // Chest freezer
          <g>
            <rect x="40" y="65" width="200" height="115" rx="5" fill={isStainless ? `url(#grad-steel-${product.id})` : '#f8fafc'} stroke={bodyStroke} strokeWidth="2.5" />
            {/* Sliding glass or solid lids */}
            <rect x="46" y="72" width="92" height="24" rx="3" fill={`url(#grad-glass-${product.id})`} stroke="#38bdf8" strokeWidth="1.5" />
            <rect x="142" y="72" width="92" height="24" rx="3" fill={`url(#grad-glass-${product.id})`} stroke="#38bdf8" strokeWidth="1.5" />
            {/* Handle Grips */}
            <rect x="80" y="79" width="24" height="8" rx="2" fill="#475569" />
            <rect x="176" y="79" width="24" height="8" rx="2" fill="#475569" />
            {/* Protective Bumper rail */}
            <rect x="40" y="130" width="200" height="6" fill="#cbd5e1" />
            {/* Castors */}
            <circle cx="65" cy="183" r="4" fill="#334155" />
            <circle cx="215" cy="183" r="4" fill="#334155" />
          </g>
        ) : (
          // Underbar / Undercounter / Back Bar standard horizontal commercial unit
          <g>
            {/* Stainless / Black Benchtop worktop */}
            <rect x="35" y="55" width="210" height="120" rx="4" fill={isBlack ? `url(#grad-dark-${product.id})` : isStainless ? `url(#grad-steel-${product.id})` : '#f8fafc'} stroke={bodyStroke} strokeWidth="2.5" />
            {/* Heavy-duty Stainless Top Rim */}
            <rect x="33" y="52" width="214" height="12" rx="2" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />

            {/* Front kickplate / ventilation louvres (Front-breathing) */}
            <rect x="45" y="152" width="190" height="18" rx="2" fill="#1e293b" />
            <line x1="55" y1="158" x2="135" y2="158" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="55" y1="164" x2="135" y2="164" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 2" />
            
            {/* Digital Temp Controller Display (e.g. Dixell -20°C in red/blue) */}
            <rect x="195" y="156" width="32" height="10" rx="1.5" fill="#020617" stroke="#334155" strokeWidth="0.8" />
            <text x="211" y="164" fill={product.tempRange.includes('-') ? '#38bdf8' : '#ef4444'} fontSize="6.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {product.tempRange.split(' ')[0]}
            </text>

            {/* Doors or Drawers */}
            {isDrawer ? (
              // 2-Drawer horizontal setup
              <g>
                <rect x="45" y="70" width="190" height="36" rx="2" fill={bodyFill} stroke={bodyStroke} strokeWidth="1.5" />
                <rect x="110" y="82" width="60" height="6" rx="2" fill="#64748b" />
                <rect x="45" y="110" width="190" height="36" rx="2" fill={bodyFill} stroke={bodyStroke} strokeWidth="1.5" />
                <rect x="110" y="122" width="60" height="6" rx="2" fill="#64748b" />
              </g>
            ) : product.doorCount === 1 ? (
              // Single door underbar
              <g>
                <rect x="65" y="70" width="150" height="78" rx="3" fill={isGlass ? `url(#grad-glass-${product.id})` : bodyFill} stroke={isGlass ? '#38bdf8' : bodyStroke} strokeWidth="1.5" />
                {isGlass && (
                  <>
                    <line x1="72" y1="95" x2="208" y2="95" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="3 2" />
                    <line x1="72" y1="120" x2="208" y2="120" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="3 2" />
                  </>
                )}
                <rect x="198" y="90" width="6" height="38" rx="2" fill="#64748b" />
                <circle cx="198" cy="80" r="2.5" fill="#334155" />
              </g>
            ) : product.doorCount === 2 ? (
              // 2-Door underbar
              <g>
                <rect x="42" y="70" width="94" height="78" rx="3" fill={isGlass ? `url(#grad-glass-${product.id})` : bodyFill} stroke={isGlass ? '#38bdf8' : bodyStroke} strokeWidth="1.5" />
                <rect x="144" y="70" width="94" height="78" rx="3" fill={isGlass ? `url(#grad-glass-${product.id})` : bodyFill} stroke={isGlass ? '#38bdf8' : bodyStroke} strokeWidth="1.5" />
                {isGlass && (
                  <>
                    <line x1="48" y1="95" x2="130" y2="95" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="3 2" />
                    <line x1="48" y1="120" x2="130" y2="120" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="3 2" />
                    <line x1="150" y1="95" x2="232" y2="95" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="3 2" />
                    <line x1="150" y1="120" x2="232" y2="120" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="3 2" />
                  </>
                )}
                {/* Handles */}
                <rect x="122" y="90" width="6" height="36" rx="2" fill="#64748b" />
                <rect x="152" y="90" width="6" height="36" rx="2" fill="#64748b" />
              </g>
            ) : (
              // 3-Door underbar
              <g>
                <rect x="42" y="70" width="61" height="78" rx="2.5" fill={isGlass ? `url(#grad-glass-${product.id})` : bodyFill} stroke={isGlass ? '#38bdf8' : bodyStroke} strokeWidth="1.5" />
                <rect x="109" y="70" width="61" height="78" rx="2.5" fill={isGlass ? `url(#grad-glass-${product.id})` : bodyFill} stroke={isGlass ? '#38bdf8' : bodyStroke} strokeWidth="1.5" />
                <rect x="176" y="70" width="61" height="78" rx="2.5" fill={isGlass ? `url(#grad-glass-${product.id})` : bodyFill} stroke={isGlass ? '#38bdf8' : bodyStroke} strokeWidth="1.5" />
                {/* Handles */}
                <rect x="94" y="92" width="4" height="32" rx="1.5" fill="#64748b" />
                <rect x="114" y="92" width="4" height="32" rx="1.5" fill="#64748b" />
                <rect x="228" y="92" width="4" height="32" rx="1.5" fill="#64748b" />
              </g>
            )}

            {/* Feet / Levellers */}
            <circle cx="55" cy="178" r="3.5" fill="#334155" />
            <circle cx="225" cy="178" r="3.5" fill="#334155" />
          </g>
        )}
      </svg>

      {/* Floating Badges (Subtle unboxed or technical markers) */}
      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none">
        <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-700 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs border border-slate-200">
          {product.brand}
        </span>
      </div>

      <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 text-[11px] font-mono font-medium text-slate-600 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs border border-slate-200">
        <Thermometer className="w-3 h-3 text-cyan-600" />
        <span>{product.tempRange.split(' ')[0]}</span>
      </div>
    </div>
  );
};
