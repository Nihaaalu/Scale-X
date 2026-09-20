import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Badge } from './Badge';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { addToCart, toggleWishlist, isInWishlist, navigateTo } = useStore();
  const isFavorited = isInWishlist(product.id);
  const [isAdding, setIsAdding] = useState(false);
  const isOutOfStock = product.status === 'Out of Stock' || product.stock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCardClick = () => {
    navigateTo('product-details', { productId: product.id });
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative flex flex-col bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/60 cursor-pointer ${className}`}
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-4/3 sm:aspect-square bg-gradient-to-b from-zinc-800/40 to-zinc-950/80 overflow-hidden flex items-center justify-center p-4">
        {/* Subtle grid background for automotive studio feel */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* Product Image with smooth zoom on hover */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain object-center transform transition-transform duration-500 ease-out group-hover:scale-108 drop-shadow-2xl"
        />

        {/* Status Badge Top-Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <Badge status={product.status} />
        </div>

        {/* Scale Pill Top-Right */}
        <div className="absolute top-3 right-12 z-10">
          <Badge status={product.scale} variant="scale" />
        </div>

        {/* Wishlist Button Top-Right Corner */}
        <button
          onClick={handleWishlist}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isFavorited
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              : 'bg-zinc-900/70 text-zinc-400 hover:text-white hover:bg-zinc-800/90 border border-zinc-700/60'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View overlay on hover (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/80 backdrop-blur-md text-xs font-mono-spec text-zinc-300 border border-zinc-700/60 shadow-lg">
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect Spec</span>
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1 p-4 bg-zinc-900/40 border-t border-zinc-800/60">
        {/* Brand & Collection */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-mono-spec font-medium tracking-wider text-zinc-400 uppercase truncate">
            {product.brand}
          </span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest truncate hidden xs:inline">
            {product.collection}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors duration-200 line-clamp-2 min-h-[2.5rem] leading-snug">
          {product.name}
        </h3>

        {/* Price & Stock info */}
        <div className="mt-3 pt-3 border-t border-zinc-800/60 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold font-mono-spec text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono-spec text-zinc-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <span className={`text-[11px] font-mono-spec ${isOutOfStock ? 'text-zinc-500' : 'text-zinc-400'}`}>
            {isOutOfStock ? 'Sold Out' : `${product.stock} available`}
          </span>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-3">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold tracking-wider uppercase rounded transition-all duration-200 ${
              isOutOfStock
                ? 'bg-zinc-800/50 text-zinc-500 border border-zinc-800 cursor-not-allowed'
                : isAdding
                ? 'bg-emerald-600 text-white border border-emerald-500 shadow-md shadow-emerald-950/40'
                : 'bg-zinc-800/90 hover:bg-zinc-100 text-zinc-200 hover:text-zinc-900 border border-zinc-700/80 hover:border-zinc-200 active:scale-[0.98]'
            }`}
          >
            {isOutOfStock ? (
              <span>Out of Stock</span>
            ) : isAdding ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
