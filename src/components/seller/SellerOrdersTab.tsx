import React, { useState } from 'react';
import { SellerOrder, OrderStatus } from '../../types';
import { formatRupiah } from '../../data/initialData';
import { Printer, Truck, CheckCircle2, Box, Package, MapPin, Phone, User, QrCode } from 'lucide-react';

interface SellerOrdersTabProps {
  orders: SellerOrder[];
  onOpenShippingModal: (orderId: string) => void;
  onOpenLabelModal: (orderId: string) => void;
  onMarkCompleted: (orderId: string) => void;
}

export const SellerOrdersTab: React.FC<SellerOrdersTabProps> = ({
  orders,
  onOpenShippingModal,
  onOpenLabelModal,
  onMarkCompleted,
}) => {
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter((o) => o.status === filterStatus);

  const pendingCount = orders.filter((o) => o.status === 'Perlu Diproses').length;
  const shippingCount = orders.filter((o) => o.status === 'Dalam Pengiriman').length;
  const doneCount = orders.filter((o) => o.status === 'Selesai').length;

  return (
    <div className="space-y-4">
      {/* Header and status pills */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-black text-slate-900">Manajemen Pengiriman & Pesanan Masuk</h3>
          <p className="text-xs text-slate-500">
            Atur penjemputan logistik panen, terbitkan resi dingin, dan kirim ke pelanggan Jabodetabek
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterStatus === 'all'
                ? 'bg-white shadow-xs text-slate-900 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua ({orders.length})
          </button>
          <button
            onClick={() => setFilterStatus('Perlu Diproses')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
              filterStatus === 'Perlu Diproses'
                ? 'bg-white shadow-xs text-amber-700 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Perlu Diproses</span>
            {pendingCount > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 rounded-full font-black">
                {pendingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilterStatus('Dalam Pengiriman')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterStatus === 'Dalam Pengiriman'
                ? 'bg-white shadow-xs text-blue-700 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dalam Pengiriman ({shippingCount})
          </button>
          <button
            onClick={() => setFilterStatus('Selesai')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterStatus === 'Selesai'
                ? 'bg-white shadow-xs text-emerald-700 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Selesai ({doneCount})
          </button>
        </div>
      </div>

      {/* Orders Cards List */}
      <div className="space-y-3.5">
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border border-slate-200/80 text-center text-slate-400 space-y-2">
            <Box className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-xs font-bold text-slate-700">Tidak ada pesanan pada filter ini</p>
            <p className="text-[11px] text-slate-400">Pilih filter status lainnya di atas.</p>
          </div>
        ) : (
          filteredOrders.map((ord) => {
            let badgeBg = 'bg-amber-50 text-amber-800 border-amber-200';
            if (ord.status === 'Dalam Pengiriman') badgeBg = 'bg-blue-50 text-blue-800 border-blue-200';
            if (ord.status === 'Selesai') badgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-200';

            return (
              <div
                key={ord.orderId}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs space-y-3"
              >
                {/* Top Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-xs text-slate-900">
                      {ord.orderId}
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-xs text-slate-500">{ord.date}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeBg}`}>
                    {ord.status}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Recipient */}
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Penerima & Alamat:
                    </div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{ord.customerName}</span>
                    </div>
                    <div className="text-slate-500 flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{ord.phone}</span>
                    </div>
                    <div className="text-slate-500 flex items-start gap-1.5 text-[11px] pt-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                      <span>{ord.address}</span>
                    </div>
                    {ord.notes && (
                      <p className="text-[10px] text-amber-700 bg-amber-50/70 p-1.5 rounded-lg border border-amber-100/80 mt-1">
                        <strong>Catatan:</strong> {ord.notes}
                      </p>
                    )}
                  </div>

                  {/* Items */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Komoditas Panen:
                    </div>
                    <div className="space-y-1 pt-0.5">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center pr-2 text-[11px]">
                          <span className="text-slate-700">
                            {item.qty}x {item.name} ({item.unit})
                          </span>
                          <span className="font-semibold text-slate-900 tabular-nums">
                            {formatRupiah(item.price * item.qty)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Logistics & Payment */}
                  <div className="border-t md:border-t-0 md:border-l md:pl-4 border-slate-100 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Ekspedisi & Resi:
                      </div>
                      <div className="font-bold text-slate-900 mt-0.5">{ord.courier}</div>
                      <div className="font-mono text-[11px] text-brand-900 font-black mt-0.5">
                        {ord.resi}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Metode: <span className="font-semibold">{ord.paymentMethod}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-baseline justify-between">
                      <span className="text-[11px] text-slate-400">Total Pembayaran:</span>
                      <span className="text-sm font-black text-brand-900 tabular-nums">
                        {formatRupiah(ord.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2">
                  <button
                    onClick={() => onOpenLabelModal(ord.orderId)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Cetak Label Pengiriman</span>
                  </button>

                  {ord.status === 'Perlu Diproses' && (
                    <button
                      onClick={() => onOpenShippingModal(ord.orderId)}
                      className="px-4 py-1.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition active:scale-95 cursor-pointer"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Atur Pengiriman & Pickup</span>
                    </button>
                  )}

                  {ord.status === 'Dalam Pengiriman' && (
                    <button
                      onClick={() => onMarkCompleted(ord.orderId)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition active:scale-95 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Tandai Selesai Diterima</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
