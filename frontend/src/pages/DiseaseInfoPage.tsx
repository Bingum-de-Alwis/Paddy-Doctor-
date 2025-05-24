import React, { useEffect, useState } from 'react';
import { Disease } from '../types/disease';
import { fetchDiseases } from '../services/diseaseService';

const DiseaseInfoPage = () => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

  useEffect(() => {
    const loadDiseases = async () => {
      try {
        const response = await fetchDiseases();
        setDiseases(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load disease information');
        setLoading(false);
      }
    };

    loadDiseases();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Rice Disease Information</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diseases.map((disease, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            onClick={() => setSelectedDisease(disease)}
          >
            <div className="relative h-48">
              <img
                src={disease.images[1]?.url || disease.images[0]?.url}
                alt={disease.images[1]?.alt || disease.images[0]?.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {disease.causativeAgent.split(',')[0].trim()}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-2">
                {disease.symptoms[0]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Disease Detail Modal */}
      {selectedDisease && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedDisease.causativeAgent.split(',')[0].trim()}
                </h2>
                <button
                  onClick={() => setSelectedDisease(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Causative Agent</h3>
                  <p className="text-gray-700 mb-4">{selectedDisease.causativeAgent}</p>

                  <h3 className="text-lg font-semibold mb-2">Affected Parts</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4">
                    {selectedDisease.affectedParts.map((part, index) => (
                      <li key={index}>{part}</li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">Symptoms</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedDisease.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Images</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedDisease.images.slice(1).map((image, index) => (
                      <div key={index} className="relative h-40">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseInfoPage;