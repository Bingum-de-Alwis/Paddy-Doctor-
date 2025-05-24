import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Leaf, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-700 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6" />
              <span className="text-xl font-bold">{t('common.appName')}</span>
            </div>
            <p className="text-primary-100 mt-2 max-w-xs">
              Helping Sri Lankan farmers identify and treat paddy diseases for better harvests and sustainable agriculture.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-white hover:text-primary-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-100 hover:text-white">
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link to="/detection" className="text-primary-100 hover:text-white">
                  {t('common.detection')}
                </Link>
              </li>
              <li>
                <Link to="/disease-info" className="text-primary-100 hover:text-white">
                  {t('common.diseaseInfo')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-primary-100 hover:text-white">
                  {t('common.dashboard')}
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-primary-100 hover:text-white">
                  {t('common.feedback')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Disease Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Diseases</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/disease-info?disease=rice-blast" className="text-primary-100 hover:text-white">
                  {t('home.diseaseItems.riceBlast.name')}
                </Link>
              </li>
              <li>
                <Link to="/disease-info?disease=sheath-blight" className="text-primary-100 hover:text-white">
                  {t('home.diseaseItems.sheathBlight.name')}
                </Link>
              </li>
              <li>
                <Link to="/disease-info?disease=brown-spot" className="text-primary-100 hover:text-white">
                  {t('home.diseaseItems.brownSpot.name')}
                </Link>
              </li>
              <li>
                <Link to="/disease-info" className="text-primary-100 hover:text-white">
                  View All Diseases
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-primary-200" />
                <span className="text-primary-100">paddydoc@example.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 text-primary-200" />
                <span className="text-primary-100">+94 11 234 5678</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-600 mt-12 pt-8 text-center text-primary-200">
          <p>
            &copy; {currentYear} {t('common.appName')}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;