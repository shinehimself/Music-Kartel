import React from 'react';
import { Package, Droplets, Building2, HeartHandshake, Sprout, Beef } from 'lucide-react';
import { FixedProject } from '../types/charity';

interface FixedProjectsSectionProps {
  projects: FixedProject[];
  onSelectFixedOption: (projectTitle: string, optionLabel: string, amount: number, currency: 'USD' | 'EUR' | 'GBP') => void;
}

export const FixedProjectsSection: React.FC<FixedProjectsSectionProps> = ({
  projects,
  onSelectFixedOption,
}) => {
  const iconMap: Record<string, React.ElementType> = {
    Package,
    Droplets,
    Building2,
    HeartHandshake,
    Sprout,
    Beef,
  };

  const gradients = [
    'from-amber-500 to-orange-600',
    'from-sky-500 to-cyan-700',
    'from-emerald-700 to-teal-900',
    'from-indigo-600 to-violet-700',
    'from-teal-600 to-emerald-700',
    'from-rose-600 to-red-700',
  ];

  return (
    <section id="fixed-projects" className="py-20 bg-gradient-to-br from-[#0A2E0F] via-[#114A18] to-[#165B1E] text-white relative overflow-hidden">
      <div className="absolute inset-0 lattice-light opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="font-arabic text-[#D8EC6E] text-lg sm:text-xl font-medium tracking-wide">
            صَدَقَةٌ جَارِيَةٌ يَبْقَى أَثَرُهَا إِلَى يَوْمِ القِيَامَةِ
          </p>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#D8EC6E] block font-mono">
            Enduring Sadaqah Jariyah
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Fund a Complete Project <span className="italic text-[#D8EC6E] font-normal">at a Fixed Price</span>
          </h2>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Sponsor an entire borehole, family livelihood, or village mosque in your name or as a dedication for a deceased loved one with an official stone plaque and video report.
          </p>
        </div>

        {/* 2x3 or 3x2 Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => {
            const Icon = iconMap[proj.iconName] || Package;
            const gradient = gradients[idx % gradients.length];

            return (
              <div
                key={proj.id}
                className="bg-[#FAF7F0] text-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-amber-300/50 flex flex-col justify-between space-y-6 hover:-translate-y-1.5 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-md ring-4 ring-amber-200/40`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-editorial font-bold text-xl sm:text-2xl text-[#0A2E0F] leading-tight group-hover:text-[#114A18] transition-colors">
                        {proj.title}
                      </h3>
                      <span className="text-[0.68rem] font-bold uppercase tracking-widest text-slate-500 font-mono">
                        {proj.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Option Pricing Buttons */}
                <div className="space-y-3 pt-3 border-t border-amber-200/70">
                  {proj.options.map((opt, optIdx) => (
                    <div key={optIdx} className="space-y-1.5">
                      {opt.label && (
                        <span className="text-[0.68rem] font-bold text-slate-500 block uppercase tracking-wider font-mono">
                          {opt.label}
                        </span>
                      )}
                      <div className="flex gap-2.5">
                        <button
                          onClick={() => onSelectFixedOption(proj.title, opt.label || '', opt.usd, 'USD')}
                          className="flex-1 py-2.5 px-3 rounded-2xl bg-[#E59A14] hover:bg-[#F2AE2E] text-[#0A2E0F] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer group/btn"
                        >
                          <span className="font-editorial font-black text-base">${opt.usd.toLocaleString()}</span>
                          <span className="text-[0.65rem] font-mono font-bold opacity-80">(USD)</span>
                        </button>

                        <button
                          onClick={() => onSelectFixedOption(proj.title, opt.label || '', opt.eur, 'EUR')}
                          className="flex-1 py-2.5 px-3 rounded-2xl bg-[#114A18] hover:bg-[#165B1E] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer group/btn"
                        >
                          <span className="font-editorial font-black text-base">€{opt.eur.toLocaleString()}</span>
                          <span className="text-[0.65rem] font-mono font-bold opacity-80 text-emerald-200">(EUR)</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
