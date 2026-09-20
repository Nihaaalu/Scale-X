import React from 'react';
import { FilterState, ScaleType } from '../types';
import { RotateCcw, Check, SlidersHorizontal } from 'lucide-react';

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  availableBrands: string[];
  availableCategories: { slug: string; name: string }[];
  availableCollections: string[];
  totalResults: number;
  className?: string;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

const SCALE_OPTIONS: ScaleType[] = ['1:64', '1:43', '1:18', '1:24'];

const AVAILABILITY_OPTIONS: { id: 'in-stock' | 'preorder' | 'limited'; label: string }[] = [
  { id: 'in-stock', label: 'In Stock' },
  { id: 'limited', label: 'Limited Run' },
  { id: 'preorder', label: 'Preorder' },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  availableBrands,
  availableCategories,
  availableCollections,
  totalResults,
  className = '',
  isMobileDrawer = false,
  onCloseMobileDrawer
}) => {
  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: next });
  };

  const toggleScale = (scale: ScaleType) => {
    const next = filters.scales.includes(scale)
      ? filters.scales.filter((s) => s !== scale)
      : [...filters.scales, scale];
    onFilterChange({ ...filters, scales: next });
  };

  const toggleCategory = (cat: string) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onFilterChange({ ...filters, categories: next });
  };

  const toggleAvailability = (avail: 'in-stock' | 'preorder' | 'limited') => {
    const next = filters.availability.includes(avail)
      ? filters.availability.filter((a) => a !== avail)
      : [...filters.availability, avail];
    onFilterChange({ ...filters, availability: next });
  };

  const toggleCollection = (collection: string) => {
    const next = filters.collections.includes(collection)
      ? filters.collections.filter((c) => c !== collection)
      : [...filters.collections, collection];
    onFilterChange({ ...filters, collections: next });
  };

  const handlePriceMax = (val: number) => {
    onFilterChange({ ...filters, priceRange: [filters.priceRange[0], val] });
  };

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.scales.length > 0 ||
    filters.categories.length > 0 ||
    filters.collections.length > 0 ||
    filters.availability.length > 0 ||
    filters.priceRange[1] < 100 ||
    filters.priceRange[0] > 0;

  return (
    <aside className={`flex flex-col gap-6 text-zinc-300 ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-heading font-bold uppercase tracking-wider text-white">
            Refine Catalog
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-[11px] font-mono-spec text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Scale Filter */}
      <div className="flex flex-col gap-2.5">
        <span className="text-xs font-mono-spec uppercase tracking-wider text-zinc-400">
          Scale Ratio
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {SCALE_OPTIONS.map((scale) => {
            const isSelected = filters.scales.includes(scale);
            return (
              <button
                key={scale}
                onClick={() => toggleScale(scale)}
                className={`py-1.5 px-3 text-xs font-mono-spec rounded border transition-all text-center ${
                  isSelected
                    ? 'bg-zinc-100 text-zinc-950 font-bold border-white shadow-sm'
                    : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200'
                }`}
              >
                {scale}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="flex flex-col gap-2.5 pt-4 border-t border-zinc-800/80">
        <div className="flex items-center justify-between text-xs font-mono-spec text-zinc-400">
          <span className="uppercase tracking-wider">Max Price</span>
          <span className="text-white font-bold">${filters.priceRange[1]} USD</span>
        </div>
        <input
          type="range"
          min="15"
          max="100"
          step="5"
          value={filters.priceRange[1]}
          onChange={(e) => handlePriceMax(Number(e.target.value))}
          className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
        />
        <div className="flex justify-between text-[10px] font-mono-spec text-zinc-500">
          <span>$15</span>
          <span>$50</span>
          <span>$100</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-col gap-2.5 pt-4 border-t border-zinc-800/80">
        <span className="text-xs font-mono-spec uppercase tracking-wider text-zinc-400">
          Category
        </span>
        <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
          {availableCategories.map((cat) => {
            const isSelected = filters.categories.includes(cat.slug);
            return (
              <label
                key={cat.slug}
                onClick={() => toggleCategory(cat.slug)}
                className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-zinc-800/40 cursor-pointer group select-none text-xs"
              >
                <span className={`transition-colors ${isSelected ? 'text-white font-medium' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                  {cat.name}
                </span>
                <div
                  className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-white border-white text-zinc-950'
                      : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-500'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="flex flex-col gap-2.5 pt-4 border-t border-zinc-800/80">
        <span className="text-xs font-mono-spec uppercase tracking-wider text-zinc-400">
          Brand Series
        </span>
        <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
          {availableBrands.map((brand) => {
            const isSelected = filters.brands.includes(brand);
            return (
              <label
                key={brand}
                onClick={() => toggleBrand(brand)}
                className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-zinc-800/40 cursor-pointer group select-none text-xs"
              >
                <span className={`transition-colors ${isSelected ? 'text-white font-medium' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                  {brand}
                </span>
                <div
                  className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-white border-white text-zinc-950'
                      : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-500'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800/80">
        <span className="text-xs font-mono-spec uppercase tracking-wider text-zinc-400">
          Availability
        </span>
        <div className="flex flex-col gap-1.5">
          {AVAILABILITY_OPTIONS.map((opt) => {
            const isSelected = filters.availability.includes(opt.id);
            return (
              <label
                key={opt.id}
                onClick={() => toggleAvailability(opt.id)}
                className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-zinc-800/40 cursor-pointer group select-none text-xs"
              >
                <span className={`transition-colors ${isSelected ? 'text-white font-medium' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                  {opt.label}
                </span>
                <div
                  className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-white border-white text-zinc-950'
                      : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-500'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Collection */}
      <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800/80">
        <span className="text-xs font-mono-spec uppercase tracking-wider text-zinc-400">
          Curated Collection
        </span>
        <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1">
          {availableCollections.map((col) => {
            const isSelected = filters.collections.includes(col);
            return (
              <label
                key={col}
                onClick={() => toggleCollection(col)}
                className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-zinc-800/40 cursor-pointer group select-none text-xs"
              >
                <span className={`truncate mr-2 transition-colors ${isSelected ? 'text-white font-medium' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                  {col}
                </span>
                <div
                  className={`w-3.5 h-3.5 shrink-0 rounded-sm flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-white border-white text-zinc-950'
                      : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-500'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Mobile Close / Apply Button */}
      {isMobileDrawer && onCloseMobileDrawer && (
        <div className="mt-auto pt-4 border-t border-zinc-800">
          <button
            onClick={onCloseMobileDrawer}
            className="w-full py-3 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs uppercase tracking-wider rounded transition-colors"
          >
            Show {totalResults} Models
          </button>
        </div>
      )}
    </aside>
  );
};
