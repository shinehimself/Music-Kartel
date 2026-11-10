import React, { useState } from 'react';
import { Users, Droplets, Utensils, HeartPulse, HeartHandshake, Coins, TrendingUp } from 'lucide-react';
import { GROWTH_DATA } from '../data/charityData';
import { SiteSettings } from '../types/charity';

interface GrowthDashboardProps {
  settings: SiteSettings;
}

export const GrowthDashboard: React.FC<GrowthDashboardProps> = ({ settings }) => {
  const [activeMetric, setActiveMetric] = useState<'beneficiaries' | 'projects' | 'community'>('beneficiaries');
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(4); // Default to 2026

  const metricConfig = GROWTH_DATA[activeMetric];
  const years = metricConfig.years;
  const currentItem = years[selectedYearIndex] || years[4];

  // SVG Chart Dimensions
  const W = 600;
  const H = 240;
  const L = 36;
  const R = 36;
  const T = 36;
  const B = 36;

  const maxVal = Math.max(...years.map((y) => y.value)) * 1.15;
  const getX = (i: number) => L + (i * (W - L - R)) / (years.length - 1);
  const getY = (val: number) => H - B - (val / maxVal) * (H - B - T);

  const points = years.map((y, i) => ({ x: getX(i), y: getY(y.value) }));

  // Create smooth SVG cubic spline path
  let pathD = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    pathD += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }

  const areaD = `${pathD} L${points[points.length - 1].x},${H - B} L${points[0].x},${H - B} Z`;

  const kpis = [
    { icon: Users, value: settings.beneficiariesCount, label: 'Beneficiaries Reached', gradient: 'from-emerald-600 to-teal-700' },
    { icon: Droplets, value: settings.wellsCount, label: 'Boreholes & Wells', gradient: 'from-sky-500 to-cyan-600' },
    { icon: Utensils, value: settings.foodPacksCount, label: 'Food & Qurbani Packs', gradient: 'from-amber-500 to-orange-600' },
    { icon: HeartPulse, value: settings.padsSurgeriesCount, label: 'Pad Kits & Surgeries', gradient: 'from-rose-500 to-pink-600' },
    { icon: HeartHandshake, value: settings.volunteersPartnersCount, label: 'Volunteers & Partners', gradient: 'from-indigo-500 to-violet-600' },
    { icon: Coins, value: settings.onlineDonorsCount, label: 'Online $10 Donors', gradient: 'from-lime-500 to-emerald-600' },
  ];

  return (
    <section id="growth" className="py-20 bg-gradient-to-b from-[#FAFDE6]/80 via-white to-[#FAFDE6]/40 border-b border-amber-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="font-arabic text-[#114A18] text-lg sm:text-xl font-medium tracking-wide">
            بَرَكَةُ العَطَاءِ وَنَمَاءُ الأَثَرِ
          </p>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#114A18] block font-mono">
            Verifiable Grassroots Metrics &amp; Transparency
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2E0F] tracking-tight leading-tight">
            Our Growth &amp; Impact Volumes <span className="italic text-[#165B1E] font-normal">(2022–2026)</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Steady, auditable progress reflecting our commitment to the $10 Sadaqah movement and grassroots community self-reliance.
          </p>
        </div>

        {/* 6 High-Salience KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-amber-200/80 shadow-xs space-y-2 relative overflow-hidden group hover:border-[#114A18]/40 transition-colors"
              >
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${kpi.gradient} text-white flex items-center justify-center shadow-xs`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-editorial font-black text-2xl sm:text-3xl text-[#0A2E0F] block tabular-nums leading-none mb-1">
                    {kpi.value}
                  </span>
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 block leading-tight font-mono">
                    {kpi.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Growth Dashboard & Chart Panel */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A2E0F] via-[#114A18] to-[#165B1E] p-6 sm:p-8 text-white shadow-xl border border-[#D8EC6E]/30 space-y-6">
          <div className="absolute inset-0 lattice opacity-40 pointer-events-none" />

          {/* Top Row: Metric Titles & Segmented Switcher */}
          <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D8EC6E] flex items-center gap-1.5 font-mono">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Audited Annual Trajectory</span>
              </span>
              <h3 className="font-editorial font-extrabold text-2xl sm:text-3xl mt-1 tracking-tight">
                {metricConfig.label} (2022–2026)
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl mt-1">
                {metricConfig.sub}
              </p>
            </div>

            {/* Segmented Control */}
            <div className="flex flex-wrap gap-1 p-1 rounded-2xl bg-white/10 border border-white/15 backdrop-blur">
              <button
                type="button"
                onClick={() => setActiveMetric('beneficiaries')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeMetric === 'beneficiaries'
                    ? 'bg-[#D8EC6E] text-[#0A2E0F] shadow-xs'
                    : 'text-emerald-100 hover:bg-white/10'
                }`}
              >
                Beneficiaries
              </button>
              <button
                type="button"
                onClick={() => setActiveMetric('projects')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeMetric === 'projects'
                    ? 'bg-[#D8EC6E] text-[#0A2E0F] shadow-xs'
                    : 'text-emerald-100 hover:bg-white/10'
                }`}
              >
                Relief Units
              </button>
              <button
                type="button"
                onClick={() => setActiveMetric('community')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeMetric === 'community'
                    ? 'bg-[#D8EC6E] text-[#0A2E0F] shadow-xs'
                    : 'text-emerald-100 hover:bg-white/10'
                }`}
              >
                Donors &amp; Volunteers
              </button>
            </div>
          </div>

          {/* Middle: SVG Spline Chart + Selected Milestone Card */}
          <div className="relative grid lg:grid-cols-12 gap-6 items-center">
            {/* SVG Chart */}
            <div className="lg:col-span-8 rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-5">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Growth Chart">
                <defs>
                  <linearGradient id="growthAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D8EC6E" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#D8EC6E" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="growthLineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F2AE2E" />
                    <stop offset="100%" stopColor="#D8EC6E" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                {[0, 0.25, 0.5, 0.75, 1].map((f) => {
                  const y = T + (H - B - T) * f;
                  return (
                    <line
                      key={f}
                      x1={L}
                      x2={W - R}
                      y1={y}
                      y2={y}
                      stroke="#FFFFFF"
                      strokeOpacity="0.08"
                      strokeDasharray="3 3"
                    />
                  );
                })}

                {/* Area and Line */}
                <path d={areaD} fill="url(#growthAreaGrad)" />
                <path d={pathD} fill="none" stroke="url(#growthLineGrad)" strokeWidth="3.5" strokeLinecap="round" />

                {/* Interactive Points */}
                {points.map((p, i) => {
                  const isSelected = i === selectedYearIndex;
                  return (
                    <g
                      key={i}
                      className="cursor-pointer"
                      onClick={() => setSelectedYearIndex(i)}
                    >
                      <rect x={p.x - 30} y={0} width={60} height={H} fill="transparent" />
                      {isSelected && (
                        <circle cx={p.x} cy={p.y} r={14} fill="#D8EC6E" fillOpacity="0.25" />
                      )}
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isSelected ? 6.5 : 4.5}
                        fill={isSelected ? '#D8EC6E' : '#0A2E0F'}
                        stroke="#D8EC6E"
                        strokeWidth="2.5"
                      />
                      <text
                        x={p.x}
                        y={p.y - 14}
                        textAnchor="middle"
                        fontSize={isSelected ? '14' : '11'}
                        fontWeight="800"
                        fill={isSelected ? '#D8EC6E' : '#FFFFFF'}
                        className="tabular-nums"
                      >
                        {years[i].label}
                      </text>
                      <text
                        x={p.x}
                        y={H - 12}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="700"
                        fill="#FFFFFF"
                        fillOpacity={isSelected ? 1 : 0.65}
                      >
                        {years[i].year}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected Year Milestone Callout */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#D8EC6E] to-[#A9CC2B] text-[#0A2E0F] p-5 shadow-lg">
                <span className="text-xs font-black uppercase tracking-wider opacity-75 block">
                  {currentItem.year} Milestone Volume
                </span>
                <span className="font-serif font-black text-4xl sm:text-5xl block tabular-nums">
                  {currentItem.label}
                </span>
                <span className="inline-block mt-2 px-2.5 py-1 rounded-full bg-[#0A2E0F] text-[#D8EC6E] text-xs font-bold">
                  {currentItem.yoy}
                </span>
              </div>

              <div className="rounded-2xl bg-white/10 border border-white/15 p-4 space-y-1">
                <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#F2AE2E] block">
                  Verified Ground Delivery
                </span>
                <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed font-medium">
                  {currentItem.milestone}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Year Switch Buttons */}
          <div className="relative flex flex-wrap gap-2 pt-2 border-t border-white/10">
            {years.map((y, i) => (
              <button
                key={y.year}
                type="button"
                onClick={() => setSelectedYearIndex(i)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  i === selectedYearIndex
                    ? 'bg-[#E59A14] text-[#0A2E0F] border-[#E59A14] shadow-xs'
                    : 'border-white/20 text-white/80 hover:bg-white/10'
                }`}
              >
                {y.year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
