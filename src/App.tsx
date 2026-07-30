import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TopicsSection } from './components/TopicsSection';
import { CalculatorSection } from './components/CalculatorSection';
import { PremiumMemberSection } from './components/PremiumMemberSection';
import { TestimonialSection } from './components/TestimonialSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MemberModal } from './components/MemberModal';
import { VideoModal } from './components/VideoModal';
import { User, Video, PremiumCourse } from './types';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User>({
    isLoggedIn: false,
    name: '',
    email: ''
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState<string | undefined>(undefined);
  const [activeVideoModal, setActiveVideoModal] = useState<Video | PremiumCourse | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleOpenAuthModal = (courseTitle?: string) => {
    setSelectedCourseTitle(courseTitle);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (newUser: User) => {
    setUser(newUser);
    showToast(`Selamat datang ${newUser.name}! Seluruh Video Course Premium kini dapat diakses.`);
  };

  const handleLogout = () => {
    setUser({ isLoggedIn: false, name: '', email: '' });
    showToast('Kamu telah keluar dari Member Area.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#FF2B2B] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-slide-in">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. Header / Navbar */}
      <Navbar
        user={user}
        onOpenAuthModal={() => handleOpenAuthModal()}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. About Section (Tentang Channel) */}
        <AboutSection />

        {/* Topik Edukasi YouTube Videos */}
        <TopicsSection
          onSelectVideo={(video) => setActiveVideoModal(video)}
        />

        {/* Kalkulator Mindset 1% */}
        <CalculatorSection />

        {/* 4. Premium Member Area (Gated Content Section) */}
        <PremiumMemberSection
          user={user}
          onOpenJoinModal={(title) => handleOpenAuthModal(title)}
          onPreviewCourse={(course) => setActiveVideoModal(course)}
        />

        {/* Testimonials */}
        <TestimonialSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* Member Auth Modal */}
      <MemberModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialCourseTitle={selectedCourseTitle}
      />

      {/* Video Preview Modal */}
      <VideoModal
        video={activeVideoModal}
        onClose={() => setActiveVideoModal(null)}
      />

    </div>
  );
}
