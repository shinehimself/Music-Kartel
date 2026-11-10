import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Hospital,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
  Users,
  Award,
  Sparkles,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { InfrastructureCategory, InfrastructureTier } from '../types/charity';
import { BackgroundBadge } from './BackgroundBadge';

interface InstitutionalProjectsSectionProps {
  categories: InfrastructureCategory[];
  onSelectProject: (causeTitle: string, amountUSD: number) => void;
}

export const InstitutionalProjectsSection: React.FC<InstitutionalProjectsSectionProps> = ({
  categories,
  onSelectProject,
}) => {
  const [activeTab, setActiveTab] = useState<'school' | 'hospital'>('school');
  const currentCategory = categories.find((c) => c.type === activeTab) || categories[0];

  const [customAmount, setCustomAmount] = useState<number>(
    activeTab === 'school' ? 35000 : 75000
  );

  // Update slider default when tab switches
  const handleTabSwitch = (tab: 'school' | 'hospital') => {
    setActiveTab(tab);
    setCustomAmount(tab === 'school' ? 35000 : 75000);
  };

  return (
    <section id="infrastructure" className="py-20 bg-gradient-to-b from-[#FAF7F0] via-white to-[#FAFDE6]/50 border-b border-amber-200/60 relative overflow-hidden">
      {/* Official Sadaqah Africa Emblem Background Watermark */}
      <BackgroundBadge size="giant" position="top-right" opacity="opacity-[0.05]" variant="color" className="hidden lg:block -mr-20 -mt-10" />
      <BackgroundBadge size="xl" position="bottom-left" opacity="opacity-[0.04]" variant="color" className="hidden sm:block -ml-16 mb-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="font-arabic text-[#114A18] text-lg sm:text-xl font-medium tracking-wide">
            صَدَقَةٌ جَارِيَةٌ وَأَثَرٌ يَبْقَى لِلأَجْيَالِ
          </p>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#114A18] block font-mono">
            Major Infrastructure Endowment · Sadaqah Jariyah
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2E0F] tracking-tight leading-tight">
            School &amp; Hospital Construction <span className="italic text-[#165B1E] font-normal">· Permanent Village Legacies</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Sponsor a full rural primary school, integrated Islamic madrasa, maternity surgical clinic, or general hospital. Complete projects include carved marble donor dedications, solar electrification, deep borehole integration, and lifetime community endowment deeds.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 max-w-xl w-full p-1.5 rounded-3xl bg-[#FAF7F0] border-2 border-amber-300/80 shadow-md">
            <button
              type="button"
              onClick={() => handleTabSwitch('school')}
              className={`py-4 px-4 sm:px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                activeTab === 'school'
                  ? 'bg-[#114A18] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <GraduationCap className={`w-5 h-5 ${activeTab === 'school' ? 'text-[#D8EC6E]' : 'text-slate-500'}`} />
              <div className="text-left">
                <span className="block leading-tight font-editorial text-sm sm:text-base font-bold">
                  School Construction
                </span>
                <span className="block text-[0.68rem] font-mono opacity-80">
                  $20,000 – $70,000
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleTabSwitch('hospital')}
              className={`py-4 px-4 sm:px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                activeTab === 'hospital'
                  ? 'bg-[#114A18] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Hospital className={`w-5 h-5 ${activeTab === 'hospital' ? 'text-[#D8EC6E]' : 'text-slate-500'}`} />
              <div className="text-left">
                <span className="block leading-tight font-editorial text-sm sm:text-base font-bold">
                  Hospital &amp; Clinics
                </span>
                <span className="block text-[0.68rem] font-mono opacity-80">
                  $43,000 – $150,000
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Animated Tab Content with Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-12"
          >
            {/* Category Hero Banner */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0A2E0F] via-[#114A18] to-[#165B1E] text-white p-6 sm:p-10 shadow-xl border-2 border-amber-300/40 relative overflow-hidden">
              <div className="absolute inset-0 lattice-light opacity-25 pointer-events-none" />

          <div className="relative grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#D8EC6E] text-xs font-bold uppercase tracking-wider font-mono">
                {activeTab === 'school' ? <GraduationCap className="w-3.5 h-3.5" /> : <Hospital className="w-3.5 h-3.5" />}
                <span>{currentCategory.tagline}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {currentCategory.title}
              </h3>
              <p className="font-arabic text-[#D8EC6E] text-base sm:text-lg">
                {currentCategory.arabicTitle}
              </p>
              <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-2xl">
                {currentCategory.description}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              {currentCategory.stats.map((st, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/15">
                  <span className="text-[0.65rem] text-emerald-200 uppercase tracking-wider block font-mono">
                    {st.label}
                  </span>
                  <span className="font-editorial font-bold text-sm sm:text-base text-[#D8EC6E] block mt-0.5">
                    {st.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Infrastructure Tiers Cards */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                Select Your Desired Construction Scope
              </span>
              <h4 className="font-editorial text-2xl font-bold text-[#0A2E0F]">
                Available Building Tiers &amp; Turnkey Specifications
              </h4>
            </div>
            <span className="text-xs font-mono font-semibold text-[#114A18] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
              Directly connected to Amanah Payment System
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentCategory.tiers.map((tier) => (
              <div
                key={tier.id}
                className="bg-white rounded-3xl p-6 border-2 border-amber-200/80 shadow-md hover:shadow-2xl hover:border-[#114A18] transition-all flex flex-col justify-between space-y-6 group hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-[#0A2E0F] text-[0.68rem] font-bold font-mono">
                      {tier.badge}
                    </span>
                    <span className="text-[0.68rem] font-bold text-slate-500 flex items-center gap-1 font-mono">
                      <Users className="w-3 h-3 text-[#114A18]" />
                      <span>{tier.capacity}</span>
                    </span>
                  </div>

                  <div>
                    <h5 className="font-editorial font-bold text-xl text-[#0A2E0F] group-hover:text-[#114A18] transition-colors leading-snug">
                      {tier.name}
                    </h5>
                    <div className="mt-2.5 flex items-baseline gap-1.5">
                      <span className="font-editorial font-black text-3xl sm:text-4xl text-[#114A18] tabular-nums">
                        ${tier.amountUSD.toLocaleString()}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-500">
                        USD
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {tier.summary}
                  </p>

                  {/* Bullet features */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 font-mono block">
                      Included Turnkey Specs:
                    </span>
                    <ul className="space-y-1.5">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Direct Action Button attached to Payment */}
                <button
                  type="button"
                  onClick={() =>
                    onSelectProject(
                      `${currentCategory.type === 'school' ? 'School Construction' : 'Hospital Construction'}: ${tier.name}`,
                      tier.amountUSD
                    )
                  }
                  className="w-full py-3.5 rounded-2xl bg-[#114A18] hover:bg-[#165B1E] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
                >
                  <span>Sponsor Full ${tier.amountUSD.toLocaleString()}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>

        {/* Custom Range Slider & Pledging Box */}
        <div className="rounded-3xl bg-gradient-to-r from-[#FAFDE6] via-white to-amber-50/70 p-6 sm:p-8 border-2 border-amber-300 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#114A18] font-mono block">
                Custom Major Sponsorship Option
              </span>
              <h4 className="font-editorial font-bold text-2xl text-[#0A2E0F]">
                Pledge Any Amount in the {currentCategory.type === 'school' ? '$20,000 – $70,000' : '$43,000 – $150,000'} Range
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                You can fund a wing, sponsor classroom suites, or donate an arbitrary capital grant towards this project.
              </p>
            </div>

            <div className="text-right">
              <span className="font-editorial font-black text-3xl sm:text-4xl text-[#0A2E0F] tabular-nums block">
                ${customAmount.toLocaleString()} <span className="font-mono text-sm font-bold text-slate-500">USD</span>
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-700">
                {Math.floor(customAmount / 10).toLocaleString()} x $10 units
              </span>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <input
              type="range"
              min={currentCategory.minUSD}
              max={currentCategory.maxUSD}
              step={1000}
              value={customAmount}
              onChange={(e) => setCustomAmount(Number(e.target.value))}
              className="w-full h-3 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-[#114A18]"
            />
            <div className="flex justify-between text-xs font-mono font-bold text-slate-500">
              <span>Min: ${currentCategory.minUSD.toLocaleString()}</span>
              <span>Selected: ${customAmount.toLocaleString()}</span>
              <span>Max: ${currentCategory.maxUSD.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full legal community trust endowment · Plaque inscribed with your dedicated name</span>
            </div>

            <button
              type="button"
              onClick={() =>
                onSelectProject(
                  `${currentCategory.type === 'school' ? 'School Construction' : 'Hospital Construction'} (Custom Grant)`,
                  customAmount
                )
              }
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#E59A14] hover:bg-[#F2AE2E] text-[#0A2E0F] font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Attach ${customAmount.toLocaleString()} to Payment Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Accountability & Milestone Reporting Guarantee */}
        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs flex items-start gap-3">
            <Award className="w-5 h-5 text-[#E59A14] shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-[#0A2E0F] block font-bold">Custom Marble Inscription</strong>
              Your name, family legacy, or loved one commemorated on a permanent stone entrance plaque.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs flex items-start gap-3">
            <Calendar className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-[#0A2E0F] block font-bold">Drone &amp; Video Audits</strong>
              High-definition video progress reports dispatched at foundation, roofing, and commissioning.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs flex items-start gap-3">
            <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-[#0A2E0F] block font-bold">Verified Land Deeds</strong>
              Officially registered in trust with local education / healthcare boards for perpetuity.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
