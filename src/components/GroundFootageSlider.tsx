import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  MapPin,
  Heart,
  ArrowRight,
  Maximize2,
  X,
  Play,
  Pause,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { BackgroundBadge } from './BackgroundBadge';

export interface FieldPhoto {
  id: string;
  src: string;
  title: string;
  category: string;
  categoryColor: string;
  location: string;
  date: string;
  description: string;
  impactMetric: string;
  causeTarget: string;
}

export const FIELD_FOOTAGE_ITEMS: FieldPhoto[] = [
  {
    id: 'f-1',
    src: '/assets/aistudio/12_dc26f919.jpg',
    title: 'Kayunga Solar Hand Pump Borehole',
    category: 'Clean Water',
    categoryColor: 'bg-cyan-500/90 text-white',
    location: 'Kayunga District, Uganda',
    date: 'March 2026',
    description: 'Young boy drinking fresh, lab-tested clean water flowing from newly drilled borehole hand pump.',
    impactMetric: '380 villagers served daily',
    causeTarget: 'Water Wells & Boreholes',
  },
  {
    id: 'f-2',
    src: '/assets/aistudio/16_1d59c4d6.jpg',
    title: 'Community Primary School Wall Plate Construction',
    category: 'School Construction',
    categoryColor: 'bg-amber-600/90 text-white',
    location: 'Kayunga District, Uganda',
    date: 'March 2026',
    description: 'Four classroom blocks reaching wall-plate level using local kiln-burnt bricks and reinforced concrete beams.',
    impactMetric: '240 orphan school seats funded',
    causeTarget: 'Community School Construction ($20k–$70k)',
  },
  {
    id: 'f-3',
    src: '/assets/aistudio/8_69170a80.jpg',
    title: 'Girls Dignity Reusable Pad Distribution',
    category: 'Women Dignity',
    categoryColor: 'bg-rose-500/90 text-white',
    location: 'Iganga District, Eastern Uganda',
    date: 'February 2026',
    description: 'Schoolgirls proudly holding washable sanitary pad kits that keep them in the classroom year-round.',
    impactMetric: '450 dignity kits delivered',
    causeTarget: 'Women Sanitary Pad Donation',
  },
  {
    id: 'f-4',
    src: '/assets/aistudio/10_7524a198.jpg',
    title: 'Emergency Staple Family Nutrition Sacks',
    category: 'Food Relief',
    categoryColor: 'bg-emerald-600/90 text-white',
    location: 'Mukono Rural Sub-County',
    date: 'March 2026',
    description: 'Mother and children receiving a 25kg staple food parcel containing maize flour, beans, rice, and cooking oil.',
    impactMetric: 'Feeds 6 household members for 4 weeks',
    causeTarget: 'Food Pack Distribution',
  },
  {
    id: 'f-5',
    src: '/assets/aistudio/14_c0be74b8.jpg',
    title: 'Heavy Rig Deep Borehole Drilling Operation',
    category: 'Clean Water',
    categoryColor: 'bg-sky-600/90 text-white',
    location: 'Mayuge District, Uganda',
    date: 'February 2026',
    description: 'Hydro-geological team and drilling rig drilling through granite aquifer at 68m depth with diesel compressor.',
    impactMetric: 'Reaching deep pathogen-free aquifer',
    causeTarget: 'Water Wells & Boreholes',
  },
  {
    id: 'f-6',
    src: '/assets/aistudio/17_d0923340.jpg',
    title: 'Completed Community School Block Inauguration',
    category: 'School Construction',
    categoryColor: 'bg-amber-600/90 text-white',
    location: 'Kayunga District, Uganda',
    date: 'January 2026',
    description: 'Students in bright blue uniforms celebrating in front of a newly completed brick classroom block with tin roofing.',
    impactMetric: 'Permanent educational sanctuary',
    causeTarget: 'Community School Construction ($20k–$70k)',
  },
  {
    id: 'f-7',
    src: '/assets/aistudio/13_b1cd836c.jpg',
    title: 'School Multi-Tap Clean Water Station',
    category: 'Clean Water',
    categoryColor: 'bg-cyan-600/90 text-white',
    location: 'Mukono District, Uganda',
    date: 'March 2026',
    description: 'Students washing hands and drinking from brass taps linked to an overhead solar-pumped clean water reservoir.',
    impactMetric: 'Zero waterborne illness recorded',
    causeTarget: 'Water Wells & Boreholes',
  },
  {
    id: 'f-8',
    src: '/assets/aistudio/15_10028ecc.jpg',
    title: 'Masons Laying Brick Classroom Partitions',
    category: 'Infrastructure',
    categoryColor: 'bg-orange-600/90 text-white',
    location: 'Central Region, Uganda',
    date: 'March 2026',
    description: 'Local skilled masons laying durable clay bricks and mortar under engineering supervision for community clinic block.',
    impactMetric: 'Employing local youth builders',
    causeTarget: 'Community Hospital & Clinic ($43k–$150k)',
  },
  {
    id: 'f-9',
    src: '/assets/aistudio/6_3eee52a7.jpg',
    title: 'Orphan Primary School Exercise Books & Pens',
    category: 'Orphan Education',
    categoryColor: 'bg-indigo-600/90 text-white',
    location: 'Iganga Rural School',
    date: 'March 2026',
    description: 'Students joyfully raising new exercise books and pencils provided through community $10 Sadaqah shares.',
    impactMetric: '120 children equipped for school term',
    causeTarget: 'Orphan Care & Sponsorship',
  },
  {
    id: 'f-10',
    src: '/assets/aistudio/2_904d7751.jpg',
    title: 'Warm Nutritious School Meal with Avocado',
    category: 'Orphan Feeding',
    categoryColor: 'bg-lime-600/90 text-white',
    location: 'Mukono Child Center',
    date: 'February 2026',
    description: 'Young boy smiling at the dining table enjoying a hot nutritious lunch bowl packed with protein and fresh fruit.',
    impactMetric: 'Daily hot meal program for orphans',
    causeTarget: 'Food Pack Distribution',
  },
  {
    id: 'f-11',
    src: '/assets/aistudio/9_b7cbfbe9.jpg',
    title: 'Protective Shoes & Sandals for Village Children',
    category: 'Dignity & Basic Needs',
    categoryColor: 'bg-teal-600/90 text-white',
    location: 'Bugweri District, Uganda',
    date: 'February 2026',
    description: 'Children raising new pairs of protective shoes in packaged bags with field aid volunteer in high-visibility vest.',
    impactMetric: 'Eliminates jigger & parasite infections',
    causeTarget: 'Shelter & Basic Needs (Beddings)',
  },
  {
    id: 'f-12',
    src: '/assets/aistudio/1_fd4bccee.jpg',
    title: 'Pediatric Malnutrition Stabilization Feeding',
    category: 'Healthcare',
    categoryColor: 'bg-rose-600/90 text-white',
    location: 'Eastern Region Clinic',
    date: 'February 2026',
    description: 'Toddler being fed fortified enriched porridge for severe acute malnutrition and sickle cell convalescence.',
    impactMetric: 'Restores weight and vital immune strength',
    causeTarget: 'Sickle Cell Operation Campaign',
  },
  {
    id: 'f-13',
    src: '/assets/aistudio/3_0d2c78ba.jpg',
    title: 'Unity Fellowship: Group of Smiling Children',
    category: 'Community Care',
    categoryColor: 'bg-amber-500/90 text-white',
    location: 'Kampala Community Care Center',
    date: 'March 2026',
    description: 'Bird-eye perspective of joyful orphans smiling together around a volunteer hand, exemplifying Islamic brotherly affection.',
    impactMetric: 'Mental well-being & emotional sanctuary',
    causeTarget: 'Orphan Care & Sponsorship',
  },
  {
    id: 'f-14',
    src: '/assets/aistudio/7_c15b8a46.jpg',
    title: 'Community Assembly & Madrasa Hall Gathering',
    category: 'Madrasa Support',
    categoryColor: 'bg-purple-600/90 text-white',
    location: 'Rural Eastern Uganda',
    date: 'January 2026',
    description: 'Women and children seated inside timber-trussed assembly hall for Quran recitation and health education seminar.',
    impactMetric: 'Spiritual and community assembly center',
    causeTarget: 'Madrasa Support',
  },
  {
    id: 'f-15',
    src: '/assets/aistudio/4_fed5fd2a.jpg',
    title: 'Joyful Village Children Celebrating Water Arrival',
    category: 'Celebration of Relief',
    categoryColor: 'bg-emerald-600/90 text-white',
    location: 'Busoga Region, Uganda',
    date: 'March 2026',
    description: 'Crowd of exuberant village children waving their hands with pure smiles as clean water begins pumping.',
    impactMetric: 'Dignity, joy, and hope restored',
    causeTarget: 'The $50,000 Campaign Fund',
  },
  {
    id: 'f-16',
    src: '/assets/aistudio/11_1e49eee6.jpg',
    title: 'Children Carrying Water on Rural Village Path',
    category: 'Water Urgency',
    categoryColor: 'bg-sky-600/90 text-white',
    location: 'Mukono Outskirts',
    date: 'January 2026',
    description: 'Children walking barefoot with heavy jerrycans, illustrating why deep solar boreholes are urgent life-savers.',
    impactMetric: 'Motivating our 68 borehole installations',
    causeTarget: 'Water Wells & Boreholes',
  },
  {
    id: 'f-17',
    src: '/assets/aistudio/5_b7cbfbe9.jpg',
    title: 'Footwear Distribution for Rural Families',
    category: 'Dignity Aid',
    categoryColor: 'bg-teal-600/90 text-white',
    location: 'Bugweri District, Uganda',
    date: 'February 2026',
    description: 'Children proudly wearing their new sandals and sneakers on the red soil outside their family cottage.',
    impactMetric: '180 pairs distributed in 1 afternoon',
    causeTarget: 'Shelter & Basic Needs (Beddings)',
  },
];

interface GroundFootageSliderProps {
  onSelectCause: (causeTitle: string, amountUSD?: number) => void;
  onScrollToDonate: () => void;
}

export const GroundFootageSlider: React.FC<GroundFootageSliderProps> = ({
  onSelectCause,
  onScrollToDonate,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<FieldPhoto | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [sliderSpeed, setSliderSpeed] = useState<number>(35);

  // Divide the 17 photos into 2 smooth sliding lanes
  const lane1 = FIELD_FOOTAGE_ITEMS.slice(0, 9);
  const lane2 = FIELD_FOOTAGE_ITEMS.slice(8, 17);

  // Double each lane for seamless infinite loop
  const repeatedLane1 = [...lane1, ...lane1];
  const repeatedLane2 = [...lane2, ...lane2];

  const handleSupportClick = (item: FieldPhoto) => {
    onSelectCause(item.causeTarget, 10);
    setSelectedPhoto(null);
    onScrollToDonate();
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#0A2E0F] via-[#061F0A] to-[#0A2E0F] text-white relative overflow-hidden border-b-2 border-amber-300/30">
      {/* Background Watermark Badges */}
      <BackgroundBadge size="giant" position="top-right" opacity="opacity-[0.06]" variant="dark" className="hidden lg:block -mr-20 -mt-20" />
      <BackgroundBadge size="xl" position="bottom-left" opacity="opacity-[0.05]" variant="dark" className="hidden sm:block -ml-20 -mb-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[#D8EC6E] text-xs font-mono font-bold">
              <Camera className="w-3.5 h-3.5 text-[#D8EC6E]" />
              <span>VERIFIED GROUND FOOTAGE · 17 LIVE FIELD SHOTS</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Real Humans, Real Relief <span className="italic text-[#D8EC6E] font-normal">· Motion Gallery</span>
            </h2>
            <p className="text-emerald-100/90 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Every photograph is captured live on the ground by our field coordinators across Uganda. Tap any image to examine verified GPS coordinates, school construction, and borehole water flow.
            </p>
          </div>

          {/* Interactive Slider Speed & Pause Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-emerald-200 border border-white/15 transition-colors cursor-pointer"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? 'Resume Motion' : 'Pause Slide'}</span>
            </button>

            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl border border-white/10 text-xs font-mono font-bold">
              <button
                type="button"
                onClick={() => setSliderSpeed(45)}
                className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  sliderSpeed === 45 ? 'bg-[#D8EC6E] text-[#0A2E0F]' : 'text-emerald-200 hover:text-white'
                }`}
              >
                1x
              </button>
              <button
                type="button"
                onClick={() => setSliderSpeed(30)}
                className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  sliderSpeed === 30 ? 'bg-[#D8EC6E] text-[#0A2E0F]' : 'text-emerald-200 hover:text-white'
                }`}
              >
                1.5x
              </button>
              <button
                type="button"
                onClick={() => setSliderSpeed(20)}
                className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  sliderSpeed === 20 ? 'bg-[#D8EC6E] text-[#0A2E0F]' : 'text-emerald-200 hover:text-white'
                }`}
              >
                2x
              </button>
            </div>
          </div>
        </div>

        {/* ================= LANE 1: SLIDING LEFT ================= */}
        <div
          className="relative overflow-hidden py-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Edge gradient vignettes */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#061F0A] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#061F0A] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex items-center gap-5 whitespace-nowrap will-change-transform"
            animate={{
              x: isPaused ? 0 : ['0%', '-50%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: sliderSpeed,
                ease: 'linear',
              },
            }}
          >
            {repeatedLane1.map((item, idx) => (
              <div
                key={`lane1-${item.id}-${idx}`}
                onClick={() => setSelectedPhoto(item)}
                className="group relative w-64 sm:w-80 h-72 sm:h-88 rounded-3xl overflow-hidden bg-black/40 border-2 border-amber-300/30 hover:border-[#D8EC6E] transition-all duration-300 cursor-pointer shrink-0 shadow-xl hover:shadow-2xl hover:scale-[1.02]"
              >
                {/* Photo Image */}
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 group-hover:from-black/95 transition-all" />

                {/* Category Pill Tag */}
                <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5">
                  <span className={`px-2.5 py-1 rounded-full text-[0.65rem] font-mono font-extrabold shadow-sm backdrop-blur-xs ${item.categoryColor}`}>
                    {item.category}
                  </span>
                </div>

                {/* Zoom Icon Button */}
                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-[#D8EC6E]" />
                </div>

                {/* Bottom Caption & Impact */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 space-y-1.5 whitespace-normal">
                  <div className="flex items-center gap-1.5 text-[0.68rem] text-emerald-300 font-mono">
                    <MapPin className="w-3 h-3 text-[#D8EC6E]" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className="font-editorial text-lg sm:text-xl font-black text-white leading-tight group-hover:text-[#D8EC6E] transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between pt-1 border-t border-white/15 text-[0.7rem]">
                    <span className="text-emerald-100 font-mono">{item.impactMetric}</span>
                    <span className="text-[#D8EC6E] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                      <span>View</span> →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ================= LANE 2: SLIDING RIGHT ================= */}
        <div
          className="relative overflow-hidden py-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#061F0A] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#061F0A] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex items-center gap-5 whitespace-nowrap will-change-transform"
            animate={{
              x: isPaused ? 0 : ['-50%', '0%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: sliderSpeed * 1.1,
                ease: 'linear',
              },
            }}
          >
            {repeatedLane2.map((item, idx) => (
              <div
                key={`lane2-${item.id}-${idx}`}
                onClick={() => setSelectedPhoto(item)}
                className="group relative w-64 sm:w-80 h-72 sm:h-88 rounded-3xl overflow-hidden bg-black/40 border-2 border-amber-300/30 hover:border-[#D8EC6E] transition-all duration-300 cursor-pointer shrink-0 shadow-xl hover:shadow-2xl hover:scale-[1.02]"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 group-hover:from-black/95 transition-all" />

                <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5">
                  <span className={`px-2.5 py-1 rounded-full text-[0.65rem] font-mono font-extrabold shadow-sm backdrop-blur-xs ${item.categoryColor}`}>
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-[#D8EC6E]" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 space-y-1.5 whitespace-normal">
                  <div className="flex items-center gap-1.5 text-[0.68rem] text-emerald-300 font-mono">
                    <MapPin className="w-3 h-3 text-[#D8EC6E]" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className="font-editorial text-lg sm:text-xl font-black text-white leading-tight group-hover:text-[#D8EC6E] transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between pt-1 border-t border-white/15 text-[0.7rem]">
                    <span className="text-emerald-100 font-mono">{item.impactMetric}</span>
                    <span className="text-[#D8EC6E] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                      <span>View</span> →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Global Transparency Note */}
        <div className="rounded-2xl bg-white/5 border border-white/15 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D8EC6E] shrink-0" />
            <p className="text-emerald-100">
              <strong className="text-white font-bold">100% Unfiltered Ground Transparency:</strong> Every photograph reflects authentic field distributions with verified community consent under Ugandan non-profit regulations.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onSelectCause('The $50,000 Campaign Fund', 10);
              onScrollToDonate();
            }}
            className="px-4 py-2 rounded-xl bg-[#D8EC6E] hover:bg-[#C6E04A] text-[#0A2E0F] font-extrabold whitespace-nowrap shadow-sm transition-all cursor-pointer"
          >
            Sponsor a $10 Share Now →
          </button>
        </div>
      </div>

      {/* ================= HIGH-RESOLUTION LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-[#0A2E0F]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF7F0] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border-2 border-amber-300 text-slate-800 relative my-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute right-4 top-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Viewport */}
              <div className="relative w-full h-80 sm:h-96 bg-black">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold shadow-md ${selectedPhoto.categoryColor}`}>
                    {selectedPhoto.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/70 text-white border border-white/20">
                    {selectedPhoto.date}
                  </span>
                </div>
              </div>

              {/* Photo Information & Direct Cause Link */}
              <div className="p-6 sm:p-8 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#114A18] font-mono font-bold">
                    <MapPin className="w-3.5 h-3.5 text-[#E59A14]" />
                    <span>{selectedPhoto.location}</span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl font-black text-[#0A2E0F] leading-tight">
                    {selectedPhoto.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {selectedPhoto.description}
                  </p>
                </div>

                {/* Verified Ground Metric Card */}
                <div className="p-3.5 rounded-2xl bg-[#FAFDE6] border border-amber-300 flex items-center justify-between text-xs sm:text-sm font-mono">
                  <div className="flex items-center gap-2 text-[#0A2E0F]">
                    <ShieldCheck className="w-4 h-4 text-[#114A18]" />
                    <span>Audited Ground Output:</span>
                  </div>
                  <strong className="text-[#114A18] font-bold">{selectedPhoto.impactMetric}</strong>
                </div>

                {/* Direct Action Attached to Payment */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => handleSupportClick(selectedPhoto)}
                    className="flex-1 py-3.5 rounded-2xl bg-[#114A18] hover:bg-[#165B1E] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 text-[#D8EC6E] fill-[#D8EC6E]" />
                    <span>Support With $10 Share</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(null)}
                    className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-300 transition-colors cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
