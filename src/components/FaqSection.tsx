import React from 'react';
import { HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/charityData';

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#114A18] block font-mono">
          Clear Transparency &amp; Answers
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2E0F] tracking-tight leading-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Everything you need to know about the $10 movement, our $50,000 community milestone, and official verification.
        </p>
      </div>

      <div className="space-y-4 text-sm">
        {FAQ_ITEMS.map((item, idx) => (
          <details
            key={idx}
            className="group bg-white rounded-3xl border border-amber-200/80 p-5 sm:p-6 shadow-xs hover:border-amber-300 transition-all"
          >
            <summary className="font-editorial font-bold text-lg sm:text-xl text-[#0A2E0F] cursor-pointer list-none flex items-center justify-between gap-3">
              <span className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#E59A14] shrink-0" />
                <span>{item.q}</span>
              </span>
              <span className="text-[#114A18] font-mono font-bold text-xl group-open:rotate-45 transition-transform shrink-0">
                +
              </span>
            </summary>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-3 pl-8 border-t border-slate-100 mt-3">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};
