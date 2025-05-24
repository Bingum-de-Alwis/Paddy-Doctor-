import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Upload, Camera, Image, X, HelpCircle, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { diseases } from '../utils/mockData';

const DetectionPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };
  
  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0] || null;
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };
  
  // Clear selected file
  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Open camera
  const handleOpenCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.capture = 'environment';
      fileInputRef.current.click();
    }
  };
  
  // Open file browser
  const handleBrowseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };
  
  // Handle submission and analysis
  const handleAnalyzeImage = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to analyze image');
      }
      
      // Generate a result ID
      const resultId = `result-${Date.now()}`;
      
      // Store the result in sessionStorage for access in the result page
      const detectionResult = {
        id: resultId,
        imageUrl: previewUrl,
        disease: result.disease,
        confidence: result.confidence,
        date: new Date().toISOString(),
      };
      
      sessionStorage.setItem('detection_result', JSON.stringify(detectionResult));
      
      // Navigate to the result page
      navigate(`/result/${resultId}`);
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Failed to analyze image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">{t('detection.title')}</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            {t('detection.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {!previewUrl ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 h-72 flex flex-col items-center justify-center transition-colors ${
                  isDragging 
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium mb-2">{t('detection.dragDrop')}</p>
                <p className="text-gray-500 mb-4">{t('detection.or')}</p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleBrowseFiles}>
                    <Image className="mr-2 h-4 w-4" />
                    {t('detection.browse')}
                  </Button>
                  <Button variant="secondary" onClick={handleOpenCamera}>
                    <Camera className="mr-2 h-4 w-4" />
                    {t('detection.takePhoto')}
                  </Button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
                  <h3 className="font-medium">{t('detection.imagePreview')}</h3>
                  <button
                    className="text-gray-500 hover:text-error-500"
                    onClick={handleClearFile}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4 flex justify-center items-center bg-white">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-64 max-w-full object-contain"
                  />
                </div>
                <div className="p-4 bg-gray-50 border-t">
                  <Button 
                    variant="primary" 
                    className="w-full" 
                    onClick={handleAnalyzeImage}
                    isLoading={isLoading}
                  >
                    {!isLoading && <Check className="mr-2 h-4 w-4" />}
                    {t('detection.analyzeImage')}
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5 text-primary-500" />
                  {t('detection.tips.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-primary-100 text-primary-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">
                      1
                    </div>
                    <span className="text-gray-700">{t('detection.tips.tip1')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-100 text-primary-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">
                      2
                    </div>
                    <span className="text-gray-700">{t('detection.tips.tip2')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-100 text-primary-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">
                      3
                    </div>
                    <span className="text-gray-700">{t('detection.tips.tip3')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-100 text-primary-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">
                      4
                    </div>
                    <span className="text-gray-700">{t('detection.tips.tip4')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectionPage;