import React from 'react';
import { YOUTUBE_CHANNEL_URL } from '../data/mockData';
import { Youtube, Instagram, Send, Heart, ArrowUp, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#FF2B2B] text-white px-2.5 py-1.5 rounded-lg font-display font-black text-sm tracking-tight leading-tight text-center">
                <span>MINDSET</span><br />
                <span>SATU PERSEN.</span>
              </div>
              <span className="font-display font-extrabold text-white text-xl tracking-tight">
                MINDSET SATU PERSEN
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Edukasi keuangan dan ekonomi yang sederhana dan mudah dipahami. Membantu kamu membangun mindset finansial sehat dan perlahan menuju kebebasan finansial.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#FF2B2B] hover:border-red-900 transition-all"
                title="YouTube Channel @mindsetsatupersen05"
              >
                <Youtube className="w-5 h-5 fill-current" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:border-pink-900 transition-all"
                title="Instagram @mindsetsatupersen"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-900 transition-all"
                title="Komunitas Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Nav Links Column 1 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              Navigasi Utama
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#tentang" className="hover:text-[#FF2B2B] transition-colors">Tentang Kami</a>
              </li>
              <li>
                <a href="#topik" className="hover:text-[#FF2B2B] transition-colors">Topik Video Edukasi</a>
              </li>
              <li>
                <a href="#kalkulator" className="hover:text-[#FF2B2B] transition-colors">Kalkulator Mindset 1%</a>
              </li>
              <li>
                <a href="#premium" className="hover:text-[#FF2B2B] transition-colors">Video Course Premium</a>
              </li>
            </ul>
          </div>

          {/* Channel Info & Official Link */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              Channel Resmi YouTube
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Langganan gratis di channel YouTube kami untuk update video terbaru seputar tips atur gaji, menabung, dan investasi.
            </p>

            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FF2B2B] hover:bg-[#D91D1D] text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              <Youtube className="w-4 h-4 fill-white" />
              www.youtube.com/@mindsetsatupersen05
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 Mindset Satu Persen. Hak Cipta Dilindungi Undang-Undang.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
