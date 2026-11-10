import React, { useState } from 'react';
import { Send, FileText, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import { AidRequest } from '../types/charity';

interface AidRequestFormProps {
  onSubmitRequest: (request: AidRequest) => void;
  primaryPhone: string;
}

export const AidRequestForm: React.FC<AidRequestFormProps> = ({
  onSubmitRequest,
  primaryPhone,
}) => {
  const [applicantType, setApplicantType] = useState<'Individual' | 'Organization'>('Individual');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [subcounty, setSubcounty] = useState('');
  const [district, setDistrict] = useState('');
  const [category, setCategory] = useState<'Product' | 'Cash Aid' | 'Medical' | 'Shelter'>('Product');
  const [beneficiaries, setBeneficiaries] = useState(1);
  const [reason, setReason] = useState('');
  const [fileName, setFileName] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRequest: AidRequest = {
      id: newId,
      name,
      type: applicantType,
      mobile,
      address: `${address}, ${subcounty}`,
      district,
      category,
      beneficiariesCount: Number(beneficiaries) || 1,
      reason,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSubmitRequest(newRequest);
    setSubmittedRef(newId);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMobile('');
    setAddress('');
    setSubcounty('');
    setDistrict('');
    setReason('');
    setFileName('');
    setSubmittedRef(null);
  };

  return (
    <section id="request-aid" className="py-20 bg-[#FAF7F0] border-b border-amber-200/60 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-3">
          <p className="font-arabic text-[#114A18] text-lg sm:text-xl font-medium tracking-wide">
            إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ
          </p>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#114A18] block font-mono">
            Direct Beneficiary Support Portal
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2E0F] tracking-tight leading-tight">
            Request Donation or Community Aid
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Our Field Committee reviews all applications every Tuesday. Priority is given to orphans, widows, emergency sickle cell cases, and water-scarce villages.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#165B1E]/20 p-6 sm:p-10 space-y-6">
          {submittedRef ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="font-editorial font-bold text-2xl text-[#0A2E0F]">
                  Aid Request Successfully Logged
                </h3>
                <p className="font-mono font-bold text-[#E59A14] text-lg">
                  Reference ID: {submittedRef}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{name}</strong>. Your application has been queued for field verification. Our field coordinator will reach out to you via <strong className="text-slate-900 font-mono">{mobile}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAFDE6] border border-amber-300 text-xs text-slate-700 max-w-md mx-auto space-y-2">
                <p className="font-semibold text-[#0A2E0F]">
                  Have supporting documents, medical diagnosis, or photos?
                </p>
                <a
                  href={`https://wa.me/${primaryPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                    `Assalamu Alaikum Sadaqah Africa Field Committee, I have submitted Aid Request ${submittedRef} for ${name}. Here are my supporting medical/residence documents.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Documents via WhatsApp</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-sm">
              {/* Individual vs Organization */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setApplicantType('Individual')}
                  className={`py-3.5 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all ${
                    applicantType === 'Individual'
                      ? 'bg-[#114A18] text-white border-[#114A18] shadow-xs'
                      : 'bg-[#FAF7F0] text-slate-700 border-slate-200'
                  }`}
                >
                  Individual / Family
                </button>
                <button
                  type="button"
                  onClick={() => setApplicantType('Organization')}
                  className={`py-3.5 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all ${
                    applicantType === 'Organization'
                      ? 'bg-[#114A18] text-white border-[#114A18] shadow-xs'
                      : 'bg-[#FAF7F0] text-slate-700 border-slate-200'
                  }`}
                >
                  Community / Madrasa / Group
                </button>
              </div>

              {/* Name & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Applicant or Leader Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl bg-[#FAF7F0] border border-slate-200 p-3.5 focus:border-[#114A18] outline-hidden"
                />
                <input
                  type="email"
                  placeholder="Email Address (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl bg-[#FAF7F0] border border-slate-200 p-3.5 focus:border-[#114A18] outline-hidden"
                />
              </div>

              {/* Mobile & Physical Address */}
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  required
                  placeholder="Mobile Contact Number *"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="rounded-xl bg-[#FAF7F0] border border-slate-200 p-3.5 focus:border-[#114A18] outline-hidden"
                />
                <input
                  type="text"
                  required
                  placeholder="Village / Town / Address *"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="rounded-xl bg-[#FAF7F0] border border-slate-200 p-3.5 focus:border-[#114A18] outline-hidden"
                />
              </div>

              {/* Sub-county & District */}
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Sub-County or Zone *"
                  value={subcounty}
                  onChange={(e) => setSubcounty(e.target.value)}
                  className="rounded-xl bg-[#FAF7F0] border border-slate-200 p-3.5 focus:border-[#114A18] outline-hidden"
                />
                <input
                  type="text"
                  required
                  placeholder="District (e.g. Mukono, Wakiso, Masaka) *"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="rounded-xl bg-[#FAF7F0] border border-slate-200 p-3.5 focus:border-[#114A18] outline-hidden"
                />
              </div>

              {/* Category of Aid */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">
                  Category of Relief Needed *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['Product', 'Cash Aid', 'Medical', 'Shelter'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                        category === cat
                          ? 'bg-[#114A18] text-white border-[#114A18]'
                          : 'bg-[#FAF7F0] text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {cat === 'Product' ? 'Food & Kits' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Beneficiaries Count */}
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1">
                  How many people will directly benefit? *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={beneficiaries}
                  onChange={(e) => setBeneficiaries(Number(e.target.value))}
                  className="w-full rounded-xl bg-[#FAF7F0] border border-slate-200 p-3.5 focus:border-[#114A18] outline-hidden"
                />
              </div>

              {/* Explanation Textarea */}
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1">
                  Please describe the hardship and why urgent support is needed *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain the background, family situation, medical crisis, or water shortage in detail..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-xl bg-[#FAF7F0] border border-slate-200 p-3.5 focus:border-[#114A18] outline-hidden text-sm"
                />
              </div>

              {/* Document upload simulation */}
              <div className="p-4 rounded-xl bg-[#FAF7F0] border-2 border-dashed border-slate-300 space-y-1 text-center">
                <FileText className="w-6 h-6 text-slate-400 mx-auto" />
                <span className="text-xs font-bold text-slate-700 block">
                  Attach Medical Reports, Letters, or Photos (optional)
                </span>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                  className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#114A18] file:text-white"
                />
                {fileName && <p className="text-xs text-emerald-700 font-bold">Selected: {fileName}</p>}
                <p className="text-[0.65rem] text-slate-400">
                  Documents are safely archived. You can also send them directly via WhatsApp after submitting.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#114A18] to-[#165B1E] hover:from-[#0A2E0F] hover:to-[#114A18] text-white font-extrabold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Aid Request to Field Committee</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
