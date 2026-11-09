import React from 'react';
import { SellerOrder } from '../../types';
import { formatRupiah } from '../../data/initialData';
import { CheckCircle2, Tractor, ShoppingBag, Sparkles, Truck, QrCode } from 'lucide-react';

interface OrderSuccessModalProps {
  order: SellerOrder | null;
  onClose: () => void;
  onSwitchToSeller: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onSwitchToSeller,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200 text-center"
      >
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pesanan Panen Berhasil Diterbitkan!</span>
        </span>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
          Terima Kasih, {order.customerName}!
        </h3>

        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Hasil panen pilihan Anda akan segera disortir dan dipetik langsung oleh petani mitra Indramayu.
        </p>

        {/* Invoice Receipt Box */}
        <div className="mt-5 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-left text-xs space-y-2">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-400 font-semibold">Nomor Pesanan</span>
            <span className="font-mono font-black text-slate-900">{order.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 font-semibold">Metode Pembayaran</span>
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <QrCode className="w-3 h-3 text-brand-800" />
              <span>{order.paymentMethod}</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 font-semibold">Total Pembayaran</span>
            <span className="font-black text-brand-900 tabular-nums text-sm">
              {formatRupiah(order.total)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 font-semibold">Kurir Pengiriman</span>
            <span className="font-medium text-slate-700">{order.courier}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
            <strong>Tujuan: </strong> {order.address}
          </div>
        </div>

        {/* Dynamic Multi-Role Bridge Notice */}
        <div className="mt-4 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-left flex items-start gap-3">
          <Truck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-[11px]">
            <strong className="text-slate-900 block font-bold">Simulasi Integrasi Portal Penjual:</strong>
            <span className="text-slate-600">
              Pesanan ini telah otomatis diteruskan ke portal <strong>Mitra Petani Sari Mulyani</strong> dengan status <em>"Perlu Diproses"</em>.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={() => {
              onClose();
              onSwitchToSeller();
            }}
            className="w-full sm:flex-1 py-3 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-brand-800/20 active:scale-95 transition cursor-pointer"
          >
            <Tractor className="w-4 h-4 text-emerald-300" />
            <span>Lihat di Portal Petani (Penjual) &rarr;</span>
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-slate-500" />
            <span>Belanja Lagi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
