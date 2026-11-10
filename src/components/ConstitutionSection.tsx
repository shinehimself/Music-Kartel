import React, { useState } from 'react';
import { ScrollText, MapPin, Coins, ClipboardCheck, Handshake, ChevronDown, MessageCircle, ExternalLink, Download, FileDown, CheckCircle2 } from 'lucide-react';
import { CONSTITUTION_ARTICLES } from '../data/charityData';
import { triggerPdfDownload } from '../utils/downloadPdf';
import { BackgroundBadge } from './BackgroundBadge';

export const ConstitutionSection: React.FC = () => {
  const [openArticle, setOpenArticle] = useState<number>(1);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      await triggerPdfDownload('sadaqah-africa-constitution-and-audited-reports.pdf');
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('PDF download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="constitution" className="py-20 bg-white border-b border-amber-200/60 relative overflow-hidden">
      {/* Official Sadaqah Africa Background Badges */}
      <BackgroundBadge size="giant" position="top-right" opacity="opacity-[0.05]" variant="color" className="hidden lg:block -mr-16 -mt-12" />
      <BackgroundBadge size="xl" position="bottom-left" opacity="opacity-[0.04]" variant="color" className="hidden sm:block -ml-12 mb-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="font-arabic text-[#114A18] text-lg sm:text-xl font-medium tracking-wide">
            وَأَوْفُوا بِالْعَهْدِ إِنَّ الْعَهْدَ كَانَ مَسْئُولًا
          </p>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#0A2E0F] text-xs font-bold uppercase tracking-wider font-mono">
            <ScrollText className="w-3.5 h-3.5 text-[#114A18]" />
            <span>Governance, Ethics &amp; Inviolable Trust</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2E0F] tracking-tight leading-tight">
            Our Founding Constitution <span className="italic text-[#165B1E] font-normal">· The Trust We Keep</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            The legal and Islamic governance framework that dictates how Sadaqah Africa receives, safeguards, and allocates every single donation without compromise.
          </p>
        </div>

        {/* Content Layout: Sticky Sidebar (4 cols) & 12 Articles (8 cols) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="rounded-3xl bg-gradient-to-br from-[#0A2E0F] via-[#114A18] to-[#165B1E] text-white p-6 sm:p-7 shadow-xl border border-amber-300/30 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D8EC6E] block font-mono">
                Charter At a Glance
              </span>
              <p className="font-editorial font-bold text-xl leading-snug text-emerald-50">
                Every single gift is an inviolable trust (Amanah), disbursed solely for the cause specified by the donor.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-emerald-50/95 pt-2">
                <li className="flex gap-2.5 items-start">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#D8EC6E] shrink-0" />
                  <span>Registered head office: Jinja, Uganda, Africa</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Coins className="w-4 h-4 mt-0.5 text-[#D8EC6E] shrink-0" />
                  <span>Open to all supporters from $10 / €10 shares</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <ClipboardCheck className="w-4 h-4 mt-0.5 text-[#D8EC6E] shrink-0" />
                  <span>Field Committee audits aid requests every Tuesday</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Handshake className="w-4 h-4 mt-0.5 text-[#D8EC6E] shrink-0" />
                  <span>Dual signatories required on all UBA withdrawals</span>
                </li>
              </ul>

              <div className="border-t border-white/15 pt-3 text-[0.7rem] text-emerald-200 font-mono">
                Founding Charter Version 1.2 · Reg. Non-Profit
              </div>
            </div>

            {/* Official PDF Document Access & Download */}
            <div className="space-y-2.5">
              {/* Primary: Direct PDF Download */}
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isDownloading}
                className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-[#114A18] to-[#0A2E0F] hover:from-[#165B1E] hover:to-[#114A18] text-[#D8EC6E] font-bold shadow-lg hover:shadow-xl transition-all border border-[#D8EC6E]/60 text-left flex items-center justify-between group cursor-pointer disabled:opacity-75"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-[#D8EC6E] group-hover:text-[#0A2E0F] text-[#D8EC6E] transition-colors">
                    {downloadSuccess ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 group-hover:text-[#0A2E0F]" />
                    ) : (
                      <FileDown className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5">
                      <span>{isDownloading ? 'Preparing PDF...' : downloadSuccess ? 'Downloaded!' : 'Download Official PDF'}</span>
                      <span className="px-1.5 py-0.2 rounded text-[0.65rem] bg-[#D8EC6E] text-[#0A2E0F] font-mono font-black">
                        .PDF
                      </span>
                    </div>
                    <p className="text-[0.7rem] text-emerald-200/90 font-medium">
                      5 Pages · Complete 12 Articles &amp; 5-Yr Audits
                    </p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-[#D8EC6E] group-hover:translate-y-0.5 transition-transform shrink-0" />
              </button>

              {/* Open & Preview PDF in browser */}
              <a
                href="/sadaqah-africa-constitution-and-audited-reports.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0A2E0F] font-bold text-xs border border-emerald-300 shadow-2xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#114A18]" />
                <span>Open &amp; Read PDF in Browser</span>
              </a>

              {/* WhatsApp Request Alternative */}
              <a
                href="https://wa.me/256794829147?text=Assalamu%20Alaikum%20Sadaqah%20Africa%2C%20please%20send%20me%20a%20copy%20of%20your%20Constitution%20and%20Audited%20Reports%20in%20PDF%20format."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-[#D8EC6E] hover:bg-[#C6E04A] text-[#0A2E0F] font-bold text-xs sm:text-sm shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#0A2E0F]" />
                <span>Request Certified PDF on WhatsApp</span>
              </a>
            </div>
          </aside>

          {/* 12 Articles List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Preamble */}
            <div className="rounded-3xl bg-[#FAFDE6] border border-amber-300/70 p-6 text-slate-700 space-y-2">
              <p className="font-arabic text-center text-lg sm:text-xl text-[#114A18] font-bold">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="italic text-xs sm:text-sm leading-relaxed first-letter:font-editorial first-letter:text-3xl first-letter:font-bold first-letter:text-[#114A18] first-letter:mr-1">
                “In the name of Allah, the Most Gracious, the Most Merciful. We, the founders, trustees, and volunteers of Sadaqah Africa Charity Organization, affirming that every step in the right direction matters, adopt this Constitution to guide our collective duty of relieving distress, restoring human honor, and building a brighter, more equitable world for all.”
              </p>
            </div>

            {/* Articles Accordion */}
            {CONSTITUTION_ARTICLES.map((art) => {
              const isOpen = openArticle === art.number;
              return (
                <div
                  key={art.number}
                  className="rounded-2xl bg-white border border-amber-200/80 shadow-xs hover:border-amber-300 transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenArticle(isOpen ? 0 : art.number)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer hover:bg-amber-50/40 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#114A18] to-[#165B1E] text-[#D8EC6E] font-mono font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                        §{art.number}
                      </span>
                      <span className="font-editorial font-bold text-base sm:text-lg text-[#0A2E0F]">
                        Article {art.number}: {art.title}
                      </span>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-[#114A18] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 sm:pl-[4.25rem] text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2.5 border-t border-slate-100">
                      {art.paragraphs.map((p, pIdx) => {
                        if (Array.isArray(p)) {
                          return (
                            <ul key={pIdx} className="list-disc pl-5 space-y-1.5 text-slate-600">
                              {p.map((item, itemIdx) => (
                                <li key={itemIdx}>{item}</li>
                              ))}
                            </ul>
                          );
                        }
                        return <p key={pIdx}>{p}</p>;
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Adoption Stamp */}
            <div className="rounded-2xl bg-gradient-to-r from-[#FAFDE6] to-white border border-amber-300/70 p-4 text-xs text-slate-600">
              <strong className="text-[#0A2E0F] block font-bold mb-0.5 font-editorial text-sm">Formal Adoption &amp; Legal Seal</strong>
              Formally adopted by unanimous resolution of the Board of Trustees and founding members at Jinja, Uganda, Africa. Registered Non-Profit Entity.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
