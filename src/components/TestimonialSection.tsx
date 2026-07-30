import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, Award, MessageSquareQuote } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100/80 text-[#FF2B2B] font-bold text-xs uppercase tracking-wider">
            <MessageSquareQuote className="w-4 h-4" />
            Cerita Komunitas Pembelajar
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Kisah Nyata Perubahan Finansial Penonton
          </h2>
          <p className="text-slate-600 text-base">
            Bukan sekadar teori, inilah bukti konsistensi 1% setiap hari mengubah pola pikir dan kondisi finansial mereka.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Metric Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200/80">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  {item.metric}
                </div>

                {/* Stars */}
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{item.story}"
                </p>
              </div>

              {/* Author Row */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-red-200"
                />
                <div>
                  <h4 className="font-display font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
