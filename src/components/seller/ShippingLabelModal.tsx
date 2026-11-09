import React from 'react';
import { SellerOrder } from '../../types';
import { X, Printer, Leaf, QrCode } from 'lucide-react';

interface ShippingLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: SellerOrder | null;
}

export const ShippingLabelModal: React.FC<ShippingLabelModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  if (!isOpen || !order) return null;

  const isCold = order.courier.toLowerCase().includes('cold');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-700">Preview Label Resi Thermal</span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Printable Thermal Label Area */}
        <div 
          id="printable-shipping-label"
          className="border-2 border-dashed border-slate-300 p-4 rounded-2xl bg-white text-slate-900 space-y-3 font-sans text-xs shadow-xs"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-300 pb-2">
            <div className="flex items-center gap-1.5 font-black text-brand-900 text-sm">
              <Leaf className="w-4 h-4 text-brand-800" />
              <span>SoekaTani Logistik</span>
            </div>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded text-white ${
              isCold ? 'bg-blue-600' : 'bg-slate-900'
            }`}>
              {isCold ? 'COLD-CHAIN ❄️' : 'EXPRESS'}
            </span>
          </div>

          {/* Barcode Graphic Mockup */}
          <div className="text-center py-1">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              NOMOR RESI / AWB:
            </div>
            <div className="text-sm font-mono font-black tracking-widest text-slate-900 mt-0.5">
              {order.resi}
            </div>

            {/* Simulated Barcode Lines */}
            <div className="flex items-center justify-center gap-0.5 mt-1.5 h-8 px-4 opacity-80 overflow-hidden">
              <div className="w-1.5 bg-black h-full" />
              <div className="w-0.5 bg-black h-full" />
              <div className="w-1 bg-black h-full" />
              <div className="w-2 bg-black h-full" />
              <div className="w-0.5 bg-black h-full" />
              <div className="w-1.5 bg-black h-full" />
              <div className="w-1 bg-black h-full" />
              <div className="w-2.5 bg-black h-full" />
              <div className="w-0.5 bg-black h-full" />
              <div className="w-1 bg-black h-full" />
              <div className="w-2 bg-black h-full" />
              <div className="w-1 bg-black h-full" />
              <div className="w-1.5 bg-black h-full" />
              <div className="w-0.5 bg-black h-full" />
              <div className="w-2 bg-black h-full" />
              <div className="w-1 bg-black h-full" />
              <div className="w-2 bg-black h-full" />
              <div className="w-0.5 bg-black h-full" />
              <div className="w-1.5 bg-black h-full" />
            </div>
            <div className="text-[9px] font-mono text-slate-400 mt-0.5">*{order.orderId}*</div>
          </div>

          {/* Sender & Recipient Box */}
          <div className="border-t border-b border-slate-200 py-2.5 space-y-2 text-[11px]">
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 block">PENGIRIM:</span>
              <strong className="text-slate-800">Kelompok Tani Sari Mulyani</strong>
              <div className="text-slate-500 text-[10px]">Cikedung, Indramayu (0821-4567-8910)</div>
            </div>

            <div className="pt-1.5 border-t border-slate-100">
              <span className="text-[9px] uppercase font-bold text-slate-400 block">PENERIMA:</span>
              <strong className="text-slate-900 text-xs">{order.customerName} ({order.phone})</strong>
              <div className="text-slate-600 text-[11px] leading-tight mt-0.5">{order.address}</div>
            </div>
          </div>

          {/* Commodities List */}
          <div className="text-[10px] text-slate-600 space-y-0.5">
            <span className="font-bold text-slate-400 uppercase text-[9px]">ISI PAKET:</span>
            {order.items.map((it, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{it.qty}x {it.name}</span>
                <span className="font-mono">{it.unit}</span>
              </div>
            ))}
          </div>

          {/* Temperature Warning */}
          <div className="p-2 bg-slate-50 rounded-lg text-center text-[9px] font-black tracking-wide text-slate-700 border border-slate-200">
            * PRODUK SEGAR - JAGA SUHU DINGIN 4-8°C & JANGAN DITINDIH *
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Label Thermal</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
