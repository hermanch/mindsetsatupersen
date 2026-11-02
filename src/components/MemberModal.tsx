import React, { useState, useEffect } from 'react';
import { User, RegisteredMember } from '../types';
import { X, LogIn, UserPlus, Lock, Shield, Eye, EyeOff, Mail, User as UserIcon, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { authenticateMember, registerUser } from '../utils/auth';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  onMemberRegistered?: (member: RegisteredMember) => void;
  initialCourseTitle?: string;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onMemberRegistered,
  initialCourseTitle
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedTier, setSelectedTier] = useState<'Bronze' | 'Gold' | 'VIP'>('VIP');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Escape key & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setError('');
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (activeTab === 'login') {
      if (!email.trim() || !password) {
        setError('Harap masukkan alamat email dan kata sandi.');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        try {
          const authenticatedUser = authenticateMember(email, password);
          onLoginSuccess(authenticatedUser);
          onClose();
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Terjadi kendala saat memverifikasi akun.');
          }
        }
      }, 300);

    } else {
      // Register
      if (!name.trim()) {
        setError('Harap masukkan nama lengkap Anda.');
        return;
      }
      if (!email.trim()) {
        setError('Harap masukkan alamat email yang valid.');
        return;
      }
      if (password.length < 6) {
        setError('Kata sandi minimal harus terdiri dari 6 karakter.');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        try {
          const { user, memberRecord } = registerUser({
            name,
            email,
            password,
            memberTier: selectedTier
          });

          if (onMemberRegistered) {
            onMemberRegistered(memberRecord);
          }

          onLoginSuccess(user);
          onClose();
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Gagal mendaftarkan akun. Silakan coba lagi.');
          }
        }
      }, 350);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="member-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto"
        >
          {/* Modal Card */}
          <motion.div
            key="member-modal-dialog"
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 360, mass: 0.7 }}
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="bg-[#FF2B2B] text-white p-6 relative overflow-hidden text-center">
              <div className="w-12 h-12 bg-white/20 rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-inner">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-display font-extrabold text-white">
                {activeTab === 'login' ? 'Login Member Area' : 'Daftar Member Baru'}
              </h3>
              <p className="text-xs text-red-100 mt-1 font-medium max-w-xs mx-auto">
                {initialCourseTitle
                  ? `Buka akses modul eksklusif: "${initialCourseTitle}"`
                  : 'Akses penuh ke seluruh materi kursus, webinar & template finansial'}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setError('');
                }}
                className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'border-[#FF2B2B] text-[#FF2B2B] bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Masuk Member
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register');
                  setError('');
                }}
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
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium leading-relaxed">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {activeTab === 'register' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Herman Setiawan"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (error) setError('');
                        }}
                        className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#FF2B2B] transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Member
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#FF2B2B] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder={activeTab === 'register' ? 'Minimal 6 karakter' : 'Masukkan kata sandi akun'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError('');
                      }}
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#FF2B2B] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {activeTab === 'register' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Pilih Paket Keanggotaan
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedTier('Gold')}
                        className={`p-2.5 rounded-xl border font-bold text-left transition-all cursor-pointer ${
                          selectedTier === 'Gold'
                            ? 'border-[#FF2B2B] bg-red-50 text-[#FF2B2B] shadow-xs'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-extrabold text-xs">Bulanan</div>
                        <div className="text-[11px] opacity-80">Rp 49.000 / bln</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedTier('VIP')}
                        className={`p-2.5 rounded-xl border font-bold text-left transition-all cursor-pointer relative ${
                          selectedTier === 'VIP'
                            ? 'border-[#FF2B2B] bg-red-50 text-[#FF2B2B] shadow-xs'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-extrabold text-xs flex items-center gap-1">
                          VIP Tahunan
                          <span className="text-[9px] bg-red-500 text-white px-1 py-0.2 rounded-full font-bold">Hemat 32%</span>
                        </div>
                        <div className="text-[11px] opacity-80">Rp 399.000 / thn</div>
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#FF2B2B] hover:bg-[#D91D1D] active:scale-[0.99] disabled:opacity-60 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                >
                  {isLoading ? (
                    <span>Memproses...</span>
                  ) : activeTab === 'login' ? (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Masuk ke Member Portal</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Selesaikan Pendaftaran Akun</span>
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1.5 border-t border-slate-100">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Data tersimpan aman & terlindungi secara terenkripsi.</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
