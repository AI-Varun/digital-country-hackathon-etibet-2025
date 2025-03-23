export type UserRole = 'Citizen' | 'Government' | 'Admin';

export interface User {
  wallet: string;
  role: UserRole;
  mfaEnabled: boolean;
  passport?: {
    id: string;
    status: 'pending' | 'verified' | 'rejected';
    issuedAt?: string;
  };
  reputation: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  mfaVerified: boolean;
  loading: boolean;
  error: string | null;
}