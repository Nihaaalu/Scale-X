import React, { useState } from 'react';
import { X, CheckCircle2, Truck, Box, ArrowRight, PackageCheck, AlertCircle } from 'lucide-react';
import { useStore, CheckoutDetails } from '../context/StoreContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    freeShippingThreshold,
    completeCheckout,
    orderConfirmation,
    setOrderConfirmation,
    navigateTo
  } = useStore();

  const [formData, setFormData] = useState<CheckoutDetails>({
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    address: '742 Evergreen Terrace',
    city: 'Los Angeles',
    postalCode: '90001',
    country: 'United States',
    collectorNotes: 'Please pack securely with corner protection.',
    protectorCases: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen && !orderConfirmation) return null;

  const shippingFee = cartSubtotal >= freeShippingThreshold || cart.length === 0 ? 0 : 7.95;
  const finalTotal = cartSubtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      completeCheckout(formData);
      setIsSubmitting(false);
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    if (orderConfirmation) {
      setOrderConfirmation(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl text-zinc-100">
          {/* Header */}
          <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
              <span className="text-xs font-mono-spec uppercase tracking-widest text-zinc-400">
                ScaleX Order Simulation
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-850 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success State */}
          {orderConfirmation ? (
            <div className="p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-5 shadow-lg shadow-emerald-950/50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono-spec text-emerald-400 uppercase tracking-widest font-semibold">
                Order Simulated
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1 mb-2">
                Thank You, Collector!
              </h2>
              <p className="text-sm text-zinc-400 max-w-md font-light mb-6">
                Your order simulation has been processed and logged.
              </p>

              {/* Order Info Card */}
              <div className="w-full bg-zinc-900/70 border border-zinc-800 rounded-lg p-5 text-left mb-6 font-mono-spec text-xs space-y-3">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Order Identifier:</span>
                  <span className="text-white font-bold">{orderConfirmation.orderNumber}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Date Logged:</span>
                  <span className="text-zinc-300">{orderConfirmation.date}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Delivery Destination:</span>
                  <span className="text-zinc-300 text-right truncate max-w-[280px]">
                    {orderConfirmation.customer.address}, {orderConfirmation.customer.city}
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-1">
                  <span className="text-zinc-300 font-heading uppercase font-bold">Total:</span>
                  <span className="text-white font-bold">${orderConfirmation.total.toFixed(2)} USD</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    handleClose();
                    navigateTo('shop');
                  }}
                  className="px-6 py-2.5 bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Return to Store Status
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-heading font-bold text-white">Checkout Simulation</h2>
                  <p className="text-xs text-zinc-400 font-light mt-0.5">
                    Demonstration order processing.
                  </p>
                </div>
                <span className="text-xs font-mono-spec font-bold text-zinc-300 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
                  {cart.length} Models
                </span>
              </div>

              {/* Notice */}
              <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                  <strong className="text-zinc-300">Frontend Simulation:</strong> ScaleX is currently in its pre-launch stage. No financial transactions take place.
                </p>
              </div>

              {/* Address Fields */}
              <div className="space-y-4">
                <span className="text-xs font-mono-spec uppercase tracking-wider text-zinc-400">
                  Shipping Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-zinc-400 font-mono-spec mb-1 text-[11px]">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-zinc-500 font-mono-spec"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-mono-spec mb-1 text-[11px]">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-zinc-500 font-mono-spec"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-zinc-400 font-mono-spec mb-1 text-[11px]">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-zinc-500 font-mono-spec"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-mono-spec mb-1 text-[11px]">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-zinc-500 font-mono-spec"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-mono-spec mb-1 text-[11px]">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-zinc-500 font-mono-spec"
                    />
                  </div>
                </div>
              </div>

              {/* Special Packing Notes */}
              <div>
                <label className="block text-zinc-400 font-mono-spec mb-1 text-[11px]">
                  Packing Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.collectorNotes}
                  onChange={(e) => setFormData({ ...formData, collectorNotes: e.target.value })}
                  placeholder="Special instructions..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-200 text-xs focus:outline-none focus:border-zinc-500 font-mono-spec"
                />
              </div>

              {/* Order Total Breakdown */}
              <div className="pt-4 border-t border-zinc-800 space-y-1.5 text-xs font-mono-spec">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="text-white">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Estimated Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex justify-between text-base">
                  <span className="font-heading font-bold text-white uppercase">Total</span>
                  <span className="font-mono-spec font-bold text-white">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                    <span>Processing Simulation...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Order Simulation (${finalTotal.toFixed(2)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-500 font-mono-spec">
                <span className="flex items-center gap-1">
                  <Box className="w-3.5 h-3.5" /> Carefully Packaged Shipments
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
