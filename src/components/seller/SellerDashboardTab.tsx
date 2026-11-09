import React from 'react';
import { SellerOrder, Product } from '../../types';
import { formatRupiah } from '../../data/initialData';
import { 
  TrendingUp, 
  Receipt, 
  Apple, 
  Star, 
  Truck, 
  Clock, 
  ArrowRight, 
  AlertCircle,
  PackageCheck
} from 'lucide-react';

interface SellerDashboardTabProps {
  orders: SellerOrder[];
  products: Product[];
  onOpenShippingModal: (orderId: string) => void;
  onGoToOrders: () => void;
}

export const SellerDashboardTab: React.FC<SellerDashboardTabProps> = ({
  orders,
  products,
  onOpenShippingModal,
  onGoToOrders,
}) => {
  const totalRevenue = orders.reduce((acc, o) => acc + o.subtotal, 4850000);
  const pendingOrders = orders.filter((o) => o.status === 'Perlu Diproses');
  const recentPending = pendingOrders.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Pendapatan Panen</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
              Rp
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
            {formatRupiah(totalRevenue)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% panen minggu ini</span>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Pesanan Baru Masuk</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {pendingOrders.length} Pesanan
          </div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Butuh diproses segera</span>
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Produk Aktif</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Apple className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {products.length} Item
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Tersedia di etalase pembeli
          </div>
        </div>

        {/* Farmer Rating */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Rating Mitra Tani</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-1.5">
            <span>4.9</span>
            <span className="text-xs font-normal text-slate-400">/ 5.0</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            99.4% Kepuasan Pelanggan
          </div>
        </div>
      </div>

      {/* Quick Action Logistics Notification Box */}
      <div className="bg-gradient-to-r from-brand-900 via-emerald-950 to-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-brand-500 text-slate-950 flex items-center justify-center text-xl shrink-0">
            <Truck className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Atur Logistik & Jadwal Petik Segar</h4>
            <p className="text-xs text-slate-300">
              Ada paket panen yang perlu disiapkan sebelum kurir pickup dingin SoekaTani Cold-Chain tiba pukul 14:00 WIB.
            </p>
          </div>
        </div>
        <button
          onClick={onGoToOrders}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-950 font-bold text-xs transition shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <span>Buka Pengiriman Sekarang</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mini Recent Orders Requiring Action */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Pesanan Terbaru Memerlukan Tindakan</h3>
            <p className="text-xs text-slate-500">Kemas pesanan dan konfirmasi siap pickup kurir</p>
          </div>
          <button
            onClick={onGoToOrders}
            className="text-xs font-bold text-brand-800 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua Pesanan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentPending.length === 0 ? (
          <div className="py-8 text-center text-slate-400 bg-slate-50 rounded-xl">
            <PackageCheck className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
            <p className="text-xs font-bold text-slate-700">Tidak ada pesanan tertunda.</p>
            <p className="text-[11px] text-slate-400">Semua pesanan hasil panen telah diproses ke kurir!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentPending.map((ord) => (
              <div
                key={ord.orderId}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-slate-900">{ord.customerName}</span>
                    <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-amber-200 text-slate-600">
                      {ord.orderId}
                    </span>
                    <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
                      Perlu Diproses
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    {ord.items.map((i) => `${i.qty}x ${i.name}`).join(', ')} &bull;{' '}
                    <strong className="text-brand-900 tabular-nums">{formatRupiah(ord.total)}</strong>
                  </p>
                </div>
                <button
                  onClick={() => onOpenShippingModal(ord.orderId)}
                  className="px-3.5 py-1.5 rounded-lg bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs self-start sm:self-auto flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Atur Pengiriman</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Harvest Statistics Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-1">
          Distribusi Komoditas Panen Terjual Pekan Ini
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Kelompok Tani Sari Mulyani Indramayu &bull; Periode 01-08 Nov 2026
        </p>

        <div className="space-y-3 text-xs">
          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Mangga Harum Manis (Paling Banyak Diminati)</span>
              <span className="font-mono font-bold text-brand-900">420 kg (45%)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '45%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Cabai Merah Keriting Subang</span>
              <span className="font-mono font-bold text-brand-900">260 kg (28%)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '28%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Selada Hidroponik & Sayuran Hijau</span>
              <span className="font-mono font-bold text-brand-900">180 ikat (19%)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '19%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
