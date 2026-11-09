import React, { useState } from 'react';
import { Product } from '../../types';
import { formatRupiah } from '../../data/initialData';
import { Search, Plus, Edit3, Trash2, ArrowUpDown, Leaf } from 'lucide-react';

interface SellerProductsTabProps {
  products: Product[];
  onOpenAddModal: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onAdjustStock: (productId: string, amount: number) => void;
}

export const SellerProductsTab: React.FC<SellerProductsTabProps> = ({
  products,
  onOpenAddModal,
  onEditProduct,
  onDeleteProduct,
  onAdjustStock,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.farmerLoc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'Semua' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-black text-slate-900">Katalog Hasil Panen Petani</h3>
          <p className="text-xs text-slate-500">
            Kelola stok panen, perbarui harga jual, dan tambah komoditas segar langsung ke toko
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari komoditas..."
              className="text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-800 w-40 sm:w-48 bg-slate-50/50"
            />
          </div>

          {/* Add Product Button */}
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Hasil Panen</span>
          </button>
        </div>
      </div>

      {/* Table & Cards */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5">Produk Panen</th>
                <th className="p-3.5">Kategori</th>
                <th className="p-3.5">Harga / Satuan</th>
                <th className="p-3.5">Stok Panen</th>
                <th className="p-3.5">Asal Kebun</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Tidak ada produk panen yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-3.5 flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-11 h-11 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{p.name}</div>
                        <div className="text-[10px] text-slate-400">Terjual: {p.soldCount} kg</div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 bg-slate-100 rounded-full text-[10px] font-bold text-slate-700">
                        {p.category}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <div className="font-black text-brand-900 tabular-nums">
                        {formatRupiah(p.price)}
                      </div>
                      <div className="text-[10px] text-slate-400">per {p.unit}</div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold tabular-nums ${p.stock < 20 ? 'text-red-500 font-black' : 'text-slate-800'}`}>
                          {p.stock} kg
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onAdjustStock(p.id, 10)}
                            title="Tambah 10 kg stok"
                            className="w-6 h-6 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-brand-800 flex items-center justify-center font-bold text-xs border border-emerald-200 cursor-pointer"
                          >
                            +10
                          </button>
                          <button
                            onClick={() => onAdjustStock(p.id, -5)}
                            title="Kurangi 5 kg stok"
                            className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs cursor-pointer"
                          >
                            -5
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 text-slate-600 text-[11px] whitespace-nowrap">
                      {p.farmerLoc}
                    </td>

                    <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => onEditProduct(p)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-semibold text-[11px] transition cursor-pointer"
                        title="Edit Produk"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-semibold text-[11px] transition cursor-pointer"
                        title="Hapus Produk"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
