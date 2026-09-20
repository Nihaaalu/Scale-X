export type ScaleType = '1:64' | '1:43' | '1:18' | '1:24';

export type ProductStatus = 'New' | 'Limited' | 'Preorder' | 'Out of Stock' | 'Best Seller';

export interface ProductSpecs {
  brand: string;
  scale: ScaleType;
  series: string;
  material: string;
  year: string;
  color: string;
  packaging: string;
  itemNumber?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'hot-wheels' | 'hot-wheels-rlc' | 'hot-wheels-team-transport' | 'mini-gt' | 'kaido-house' | 'cca';
  collection: string;
  scale: ScaleType;
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  description: string;
  stock: number;
  status: ProductStatus;
  isPreorder?: boolean;
  releaseDate?: string;
  rating: number;
  reviewCount: number;
  features: string[];
  specs: ProductSpecs;
  featured?: boolean;
  isNewArrival?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  itemCount?: number;
  featuredHighlights: string[];
}

export interface PreorderItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  scale: ScaleType;
  price: number;
  depositAmount?: number;
  expectedRelease: string;
  releaseStatus: 'Securing Allocation' | 'In Production' | 'Transit to Hub' | 'Final Wave';
  image: string;
  allocationPercent: number;
  editionSize?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  searchQuery: string;
  brands: string[];
  scales: ScaleType[];
  categories: string[];
  collections: string[];
  priceRange: [number, number];
  availability: ('in-stock' | 'preorder' | 'limited')[];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
}

export type PageRoute = 
  | 'home' 
  | 'shop' 
  | 'categories' 
  | 'preorders' 
  | 'about'
  | 'contact'
  | 'wishlist' 
  | 'account' 
  | 'product-details' 
  | 'category-view';
