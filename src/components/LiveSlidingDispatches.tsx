import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Droplets,
  HeartPulse,
  GraduationCap,
  Hospital,
  Utensils,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  Compass,
} from 'lucide-react';
import { BackgroundBadge } from './BackgroundBadge';

export interface GroundDispatch {
  id: string;
  category: 'water' | 'medical' | 'infrastructure' | 'food' | 'education';
  categoryLabel: string;
  title: string;
  subtitle: string;
  location: string;
  gpsCoordinates: string;
  timestamp: string;
  status: 'In Progress' | 'Completed' | 'Urgent Need' | 'Funded';
  statusColor: string;
  progressPercent: number;
  raisedAmount: string;
  targetAmount: string;
  beneficiaries: string;
  impactQuote: string;
  causeTarget: string;
  colorGradient: string;
  icon: React.ComponentType<{ className?: string }>;
  imageSrc: string;
}

const DISPATCHES: GroundDispatch[] = [
  {
    id: 'disp-1',
    category: 'water',
    categoryLabel: 'Clean Water Boreholes',
    title: 'Kayunga Solar Borehole #68 Commissioned',
    subtitle: 'Deep solar pumping station (64m depth) eliminating 3km daily trek for village women and children.',
    location: 'Kayunga District, Uganda',
    gpsCoordinates: '0°42\'11.2"N 32°53\'28.4"E',
    timestamp: 'Today · 10:45 AM EAT',
    status: 'Completed',
    statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    progressPercent: 100,
    raisedAmount: '$2,850',
    targetAmount: '$2,850',
    beneficiaries: '380 Villagers · 2 Schools',
    impactQuote: '“Typhoid had weakened our children for three consecutive dry seasons. Now, safe water flows directly in the village square.” — Sheikh Haruna, Village Elder',
    causeTarget: 'Water Wells & Boreholes',
    colorGradient: 'from-cyan-900/90 via-[#0A2E0F] to-[#114A18]',
    icon: Droplets,
    imageSrc: '/assets/aistudio/12_dc26f919.jpg',
  },
  {
    id: 'disp-2',
    category: 'infrastructure',
    categoryLabel: 'School Construction ($20k–$70k)',
    title: 'Kayunga Community Primary School: Phase 1 Walls Cast',
    subtitle: '4 furnished classroom blocks, solar lights, and ventilated pit latrines replacing dilapidated temporary tarpaulins.',
    location: 'Kayunga District, Central Uganda',
    gpsCoordinates: '0°43\'55.8"N 32°54\'12.0"E',
    timestamp: 'Yesterday · Verified Field Report',
    status: 'In Progress',
    statusColor: 'bg-amber-500/20 text-[#D8EC6E] border-amber-400/40',
    progressPercent: 68,
    raisedAmount: '$13,600',
    targetAmount: '$20,000 Milestone',
    beneficiaries: '240 Primary Students',
    impactQuote: '“When the rains came, lessons stopped completely. This permanent brick school secures education for our orphans.” — Headteacher Sarah Nabatanzi',
    causeTarget: 'Community School Construction ($20k–$70k)',
    colorGradient: 'from-amber-950/90 via-[#0A2E0F] to-[#165B1E]',
    icon: GraduationCap,
    imageSrc: '/assets/aistudio/16_1d59c4d6.jpg',
  },
  {
    id: 'disp-3',
    category: 'medical',
    categoryLabel: 'Sickle Cell Pediatric Care',
    title: 'Emergency Crisis Stabilization & Transfusion Wing',
    subtitle: '18 pediatric patients received emergency blood screening, hydroxyurea supplies, and folic acid packs.',
    location: 'Mulago Pediatric Clinic, Kampala',
    gpsCoordinates: '0°20\'18.5"N 32°34\'33.1"E',
    timestamp: '2 hours ago · Field Committee Verified',
    status: 'Urgent Need',
    statusColor: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    progressPercent: 45,
    raisedAmount: '$3,800',
    targetAmount: '$8,500 Monthly Fund',
    beneficiaries: '18 Children in Treatment',
    impactQuote: '“Little Amina survived her severe anemia crisis thanks to emergency donor funds released within 40 minutes of hospital admission.”',
    causeTarget: 'Sickle Cell Operation Campaign',
    colorGradient: 'from-rose-950/90 via-[#0A2E0F] to-[#114A18]',
    icon: HeartPulse,
    imageSrc: '/assets/aistudio/1_fd4bccee.jpg',
  },
  {
    id: 'disp-4',
    category: 'infrastructure',
    categoryLabel: 'Hospital Construction ($43k–$150k)',
    title: 'Mityana Maternal Hospital & Sickle Cell Lab Groundbreaking',
    subtitle: 'Engineers completed foundation footing for pediatric triage, maternity ward, and clean solar cold-chain vaccine storage.',
    location: 'Mityana District, Uganda',
    gpsCoordinates: '0°24\'04.1"N 32°02\'31.7"E',
    timestamp: '3 days ago · District Surveyor Approved',
    status: 'In Progress',
    statusColor: 'bg-emerald-500/20 text-[#D8EC6E] border-emerald-400/40',
    progressPercent: 32,
    raisedAmount: '$13,760',
    targetAmount: '$43,000 Phase 1',
    beneficiaries: '12,000 Rural Residents',
    impactQuote: '“Mothers will no longer travel 35 kilometers on motorcycles in labor to reach emergency caesarean care.”',
    causeTarget: 'Community Hospital & Clinic ($43k–$150k)',
    colorGradient: 'from-emerald-950/90 via-[#0A2E0F] to-[#114A18]',
    icon: Hospital,
    imageSrc: '/assets/aistudio/15_10028ecc.jpg',
  },
  {
    id: 'disp-5',
    category: 'food',
    categoryLabel: 'Emergency Nutrition',
    title: '520 Staple Food Cartons Distributed in Mukono',
    subtitle: 'Widows, disabled elderly heads of households, and orphans received 10kg maize flour, beans, rice, and vegetable oil.',
    location: 'Mukono Rural Sub-Counties, Uganda',
    gpsCoordinates: '0°21\'12.3"N 32°45\'08.9"E',
    timestamp: '2 days ago · Field Dispatch Log',
    status: 'Completed',
    statusColor: 'bg-lime-500/20 text-lime-300 border-lime-400/40',
    progressPercent: 100,
    raisedAmount: '$5,200',
    targetAmount: '$5,200',
    beneficiaries: '520 Impoverished Families',
    impactQuote: '“For the first time this month, our grandmother cooked evening dinner without weeping over an empty stove.”',
    causeTarget: 'Food Pack Distribution',
    colorGradient: 'from-lime-950/90 via-[#0A2E0F] to-[#165B1E]',
    icon: Utensils,
    imageSrc: '/assets/aistudio/10_7524a198.jpg',
  },
  {
    id: 'disp-6',
    category: 'education',
    categoryLabel: 'Dignity Kits & Madrasa Support',
    title: '450 Girls Sanitary Kits & Quranic Slates in Iganga',
    subtitle: 'Washable reusable pad kits preserving classroom attendance, along with printed Arabic texts for 3 rural Madrasas.',
    location: 'Iganga District, Eastern Uganda',
    gpsCoordinates: '0°36\'34.2"N 33°28\'12.1"E',
    timestamp: '4 days ago · Field Audit Log',
    status: 'Completed',
    statusColor: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
    progressPercent: 100,
    raisedAmount: '$4,500',
    targetAmount: '$4,500',
    beneficiaries: '450 Schoolgirls & Students',
    impactQuote: '“Absence rates among adolescent girls dropped by 82% across the two terms following dignity kit distribution.”',
    causeTarget: 'Women Sanitary Pad Donation',
    colorGradient: 'from-purple-950/90 via-[#0A2E0F] to-[#114A18]',
    icon: Sparkles,
    imageSrc: '/assets/aistudio/8_69170a80.jpg',
  },
];

interface LiveSlidingDispatchesProps {
  onSelectCause: (causeTitle: string, amountUSD?: number) => void;
  onScrollToDonate: () => void;
}

export const LiveSlidingDispatches: React.FC<LiveSlidingDispatchesProps> = ({
  onSelectCause,
  onScrollToDonate,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const filteredDispatches = activeCategory === 'all'
    ? DISPATCHES
    : DISPATCHES.filter((d) => d.category === activeCategory);

  const safeIndex = Math.min(currentIndex, Math.max(0, filteredDispatches.length - 1));
  const activeDispatch = filteredDispatches[safeIndex] || DISPATCHES[0];

  // Auto-play timer (5 seconds)
  useEffect(() => {
    if (!isAutoPlaying || filteredDispatches.length <= 1) return;

    const timer = setInterval(() => {
      setSlideDirection('right');
      setCurrentIndex((prev) => (prev + 1) % filteredDispatches.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, filteredDispatches.length, currentIndex]);

  const handleNext = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev + 1) % filteredDispatches.length);
  };

  const handlePrev = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev - 1 + filteredDispatches.length) % filteredDispatches.length);
  };

  const handlePledge = (dispatch: GroundDispatch) => {
    onSelectCause(dispatch.causeTarget, 10);
    onScrollToDonate();
  };

  const IconComponent = activeDispatch.icon;

  return (
    <section className="py-20 bg-gradient-to-br from-[#061F0A] via-[#0A2E0F] to-[#114A18] text-white relative overflow-hidden border-b border-amber-300/30">
      {/* Background Watermark Seal */}
      <BackgroundBadge size="giant" position="top-right" opacity="opacity-[0.06]" variant="dark" className="hidden lg:block -mr-16 -mt-16" />
      <BackgroundBadge size="xl" position="bottom-left" opacity="opacity-[0.05]" variant="dark" className="hidden sm:block -ml-16 -mb-16" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[#D8EC6E] text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-[#D8EC6E] animate-ping" />
              <span>TRANSPARENT AMANAH FEED</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Live Field Dispatches <span className="italic text-[#D8EC6E] font-normal">· Real-Time Motion</span>
            </h2>
            <p className="text-emerald-100/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Every $10 share set in motion is immediately deployed to active ground operations. Watch real-time project logs, verified GPS tags, and engineer reports.
            </p>
          </div>

          {/* Autoplay & Motion Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-emerald-200 border border-white/15 transition-colors cursor-pointer"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Slide</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Auto-Slide</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Dispatch"
                className="p-2 rounded-xl bg-white/10 hover:bg-[#D8EC6E] hover:text-[#0A2E0F] text-white transition-colors cursor-pointer border border-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Dispatch"
                className="p-2 rounded-xl bg-white/10 hover:bg-[#D8EC6E] hover:text-[#0A2E0F] text-white transition-colors cursor-pointer border border-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Slider / Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          {[
            { key: 'all', label: 'All Dispatches' },
            { key: 'water', label: '💧 Water Wells' },
            { key: 'infrastructure', label: '🏫 Schools & Hospitals' },
            { key: 'medical', label: '🏥 Sickle Cell Care' },
            { key: 'food', label: '🌾 Emergency Food' },
            { key: 'education', label: '✨ Dignity & Madrasa' },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => {
                setActiveCategory(cat.key);
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#D8EC6E] text-[#0A2E0F] shadow-md scale-105'
                  : 'bg-white/10 text-emerald-100 hover:bg-white/15 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* The Live Motion Card Container */}
        <div className="relative">
          {/* Animated Time Progress Line during Auto-play */}
          {isAutoPlaying && (
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-4">
              <motion.div
                key={safeIndex}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5.5, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-[#D8EC6E] via-amber-300 to-emerald-400"
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDispatch.id}
              initial={{
                opacity: 0,
                x: slideDirection === 'right' ? 40 : -40,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: slideDirection === 'right' ? -40 : 40,
                scale: 0.98,
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-3xl p-6 sm:p-10 bg-gradient-to-br ${activeDispatch.colorGradient} border-2 border-amber-300/40 shadow-2xl relative overflow-hidden`}
            >
              {/* Internal Accent Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Visual Real Photo Column: 4 cols */}
                <div className="lg:col-span-4 relative group/img overflow-hidden rounded-3xl border-2 border-white/20 shadow-2xl bg-black shrink-0">
                  <img
                    src={activeDispatch.imageSrc}
                    alt={activeDispatch.title}
                    className="w-full h-64 sm:h-80 object-cover object-center group-hover/img:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[0.62rem] font-mono font-extrabold bg-[#0A2E0F]/80 text-[#D8EC6E] backdrop-blur-xs border border-emerald-400/40 shadow-sm">
                      VERIFIED GROUND CAPTURE
                    </span>
                  </div>
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-xs text-emerald-200 font-mono flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D8EC6E] shrink-0" />
                    <span className="truncate">{activeDispatch.location}</span>
                  </div>
                </div>

                {/* Middle: Content & Verification: 5 cols */}
                <div className="lg:col-span-5 space-y-5">
                  {/* Status & Category row */}
                  <div className="flex flex-wrap items-center gap-2.5 text-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white font-mono font-bold border border-white/20">
                      <IconComponent className="w-3.5 h-3.5 text-[#D8EC6E]" />
                      <span>{activeDispatch.categoryLabel}</span>
                    </span>

                    <span className={`px-2.5 py-0.5 rounded-full font-mono font-bold border ${activeDispatch.statusColor}`}>
                      ● {activeDispatch.status.toUpperCase()}
                    </span>

                    <span className="inline-flex items-center gap-1 text-emerald-200/90 font-mono text-[0.7rem]">
                      <Clock className="w-3 h-3 text-[#D8EC6E]" />
                      <span>{activeDispatch.timestamp}</span>
                    </span>
                  </div>

                  {/* Title & Narrative */}
                  <div className="space-y-1.5">
                    <h3 className="font-editorial text-2xl sm:text-3xl font-black text-white leading-tight">
                      {activeDispatch.title}
                    </h3>
                    <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
                      {activeDispatch.subtitle}
                    </p>
                  </div>

                  {/* Impact Quote Box */}
                  <div className="p-3.5 rounded-2xl bg-black/30 border border-white/15 text-xs text-emerald-50 italic leading-relaxed backdrop-blur-xs">
                    {activeDispatch.impactQuote}
                  </div>

                  {/* Location Coordinates & Beneficiaries Chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
                      <MapPin className="w-3.5 h-3.5 text-[#D8EC6E] shrink-0" />
                      <div className="truncate">
                        <span className="text-white font-bold block text-[0.72rem]">{activeDispatch.location}</span>
                        <span className="text-emerald-300/70 text-[0.62rem]">{activeDispatch.gpsCoordinates}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
                      <Users className="w-3.5 h-3.5 text-[#D8EC6E] shrink-0" />
                      <div>
                        <span className="text-white font-bold block text-[0.72rem]">Audited Reach</span>
                        <span className="text-emerald-300/70 text-[0.62rem]">{activeDispatch.beneficiaries}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 3 cols: Funding Progress & Motion Action Card */}
                <div className="lg:col-span-3 bg-[#0A2E0F]/85 p-5 sm:p-6 rounded-2xl border border-amber-300/40 space-y-4 text-center shadow-xl backdrop-blur-md">
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-mono tracking-widest text-[#D8EC6E] font-bold block">
                      Project Funding Stage
                    </span>
                    <div className="flex justify-center items-baseline gap-2">
                      <span className="font-editorial text-3xl sm:text-4xl font-extrabold text-white">
                        {activeDispatch.raisedAmount}
                      </span>
                      <span className="text-xs text-emerald-300 font-mono">
                        / {activeDispatch.targetAmount}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 text-left">
                    <div className="flex justify-between text-xs text-emerald-200 font-mono">
                      <span>Funded Progress</span>
                      <strong className="text-white font-bold">{activeDispatch.progressPercent}%</strong>
                    </div>
                    <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeDispatch.progressPercent}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-emerald-400 via-amber-300 to-[#D8EC6E] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Direct Action Button */}
                  <button
                    type="button"
                    onClick={() => handlePledge(activeDispatch)}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#D8EC6E] hover:bg-[#C6E04A] text-[#0A2E0F] font-extrabold text-xs sm:text-sm shadow-md transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Support With $10 Share</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-[0.68rem] text-emerald-200/80 leading-relaxed font-sans">
                    100% Amanah policy · Ring-fenced solely for {activeDispatch.categoryLabel}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Slide Pagination Indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {filteredDispatches.map((disp, idx) => (
              <button
                key={disp.id}
                type="button"
                onClick={() => {
                  setSlideDirection(idx > safeIndex ? 'right' : 'left');
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === safeIndex
                    ? 'w-8 h-2.5 bg-[#D8EC6E]'
                    : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${disp.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
