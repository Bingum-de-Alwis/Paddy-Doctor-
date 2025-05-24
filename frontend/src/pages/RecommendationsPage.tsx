import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield, Droplets, Leaf, FlaskRound, Bug, ChevronRight, AlertCircle, Info } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { recommendations } from '../utils/recommendations';
import { diseases } from '../utils/mockData';

const RecommendationsPage: React.FC = () => {
  const { diseaseId } = useParams<{ diseaseId: string }>();
  const { t } = useTranslation();

  const recommendation = recommendations.find(rec => rec.id === diseaseId);
  
  // Find disease info by matching the disease name instead of ID
  const diseaseInfo = diseases.find(d => 
    d.name.toLowerCase() === recommendation?.disease.toLowerCase()
  );

  useEffect(() => {
    console.log('Disease ID:', diseaseId);
    console.log('Recommendation:', recommendation);
    console.log('Disease Info:', diseaseInfo);
  }, [diseaseId, recommendation, diseaseInfo]);

  if (!recommendation) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-3">{t('common.error')}</h1>
          <p className="text-gray-600 mb-6">Recommendations not found</p>
          <Link to="/detection">
            <Button variant="primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('detection.title')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center mb-4">
              <Link to="/detection" className="text-gray-500 hover:text-gray-700 mr-4">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{recommendation.disease}</h1>
            </div>
            <p className="text-gray-600 ml-9">
              Comprehensive management strategies and recommendations for {recommendation.disease.toLowerCase()}
            </p>
          </div>

          {/* Disease Information Section */}
          {diseaseInfo && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center mb-4">
                <Info className="h-5 w-5 text-primary-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">About {diseaseInfo.name}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700">{diseaseInfo.description}</p>
                </div>

                {/* Scientific Name */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Scientific Name</h3>
                  <p className="text-gray-700 italic">{diseaseInfo.scientificName}</p>
                </div>

                {/* Symptoms */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Common Symptoms</h3>
                  <ul className="space-y-2">
                    {diseaseInfo.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Causes */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Causes</h3>
                  <ul className="space-y-2">
                    {diseaseInfo.causes.map((cause, index) => (
                      <li key={index} className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preventive Measures */}
            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center text-lg">
                  <Shield className="mr-2 h-5 w-5 text-primary-500" />
                  Preventive Measures
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {recommendation.preventiveMeasures.map((measure, index) => (
                    <li key={index} className="flex items-start group">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 group-hover:text-primary-600 transition-colors duration-200">
                        {measure}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Treatment Options */}
            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center text-lg">
                  <Droplets className="mr-2 h-5 w-5 text-primary-500" />
                  Treatment Options
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {recommendation.treatmentOptions.map((option, index) => (
                    <li key={index} className="flex items-start group">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 group-hover:text-primary-600 transition-colors duration-200">
                        {option}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Cultural Practices */}
            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center text-lg">
                  <Leaf className="mr-2 h-5 w-5 text-primary-500" />
                  Cultural Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {recommendation.culturalPractices.map((practice, index) => (
                    <li key={index} className="flex items-start group">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 group-hover:text-primary-600 transition-colors duration-200">
                        {practice}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Chemical Control */}
            <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center text-lg">
                  <FlaskRound className="mr-2 h-5 w-5 text-primary-500" />
                  Chemical Control
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {recommendation.chemicalControl.map((chemical, index) => (
                    <li key={index} className="flex items-start group">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 group-hover:text-primary-600 transition-colors duration-200">
                        {chemical}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Biological Control */}
            <Card className="md:col-span-2 bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center text-lg">
                  <Bug className="mr-2 h-5 w-5 text-primary-500" />
                  Biological Control
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {recommendation.biologicalControl.map((control, index) => (
                    <li key={index} className="flex items-start group">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 group-hover:text-primary-600 transition-colors duration-200">
                        {control}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <Link to="/detection">
              <Button variant="outline" className="px-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Detection
              </Button>
            </Link>
            <Link to="/disease-info">
              <Button variant="primary" className="px-6">
                Learn More
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;