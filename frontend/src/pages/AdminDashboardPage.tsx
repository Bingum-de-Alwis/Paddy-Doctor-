import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, Sprout, AlertCircle, BarChart, Mail, MessageSquare, CloudSun, AlertTriangle } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import Card from '../components/ui/Card';
import { messages } from '../utils/mockData';
import Button from '../components/ui/Button';

interface Alert {
  _id: string;
  title: string;
  content: string;
  type: 'weather' | 'regional';
  region?: string;
  createdAt: string;
}

const AdminDashboardPage = () => {
  const { t } = useTranslation();
  const { getToken } = useAuth();

  // Alert form state
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'regional' | 'weather'>('regional');
  const [region, setRegion] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate message statistics
  const totalMessages = messages.length;
  const unreadMessages = messages.filter(msg => !msg.isRead).length;
  const pendingMessages = messages.filter(msg => msg.status === 'pending').length;

  // Fetch recent alerts
  const fetchRecentAlerts = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const token = await getToken();
      
      const response = await fetch(`${API_URL}/notifications/recent`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch recent alerts');
      }

      const data = await response.json();
      setAlerts(data);
    } catch (err) {
      console.error('Error fetching recent alerts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch recent alerts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentAlerts();
  }, []);

  // Handle alert submission
  const handleSendAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const token = await getToken();
      
      const response = await fetch(`${API_URL}/notifications/send-alert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          message,
          type,
          region: type === 'regional' ? region : undefined
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to send alert' }));
        throw new Error(errorData.error || 'Failed to send alert');
      }

      const result = await response.json();
      console.log('Alert sent successfully:', result);

      // Refresh alerts list
      await fetchRecentAlerts();

      // Clear form
      setTitle('');
      setMessage('');
      setRegion('');
      setType('regional');
    } catch (error) {
      console.error('Error sending alert:', error);
      setError(error instanceof Error ? error.message : 'Failed to send alert');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('admin.title')}</h1>
      
      {/* Send Alert Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <AlertCircle className="h-5 w-5 text-warning-500 mr-2" />
          Send New Alert
        </h2>
        <form onSubmit={handleSendAlert} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="label">Title</label>
            <input
              className="input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="Alert title"
            />
          </div>
          <div>
            <label className="label">Message</label>
            <input
              className="input"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              placeholder="Alert message"
            />
          </div>
          <div>
            <label className="label">Type</label>
            <select
              className="select"
              value={type}
              onChange={e => setType(e.target.value as 'regional' | 'weather')}
            >
              <option value="regional">Paddy Disease</option>
              <option value="weather">Weather</option>
            </select>
          </div>
          {type === 'regional' && (
            <div>
              <label className="label">Region</label>
              <input
                className="input"
                value={region}
                onChange={e => setRegion(e.target.value)}
                placeholder="Region (optional)"
              />
            </div>
          )}
          <div>
            <Button type="submit" variant="warning" isLoading={sending}>
              Send Alert
            </Button>
          </div>
        </form>
      </div>

      {/* List of Alerts */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <AlertCircle className="h-5 w-5 text-warning-500 mr-2" />
          Recent Alerts
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {loading ? (
          <div className="text-center py-4">Loading alerts...</div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No alerts sent yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alerts.map(alert => (
              <div key={alert._id} className="bg-white p-4 rounded-lg shadow border-l-4 border-warning-500 mb-2">
                <div className="flex items-center mb-2">
                  {alert.type === 'weather' ? (
                    <CloudSun className="h-5 w-5 text-blue-500 mr-2" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-green-500 mr-2" />
                  )}
                  <span className="font-bold">{alert.title}</span>
                  <span className="ml-auto text-xs text-gray-500">
                    {new Date(alert.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="text-gray-700 mb-1">{alert.content}</div>
                {alert.region && (
                  <div className="text-xs text-gray-500">Region: {alert.region}</div>
                )}
                <div className="text-xs text-gray-400">
                  {alert.type === 'weather' ? 'Weather Alert' : 'Paddy Disease Alert'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('admin.statistics.totalUsers')}</p>
              <p className="text-2xl font-bold text-gray-800">156</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Sprout className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('admin.statistics.totalScans')}</p>
              <p className="text-2xl font-bold text-gray-800">1,234</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('admin.statistics.diseaseReports')}</p>
              <p className="text-2xl font-bold text-gray-800">28</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <BarChart className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('admin.statistics.successRate')}</p>
              <p className="text-2xl font-bold text-gray-800">94%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages Overview Card */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{t('admin.messages.title')}</h2>
            <Link to="/admin/messages">
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                {t('common.seeAll')}
              </button>
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-800">{t('admin.messages.totalMessages')}</p>
                  <p className="text-sm text-gray-500">{t('admin.messages.totalMessagesDesc')}</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-800">{totalMessages}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-warning-500" />
                <div>
                  <p className="font-medium text-gray-800">{t('admin.messages.unreadMessages')}</p>
                  <p className="text-sm text-gray-500">{t('admin.messages.unreadMessagesDesc')}</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-warning-600">{unreadMessages}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-primary-500" />
                <div>
                  <p className="font-medium text-gray-800">{t('admin.messages.pendingMessages')}</p>
                  <p className="text-sm text-gray-500">{t('admin.messages.pendingMessagesDesc')}</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-primary-600">{pendingMessages}</span>
            </div>
          </div>
        </Card>

        {/* Recent Users Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('admin.statistics.recentUsers')}</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((user) => (
              <div key={user} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div>
                  <p className="font-medium text-gray-800">Farmer #{user}</p>
                  <p className="text-sm text-gray-500">{t('admin.statistics.joinedDaysAgo', { days: 2 })}</p>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                  {t('admin.statistics.active')}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;