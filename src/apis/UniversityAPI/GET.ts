import axios from '../axios';

export const getAllUniversities = async (params?: { 
  page?: number; 
  limit?: number; 
  search?: string;
  sectorId?: string;
  majorId?: string;
}) => {
  try {
    const response = await axios.get('/v1/universities', { params });
    return response.data.data;
  } catch (error) {
    console.error('Get all universities error:', error);
    throw error;
  }
};

export const getUniversityById = async (id: string) => {
  try {
    const response = await axios.get(`/v1/universities/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Get university by ID error:', error);
    throw error;
  }
};

export const getUniversitiesByMajor = async (majorId: string, params?: { page?: number; limit?: number; search?: string }) => {
  try {
    const response = await axios.get(`/v1/universities/majors/${majorId}/universities`, { params });
    return response.data.data;
  } catch (error) {
    console.error('Get universities by major error:', error);
    throw error;
  }
};

export const getSectors = async () => {
  try {
    const response = await axios.get('/v1/universities/sectors');
    return response.data.data;
  } catch (error) {
    console.error('Get sectors error:', error);
    throw error;
  }
};
