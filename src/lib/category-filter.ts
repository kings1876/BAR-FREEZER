// Which catalogue products belong to a category page. Used by the server (first products, counts) and by the
// category view once the full catalogue has loaded, so both always agree.
export function categoryProducts(all: any[], rootSlug: string, sub: any, type: any): any[] {
  return all.filter((p: any) => {
    const matchesRoot =
      (rootSlug === 'bar-freezers' && p.primaryCategory === 'Bar Freezers') ||
      (rootSlug === 'bar-fridges' && p.primaryCategory === 'Bar Fridges & Coolers') ||
      (rootSlug === 'accessories-parts' && p.primaryCategory === 'Accessories & Parts');
    if (!matchesRoot) return false;
    if (sub && p.categorySlug !== sub.slug) return false;
    if (type && p.type.toLowerCase() !== type.name.toLowerCase() && !p.name.toLowerCase().includes(type.name.toLowerCase())) return false;
    return true;
  });
}
