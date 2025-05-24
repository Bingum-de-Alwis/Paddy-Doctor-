import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../context/AuthContext';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import Button from '../ui/Button';
import { useUser, useAuth } from '@clerk/clerk-react';

import { 
  Menu, 
  X, 
  Leaf, 
  Home, 
  Camera, 
  Info, 
  Bell, 
  LayoutDashboard, 
  MessageSquare, 
  LogOut, 
  LogIn 
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  // Use Clerk for authentication and role
  const isAuthenticated = isSignedIn;
  const userRole = user?.publicMetadata?.role;

  // Handle navbar transparency on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('common.home'), icon: <Home className="h-5 w-5" /> },
    { path: '/detection', label: t('common.detection'), icon: <Camera className="h-5 w-5" /> },
    { path: '/disease-info', label: t('common.diseaseInfo'), icon: <Info className="h-5 w-5" /> },
    { path: '/notifications', label: t('common.notifications'), icon: <Bell className="h-5 w-5" /> },
    { path: '/dashboard', label: t('common.dashboard'), icon: <LayoutDashboard className="h-5 w-5" />, authRequired: true },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav 
      className={`fixed w-full z-10 transition-all duration-200 ${
        isScrolled || !isHomePage 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary-600" />
            <span className={`font-bold text-xl ${
              isScrolled || !isHomePage ? 'text-primary-700' : 'text-primary-600'
            }`}>
              {t('common.appName')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks
              .filter(link => !link.authRequired || (link.authRequired && isAuthenticated))
              .map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary-50 text-primary-700'
                      : `${isScrolled || !isHomePage ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-800 hover:bg-white/20'}`
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            
            {/* Admin Dashboard Button - only show if NOT already admin */}
            {!isAuthenticated || userRole !== 'admin' ? (
              <Link
                to="/admin"
                className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 ml-2"
              >
                Admin Dashboard
              </Link>
            ) : null}
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Auth Button */}
            {isAuthenticated ? (
              <>
                {userRole === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    {t('common.admin')}
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  {t('common.logout')}
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/farmer/sign-in"
                  className="px-3 py-2 rounded-md text-sm font-medium text-primary-600 hover:bg-primary-50"
                >
                  {t('common.login')}
                </Link>
                <Link
                  to="/auth/farmer/sign-up"
                  className="px-3 py-2 rounded-md text-sm font-medium text-primary-600 hover:bg-primary-50"
                >
                  {t('common.register')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks
              .filter(link => !link.authRequired || (link.authRequired && isAuthenticated))
              .map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span className="ml-3">{link.label}</span>
                </Link>
              ))}
            
            {/* Admin Dashboard Button - only show if NOT already admin (mobile) */}
            {!isAuthenticated || userRole !== 'admin' ? (
              <Link
                to="/admin"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 border border-red-200 ml-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            ) : null}
            
            {/* Mobile Auth Links */}
            {isAuthenticated ? (
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                {t('common.logout')}
              </Button>
            ) : (
              <>
                <Link
                  to="/auth/farmer/sign-in"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('common.login')}
                </Link>
                <Link
                  to="/auth/farmer/sign-up"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('common.register')}
                </Link>
              </>
            )}
            
            {/* Mobile Language Switcher */}
            <div className="px-3 py-2 border-t border-gray-200 mt-2">
              <div className="flex items-center py-1">
                <GlobeIcon className="h-5 w-5 text-gray-500" />
                <span className="ml-3 text-gray-700 font-medium">Language</span>
              </div>
              
              <div className="mt-1 space-y-1">
                <button
                  onClick={() => {
                    changeLanguage('en');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-gray-50"
                >
                  English
                </button>
                <button
                  onClick={() => {
                    changeLanguage('si');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-gray-50"
                >
                  සිංහල
                </button>
                <button
                  onClick={() => {
                    changeLanguage('ta');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-gray-50"
                >
                  தமிழ்
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;