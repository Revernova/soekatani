import React, { useState } from 'react';
import { CartItem, SellerOrder } from '../../types';
import { formatRupiah } from '../../data/initialData';
import { X, MapPin, Truck, CreditCard, QrCode, Banknote, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  voucherDiscount: number;
  voucherCode: string;
  onSuccessOrder: (order: SellerOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  voucherDiscount,
  voucherCode,
  onSuccessOrder,
}) => {
  const [customerName, setCustomerName] = useState('Budi Santoso');
  const [phone, setPhone] = useState('0812-3456-7890');
  const [address, setAddress] = useState('Jl. Melati No. 12, Kel. Menteng, Jakarta Selatan');
  const [notes, setNotes] = useState('Mohon box pendingin es gel jangan ditaruh terbalik.');

  const [shippingMethod, setShippingMethod] = useState<'cold' | 'sameday' | 'reguler'>('cold');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'va_bca' | 'va_bri' | 'cod'>('qris');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || cart.length === 0) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.qty, 0);

  let shippingCost = 15000;
  let courierName = 'SoekaTani Cold-Chain Express';
  if (shippingMethod === 'sameday') {
    shippingCost = 25000;
    courierName = 'Kurir Mitra Same Day (Motor Insulated)';
  } else if (shippingMethod === 'reguler') {
    shippingCost = 10000;
    courierName = 'Reguler Sayur Cepat (2-3 Jam)';
  }

  // Free shipping promo if subtotal > 100000
  if (subtotal >= 100000) {
    shippingCost = 0;
  }

  const grandTotal = Math.max(0, subtotal + shippingCost - voucherDiscount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrderId = 'ST-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
      const resiCode = 'SKT-' + Math.floor(1000 + Math.random() * 9000) + (shippingMethod === 'cold' ? '-COLD' : '-EXP');

      const paymentLabel = 
        paymentMethod === 'qris' ? 'QRIS Instan' :
        paymentMethod === 'va_bca' ? 'Virtual Account BCA' :
        paymentMethod === 'va_bri' ? 'Virtual Account BRI' : 'COD (Bayar di Tempat)';

      const newOrder: SellerOrder = {
        orderId: newOrderId,
        customerName: customerName.trim() || 'Pelanggan SoekaTani',
        phone: phone.trim() || '0812-0000-0000',
        address: address.trim() || 'Jabodetabek',
        date: 'Hari ini, baru saja',
        items: cart.map((i) => ({
          name: i.product.name,
          qty: i.qty,
          price: i.product.price,
          unit: i.product.unit,
          image: i.product.image,
        })),
        subtotal,
        shippingFee: shippingCost,
        total: grandTotal,
        paymentMethod: paymentLabel,
        status: 'Perlu Diproses',
        courier: courierName,
        resi: resiCode,
        notes: notes.trim(),
      };

      setIsSubmitting(false);
      onSuccessOrder(newOrder);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-black text-slate-900 text-base sm:text-lg">
              Konfirmasi & Pengiriman Panen
            </h3>
            <p className="text-xs text-slate-500">
              Lengkapi alamat pengantaran dan metode pembayaran Anda
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {/* Section 1: Customer & Address */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-800" />
              <span>Alamat Penerima Panen Segar</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Nomor WhatsApp / HP</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Alamat Lengkap Pengiriman</label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Catatan Tambahan untuk Petani/Kurir</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Titip di pos satpam / Mangga pilih yang sudah empuk"
                className="w-full p-2 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-800"
              />
            </div>
          </div>

          {/* Section 2: Shipping Options */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-brand-800" />
              <span>Opsi Layanan Pengiriman Kebun</span>
            </h4>

            <div className="space-y-2">
              <label
                onClick={() => setShippingMethod('cold')}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  shippingMethod === 'cold'
                    ? 'border-brand-800 bg-emerald-50/70 ring-1 ring-brand-800'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'cold'}
                    onChange={() => setShippingMethod('cold')}
                    className="accent-brand-800"
                  />
                  <div>
                    <div className="font-bold text-slate-900">SoekaTani Cold-Chain Express (Rekomendasi)</div>
                    <p className="text-[11px] text-slate-500">Box pendingin es gel terisolasi &bull; Tiba dingin 2-4 jam</p>
                  </div>
                </div>
                <span className="font-bold text-slate-900 tabular-nums">
                  {subtotal >= 100000 ? 'GRATIS' : formatRupiah(15000)}
                </span>
              </label>

              <label
                onClick={() => setShippingMethod('sameday')}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  shippingMethod === 'sameday'
                    ? 'border-brand-800 bg-emerald-50/70 ring-1 ring-brand-800'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'sameday'}
                    onChange={() => setShippingMethod('sameday')}
                    className="accent-brand-800"
                  />
                  <div>
                    <div className="font-bold text-slate-900">Kurir Mitra Same Day (Motor Insulated)</div>
                    <p className="text-[11px] text-slate-500">Pengiriman kilat langsung dari titik sortir kebun</p>
                  </div>
                </div>
                <span className="font-bold text-slate-900 tabular-nums">{formatRupiah(25000)}</span>
              </label>

              <label
                onClick={() => setShippingMethod('reguler')}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  shippingMethod === 'reguler'
                    ? 'border-brand-800 bg-emerald-50/70 ring-1 ring-brand-800'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'reguler'}
                    onChange={() => setShippingMethod('reguler')}
                    className="accent-brand-800"
                  />
                  <div>
                    <div className="font-bold text-slate-900">Reguler Sayur Cepat (2-3 Jam)</div>
                    <p className="text-[11px] text-slate-500">Pengiriman terjadwal sore hari</p>
                  </div>
                </div>
                <span className="font-bold text-slate-900 tabular-nums">{formatRupiah(10000)}</span>
              </label>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-brand-800" />
              <span>Metode Pembayaran</span>
            </h4>

            <div className="grid grid-cols-2 gap-2.5">
              <label
                onClick={() => setPaymentMethod('qris')}
                className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition ${
                  paymentMethod === 'qris'
                    ? 'border-brand-800 bg-emerald-50/70 ring-1 ring-brand-800'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-4 h-4 text-brand-800 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900">QRIS Instan</div>
                  <div className="text-[10px] text-slate-400">BCA, GoPay, OVO, Shopee</div>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('va_bca')}
                className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition ${
                  paymentMethod === 'va_bca'
                    ? 'border-brand-800 bg-emerald-50/70 ring-1 ring-brand-800'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900">BCA Virtual Account</div>
                  <div className="text-[10px] text-slate-400">Otomatis Terverifikasi</div>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('va_bri')}
                className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition ${
                  paymentMethod === 'va_bri'
                    ? 'border-brand-800 bg-emerald-50/70 ring-1 ring-brand-800'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900">BRI Virtual Account</div>
                  <div className="text-[10px] text-slate-400">Bank Mitra Petani</div>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition ${
                  paymentMethod === 'cod'
                    ? 'border-brand-800 bg-emerald-50/70 ring-1 ring-brand-800'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Banknote className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900">COD (Bayar di Tempat)</div>
                  <div className="text-[10px] text-slate-400">Bayar saat sayur tiba</div>
                </div>
              </label>
            </div>
          </div>

          {/* Section 4: Order Summary */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="font-bold text-slate-900 mb-1">Rincian Pembayaran:</div>
            <div className="flex justify-between text-slate-600">
              <span>Subtotal ({cart.length} item)</span>
              <span className="tabular-nums font-semibold">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Ongkos Kirim ({courierName})</span>
              <span className="tabular-nums font-semibold">
                {shippingCost === 0 ? 'GRATIS' : formatRupiah(shippingCost)}
              </span>
            </div>
            {voucherDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Diskon Voucher ({voucherCode})</span>
                <span className="tabular-nums">- {formatRupiah(voucherDiscount)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
              <span>Total Pembayaran Akhir</span>
              <span className="text-brand-900 tabular-nums">{formatRupiah(grandTotal)}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer"
            >
              Kembali
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold flex items-center gap-2 shadow-md shadow-brand-800/20 active:scale-95 transition cursor-pointer"
            >
              {isSubmitting ? (
                <span>Memproses Pesanan...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Konfirmasi & Bayar {formatRupiah(grandTotal)}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
