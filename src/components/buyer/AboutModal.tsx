import React from 'react';
import { X, Heart, Users, Leaf, Sparkles, Award } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-brand-800 flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900">Tentang SoekaTani Nusantara</h3>
            <p className="text-xs text-slate-500">Misi Kedaulatan & Kesejahteraan Petani Indonesia</p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
          <p>
            <strong>SoekaTani</strong> lahir dari keprihatinan atas tingginya disparitas harga panen di tingkat kebun dengan harga yang dibayar konsumen di perkotaan. Petani seringkali hanya menerima margin kecil karena rantai tengkulak yang mencapai 4-5 lapis.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <Users className="w-5 h-5 text-brand-800 mb-1" />
              <div className="font-black text-slate-900 text-sm">500+ Petani</div>
              <div className="text-[11px] text-slate-500">Terbina di Jawa & Sumatra</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <Award className="w-5 h-5 text-amber-500 mb-1" />
              <div className="font-black text-slate-900 text-sm">85% Aliran Dana</div>
              <div className="text-[11px] text-slate-500">Masuk langsung ke kas petani</div>
            </div>
          </div>

          <p>
            Melalui integrasi teknologi rantai dingin <em>(cold-chain logistics)</em> dan portal digital, mitra petani kini dapat memantau pesanan masuk secara real-time, mengatur waktu petik saat subuh, dan menerbitkan resi pengiriman sendiri tanpa perantara.
          </p>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-[11px] text-brand-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Setiap kilogram buah dan sayur yang Anda beli mendukung pendidikan anak-anak keluarga petani.</span>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
