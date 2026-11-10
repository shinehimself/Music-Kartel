import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Flag, Sparkles, Droplets, HeartPulse, Utensils, BookOpen, ShieldCheck } from 'lucide-react';
import { CampaignMilestone } from '../types/charity';

interface MilestonesRoadmapProps {
  milestones: CampaignMilestone[];
  currentRaised: number;
  goal: number;
  onSelectPhase: (amount: number, title: string) => void;
}

export const MilestonesRoadmap: React.FC<MilestonesRoadmapProps> = ({
  milestones,
  currentRaised,
  goal,
  onSelectPhase,
}) => {
  const icons = [Droplets, HeartPulse, Utensils, BookOpen, Flag];
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];

  return (
    <section id="milestones" className="py-16 bg-[#FAF7F0] border-b border-amber-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300/60 text-[#0A2E0F] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E59A14]" />
            <span>Structured Humanitarian Journey</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl font-extrabold text-[#0A2E0F] tracking-tight">
            How Every $10 Propels Us <span className="italic text-[#165B1E]">Up to $50,000</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            We don’t wait for mega-donors. By uniting thousands of $10 / €10 shares, we systematically fund and deliver each humanitarian phase across water-scarce African villages.
          </p>
        </div>

        {/* Interactive Milestones Timeline */}
        <div className="grid md:grid-cols-5 gap-4 lg:gap-5 relative">
          {milestones.map((ms, index) => {
            const Icon = icons[index % icons.length];
            const isFunded = currentRaised >= ms.amount;
            const isCurrent = !isFunded && (index === 0 || currentRaised >= milestones[index - 1].amount);
            const roman = romanNumerals[index] || `P${index + 1}`;

            return (
              <motion.div
                key={ms.amount}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`relative rounded-3xl p-5 border-2 transition-all flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md ${
                  isFunded
                    ? 'bg-white border-emerald-300/80'
                    : isCurrent
                    ? 'bg-gradient-to-b from-[#FAFDE6] via-white to-white border-[#E59A14] ring-2 ring-[#E59A14]/25'
                    : 'bg-white/70 border-slate-200 opacity-80'
                }`}
              >
                <div className="space-y-3">
                  {/* Status header with Roman badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-black text-xs text-[#114A18] tracking-widest uppercase flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#0A2E0F] flex items-center justify-center text-[0.65rem] font-bold">
                        {roman}
                      </span>
                      <span>{ms.phase}</span>
                    </span>

                    {isFunded ? (
                      <span className="inline-flex items-center gap-1 text-[0.65rem] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Funded
                      </span>
                    ) : isCurrent ? (
                      <span className="inline-flex items-center gap-1 text-[0.65rem] font-black text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full animate-pulse">
                        Active Phase
                      </span>
                    ) : (
                      <span className="text-[0.65rem] font-bold text-slate-400">
                        Upcoming
                      </span>
                    )}
                  </div>

                  {/* Icon and Amount */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                        isFunded
                          ? 'bg-[#114A18] text-[#F2AE2E]'
                          : isCurrent
                          ? 'bg-[#E59A14] text-[#0A2E0F]'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-editorial font-black text-2xl text-[#0A2E0F] block tabular-nums leading-none">
                        ${ms.amount.toLocaleString()}
                      </span>
                      <span className="text-[0.68rem] font-bold text-[#165B1E] block mt-1">
                        {ms.impactTag}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <h3 className="font-serif font-bold text-sm text-[#0A2E0F] leading-snug">
                    {ms.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {ms.description}
                  </p>
                </div>

                {/* Action */}
                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onSelectPhase(10, `${ms.title} ($10 Campaign)`)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-[#114A18] hover:bg-[#165B1E] text-white shadow-xs'
                        : isFunded
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-amber-100 hover:bg-amber-200 text-[#0A2E0F]'
                    }`}
                  >
                    Give $10 to {ms.phase} →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Transparency Note */}
        <div className="rounded-2xl bg-gradient-to-r from-[#FAFDE6] via-white to-[#FAFDE6] border border-amber-300/70 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#114A18] shrink-0" />
            <p className="text-slate-700 leading-relaxed">
              <strong className="text-[#0A2E0F] font-bold">100% Audited Delivery:</strong> Ground verification, water quality lab test certificates, and clinical surgery reports are archived for public review.
            </p>
          </div>
          <a
            href="https://wa.me/256794829147?text=Assalamu%20Alaikum%20Sadaqah%20Africa%2C%20I%20would%20like%20to%20view%20completed%20milestone%20reports."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#0A2E0F] text-[#F2AE2E] font-bold text-xs whitespace-nowrap hover:bg-[#114A18] transition-colors"
          >
            Request Field Reports via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
