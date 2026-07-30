import React, { useState } from 'react';
import { User } from '../types';
import { Play, LogIn, UserCheck, Menu, X, Sparkles } from 'lucide-react';
import { YOUTUBE_CHANNEL_URL } from '../data/mockData';

interface NavbarProps {
  user: User;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onOpenAuthModal, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Fitur dinamis (manajemen member, akses video, dll) akan dikelola dan diintegrasikan melalui Dashboard Admin di tahap pengembangan selanjutnya */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Brand "MINDSET SATU PERSEN." */}
            <a href="#" className="flex items-center gap-3 group focus:outline-hidden">
              <div className="bg-[#FF2B2B] text-white px-3 py-2 rounded-lg font-display font-extrabold tracking-tight text-lg sm:text-xl shadow-md group-hover:scale-105 transition-transform duration-200 flex flex-col leading-none text-center">
                <span>MINDSET</span>
                <span>SATU</span>
                <span>PERSEN.</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-display font-extrabold text-slate-900 tracking-tight text-lg group-hover:text-[#FF2B2B] transition-colors">
                  MINDSET SATU PERSEN
                </span>
                <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
                  Edukasi Finansial & Ekonomi
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a 
                href="#tentang" 
                className="text-sm font-semibold text-slate-700 hover:text-[#FF2B2B] transition-colors"
              >
                Tentang Kami
              </a>
              <a 
                href="#topik" 
                className="text-sm font-semibold text-slate-700 hover:text-[#FF2B2B] transition-colors"
              >
                Topik Edukasi
              </a>
              <a 
                href="#kalkulator" 
                className="text-sm font-semibold text-slate-700 hover:text-[#FF2B2B] transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#FF2B2B]" />
                Kalkulator 1%
              </a>
              <a 
                href="#premium" 
                className="text-sm font-semibold text-slate-700 hover:text-[#FF2B2B] transition-colors flex items-center gap-1.5"
              >
                <span className="bg-red-100 text-[#FF2B2B] text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                  VIP
                </span>
                Premium Course
              </a>
            </nav>

            {/* Header Right CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 hover:text-[#FF2B2B] bg-slate-100 hover:bg-red-50 rounded-lg border border-slate-200 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-[#FF2B2B] text-[#FF2B2B]" />
                YouTube Channel
              </a>

              {user.isLoggedIn ? (
                <div className="flex items-center gap-3 bg-red-50 p-1.5 pl-3 rounded-lg border border-red-200">
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-[120px]">{user.name}</span>
                    <span className="text-[10px] font-bold text-[#FF2B2B] uppercase">Member {user.memberTier || 'VIP'}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-white rounded-md transition-all text-xs font-bold"
                    title="Logout"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#FF2B2B] hover:bg-[#D91D1D] rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  Login Member
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 text-slate-700 hover:bg-slate-100 rounded-lg focus:outline-hidden"
                aria-label="Toggle Navigation"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <a
              href="#tentang"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-md"
            >
              Tentang Kami
            </a>
            <a
              href="#topik"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-md"
            >
              Topik Edukasi
            </a>
            <a
              href="#kalkulator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-md"
            >
              Kalkulator Mindset 1%
            </a>
            <a
              href="#premium"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-md text-[#FF2B2B]"
            >
              Video Course Premium
            </a>
            
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-800 bg-slate-100 rounded-lg"
              >
                <Play className="w-4 h-4 fill-[#FF2B2B] text-[#FF2B2B]" />
                Kunjungi YouTube
              </a>

              {user.isLoggedIn ? (
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 bg-red-50 rounded-lg"
                >
                  Keluar Member ({user.name})
                </button>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuthModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-[#FF2B2B] rounded-lg shadow-md"
                >
                  <LogIn className="w-4 h-4" />
                  Login Member
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
