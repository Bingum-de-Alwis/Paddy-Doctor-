import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        <AlertCircle className="h-16 w-16 text-warning-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-3 text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="primary">
            <Home className="mr-2 h-4 w-4" />
            {t('common.home')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;