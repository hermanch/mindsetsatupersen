import { Video, PremiumCourse, Testimonial, MemberPlan } from '../types';

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@mindsetsatupersen05";

export const CHANNEL_STATS = {
  totalViews: "2.097.480+",
  subscribers: "120.000+",
  totalVideos: "150+",
  activeMembers: "8.500+",
  satisfactionRate: "99%"
};

export const FREE_VIDEOS: Video[] = [
  {
    id: "v1",
    title: "Atur Gaji UMR 3 Juta Biar Tetap BISA MENABUNG & Gak Stres di Akhir Bulan!",
    category: "Atur Gaji",
    duration: "14:20",
    views: "342K x ditonton",
    uploadDate: "2 minggu lalu",
    thumbnailUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: YOUTUBE_CHANNEL_URL,
    description: "Panduan praktis metode 50/30/20 yang disesuaikan dengan gaji standar Indonesia tanpa menyiksa diri.",
    isPopular: true
  },
  {
    id: "v2",
    title: "5 Langkah Bebas Hutang & Pinjol Dalam 6 Bulan (Strategi Snowball)",
    category: "Bebas Hutang",
    duration: "18:45",
    views: "520K x ditonton",
    uploadDate: "1 bulan lalu",
    thumbnailUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: YOUTUBE_CHANNEL_URL,
    description: "Langkah konkrit keluar dari jeratan hutang konsumtif dan pinjol secara terukur dan disiplin.",
    isPopular: true
  },
  {
    id: "v3",
    title: "Investasi Pemula 2026: Reksa Dana vs Emas vs Saham untuk Modal 100 Ribu",
    category: "Investasi Pemula",
    duration: "16:10",
    views: "215K x ditonton",
    uploadDate: "3 minggu lalu",
    thumbnailUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: YOUTUBE_CHANNEL_URL,
    description: "Perbandingan instrumen investasi dengan risiko rendah cocok untuk yang baru mau mulai investasi.",
    isPopular: false
  },
  {
    id: "v4",
    title: "Cara Menabung Dana Darurat 6 Kali Gaji Bagi Pekerja Muda",
    category: "Tips Menabung",
    duration: "12:35",
    views: "189K x ditonton",
    uploadDate: "1 bulan lalu",
    thumbnailUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: YOUTUBE_CHANNEL_URL,
    description: "Mengapa dana darurat adalah pondasi pertama sebelum investasi dan bagaimana cara membangunnya.",
    isPopular: false
  },
  {
    id: "v5",
    title: "Mindset Finansial Kaya: Bedanya Cara Berpikir Kelas Menengah & Bebas Finansial",
    category: "Mindset Finansial",
    duration: "21:05",
    views: "410K x ditonton",
    uploadDate: "2 bulan lalu",
    thumbnailUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: YOUTUBE_CHANNEL_URL,
    description: "Mengubah cara pandang terhadap uang dari alat konsumsi menjadi alat kebebasan.",
    isPopular: true
  },
  {
    id: "v6",
    title: "Stop Lakukan 4 Kesalahan Finansial Ini Di Usia 20-an Sebelum Menyesal!",
    category: "Mindset Finansial",
    duration: "15:50",
    views: "298K x ditonton",
    uploadDate: "2 bulan lalu",
    thumbnailUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    youtubeUrl: YOUTUBE_CHANNEL_URL,
    description: "Jebakan gaya hidup (lifestyle creep) dan cara menghindarinya sejak dini.",
    isPopular: false
  }
];

export const PREMIUM_COURSES: PremiumCourse[] = [
  {
    id: "course-1",
    title: "Masterclass: Blueprint Kebebasan Finansial & Portofolio Investasi 2026",
    category: "Keuangan Personal & Investasi",
    duration: "4 Jam 30 Mnt",
    level: "Menengah",
    badge: "Eksklusif Member",
    description: "Modul komprehensif menyusun strategi kebebasan finansial, alokasi aset modern, dan simulasi pensiun dini.",
    lessonsCount: 12,
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    isLocked: true,
    instructor: "Tim Mindset Satu Persen",
    rating: 4.9
  },
  {
    id: "course-2",
    title: "Strategi Radikal Bebas Hutang, Pinjol & Riba Dalam 12 Bulan",
    category: "Manajemen Hutang",
    duration: "3 Jam 15 Mnt",
    level: "Pemula",
    badge: "Eksklusif Member",
    description: "Template spreadsheet lunasi hutang, negosiasi dengan kreditur, dan merancang arus kas darurat.",
    lessonsCount: 8,
    thumbnailUrl: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=800&q=80",
    isLocked: true,
    instructor: "Mentor Finansial Senior",
    rating: 4.95
  },
  {
    id: "course-3",
    title: "Rekaman Webinar: Bedah Saham Dividend Play & Reksa Dana Pasar Uang",
    category: "Webinar Bulanan",
    duration: "2 Jam 45 Mnt",
    level: "Lanjutan",
    badge: "Webinar Premium",
    description: "Sesi live interaktif analisis laporan keuangan perusahaan, rasio deviden, serta manajemen risiko pasar.",
    lessonsCount: 4,
    thumbnailUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    isLocked: true,
    instructor: "Guest Expert & Founder MSP",
    rating: 4.88
  },
  {
    id: "course-4",
    title: "Workshop Arus Kas Rumah Tangga & Menyiapkan Dana Pendidikan Anak",
    category: "Keuangan Keluarga",
    duration: "3 Jam 50 Mnt",
    level: "Menengah",
    badge: "Eksklusif Member",
    description: "Panduan khusus pasangan muda mengelola 2 sumber penghasilan, perlindungan asuransi, dan kalkulasi inflasi pendidikan.",
    lessonsCount: 9,
    thumbnailUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80",
    isLocked: true,
    instructor: "Tim Finansial MSP",
    rating: 4.92
  }
];

export const MEMBER_PLANS: MemberPlan[] = [
  {
    id: "plan-monthly",
    name: "Member Bulanan",
    price: "Rp 49.000",
    period: "/ bulan",
    description: "Cocok untuk kamu yang ingin mencoba kelas premium dan modul keuangan.",
    perks: [
      "Akses Seluruh Video Course & Webinar Premium",
      "Template Financial Planner Excel & Notion",
      "Grup Diskusi Telegram Komunitas Eksklusif",
      "Akses Sesi Q&A Bulanan bersama Founder",
      "Sertifikat Kelulusan Modul"
    ],
    ctaText: "Gabung Bulanan"
  },
  {
    id: "plan-annual",
    name: "Member Tahunan",
    price: "Rp 399.000",
    period: "/ tahun",
    description: "Paling Hemat! Hemat hingga 32% + Bonus konsultasi perencanaan keuangan.",
    perks: [
      "Semua Fitur Paket Bulanan",
      "Hemat Rp 189.000 dibanding bulanan",
      "Bonus 1x Review Financial Health Chart Pribadi",
      "Akses VIP Early Bird Event Offline MSP",
      "Update Modul Baru Otomatis Tanpa Biaya Tambahan"
    ],
    isPopular: true,
    ctaText: "Gabung Tahunan (Diskon 32%)"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Budi Pratama",
    role: "Karyawan Swasta (27 tahun)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=200",
    story: "Dulu gaji selalu habis di pertengahan bulan. Setelah menerapkan metode 50/30/20 dari Mindset Satu Persen, sekarang saya punya dana darurat 6 bulan gaji dan sudah mulai investasi saham!",
    metric: "Berhasil Kumpul Dana Darurat 6x Gaji"
  },
  {
    id: "t2",
    name: "Siti Rahmawati",
    role: "Freelancer & Ibu Rumah Tangga",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=200",
    story: "Video strategi keluar dari hutang benar-benar menyelamatkan keluarga kami dari jeratan pinjol. Bahasanya sangat sederhana dan tidak berbelit-belit.",
    metric: "Lunas Hutang Rp 45 Juta dalam 10 Bulan"
  },
  {
    id: "t3",
    name: "Dicky Kurniawan",
    role: "First Jobber (23 tahun)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=200",
    story: "Channel keuangan paling adem dan realistis. Tidak muluk-muluk langsung suruh kaya mendadak, tapi mengajarkan proses 1% konsisten setiap hari.",
    metric: "Portofolio Investasi Tumbuh 18%"
  }
];

export const FAQS = [
  {
    q: "Apakah konten gratis di channel YouTube Mindset Satu Persen tetap ada?",
    a: "Ya! Kami tetap rutin merilis video edukasi gratis setiap minggu di channel YouTube kami (@mindsetsatupersen05). Area Premium diperuntukkan bagi member yang butuh modul mendalam, template praktis, dan diskusi grup."
  },
  {
    q: "Bagaimana cara mengakses Video Course Premium setelah daftar?",
    a: "Setelah mendaftar dan memverifikasi pembayaran, kamu bisa langsung login ke Member Portal dan seluruh gembok video course akan terbuka secara otomatis."
  },
  {
    q: "Apakah pemula yang belum paham istilah keuangan bisa ikut?",
    a: "Sangat bisa! Semua materi dirancang khusus dengan analogi kehidupan sehari-hari, bahasa yang sederhana, tanpa istilah rumit yang membingungkan."
  },
  {
    q: "Bagaimana jika saya ingin berkonsultasi seputar keuangan saya?",
    a: "Member Premium memiliki akses ke grup diskusi Telegram eksklusif dan sesi Q&A bulanan di mana kamu bisa bertanya langsung kepada tim mentor kami."
  }
];
