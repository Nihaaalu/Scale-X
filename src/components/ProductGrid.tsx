import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  emptySubtext?: string;
  className?: string;
  columns?: '3' | '4';
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = 'No scale models found',
  emptySubtext = 'Try adjusting your filters or search query to browse available models.',
  className = '',
  columns = '4'
}) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-zinc-900/30 border border-zinc-800/80 rounded-lg">
        <div className="w-14 h-14 rounded-full bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-center text-zinc-400 mb-4">
          <PackageOpen className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-white tracking-wide">
          {emptyMessage}
        </h3>
        <p className="mt-1 max-w-sm text-sm text-zinc-400 font-light">
          {emptySubtext}
        </p>
      </div>
    );
  }

  const gridColsClass =
    columns === '3'
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  return (
    <div className={`grid ${gridColsClass} gap-4 sm:gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
