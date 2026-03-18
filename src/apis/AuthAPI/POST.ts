import axios from '../axios';
import { User } from '../../types/user';

const AUTH_BASE = '/auth';

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

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterResponse {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post(`${AUTH_BASE}/login`, data);
  return response.data.data;
};

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await axios.post(`${AUTH_BASE}/register`, data);
  return response.data.data;
};

export const verifyOTP = async (data: VerifyOTPRequest): Promise<LoginResponse> => {
  const response = await axios.post(`${AUTH_BASE}/verify-otp`, data);
  return response.data.data;
};

export const resendOTP = async (email: string): Promise<void> => {
  await axios.post(`${AUTH_BASE}/resend-otp`, { email });
};

export const forgotPassword = async (email: string): Promise<void> => {
  await axios.post(`${AUTH_BASE}/forgot-password`, { email });
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  await axios.post(`${AUTH_BASE}/reset-password`, { token, newPassword });
};

export const logout = async (): Promise<void> => {
  await axios.post(`${AUTH_BASE}/logout`);
};
