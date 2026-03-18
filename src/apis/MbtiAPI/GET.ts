import axios from '../axios';

export const getMBTIQuestions = async (page = 1, limit = 50, category?: string) => {
  try {
    const params: Record<string, any> = { page, limit };
    if (category) params.category = category;
    
    const response = await axios.get('/v1/mbti/questions', { params });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getMBTITypes = async (page = 1, limit = 50) => {
  try {
    const response = await axios.get('/v1/mbti/types', { params: { page, limit } });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getMBTITypeByType = async (type: string) => {
  try {
    const response = await axios.get(`/v1/mbti/types/${type}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getMBTIResults = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get('/v1/mbti/results', { params: { page, limit } });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getMBTIResultById = async (id: string) => {
  try {
    const response = await axios.get(`/v1/mbti/results/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getLatestMBTIResult = async () => {
  try {
    const response = await getMBTIResults(1, 1);
    return response.items && response.items.length > 0 ? response.items[0] : null;
  } catch (error) {
    console.error('Get latest MBTI result error:', error);
    return null;
  }
};
