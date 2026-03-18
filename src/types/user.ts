export type UserRole = 'user' | 'admin';
export type SubscriptionTier = 'free' | 'premium' | 'enterprise';

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
  avatar?: string;
  coverImage?: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  lastLogin?: string;
  mbtiType?: string;
  favoriteUniversities: string[];
  subscriptionTier: SubscriptionTier;
  subscriptionExpiry?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
