import axios from '../axios';

const AUTH_BASE = '/auth';

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
  await axios.put(`${AUTH_BASE}/change-password`, data);
};

export const updateProfile = async (data: {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
}): Promise<void> => {
  await axios.put(`${AUTH_BASE}/profile`, data);
};
