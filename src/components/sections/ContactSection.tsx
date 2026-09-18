import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  Loader2,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Business Management');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append('access_key', 'f9990d66-e435-4c8c-a8a4-6268f35a44eb');
      formData.append('subject', `🚀 ADDIMS Project Inquiry: ${name} (${projectType})`);
      formData.append('from_name', name);
      formData.append('Name', name);
      formData.append('Phone Number', phone);
      formData.append('Email Address', email);
      formData.append('Solution Type', projectType);
      formData.append('Project Scope / Details', message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setTimeout(() => {
          setSubmitted(false);
        }, 6000);
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Failed to send inquiry. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative pt-12 pb-16 sm:pt-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 select-none scroll-mt-20"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/4 -right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-10 w-96 h-96 bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* --- SECTION HEADER --- */}
      <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-12 select-none">
        {/* Clean Eyebrow Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[10.5px] font-mono font-bold uppercase tracking-widest mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>DIRECT INQUIRY & DISCOVERY</span>
        </div>

        {/* 3D Main Heading */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-wider uppercase text-slate-950 px-4"
          style={{
            letterSpacing: '0.06em',
            textShadow:
              '0 1px 0 #94a3b8, 0 2px 0 #64748b, 0 3px 0 #475569, 0 4px 0 #334155, 0 6px 14px rgba(15, 23, 42, 0.45)',
          }}
        >
          START YOUR PROJECT
        </h2>

        <p className="mt-2 text-black text-xs sm:text-sm font-extrabold tracking-wide max-w-md">
          Have an idea or looking to build a high-performance system for your business? Connect directly with us.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* --- LEFT COLUMN: DIRECT CONTACT INFO & CHANNELS --- */}
        <div className="lg:col-span-4 space-y-4">
          {/* Main Direct Lines Card */}
          <div className="rounded-3xl bg-white p-5 sm:p-6 border border-purple-200 hover:border-purple-400 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3">
            <div>
              <h3 className="text-base sm:text-lg font-black font-display tracking-wide text-black uppercase mb-0.5">
                Direct Communication
              </h3>
              <p className="text-xs text-black font-bold">
                Reach out directly via call, WhatsApp, or official email.
              </p>
            </div>

            {/* Direct Phone 1 */}
            <a
              href="tel:+919250710533"
              className="group flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9.5px] font-mono text-black uppercase font-black block">
                  Direct Line (Primary)
                </span>
                <span className="text-xs sm:text-[13px] font-black font-mono text-black group-hover:text-purple-700 transition-colors">
                  +91 9250710533
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all" />
            </a>

            {/* Direct Phone 2 */}
            <a
              href="tel:+917275017745"
              className="group flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-orange-300 hover:bg-orange-50/40 transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF6900] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9.5px] font-mono text-black uppercase font-black block">
                  Engineering & Strategy
                </span>
                <span className="text-xs sm:text-[13px] font-black font-mono text-black group-hover:text-purple-700 transition-colors">
                  +91 7275017745
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF6900] group-hover:translate-x-0.5 transition-all" />
            </a>

            {/* Official Email */}
            <a
              href="mailto:msproject9918@gmail.com"
              className="group flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9.5px] font-mono text-black uppercase font-black block">
                  Official Email Inbox
                </span>
                <span className="text-xs sm:text-[13px] font-black font-mono text-black group-hover:text-blue-600 transition-colors truncate block">
                  msproject9918@gmail.com
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </a>

            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/919250710533?text=Hi%20ADDIMS%20team,%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/90 border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-100/60 transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9.5px] font-mono text-black uppercase font-black block">
                  WhatsApp Direct Chat
                </span>
                <span className="text-xs sm:text-[13px] font-black text-black group-hover:text-emerald-700 transition-colors">
                  Chat with Engineering Lead ↗
                </span>
              </div>
            </a>
          </div>

          {/* Location & Availability Micro-Card */}
          <div className="rounded-2xl bg-white p-3.5 sm:p-4 border border-purple-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between text-[11px] font-mono text-black font-black">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>Response: &lt; 2 Hours</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FF6900]" />
              <span>India • Global Remote</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: INTERACTIVE INQUIRY FORM WITH 3D MASCOT --- */}
        <div className="lg:col-span-8 flex items-start justify-start relative">
          {/* Form Card Container */}
          <div className="relative w-full max-w-[540px]">
            {/* 3D Mascot Character Standing Straight Upright beside Form */}
            <div className="hidden lg:block absolute bottom-0 -right-[145px] xl:-right-[175px] h-[430px] xl:h-[470px] w-auto z-30 pointer-events-none select-none">
              <div className="relative h-full">
                <img
                  src="/assets/mascot_contact_formal_straight.png"
                  alt="ADDIMS Mascot"
                  className="h-full w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)]"
                />
              </div>
            </div>

            <div className="relative z-10 rounded-3xl bg-white p-5 sm:p-7 border border-purple-200 hover:border-purple-400 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <div className="mb-5 pb-3.5 border-b border-slate-100">
                <h3 className="text-base sm:text-lg font-black font-display tracking-wide text-black uppercase mb-0.5">
                  Send Project Inquiry
                </h3>
                <p className="text-xs text-black font-bold">
                  Fill out the project scope and we will prepare a tailored technological roadmap and estimate.
                </p>
              </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-black font-display text-black">
                  Inquiry Received!
                </h4>
                <p className="text-xs font-mono text-black font-black max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Our engineering team will connect with you via email/phone shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Your Name */}
                  <div>
                    <label className="text-[10.5px] font-mono text-black uppercase font-black block mb-1">
                      Your Name <span className="text-purple-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/60 border-2 border-slate-300/90 hover:border-purple-400 text-xs sm:text-[13.5px] font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-3 focus:ring-purple-100 transition-all shadow-xs"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="text-[10.5px] font-mono text-black uppercase font-black block mb-1">
                      Phone Number <span className="text-purple-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/60 border-2 border-slate-300/90 hover:border-purple-400 text-xs sm:text-[13.5px] font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-3 focus:ring-purple-100 transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Email Address */}
                  <div>
                    <label className="text-[10.5px] font-mono text-black uppercase font-black block mb-1">
                      Email Address <span className="text-purple-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/60 border-2 border-slate-300/90 hover:border-purple-400 text-xs sm:text-[13.5px] font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-3 focus:ring-purple-100 transition-all shadow-xs"
                    />
                  </div>

                  {/* Project Category */}
                  <div>
                    <label className="text-[10.5px] font-mono text-black uppercase font-black block mb-1">
                      Solution Type
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/60 border-2 border-slate-300/90 hover:border-purple-400 text-xs sm:text-[13.5px] font-black text-slate-900 focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-3 focus:ring-purple-100 transition-all cursor-pointer shadow-xs"
                    >
                      <option value="Business Management">Business Management CRM / ERP</option>
                      <option value="Healthcare Systems">Healthcare & Clinic Telemetry</option>
                      <option value="Hotel Management">Hotel & Booking OS</option>
                      <option value="Restaurant & Billing">Restaurant Cloud POS & Billing</option>
                      <option value="AI & Intelligent Systems">Autonomous AI Agents</option>
                      <option value="Web & Digital Solutions">High-Performance Web Platform</option>
                      <option value="Custom Software">Bespoke Software Architecture</option>
                    </select>
                  </div>
                </div>

                {/* Project Message */}
                <div>
                  <label className="text-[10.5px] font-mono text-black uppercase font-black block mb-1">
                    Project Scope / Details <span className="text-purple-600">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/60 border-2 border-slate-300/90 hover:border-purple-400 text-xs sm:text-[13.5px] font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-3 focus:ring-purple-100 transition-all resize-none shadow-xs"
                  />
                </div>

                {/* Error Message Alert */}
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-mono font-bold">
                    {errorMsg}
                  </div>
                )}

                {/* Submit Button: Slim Ultra-Premium Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative group/btn w-full h-11 px-5 rounded-xl bg-slate-950 hover:bg-black disabled:bg-slate-800 text-white border border-slate-800 hover:border-purple-400/80 shadow-xs hover:shadow-[0_4px_18px_rgba(168,85,247,0.25)] transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed active:scale-[0.99]"
                >
                  {/* Subtle Shimmer Light Sweep on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                      <span className="relative z-10 text-xs sm:text-[13px] font-mono font-bold tracking-[0.2em] uppercase text-white">
                        SENDING...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10 text-xs sm:text-[13px] font-mono font-bold tracking-[0.2em] uppercase text-white group-hover/btn:text-purple-300 transition-colors">
                        SUBMIT
                      </span>
                      <Send className="relative z-10 w-3.5 h-3.5 text-purple-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all duration-300" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
