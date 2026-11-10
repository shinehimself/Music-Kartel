import React, { useState } from 'react';
import { X, Save, RotateCcw, Check, Trash2, Shield, AlertCircle } from 'lucide-react';
import { SiteSettings, AidRequest } from '../types/charity';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  onSaveSettings: (newSettings: SiteSettings) => void;
  aidRequests: AidRequest[];
  onUpdateAidRequestStatus: (id: string, newStatus: 'Pending' | 'Approved' | 'Reviewing') => void;
  onDeleteAidRequest: (id: string) => void;
  onResetDefaults: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  aidRequests,
  onUpdateAidRequestStatus,
  onDeleteAidRequest,
  onResetDefaults,
}) => {
  if (!isOpen) return null;

  const [form, setForm] = useState<SiteSettings>({ ...settings });
  const [activeTab, setActiveTab] = useState<'campaign' | 'requests'>('campaign');
  const [saveToast, setSaveToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(form);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A2E0F]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF7F0] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 border-2 border-[#E59A14] max-h-[90vh] overflow-y-auto my-8 relative">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-amber-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0A2E0F] text-[#F2AE2E] flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial font-bold text-2xl text-[#0A2E0F]">
                Admin Control Center
              </h3>
              <p className="text-[0.7rem] text-slate-500 font-mono">
                Configure the $50,000 Campaign parameters, ground metrics, and aid queue.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 bg-white border border-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex gap-2 border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('campaign')}
            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'campaign'
                ? 'bg-[#114A18] text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Campaign &amp; Metrics Settings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('requests')}
            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'requests'
                ? 'bg-[#114A18] text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Aid Requests Queue</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-200 text-[#0A2E0F] text-[0.65rem]">
              {aidRequests.length}
            </span>
          </button>
        </div>

        {activeTab === 'campaign' ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {/* Campaign Core Goal */}
            <div className="p-4 rounded-2xl bg-white border border-amber-300 space-y-3">
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#114A18] block">
                Primary $10 Campaign Targets
              </span>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="block space-y-1">
                  <span className="text-slate-600 font-semibold text-xs">Total Raised ($ USD)</span>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={form.raised}
                    onChange={(e) => setForm({ ...form, raised: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 bg-[#FAF7F0] font-bold text-base text-[#0A2E0F]"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="text-slate-600 font-semibold text-xs">Campaign Goal ($ USD)</span>
                  <input
                    type="number"
                    min="1000"
                    step="500"
                    value={form.goal}
                    onChange={(e) => setForm({ ...form, goal: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 bg-[#FAF7F0] font-bold text-base text-[#114A18]"
                  />
                </label>
              </div>
              <p className="text-[0.65rem] text-slate-500">
                Current progress: {Math.min(100, Math.round((form.raised / form.goal) * 100))}% toward the ${form.goal.toLocaleString()} goal.
              </p>
            </div>

            {/* Impact Metric Counts */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 block">
                Public Header &amp; Growth Impact Counts
              </span>
              <div className="grid sm:grid-cols-3 gap-3">
                <label className="block space-y-1">
                  <span className="text-slate-600 text-xs">Beneficiaries</span>
                  <input
                    type="text"
                    value={form.beneficiariesCount}
                    onChange={(e) => setForm({ ...form, beneficiariesCount: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 bg-[#FAF7F0] font-semibold text-xs"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="text-slate-600 text-xs">Boreholes &amp; Wells</span>
                  <input
                    type="text"
                    value={form.wellsCount}
                    onChange={(e) => setForm({ ...form, wellsCount: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 bg-[#FAF7F0] font-semibold text-xs"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="text-slate-600 text-xs">Food Packs</span>
                  <input
                    type="text"
                    value={form.foodPacksCount}
                    onChange={(e) => setForm({ ...form, foodPacksCount: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 bg-[#FAF7F0] font-semibold text-xs"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="text-slate-600 text-xs">Pad Kits &amp; Surgeries</span>
                  <input
                    type="text"
                    value={form.padsSurgeriesCount}
                    onChange={(e) => setForm({ ...form, padsSurgeriesCount: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 bg-[#FAF7F0] font-semibold text-xs"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="text-slate-600 text-xs">Volunteers / NGOs</span>
                  <input
                    type="text"
                    value={form.volunteersPartnersCount}
                    onChange={(e) => setForm({ ...form, volunteersPartnersCount: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 bg-[#FAF7F0] font-semibold text-xs"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="text-slate-600 text-xs">Online Donors</span>
                  <input
                    type="text"
                    value={form.onlineDonorsCount}
                    onChange={(e) => setForm({ ...form, onlineDonorsCount: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 bg-[#FAF7F0] font-semibold text-xs"
                  />
                </label>
              </div>
            </div>

            {/* Official Coordinates */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 block">
                Official Contacts &amp; UBA Wire Parameters
              </span>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="block space-y-1">
                  <span className="text-slate-600 text-xs">Primary WhatsApp</span>
                  <input
                    type="text"
                    value={form.primaryPhone}
                    onChange={(e) => setForm({ ...form, primaryPhone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 bg-[#FAF7F0] font-semibold text-xs"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="text-slate-600 text-xs">CEO WhatsApp</span>
                  <input
                    type="text"
                    value={form.ceoPhone}
                    onChange={(e) => setForm({ ...form, ceoPhone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 bg-[#FAF7F0] font-semibold text-xs"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="text-slate-600 text-xs">UBA Account Number</span>
                  <input
                    type="text"
                    value={form.accountNumber}
                    onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 bg-[#FAF7F0] font-semibold text-xs font-mono"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="text-slate-600 text-xs">SWIFT Code</span>
                  <input
                    type="text"
                    value={form.swiftCode}
                    onChange={(e) => setForm({ ...form, swiftCode: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 bg-[#FAF7F0] font-semibold text-xs font-mono"
                  />
                </label>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-xl bg-[#E59A14] hover:bg-[#F2AE2E] text-[#0A2E0F] font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save &amp; Publish Site Settings</span>
              </button>

              <button
                type="button"
                onClick={onResetDefaults}
                className="py-3.5 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset $50k Defaults</span>
              </button>
            </div>

            {saveToast && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Settings updated and reflected live across the application!</span>
              </div>
            )}
          </form>
        ) : (
          /* TAB 2: Aid Requests Queue */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">
                Received Aid Inquiries ({aidRequests.length})
              </span>
              <span className="text-[0.7rem] text-slate-400">
                Field Committee Weekly Roster
              </span>
            </div>

            {aidRequests.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No aid requests in queue.</p>
            ) : (
              <div className="space-y-3">
                {aidRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-[#0A2E0F]">
                        <span className="font-mono text-slate-600">{req.id}</span>
                        <span>· {req.name} ({req.type})</span>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[0.65rem] ${
                          req.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : req.status === 'Reviewing'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>

                    <div className="text-slate-600 space-y-0.5 text-[0.7rem]">
                      <p><strong>Mobile:</strong> {req.mobile} · <strong>Location:</strong> {req.address}, {req.district}</p>
                      <p><strong>Category:</strong> {req.category} · <strong>Beneficiaries:</strong> {req.beneficiariesCount}</p>
                      <p className="italic text-slate-700 pt-1">“{req.reason}”</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[0.7rem]">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => onUpdateAidRequestStatus(req.id, 'Approved')}
                          className="text-emerald-700 hover:underline font-bold"
                        >
                          Approve Aid
                        </button>
                        <span>·</span>
                        <button
                          type="button"
                          onClick={() => onUpdateAidRequestStatus(req.id, 'Reviewing')}
                          className="text-amber-700 hover:underline font-bold"
                        >
                          Mark Reviewing
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onDeleteAidRequest(req.id)}
                        className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
