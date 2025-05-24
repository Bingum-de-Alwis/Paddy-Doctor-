import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, LogIn, Leaf } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';

type FormData = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setError(null);
    setIsLoading(true);

    try {
      await login(data.email, data.password);
      
      // Get the redirect path from location state or default to dashboard
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from);
    } catch (err) {
      setError(t('errors.loginFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      
      <div className="mx-auto w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center justify-center">
            <Leaf className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-primary-700">
              {t('common.appName')}
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            {t('auth.login.title')}
          </h1>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          {error && (
            <div className="mb-4 p-3 bg-error-100 text-error-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label={t('auth.login.email')}
              type="email"
              id="email"
              icon={<Mail className="h-5 w-5" />}
              error={errors.email?.message}
              {...register('email', {
                required: t('errors.required'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('errors.invalidEmail'),
                },
              })}
            />

            <Input
              label={t('auth.login.password')}
              type="password"
              id="password"
              icon={<Lock className="h-5 w-5" />}
              error={errors.password?.message}
              {...register('password', {
                required: t('errors.required'),
                minLength: {
                  value: 4, // Relaxed for demo
                  message: t('errors.passwordLength'),
                },
              })}
            />

            <div className="mt-6">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isLoading}
              >
                {!isLoading && <LogIn className="mr-2 h-4 w-4" />}
                {t('common.login')}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link to="/register" className="text-sm text-primary-600 hover:text-primary-500">
              {t('auth.login.noAccount')} {t('auth.login.signUp')}
            </Link>
          </div>
          
          <div className="mt-4 border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500 text-center">
              Demo accounts:
              <br />
              Farmer: farmer@example.com / password
              <br />
              Admin: admin@example.com / password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;