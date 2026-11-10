import React from 'react';
import { BrandLogo } from './BrandLogo';
import { MessageCircle, ShieldCheck, Landmark, Heart } from 'lucide-react';
import { SiteSettings } from '../types/charity';
import { UbaBankLogo, WhatsAppBrandLogo } from './PaymentBrandLogos';
import { BackgroundBadge } from './BackgroundBadge';

interface FooterProps {
  settings: SiteSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin }) => {
  const cleanPhone = settings.primaryPhone.replace(/\D/g, '');
  const cleanCeo = settings.ceoPhone.replace(/\D/g, '');

  return (
    <>
      <footer className="bg-gradient-to-br from-[#0A2E0F] via-[#114A18] to-[#165B1E] text-white pt-16 pb-12 border-t-2 border-[#E59A14]/30 relative overflow-hidden">
        <div className="absolute inset-0 lattice opacity-20 pointer-events-none" />
        
        {/* Official Sadaqah Africa Emblem Background Watermark */}
        <BackgroundBadge size="xl" position="bottom-right" opacity="opacity-[0.06]" variant="dark" className="hidden md:block -mr-10 -mb-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Main 4-Column Grid */}
          <div className="grid md:grid-cols-4 gap-8 text-xs text-emerald-100/90 leading-relaxed">
            {/* Col 1: Identity */}
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-2xl inline-block shadow-md">
                <BrandLogo variant="full" />
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Empowering vulnerable communities across Africa with sustainable clean water wells, pediatric sickle cell surgery, emergency food packs, orphan sponsorships, and women’s menstrual health through our <strong className="text-white">$10 Sadaqah movement running up to $50,000</strong>.
              </p>
              <div className="flex items-center gap-1.5 text-[#F2AE2E] font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Amanah &amp; Zero Corruption Policy</span>
              </div>
            </div>

            {/* Col 2: Bank Coordinates */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <UbaBankLogo className="h-6" />
                <span className="font-editorial font-bold text-base text-[#F2AE2E]">
                  Official Wire Coordinates
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <p><span className="text-emerald-300">Bank:</span> {settings.bankName}</p>
                <p><span className="text-emerald-300">A/C Name:</span> {settings.accountName}</p>
                <p><span className="text-emerald-300">A/C No:</span> <strong className="font-mono text-white text-sm">{settings.accountNumber}</strong></p>
                <p><span className="text-emerald-300">SWIFT:</span> <strong className="font-mono text-[#D8EC6E]">{settings.swiftCode}</strong></p>
                <p><span className="text-emerald-300">Location:</span> {settings.bankLocation}</p>
              </div>
            </div>

            {/* Col 3: Direct WhatsApp Verification */}
            <div className="space-y-3">
              <span className="font-editorial font-bold text-lg text-[#F2AE2E] flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Inquiries</span>
              </span>
              <div className="space-y-2 text-xs">
                <p className="text-emerald-100">
                  Connect with our frontline coordinators to send bank wire slips or request project photo updates:
                </p>
                <div className="space-y-1.5">
                  <a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold transition-colors"
                  >
                    Primary Line: {settings.primaryPhone}
                  </a>
                  <a
                    href={`https://wa.me/${cleanCeo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 rounded-xl bg-[#E59A14]/20 hover:bg-[#E59A14]/30 border border-[#E59A14]/40 text-[#F2AE2E] font-bold transition-colors"
                  >
                    CEO Line: {settings.ceoPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Col 4: Quick Nav & Governance */}
            <div className="space-y-3">
              <span className="font-editorial font-bold text-lg text-[#F2AE2E] block">
                Quick Navigation
              </span>
              <ul className="space-y-1.5 text-xs text-emerald-100">
                <li><a href="#campaign" className="hover:text-white transition-colors">· The $50,000 Campaign Roadmap</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">· 9 Humanitarian Programs</a></li>
                <li><a href="#fixed-projects" className="hover:text-white transition-colors">· Fixed-Price Community Projects</a></li>
                <li><a href="#infrastructure" className="hover:text-white text-[#F2AE2E] font-bold transition-colors">· Schools &amp; Hospitals ($20k–$150k)</a></li>
                <li><a href="#constitution" className="hover:text-white transition-colors">· The Founding Constitution</a></li>
                <li>
                  <a
                    href="/sadaqah-africa-constitution-and-audited-reports.pdf"
                    download="sadaqah-africa-constitution-and-audited-reports.pdf"
                    className="text-[#D8EC6E] hover:underline font-bold transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>· Download Constitution &amp; Audits</span>
                    <span className="text-[0.6rem] bg-[#114A18] text-[#D8EC6E] px-1.5 py-0.5 rounded border border-[#D8EC6E]/40 font-mono">PDF · 50KB</span>
                  </a>
                </li>
                <li><a href="#request-aid" className="hover:text-white transition-colors">· Request Community Aid Form</a></li>
                <li><a href="#vision" className="hover:text-white transition-colors">· Volunteer &amp; NGO Alliances</a></li>
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="text-[#F2AE2E] hover:underline font-bold text-xs pt-1 block cursor-pointer"
                  >
                    · Admin Control Center
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="pt-8 border-t border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300">
            <p>
              © 2026 Sadaqah Africa Charity Organization. Registered Non-Profit NGO, Jinja, Uganda, Africa. All Rights Reserved.
            </p>
            <p className="flex items-center gap-1 text-emerald-400">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
              <span>for vulnerable communities across Africa</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Pill (Bottom Right) */}
      <a
        href={`https://wa.me/${cleanPhone}?text=Assalamu%20Alaikum%20Sadaqah%20Africa%2C%20I%20would%20like%20to%20inquire%20about%20the%20$50,000%20Campaign.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#165B1E] hover:bg-[#114A18] text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold border-2 border-[#F2AE2E] transition-all transform hover:scale-105 active:scale-95"
      >
        <WhatsAppBrandLogo className="h-5" />
        <span>Chat With Us on WhatsApp</span>
      </a>
    </>
  );
};
