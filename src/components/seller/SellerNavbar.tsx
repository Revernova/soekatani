import React from 'react';
import { SellerTab } from '../../types';
import { Wheat, Plus, ArrowLeft, BarChart3, Package, Truck, Store, ShieldCheck } from 'lucide-react';

interface SellerNavbarProps {
  currentTab: SellerTab;
  onTabChange: (tab: SellerTab) => void;
  onOpenAddProduct: () => void;
  onSwitchToBuyer: () => void;
  productCount: number;
  pendingOrdersCount: number;
}

export const SellerNavbar: React.FC<SellerNavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenAddProduct,
  onSwitchToBuyer,
  productCount,
  pendingOrdersCount,
}) => {
  return (
    <nav className="bg-slate-900 text-white sticky top-11 z-40 border-b border-slate-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500 text-slate-950 flex items-center justify-center font-extrabold text-xl shadow">
            <Wheat className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white">Mitra Petani Dashboard</span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Terverifikasi</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Kelompok Tani Sari Mulyani &bull; Kebun Indramayu</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddProduct}
            className="px-3.5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Tambah Hasil Panen</span>
          </button>
          <button
            onClick={onSwitchToBuyer}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs flex items-center gap-1.5 border border-slate-700 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Toko Pembeli</span>
          </button>
        </div>
      </div>

      {/* Secondary Tab Menu for Seller */}
      <div className="border-t border-slate-800/80 px-4 sm:px-6 bg-slate-950/60 overflow-x-auto text-xs py-1.5 scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2.5 font-semibold text-slate-300">
          <button
            onClick={() => onTabChange('dashboard')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentTab === 'dashboard'
                ? 'text-emerald-400 bg-slate-800 font-bold'
                : 'hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Ringkasan & Statistik</span>
          </button>

          <button
            onClick={() => onTabChange('products')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentTab === 'products'
                ? 'text-emerald-400 bg-slate-800 font-bold'
                : 'hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Kelola Produk ({productCount})</span>
          </button>

          <button
            onClick={() => onTabChange('orders')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentTab === 'orders'
                ? 'text-emerald-400 bg-slate-800 font-bold'
                : 'hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Pengiriman & Pesanan</span>
            {pendingOrdersCount > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('profile')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentTab === 'profile'
                ? 'text-emerald-400 bg-slate-800 font-bold'
                : 'hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Profil Kebun & Logistik</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
