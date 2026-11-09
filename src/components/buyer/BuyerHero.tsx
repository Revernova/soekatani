import React from 'react';
import { Truck, ShieldCheck, Clock, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { ProductCategory } from '../../types';

interface BuyerHeroProps {
  onSelectCategory: (cat: ProductCategory | 'Semua') => void;
  onApplyVoucherClick: (code: string) => void;
}

export const BuyerHero: React.FC<BuyerHeroProps> = ({
  onSelectCategory,
  onApplyVoucherClick,
}) => {
  return (
    <div className="space-y-6">
      {/* Hero Showcase Card */}
      <div className="bg-gradient-to-br from-brand-900 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-10 top-0 w-64 h-64 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-600/50 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Petik Subuh Langsung dari Kebun Nusantara</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Panen Segar Petani Lokal, Tiba Dingin di Meja Makan Anda.
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
              Hubungkan dapur keluarga dengan lebih dari 500+ petani terverifikasi. Mangga matang pohon Indramayu, cabai merah Subang, hingga selada hidroponik Lembang dikirim dengan proteksi rantai dingin.
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectCategory('Buah')}
                className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/30 transition transform active:scale-95 cursor-pointer"
              >
                <span>Jelajahi Buah & Sayur</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-700/60 px-3 py-2 rounded-xl text-xs">
                <Tag className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-slate-300">Voucher Panen:</span>
                <button
                  onClick={() => onApplyVoucherClick('SOEKAPETANI')}
                  className="font-mono font-bold text-amber-300 hover:underline hover:text-white cursor-pointer ml-1"
                  title="Klik untuk salin / gunakan voucher"
                >
                  SOEKAPETANI
                </button>
              </div>
            </div>
          </div>

          {/* Right Highlights Banner */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold mb-3 shadow">
                <Clock className="w-5 h-5 text-slate-950" />
              </div>
              <h4 className="font-extrabold text-white text-xs sm:text-sm">Petik &lt; 8 Jam</h4>
              <p className="text-[11px] text-emerald-200 mt-1">Dipanen subuh hari, dikirim sebelum matahari meninggi.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-emerald-400 text-slate-950 flex items-center justify-center font-bold mb-3 shadow">
                <Truck className="w-5 h-5 text-slate-950" />
              </div>
              <h4 className="font-extrabold text-white text-xs sm:text-sm">Rantai Dingin 4-8°C</h4>
              <p className="text-[11px] text-emerald-200 mt-1">Box berpendingin es gel menjaga kerenyahan serat sayur.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl col-span-2 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-400 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow">
                <ShieldCheck className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-xs sm:text-sm">Garansi Ganti 100% Segar</h4>
                <p className="text-[11px] text-emerald-200">Ada buah lecet atau layu? Cukup foto dan langsung kami ganti tanpa ribet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">Tanpa Tengkulak Berlapis</h4>
            <p className="text-[11px] text-slate-500">85% dari tiap rupiah mengalir langsung ke kelompok tani mitra.</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">Pengiriman Cepat Jabodetabek</h4>
            <p className="text-[11px] text-slate-500">Pilihan Same Day 2-3 jam atau Cold-Chain Es Gel prioritas.</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">Mitra Petani Terverifikasi</h4>
            <p className="text-[11px] text-slate-500">Standarisasi mutu panen, bebas pestisida berlebih, dan higienis.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
