export interface Message {
  _id: string;
  sender: string;
  receiver: string;
  senderName?: string;
  receiverName?: string;
  subject: string;
  content: string;
  status: 'pending' | 'replied' | 'resolved';
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
} 