import React from 'react';
import {
  Droplets,
  Hospital,
  Wheat,
  HeartHandshake,
  Sparkles,
  BookOpen,
  Building2,
  Beef,
  Home,
  ArrowRight,
} from 'lucide-react';
import { ProgramItem } from '../types/charity';

interface ProgramsGridProps {
  programs: ProgramItem[];
  onSelectProgram: (title: string) => void;
}

export const ProgramsGrid: React.FC<ProgramsGridProps> = ({
  programs,
  onSelectProgram,
}) => {
  const iconMap: Record<string, React.ElementType> = {
    Droplets,
    Hospital,
    Wheat,
    HeartHandshake,
    Sparkles,
    BookOpen,
    Building2,
    Beef,
    Home,
  };

  const gradients = [
    'from-emerald-600 to-teal-800',
    'from-rose-500 to-pink-700',
    'from-amber-500 to-orange-600',
    'from-indigo-500 to-violet-700',
    'from-teal-500 to-emerald-700',
    'from-sky-500 to-cyan-700',
    'from-yellow-600 to-amber-700',
    'from-lime-600 to-emerald-700',
    'from-orange-600 to-red-700',
  ];

  return (
    <section id="programs" className="py-20 bg-[#FAF7F0] border-b border-amber-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="font-arabic text-[#114A18] text-lg sm:text-xl font-medium tracking-wide">
            وَمَا تُنفِقُوا مِنْ خَيْرٍ يُوَفَّ إِلَيْكُمْ
          </p>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#114A18] block">
            Dedicated Humanitarian Initiatives
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2E0F] tracking-tight leading-tight">
            Transforming Lives Across <span className="italic text-[#165B1E] font-normal">9 Essential Pillars</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every single dollar is directed straight into grassroots project execution with 100% Amanah accountability. Choose any pillar below to dedicate your donation shares.
          </p>
        </div>

        {/* 3x3 Responsive Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog, index) => {
            const Icon = iconMap[prog.iconName] || Droplets;
            const gradient = gradients[index % gradients.length];

            return (
              <div
                key={prog.id}
                onClick={() => onSelectProgram(prog.title)}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-6 group hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-md ring-4 ring-amber-100/50`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[0.68rem] font-bold uppercase tracking-widest text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200/60 font-mono">
                      {prog.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-editorial font-bold text-2xl text-[#0A2E0F] group-hover:text-[#114A18] transition-colors leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                      {prog.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="text-xs text-slate-700 bg-gradient-to-r from-emerald-50/90 to-amber-50/50 p-3 rounded-2xl border border-emerald-200/70">
                    <span className="font-editorial font-bold text-sm text-[#0A2E0F] block mb-0.5">
                      $10 Share Impact:
                    </span>
                    <span className="text-slate-600 leading-snug block">
                      {prog.unitTenDollarImpact}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-[#114A18] group-hover:text-[#E59A14] transition-colors pt-1">
                    <span className="tracking-wide">Select Pillar for Donation</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
