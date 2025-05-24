import api from './api';
import { Message } from '../types/message';

export const getMessages = async (): Promise<Message[]> => {
  const response = await api.get('/messages');
  return response.data;
};

export const sendMessage = async (content: string, subject: string): Promise<Message> => {
  const response = await api.post('/messages', {
    content,
    subject
  });
  return response.data;
};

export const sendReply = async (messageId: string, content: string, markAsResolved: boolean = false): Promise<Message> => {
  const response = await api.post(`/messages/${messageId}/reply`, {
    content,
    markAsResolved
  });
  return response.data;
};

export const replyToMessage = async (messageId: string, content: string) => {
  const response = await api.post(`/messages/${messageId}/reply`, {
    content
  });
  return response.data;
};

export const markMessageAsRead = async (messageId: string) => {
  const response = await api.patch(`/messages/${messageId}/read`);
  return response.data;
}; 