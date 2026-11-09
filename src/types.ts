export type ProductCategory = 'Buah' | 'Sayur' | 'Paket Hemat' | 'Organik';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  soldCount: number;
  stock: number;
  unit: string;
  farmerName: string;
  farmerLoc: string;
  image: string;
  gallery?: string[];
  desc: string;
  isBestSeller?: boolean;
  harvestTime?: string;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  qty: number;
}

export type OrderStatus = 'Perlu Diproses' | 'Dalam Pengiriman' | 'Selesai';

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
  unit: string;
  image?: string;
}

export interface SellerOrder {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  courier: string;
  resi: string;
  notes?: string;
}

export type AppRole = 'buyer' | 'seller';
export type DeviceMode = 'laptop' | 'mobile';
export type SellerTab = 'dashboard' | 'products' | 'orders' | 'profile';
