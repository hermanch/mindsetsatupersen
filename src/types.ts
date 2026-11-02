export interface Video {
  id: string;
  title: string;
  category: 'Atur Gaji' | 'Tips Menabung' | 'Bebas Hutang' | 'Investasi Pemula' | 'Mindset Finansial';
  duration: string;
  views: string;
  uploadDate: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  description: string;
  isPopular?: boolean;
}

export interface PremiumCourse {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: 'Pemula' | 'Menengah' | 'Lanjutan';
  badge: string;
  description: string;
  lessonsCount: number;
  thumbnailUrl: string;
  isLocked: boolean;
  instructor: string;
  rating: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  story: string;
  metric: string;
}

export interface MemberPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  perks: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface ChannelStats {
  totalViews: string;
  subscribers: string;
  totalVideos: string;
  activeMembers: string;
  satisfactionRate: string;
}

export interface RegisteredMember {
  id: string;
  name: string;
  email: string;
  memberTier: 'Bronze' | 'Gold' | 'VIP';
  joinDate: string;
  status: 'Aktif' | 'Nonaktif';
}

export interface User {
  isLoggedIn: boolean;
  isAdmin?: boolean;
  name: string;
  email: string;
  memberTier?: 'Bronze' | 'Gold' | 'VIP';
  avatar?: string;
}

export interface CalculationResult {
  monthlyIncome: number;
  needs: number; // 50%
  wants: number; // 30%
  savings: number; // 20%
  emergencyFundIdeal: number; // 6x needs
  monthsToGoal: number;
  projectionYearly: number;
}
