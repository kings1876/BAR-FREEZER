'use client';
import React from 'react';

// Practical checks that apply to any commercial fridge or freezer purchase.
export function BuyingChecklist() {
  return (
    <section aria-label="Before you order" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-base font-bold text-slate-900">Before you order</h2>
      <p className="mt-1 text-xs text-slate-600 max-w-3xl">
        Measure the space including door swing and the ventilation clearance in the manufacturer's instructions, and check that the doorways and stairs on the delivery route are wide enough. Leave room to open the door fully and to reach the back for cleaning, keep the unit away from ovens and direct sunlight, and plan where the power cord and any drain will run before it arrives.
      </p>
      <p className="mt-2 text-xs text-slate-600 max-w-3xl">
        Confirm that the electrical supply listed on the product page suits your outlet, and choose a glass or solid door to match how often it is opened and whether the contents should be on show. Compare the listed capacity with what you need to store at peak trade, and check the temperature range suits the drinks or food you plan to keep in it, since a fridge and a freezer are not interchangeable.
      </p>
      <p className="mt-2 text-xs text-slate-600 max-w-3xl">
        Prices on this site are in Australian dollars and include GST, and the availability of each model is shown on its product page. If you are comparing models or are unsure which size suits your venue, send us the model numbers and the space available and we will reply.
      </p>
      <p className="mt-2 text-xs text-slate-600 max-w-3xl">
        Specifications are published as supplied by the manufacturer or supplier, so open any product page to check the dimensions, capacity, power, refrigerant, climate class and warranty before you order. If two models look similar, use the compare tool to see their specifications side by side, and read the buying guides for help with sizing, ventilation and finishes.
      </p>
      <p className="mt-2 text-xs text-slate-600 max-w-3xl">
        Photos are supplied by the manufacturer or supplier, and the finish or fittings can differ slightly between batches. If you need a part for older equipment, send us the make, model and any numbers from the data plate together with the product code, and we will help you find the right item before you order.
      </p>
      <p className="mt-2 text-xs text-slate-600 max-w-3xl">
        Delivery areas and timing are explained on the <a className="underline" href="/delivery/">delivery page</a>, the terms that apply after purchase are on the <a className="underline" href="/warranty/">warranty page</a> and the <a className="underline" href="/returns/">returns page</a>, and trade buyers ordering for a venue can ask for pricing on the <a className="underline" href="/trade/">trade page</a>.
      </p>
    </section>
  );
}

// Plain anchors that crawlers can follow. Items arrive as compact [slug, name] pairs: rendering the list
// here instead of as a server element tree keeps the page's data payload small.
export function ProductLinkList({ title, aria, items, checklist = true }: { title: string; aria: string; items: [string, string][]; checklist?: boolean }) {
  if (!items.length) return null;
  return (
    <div className="bg-slate-50 pb-12">
      <nav aria-label={aria} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-xs text-slate-600 max-w-3xl">
          Each model below links to its own page with the full specification, dimensions, capacity, power details and price in Australian dollars including GST. Open two or more and use the compare tool to see them side by side, or send a quote request if you need several units delivered.
        </p>
        <div className="mt-3 columns-1 sm:columns-2 lg:columns-3 gap-6 text-xs">
          {items.map(([slug, name]) => (
            <a key={slug} href={`/product/${slug}/`} className="block break-inside-avoid py-0.5 text-slate-700 hover:text-cyan-700 hover:underline">{name}</a>
          ))}
        </div>
      </nav>
      {checklist && <BuyingChecklist />}
    </div>
  );
}
