import React, { useState } from 'react';
import { Coins, Droplets, HeartPulse, Utensils, Sparkles, HeartHandshake, Beef, ArrowRight, MessageSquareQuote } from 'lucide-react';
import { RecentDonation } from '../types/charity';
import { BackgroundBadge } from './BackgroundBadge';

interface CampaignFundSectionProps {
  recentDonations: RecentDonation[];
  onSelectAmount: (amount: number, cause?: string) => void;
  onScrollToDonate: () => void;
}

export const CampaignFundSection: React.FC<CampaignFundSectionProps> = ({
  recentDonations,
  onSelectAmount,
  onScrollToDonate,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR'>('USD');
  const currencySymbol = selectedCurrency === 'USD' ? '$' : '€';

  const impactCards = [
    {
      icon: Droplets,
      title: 'Clean Water Boreholes',
      cause: 'Water Wells & Boreholes',
      impact: 'Brings disease-free drinking water to 2 rural families for 6 months.',
      color: 'from-sky-500 to-cyan-600',
    },
    {
      icon: HeartPulse,
      title: 'Sickle Cell Pediatric Care',
      cause: 'Sickle Cell Operation Campaign',
      impact: 'Covers 1 month of hydroxyurea medication and pain crisis clinic support.',
      color: 'from-rose-500 to-pink-600',
    },
    {
      icon: Utensils,
      title: 'Staple Family Food Pack',
      cause: 'Food Pack Distribution',
      impact: 'Supplies 10kg of maize flour, beans, and rice to a widow and orphans.',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: Sparkles,
      title: 'Girls Dignity Sanitary Kit',
      cause: 'Women Sanitary Pad Donation',
      impact: 'Provides 4 durable, reusable hygiene kits keeping girls in school classrooms.',
      color: 'from-teal-500 to-emerald-700',
    },
    {
      icon: HeartHandshake,
      title: 'Orphan Education & Boarding',
      cause: 'Orphan Sponsorship',
      impact: 'Provides school uniforms, notebooks, pencils, and hot school lunch for an orphan.',
      color: 'from-indigo-500 to-violet-600',
    },
    {
      icon: Beef,
      title: 'Qurbani & Eid Fresh Meat',
      cause: 'Kurban / Eid Sacrifices',
      impact: 'Distributes fresh halal protein portions to displaced families on Eid.',
      color: 'from-lime-500 to-emerald-600',
    },
  ];

  return (
    <section id="campaign" className="py-16 bg-gradient-to-b from-[#FAFDE6]/40 via-white to-[#FAFDE6]/40 border-b border-amber-200/60 relative overflow-hidden">
      {/* Official Sadaqah Africa Background Badge */}
      <BackgroundBadge size="giant" position="top-right" opacity="opacity-[0.04]" variant="color" className="hidden lg:block -mr-16 -mt-16" />
      <BackgroundBadge size="xl" position="bottom-left" opacity="opacity-[0.03]" variant="color" className="hidden sm:block -ml-12 mb-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-[#0A2E0F] text-xs font-bold uppercase tracking-wider">
            <Coins className="w-4 h-4 text-[#E59A14]" />
            <span>The $10 / €10 Sadaqah Movement</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl font-extrabold text-[#0A2E0F]">
            Small Acts of Sadaqah, <span className="italic text-[#165B1E]">Immense Generational Relief</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            You do not need a fortune to change a human life. Choose a dedicated cause below or contribute directly to the shared $50,000 Campaign Fund.
          </p>
        </div>

        {/* Content Split: 6 Impact Cards (Left 7 cols) & Shared Fund Box + Donor Feed (Right 5 cols) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Where your $10 goes */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                Where your $10 / €10 creates change
              </span>
              <span className="text-xs text-[#114A18] font-bold">
                1 Share = $10 / €10
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {impactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="bg-white rounded-3xl p-5 border border-amber-200/70 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group hover:-translate-y-0.5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-xs shrink-0`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-base text-[#0A2E0F] leading-tight">
                            {card.title}
                          </h3>
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#165B1E] block mt-0.5">
                            $10 Exact Allocation
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {card.impact}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          onSelectAmount(10, card.cause);
                          onScrollToDonate();
                        }}
                        className="flex-1 py-2 rounded-xl bg-[#114A18] hover:bg-[#165B1E] text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        Give $10 (1 share)
                      </button>
                      <button
                        onClick={() => {
                          onSelectAmount(25, card.cause);
                          onScrollToDonate();
                        }}
                        className="flex-1 py-2 rounded-xl bg-[#FAFDE6] hover:bg-[#F3F9C4] border border-[#A9CC2B]/50 text-[#0A2E0F] font-bold text-xs transition-colors cursor-pointer"
                      >
                        Give $25
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Shared $50,000 Fund Box + Recent Donor Wall */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* The Shared Fund Box */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A2E0F] via-[#114A18] to-[#165B1E] text-white p-6 sm:p-7 shadow-2xl border-2 border-[#D8EC6E]/30 space-y-5">
              <div className="absolute inset-0 lattice opacity-40 pointer-events-none" />

              <div className="relative space-y-4">
                <div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#D8EC6E] block">
                    Communal Relief Pool
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-editorial font-black text-5xl sm:text-6xl text-white">
                      $10
                    </span>
                    <span className="text-xl font-serif font-bold text-[#D8EC6E]">
                      / €10 per share
                    </span>
                  </div>
                  <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
                    Every gift joins our shared $50,000 campaign pool, directed immediately to the most urgent village emergency.
                  </p>
                </div>

                {/* Currency switch */}
                <div className="flex gap-1 p-1 rounded-2xl bg-white/10 border border-white/15">
                  <button
                    onClick={() => setSelectedCurrency('USD')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      selectedCurrency === 'USD'
                        ? 'bg-[#D8EC6E] text-[#0A2E0F]'
                        : 'text-emerald-100 hover:bg-white/10'
                    }`}
                  >
                    $ US Dollar
                  </button>
                  <button
                    onClick={() => setSelectedCurrency('EUR')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      selectedCurrency === 'EUR'
                        ? 'bg-[#D8EC6E] text-[#0A2E0F]'
                        : 'text-emerald-100 hover:bg-white/10'
                    }`}
                  >
                    € Euro
                  </button>
                </div>

                {/* Quick Multipliers */}
                <div className="grid grid-cols-4 gap-2">
                  {[1, 3, 5, 10].map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        onSelectAmount(10 * m, 'The $50,000 Campaign Fund');
                        onScrollToDonate();
                      }}
                      className="py-2.5 rounded-xl bg-white/10 hover:bg-[#D8EC6E] hover:text-[#0A2E0F] border border-white/20 font-black text-xs sm:text-sm transition-all cursor-pointer"
                    >
                      {currencySymbol}{10 * m}
                    </button>
                  ))}
                </div>

                {/* Big Button */}
                <button
                  onClick={() => {
                    onSelectAmount(10, 'The $50,000 Campaign Fund');
                    onScrollToDonate();
                  }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D8EC6E] to-[#C6E04A] hover:from-[#C6E04A] hover:to-[#D8EC6E] text-[#0A2E0F] font-black text-sm shadow-xl transition-all cursor-pointer"
                >
                  Give to the $50,000 Campaign Fund →
                </button>
              </div>
            </div>

            {/* Live Community Contributions Feed */}
            <div className="bg-white rounded-3xl p-5 border border-amber-200/70 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-[#114A18]" />
                  <span>Recent Community Pledges</span>
                </span>
                <span className="text-[0.65rem] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-mono">
                  Live Feed
                </span>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {recentDonations.map((don) => (
                  <div
                    key={don.id}
                    className="p-3 rounded-2xl bg-[#FAF7F0] border border-amber-200/50 text-xs space-y-1"
                  >
                    <div className="flex justify-between items-center font-bold text-[#0A2E0F]">
                      <span className="font-serif">{don.donorName}</span>
                      <span className="font-editorial font-black text-emerald-800 text-sm">
                        ${don.amountUSD} ({don.shares} {don.shares === 1 ? 'share' : 'shares'})
                      </span>
                    </div>

                    <div className="flex justify-between text-[0.65rem] text-slate-500">
                      <span className="font-medium text-[#114A18] truncate max-w-[180px]">{don.cause}</span>
                      <span className="font-mono text-slate-400">{don.timestamp}</span>
                    </div>

                    {don.duaOrMessage && (
                      <p className="text-[0.7rem] text-slate-600 italic pt-1 border-t border-slate-200/60 font-serif">
                        “{don.duaOrMessage}”
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
