import React, { useState } from 'react';
import { Product } from '../../types';
import { formatRupiah } from '../../data/initialData';
import { X, Star, MapPin, Truck, ShieldCheck, Plus, Minus, ShoppingBag, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number) => void;
  onBuyNow: (product: Product, qty: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  const [qty, setQty] = useState(1);
  const [selectedImg, setSelectedImg] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const currentImg = selectedImg || product.image;
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1200);
  };

  const handleBuy = () => {
    onBuyNow(product, qty);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* Gallery / Image */}
          <div className="space-y-3">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 relative shadow-inner">
              <img
                src={currentImg}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-brand-900/90 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                {product.category}
              </span>
            </div>

            {gallery.length > 1 && (
              <div className="flex gap-2">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition ${
                      currentImg === img ? 'border-brand-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Farmer Provenance Card */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl text-xs space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{product.farmerName}</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-5">{product.farmerLoc}</p>
              {product.harvestTime && (
                <div className="pl-5 text-[10px] text-emerald-700 font-semibold">
                  Waktu Panen: {product.harvestTime}
                </div>
              )}
            </div>
          </div>

          {/* Details & Purchase controls */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-slate-300">&bull;</span>
                <span className="text-xs text-slate-500">{product.reviewsCount} ulasan</span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-xs text-slate-500">Terjual {product.soldCount} kg</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-black text-brand-900 tabular-nums">
                  {formatRupiah(product.price)}
                </span>
                <span className="text-xs text-slate-500">/ {product.unit}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-slate-400 line-through tabular-nums">
                    {formatRupiah(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Stock status */}
              <div className="mt-2 text-xs">
                <span className="text-slate-500">Stok Panen Kebun: </span>
                <strong className={product.stock < 15 ? 'text-amber-600' : 'text-emerald-700'}>
                  {product.stock} {product.unit}
                </strong>
              </div>

              {/* Description */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                <p>{product.desc}</p>
              </div>

              {/* Fresh Guarantees */}
              <div className="mt-4 space-y-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-brand-800" />
                  <span>Dikemas kotak berpendingin Cold-Chain (4-8°C)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-800" />
                  <span>Garansi ganti baru bila barang rusak saat diterima</span>
                </div>
              </div>
            </div>

            {/* Quantity Stepper & CTAs */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Jumlah Pesanan:</span>
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    disabled={qty <= 1}
                    className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center font-bold text-slate-700 disabled:opacity-40 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold tabular-nums text-slate-900">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    disabled={qty >= product.stock}
                    className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center font-bold text-slate-700 disabled:opacity-40 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={handleAdd}
                  className={`py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-brand-900 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Masuk Keranjang!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>+ Keranjang</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuy}
                  className="py-3 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-brand-900/20 active:scale-95 transition cursor-pointer"
                >
                  <span>Beli Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
