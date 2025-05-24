import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Activity, AlertCircle, Info, ThumbsUp, ThumbsDown, ArrowLeft, FileText, Camera } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { DetectionResult, detectionResults } from '../utils/mockData';

const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For demo purposes, we'll use the mock data
    try {
      // First try to get from sessionStorage (if coming from detection page)
      const storedResult = sessionStorage.getItem('detection_result');
      if (storedResult) {
        const parsedResult = JSON.parse(storedResult);
        setResult(parsedResult);
      } else if (id) {
        // If no stored result, try to find in mock data
        const foundResult = detectionResults.find(r => r.id === id);
        if (foundResult) {
          setResult(foundResult);
        } else {
          setError('Result not found');
        }
      } else {
        setError('No result ID provided');
      }
    } catch (error) {
      setError('Failed to load result');
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto text-center">
          <AlertCircle className="h-16 w-16 text-error-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-3">{t('common.error')}</h1>
          <p className="text-gray-600 mb-6">{error || 'Result not found'}</p>
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

  // Helper function to determine color based on confidence
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-success-500';
    if (confidence >= 70) return 'text-primary-500';
    return 'text-warning-500';
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/detection" className="text-gray-500 hover:text-gray-700 mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">{t('results.title')}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Detection Result */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t('results.disease')}: {result.disease.name}</CardTitle>
              <CardDescription>
                {result.disease.scientificName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-full md:w-1/2">
                  <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
                    {result.imageUrl ? (
                      <img
                        src={result.imageUrl}
                        alt={result.disease.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <AlertCircle className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <div className="mb-6">
                    <p className="text-gray-600 mb-2">{t('results.confidence')}</p>
                    <div className="flex items-center">
                      <span className={`text-3xl font-bold ${getConfidenceColor(result.confidence)}`}>
                        {result.confidence}%
                      </span>
                      <Activity className={`ml-2 h-5 w-5 ${getConfidenceColor(result.confidence)}`} />
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div
                        className={`h-2.5 rounded-full ${
                          result.confidence >= 90 ? 'bg-success-500' : 
                          result.confidence >= 70 ? 'bg-primary-500' : 'bg-warning-500'
                        }`}
                        style={{ width: `${result.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    {result.disease.description.substring(0, 120)}...
                  </p>
                  
                  <div className="space-y-3">
                    <Link to={`/recommendations/${result.disease.id.replace('rice-', '')}`}>
                      <Button variant="primary" className="w-full">
                        {t('results.viewRecommendations')}
                      </Button>
                    </Link>
                    <Link to={`/disease-info?disease=${result.disease.id}`}>
                      <Button variant="outline" className="w-full">
                        <Info className="mr-2 h-4 w-4" />
                        {t('results.diseaseInfo')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col sm:flex-row gap-3 bg-gray-50 rounded-b-lg">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="text-gray-700">
                  <FileText className="mr-2 h-4 w-4" />
                  {t('results.saveResults')}
                </Button>
                <Link to="/detection">
                  <Button variant="outline" size="sm" className="text-gray-700">
                    <Camera className="mr-2 h-4 w-4" />
                    {t('results.newDetection')}
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-2 sm:ml-auto">
                <span className="text-sm text-gray-500 mr-2">{t('results.shareFeedback')}</span>
                <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200">
                  <ThumbsUp className="h-4 w-4 text-gray-700" />
                </button>
                <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200">
                  <ThumbsDown className="h-4 w-4 text-gray-700" />
                </button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;