import React, { useState } from 'react';
import { Product } from '../../types';
import { formatRupiah } from '../../data/initialData';
import { Star, Plus, MapPin, Check, Leaf } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
}) => {
  const [imgError, setImgError] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 900);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden group cursor-pointer"
    >
      {/* Image Area */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100/60 text-emerald-700 p-4">
            <Leaf className="w-8 h-8 mb-1 opacity-70" />
            <span className="text-[11px] font-bold text-center">{product.name}</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discountPercent > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
              Hemat {discountPercent}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
              Terlaris
            </span>
          )}
        </div>

        {/* Harvest tag */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 text-emerald-400" />
            <span className="truncate max-w-32">{product.farmerLoc}</span>
          </span>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] text-slate-400 font-semibold mb-1 flex items-center justify-between">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-800 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
            {product.farmerName}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-brand-900 tabular-nums">
                {formatRupiah(product.price)}
              </span>
              <span className="text-[11px] text-slate-400">/{product.unit}</span>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] text-slate-400 line-through tabular-nums">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition shadow-xs active:scale-95 cursor-pointer shrink-0 ${
              addedAnim
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-brand-800 hover:bg-brand-500 hover:text-slate-950 border border-emerald-200'
            }`}
            title="Tambah ke Keranjang"
          >
            {addedAnim ? (
              <Check className="w-4 h-4 stroke-[3]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
