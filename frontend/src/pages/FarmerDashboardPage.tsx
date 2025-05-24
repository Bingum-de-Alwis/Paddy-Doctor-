import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Leaf, Activity, AlertTriangle, Calendar, Mail } from 'lucide-react';
import { Message, sendMessage, getMessages } from '../services/messages';
import { useUser, useAuth } from '@clerk/clerk-react';

const FarmerDashboardPage = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
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
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const token = await getToken();
      if (!token) {
        setError('Not authenticated');
        return;
      }
      localStorage.setItem('clerk-session-token', token);

      const newMessage = await sendMessage(content, subject);
      setMessages([newMessage, ...messages]);
      setSubject('');
      setContent('');
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Farmer Dashboard</h1>
      
      {/* Send Message to Admin */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Mail className="h-5 w-5 text-primary-500 mr-2" />
          Send Message to Admin
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSendMessage} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="label">Subject</label>
            <input
              className="input"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
              placeholder="Subject"
            />
          </div>
          <div>
            <label className="label">Message</label>
            <input
              className="input"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              placeholder="Type your message"
            />
          </div>
          <div>
            <Button type="submit" variant="primary" isLoading={sending}>
              Send
            </Button>
          </div>
        </form>
      </div>

      {/* List of Messages */}
      {messages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Mail className="h-5 w-5 text-primary-500 mr-2" />
            Your Messages
          </h2>
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg._id} className="bg-white p-4 rounded-lg shadow border-l-4 border-primary-500">
                <div className="flex items-center mb-1">
                  <span className="font-bold">{msg.subject}</span>
                  <span className="ml-auto text-xs text-gray-500">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="text-gray-700 mb-1">{msg.content}</div>
                <div className="text-xs text-gray-400">
                  {msg.isRead ? 'Read' : 'Unread'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Scans</p>
              <p className="text-2xl font-bold text-gray-800">24</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Cases</p>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Actions</p>
              <p className="text-2xl font-bold text-gray-800">5</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Scan</p>
              <p className="text-2xl font-bold text-gray-800">2d ago</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Scans</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((scan) => (
              <div key={scan} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div>
                  <p className="font-medium text-gray-800">Scan #{scan}</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                  Healthy
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommended Actions</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((action) => (
              <div key={action} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div>
                  <p className="font-medium text-gray-800">Apply Treatment #{action}</p>
                  <p className="text-sm text-gray-500">Due in 3 days</p>
                </div>
                <button className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                  Mark Complete
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboardPage;