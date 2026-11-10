import React from 'react';
import { Coins, Droplets, HeartHandshake, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { SiteSettings } from '../types/charity';
import { BackgroundBadge } from './BackgroundBadge';

interface HeroCampaignProps {
  settings: SiteSettings;
  onSelectAmount: (amount: number, cause?: string) => void;
  onScrollToDonate: () => void;
}

export const HeroCampaign: React.FC<HeroCampaignProps> = ({
  settings,
  onSelectAmount,
  onScrollToDonate,
}) => {
  const goal = settings.goal || 50000;
  const raised = settings.raised || 36850;
  const percentage = Math.min(100, Math.round((raised / goal) * 100));
  const remainingUSD = Math.max(0, goal - raised);
  const remainingShares = Math.ceil(remainingUSD / 10);
  const totalShares = Math.floor(raised / 10);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A2E0F] via-[#114A18] to-[#165B1E] text-white pt-10 pb-20 sm:pt-14 sm:pb-24">
      {/* Background Islamic Lattice Pattern */}
      <div className="absolute inset-0 lattice opacity-30 pointer-events-none" />
      
      {/* Official Sadaqah Africa Background Badges / Watermarks */}
      <BackgroundBadge size="giant" position="top-right" opacity="opacity-[0.08]" variant="dark" className="hidden lg:block -mr-16 -mt-16" />
      <BackgroundBadge size="lg" position="bottom-left" opacity="opacity-[0.06]" variant="dark" className="hidden sm:block -ml-12 -mb-12" />

      {/* Radiant ambient glow */}
      <div className="absolute -top-32 -right-28 w-96 h-96 bg-[#E59A14]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-28 w-96 h-96 bg-[#D8EC6E]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Vision & Mission */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Movement Tag with Arabic Touch */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#114A18]/90 border border-[#F2AE2E]/40 text-[#F2AE2E] text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#F2AE2E] animate-pulse" />
              <span className="tracking-wide">THE $10 / €10 SADAQAH MOVEMENT</span>
              <span className="text-emerald-400 opacity-60">·</span>
              <span className="font-arabic text-sm text-[#D8EC6E] hidden sm:inline" dir="rtl">صَدَقَة جَارِيَة</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-[3.75rem] font-bold leading-[1.08] tracking-tight text-white">
              Every Step in the Right Direction Matters.{' '}
              <span className="text-lemon-gradient italic block sm:inline font-serif font-normal">
                Together, We Build a Brighter, More Equitable World.
              </span>
            </h1>

            {/* Narrative Paragraph */}
            <p className="text-emerald-50/90 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Partnering with frontline communities, local authorities, and volunteers across Africa, we deliver{' '}
              <strong className="text-white font-bold">clean water boreholes, pediatric sickle cell surgery, emergency food relief, orphan schooling, and women’s hygiene kits</strong>. 
              Our communal <strong className="text-[#F2AE2E] font-bold">$10 Campaign</strong> runs continuously toward our expanded{' '}
              <strong className="text-white font-bold">$50,000 Grand Community Goal</strong>.
            </p>

            {/* Quranic Inspiration Quote Box */}
            <div className="p-4 rounded-2xl bg-[#0A2E0F]/80 border border-emerald-600/60 max-w-2xl mx-auto lg:mx-0 text-left space-y-1.5 shadow-md">
              <p className="font-arabic text-base sm:text-lg text-[#F2AE2E] leading-relaxed text-right" dir="rtl">
                مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ
              </p>
              <p className="text-xs italic text-emerald-100/90 leading-relaxed">
                “The likeness of those who spend their wealth in the way of Allah is as that of a grain which sprouteth seven ears, in each ear a hundred grains...” <span className="text-[#D8EC6E] font-semibold font-sans not-italic">· Surah Al-Baqarah (2:261)</span>
              </p>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start pt-1">
              <button
                onClick={() => {
                  onSelectAmount(10, 'The $50,000 Campaign Fund');
                  onScrollToDonate();
                }}
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#E59A14] to-[#F2AE2E] hover:from-[#F2AE2E] hover:to-[#E59A14] text-[#0A2E0F] font-black text-sm sm:text-base shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Give 1 Share ($10 / €10)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#milestones"
                className="px-5 py-4 rounded-2xl bg-[#165B1E] hover:bg-[#114A18] border border-[#F2AE2E]/35 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Explore $50,000 Roadmap</span>
              </a>

              <a
                href="#request-aid"
                className="px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm transition-all flex items-center justify-center"
              >
                <span>Request Community Aid</span>
              </a>
            </div>

            {/* Quote of Integrity */}
            <div className="flex items-center gap-2.5 text-xs text-emerald-200/90 max-w-2xl mx-auto lg:mx-0">
              <ShieldCheck className="w-4 h-4 text-[#F2AE2E] shrink-0" />
              <span>Every gift is an Amanah (sacred trust), accounted for with field photos and receipts.</span>
            </div>
          </div>

          {/* Right Column: Live $50,000 Campaign Monitor Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#FAF7F0] text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#F2AE2E]/70 space-y-5 relative">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-amber-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#114A18] to-[#165B1E] text-[#F2AE2E] flex items-center justify-center shadow-md">
                    <Coins className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[0.65rem] font-extrabold uppercase tracking-widest text-[#165B1E] block">
                      Active Community Fund
                    </span>
                    <h2 className="font-serif font-extrabold text-xl sm:text-2xl text-[#0A2E0F] leading-tight">
                      The $10 Movement
                    </h2>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-[#0A2E0F] text-xs font-black shadow-xs">
                    {percentage}% Funded
                  </span>
                </div>
              </div>

              {/* Raised vs Goal Numbers */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[0.7rem] uppercase tracking-wider text-slate-500 font-bold block">
                      Total Raised to Date
                    </span>
                    <span className="font-editorial font-black text-4xl sm:text-5xl text-[#0A2E0F] tracking-tight tabular-nums block">
                      ${raised.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[0.7rem] uppercase tracking-wider text-slate-500 font-bold block">
                      Grand Goal
                    </span>
                    <span className="font-editorial font-black text-2xl sm:text-3xl text-[#114A18] tracking-tight tabular-nums block">
                      ${goal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Progress Bar with milestone ticks */}
                <div className="space-y-1.5 pt-1">
                  <div className="w-full bg-emerald-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-emerald-300/40 relative">
                    <div
                      className="bg-gradient-to-r from-[#165B1E] via-[#A9CC2B] to-[#E59A14] h-full rounded-full transition-all duration-700 relative"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[0.7rem] font-bold text-slate-500 font-mono">
                    <span>$0</span>
                    <span>$25k</span>
                    <span className="text-[#0A2E0F] font-black">$50k Goal</span>
                  </div>
                </div>
              </div>

              {/* Shares Stats */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-xs">
                <div>
                  <span className="text-slate-500 block text-[0.7rem]">Contributed Shares</span>
                  <span className="font-editorial font-black text-xl text-[#0A2E0F] tabular-nums block mt-0.5">
                    {totalShares.toLocaleString()} <span className="text-xs font-sans font-bold text-slate-600">shares</span>
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[0.7rem]">To Reach $50,000</span>
                  <span className="font-editorial font-black text-xl text-[#E59A14] tabular-nums block mt-0.5">
                    {remainingShares.toLocaleString()} <span className="text-xs font-sans font-bold text-slate-600">needed</span>
                  </span>
                </div>
              </div>

              {/* Quick Multiples of $10 */}
              <div className="space-y-2">
                <span className="text-[0.7rem] font-extrabold uppercase tracking-wider text-slate-600 block">
                  Select your $10 shares to give:
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { shares: 1, amount: 10 },
                    { shares: 3, amount: 30 },
                    { shares: 5, amount: 50 },
                    { shares: 10, amount: 100 },
                    { shares: 25, amount: 250 },
                  ].map((item) => (
                    <button
                      key={item.shares}
                      onClick={() => {
                        onSelectAmount(item.amount, 'The $50,000 Campaign Fund');
                        onScrollToDonate();
                      }}
                      className="py-2.5 px-1 rounded-xl border border-amber-300 hover:border-[#114A18] hover:bg-[#114A18] hover:text-white transition-all text-center text-[#0A2E0F] font-black text-xs sm:text-sm bg-white shadow-xs group cursor-pointer"
                    >
                      <span className="block font-serif">${item.amount}</span>
                      <span className="block text-[0.6rem] font-medium text-slate-500 group-hover:text-emerald-200">
                        {item.shares} {item.shares === 1 ? 'share' : 'shares'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Donate Button */}
              <button
                onClick={() => {
                  onSelectAmount(10, 'The $50,000 Campaign Fund');
                  onScrollToDonate();
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#114A18] to-[#165B1E] hover:from-[#0A2E0F] hover:to-[#114A18] text-white font-black text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Join the $50,000 Campaign Fund Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Footnote */}
              <p className="text-[0.7rem] text-center text-slate-500 leading-tight">
                Minimum donation: $10 / €10 or local equivalent · Verified NGO Registration in Uganda
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
