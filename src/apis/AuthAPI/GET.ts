import axios from '../axios';
import { User } from '../../types/user';

const AUTH_BASE = '/auth';

export const getCurrentUser = async (): Promise<User> => {
  const response = await axios.get(`${AUTH_BASE}/me`);
  return response.data.data;
};

export const checkAuth = async (): Promise<boolean> => {
  try {
    await axios.get(`${AUTH_BASE}/me`);
    return true;
  } catch {
    return false;
  }
};
