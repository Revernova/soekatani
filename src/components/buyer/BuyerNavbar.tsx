import React from 'react';
import { ShoppingBag, Search, MapPin, Store, Info, Sparkles, Leaf } from 'lucide-react';
import { ProductCategory } from '../../types';

interface BuyerNavbarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCategory: ProductCategory | 'Semua';
  onSelectCategory: (cat: ProductCategory | 'Semua') => void;
  cartCount: number;
  onOpenCart: () => void;
  onSwitchToSeller: () => void;
  onOpenAbout: () => void;
  deliveryLocation: string;
  onChangeLocation: () => void;
}

export const BuyerNavbar: React.FC<BuyerNavbarProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onSwitchToSeller,
  onOpenAbout,
  deliveryLocation,
  onChangeLocation,
}) => {
  return (
    <nav className="bg-brand-900 text-white sticky top-11 z-40 shadow-md">
      {/* Top Banner Notice */}
      <div className="bg-emerald-950/90 text-emerald-200 text-[11px] py-1.5 px-4 border-b border-emerald-800/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Panen Subuh Indramayu:
            </span>
            <span className="truncate">Garansi 100% Segar Langsung Petik &bull; Gratis Ongkir Cold-Chain &gt; Rp 50rb!</span>
          </div>
          <button 
            onClick={onChangeLocation}
            className="flex items-center gap-1 hover:text-white transition text-emerald-300 font-medium shrink-0 cursor-pointer text-[11px]"
          >
            <MapPin className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Lokasi Kirim:</span>
            <span className="underline decoration-dotted font-bold">{deliveryLocation}</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand */}
        <div 
          onClick={() => onSelectCategory('Semua')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-500 text-slate-950 flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5 leading-none">
              <span>SoekaTani</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold border border-emerald-500/30">Fresh</span>
            </div>
            <p className="text-[10px] text-emerald-200 font-medium tracking-wide mt-0.5">Petani Lokal &bull; Cold-Chain</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex-1 max-w-xl relative">
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari mangga harum manis, cabai keriting, tomat segar..."
              className="w-full bg-emerald-950/80 border border-emerald-700/70 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-400 hover:text-white"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            className="relative px-3.5 py-2 bg-emerald-800/80 hover:bg-emerald-700 rounded-xl text-white font-bold text-xs flex items-center gap-2 border border-emerald-700/60 shadow-xs transition active:scale-95 cursor-pointer"
            title="Keranjang Belanja"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Keranjang</span>
            {cartCount > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full min-w-4 text-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Secondary Categories & Quick Navigation */}
      <div className="bg-brand-900 border-t border-emerald-900/80 overflow-x-auto text-xs py-2 px-4 sm:px-6 scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-4 whitespace-nowrap font-medium text-emerald-100">
          <button
            onClick={() => onSelectCategory('Semua')}
            className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
              selectedCategory === 'Semua'
                ? 'bg-brand-500 text-slate-950 shadow-sm'
                : 'hover:text-white hover:bg-brand-800/60'
            }`}
          >
            Semua Hasil Panen
          </button>
          <button
            onClick={() => onSelectCategory('Buah')}
            className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
              selectedCategory === 'Buah'
                ? 'bg-brand-500 text-slate-950 shadow-sm'
                : 'hover:text-white hover:bg-brand-800/60'
            }`}
          >
            Buah Segar
          </button>
          <button
            onClick={() => onSelectCategory('Sayur')}
            className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
              selectedCategory === 'Sayur'
                ? 'bg-brand-500 text-slate-950 shadow-sm'
                : 'hover:text-white hover:bg-brand-800/60'
            }`}
          >
            Sayuran Hijau
          </button>
          <button
            onClick={() => onSelectCategory('Paket Hemat')}
            className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
              selectedCategory === 'Paket Hemat'
                ? 'bg-brand-500 text-slate-950 shadow-sm'
                : 'hover:text-white hover:bg-brand-800/60'
            }`}
          >
            Paket Hemat
          </button>
          <button
            onClick={() => onSelectCategory('Organik')}
            className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
              selectedCategory === 'Organik'
                ? 'bg-brand-500 text-slate-950 shadow-sm'
                : 'hover:text-white hover:bg-brand-800/60'
            }`}
          >
            Organik Bersertifikat
          </button>

          <span className="text-emerald-800">|</span>

          <button
            onClick={onSwitchToSeller}
            className="hover:text-amber-200 font-bold flex items-center gap-1.5 bg-emerald-800/80 hover:bg-emerald-800 px-2.5 py-1 rounded-lg text-[11px] text-amber-300 border border-emerald-700/60 cursor-pointer"
          >
            <Store className="w-3.5 h-3.5 text-amber-300" />
            <span>Buka Portal Mitra Petani</span>
          </button>

          <button
            onClick={onOpenAbout}
            className="hover:text-white flex items-center gap-1 text-emerald-200 hover:underline cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Tentang Kami</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
