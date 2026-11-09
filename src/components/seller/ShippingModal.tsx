import React, { useState, useEffect } from 'react';
import { SellerOrder } from '../../types';
import { X, Truck, RotateCw, Send, Check } from 'lucide-react';

interface ShippingModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: SellerOrder | null;
  onConfirmDispatch: (orderId: string, courier: string, resi: string, notes: string) => void;
}

export const ShippingModal: React.FC<ShippingModalProps> = ({
  isOpen,
  onClose,
  order,
  onConfirmDispatch,
}) => {
  const [courier, setCourier] = useState('SoekaTani Cold-Chain Express');
  const [resi, setResi] = useState('');
  const [driverNotes, setDriverNotes] = useState('Box berpendingin es gel & label panen siap petik');

  useEffect(() => {
    if (order) {
      setCourier(order.courier || 'SoekaTani Cold-Chain Express');
      setResi(order.resi || ('SKT-' + Math.floor(1000 + Math.random() * 9000) + '-COLD'));
      setDriverNotes(order.notes ? `Catatan pemesan: ${order.notes}` : 'Box berpendingin es gel & label panen siap petik');
    }
  }, [order, isOpen]);

  if (!isOpen || !order) return null;

  const handleRandomizeResi = () => {
    const isCold = courier.includes('Cold');
    const newResi = 'SKT-' + Math.floor(1000 + Math.random() * 9000) + (isCold ? '-COLD' : '-EXP');
    setResi(newResi);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmDispatch(order.orderId, courier, resi.trim(), driverNotes.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
            <Truck className="w-4 h-4 text-brand-800" />
            <span>Atur Pengiriman Panen</span>
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          {/* Recipient summary */}
          <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-100">
            <div className="font-bold text-brand-900">{order.customerName} ({order.phone})</div>
            <div className="text-[11px] text-slate-600 mt-0.5">{order.address}</div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">
              No. Pesanan: {order.orderId}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Pilih Layanan Kurir Penjemputan
            </label>
            <select
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-800 bg-white font-medium"
            >
              <option value="SoekaTani Cold-Chain Express">SoekaTani Cold-Chain Express (Disarankan untuk Buah/Sayur Segar)</option>
              <option value="Kurir Mitra Same Day (Motor Insulated)">Kurir Mitra Same Day (Motor Insulated)</option>
              <option value="Reguler Sayur Cepat (2-3 Jam)">Reguler Sayur Cepat (2-3 Jam)</option>
              <option value="SiCepat Best Day Fresh">SiCepat Best Day Fresh</option>
              <option value="Anteraja Sameday Chilled">Anteraja Sameday Chilled</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nomor Resi / AWB Panen
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={resi}
                onChange={(e) => setResi(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold text-slate-800 bg-slate-50"
              />
              <button
                type="button"
                onClick={handleRandomizeResi}
                className="px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded-xl text-slate-700 font-bold whitespace-nowrap text-[11px] flex items-center gap-1 cursor-pointer"
                title="Acak nomor resi baru"
              >
                <RotateCw className="w-3 h-3" />
                <span>Acak</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Catatan untuk Petugas Penjemputan / Kurir
            </label>
            <input
              type="text"
              value={driverNotes}
              onChange={(e) => setDriverNotes(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-800"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold flex items-center gap-1.5 shadow-md shadow-brand-800/20 active:scale-95 transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Konfirmasi Siap Kirim</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
