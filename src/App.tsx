/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroCampaign } from './components/HeroCampaign';
import { MilestonesRoadmap } from './components/MilestonesRoadmap';
import { CampaignFundSection } from './components/CampaignFundSection';
import { LiveSlidingTicker } from './components/LiveSlidingTicker';
import { LiveSlidingDispatches } from './components/LiveSlidingDispatches';
import { GroundFootageSlider } from './components/GroundFootageSlider';
import { ProgramsGrid } from './components/ProgramsGrid';
import { FixedProjectsSection } from './components/FixedProjectsSection';
import { InstitutionalProjectsSection } from './components/InstitutionalProjectsSection';
import { DonationPortal } from './components/DonationPortal';
import { GrowthDashboard } from './components/GrowthDashboard';
import { ConstitutionSection } from './components/ConstitutionSection';
import { AidRequestForm } from './components/AidRequestForm';
import { PartnerVolunteerSection } from './components/PartnerVolunteerSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { ReceiptModal } from './components/ReceiptModal';
import { AIAssistant } from './components/AIAssistant';

import {
  INITIAL_SETTINGS,
  CAMPAIGN_MILESTONES,
  PROGRAMS,
  FIXED_PROJECTS,
  INFRASTRUCTURE_PROJECTS,
  INITIAL_RECENT_DONATIONS,
  INITIAL_AID_REQUESTS,
} from './data/charityData';
import { SiteSettings, AidRequest, RecentDonation, CampaignMilestone } from './types/charity';

export default function App() {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('sadaqah_settings_50k');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_SETTINGS;
  });

  const [recentDonations, setRecentDonations] = useState<RecentDonation[]>(() => {
    try {
      const saved = localStorage.getItem('sadaqah_donations_50k');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_RECENT_DONATIONS;
  });

  const [aidRequests, setAidRequests] = useState<AidRequest[]>(() => {
    try {
      const saved = localStorage.getItem('sadaqah_aid_requests_50k');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_AID_REQUESTS;
  });

  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [selectedCause, setSelectedCause] = useState<string>('The $50,000 Campaign Fund');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('US');
  const [adminOpen, setAdminOpen] = useState<boolean>(false);
  const [activeReceipt, setActiveReceipt] = useState<any | null>(null);
  const [currentLang, setCurrentLang] = useState<string>('en');

  // Handle RTL languages
  useEffect(() => {
    if (currentLang === 'ar' || currentLang === 'ur') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = currentLang;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = currentLang;
    }
  }, [currentLang]);

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem('sadaqah_settings_50k', JSON.stringify(settings));
    } catch (e) {
      // ignore
    }
  }, [settings]);

  // Persist donations
  useEffect(() => {
    try {
      localStorage.setItem('sadaqah_donations_50k', JSON.stringify(recentDonations));
    } catch (e) {
      // ignore
    }
  }, [recentDonations]);

  // Persist aid requests
  useEffect(() => {
    try {
      localStorage.setItem('sadaqah_aid_requests_50k', JSON.stringify(aidRequests));
    } catch (e) {
      // ignore
    }
  }, [aidRequests]);

  // Compute milestones with current raised amount
  const computedMilestones: CampaignMilestone[] = CAMPAIGN_MILESTONES.map((ms, idx) => {
    const isFunded = settings.raised >= ms.amount;
    const isCurrent = !isFunded && (idx === 0 || settings.raised >= CAMPAIGN_MILESTONES[idx - 1].amount);
    return {
      ...ms,
      isCompleted: isFunded,
      isCurrent,
    };
  });

  const scrollToDonate = () => {
    const el = document.getElementById('donate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectAmount = (amount: number, causeTitle?: string) => {
    setSelectedAmount(amount);
    if (causeTitle) {
      setSelectedCause(causeTitle);
    }
  };

  const handleSelectProgram = (programTitle: string) => {
    setSelectedCause(programTitle);
    setSelectedAmount(10);
    scrollToDonate();
  };

  const handleSelectFixedOption = (
    projectTitle: string,
    optionLabel: string,
    amount: number,
    currency: 'USD' | 'EUR' | 'GBP'
  ) => {
    setSelectedCause(`${projectTitle} (${optionLabel})`);
    setSelectedAmount(amount);
    setSelectedCountryCode(currency === 'EUR' ? 'EU' : currency === 'GBP' ? 'UK' : 'US');
    scrollToDonate();
  };

  const handleSelectInfrastructureProject = (causeTitle: string, amountUSD: number) => {
    setSelectedCause(causeTitle);
    setSelectedAmount(amountUSD);
    setSelectedCountryCode('US');
    scrollToDonate();
  };

  const handleNavigateSection = (sectionId: string) => {
    const targetId = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.classList.add('ring-4', 'ring-[#E59A14]', 'transition-all');
      setTimeout(() => {
        el.classList.remove('ring-4', 'ring-[#E59A14]');
      }, 2500);
    }
  };

  const handleSelectDonationFromAI = (amount: number, causeTitle: string) => {
    setSelectedAmount(amount);
    setSelectedCause(causeTitle);
    scrollToDonate();
    const el = document.getElementById('donate');
    if (el) {
      el.classList.add('ring-4', 'ring-[#E59A14]', 'transition-all');
      setTimeout(() => {
        el.classList.remove('ring-4', 'ring-[#E59A14]');
      }, 2500);
    }
  };

  const handleDonationSuccess = (newDon: {
    donorName: string;
    shares: number;
    amountUSD: number;
    cause: string;
    country: string;
    duaOrMessage?: string;
  }) => {
    // Increment raised & online donors
    const updatedRaised = settings.raised + newDon.amountUSD;
    const numericDonors = parseInt(settings.onlineDonorsCount.replace(/\D/g, '') || '0', 10) + 1;

    setSettings((prev) => ({
      ...prev,
      raised: updatedRaised,
      onlineDonorsCount: numericDonors.toLocaleString(),
    }));

    // Prepend to recent donations feed
    const donationEntry: RecentDonation = {
      id: `don-${Date.now()}`,
      donorName: newDon.donorName,
      shares: newDon.shares,
      amountUSD: newDon.amountUSD,
      cause: newDon.cause,
      country: newDon.country,
      duaOrMessage: newDon.duaOrMessage,
      timestamp: 'Just now',
    };

    setRecentDonations((prev) => [donationEntry, ...prev.slice(0, 19)]);
  };

  const handleAddAidRequest = (newRequest: AidRequest) => {
    setAidRequests((prev) => [newRequest, ...prev]);
  };

  const handleUpdateAidStatus = (id: string, newStatus: 'Pending' | 'Approved' | 'Reviewing') => {
    setAidRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleDeleteAidRequest = (id: string) => {
    setAidRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleResetDefaults = () => {
    setSettings(INITIAL_SETTINGS);
    setAidRequests(INITIAL_AID_REQUESTS);
    setRecentDonations(INITIAL_RECENT_DONATIONS);
    localStorage.removeItem('sadaqah_settings_50k');
    localStorage.removeItem('sadaqah_donations_50k');
    localStorage.removeItem('sadaqah_aid_requests_50k');
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#E59A14]/30 selection:text-[#0A2E0F]">
      {/* 1. Header Navigation conforming to Top Bar Contract */}
      <Header
        onOpenAdmin={() => setAdminOpen(true)}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onQuickDonate={() => {
          setSelectedAmount(10);
          setSelectedCause('The $50,000 Campaign Fund');
          scrollToDonate();
        }}
      />

      <main className="flex-1">
        {/* 2. Hero Section: The $10 Campaign Running up to $50,000 */}
        <HeroCampaign
          settings={settings}
          onSelectAmount={handleSelectAmount}
          onScrollToDonate={scrollToDonate}
        />

        {/* 2b. Live Infinite Motion Sliding Ticker: Real-Time Pledges & Field Dispatches */}
        <LiveSlidingTicker
          onSelectCause={(cause, amt) => {
            handleSelectAmount(amt || 10, cause);
            scrollToDonate();
          }}
        />

        {/* 3. The 5 Milestones Roadmap to $50,000 */}
        <MilestonesRoadmap
          milestones={computedMilestones}
          currentRaised={settings.raised}
          goal={settings.goal}
          onSelectPhase={(amt, causeName) => {
            handleSelectAmount(amt, causeName);
            scrollToDonate();
          }}
        />

        {/* 4. The $10 Sadaqah Fund: Impact Matrix & Live Community Contributions */}
        <CampaignFundSection
          recentDonations={recentDonations}
          onSelectAmount={handleSelectAmount}
          onScrollToDonate={scrollToDonate}
        />

        {/* 5. The 9 Core Relief Programs */}
        <ProgramsGrid
          programs={PROGRAMS}
          onSelectProgram={handleSelectProgram}
        />

        {/* 6. Fixed-Price Community Projects (Masjid, Hand pump well, Electric borehole, Qurban) */}
        <FixedProjectsSection
          projects={FIXED_PROJECTS}
          onSelectFixedOption={handleSelectFixedOption}
        />

        {/* 6b. Live Sliding Ground Dispatches & Motion Stories Carousel */}
        <div id="live-dispatches">
          <LiveSlidingDispatches
            onSelectCause={(causeTitle, amt) => {
              handleSelectAmount(amt || 10, causeTitle);
              scrollToDonate();
            }}
            onScrollToDonate={scrollToDonate}
          />
        </div>

        {/* 6c. Verified Ground Footage Reel: 17 Authentic Field Photographs with Interactive Motion Slider & Lightbox */}
        <div id="field-footage">
          <GroundFootageSlider
            onSelectCause={(causeTitle, amt) => {
              handleSelectAmount(amt || 10, causeTitle);
              scrollToDonate();
            }}
            onScrollToDonate={scrollToDonate}
          />
        </div>

        {/* 7. Major Infrastructure Construction (Schools $20k-$70k & Hospitals $43k-$150k) */}
        <InstitutionalProjectsSection
          categories={INFRASTRUCTURE_PROJECTS}
          onSelectProject={handleSelectInfrastructureProject}
        />

        {/* 8. Comprehensive Multi-Currency Donation Portal */}
        <DonationPortal
          settings={settings}
          selectedAmount={selectedAmount}
          selectedCause={selectedCause}
          selectedCountryCode={selectedCountryCode}
          onDonationSuccess={handleDonationSuccess}
          onOpenReceipt={(receipt) => setActiveReceipt(receipt)}
        />

        {/* 8. Growth & Impact Volumes (2022–2026 Interactive SVG Charts) */}
        <GrowthDashboard settings={settings} />

        {/* 9. The Founding Constitution (12 Articles of Amanah & Accountability) */}
        <ConstitutionSection />

        {/* 10. Community Aid Request Portal */}
        <AidRequestForm
          onSubmitRequest={handleAddAidRequest}
          primaryPhone={settings.primaryPhone}
        />

        {/* 11. Partner & Volunteer Registration */}
        <PartnerVolunteerSection primaryPhone={settings.primaryPhone} />

        {/* 12. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* 13. Footer & Floating WhatsApp Link */}
      <Footer
        settings={settings}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Modals */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        settings={settings}
        onSaveSettings={setSettings}
        aidRequests={aidRequests}
        onUpdateAidRequestStatus={handleUpdateAidStatus}
        onDeleteAidRequest={handleDeleteAidRequest}
        onResetDefaults={handleResetDefaults}
      />

      <ReceiptModal
        receipt={activeReceipt}
        onClose={() => setActiveReceipt(null)}
        primaryPhone={settings.primaryPhone}
      />

      {/* 14. Intelligent Multilingual Amanah AI Field Assistant & Navigator */}
      <AIAssistant
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onNavigateSection={handleNavigateSection}
        onSelectDonation={handleSelectDonationFromAI}
      />
    </div>
  );
}
