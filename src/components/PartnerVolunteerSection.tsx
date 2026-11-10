import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';

interface PartnerVolunteerSectionProps {
  primaryPhone: string;
}

export const PartnerVolunteerSection: React.FC<PartnerVolunteerSectionProps> = ({
  primaryPhone,
}) => {
  const [role, setRole] = useState('Volunteer');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [area, setArea] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <section id="vision" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="rounded-[2.5rem] bg-gradient-to-br from-[#FAFDE6] via-white to-[#F3F9C4]/70 border border-amber-300/80 p-6 sm:p-10 lg:p-12 shadow-xl grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Strategic Vision */}
        <div className="lg:col-span-7 space-y-5">
          <p className="font-arabic text-[#114A18] text-lg sm:text-xl font-medium tracking-wide">
            وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ
          </p>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#0A2E0F] text-xs font-bold uppercase tracking-wider font-mono">
            <HeartHandshake className="w-3.5 h-3.5 text-[#114A18]" />
            <span>Partnership &amp; Ground Alliances</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2E0F] leading-tight tracking-tight">
            Amplifying Impact Together, <span className="italic text-[#165B1E] font-normal">One Problem at a Time</span>
          </h2>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            We actively collaborate with fellow humanitarian non-profits, healthcare providers, local community councils, and civic leaders. Our volunteers bring practical skills, medical expertise, logistics know-how, and genuine compassion to every village mission.
          </p>

          <p className="font-editorial font-bold text-lg sm:text-xl text-[#0A2E0F] leading-snug">
            With the steadfast dedication of our volunteers and institutional partners, we create permanent, self-sustaining relief and forge a more just, equitable future for all.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs">
              <span className="font-editorial font-black text-2xl sm:text-3xl text-[#0A2E0F] block">85+</span>
              <span className="text-[0.65rem] font-bold uppercase text-slate-500 font-mono">Active Volunteers</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs">
              <span className="font-editorial font-black text-2xl sm:text-3xl text-[#0A2E0F] block">9</span>
              <span className="text-[0.65rem] font-bold uppercase text-slate-500 font-mono">Partner NGOs</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs">
              <span className="font-editorial font-black text-2xl sm:text-3xl text-[#0A2E0F] block">13</span>
              <span className="text-[0.65rem] font-bold uppercase text-slate-500 font-mono">Districts Served</span>
            </div>
          </div>
        </div>

        {/* Right Side: Fast Registration Form */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0A2E0F] via-[#114A18] to-[#165B1E] rounded-3xl p-6 sm:p-8 space-y-4 text-white border border-amber-300/40 shadow-xl">
          <div className="space-y-1">
            <h3 className="font-editorial font-extrabold text-2xl text-[#F2AE2E]">
              Join as Partner or Volunteer
            </h3>
            <p className="text-xs text-emerald-100">
              Register to contribute medical skills, water drilling engineering, logistics, or field outreach.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-5 rounded-2xl bg-white/10 border border-white/20 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#D8EC6E] mx-auto" />
              <h4 className="font-serif font-bold text-lg text-white">Application Received</h4>
              <p className="text-xs text-emerald-100">
                JazakAllahu khayran, {name}! Our volunteer coordinator will reach out to you on {contact} shortly.
              </p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="text-xs text-[#F2AE2E] underline font-bold"
              >
                Register another person
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="text-[0.65rem] uppercase font-bold text-emerald-200 block mb-1">
                  Your Intended Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl bg-[#0A2E0F] border border-emerald-600 text-white font-semibold px-3 py-2.5 text-xs outline-hidden"
                >
                  <option value="Volunteer">Individual Field Volunteer</option>
                  <option value="Medical Specialist">Medical / Surgical Volunteer</option>
                  <option value="Engineer">Water Borehole Engineer / Technician</option>
                  <option value="Partner NGO">Partner Non-Profit / NGO</option>
                  <option value="Community Leader">Local Community Authority / Mosque</option>
                </select>
              </div>

              <div>
                <label className="text-[0.65rem] uppercase font-bold text-emerald-200 block mb-1">
                  Name or Organization *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name or Group"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-white text-slate-900 px-3.5 py-2.5 outline-hidden"
                />
              </div>

              <div>
                <label className="text-[0.65rem] uppercase font-bold text-emerald-200 block mb-1">
                  WhatsApp Contact or Email *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+256 ... or email address"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full rounded-xl bg-white text-slate-900 px-3.5 py-2.5 outline-hidden"
                />
              </div>

              <div>
                <label className="text-[0.65rem] uppercase font-bold text-emerald-200 block mb-1">
                  Area of Support or Field Skills *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nursing, borehole maintenance, driving"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full rounded-xl bg-white text-slate-900 px-3.5 py-2.5 outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#E59A14] hover:bg-[#F2AE2E] text-[#0A2E0F] font-black text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <span>Connect With Our Field Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
