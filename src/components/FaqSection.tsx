import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-[#FF2B2B] font-bold text-xs uppercase tracking-wider border border-red-100">
            <HelpCircle className="w-4 h-4" />
            Tanya Jawab (FAQ)
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Pertanyaan Yang Sering Diajukan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Masih ada pertanyaan seputar konten YouTube atau keanggotaan Member Satu Persen?
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 font-display font-bold text-slate-900 text-base sm:text-lg flex justify-between items-center gap-4 hover:text-[#FF2B2B] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#FF2B2B]" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-200/60 mt-1 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
