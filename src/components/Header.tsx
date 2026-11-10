import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { Lock, Globe, Menu, X, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  onQuickDonate: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAdmin,
  currentLang,
  onLanguageChange,
  onQuickDonate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner Ribbon */}
      <div className="bg-[#0A2E0F] text-emerald-100 text-xs sm:text-sm py-2 px-4 text-center font-medium border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
          <span className="hidden sm:inline">
            Direct Humanitarian Aid Across East Africa · Minimum Sadaqah: $10 / €10
          </span>
          <span className="sm:hidden font-semibold">
            $10 Sadaqah Campaign · Goal: $50,000
          </span>
          <div className="flex items-center gap-4 text-xs font-semibold shrink-0">
            <a
              href="https://wa.me/256794829147?text=Assalamu%20Alaikum%20Sadaqah%20Africa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#F2AE2E] hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>+256 794 829 147</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Navigation conforming to Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur border-b border-amber-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single Brand element */}
          <a href="#" className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
            <BrandLogo variant="full" />
          </a>

          {/* Zone 2: 4-5 single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <a href="#campaign" className="hover:text-[#114A18] transition-colors whitespace-nowrap">
              $50k Campaign
            </a>
            <a href="#programs" className="hover:text-[#114A18] transition-colors whitespace-nowrap">
              Programs
            </a>
            <a href="#fixed-projects" className="hover:text-[#114A18] transition-colors whitespace-nowrap">
              Fixed Projects
            </a>
            <a href="#live-dispatches" className="hover:text-[#114A18] transition-colors whitespace-nowrap inline-flex items-center gap-1.5 font-bold text-[#114A18]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Dispatches</span>
            </a>
            <a href="#field-footage" className="hover:text-[#114A18] transition-colors whitespace-nowrap inline-flex items-center gap-1.5 font-bold text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-lg border border-amber-300">
              <span>Ground Footage (17)</span>
            </a>
            <a href="#infrastructure" className="hover:text-[#114A18] transition-colors whitespace-nowrap font-bold text-[#114A18] bg-[#D8EC6E]/40 px-2.5 py-1 rounded-lg border border-[#D8EC6E]">
              Schools &amp; Hospitals
            </a>
            <a href="#growth" className="hover:text-[#114A18] transition-colors whitespace-nowrap">
              Impact &amp; Growth
            </a>
            <a href="#constitution" className="hover:text-[#114A18] transition-colors whitespace-nowrap">
              Constitution
            </a>
            <a href="#request-aid" className="hover:text-[#114A18] transition-colors whitespace-nowrap">
              Request Aid
            </a>
          </nav>

          {/* Zone 3: Language Selector + Admin Access + Primary Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Language Selector */}
            <div className="relative inline-flex items-center">
              <Globe className="w-3.5 h-3.5 text-slate-500 absolute left-2 pointer-events-none" />
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value)}
                aria-label="Language selection"
                className="pl-7 pr-2 py-1.5 text-xs font-bold rounded-lg border border-amber-300 bg-white text-slate-800 hover:border-[#114A18] transition-colors cursor-pointer"
              >
                <option value="en">English (EN)</option>
                <option value="ar">العربية (AR)</option>
                <option value="fr">Français (FR)</option>
                <option value="de">Deutsch (DE)</option>
                <option value="tr">Türkçe (TR)</option>
                <option value="ms">Bahasa Melayu (MS)</option>
                <option value="ur">اردو (UR)</option>
                <option value="sw">Kiswahili (SW)</option>
                <option value="es">Español (ES)</option>
                <option value="bn">বাংলা (BN)</option>
              </select>
            </div>

            {/* Admin Center Button */}
            <button
              onClick={onOpenAdmin}
              title="Admin Control Center"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A2E0F] text-[#F2AE2E] hover:bg-[#114A18] text-xs font-bold transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onQuickDonate}
              className="px-4 py-2 rounded-xl bg-[#114A18] hover:bg-[#165B1E] text-white font-bold text-xs sm:text-sm shadow-xs transition-all transform active:scale-95 whitespace-nowrap"
            >
              Donate $10
            </button>

            {/* Mobile Drawer Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 lg:hidden text-slate-800 hover:text-[#114A18] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0A2E0F]/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-80 bg-[#FAF7F0] p-6 flex flex-col justify-between shadow-2xl border-l border-amber-300/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-amber-200">
                <BrandLogo variant="full" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-600 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 text-sm font-semibold text-slate-800">
                <a
                  href="#campaign"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#114A18]"
                >
                  The $50,000 Campaign
                </a>
                <a
                  href="#programs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#114A18]"
                >
                  9 Relief Programs
                </a>
                <a
                  href="#fixed-projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#114A18]"
                >
                  Fund a Fixed Project
                </a>
                <a
                  href="#live-dispatches"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#114A18] flex items-center gap-2 font-bold text-[#114A18]"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Ground Dispatches</span>
                </a>
                <a
                  href="#field-footage"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#114A18] flex items-center gap-2 font-bold text-amber-900"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Ground Footage &amp; Slides (17)</span>
                </a>
                <a
                  href="#infrastructure"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 font-bold text-[#114A18] flex items-center justify-between"
                >
                  <span>School &amp; Hospital Construction</span>
                  <span className="text-[0.65rem] font-mono bg-[#D8EC6E] px-2 py-0.5 rounded-full">$20k–$150k</span>
                </a>
                <a
                  href="#growth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#114A18]"
                >
                  Impact Volumes (2022–2026)
                </a>
                <a
                  href="#constitution"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#114A18]"
                >
                  Founding Constitution
                </a>
                <a
                  href="#request-aid"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#114A18]"
                >
                  Request Community Aid
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#114A18]"
                >
                  Frequently Asked Questions
                </a>
              </nav>
            </div>

            <div className="space-y-3 pt-6 border-t border-amber-200 text-xs font-bold">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0A2E0F] text-[#F2AE2E]"
              >
                <Lock className="w-4 h-4" />
                <span>Open Admin Control Center</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onQuickDonate();
                }}
                className="w-full py-3.5 rounded-xl bg-[#114A18] text-white font-extrabold shadow-sm"
              >
                Donate Now ($10 / €10 Min)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
