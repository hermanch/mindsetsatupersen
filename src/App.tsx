import React, { useState, useEffect } from 'react';
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
import { AdminLoginModal } from './components/AdminLoginModal';
import { CmsAdminModal } from './components/CmsAdminModal';
import { User, Video, PremiumCourse, RegisteredMember, ChannelStats } from './types';
import { FREE_VIDEOS, PREMIUM_COURSES, CHANNEL_STATS, INITIAL_MEMBERS } from './data/mockData';
import { CheckCircle2, Sparkles, X, ShieldCheck } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem('msp_auth_user');
      return saved ? JSON.parse(saved) : { isLoggedIn: false, name: '', email: '' };
    } catch {
      return { isLoggedIn: false, name: '', email: '' };
    }
  });

  // CMS Admin Login state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('msp_admin_logged_in') === 'true';
  });

  // CMS Data states with LocalStorage persistence
  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem('msp_videos');
    return saved ? JSON.parse(saved) : FREE_VIDEOS;
  });

  const [courses, setCourses] = useState<PremiumCourse[]>(() => {
    const saved = localStorage.getItem('msp_courses');
    return saved ? JSON.parse(saved) : PREMIUM_COURSES;
  });

  const [members, setMembers] = useState<RegisteredMember[]>(() => {
    const saved = localStorage.getItem('msp_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [stats, setStats] = useState<ChannelStats>(() => {
    const saved = localStorage.getItem('msp_stats');
    return saved ? JSON.parse(saved) : CHANNEL_STATS;
  });

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState<boolean>(false);
  const [isCmsModalOpen, setIsCmsModalOpen] = useState<boolean>(false);

  const [selectedCourseTitle, setSelectedCourseTitle] = useState<string | undefined>(undefined);
  const [activeVideoModal, setActiveVideoModal] = useState<Video | PremiumCourse | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('msp_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('msp_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('msp_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('msp_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('msp_admin_logged_in', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Sync user authentication to localStorage
  useEffect(() => {
    if (user.isLoggedIn) {
      localStorage.setItem('msp_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('msp_auth_user');
    }
  }, [user]);

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

  const handleMemberRegistered = (newMember: RegisteredMember) => {
    setMembers(prev => [newMember, ...prev.filter(m => m.id !== newMember.id)]);
  };

  const handleLogout = () => {
    setUser({ isLoggedIn: false, name: '', email: '' });
    showToast('Kamu telah keluar dari Member Area.');
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsCmsModalOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setIsCmsModalOpen(false);
    showToast('Keluar dari Mode Admin CMS.');
  };

  const handleResetToDefault = () => {
    if (confirm('Apakah Anda ingin mengembalikan seluruh data CMS ke kondisi default bawaan?')) {
      setVideos(FREE_VIDEOS);
      setCourses(PREMIUM_COURSES);
      setMembers(INITIAL_MEMBERS);
      setStats(CHANNEL_STATS);
      localStorage.removeItem('msp_videos');
      localStorage.removeItem('msp_courses');
      localStorage.removeItem('msp_members');
      localStorage.removeItem('msp_stats');
      showToast('Data CMS berhasil direset ke kondisi default!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#FF2B2B] selection:text-white relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-slide-in max-w-sm sm:max-w-md">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold leading-relaxed">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating CMS Status Banner for Admin */}
      {isAdminLoggedIn && (
        <div className="bg-slate-950 text-white px-4 py-1.5 text-xs font-bold flex items-center justify-between border-b border-slate-800 z-50">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <span className="flex items-center gap-1.5 text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              Mode Pengelola CMS Aktif
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCmsModalOpen(true)}
                className="px-2.5 py-0.5 bg-[#FF2B2B] hover:bg-[#D91D1D] text-white rounded text-[11px] cursor-pointer"
              >
                Buka Panel CMS
              </button>
              <button
                onClick={handleAdminLogout}
                className="text-slate-400 hover:text-red-400 text-[11px]"
              >
                Keluar Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Header / Navbar */}
      <Navbar
        user={user}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAuthModal={() => handleOpenAuthModal()}
        onOpenAdminLoginModal={() => setIsAdminLoginModalOpen(true)}
        onOpenCmsModal={() => setIsCmsModalOpen(true)}
        onLogout={handleLogout}
        onAdminLogout={handleAdminLogout}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero stats={stats} />

        {/* 3. About Section (Tentang Channel) */}
        <AboutSection />

        {/* Topik Edukasi YouTube Videos */}
        <TopicsSection
          videos={videos}
          onSelectVideo={(video) => setActiveVideoModal(video)}
        />

        {/* Kalkulator Mindset 1% */}
        <CalculatorSection />

        {/* 4. Premium Member Area (Gated Content Section) */}
        <PremiumMemberSection
          user={user}
          courses={courses}
          onOpenJoinModal={(title) => handleOpenAuthModal(title)}
          onPreviewCourse={(course) => setActiveVideoModal(course)}
        />

        {/* Testimonials */}
        <TestimonialSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* 5. Footer */}
      <Footer
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLoginModal={() => setIsAdminLoginModalOpen(true)}
        onOpenCmsModal={() => setIsCmsModalOpen(true)}
      />

      {/* Member Auth Modal */}
      <MemberModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onMemberRegistered={handleMemberRegistered}
        initialCourseTitle={selectedCourseTitle}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onAdminLoginSuccess={handleAdminLoginSuccess}
        onShowToast={showToast}
      />

      {/* Admin CMS Modal */}
      <CmsAdminModal
        isOpen={isCmsModalOpen}
        onClose={() => setIsCmsModalOpen(false)}
        videos={videos}
        setVideos={setVideos}
        courses={courses}
        setCourses={setCourses}
        members={members}
        setMembers={setMembers}
        stats={stats}
        setStats={setStats}
        onResetToDefault={handleResetToDefault}
        onShowToast={showToast}
      />

      {/* Video Preview Modal */}
      <VideoModal
        video={activeVideoModal}
        onClose={() => setActiveVideoModal(null)}
      />

    </div>
  );
}
