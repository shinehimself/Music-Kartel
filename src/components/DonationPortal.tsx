import React, { useState, useEffect, useRef } from 'react';
import {
  Coins,
  Copy,
  Check,
  MessageCircle,
  Smartphone,
  Landmark,
  CreditCard,
  Heart,
  Plus,
  Minus,
  Pencil,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { CountryConfig, SiteSettings } from '../types/charity';
import { COUNTRIES, PROGRAMS } from '../data/charityData';
import {
  MtnMomoLogo,
  AirtelMoneyLogo,
  MpesaLogo,
  OrangeMoneyLogo,
  WaveLogo,
  UbaBankLogo,
  VisaLogo,
  MastercardLogo,
  ApplePayLogo,
  GooglePayLogo,
  WhatsAppBrandLogo,
} from './PaymentBrandLogos';
import confetti from 'canvas-confetti';
import { BackgroundBadge } from './BackgroundBadge';

interface DonationPortalProps {
  settings: SiteSettings;
  selectedAmount: number;
  selectedCause: string;
  selectedCountryCode: string;
  onDonationSuccess: (donation: {
    donorName: string;
    shares: number;
    amountUSD: number;
    cause: string;
    country: string;
    duaOrMessage?: string;
  }) => void;
  onOpenReceipt: (receiptData: any) => void;
}

export const DonationPortal: React.FC<DonationPortalProps> = ({
  settings,
  selectedAmount,
  selectedCause,
  selectedCountryCode,
  onDonationSuccess,
  onOpenReceipt,
}) => {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [countryKey, setCountryKey] = useState<string>(selectedCountryCode || 'US');
  const [cause, setCause] = useState<string>(selectedCause || 'The $50,000 Campaign Fund');
  const [amount, setAmount] = useState<number>(selectedAmount || 10);
  const [activeTab, setActiveTab] = useState<'momo' | 'bank' | 'card'>('momo');
  const [selectedMomoNetwork, setSelectedMomoNetwork] = useState<string>('MTN MoMo');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Form inputs
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorDua, setDonorDua] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const amountInputRef = useRef<HTMLInputElement>(null);
  const country: CountryConfig = COUNTRIES[countryKey] || COUNTRIES.US;

  // Set default network based on country
  useEffect(() => {
    if (countryKey === 'KE') {
      setSelectedMomoNetwork('Safaricom M-Pesa');
    } else if (countryKey === 'SN') {
      setSelectedMomoNetwork('Wave');
    } else {
      setSelectedMomoNetwork('MTN MoMo');
    }
  }, [countryKey]);

  // Sync external selection
  useEffect(() => {
    if (selectedAmount) {
      setAmount(selectedAmount);
    }
  }, [selectedAmount]);

  useEffect(() => {
    if (selectedCause) {
      setCause(selectedCause);
    }
  }, [selectedCause]);

  useEffect(() => {
    if (selectedCountryCode && COUNTRIES[selectedCountryCode]) {
      setCountryKey(selectedCountryCode);
    }
  }, [selectedCountryCode]);

  // Convert USD to local currency or vice-versa
  const minimumLocal = Math.round(10 * (country.rateToUSD || 1));
  const amountUSD = Math.max(10, Math.round(amount / (country.rateToUSD || 1)));
  const sharesCount = Math.max(1, Math.floor(amountUSD / 10));

  const adjustShares = (delta: number) => {
    const currentShares = sharesCount;
    const newShares = Math.max(1, currentShares + delta);
    const newUSD = newShares * 10;
    const newLocal = Math.round(newUSD * (country.rateToUSD || 1));
    setAmount(newLocal);
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2200);
  };

  // Generate unique payment reference
  const paymentRef = `SAD-50K-${cause.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleCompleteDonation = (paymentMethod: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E59A14', '#114A18', '#D8EC6E', '#F2AE2E'],
        });
      } catch (err) {
        // ignore
      }

      const receipt = {
        receiptNumber: `REC-${Date.now().toString().slice(-6)}`,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        donorName: donorName || 'Generous Brother / Sister in Islam',
        amount: amount,
        currencySymbol: country.symbol,
        currencyCode: country.currency,
        amountUSD: amountUSD,
        shares: sharesCount,
        cause: cause,
        frequency: frequency === 'one-time' ? 'One-Time Sadaqah' : 'Monthly Sadaqah Jariyah',
        paymentMethod: paymentMethod,
        reference: paymentRef,
        dua: donorDua,
      };

      onDonationSuccess({
        donorName: donorName || 'Generous Supporter',
        shares: sharesCount,
        amountUSD: amountUSD,
        cause: cause,
        country: country.name,
        duaOrMessage: donorDua || undefined,
      });

      onOpenReceipt(receipt);
    }, 1200);
  };

  const handleWhatsAppPledge = () => {
    const message = `Assalamu Alaikum Sadaqah Africa,\n\nI would like to pledge a donation towards the $50,000 Campaign:\n• Amount: ${country.symbol}${amount.toLocaleString()} (${country.currency})\n• Equivalent USD: ~$${amountUSD} (${sharesCount} shares)\n• Cause: ${cause}\n• Type: ${frequency === 'one-time' ? 'One-Time' : 'Monthly Recurring'}\n• Country: ${country.name}\n• Method: ${activeTab === 'momo' ? `Mobile Money (${selectedMomoNetwork})` : activeTab === 'bank' ? 'UBA Bank Wire' : 'Card Checkout'}\n• Donor Name: ${donorName || 'Anonymous'}\n• Reference: ${paymentRef}\n\nPlease confirm where I should send the transfer slip. JazakAllahu khayran.`;

    const cleanPhone = settings.primaryPhone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  };

  return (
    <section id="donate" className="py-20 bg-gradient-to-b from-[#FAFDE6]/60 via-[#FAF7F0] to-[#FAF7F0] border-t border-amber-300/70 relative overflow-hidden">
      {/* Official Background Seal */}
      <BackgroundBadge size="giant" position="top-right" opacity="opacity-[0.04]" variant="color" className="hidden lg:block -mr-16 -mt-16" />
      <BackgroundBadge size="xl" position="bottom-left" opacity="opacity-[0.03]" variant="color" className="hidden sm:block -ml-16 mb-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <p className="font-arabic text-[#114A18] text-lg sm:text-xl font-medium tracking-wide">
            مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ
          </p>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#114A18] block font-mono">
            Amanah Donation Portal · 100% Direct Allocation
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2E0F] tracking-tight leading-tight">
            Make Your Contribution Today
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Directly funding our $50,000 community milestone. Pay seamlessly via Mobile Money, official UBA bank wire, or WhatsApp pledge. Minimum $10 / €10 per share.
          </p>
        </div>

        {/* The Main Donation Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-amber-300/80 p-6 sm:p-10 space-y-8 relative overflow-hidden">
          {/* Card Watermark */}
          <BackgroundBadge size="lg" position="bottom-right" opacity="opacity-[0.04]" variant="color" className="hidden sm:block -mr-8 -mb-8" />

          {/* Frequency Toggle */}
          <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setFrequency('one-time')}
              className={`py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                frequency === 'one-time'
                  ? 'bg-[#114A18] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              One-Time Sadaqah
            </button>
            <button
              type="button"
              onClick={() => setFrequency('monthly')}
              className={`py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                frequency === 'monthly'
                  ? 'bg-[#114A18] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Monthly Sadaqah Jariyah
            </button>
          </div>

          {/* Country and Cause Selection */}
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="space-y-1.5 block">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 font-mono">
                Your Country / Currency
              </span>
              <select
                value={countryKey}
                onChange={(e) => {
                  const newK = e.target.value;
                  setCountryKey(newK);
                  const newC = COUNTRIES[newK];
                  setAmount(newC.presets[0]);
                }}
                className="w-full rounded-2xl bg-[#FAF7F0] border-2 border-slate-200 font-bold text-sm p-4 text-[#0A2E0F] hover:border-[#114A18] focus:border-[#114A18] outline-hidden transition-colors"
              >
                {Object.entries(COUNTRIES).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.name} ({v.currency})
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5 block">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 font-mono">
                Select Cause or Milestone
              </span>
              <select
                value={cause}
                onChange={(e) => setCause(e.target.value)}
                className="w-full rounded-2xl bg-[#FAF7F0] border-2 border-slate-200 font-bold text-sm p-4 text-[#0A2E0F] hover:border-[#114A18] focus:border-[#114A18] outline-hidden transition-colors"
              >
                <option value="The $50,000 Campaign Fund">The $50,000 Campaign (Communal Fund)</option>

                <optgroup label="School Construction ($20,000 – $70,000)">
                  <option value="School Construction: Starter 3-Classroom Primary Block ($20,000)">
                    Starter 3-Classroom Primary Block ($20,000)
                  </option>
                  <option value="School Construction: 6-Classroom Community Primary School ($35,000)">
                    6-Classroom Community Primary School ($35,000)
                  </option>
                  <option value="School Construction: Islamic Integrated Academy & Madrasa ($50,000)">
                    Islamic Integrated Academy &amp; Madrasa ($50,000)
                  </option>
                  <option value="School Construction: Comprehensive Secondary & Vocational Centre ($70,000)">
                    Comprehensive Secondary &amp; Vocational Centre ($70,000)
                  </option>
                </optgroup>

                <optgroup label="Hospital & Healthcare Facility ($43,000 – $150,000)">
                  <option value="Hospital Construction: Maternity & Pediatric Community Clinic ($43,000)">
                    Maternity &amp; Pediatric Community Clinic ($43,000)
                  </option>
                  <option value="Hospital Construction: Emergency Surgical Wing & Specialty Unit ($75,000)">
                    Emergency Surgical Wing &amp; Specialty Unit ($75,000)
                  </option>
                  <option value="Hospital Construction: Regional Multi-Specialty Charity Hospital ($110,000)">
                    Regional Multi-Specialty Charity Hospital ($110,000)
                  </option>
                  <option value="Hospital Construction: Grand General Hospital & Trauma Center ($150,000)">
                    Grand General Hospital &amp; Trauma Center ($150,000)
                  </option>
                </optgroup>

                <optgroup label="9 Humanitarian Programs">
                  {PROGRAMS.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="Fixed Projects">
                  <option value="Village Masjid Construction">Village Masjid Construction</option>
                  <option value="Solar Electric Well">Solar Electric Well</option>
                  <option value="Livelihood Support">Livelihood Support</option>
                </optgroup>

                {/* Custom dynamic cause option */}
                {cause &&
                  ![
                    'The $50,000 Campaign Fund',
                    'School Construction: Starter 3-Classroom Primary Block ($20,000)',
                    'School Construction: 6-Classroom Community Primary School ($35,000)',
                    'School Construction: Islamic Integrated Academy & Madrasa ($50,000)',
                    'School Construction: Comprehensive Secondary & Vocational Centre ($70,000)',
                    'Hospital Construction: Maternity & Pediatric Community Clinic ($43,000)',
                    'Hospital Construction: Emergency Surgical Wing & Specialty Unit ($75,000)',
                    'Hospital Construction: Regional Multi-Specialty Charity Hospital ($110,000)',
                    'Hospital Construction: Grand General Hospital & Trauma Center ($150,000)',
                    ...PROGRAMS.map((p) => p.title),
                    'Village Masjid Construction',
                    'Solar Electric Well',
                    'Livelihood Support',
                  ].includes(cause) && (
                    <optgroup label="Selected Dedicated Project">
                      <option value={cause}>{cause}</option>
                    </optgroup>
                  )}
              </select>
            </label>
          </div>

          {/* FIGURE AMOUNT HERO CARD WITH MODIFY ICON & CONTROLS */}
          <div className="rounded-3xl bg-gradient-to-br from-[#FAFDE6] via-white to-amber-50/50 p-6 sm:p-7 border-2 border-[#114A18]/25 shadow-sm space-y-5">
            {/* Top row: Big amount display with Modify Icon Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200/80">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[0.68rem] font-bold uppercase tracking-widest text-slate-500 font-mono">
                    Donation Figure Amount
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#114A18] text-[0.68rem] font-bold font-mono">
                    {sharesCount} {sharesCount === 1 ? 'Share ($10)' : 'Shares ($10 each)'}
                  </span>
                </div>

                <div className="flex items-baseline flex-wrap gap-2">
                  <span className="font-editorial text-4xl sm:text-5xl font-black text-[#0A2E0F] tabular-nums tracking-tight">
                    {country.symbol}{amount.toLocaleString()}
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-600">
                    {country.currency}
                  </span>
                  <span className="text-xs font-semibold text-[#165B1E] bg-[#D8EC6E]/50 px-2.5 py-0.5 rounded-md font-mono">
                    ≈ ${amountUSD} USD
                  </span>
                </div>
              </div>

              {/* Explicit Modify Icon Button */}
              <button
                type="button"
                onClick={() => {
                  amountInputRef.current?.focus();
                  amountInputRef.current?.select();
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-amber-50 text-[#114A18] border-2 border-amber-300 font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer group hover:scale-[1.02]"
                title="Modify payment amount"
              >
                <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center text-[#E59A14] group-hover:bg-[#E59A14] group-hover:text-white transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </div>
                <span>Modify Amount</span>
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
              </button>
            </div>

            {/* Quick Share Increment/Decrement Modifiers */}
            <div className="space-y-2">
              <span className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-500 font-mono block">
                Quick Adjust Shares (+/- $10)
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={sharesCount <= 1}
                  onClick={() => adjustShares(-1)}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-300 hover:border-slate-400 font-bold text-xs text-slate-700 disabled:opacity-40 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5 text-rose-500" />
                  <span>-1 Share (-$10)</span>
                </button>

                <button
                  type="button"
                  onClick={() => adjustShares(1)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-emerald-300 hover:border-[#114A18] font-bold text-xs text-[#0A2E0F] flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>+1 Share (+$10)</span>
                </button>

                <button
                  type="button"
                  onClick={() => adjustShares(5)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-emerald-300 hover:border-[#114A18] font-bold text-xs text-[#0A2E0F] flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>+5 Shares (+$50)</span>
                </button>

                <button
                  type="button"
                  onClick={() => adjustShares(10)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-400 hover:bg-emerald-100 font-bold text-xs text-[#114A18] flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#114A18]" />
                  <span>+10 Shares (+$100)</span>
                </button>

                <button
                  type="button"
                  onClick={() => adjustShares(50)}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 border border-[#E59A14] hover:bg-amber-100 font-bold text-xs text-[#0A2E0F] flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E59A14]" />
                  <span>+50 Shares (+$500)</span>
                </button>
              </div>
            </div>

            {/* Presets and Custom Input with integrated modify icon */}
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {country.presets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`py-2.5 px-2 rounded-2xl font-mono font-bold text-xs sm:text-sm transition-all border-2 ${
                      amount === val
                        ? 'bg-[#114A18] text-white border-[#114A18] shadow-sm scale-102'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-[#114A18]'
                    }`}
                  >
                    {country.symbol}{val.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Editable Amount Input with Pencil Icon */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                  <div className="w-6 h-6 rounded-md bg-amber-100 flex items-center justify-center text-[#E59A14]">
                    <Pencil className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono font-black text-slate-400 text-lg">
                    {country.symbol}
                  </span>
                </div>
                <input
                  ref={amountInputRef}
                  type="number"
                  min={minimumLocal}
                  value={amount}
                  onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
                  placeholder="Type custom figure..."
                  className="w-full rounded-2xl bg-white border-2 border-slate-200 font-mono font-bold text-xl sm:text-2xl text-[#0A2E0F] pl-20 pr-36 py-3.5 focus:border-[#114A18] focus:ring-2 focus:ring-[#114A18]/20 outline-hidden transition-all tabular-nums"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-slate-500 font-mono font-semibold">
                  <span>{country.currency}</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                    Editable Figure
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Projection Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#114A18] via-[#0A2E0F] to-[#114A18] text-white space-y-1.5 shadow-md border border-[#D8EC6E]/30">
            <div className="flex items-center gap-1.5 text-xs text-[#D8EC6E] uppercase tracking-wider font-bold font-mono">
              <Heart className="w-3.5 h-3.5 text-[#E59A14]" />
              <span>Projected Impact on the Ground</span>
            </div>
            <p className="font-editorial font-bold text-base sm:text-lg leading-snug">
              Your gift of <span className="text-[#D8EC6E] font-mono">{country.symbol}{amount.toLocaleString()}</span> ({sharesCount} $10 shares) to “{cause}” brings vital relief to families facing extreme hardship. <span className="font-arabic font-normal text-amber-200">جَزَاكُمُ اللَّهُ خَيْرًا</span>
            </p>
          </div>

          {/* PAYMENT METHOD TABS WITH ORIGINAL BRAND ICONS */}
          <div className="space-y-5 pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500 font-mono">
                Select Payment Channel
              </span>
              <span className="text-[0.68rem] text-emerald-800 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>SSL Encrypted &amp; Verified</span>
              </span>
            </div>

            {/* The 3 Tabs With Original Brand Logos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Tab 1: Mobile Money with MTN MoMo & Airtel Logo preview */}
              <button
                type="button"
                onClick={() => setActiveTab('momo')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                  activeTab === 'momo'
                    ? 'bg-[#114A18] text-white border-[#114A18] shadow-md ring-2 ring-emerald-300'
                    : 'bg-[#FAF7F0] text-slate-800 border-slate-200 hover:border-[#114A18]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm">Mobile Money</span>
                  <Smartphone className="w-4 h-4 opacity-70" />
                </div>
                {/* Original brand preview badges */}
                <div className="flex items-center gap-1.5 pt-1">
                  <MtnMomoLogo className="h-5" />
                  <AirtelMoneyLogo className="h-5" />
                  <MpesaLogo className="h-5" />
                </div>
              </button>

              {/* Tab 2: Bank Wire with official UBA Logo */}
              <button
                type="button"
                onClick={() => setActiveTab('bank')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                  activeTab === 'bank'
                    ? 'bg-[#114A18] text-white border-[#114A18] shadow-md ring-2 ring-emerald-300'
                    : 'bg-[#FAF7F0] text-slate-800 border-slate-200 hover:border-[#114A18]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm">Bank Wire</span>
                  <Landmark className="w-4 h-4 opacity-70" />
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <UbaBankLogo className="h-5" />
                </div>
              </button>

              {/* Tab 3: Card Checkout with Visa & Mastercard Logos */}
              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                  activeTab === 'card'
                    ? 'bg-[#114A18] text-white border-[#114A18] shadow-md ring-2 ring-emerald-300'
                    : 'bg-[#FAF7F0] text-slate-800 border-slate-200 hover:border-[#114A18]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm">Card &amp; Digital</span>
                  <CreditCard className="w-4 h-4 opacity-70" />
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <VisaLogo className="h-5" />
                  <MastercardLogo className="h-5" />
                  <ApplePayLogo className="h-5" />
                </div>
              </button>
            </div>

            {/* TAB CONTENT 1: MOBILE MONEY WITH AUTHENTIC OPERATOR CARDS */}
            {activeTab === 'momo' && (
              <div className="space-y-5 pt-2">
                <div className="space-y-2">
                  <label className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-600 font-mono block">
                    Choose Mobile Money Network for {country.name}
                  </label>

                  {/* Original Brand Network Selection Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {/* MTN MoMo */}
                    <button
                      type="button"
                      onClick={() => setSelectedMomoNetwork('MTN MoMo')}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                        selectedMomoNetwork === 'MTN MoMo'
                          ? 'border-[#002B49] bg-[#FFCC00]/15 ring-2 ring-[#FFCC00] shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <MtnMomoLogo className="h-7" />
                      <div className="flex items-center gap-1 text-[0.65rem] font-mono font-bold text-slate-700">
                        {selectedMomoNetwork === 'MTN MoMo' && <Check className="w-3 h-3 text-[#114A18]" />}
                        <span>Dial *165#</span>
                      </div>
                    </button>

                    {/* Airtel Money */}
                    <button
                      type="button"
                      onClick={() => setSelectedMomoNetwork('Airtel Money')}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                        selectedMomoNetwork === 'Airtel Money'
                          ? 'border-[#E40000] bg-rose-50 ring-2 ring-[#E40000] shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <AirtelMoneyLogo className="h-7" />
                      <div className="flex items-center gap-1 text-[0.65rem] font-mono font-bold text-slate-700">
                        {selectedMomoNetwork === 'Airtel Money' && <Check className="w-3 h-3 text-[#E40000]" />}
                        <span>Dial *185#</span>
                      </div>
                    </button>

                    {/* Safaricom M-Pesa */}
                    <button
                      type="button"
                      onClick={() => setSelectedMomoNetwork('Safaricom M-Pesa')}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                        selectedMomoNetwork === 'Safaricom M-Pesa'
                          ? 'border-[#008542] bg-emerald-50 ring-2 ring-[#008542] shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <MpesaLogo className="h-7" />
                      <div className="flex items-center gap-1 text-[0.65rem] font-mono font-bold text-slate-700">
                        {selectedMomoNetwork === 'Safaricom M-Pesa' && <Check className="w-3 h-3 text-[#008542]" />}
                        <span>Lipa na M-PESA</span>
                      </div>
                    </button>

                    {/* Wave (for West Africa) */}
                    {(countryKey === 'SN' || countryKey === 'CI') && (
                      <button
                        type="button"
                        onClick={() => setSelectedMomoNetwork('Wave Mobile Money')}
                        className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                          selectedMomoNetwork === 'Wave Mobile Money'
                            ? 'border-[#1DC3F2] bg-sky-50 ring-2 ring-[#1DC3F2] shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <WaveLogo className="h-7" />
                        <span className="text-[0.65rem] font-mono font-bold text-slate-700">Wave Instant</span>
                      </button>
                    )}

                    {/* Orange Money */}
                    {(countryKey === 'SN' || countryKey === 'CI') && (
                      <button
                        type="button"
                        onClick={() => setSelectedMomoNetwork('Orange Money')}
                        className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                          selectedMomoNetwork === 'Orange Money'
                            ? 'border-[#FF7900] bg-amber-50 ring-2 ring-[#FF7900] shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <OrangeMoneyLogo className="h-7" />
                        <span className="text-[0.65rem] font-mono font-bold text-slate-700">Orange Pass</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#114A18]" />
                    <span className="font-bold text-[#0A2E0F]">
                      Instant USSD Push Verification for {selectedMomoNetwork}
                    </span>
                  </div>
                  <p className="text-slate-600 pl-6">
                    A secure payment prompt will be dispatched directly to your mobile phone number. Simply enter your secret PIN to authorize your {country.symbol}{amount.toLocaleString()} Sadaqah gift.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Full Name (or leave anonymous)"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="rounded-xl bg-[#FAF7F0] border border-slate-200 text-sm p-3.5 focus:border-[#114A18] outline-hidden"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number (e.g. +256 77...)"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="rounded-xl bg-[#FAF7F0] border border-slate-200 text-sm p-3.5 focus:border-[#114A18] outline-hidden font-mono"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Optional Dua, Dedication, or Message"
                  value={donorDua}
                  onChange={(e) => setDonorDua(e.target.value)}
                  className="w-full rounded-xl bg-[#FAF7F0] border border-slate-200 text-sm p-3.5 focus:border-[#114A18] outline-hidden"
                />

                <button
                  type="button"
                  onClick={() => handleCompleteDonation(`Mobile Money (${selectedMomoNetwork})`)}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl bg-[#E59A14] hover:bg-[#F2AE2E] text-[#0A2E0F] font-black text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 group"
                >
                  {isProcessing ? (
                    <span>Pushing {selectedMomoNetwork} Prompt to {donorPhone || 'Phone'}...</span>
                  ) : (
                    <>
                      <span>
                        Donate {country.symbol}{amount.toLocaleString()} via {selectedMomoNetwork}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* TAB CONTENT 2: BANK WIRE (UBA) WITH AUTHENTIC UBA BRANDING */}
            {activeTab === 'bank' && (
              <div className="space-y-4 pt-2">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0A2E0F] via-[#114A18] to-[#165B1E] text-white space-y-5 border-2 border-amber-300/40 shadow-xl text-xs sm:text-sm">
                  {/* Top Bar with official UBA Logo */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/20">
                    <div className="flex items-center gap-3">
                      <UbaBankLogo className="h-9" />
                      <div>
                        <span className="font-editorial font-bold text-base text-[#F2AE2E] block">
                          {settings.bankName}
                        </span>
                        <span className="text-[0.65rem] font-mono text-emerald-200">
                          Jinja Head Office · Reg. NGO Account
                        </span>
                      </div>
                    </div>
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-emerald-900 bg-[#D8EC6E] px-3 py-1 rounded-full font-mono self-start sm:self-center">
                      Official Wire Coordinates
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="text-[0.65rem] text-emerald-200 uppercase tracking-wider block font-mono">
                        Account Name
                      </span>
                      <div className="flex items-center justify-between font-bold pt-0.5">
                        <span className="text-sm">{settings.accountName}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(settings.accountName, 'accName')}
                          className="text-[#F2AE2E] hover:underline text-xs flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === 'accName' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="text-[0.65rem] text-emerald-200 uppercase tracking-wider block font-mono">
                        Account Number
                      </span>
                      <div className="flex items-center justify-between font-bold text-[#F2AE2E] font-mono text-base pt-0.5">
                        <span>{settings.accountNumber}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(settings.accountNumber, 'accNum')}
                          className="text-[#F2AE2E] hover:underline text-xs flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === 'accNum' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="text-[0.65rem]">Copy</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="text-[0.65rem] text-emerald-200 uppercase tracking-wider block font-mono">
                        SWIFT / BIC Code
                      </span>
                      <div className="flex items-center justify-between font-bold font-mono pt-0.5">
                        <span className="text-white text-base">{settings.swiftCode}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(settings.swiftCode, 'swift')}
                          className="text-[#F2AE2E] hover:underline text-xs flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === 'swift' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="text-[0.65rem]">Copy</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="text-[0.65rem] text-emerald-200 uppercase tracking-wider block font-mono">
                        Bank Branch Location
                      </span>
                      <span className="font-bold block pt-0.5">{settings.bankLocation}</span>
                    </div>
                  </div>

                  {/* Transfer Reference */}
                  <div className="p-3.5 rounded-2xl bg-black/30 border border-white/15 space-y-1">
                    <span className="text-[0.65rem] text-emerald-200 uppercase tracking-wider block font-mono">
                      Transfer Reference (Include in description of your wire slip)
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#D8EC6E] text-base">
                        {paymentRef}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(paymentRef, 'ref')}
                        className="text-xs text-[#F2AE2E] font-bold flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                      >
                        {copiedField === 'ref' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy Reference</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleCompleteDonation('UBA Bank Wire')}
                      className="flex-1 py-3.5 rounded-2xl bg-[#D8EC6E] hover:bg-[#C6E04A] text-[#0A2E0F] font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
                    >
                      Record Bank Wire &amp; Generate Receipt
                    </button>
                    <a
                      href={`https://wa.me/${settings.primaryPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                        `Assalamu Alaikum Sadaqah Africa, I have completed a Bank Wire of ${country.symbol}${amount.toLocaleString()} for ${cause}. Reference: ${paymentRef}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3.5 rounded-2xl bg-[#E59A14] hover:bg-[#F2AE2E] text-[#0A2E0F] font-bold text-xs sm:text-sm text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <WhatsAppBrandLogo className="h-4" />
                      <span>Send Wire Slip on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: CARD CHECKOUT WITH ORIGINAL BRAND LOGOS */}
            {activeTab === 'card' && (
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-amber-950 font-mono">
                      International Card Gateway
                    </span>
                    <div className="flex items-center gap-2">
                      <VisaLogo className="h-5" />
                      <MastercardLogo className="h-5" />
                      <ApplePayLogo className="h-5" />
                      <GooglePayLogo className="h-5" />
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs">
                    Protected with 256-bit SSL encryption and 3D Secure fraud defense. Instant Amanah receipt generated for donor accounting.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Cardholder Name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="rounded-xl bg-[#FAF7F0] border border-slate-200 text-sm p-3.5 focus:border-[#114A18] outline-hidden"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Receipt Email Address"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="rounded-xl bg-[#FAF7F0] border border-slate-200 text-sm p-3.5 focus:border-[#114A18] outline-hidden font-mono"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Optional Dua or Dedication"
                  value={donorDua}
                  onChange={(e) => setDonorDua(e.target.value)}
                  className="w-full rounded-xl bg-[#FAF7F0] border border-slate-200 text-sm p-3.5 focus:border-[#114A18] outline-hidden"
                />

                <button
                  type="button"
                  onClick={() => handleCompleteDonation('Credit / Debit Card')}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl bg-[#114A18] hover:bg-[#165B1E] text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 group"
                >
                  {isProcessing ? (
                    <span>Processing Secure Gateway...</span>
                  ) : (
                    <>
                      <span>
                        Pay {country.symbol}{amount.toLocaleString()} ({sharesCount} {sharesCount === 1 ? 'share' : 'shares'})
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* WhatsApp Direct Pledge CTA with Authentic WhatsApp Logo */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleWhatsAppPledge}
              className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm sm:text-base shadow-md flex items-center justify-center gap-2.5 transition-all cursor-pointer hover:shadow-lg"
            >
              <WhatsAppBrandLogo className="h-6" />
              <span>Pledge This Contribution Directly via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

