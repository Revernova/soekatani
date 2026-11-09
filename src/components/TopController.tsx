import React from 'react';
import { AppRole, DeviceMode } from '../types';
import { ShoppingBasket, Tractor, Laptop, Smartphone, Download } from 'lucide-react';

interface TopControllerProps {
  currentRole: AppRole;
  onRoleChange: (role: AppRole) => void;
  deviceMode: DeviceMode;
  onDeviceModeChange: (mode: DeviceMode) => void;
  pendingOrdersCount: number;
}

export const TopController: React.FC<TopControllerProps> = ({
  currentRole,
  onRoleChange,
  deviceMode,
  onDeviceModeChange,
  pendingOrdersCount,
}) => {
  return (
    <header className="bg-slate-900 text-white text-xs px-4 py-2.5 sticky top-0 z-50 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-bold tracking-tight text-slate-100">SoekaTani Suite:</span>
          <span className="text-slate-400 hidden sm:inline">Peralihan Peran & Simulasi Tampilan Perangkat</span>
        </div>

        {/* Mode Switcher Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Role Switcher (Buyer vs Seller) */}
          <div className="flex items-center bg-emerald-950/80 p-1 rounded-xl border border-emerald-700/60 shadow-inner">
            <button
              onClick={() => onRoleChange('buyer')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                currentRole === 'buyer'
                  ? 'bg-brand-500 text-slate-950 shadow-sm'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              <ShoppingBasket className="w-3.5 h-3.5" />
              <span>Toko Pembeli</span>
            </button>
            <button
              onClick={() => onRoleChange('seller')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                currentRole === 'seller'
                  ? 'bg-brand-500 text-slate-950 shadow-sm'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              <Tractor className="w-3.5 h-3.5" />
              <span>Portal Mitra Petani (Penjual)</span>
              {pendingOrdersCount > 0 && (
                <span className="ml-1 bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-black animate-pulse">
                  {pendingOrdersCount}
                </span>
              )}
            </button>
          </div>

          {/* Device Mode Switcher (Laptop vs HP) */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => onDeviceModeChange('laptop')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
                deviceMode === 'laptop'
                  ? 'bg-brand-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Laptop</span>
            </button>
            <button
              onClick={() => onDeviceModeChange('mobile')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-brand-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">HP (Mockup)</span>
            </button>
          </div>

          {/* Download ZIP Button */}
          <a
            href="/soekatani-suite.zip"
            download="soekatani-suite.zip"
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-sm transition cursor-pointer active:scale-95"
            title="Unduh seluruh source code proyek dalam format .zip"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Unduh ZIP</span>
          </a>
        </div>
      </div>
    </header>
  );
};
