import axios from '../axios';

const AUTH_BASE = '/auth';

export const deleteAccount = async (): Promise<void> => {
  await axios.delete(`${AUTH_BASE}/account`);
};
