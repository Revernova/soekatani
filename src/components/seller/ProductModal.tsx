import React, { useState, useEffect } from 'react';
import { Product, ProductCategory } from '../../types';
import { SAMPLE_IMAGES } from '../../data/initialData';
import { X, Check } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit: Product | null;
  onSave: (productData: Partial<Product>) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Buah');
  const [unit, setUnit] = useState('1 kg');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stock, setStock] = useState('50');
  const [farmerLoc, setFarmerLoc] = useState('Indramayu, Jawa Barat');
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setCategory(productToEdit.category);
      setUnit(productToEdit.unit);
      setPrice(productToEdit.price.toString());
      setOriginalPrice(productToEdit.originalPrice ? productToEdit.originalPrice.toString() : '');
      setStock(productToEdit.stock.toString());
      setFarmerLoc(productToEdit.farmerLoc);
      setImage(productToEdit.image);
      setDesc(productToEdit.desc || '');
    } else {
      setName('');
      setCategory('Buah');
      setUnit('1 kg');
      setPrice('');
      setOriginalPrice('');
      setStock('50');
      setFarmerLoc('Indramayu, Jawa Barat');
      setImage('');
      setDesc('');
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImage = image.trim() || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
    const numPrice = Number(price) || 0;
    const numOriginal = Number(originalPrice) || (numPrice > 0 ? numPrice + 5000 : 0);
    const numStock = Number(stock) || 50;

    onSave({
      id: productToEdit ? productToEdit.id : undefined,
      name: name.trim(),
      category,
      unit: unit.trim() || '1 kg',
      price: numPrice,
      originalPrice: numOriginal,
      stock: numStock,
      farmerLoc: farmerLoc.trim() || 'Indramayu, Jawa Barat',
      farmerName: 'Kelompok Tani Sari Mulyani',
      image: finalImage,
      gallery: [finalImage],
      desc: desc.trim() || 'Hasil panen segar bermutu tinggi langsung dari kebun.',
      harvestTime: 'Petik Pagi 06:00 WIB',
    });
    onClose();
  };

  const handleSelectSample = (key: keyof typeof SAMPLE_IMAGES) => {
    setImage(SAMPLE_IMAGES[key]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-black text-slate-900 text-base">
            {productToEdit ? 'Edit Hasil Panen' : 'Tambah Hasil Panen Baru'}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nama Produk Panen <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Alpukat Mentega Super"
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-800 bg-white"
              >
                <option value="Buah">Buah Segar</option>
                <option value="Sayur">Sayuran Hijau</option>
                <option value="Paket Hemat">Paket Hemat</option>
                <option value="Organik">Produk Organik</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Satuan Berat <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="1 kg / ikat / butir"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Harga Jual (Rp) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="25000"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Harga Asli / Coret (Opsional)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="30000"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Stok Panen (kg/ikat) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Asal Daerah Kebun <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={farmerLoc}
                onChange={(e) => setFarmerLoc(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">URL Foto Produk</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-800"
            />
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className="text-[10px] text-slate-400">Atau pilih sampel foto panen:</span>
              <button
                type="button"
                onClick={() => handleSelectSample('alpukat')}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-semibold text-slate-700 cursor-pointer"
              >
                🥑 Alpukat
              </button>
              <button
                type="button"
                onClick={() => handleSelectSample('pepaya')}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-semibold text-slate-700 cursor-pointer"
              >
                🍈 Pepaya
              </button>
              <button
                type="button"
                onClick={() => handleSelectSample('bayam')}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-semibold text-slate-700 cursor-pointer"
              >
                🌱 Bayam
              </button>
              <button
                type="button"
                onClick={() => handleSelectSample('strawberry')}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-semibold text-slate-700 cursor-pointer"
              >
                🍓 Stroberi
              </button>
              <button
                type="button"
                onClick={() => handleSelectSample('jagung')}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-semibold text-slate-700 cursor-pointer"
              >
                🌽 Jagung
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Deskripsi Hasil Panen</label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Jelaskan kualitas rasa, tingkat kematangan, dan keunggulan panen langsung dari kebun..."
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
              className="px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold shadow-md shadow-brand-800/20 active:scale-95 transition cursor-pointer"
            >
              Simpan ke Etalase Toko
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
