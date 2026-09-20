import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, PageRoute, PreorderItem } from '../types';
import { PRODUCTS } from '../data/products';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'cart' | 'wishlist';
  subtext?: string;
  image?: string;
}

export interface CheckoutDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  collectorNotes?: string;
  protectorCases: boolean;
}

export interface OrderConfirmation {
  orderNumber: string;
  date: string;
  items: CartItem[];
  total: number;
  customer: CheckoutDetails;
}

interface StoreContextType {
  // Navigation
  currentPage: PageRoute;
  selectedProductId: string | null;
  selectedCategorySlug: string | null;
  navigateTo: (page: PageRoute, params?: { productId?: string; categorySlug?: string; searchQuery?: string }) => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  freeShippingThreshold: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Preorder fast-add
  addPreorderToCart: (preorder: PreorderItem) => void;

  // Wishlist
  wishlist: string[];
  wishlistCount: number;
  wishlistProducts: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'cart' | 'wishlist', subtext?: string, image?: string) => void;
  removeToast: (id: string) => void;

  // Checkout modal
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orderConfirmation: OrderConfirmation | null;
  setOrderConfirmation: (order: OrderConfirmation | null) => void;
  completeCheckout: (details: CheckoutDetails) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'scalex_cart_v1';
const WISHLIST_STORAGE_KEY = 'scalex_wishlist_v1';
const FREE_SHIPPING_THRESHOLD = 75; // $75 USD

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);

  // Cart State with localStorage hydration
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with localStorage hydration
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Drawers & Overlays
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to persist cart:', e);
    }
  }, [cart]);

  // Persist Wishlist
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to persist wishlist:', e);
    }
  }, [wishlist]);

  // Scroll to top on route change
  const navigateTo = (page: PageRoute, params?: { productId?: string; categorySlug?: string; searchQuery?: string }) => {
    if (params?.productId) setSelectedProductId(params.productId);
    if (params?.categorySlug) setSelectedCategorySlug(params.categorySlug);
    if (params?.searchQuery !== undefined) setSearchQuery(params.searchQuery);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToast = (message: string, type: 'success' | 'info' | 'cart' | 'wishlist' = 'success', subtext?: string, image?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type, subtext, image }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock || 10) }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    addToast(
      `Added to Cart`,
      'cart',
      `${product.name} (Qty: ${quantity})`,
      product.image
    );
  };

  const addPreorderToCart = (preorder: PreorderItem) => {
    // Find matching or create a virtual product item
    const existing = PRODUCTS.find((p) => p.id === preorder.productId);
    const product: Product = existing || {
      id: preorder.productId,
      name: preorder.name,
      brand: preorder.brand,
      category: 'hot-wheels',
      collection: 'Preorder Exclusives',
      scale: preorder.scale,
      price: preorder.price,
      image: preorder.image,
      gallery: [preorder.image],
      description: `Official preorder reservation. Expected release ${preorder.expectedRelease}.`,
      stock: 5,
      status: 'Preorder',
      isPreorder: true,
      releaseDate: preorder.expectedRelease,
      rating: 5.0,
      reviewCount: 0,
      features: ['Official preorder reservation slot', 'Collector packaging guarantee', 'Numbered allocation certificate'],
      specs: {
        brand: preorder.brand,
        scale: preorder.scale,
        series: 'Upcoming Collector Series',
        material: 'Die-cast metal with rubber components',
        year: '2026/2027 Anticipated',
        color: 'Factory Prototype',
        packaging: 'Sealed Collector Box & Acrylic Protector'
      }
    };

    addToCart(product, 1);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        addToast('Removed from Wishlist', 'info', product.name, product.image);
        return prev.filter((id) => id !== product.id);
      } else {
        addToast('Saved to Wishlist', 'wishlist', product.name, product.image);
        return [...prev, product.id];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  // Computed values
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const wishlistCount = wishlist.length;

  const completeCheckout = (details: CheckoutDetails) => {
    const orderNum = 'SX-' + Math.floor(100000 + Math.random() * 900000);
    const confirmation: OrderConfirmation = {
      orderNumber: orderNum,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      total: cartSubtotal + (cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 7.95) + (details.protectorCases ? 4.99 : 0),
      customer: details,
    };
    setOrderConfirmation(confirmation);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        selectedProductId,
        selectedCategorySlug,
        navigateTo,
        cart,
        cartCount,
        cartSubtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        addToCart,
        addPreorderToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        wishlistCount,
        wishlistProducts,
        toggleWishlist,
        isInWishlist,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        toasts,
        addToast,
        removeToast,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orderConfirmation,
        setOrderConfirmation,
        completeCheckout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
