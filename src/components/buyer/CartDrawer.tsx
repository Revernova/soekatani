import React, { useState } from 'react';
import { CartItem } from '../../types';
import { formatRupiah } from '../../data/initialData';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  voucherCode: string;
  onApplyVoucher: (code: string) => void;
  voucherDiscount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  voucherCode,
  onApplyVoucher,
  voucherDiscount,
}) => {
  const [inputCode, setInputCode] = useState(voucherCode);
  const [voucherMsg, setVoucherMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  const total = Math.max(0, subtotal - voucherDiscount);

  const handleApplyVoucherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = inputCode.trim().toUpperCase();
    if (code === 'SOEKAPETANI' || code === 'PANENHEMAT') {
      onApplyVoucher(code);
      setVoucherMsg(`Voucher ${code} berhasil dipasang!`);
    } else if (code) {
      setVoucherMsg('Kode voucher tidak valid atau telah kedaluwarsa.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-brand-800 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                Keranjang Panen Segar
              </h3>
              <p className="text-[11px] text-slate-400">
                {cart.length} komoditas dipilih
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body Items */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-bold text-slate-700 text-sm">Keranjang Anda masih kosong</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Pilih buah manis dan sayur renyah langsung dari kebun mitra kami sekarang.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-14 h-14 rounded-xl object-cover bg-white shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[11px] text-brand-900 font-extrabold mt-0.5 tabular-nums">
                    {formatRupiah(item.product.price)}
                    <span className="text-slate-400 font-normal"> /{item.product.unit}</span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQty(item.product.id, -1)}
                      className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-slate-900 w-5 text-center tabular-nums">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.product.id, 1)}
                      className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="text-right flex flex-col justify-between items-end h-14">
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-slate-400 hover:text-red-500 transition p-1 cursor-pointer"
                    title="Hapus barang"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-black text-slate-900 tabular-nums">
                    {formatRupiah(item.product.price * item.qty)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-3 shadow-lg">
            {/* Voucher input form */}
            <form onSubmit={handleApplyVoucherSubmit} className="flex gap-2 text-xs">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Kode voucher (e.g. SOEKAPETANI)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-brand-800"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shrink-0 cursor-pointer"
              >
                Pasang
              </button>
            </form>

            {voucherMsg && (
              <p className={`text-[10px] font-semibold ${
                voucherDiscount > 0 ? 'text-emerald-600' : 'text-amber-600'
              }`}>
                {voucherMsg}
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs pt-1 border-t border-slate-100">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal ({cart.length} item)</span>
                <span className="font-semibold text-slate-800 tabular-nums">{formatRupiah(subtotal)}</span>
              </div>
              {voucherDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Diskon Voucher ({voucherCode})</span>
                  <span className="tabular-nums">- {formatRupiah(voucherDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1.5 border-t border-slate-100">
                <span>Total Belanja</span>
                <span className="text-brand-900 tabular-nums">{formatRupiah(total)}</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 flex items-center gap-1.5 justify-center py-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kemasan Rantai Dingin &bull; Bayar di Tempat / QRIS Instan</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-3 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-brand-800/20 active:scale-98 transition cursor-pointer"
            >
              <span>Lanjut ke Pengiriman & Pembayaran</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
