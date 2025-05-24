import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const AdminSignInPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.admin.signIn.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.admin.signIn.subtitle')}
          </p>
        </div>
        <div className="mt-8">
          <SignIn
            path="/auth/admin/sign-in"
            routing="path"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-primary-600 hover:bg-primary-700',
                footerActionLink: 'text-primary-600 hover:text-primary-700',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSignInPage; 