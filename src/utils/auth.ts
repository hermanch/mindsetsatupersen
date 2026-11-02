import { User, RegisteredMember } from '../types';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  memberTier: 'Bronze' | 'Gold' | 'VIP';
  createdAt: string;
}

// Default Production Admin Account
const envAdminEmail = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_ADMIN_EMAIL : undefined;
const envAdminPassword = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_ADMIN_PASSWORD : undefined;

export const DEFAULT_ADMIN_CREDENTIALS = {
  email: envAdminEmail || 'admin@satupersen.id',
  username: 'admin',
  ownerEmail: 'herman.btu@gmail.com',
  password: envAdminPassword || 'Mindset1Persen2026!'
};

// Default Pre-seeded Production Member Account for direct login/testing
export const DEFAULT_PROD_MEMBERS: UserAccount[] = [
  {
    id: 'user-prod-vip',
    name: 'Herman (VIP Member)',
    email: 'member@satupersen.id',
    password: 'Member1Persen2026!',
    memberTier: 'VIP',
    createdAt: '2026-01-01'
  },
  {
    id: 'user-prod-budi',
    name: 'Budi Pratama',
    email: 'budi@gmail.com',
    password: 'Member1Persen2026!',
    memberTier: 'VIP',
    createdAt: '2026-01-15'
  }
];

const STORAGE_KEY_ACCOUNTS = 'msp_registered_accounts';
const STORAGE_KEY_ADMIN_PASS = 'msp_admin_custom_password';

/**
 * Get all registered user accounts from localStorage or seed initial accounts
 */
export function getRegisteredAccounts(): UserAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
    if (raw) {
      const parsed: UserAccount[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse accounts from localStorage', e);
  }

  // Seed default production accounts
  try {
    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(DEFAULT_PROD_MEMBERS));
  } catch {
    // Ignore storage quota
  }
  return DEFAULT_PROD_MEMBERS;
}

/**
 * Register a new user in production
 */
export function registerUser(account: Omit<UserAccount, 'id' | 'createdAt'>): { user: User; memberRecord: RegisteredMember } {
  const accounts = getRegisteredAccounts();
  const normalizedEmail = account.email.trim().toLowerCase();

  const existing = accounts.find(a => a.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error('Alamat email ini sudah terdaftar sebagai member. Silakan gunakan tab Masuk Member.');
  }

  const newAccount: UserAccount = {
    id: `acc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: account.name.trim(),
    email: normalizedEmail,
    password: account.password,
    memberTier: account.memberTier,
    createdAt: new Date().toISOString().split('T')[0]
  };

  const updatedAccounts = [newAccount, ...accounts];
  localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(updatedAccounts));

  const user: User = {
    isLoggedIn: true,
    name: newAccount.name,
    email: newAccount.email,
    memberTier: newAccount.memberTier
  };

  const memberRecord: RegisteredMember = {
    id: newAccount.id,
    name: newAccount.name,
    email: newAccount.email,
    memberTier: newAccount.memberTier,
    joinDate: newAccount.createdAt,
    status: 'Aktif'
  };

  return { user, memberRecord };
}

/**
 * Verify member login credentials
 */
export function authenticateMember(emailInput: string, passwordInput: string): User {
  const accounts = getRegisteredAccounts();
  const normalizedEmail = emailInput.trim().toLowerCase();

  const account = accounts.find(a => a.email.toLowerCase() === normalizedEmail);
  if (!account) {
    throw new Error('Akun dengan email tersebut belum terdaftar. Silakan registrasi terlebih dahulu.');
  }

  if (account.password !== passwordInput) {
    throw new Error('Kata sandi yang Anda masukkan salah. Silakan periksa kembali.');
  }

  return {
    isLoggedIn: true,
    name: account.name,
    email: account.email,
    memberTier: account.memberTier
  };
}

/**
 * Verify Admin CMS credentials
 */
export function verifyAdminCredentials(identifier: string, passwordInput: string): boolean {
  const cleanId = identifier.trim().toLowerCase();
  const customPass = localStorage.getItem(STORAGE_KEY_ADMIN_PASS);
  const activeAdminPassword = customPass || DEFAULT_ADMIN_CREDENTIALS.password;

  const validIdentifiers = [
    DEFAULT_ADMIN_CREDENTIALS.email.toLowerCase(),
    DEFAULT_ADMIN_CREDENTIALS.username.toLowerCase(),
    DEFAULT_ADMIN_CREDENTIALS.ownerEmail.toLowerCase(),
    'admin@mindsetsatupersen.id'
  ];

  const isIdentifierMatch = validIdentifiers.includes(cleanId);
  const isPasswordMatch = passwordInput === activeAdminPassword;

  return isIdentifierMatch && isPasswordMatch;
}
