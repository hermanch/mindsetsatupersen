import React from 'react';
import { PREMIUM_COURSES, MEMBER_PLANS } from '../data/mockData';
import { PremiumCourse, User } from '../types';
import { Lock, Unlock, Shield, Star, CheckCircle, Clock, Sparkles, ArrowRight, Play, BookOpen } from 'lucide-react';

interface PremiumMemberSectionProps {
  user: User;
  onOpenJoinModal: (courseTitle?: string) => void;
  onPreviewCourse: (course: PremiumCourse) => void;
}

export const PremiumMemberSection: React.FC<PremiumMemberSectionProps> = ({
  user,
  onOpenJoinModal,
  onPreviewCourse
}) => {
  return (
    <>
      {/* Fitur dinamis (manajemen member, akses video, dll) akan dikelola dan diintegrasikan melalui Dashboard Admin di tahap pengembangan selanjutnya */}
      <section id="premium" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white relative overflow-hidden">
        
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-800/80 text-[#FF2B2B] font-bold text-xs uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              Gated Content & Member Area
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
              Video Course & Webinar Premium
            </h2>
            
            <p className="text-slate-300 text-base sm:text-lg">
              Akses materi mendalam, studi kasus riil, template financial planner, dan rekaman webinar bulanan yang tidak dipublikasikan di YouTube gratis.
            </p>

            {user.isLoggedIn && (
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-4 py-2 rounded-xl text-xs font-bold">
                <Unlock className="w-4 h-4 text-emerald-400" />
                Status: Kamu Terverifikasi Sebagai Member ({user.memberTier || 'VIP'}). Semua Akses Terbuka!
              </div>
            )}
          </div>

          {/* Premium Video Cards Grid (Gated UI) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {PREMIUM_COURSES.map((course) => {
              const isLockedForUser = course.isLocked && !user.isLoggedIn;

              return (
                <div
                  key={course.id}
                  className="bg-slate-800/80 rounded-2xl border border-slate-700/80 overflow-hidden shadow-xl hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between group relative"
                >
                  
                  {/* Thumbnail Container with Lock Effect */}
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        isLockedForUser ? 'filter blur-xs brightness-50 scale-105' : 'group-hover:scale-105'
                      }`}
                    />

                    {/* Badge Top Left */}
                    <div className="absolute top-3 left-3 bg-[#FF2B2B] text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-md">
                      {course.badge}
                    </div>

                    {/* Locked Overlay Effect */}
                    {isLockedForUser ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] p-4 text-center">
                        <div className="w-12 h-12 bg-red-600/90 text-white rounded-full flex items-center justify-center shadow-2xl mb-2 animate-bounce">
                          <Lock className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-extrabold text-white uppercase tracking-wider bg-black/70 px-2.5 py-1 rounded-md border border-red-500/40">
                          Terkunci - Khusus Member
                        </span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => onPreviewCourse(course)}
                          className="w-12 h-12 bg-[#FF2B2B] text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </button>
                      </div>
                    )}

                    {/* Rating & Level */}
                    <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 rounded text-[10px] text-slate-300 font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {course.rating} • {course.level}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-1.5">
                        <span className="flex items-center gap-1 text-slate-300">
                          <BookOpen className="w-3.5 h-3.5 text-[#FF2B2B]" />
                          {course.lessonsCount} Modul Materi
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          {course.duration}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-base text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                        {course.title}
                      </h3>

                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Card Footer Button */}
                    <div className="pt-3 border-t border-slate-700/80">
                      {isLockedForUser ? (
                        <button
                          onClick={() => onOpenJoinModal(course.title)}
                          className="w-full py-2.5 px-4 bg-[#FF2B2B] hover:bg-[#D91D1D] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          Gabung Member untuk Akses
                        </button>
                      ) : (
                        <button
                          onClick={() => onPreviewCourse(course)}
                          className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Unlock className="w-3.5 h-3.5" />
                          Tonton Sekarang (Member Active)
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

          {/* Pricing & Membership Tier Box */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF2B2B]">
                Investasi Leher Ke Atas
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                Pilih Paket Keanggotaan Member Satu Persen
              </h3>
              <p className="text-slate-300 text-sm">
                Gabung sekarang dan nikmati seluruh rekaman webinar, modul eksklusif, serta grup diskusi Telegram.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {MEMBER_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between border transition-all relative ${
                    plan.isPopular
                      ? 'bg-gradient-to-b from-red-950/60 to-slate-900 border-[#FF2B2B] shadow-2xl ring-2 ring-[#FF2B2B]/50'
                      : 'bg-slate-900/80 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF2B2B] text-white px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-lg">
                      Rekomendasi Hemat 32%
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-display font-bold text-white">{plan.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                        {plan.price}
                      </span>
                      <span className="text-xs text-slate-400">{plan.period}</span>
                    </div>

                    <ul className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                      {plan.perks.map((perk, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#FF2B2B] shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <button
                      onClick={() => onOpenJoinModal(plan.name)}
                      className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                        plan.isPopular
                          ? 'bg-[#FF2B2B] hover:bg-[#D91D1D] text-white'
                          : 'bg-white hover:bg-slate-100 text-slate-900'
                      }`}
                    >
                      {plan.ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Guarantee note */}
            <div className="mt-10 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Akses instan setelah registrasi. Dapat dibatalkan kapan saja tanpa biaya tambahan.</span>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};
