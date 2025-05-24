import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const FarmerSignInPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.farmer.signIn.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.farmer.signIn.subtitle')}{' '}
            <Link to="/auth/farmer/sign-up" className="font-medium text-primary-600 hover:text-primary-500">
              {t('auth.farmer.signIn.createAccount')}
            </Link>
          </p>
        </div>
        <div className="mt-8">
          <SignIn
            path="/auth/farmer/sign-in"
            routing="path"
            signUpUrl="/auth/farmer/sign-up"
            afterSignInUrl="/dashboard"
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

export default FarmerSignInPage; 