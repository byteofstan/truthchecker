import axios from 'axios';
import { TextExtractResponse, FactCheckResponse } from '../types';

const API_BASE_URL = 'https://truthcheck-dapps.onrender.com';

export const extractTextFromTweet = async (url: string): Promise<string> => {
  try {
    const response = await axios.post<TextExtractResponse>(
      `${API_BASE_URL}/extract-text`,
      { url }
    );
    return response.data.text;
  } catch (error) {
    throw new Error('Failed to extract text from the tweet');
  }
};

export const factCheckText = async (text: string): Promise<{fact_check_result: string, transaction_hash: string}> => {
  try {
    const response = await axios.post<FactCheckResponse>(
      `${API_BASE_URL}/fact-check`,
      { content: text },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return {
      fact_check_result: response.data.fact_check_result,
      transaction_hash: response.data.transaction_hash
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Fact check error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to fact-check the text');
    }
    throw new Error('Failed to fact-check the text');
  }
};