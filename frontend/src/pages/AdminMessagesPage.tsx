import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Clock, CheckCircle2, MessageSquare, Search, Filter, ChevronDown } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { getMessages, sendReply } from '../services/messages';
import { Message } from '../types/message';
import { useAuth } from '@clerk/clerk-react';

const AdminMessagesPage: React.FC = () => {
  const { t } = useTranslation();
  const { getToken } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'replied' | 'resolved'>('all');
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) {
        setError('Not authenticated');
        return;
      }
      localStorage.setItem('clerk-session-token', token);
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
    } catch (err) {
      setError('Failed to load messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter messages based on search query and status
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.senderName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSendReply = async () => {
    if (!selectedMessage || !replyContent.trim()) return;

    try {
      const token = await getToken();
      if (!token) {
        setError('Not authenticated');
        return;
      }
      localStorage.setItem('clerk-session-token', token);
      await sendReply(selectedMessage._id, replyContent);
      setReplyContent('');
      loadMessages(); // Reload messages to get updated status
    } catch (err) {
      setError('Failed to send reply');
      console.error(err);
    }
  };

  const handleMarkAsResolved = async () => {
    if (!selectedMessage) return;

    try {
      const token = await getToken();
      if (!token) {
        setError('Not authenticated');
        return;
      }
      localStorage.setItem('clerk-session-token', token);
      await sendReply(selectedMessage._id, 'Marked as resolved', true);
      loadMessages(); // Reload messages to get updated status
    } catch (err) {
      setError('Failed to mark message as resolved');
      console.error(err);
    }
  };

  const getStatusColor = (status: Message['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-100 text-warning-700';
      case 'replied':
        return 'bg-primary-100 text-primary-700';
      case 'resolved':
        return 'bg-success-100 text-success-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'replied':
        return <MessageSquare className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('admin.messages.title')}</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t('admin.messages.search')}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">{t('admin.messages.all')}</option>
              <option value="pending">{t('admin.messages.pending')}</option>
              <option value="replied">{t('admin.messages.replied')}</option>
              <option value="resolved">{t('admin.messages.resolved')}</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.messages.messages')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <div
                    key={message._id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedMessage?._id === message._id
                        ? 'bg-primary-50 border-primary-200'
                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{message.subject}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                        {getStatusIcon(message.status)}
                        <span className="ml-1">{t(`admin.messages.status.${message.status}`)}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{message.senderName}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{message.content}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-400">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </span>
                      {!message.isRead && (
                        <span className="inline-block w-2 h-2 rounded-full bg-primary-500"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedMessage.subject}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedMessage.senderName}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedMessage.status)}`}>
                    {getStatusIcon(selectedMessage.status)}
                    <span className="ml-1">{t(`admin.messages.status.${selectedMessage.status}`)}</span>
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.content}</p>
                </div>
                <div className="mt-6 space-y-4">
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={t('admin.messages.replyPlaceholder')}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  />
                  <div className="flex justify-end space-x-3">
                    <Button 
                      variant="outline"
                      onClick={handleMarkAsResolved}
                      disabled={selectedMessage.status === 'resolved'}
                    >
                      {t('admin.messages.markAsResolved')}
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={handleSendReply}
                      disabled={!replyContent.trim()}
                    >
                      {t('admin.messages.sendReply')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">{t('admin.messages.selectMessage')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessagesPage; 