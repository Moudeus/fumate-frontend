import axios from '../axios';

export interface AdminStats {
  totalUsers: number;
  mbtiTestsCompleted: number;
  newUsersThisMonth: number;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  isActive: boolean;
  isVerified: boolean;
  mbtiType?: string;
  subscriptionTier: 'free' | 'premium' | 'enterprise';
  createdAt: string;
  lastLogin?: string;
}

export interface PaginatedUsersResponse {
  items: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const getAdminStats = async (): Promise<AdminStats> => {
  const response = await axios.get('/users/admin/stats');
  return response.data.data;
};

export const getAllUsers = async (page: number = 1, limit: number = 10): Promise<PaginatedUsersResponse> => {
  const response = await axios.get(`/users/admin/all?page=${page}&limit=${limit}`);
  return response.data.data;
};
