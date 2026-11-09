import React, { useState } from 'react';
import { Phone, MapPin, Clock, Building, CreditCard, Save, CheckCircle2 } from 'lucide-react';

interface SellerProfileTabProps {
  onShowToast: (msg: string) => void;
}

export const SellerProfileTab: React.FC<SellerProfileTabProps> = ({ onShowToast }) => {
  const [coldChainEnabled, setColdChainEnabled] = useState(true);
  const [sameDayEnabled, setSameDayEnabled] = useState(true);
  const [regulerEnabled, setRegulerEnabled] = useState(true);

  const handleSave = () => {
    onShowToast('Pengaturan logistik dan rekening kebun berhasil disimpan!');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Farm Profile Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-emerald-100 shadow-sm mb-3">
          <img
            src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=400&q=80"
            alt="Kelompok Tani"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h3 className="font-extrabold text-base text-slate-900">Kelompok Tani Sari Mulyani</h3>
        <p className="text-xs text-slate-500">Mitra Petani Sejak Maret 2023</p>
        
        <div className="mt-3 flex justify-center gap-2 flex-wrap">
          <span className="bg-emerald-50 text-brand-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
            Indramayu, Jabar
          </span>
          <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
            Mitra Utama Grade A
          </span>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 text-left space-y-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
            <span>+62 821-4567-8910</span>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>Blok Cikedung Kidul No. 14, Kab. Indramayu</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Jam Petik Panen: 05:30 - 11:00 WIB</span>
          </div>
        </div>
      </div>

      {/* Right Logistics & Bank Settings Form */}
      <div className="md:col-span-2 space-y-5">
        {/* Logistics Settings */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Building className="w-4 h-4 text-brand-800" />
            <span>Pengaturan Penjemputan Logistik Kebun</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Kurir Penjemputan Aktif
              </label>
              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={coldChainEnabled}
                    onChange={(e) => setColdChainEnabled(e.target.checked)}
                    className="accent-brand-800"
                  />
                  <span>SoekaTani Instant Cold-Chain (Kotak Dingin)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameDayEnabled}
                    onChange={(e) => setSameDayEnabled(e.target.checked)}
                    className="accent-brand-800"
                  />
                  <span>Kurir Mitra Same Day (Motor Insulated)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={regulerEnabled}
                    onChange={(e) => setRegulerEnabled(e.target.checked)}
                    className="accent-brand-800"
                  />
                  <span>Reguler Sayur Cepat (2-3 Jam)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Titik Pickup Petani (Gudang Sortir)
              </label>
              <textarea
                rows={3}
                className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-brand-800"
                defaultValue="Gudang Sortir Tani Sari Mulyani, Jl. Raya Cikedung No. 24, Kab. Indramayu, Jawa Barat"
              />
            </div>
          </div>
        </div>

        {/* Bank & Payout Settings */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-brand-800" />
            <span>Rekening Pencairan Hasil Panen Petani</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bank Penerima</label>
              <input
                type="text"
                defaultValue="Bank Rakyat Indonesia (BRI)"
                className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800"
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nomor Rekening</label>
              <input
                type="text"
                defaultValue="0182-01-002345-50-8"
                className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-mono font-bold text-slate-800"
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Atas Nama</label>
              <input
                type="text"
                defaultValue="Kelompok Tani Sari Mulyani"
                className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800"
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
