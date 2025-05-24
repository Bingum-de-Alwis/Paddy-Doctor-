import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, CloudSun, AlertTriangle } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface Notification {
  _id: string;
  title: string;
  content: string;
  type: 'weather' | 'regional';
  region?: string;
  isRead: boolean;
  createdAt: string;
}

const NotificationsPage = () => {
  const { t } = useTranslation();
  const { getToken } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const token = await getToken();
      
      const response = await fetch(`${API_URL}/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch notifications');
      }

      const data = await response.json();
      console.log('Fetched notifications:', data);
      setNotifications(data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const token = await getToken();
      
      const response = await fetch(`${API_URL}/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to mark notification as read');
      }

      const updatedNotification = await response.json();
      console.log('Successfully marked notification as read:', updatedNotification);

      // Update local state
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
      // You might want to show an error message to the user here
    }
  };

  const markAllAsRead = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const token = await getToken();
      
      const response = await fetch(`${API_URL}/notifications/read-all`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to mark all notifications as read');
      }

      const result = await response.json();
      console.log('Successfully marked all notifications as read:', result);

      // Update local state
      setNotifications(prevNotifications =>
        prevNotifications.map(notification => ({ ...notification, isRead: true }))
      );
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      // You might want to show an error message to the user here
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading notifications...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t('notifications.title')}</h1>
        {notifications.length > 0 && (
          <Button onClick={markAllAsRead} variant="primary">
            {t('notifications.markAllAsRead')}
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card className="p-6 text-center text-gray-500">
          {t('notifications.noNotifications')}
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map(notification => (
            <Card
              key={notification._id}
              className={`p-4 border-l-4 ${
                notification.isRead ? 'border-gray-300' : 'border-warning-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {notification.type === 'weather' ? (
                    <CloudSun className="h-5 w-5 text-blue-500 mt-1" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-green-500 mt-1" />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                    <p className="text-gray-600 mt-1">{notification.content}</p>
                    {notification.region && (
                      <p className="text-sm text-gray-500 mt-1">
                        Region: {notification.region}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {!notification.isRead && (
                  <Button
                    onClick={() => markAsRead(notification._id)}
                    variant="secondary"
                    size="sm"
                  >
                    {t('notifications.markAsRead')}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;