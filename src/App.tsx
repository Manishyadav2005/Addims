import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { CinematicVideoHero } from './components/hero/CinematicVideoHero';
import { WhatWeBuildSection } from './components/sections/WhatWeBuildSection';
import { BuiltByAddimsSection } from './components/sections/BuiltByAddimsSection';
import { AboutAddimsSection } from './components/sections/AboutAddimsSection';
import { FounderSection } from './components/sections/FounderSection';
import { ContactSection } from './components/sections/ContactSection';
import { ProjectModal } from './components/modals/ProjectModal';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloatingButton } from './components/common/WhatsAppFloatingButton';
import { scrollToSection, scrollToTop } from './utils/scrollUtils';

// Public Pages
import { ShowcasePage } from './pages/ShowcasePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';

// Admin Area
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminProjectFormPage } from './pages/admin/AdminProjectFormPage';
import { AdminSocialLinksPage } from './pages/admin/AdminSocialLinksPage';

// Hash and Anchor Auto-Scroll Handler
function ScrollToHashHandler() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        if (sectionId === 'hero') {
          scrollToTop();
        } else {
          scrollToSection(sectionId, 80);
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  return null;
}

// Homepage Component
function HomePage() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleExploreWork = useCallback(() => {
    navigate('/showcase');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-slate-900 relative overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar onStartProject={() => setIsProjectModalOpen(true)} />

      {/* Full-Screen Pure Cinematic Video Hero (Preserved Dark & Cinematic - No Grid) */}
      <section id="hero" className="relative w-full h-[100dvh] min-h-[500px] sm:min-h-[720px] max-h-[1080px] overflow-hidden select-none bg-[#03060E]">
        <CinematicVideoHero
          onStartProject={() => setIsProjectModalOpen(true)}
          onExploreWork={handleExploreWork}
        />
      </section>

      {/* Main Content Sections & Footer with Subtle Technical Blueprint Grid */}
      <div className="relative bg-[#F8F7F4] technical-blueprint-grid">
        {/* Background Ambient Soft Purple & Violet Radial Glow for Off-White Theme */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-purple-600/5 rounded-full blur-[160px]" />
          <div className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-violet-600/5 rounded-full blur-[180px]" />
          <div className="absolute bottom-10 left-1/3 w-[750px] h-[750px] bg-indigo-600/5 rounded-full blur-[200px]" />
        </div>

        {/* Main Content Sections */}
        <main className="relative z-10 space-y-4">
          {/* Section 1: Engineered For Business */}
          <WhatWeBuildSection />

          {/* Section 2: Built By ADDIMS (Top 3 Latest Projects Showcase) */}
          <BuiltByAddimsSection />

          {/* Section 3: About ADDIMS — Editorial Identity & Purpose */}
          <AboutAddimsSection
            onStartProject={() => setIsProjectModalOpen(true)}
            onExploreWork={handleExploreWork}
          />

          {/* Section 4: Founder's Message & Core Values */}
          <FounderSection />

          {/* Section 5: Direct Lines & Project Inquiry Form */}
          <ContactSection />
        </main>

        {/* Global Brand Footer */}
        <Footer onStartProject={() => setIsProjectModalOpen(true)} />
      </div>

      {/* Project Initiation Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  );
}

// Public Page Shell Wrapper for consistent Navbar + Footer + Modal with Technical Blueprint Grid
function PublicPageWrapper({ children }: { children: React.ReactNode }) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F7F4] technical-blueprint-grid text-slate-900 relative overflow-x-hidden selection:bg-purple-600 selection:text-white flex flex-col justify-between">
      <Navbar onStartProject={() => setIsProjectModalOpen(true)} />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer onStartProject={() => setIsProjectModalOpen(true)} />
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToHashHandler />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/about"
            element={
              <PublicPageWrapper>
                <AboutPage />
              </PublicPageWrapper>
            }
          />
          <Route
            path="/showcase"
            element={
              <PublicPageWrapper>
                <ShowcasePage />
              </PublicPageWrapper>
            }
          />
          <Route
            path="/projects"
            element={
              <PublicPageWrapper>
                <ShowcasePage />
              </PublicPageWrapper>
            }
          />
          <Route
            path="/showcase/:slug"
            element={
              <PublicPageWrapper>
                <ProjectDetailPage />
              </PublicPageWrapper>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <PublicPageWrapper>
                <ProjectDetailPage />
              </PublicPageWrapper>
            }
          />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Studio */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="projects" element={<AdminProjectsPage />} />
              <Route path="projects/new" element={<AdminProjectFormPage />} />
              <Route path="projects/edit/:id" element={<AdminProjectFormPage />} />
              <Route path="social-links" element={<AdminSocialLinksPage />} />
            </Route>
          </Route>
        </Routes>

        {/* Global Floating Direct WhatsApp Button */}
        <WhatsAppFloatingButton />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
