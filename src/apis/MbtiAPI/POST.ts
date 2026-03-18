import axios from '../axios';

export interface MBTIAnswer {
  questionId: string;
  choice: 'a' | 'b';
}

export const submitMBTITest = async (answers: MBTIAnswer[]) => {
  try {
    const response = await axios.post('/v1/mbti/results', { answers });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const calculateMBTIPreview = async (answers: MBTIAnswer[]) => {
  try {
    const response = await axios.post('/v1/mbti/calculate', { answers });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
