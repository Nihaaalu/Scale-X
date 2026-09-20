import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, Package, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Badge } from './Badge';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartSubtotal,
    freeShippingThreshold,
    updateQuantity,
    removeFromCart,
    clearCart,
    setIsCheckoutOpen,
    navigateTo
  } = useStore();

  if (!isCartOpen) return null;

  const shippingFee = cartSubtotal >= freeShippingThreshold || cart.length === 0 ? 0 : 7.95;
  const grandTotal = cartSubtotal + shippingFee;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleViewProduct = (productId: string) => {
    setIsCartOpen(false);
    navigateTo('shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950/95 border-l border-zinc-800 text-zinc-100 flex flex-col shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-heading font-bold uppercase tracking-wider text-white">
                Store Cart
              </h2>
              <span className="px-2 py-0.5 text-xs font-mono-spec bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] font-mono-spec text-zinc-500 hover:text-zinc-300 transition-colors mr-2 cursor-pointer"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Pre-launch notification notice */}
          <div className="px-5 py-3 bg-zinc-900/40 border-b border-zinc-850 flex items-center gap-2 text-xs font-mono-spec text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span>ScaleX is currently preparing for launch.</span>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4">
                  <Package className="w-8 h-8" />
                </div>
                <h3 className="text-base font-heading font-semibold text-white">Your Cart is Empty</h3>
                <p className="mt-1.5 text-xs text-zinc-400 max-w-xs leading-relaxed">
                  ScaleX is getting ready to launch its first collection. When inventory goes live, selected models will appear here.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="mt-6 px-5 py-2.5 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs tracking-wider uppercase rounded transition-colors cursor-pointer"
                >
                  View Launch Status
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/80 transition-all"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => handleViewProduct(item.product.id)}
                    className="w-20 h-20 shrink-0 bg-zinc-950 rounded border border-zinc-800 flex items-center justify-center p-1.5 cursor-pointer overflow-hidden group"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono-spec uppercase tracking-wider text-zinc-400">
                          {item.product.brand}
                        </span>
                        <h4
                          onClick={() => handleViewProduct(item.product.id)}
                          className="text-xs font-semibold text-zinc-100 hover:text-white line-clamp-1 cursor-pointer transition-colors"
                        >
                          {item.product.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <Badge status={item.product.scale} variant="scale" />
                      <span className="text-xs font-mono-spec font-bold text-white">
                        ${item.product.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center border border-zinc-800 bg-zinc-950 rounded">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono-spec text-zinc-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-mono-spec font-bold text-zinc-200">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="p-5 bg-zinc-900/80 border-t border-zinc-800 flex flex-col gap-3">
              <div className="space-y-1.5 text-xs font-mono-spec">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex justify-between text-sm">
                  <span className="font-heading uppercase font-bold text-white tracking-wider">Total</span>
                  <span className="font-mono-spec font-bold text-white">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded transition-all shadow-lg active:scale-[0.99] cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
