import axios from '../axios';

export const getAllCareers = async (params?: { page?: number; limit?: number; search?: string }) => {
  try {
    const response = await axios.get('/v1/careers', { params });
    return response.data.data;
  } catch (error) {
    console.error('Get all careers error:', error);
    throw error;
  }
};

export const getCareerById = async (id: string) => {
  try {
    const response = await axios.get(`/v1/careers/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Get career by ID error:', error);
    throw error;
  }
};

export const getCareersByMajor = async (majorId: string) => {
  try {
    const response = await axios.get(`/v1/careers/major/${majorId}`);
    return response.data.data;
  } catch (error) {
    console.error('Get careers by major error:', error);
    throw error;
  }
};
