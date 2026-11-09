import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'warning';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700/60 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
        type === 'success' ? 'bg-emerald-500 text-slate-950' : type === 'warning' ? 'bg-amber-500 text-slate-950' : 'bg-blue-500 text-white'
      }`}>
        {type === 'success' ? (
          <CheckCircle2 className="w-4 h-4" />
        ) : type === 'warning' ? (
          <AlertCircle className="w-4 h-4" />
        ) : (
          <Info className="w-4 h-4" />
        )}
      </div>
      <span className="text-xs font-semibold tracking-wide pr-1">{message}</span>
    </div>
  );
};
