import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Droplets,
  HeartPulse,
  Utensils,
  GraduationCap,
  Sparkles,
  Pause,
  Play,
  Zap,
  Building,
  CheckCircle2,
} from 'lucide-react';

interface TickerItem {
  id: string;
  type: 'donation' | 'dispatch' | 'milestone';
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  tagColor: string;
  title: string;
  detail: string;
  time: string;
  amount?: string;
  cause: string;
}

const LIVE_TICKER_DATA: TickerItem[] = [
  {
    id: 't-1',
    type: 'donation',
    icon: Zap,
    tag: 'NEW PLEDGE',
    tagColor: 'bg-emerald-500/20 text-[#D8EC6E] border-emerald-400/40',
    title: 'Sister Aisha M. (London, UK)',
    detail: 'Pledged 5 x $10 shares ($50)',
    time: '2m ago',
    amount: '$50',
    cause: 'Water Wells & Boreholes',
  },
  {
    id: 't-2',
    type: 'dispatch',
    icon: Droplets,
    tag: 'BOREHOLE COMPLETE',
    tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    title: 'Kayunga District Well #68',
    detail: 'Deep solar borehole commissioned · 380 villagers drinking clean water',
    time: '14m ago',
    cause: 'Water Wells & Boreholes',
  },
  {
    id: 't-3',
    type: 'dispatch',
    icon: HeartPulse,
    tag: 'SURGERY SUCCESSFUL',
    tagColor: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    title: 'Pediatric Sickle Cell Unit',
    detail: 'Blood crisis stabilization & 3-month hydroxyurea provided for 4yo Musa',
    time: '28m ago',
    cause: 'Sickle Cell Operation Campaign',
  },
  {
    id: 't-4',
    type: 'donation',
    icon: Zap,
    tag: 'NEW PLEDGE',
    tagColor: 'bg-emerald-500/20 text-[#D8EC6E] border-emerald-400/40',
    title: 'Brother Omar K. (Toronto, CA)',
    detail: 'Pledged 10 x $10 shares ($100)',
    time: '35m ago',
    amount: '$100',
    cause: 'School & Hospital Infrastructure',
  },
  {
    id: 't-5',
    type: 'milestone',
    icon: GraduationCap,
    tag: 'SCHOOL PHASE 1',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    title: 'Kayunga Primary School Block',
    detail: 'Foundation & 4 classroom walls completed ($20,000 Milestone)',
    time: '1h ago',
    cause: 'Community School Construction ($20k–$70k)',
  },
  {
    id: 't-6',
    type: 'dispatch',
    icon: Utensils,
    tag: 'FOOD DISPATCH',
    tagColor: 'bg-lime-500/20 text-lime-300 border-lime-400/40',
    title: 'Ramadan Family Parcels',
    detail: '340 nutrition bundles (flour, beans, oil) delivered to Mukono widows',
    time: '2h ago',
    cause: 'Food Pack Distribution',
  },
  {
    id: 't-7',
    type: 'donation',
    icon: Zap,
    tag: 'MOMO TRANSFER',
    tagColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40',
    title: 'Al-Hajj Sulaiman (Kampala, UG)',
    detail: 'Sent USh 370,000 via MTN MoMo (10 shares)',
    time: '2h ago',
    amount: '$100',
    cause: 'The $50,000 Campaign Fund',
  },
  {
    id: 't-8',
    type: 'dispatch',
    icon: Building,
    tag: 'CLINIC PROGRESS',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    title: 'Mityana Maternal Hospital',
    detail: 'Triage & Sickle Cell Lab foundations cast with engineering sign-off',
    time: '3h ago',
    cause: 'Community Hospital & Clinic ($43k–$150k)',
  },
];

interface LiveSlidingTickerProps {
  onSelectCause?: (cause: string, amount?: number) => void;
}

export const LiveSlidingTicker: React.FC<LiveSlidingTickerProps> = ({ onSelectCause }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  // Repeat data array twice to guarantee seamless infinite loop
  const repeatedData = [...LIVE_TICKER_DATA, ...LIVE_TICKER_DATA];

  return (
    <div className="relative bg-[#061F0A] text-white border-y border-amber-400/30 overflow-hidden shadow-inner select-none z-30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center">
        {/* Live Indicator Badge (Fixed Left) */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#0A2E0F] border-b sm:border-b-0 sm:border-r border-amber-300/30 shrink-0 w-full sm:w-auto justify-between sm:justify-start z-10 shadow-md">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[0.68rem] font-black uppercase tracking-widest text-[#D8EC6E] font-mono">
              LIVE DISPATCHES
            </span>
          </div>

          {/* Controls: Pause / Play & Speed */}
          <div className="flex items-center gap-1.5 pl-2">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Resume sliding' : 'Pause sliding'}
              className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-emerald-200 transition-colors cursor-pointer"
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </button>
            <button
              type="button"
              onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))}
              title="Toggle sliding speed"
              className="px-1.5 py-0.5 rounded text-[0.6rem] font-mono font-bold bg-white/10 hover:bg-white/20 text-[#D8EC6E] transition-colors cursor-pointer"
            >
              {speedMultiplier}x
            </button>
          </div>
        </div>

        {/* Sliding Marquee Track */}
        <div
          className="relative flex-1 overflow-hidden py-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle gradient fades on left & right */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#061F0A] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#061F0A] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex items-center gap-4 whitespace-nowrap will-change-transform"
            animate={{
              x: isPaused ? 0 : ['0%', '-50%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 40 / speedMultiplier,
                ease: 'linear',
              },
            }}
          >
            {repeatedData.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => onSelectCause?.(item.cause, item.amount ? 10 : undefined)}
                  className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer group shrink-0"
                >
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.62rem] font-mono font-extrabold border ${item.tagColor}`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{item.tag}</span>
                  </span>

                  <span className="text-xs font-semibold text-white group-hover:text-[#D8EC6E] transition-colors">
                    {item.title}:
                  </span>

                  <span className="text-xs text-emerald-100/90 font-normal">
                    {item.detail}
                  </span>

                  <span className="text-[0.65rem] font-mono text-emerald-400/70">
                    · {item.time}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
