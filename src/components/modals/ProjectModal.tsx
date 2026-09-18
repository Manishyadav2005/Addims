import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Send,
  CheckCircle2,
  ChevronDown,
  Layers,
  Phone,
  Mail,
  User,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICE_OPTIONS = [
  'Business Management (CRM / ERP / Operations)',
  'School Website & Campus ERP Software',
  'Healthcare & Hospital Management Systems',
  'Hotel & Hospitality Booking Systems',
  'Restaurant POS, Billing & Kitchen Display',
  'AI & Intelligent Automation (Agents, LLMs, Chatbots)',
  'Web & High-Performance Digital Platforms',
  'Mobile Application Development (iOS / Android)',
  'Custom Enterprise Architecture & Cloud Software',
  'Others / Custom Requirement',
];

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const [selectedService, setSelectedService] = useState(SERVICE_OPTIONS[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('access_key', 'f9990d66-e435-4c8c-a8a4-6268f35a44eb');
      formData.append('subject', `⚡ Launch Project Inquiry: ${name} (${phone}) - ${selectedService}`);
      formData.append('from_name', name);
      formData.append('Name', name);
      formData.append('Mobile Number', phone);
      formData.append('Email', email.trim() || 'Not Provided');
      formData.append('Service Requirement', selectedService);
      formData.append('Project Brief', description.trim() || 'No Brief Provided');

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      setSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7C3AED', '#9333EA', '#A855F7'],
      });

      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setPhone('');
        setEmail('');
        setDescription('');
        setSelectedService(SERVICE_OPTIONS[0]);
        onClose();
      }, 3500);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Subtle Glows */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-purple-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-500/5 via-purple-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3 relative z-10">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-slate-900">
              Specification Transmitted
            </h3>
            <p className="text-sm font-medium text-slate-700 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-slate-900 font-bold">{name || 'Partner'}</span>. Our engineering team has received your project request and will contact you directly at <span className="text-purple-700 font-bold">{phone}</span> within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold uppercase tracking-wider text-slate-900 transition-all cursor-pointer shadow-xs"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div className="relative z-10">
            {/* Direct Project Initiation Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
              <span className="text-xs font-bold tracking-wider uppercase">Direct Project Initiation</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 uppercase tracking-tight leading-snug">
              Launch Your Next Digital Architecture
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5 mb-5 font-medium leading-relaxed">
              Select your required service below and share your details to get started.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Scope Dropdown */}
              <div>
                <label className="text-xs font-bold text-slate-900 tracking-wider uppercase block mb-1.5">
                  Select Service / Requirement
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-600">
                    <Layers className="w-4 h-4" />
                  </div>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 hover:border-slate-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-500/15 text-sm font-semibold text-slate-900 cursor-pointer appearance-none transition-all outline-none shadow-xs"
                  >
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option} className="py-2 text-slate-900 font-medium">
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Mandatory Fields: Name & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-900 tracking-wider uppercase block mb-1.5">
                    Your Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Manish Yadav"
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 hover:border-slate-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-500/15 text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal transition-all outline-none shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-900 tracking-wider uppercase block mb-1.5">
                    Mobile Number <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 hover:border-slate-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-500/15 text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal transition-all outline-none shadow-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Optional Field: Email Address */}
              <div>
                <label className="text-xs font-bold text-slate-900 tracking-wider uppercase block mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@company.com"
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 hover:border-slate-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-500/15 text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal transition-all outline-none shadow-xs"
                  />
                </div>
              </div>

              {/* Optional Field: Project Brief & Objectives */}
              <div>
                <label className="text-xs font-bold text-slate-900 tracking-wider uppercase block mb-1.5">
                  Project Brief & Objectives
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Outline key business goals, target timelines, or architectural requirements..."
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 hover:border-slate-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-500/15 text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal transition-all outline-none resize-none leading-relaxed shadow-xs"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-400 active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(147,51,234,0.35)] hover:shadow-[0_6px_25px_rgba(6,182,212,0.45)] disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer group border border-white/20"
              >
                <span>{loading ? 'TRANSMITTING SPECIFICATION...' : 'TRANSMIT SPECIFICATION'}</span>
                <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};