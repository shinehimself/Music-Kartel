import React from 'react';
import { X, CheckCircle2, Printer, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { WhatsAppBrandLogo } from './PaymentBrandLogos';
import { BackgroundBadge } from './BackgroundBadge';

interface ReceiptData {
  receiptNumber: string;
  date: string;
  donorName: string;
  amount: number;
  currencySymbol: string;
  currencyCode: string;
  amountUSD: number;
  shares: number;
  cause: string;
  frequency: string;
  paymentMethod: string;
  reference: string;
  dua?: string;
}

interface ReceiptModalProps {
  receipt: ReceiptData | null;
  onClose: () => void;
  primaryPhone: string;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  receipt,
  onClose,
  primaryPhone,
}) => {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const cleanPhone = primaryPhone.replace(/\D/g, '');
  const shareWhatsAppMessage = `Assalamu Alaikum Sadaqah Africa,\n\nI have generated my Official Amanah Donation Receipt:\n• Receipt No: ${receipt.receiptNumber}\n• Donor: ${receipt.donorName}\n• Contribution: ${receipt.currencySymbol}${receipt.amount.toLocaleString()} (${receipt.currencyCode}) [${receipt.shares} x $10 shares]\n• Cause: ${receipt.cause}\n• Reference: ${receipt.reference}\n\nJazakum Allahu Khayran.`;

  return (
    <div className="fixed inset-0 z-50 bg-[#0A2E0F]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF7F0] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-[#E59A14] space-y-6 relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-slate-500 hover:text-slate-900 bg-white border border-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Header */}
        <div className="text-center space-y-3 pb-4 border-b border-amber-200">
          <div className="flex justify-center">
            <BrandLogo variant="full" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[0.7rem] font-bold font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Official Amanah Donation Receipt</span>
          </div>

          <h3 className="font-editorial font-extrabold text-3xl sm:text-4xl text-[#0A2E0F] tracking-tight">
            Certificate of Contribution
          </h3>
          <p className="text-xs text-slate-500">
            Receipt: <strong className="font-mono text-slate-800">{receipt.receiptNumber}</strong> · Date: {receipt.date}
          </p>
        </div>

        {/* Receipt Details Box */}
        <div className="rounded-2xl bg-white border border-amber-200/80 p-5 space-y-3 text-xs sm:text-sm relative overflow-hidden">
          {/* Official Seal Watermark */}
          <BackgroundBadge size="md" position="center" opacity="opacity-[0.08]" variant="color" />

          <div className="relative z-10 space-y-3">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Donor Name:</span>
              <span className="font-bold text-[#0A2E0F] font-editorial text-base">{receipt.donorName}</span>
            </div>

          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Contributed Amount:</span>
            <span className="font-editorial font-black text-xl text-[#114A18]">
              {receipt.currencySymbol}{receipt.amount.toLocaleString()} ({receipt.currencyCode})
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Equivalent $10 Shares:</span>
            <span className="font-bold text-[#E59A14] font-editorial text-base">
              {receipt.shares} {receipt.shares === 1 ? 'Share' : 'Shares'} (~${receipt.amountUSD} USD)
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Targeted Purpose:</span>
            <span className="font-bold text-[#0A2E0F] text-right max-w-[200px]">{receipt.cause}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Frequency:</span>
            <span className="font-medium text-slate-800">{receipt.frequency}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Channel:</span>
            <span className="font-medium text-slate-800">{receipt.paymentMethod}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-slate-500 font-medium">Amanah Reference:</span>
            <span className="font-mono font-bold text-slate-800">{receipt.reference}</span>
          </div>

          {receipt.dua && (
            <div className="pt-2 border-t border-slate-100 italic text-slate-600 text-xs">
              “{receipt.dua}”
            </div>
          )}
          </div>
        </div>

        {/* Islamic Blessing */}
        <div className="p-4 rounded-2xl bg-[#FAFDE6] border border-amber-300 text-center space-y-1">
          <p className="font-arabic text-[#114A18] text-lg font-bold">
            جَزَاكُمُ اللَّهُ خَيْرًا وَبَارَكَ فِيكُمْ
          </p>
          <p className="text-[0.72rem] text-slate-600 leading-relaxed font-sans">
            May Allah accept this noble Sadaqah, multiply your provision, and make it an ongoing source of light and divine protection in both worlds.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save Receipt</span>
          </button>

          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(shareWhatsAppMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <WhatsAppBrandLogo className="h-4" />
            <span>Share Slip on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
