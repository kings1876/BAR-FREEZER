import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { BRANDS } from '../config/core.js';
import { PRODUCTS } from '../config/products-data.js';

const ANY_PRICED = PRODUCTS.some((p: any) => p.price != null);

export interface FilterState {
  doors: number[];
  doorType: string[];
  widthRange: string[];
  capacityRange: string[];
  brand: string[];
  priceRange: string[];
  finish: string[];
  installation: string[];
  use: string[];
  power: string[];
  condition: string[];
  availability: string[];
  warrantyYears: number[];
  features: string[];
  searchKeyword: string;
}

export const initialFilterState: FilterState = {
  doors: [],
  doorType: [],
  widthRange: [],
  capacityRange: [],
  brand: [],
  priceRange: [],
  finish: [],
  installation: [],
  use: [],
  power: [],
  condition: [],
  availability: [],
  warrantyYears: [],
  features: [],
  searchKeyword: ''
};

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalProductsCount: number;
  filteredCount: number;
  isMobileDrawerOpen?: boolean;
  setIsMobileDrawerOpen?: (open: boolean) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  totalProductsCount,
  filteredCount,
  isMobileDrawerOpen = false,
  setIsMobileDrawerOpen
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    doors: true,
    brand: true,
    widthRange: true,
    priceRange: true,
    doorType: true,
    use: false,
    finish: false,
    installation: false,
    power: false,
    warranty: false,
    features: false
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxToggle = (
    field: keyof FilterState,
    value: string | number
  ) => {
    setFilters((prev) => {
      const arr = prev[field] as (string | number)[];
      const exists = arr.includes(value);
      const nextArr = exists ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [field]: nextArr };
    });
  };

  const resetAllFilters = () => {
    setFilters(initialFilterState);
  };

  const activeFiltersCount = 
    filters.doors.length +
    filters.doorType.length +
    filters.widthRange.length +
    filters.capacityRange.length +
    filters.brand.length +
    filters.priceRange.length +
    filters.finish.length +
    filters.installation.length +
    filters.use.length +
    filters.power.length +
    filters.condition.length +
    filters.availability.length +
    filters.warrantyYears.length +
    filters.features.length;

  const content = (
    <div className="space-y-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyan-600" />
          <span className="font-bold text-sm text-slate-900 uppercase tracking-wide">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="text-xs font-mono font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetAllFilters}
            className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Doors / Drawers */}
      <div className="border-b border-slate-100 pb-3">
        <button
          onClick={() => toggleSection('doors')}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider py-1 hover:text-cyan-700"
        >
          <span>Doors & Drawers</span>
          {openSections.doors ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.doors && (
          <div className="pt-2 space-y-1.5 text-xs text-slate-600">
            {[1, 2, 3, 4].map((d) => (
              <label key={d} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.doors.includes(d)}
                  onChange={() => handleCheckboxToggle('doors', d)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
                <span>{d} {d === 4 ? 'Door/Drawer or more' : 'Door / Drawer'}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 2. Brand */}
      <div className="border-b border-slate-100 pb-3">
        <button
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider py-1 hover:text-cyan-700"
        >
          <span>Brand</span>
          {openSections.brand ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.brand && (
          <div className="pt-2 max-h-48 overflow-y-auto space-y-1.5 text-xs text-slate-600 pr-1">
            {BRANDS.map((b: any) => (
              <label key={b.name} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.brand.includes(b.name)}
                  onChange={() => handleCheckboxToggle('brand', b.name)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
                <span>{b.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 3. Width (mm) */}
      <div className="border-b border-slate-100 pb-3">
        <button
          onClick={() => toggleSection('widthRange')}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider py-1 hover:text-cyan-700"
        >
          <span>Width (mm)</span>
          {openSections.widthRange ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.widthRange && (
          <div className="pt-2 space-y-1.5 text-xs text-slate-600">
            {[
              { label: 'Under 600 mm (Compact)', value: '<600' },
              { label: '600 - 900 mm (Standard)', value: '600-900' },
              { label: '900 - 1200 mm (2-Door)', value: '900-1200' },
              { label: '1200 - 1500 mm (Bench)', value: '1200-1500' },
              { label: '1500 - 1800 mm (3-Door)', value: '1500-1800' },
              { label: '1800 mm+ (High Volume)', value: '1800+' }
            ].map((w) => (
              <label key={w.value} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.widthRange.includes(w.value)}
                  onChange={() => handleCheckboxToggle('widthRange', w.value)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
                <span>{w.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 4. Price (AUD) */}
      {ANY_PRICED && (
      <div className="border-b border-slate-100 pb-3">
        <button
          onClick={() => toggleSection('priceRange')}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider py-1 hover:text-cyan-700"
        >
          <span>Price (AUD Incl. GST)</span>
          {openSections.priceRange ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.priceRange && (
          <div className="pt-2 space-y-1.5 text-xs text-slate-600">
            {[
              { label: 'Under $1,000 AUD', value: '<1000' },
              { label: '$1,000 - $2,000 AUD', value: '1000-2000' },
              { label: '$2,000 - $3,500 AUD', value: '2000-3500' },
              { label: '$3,500 - $5,000 AUD', value: '3500-5000' },
              { label: '$5,000+ AUD (Commercial Grade)', value: '5000+' }
            ].map((p) => (
              <label key={p.value} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.priceRange.includes(p.value)}
                  onChange={() => handleCheckboxToggle('priceRange', p.value)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
                <span>{p.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      )}

      {/* 5. Door Type */}
      <div className="border-b border-slate-100 pb-3">
        <button
          onClick={() => toggleSection('doorType')}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider py-1 hover:text-cyan-700"
        >
          <span>Door Configuration</span>
          {openSections.doorType ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.doorType && (
          <div className="pt-2 space-y-1.5 text-xs text-slate-600">
            {[
              { label: 'Solid Door (Max Thermal)', value: 'solid' },
              { label: 'Glass Door (Display & Heated)', value: 'glass' },
              { label: 'Sliding Doors (Walkway Space)', value: 'sliding' },
              { label: 'Pull-Out Drawers (Speed Reach)', value: 'drawer' },
              { label: 'Top Lid (Chest Freezers)', value: 'lid' }
            ].map((dt) => (
              <label key={dt.value} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.doorType.includes(dt.value)}
                  onChange={() => handleCheckboxToggle('doorType', dt.value)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
                <span>{dt.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 6. Intended Use */}
      <div className="border-b border-slate-100 pb-3">
        <button
          onClick={() => toggleSection('use')}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider py-1 hover:text-cyan-700"
        >
          <span>Application & Venue</span>
          {openSections.use ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.use && (
          <div className="pt-2 space-y-1.5 text-xs text-slate-600">
            {[
              { label: 'Heavy Commercial Venue', value: 'commercial' },
              { label: 'Outdoor / Alfresco Rated (IPX4)', value: 'outdoor-rated' },
              { label: 'Home Bar & Man Cave (Quiet)', value: 'home-bar' }
            ].map((u) => (
              <label key={u.value} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.use.includes(u.value)}
                  onChange={() => handleCheckboxToggle('use', u.value)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
                <span>{u.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 7. Finish */}
      <div className="border-b border-slate-100 pb-3">
        <button
          onClick={() => toggleSection('finish')}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider py-1 hover:text-cyan-700"
        >
          <span>Exterior Finish</span>
          {openSections.finish ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.finish && (
          <div className="pt-2 space-y-1.5 text-xs text-slate-600">
            {[
              { label: '304 Stainless Steel', value: 'stainless' },
              { label: 'Matte Commercial Black', value: 'black' },
              { label: 'Clean White Foodservice', value: 'white' }
            ].map((f) => (
              <label key={f.value} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.finish.includes(f.value)}
                  onChange={() => handleCheckboxToggle('finish', f.value)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
                <span>{f.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 8. Warranty Years */}
      <div className="pb-3">
        <button
          onClick={() => toggleSection('warranty')}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider py-1 hover:text-cyan-700"
        >
          <span>Australian Warranty</span>
          {openSections.warranty ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.warranty && (
          <div className="pt-2 space-y-1.5 text-xs text-slate-600">
            {[5, 4, 3, 2, 1].map((w) => (
              <label key={w} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.warrantyYears.includes(w)}
                  onChange={() => handleCheckboxToggle('warrantyYears', w)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
                <span>{w} Years On-Site Trade Warranty</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white p-4 rounded-lg border border-slate-200 shadow-xs h-fit sticky top-24">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setIsMobileDrawerOpen && setIsMobileDrawerOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <span className="font-bold text-slate-900">Refine Equipment</span>
                <button
                  onClick={() => setIsMobileDrawerOpen && setIsMobileDrawerOpen(false)}
                  className="p-1 rounded text-slate-500 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>

            <div className="pt-4 border-t border-slate-200 mt-6 sticky bottom-0 bg-white">
              <button
                onClick={() => setIsMobileDrawerOpen && setIsMobileDrawerOpen(false)}
                className="w-full py-2.5 px-4 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md"
              >
                Apply Filters ({filteredCount} items)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
