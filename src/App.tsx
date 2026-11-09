import React, { useState } from 'react';
import { AppRole, DeviceMode, ProductCategory, Product, CartItem, SellerOrder, SellerTab } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, formatRupiah } from './data/initialData';

import { TopController } from './components/TopController';
import { Toast } from './components/Toast';

// Buyer Components
import { BuyerNavbar } from './components/buyer/BuyerNavbar';
import { BuyerHero } from './components/buyer/BuyerHero';
import { ProductCard } from './components/buyer/ProductCard';
import { ProductDetailModal } from './components/buyer/ProductDetailModal';
import { CartDrawer } from './components/buyer/CartDrawer';
import { CheckoutModal } from './components/buyer/CheckoutModal';
import { OrderSuccessModal } from './components/buyer/OrderSuccessModal';
import { AboutModal } from './components/buyer/AboutModal';

// Seller Components
import { SellerNavbar } from './components/seller/SellerNavbar';
import { SellerDashboardTab } from './components/seller/SellerDashboardTab';
import { SellerProductsTab } from './components/seller/SellerProductsTab';
import { SellerOrdersTab } from './components/seller/SellerOrdersTab';
import { SellerProfileTab } from './components/seller/SellerProfileTab';
import { ProductModal } from './components/seller/ProductModal';
import { ShippingModal } from './components/seller/ShippingModal';
import { ShippingLabelModal } from './components/seller/ShippingLabelModal';

import { 
  Wifi, 
  BatteryMedium, 
  Signal, 
  SlidersHorizontal, 
  Search, 
  Heart,
  Store,
  RefreshCw
} from 'lucide-react';

export default function App() {
  // Mode & Role State
  const [currentRole, setCurrentRole] = useState<AppRole>('buyer');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('laptop');

  // Shared Data State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<SellerOrder[]>(INITIAL_ORDERS);
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], qty: 2 },
    { product: INITIAL_PRODUCTS[3], qty: 1 },
  ]);

  // Buyer Filtering & UI State
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'Semua'>('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'terpopuler' | 'harga_rendah' | 'harga_tinggi' | 'rating'>('terpopuler');
  const [deliveryLocation, setDeliveryLocation] = useState('Menteng, Jakarta Selatan');
  const [voucherCode, setVoucherCode] = useState('SOEKAPETANI');
  const [voucherDiscount, setVoucherDiscount] = useState(15000);

  // Modals State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastConfirmedOrder, setLastConfirmedOrder] = useState<SellerOrder | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Seller Dashboard State
  const [sellerTab, setSellerTab] = useState<SellerTab>('dashboard');
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [shippingOrderId, setShippingOrderId] = useState<string | null>(null);
  const [labelOrderId, setLabelOrderId] = useState<string | null>(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info' | 'warning'>('success');

  const showToast = (msg: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Switch role handler with feedback
  const handleRoleChange = (role: AppRole) => {
    setCurrentRole(role);
    if (role === 'seller') {
      showToast('🚜 Membuka Portal Mitra Petani (Penjual)');
    } else {
      showToast('🛒 Beralih ke Toko Pembeli');
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, qty: number = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      } else {
        return [...prev, { product, qty }];
      }
    });
    showToast(`${qty}x ${product.name} dimasukkan ke keranjang`);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Produk dihapus dari keranjang');
  };

  const handleBuyNow = (product: Product, qty: number) => {
    handleAddToCart(product, qty);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleApplyVoucher = (code: string) => {
    setVoucherCode(code);
    if (code === 'SOEKAPETANI') {
      setVoucherDiscount(15000);
      showToast('🎉 Voucher SOEKAPETANI aktif: Diskon Rp 15.000!');
    } else if (code === 'PANENHEMAT') {
      const sub = cart.reduce((acc, it) => acc + it.product.price * it.qty, 0);
      const disc = Math.round(sub * 0.1);
      setVoucherDiscount(disc);
      showToast(`🎉 Voucher PANENHEMAT aktif: Diskon 10% (${formatRupiah(disc)})!`);
    }
  };

  const handleSuccessOrder = (newOrder: SellerOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    setLastConfirmedOrder(newOrder);
    showToast('🎉 Pesanan berhasil dibuat & masuk ke antrean petani!');
  };

  // Seller operations
  const handleSaveProduct = (prodData: Partial<Product>) => {
    if (prodData.id) {
      // Edit
      setProducts((prev) =>
        prev.map((p) => (p.id === prodData.id ? ({ ...p, ...prodData } as Product) : p))
      );
      showToast(`Produk "${prodData.name}" berhasil diperbarui!`);
    } else {
      // Add
      const newProd: Product = {
        id: 'p_' + Date.now(),
        name: prodData.name || 'Produk Baru',
        category: prodData.category || 'Buah',
        price: prodData.price || 20000,
        originalPrice: prodData.originalPrice,
        rating: 5.0,
        reviewsCount: 1,
        soldCount: 0,
        stock: prodData.stock || 50,
        unit: prodData.unit || '1 kg',
        farmerName: 'Kelompok Tani Sari Mulyani',
        farmerLoc: prodData.farmerLoc || 'Indramayu, Jawa Barat',
        image: prodData.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
        gallery: [prodData.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'],
        desc: prodData.desc || 'Hasil panen segar langsung dari kebun.',
        harvestTime: 'Petik Pagi 06:00 WIB',
        isBestSeller: false,
      };
      setProducts((prev) => [newProd, ...prev]);
      showToast(`Panen "${newProd.name}" berhasil ditambahkan ke etalase!`);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    const target = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast(`Produk "${target?.name || ''}" telah dihapus.`);
  };

  const handleAdjustStock = (productId: string, amount: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStock = Math.max(0, p.stock + amount);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
    showToast(`Stok diperbarui (${amount > 0 ? '+' : ''}${amount} kg)`);
  };

  const handleConfirmDispatch = (orderId: string, courier: string, resi: string, notes: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.orderId === orderId) {
          return {
            ...o,
            courier,
            resi,
            notes,
            status: 'Dalam Pengiriman',
          };
        }
        return o;
      })
    );
    showToast(`Pesanan ${orderId} siap di-pickup oleh ${courier}!`);
  };

  const handleMarkCompleted = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.orderId === orderId) {
          return { ...o, status: 'Selesai' };
        }
        return o;
      })
    );
    showToast(`Pesanan ${orderId} berhasil diselesaikan! Dana ditambahkan ke pendapatan.`);
  };

  const handleChangeLocation = () => {
    const locs = [
      'Menteng, Jakarta Selatan',
      'Sudirman, Jakarta Pusat',
      'Kelapa Gading, Jakarta Utara',
      'Serpong, Tangerang Selatan',
      'Pondok Indah, Jakarta Selatan',
    ];
    const nextLoc = locs[(locs.indexOf(deliveryLocation) + 1) % locs.length];
    setDeliveryLocation(nextLoc);
    showToast(`Alamat pengiriman diubah ke: ${nextLoc}`);
  };

  // Filtered products in Buyer view
  const buyerProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.farmerLoc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedBuyerProducts = [...buyerProducts].sort((a, b) => {
    if (sortBy === 'terpopuler') return b.soldCount - a.soldCount;
    if (sortBy === 'harga_rendah') return a.price - b.price;
    if (sortBy === 'harga_tinggi') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const pendingOrdersCount = orders.filter((o) => o.status === 'Perlu Diproses').length;
  const totalCartCount = cart.reduce((acc, it) => acc + it.qty, 0);

  const selectedShippingOrder = orders.find((o) => o.orderId === shippingOrderId) || null;
  const selectedLabelOrder = orders.find((o) => o.orderId === labelOrderId) || null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-800 flex flex-col font-sans">
      {/* ================= TOP CONTROLLER: VIEW & DEVICE SWITCHER ================= */}
      <TopController
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        deviceMode={deviceMode}
        onDeviceModeChange={setDeviceMode}
        pendingOrdersCount={pendingOrdersCount}
      />

      {/* ================= DEVICE WRAPPER ================= */}
      <div className={`w-full flex-1 flex flex-col ${deviceMode === 'mobile' ? 'p-2 sm:p-6 bg-slate-950' : 'bg-brand-cream'}`}>
        <div
          className={`w-full flex-1 flex flex-col bg-brand-cream text-slate-800 ${
            deviceMode === 'mobile' ? 'device-mobile-frame min-h-[780px] max-h-[880px] overflow-y-auto' : 'min-h-[calc(100vh-42px)]'
          }`}
        >
          {/* Simulated Mobile Device Notch & Status Bar (only shown in HP mockup mode) */}
          {deviceMode === 'mobile' && (
            <div className="sticky top-0 z-50 bg-slate-900 text-white text-[11px] px-6 py-2 flex items-center justify-between border-b border-slate-800">
              <span className="font-bold">09:41</span>
              <div className="w-20 h-4 bg-slate-950 rounded-full mx-auto" />
              <div className="flex items-center gap-1.5 text-slate-300">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <BatteryMedium className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

          {/* ================= 1. TOKO PEMBELI (BUYER INTERFACE) ================= */}
          {currentRole === 'buyer' && (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Navbar */}
                <BuyerNavbar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  cartCount={totalCartCount}
                  onOpenCart={() => setIsCartOpen(true)}
                  onSwitchToSeller={() => handleRoleChange('seller')}
                  onOpenAbout={() => setIsAboutOpen(true)}
                  deliveryLocation={deliveryLocation}
                  onChangeLocation={handleChangeLocation}
                />

                {/* Main Content Area */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 w-full">
                  {/* Hero Showcase (only shown when not searching and on Home/Semua) */}
                  {!searchTerm && selectedCategory === 'Semua' && (
                    <BuyerHero
                      onSelectCategory={setSelectedCategory}
                      onApplyVoucherClick={handleApplyVoucher}
                    />
                  )}

                  {/* Filter & Sort Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <span>{selectedCategory === 'Semua' ? 'Semua Komoditas Panen' : selectedCategory}</span>
                        <span className="text-xs font-bold text-brand-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {sortedBuyerProducts.length} Produk
                        </span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Dipetik segar setiap pagi dari mitra tani bersertifikat
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400 font-semibold hidden sm:inline flex items-center gap-1">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        Urutkan:
                      </span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-brand-800 shadow-xs cursor-pointer"
                      >
                        <option value="terpopuler">Terlaris / Paling Banyak Dibeli</option>
                        <option value="harga_rendah">Harga Terendah</option>
                        <option value="harga_tinggi">Harga Tertinggi</option>
                        <option value="rating">Rating Tertinggi</option>
                      </select>
                    </div>
                  </div>

                  {/* Products Grid */}
                  {sortedBuyerProducts.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl border border-slate-200/80 text-center text-slate-400 space-y-3">
                      <Search className="w-10 h-10 mx-auto text-slate-300" />
                      <h3 className="font-bold text-slate-700 text-sm">Tidak ada produk yang cocok</h3>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Coba gunakan kata kunci lain atau pilih kategori "Semua Hasil Panen".
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('Semua');
                        }}
                        className="px-4 py-2 bg-brand-800 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-brand-900 cursor-pointer"
                      >
                        Reset Pencarian
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
                      {sortedBuyerProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onSelect={setSelectedProduct}
                          onAddToCart={(p) => handleAddToCart(p, 1)}
                        />
                      ))}
                    </div>
                  )}
                </main>
              </div>

              {/* Buyer Footer */}
              <footer className="bg-slate-900 text-white text-xs mt-16 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-extrabold text-base text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      SoekaTani Nusantara
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Gerakan agri-tech menghubungkan langsung petani lokal Indonesia dengan keluarga modern tanpa tengkulak. Segar, adil, berdaya.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-300 mb-2">Area Jangkauan Pengiriman</h5>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      DKI Jakarta, Tangerang Selatan, Bekasi, Depok, dan Kota Bogor dengan proteksi armada Cold-Chain.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-300 mb-2">Portal & Kolaborasi Petani</h5>
                    <p className="text-slate-400 text-[11px] mb-3">
                      Apakah Anda kelompok tani yang ingin memasarkan panen langsung?
                    </p>
                    <button
                      onClick={() => handleRoleChange('seller')}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Store className="w-3.5 h-3.5" />
                      <span>Masuk ke Dashboard Petani</span>
                    </button>
                  </div>
                </div>
                <div className="border-t border-slate-800/80 py-3 text-center text-[10px] text-slate-500">
                  &copy; {new Date().getFullYear()} SoekaTani Indonesia. Hak Cipta Dilindungi &bull; Berdayakan Petani Negeri
                </div>
              </footer>
            </div>
          )}

          {/* ================= 2. PORTAL MITRA PETANI (SELLER INTERFACE) ================= */}
          {currentRole === 'seller' && (
            <div className="flex-1 flex flex-col justify-between bg-slate-50 min-h-screen">
              <div>
                {/* Seller Navbar */}
                <SellerNavbar
                  currentTab={sellerTab}
                  onTabChange={setSellerTab}
                  onOpenAddProduct={() => {
                    setProductToEdit(null);
                    setIsProductModalOpen(true);
                  }}
                  onSwitchToBuyer={() => handleRoleChange('buyer')}
                  productCount={products.length}
                  pendingOrdersCount={pendingOrdersCount}
                />

                {/* Seller Tab Workspaces */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
                  {sellerTab === 'dashboard' && (
                    <SellerDashboardTab
                      orders={orders}
                      products={products}
                      onOpenShippingModal={(orderId) => setShippingOrderId(orderId)}
                      onGoToOrders={() => setSellerTab('orders')}
                    />
                  )}

                  {sellerTab === 'products' && (
                    <SellerProductsTab
                      products={products}
                      onOpenAddModal={() => {
                        setProductToEdit(null);
                        setIsProductModalOpen(true);
                      }}
                      onEditProduct={(p) => {
                        setProductToEdit(p);
                        setIsProductModalOpen(true);
                      }}
                      onDeleteProduct={handleDeleteProduct}
                      onAdjustStock={handleAdjustStock}
                    />
                  )}

                  {sellerTab === 'orders' && (
                    <SellerOrdersTab
                      orders={orders}
                      onOpenShippingModal={(orderId) => setShippingOrderId(orderId)}
                      onOpenLabelModal={(orderId) => setLabelOrderId(orderId)}
                      onMarkCompleted={handleMarkCompleted}
                    />
                  )}

                  {sellerTab === 'profile' && (
                    <SellerProfileTab onShowToast={showToast} />
                  )}
                </main>
              </div>

              {/* Seller Footer */}
              <footer className="bg-slate-900 text-white text-[11px] py-4 px-6 border-t border-slate-800 text-center text-slate-400">
                Kelompok Tani Sari Mulyani &bull; Sistem Monitoring Panen & Logistik Terintegrasi SoekaTani
              </footer>
            </div>
          )}
        </div>
      </div>

      {/* ================= MODALS & DRAWERS ================= */}
      {/* Product Detail Modal (Buyer) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Cart Drawer (Buyer) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => setIsCheckoutOpen(true)}
        voucherCode={voucherCode}
        onApplyVoucher={handleApplyVoucher}
        voucherDiscount={voucherDiscount}
      />

      {/* Checkout Modal (Buyer) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        voucherDiscount={voucherDiscount}
        voucherCode={voucherCode}
        onSuccessOrder={handleSuccessOrder}
      />

      {/* Order Success Receipt Modal (Buyer) */}
      <OrderSuccessModal
        order={lastConfirmedOrder}
        onClose={() => setLastConfirmedOrder(null)}
        onSwitchToSeller={() => {
          setLastConfirmedOrder(null);
          handleRoleChange('seller');
          setSellerTab('orders');
        }}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Add / Edit Product Modal (Seller) */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        productToEdit={productToEdit}
        onSave={handleSaveProduct}
      />

      {/* Shipping Dispatch Modal (Seller) */}
      <ShippingModal
        isOpen={!!shippingOrderId}
        onClose={() => setShippingOrderId(null)}
        order={selectedShippingOrder}
        onConfirmDispatch={handleConfirmDispatch}
      />

      {/* Shipping Thermal Label Modal (Seller) */}
      <ShippingLabelModal
        isOpen={!!labelOrderId}
        onClose={() => setLabelOrderId(null)}
        order={selectedLabelOrder}
      />

      {/* Global Toast */}
      <Toast message={toastMessage} type={toastType} />
    </div>
  );
}
