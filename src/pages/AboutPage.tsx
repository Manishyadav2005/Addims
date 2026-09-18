import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AboutAddimsSection } from '../components/sections/AboutAddimsSection';
import { FounderSection } from '../components/sections/FounderSection';
import { ProjectModal } from '../components/modals/ProjectModal';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-slate-900 relative selection:bg-purple-600 selection:text-white">
      {/* Background Ambient Radial Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 pt-28 pb-12 select-none">
        {/* Navigation Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-600 hover:text-purple-700 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-purple-600" />
            <span>RETURN TO HOME</span>
          </button>
        </div>

        {/* About Section Core */}
        <AboutAddimsSection
          onStartProject={() => setIsModalOpen(true)}
          onExploreWork={() => navigate('/showcase')}
        />

        {/* Founder Section */}
        <FounderSection />
      </div>

      {/* Project Initiation Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
