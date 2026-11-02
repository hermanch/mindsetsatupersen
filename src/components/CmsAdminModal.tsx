import React, { useState, useEffect } from 'react';
import { Video, PremiumCourse, Testimonial, MemberPlan, RegisteredMember, ChannelStats } from '../types';
import {
  X, Plus, Edit2, Trash2, Video as VideoIcon, BookOpen, Users,
  BarChart3, Settings, Save, Check, Search, ShieldCheck, Sparkles, AlertCircle, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CmsAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  
  // Data state & setters
  videos: Video[];
  setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
  
  courses: PremiumCourse[];
  setCourses: React.Dispatch<React.SetStateAction<PremiumCourse[]>>;
  
  members: RegisteredMember[];
  setMembers: React.Dispatch<React.SetStateAction<RegisteredMember[]>>;

  stats: ChannelStats;
  setStats: React.Dispatch<React.SetStateAction<ChannelStats>>;

  onResetToDefault: () => void;
  onShowToast: (msg: string) => void;
}

export const CmsAdminModal: React.FC<CmsAdminModalProps> = ({
  isOpen,
  onClose,
  videos,
  setVideos,
  courses,
  setCourses,
  members,
  setMembers,
  stats,
  setStats,
  onResetToDefault,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'videos' | 'courses' | 'members'>('videos');
  
  // Video Form Modal / Edit state
  const [isEditingVideo, setIsEditingVideo] = useState<boolean>(false);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [videoForm, setVideoForm] = useState<Partial<Video>>({
    title: '',
    category: 'Atur Gaji',
    duration: '15:00',
    views: '100K x ditonton',
    uploadDate: 'Baru saja',
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    youtubeUrl: 'https://www.youtube.com/@mindsetsatupersen05',
    description: '',
    isPopular: false
  });

  // Course Form Modal / Edit state
  const [isEditingCourse, setIsEditingCourse] = useState<boolean>(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState<Partial<PremiumCourse>>({
    title: '',
    category: 'Keuangan Personal',
    duration: '2 Jam',
    level: 'Pemula',
    badge: 'Eksklusif Member',
    description: '',
    lessonsCount: 6,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    isLocked: true,
    instructor: 'Tim Mindset Satu Persen',
    rating: 4.9
  });

  // Member Form
  const [isEditingMember, setIsEditingMember] = useState<boolean>(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [memberForm, setMemberForm] = useState<Partial<RegisteredMember>>({
    name: '',
    email: '',
    memberTier: 'VIP',
    status: 'Aktif'
  });

  const [searchMember, setSearchMember] = useState('');
  const [searchVideo, setSearchVideo] = useState('');

  // Close on Escape & prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isEditingVideo) {
          setIsEditingVideo(false);
        } else if (isEditingCourse) {
          setIsEditingCourse(false);
        } else if (isEditingMember) {
          setIsEditingMember(false);
        } else if (isOpen) {
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, isEditingVideo, isEditingCourse, isEditingMember, onClose]);

  // --- VIDEO HANDLERS ---
  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.title || !videoForm.description) {
      alert('Mohon lengkapi judul dan deskripsi video');
      return;
    }

    if (editingVideoId) {
      setVideos(prev => prev.map(v => v.id === editingVideoId ? { ...v, ...videoForm } as Video : v));
      onShowToast('Video YouTube berhasil diperbarui!');
    } else {
      const newVideo: Video = {
        id: 'v-' + Date.now(),
        title: videoForm.title || 'Judul Video Baru',
        category: (videoForm.category as any) || 'Atur Gaji',
        duration: videoForm.duration || '12:00',
        views: videoForm.views || '1K x ditonton',
        uploadDate: videoForm.uploadDate || 'Baru saja',
        thumbnailUrl: videoForm.thumbnailUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        youtubeUrl: videoForm.youtubeUrl || 'https://www.youtube.com/@mindsetsatupersen05',
        description: videoForm.description || '',
        isPopular: !!videoForm.isPopular
      };
      setVideos(prev => [newVideo, ...prev]);
      onShowToast('Video YouTube baru berhasil ditambahkan ke CMS!');
    }

    setIsEditingVideo(false);
    setEditingVideoId(null);
  };

  const handleEditVideoClick = (video: Video) => {
    setVideoForm(video);
    setEditingVideoId(video.id);
    setIsEditingVideo(true);
  };

  const handleDeleteVideo = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus video ini dari website?')) {
      setVideos(prev => prev.filter(v => v.id !== id));
      onShowToast('Video berhasil dihapus.');
    }
  };

  // --- COURSE HANDLERS ---
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.description) {
      alert('Mohon isi judul dan deskripsi course');
      return;
    }

    if (editingCourseId) {
      setCourses(prev => prev.map(c => c.id === editingCourseId ? { ...c, ...courseForm } as PremiumCourse : c));
      onShowToast('Modul Course Premium berhasil diperbarui!');
    } else {
      const newCourse: PremiumCourse = {
        id: 'course-' + Date.now(),
        title: courseForm.title || 'Course Baru',
        category: courseForm.category || 'Keuangan Personal',
        duration: courseForm.duration || '2 Jam',
        level: (courseForm.level as any) || 'Pemula',
        badge: courseForm.badge || 'Eksklusif Member',
        description: courseForm.description || '',
        lessonsCount: Number(courseForm.lessonsCount) || 5,
        thumbnailUrl: courseForm.thumbnailUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        isLocked: courseForm.isLocked !== undefined ? courseForm.isLocked : true,
        instructor: courseForm.instructor || 'Tim MSP',
        rating: Number(courseForm.rating) || 4.9
      };
      setCourses(prev => [newCourse, ...prev]);
      onShowToast('Video Course Premium baru berhasil ditambahkan!');
    }

    setIsEditingCourse(false);
    setEditingCourseId(null);
  };

  const handleEditCourseClick = (course: PremiumCourse) => {
    setCourseForm(course);
    setEditingCourseId(course.id);
    setIsEditingCourse(true);
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('Hapus modul course premium ini dari Member Area?')) {
      setCourses(prev => prev.filter(c => c.id !== id));
      onShowToast('Course berhasil dihapus.');
    }
  };

  // --- MEMBER HANDLERS ---
  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name || !memberForm.email) return;

    if (editingMemberId) {
      setMembers(prev => prev.map(m => m.id === editingMemberId ? { ...m, ...memberForm } as RegisteredMember : m));
      onShowToast('Data member berhasil diperbarui.');
    } else {
      const newM: RegisteredMember = {
        id: 'm-' + Date.now(),
        name: memberForm.name || 'Member Baru',
        email: memberForm.email || 'user@mail.com',
        memberTier: (memberForm.memberTier as any) || 'VIP',
        joinDate: new Date().toISOString().split('T')[0],
        status: (memberForm.status as any) || 'Aktif'
      };
      setMembers(prev => [newM, ...prev]);
      onShowToast('Member baru berhasil didaftarkan secara manual!');
    }

    setIsEditingMember(false);
    setEditingMemberId(null);
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Hapus member dari database?')) {
      setMembers(prev => prev.filter(m => m.id !== id));
      onShowToast('Data member dihapus.');
    }
  };

  const toggleMemberStatus = (id: string) => {
    setMembers(prev => prev.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
        return { ...m, status: nextStatus };
      }
      return m;
    }));
    onShowToast('Status lisensi member diperbarui.');
  };

  // --- STATS HANDLERS ---
  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Statistik Channel YouTube berhasil disimpan!');
  };

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchMember.toLowerCase()) ||
    m.email.toLowerCase().includes(searchMember.toLowerCase())
  );

  const filteredVideosList = videos.filter(v =>
    v.title.toLowerCase().includes(searchVideo.toLowerCase()) ||
    v.category.toLowerCase().includes(searchVideo.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cms-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            key="cms-dialog"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 350, mass: 0.75 }}
            className="bg-slate-900 text-slate-100 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-800 my-auto"
          >
        
        {/* Header CMS */}
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF2B2B] text-white p-2 rounded-xl shadow-md">
              <Settings className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-white text-lg sm:text-xl">
                  Dashboard CMS & Admin Portal
                </h3>
                <span className="bg-red-500/20 text-[#FF2B2B] text-[10px] font-bold px-2 py-0.5 rounded-md border border-red-500/30">
                  Panel Pengelola Website
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Kelola Video YouTube, Course Premium, Member VIP, dan Statistik Channel Mindset Satu Persen
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetToDefault}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg border border-slate-700 transition-colors"
              title="Kembalikan data konten CMS ke setelan awal"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Data Awal
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 pt-3 flex gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'videos'
                ? 'bg-slate-800 text-[#FF2B2B] border-[#FF2B2B]'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <VideoIcon className="w-4 h-4" />
            Video Gratis YouTube ({videos.length})
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-slate-800 text-[#FF2B2B] border-[#FF2B2B]'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Premium Course Gated ({courses.length})
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'members'
                ? 'bg-slate-800 text-[#FF2B2B] border-[#FF2B2B]'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Users className="w-4 h-4" />
            Kelola Member ({members.length})
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'stats'
                ? 'bg-slate-800 text-[#FF2B2B] border-[#FF2B2B]'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Statistik Landing Page
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <AnimatePresence mode="wait">

          {/* TAB 1: KELOLA VIDEO YOUTUBE */}
          {activeTab === 'videos' && (
            <motion.div
              key="tab-videos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.16 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari video di CMS..."
                    value={searchVideo}
                    onChange={(e) => setSearchVideo(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#FF2B2B]"
                  />
                </div>

                <button
                  onClick={() => {
                    setVideoForm({
                      title: '',
                      category: 'Atur Gaji',
                      duration: '14:00',
                      views: '50K x ditonton',
                      uploadDate: 'Baru saja',
                      thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
                      youtubeUrl: 'https://www.youtube.com/@mindsetsatupersen05',
                      description: '',
                      isPopular: false
                    });
                    setEditingVideoId(null);
                    setIsEditingVideo(true);
                  }}
                  className="px-4 py-2 bg-[#FF2B2B] hover:bg-[#D91D1D] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Video YouTube Baru
                </button>
              </div>

              {/* Videos Table */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="p-4">Thumbnail & Judul</th>
                        <th className="p-4">Kategori</th>
                        <th className="p-4">Durasi</th>
                        <th className="p-4">Views</th>
                        <th className="p-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredVideosList.map((video) => (
                        <tr key={video.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="p-4 flex items-center gap-3 min-w-[280px]">
                            <img
                              src={video.thumbnailUrl}
                              alt={video.title}
                              className="w-16 h-10 object-cover rounded-lg border border-slate-800 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-white line-clamp-1">{video.title}</div>
                              <div className="text-[10px] text-slate-500 line-clamp-1">{video.description}</div>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-slate-400">
                            <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md text-[10px]">
                              {video.category}
                            </span>
                          </td>
                          <td className="p-4 text-slate-400 font-medium">{video.duration}</td>
                          <td className="p-4 text-slate-400">{video.views}</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEditVideoClick(video)}
                                className="p-2 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-lg transition-colors cursor-pointer"
                                title="Edit Video"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteVideo(video.id)}
                                className="p-2 bg-slate-800 hover:bg-red-950 text-red-400 rounded-lg transition-colors cursor-pointer"
                                title="Hapus Video"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: KELOLA PREMIUM COURSES */}
          {activeTab === 'courses' && (
            <motion.div
              key="tab-courses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.16 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center gap-4">
                <p className="text-xs text-slate-400">
                  Modul ini adalah gated content yang hanya terbuka ketika pengunjung sudah login sebagai Member VIP.
                </p>

                <button
                  onClick={() => {
                    setCourseForm({
                      title: '',
                      category: 'Keuangan Personal',
                      duration: '2 Jam',
                      level: 'Pemula',
                      badge: 'Eksklusif Member',
                      description: '',
                      lessonsCount: 6,
                      thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                      isLocked: true,
                      instructor: 'Tim Mindset Satu Persen',
                      rating: 4.9
                    });
                    setEditingCourseId(null);
                    setIsEditingCourse(true);
                  }}
                  className="px-4 py-2 bg-[#FF2B2B] hover:bg-[#D91D1D] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Modul Premium
                </button>
              </div>

              {/* Courses Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div key={course.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex gap-4 items-start">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-24 h-20 object-cover rounded-xl border border-slate-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] bg-red-950 text-red-300 font-bold px-2 py-0.5 rounded uppercase">
                          {course.badge}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleEditCourseClick(course)}
                            className="p-1.5 text-blue-400 hover:bg-slate-800 rounded-md"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="p-1.5 text-red-400 hover:bg-slate-800 rounded-md"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="font-bold text-white text-sm truncate">{course.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{course.description}</p>
                      
                      <div className="text-[10px] text-slate-500 flex items-center gap-3 pt-1">
                        <span>{course.lessonsCount} Modul</span>
                        <span>•</span>
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span>Rating {course.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: KELOLA MEMBER */}
          {activeTab === 'members' && (
            <motion.div
              key="tab-members"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.16 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari nama atau email member..."
                    value={searchMember}
                    onChange={(e) => setSearchMember(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#FF2B2B]"
                  />
                </div>

                <button
                  onClick={() => {
                    setMemberForm({
                      name: '',
                      email: '',
                      memberTier: 'VIP',
                      status: 'Aktif'
                    });
                    setEditingMemberId(null);
                    setIsEditingMember(true);
                  }}
                  className="px-4 py-2 bg-[#FF2B2B] hover:bg-[#D91D1D] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Member Manual
                </button>
              </div>

              {/* Members Table */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="p-4">Nama Member</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Tier Paket</th>
                        <th className="p-4">Tanggal Gabung</th>
                        <th className="p-4">Status Lisensi</th>
                        <th className="p-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredMembers.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="p-4 font-bold text-white">{m.name}</td>
                          <td className="p-4 text-slate-400">{m.email}</td>
                          <td className="p-4">
                            <span className="bg-red-950 text-red-300 font-bold px-2 py-0.5 rounded text-[10px]">
                              {m.memberTier}
                            </span>
                          </td>
                          <td className="p-4 text-slate-400">{m.joinDate}</td>
                          <td className="p-4">
                            <button
                              onClick={() => toggleMemberStatus(m.id)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                                m.status === 'Aktif'
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                  : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                              }`}
                            >
                              {m.status} (Klik ubah)
                            </button>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteMember(m.id)}
                              className="p-2 bg-slate-800 hover:bg-red-950 text-red-400 rounded-lg transition-colors cursor-pointer"
                              title="Hapus Member"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: STATISTIK LANDING PAGE */}
          {activeTab === 'stats' && (
            <motion.form
              key="tab-stats"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.16 }}
              onSubmit={handleSaveStats}
              className="space-y-6 max-w-2xl bg-slate-950 p-6 rounded-2xl border border-slate-800"
            >
              <h4 className="text-base font-bold text-white border-b border-slate-800 pb-2">
                Ubah Angka Statistik Channel
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Total Views Ditonton</label>
                  <input
                    type="text"
                    value={stats.totalViews}
                    onChange={(e) => setStats(prev => ({ ...prev, totalViews: e.target.value }))}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Total Subscriber</label>
                  <input
                    type="text"
                    value={stats.subscribers}
                    onChange={(e) => setStats(prev => ({ ...prev, subscribers: e.target.value }))}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Total Video Edukasi</label>
                  <input
                    type="text"
                    value={stats.totalVideos}
                    onChange={(e) => setStats(prev => ({ ...prev, totalVideos: e.target.value }))}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Total Active Members</label>
                  <input
                    type="text"
                    value={stats.activeMembers}
                    onChange={(e) => setStats(prev => ({ ...prev, activeMembers: e.target.value }))}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#FF2B2B] hover:bg-[#D91D1D] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Simpan Statistik
              </button>
            </motion.form>
          )}

          </AnimatePresence>
        </div>

      </motion.div>

      {/* --- SUB-MODAL FOR EDITING VIDEO --- */}
      <AnimatePresence>
        {isEditingVideo && (
          <motion.div
            key="submodal-video-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-60 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsEditingVideo(false);
            }}
          >
            <motion.div
              key="submodal-video-dialog"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: "spring", damping: 26, stiffness: 360 }}
              className="bg-slate-900 text-white p-6 rounded-3xl max-w-lg w-full border border-slate-800 space-y-4 shadow-2xl my-auto"
            >
              <h3 className="font-bold text-lg text-white">
                {editingVideoId ? 'Edit Video YouTube' : 'Tambah Video YouTube Baru'}
              </h3>

              <form onSubmit={handleSaveVideo} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Judul Video</label>
                  <input
                    type="text"
                    required
                    value={videoForm.title}
                    onChange={e => setVideoForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Kategori</label>
                    <select
                      value={videoForm.category}
                      onChange={e => setVideoForm(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                    >
                      <option value="Atur Gaji">Atur Gaji</option>
                      <option value="Tips Menabung">Tips Menabung</option>
                      <option value="Bebas Hutang">Bebas Hutang</option>
                      <option value="Investasi Pemula">Investasi Pemula</option>
                      <option value="Mindset Finansial">Mindset Finansial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Durasi (misal 14:20)</label>
                    <input
                      type="text"
                      value={videoForm.duration}
                      onChange={e => setVideoForm(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">URL Thumbnail Gambar</label>
                  <input
                    type="text"
                    value={videoForm.thumbnailUrl}
                    onChange={e => setVideoForm(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Deskripsi Ringkas</label>
                  <textarea
                    rows={3}
                    value={videoForm.description}
                    onChange={e => setVideoForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingVideo(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#FF2B2B] text-white font-bold rounded-xl"
                  >
                    Simpan Video
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SUB-MODAL FOR EDITING COURSE --- */}
      <AnimatePresence>
        {isEditingCourse && (
          <motion.div
            key="submodal-course-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-60 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsEditingCourse(false);
            }}
          >
            <motion.div
              key="submodal-course-dialog"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: "spring", damping: 26, stiffness: 360 }}
              className="bg-slate-900 text-white p-6 rounded-3xl max-w-lg w-full border border-slate-800 space-y-4 shadow-2xl my-auto"
            >
              <h3 className="font-bold text-lg text-white">
                {editingCourseId ? 'Edit Course Premium' : 'Tambah Course Premium Baru'}
              </h3>

              <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Judul Course Modul</label>
                  <input
                    type="text"
                    required
                    value={courseForm.title}
                    onChange={e => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Level Materi</label>
                    <select
                      value={courseForm.level}
                      onChange={e => setCourseForm(prev => ({ ...prev, level: e.target.value as any }))}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                    >
                      <option value="Pemula">Pemula</option>
                      <option value="Menengah">Menengah</option>
                      <option value="Lanjutan">Lanjutan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Jumlah Modul</label>
                    <input
                      type="number"
                      value={courseForm.lessonsCount}
                      onChange={e => setCourseForm(prev => ({ ...prev, lessonsCount: Number(e.target.value) }))}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">URL Thumbnail</label>
                  <input
                    type="text"
                    value={courseForm.thumbnailUrl}
                    onChange={e => setCourseForm(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Deskripsi Course</label>
                  <textarea
                    rows={3}
                    value={courseForm.description}
                    onChange={e => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingCourse(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#FF2B2B] text-white font-bold rounded-xl"
                  >
                    Simpan Modul
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SUB-MODAL FOR EDITING MEMBER --- */}
      <AnimatePresence>
        {isEditingMember && (
          <motion.div
            key="submodal-member-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-60 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsEditingMember(false);
            }}
          >
            <motion.div
              key="submodal-member-dialog"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: "spring", damping: 26, stiffness: 360 }}
              className="bg-slate-900 text-white p-6 rounded-3xl max-w-sm w-full border border-slate-800 space-y-4 shadow-2xl my-auto"
            >
              <h3 className="font-bold text-lg text-white">Tambah Member Manual</h3>

              <form onSubmit={handleSaveMember} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Nama Member</label>
                  <input
                    type="text"
                    required
                    value={memberForm.name}
                    onChange={e => setMemberForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Email Member</label>
                  <input
                    type="email"
                    required
                    value={memberForm.email}
                    onChange={e => setMemberForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Paket Tier</label>
                  <select
                    value={memberForm.memberTier}
                    onChange={e => setMemberForm(prev => ({ ...prev, memberTier: e.target.value as any }))}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Bronze">Bronze</option>
                    <option value="Gold">Gold</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingMember(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#FF2B2B] text-white font-bold rounded-xl"
                  >
                    Simpan Member
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
