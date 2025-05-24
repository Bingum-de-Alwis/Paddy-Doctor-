import { DiseaseResponse } from '../types/disease';

const API_URL = 'http://localhost:3000/api/diseases';

export const fetchDiseases = async (): Promise<DiseaseResponse> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch diseases');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching diseases:', error);
    throw error;
  }
}; 