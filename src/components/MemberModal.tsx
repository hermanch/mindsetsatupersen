import React, { useState } from 'react';
import { User } from '../types';
import { X, LogIn, UserPlus, Sparkles, CheckCircle2, Shield, Lock, ArrowRight } from 'lucide-react';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialCourseTitle?: string;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialCourseTitle
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedTier, setSelectedTier] = useState<'Bronze' | 'Gold' | 'VIP'>('VIP');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      isLoggedIn: true,
      name: name.trim() || email.split('@')[0] || 'Pembelajar Satu Persen',
      email: email || 'member@satupersen.id',
      memberTier: selectedTier
    };
    onLoginSuccess(newUser);
    onClose();
  };

  const handleQuickDemoLogin = () => {
    const demoUser: User = {
      isLoggedIn: true,
      name: 'Sahabat Satu Persen (VIP)',
      email: 'vip.member@satupersen.id',
      memberTier: 'VIP'
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
      
      {/* Modal Card */}
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-scale-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#FF2B2B] text-white p-6 relative overflow-hidden text-center">
          <div className="w-12 h-12 bg-white/20 rounded-2xl mx-auto flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-display font-extrabold text-white">
            {activeTab === 'login' ? 'Login Member Area' : 'Daftar Member Baru'}
          </h3>
          <p className="text-xs text-red-100 mt-1 font-medium">
            {initialCourseTitle
              ? `Akses khusus untuk materi: "${initialCourseTitle}"`
              : 'Nikmati seluruh video course & webinar eksklusif'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'border-[#FF2B2B] text-[#FF2B2B] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Masuk Member
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'border-[#FF2B2B] text-[#FF2B2B] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Registrasi Baru
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          <form onSubmit={handleSubmit} className="space-y-3">
            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#FF2B2B]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Member</label>
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#FF2B2B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#FF2B2B]"
              />
            </div>

            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pilih Paket Keanggotaan</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedTier('Gold')}
                    className={`p-2 rounded-xl border font-bold text-center ${
                      selectedTier === 'Gold' ? 'border-[#FF2B2B] bg-red-50 text-[#FF2B2B]' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Member Bulanan (Rp 49K)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTier('VIP')}
                    className={`p-2 rounded-xl border font-bold text-center ${
                      selectedTier === 'VIP' ? 'border-[#FF2B2B] bg-red-50 text-[#FF2B2B]' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Member Tahunan (Rp 399K)
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#FF2B2B] hover:bg-[#D91D1D] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {activeTab === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              {activeTab === 'login' ? 'Masuk ke Member Portal' : 'Selesaikan Pendaftaran'}
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400 block mb-2">Ingin mencoba membuka gated content langsung?</span>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Demo Akses Langsung (Simulasi Member VIP)
            </button>
          </div>

          <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
            <Shield className="w-3 h-3 text-slate-400" />
            <span>Koneksi terenkripsi & aman.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
