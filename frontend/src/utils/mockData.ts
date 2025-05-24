// Mock data for demonstration purposes

// Disease types
export type Disease = {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  symptoms: string[];
  causes: string[];
  images: string[];
  confidence?: number;
};

// Mock disease data
export const diseases: Disease[] = [
  {
    id: 'rice-blast',
    name: 'Blast',
    scientificName: 'Magnaporthe oryzae',
    description: 'Rice blast is one of the most destructive diseases of rice, affecting leaves, nodes, necks, and panicles. It causes diamond-shaped lesions with gray centers and brown borders.',
    symptoms: [
      'Diamond-shaped lesions on leaves',
      'Gray centers with brown borders',
      'Lesions may coalesce and kill leaves',
      'Can infect neck and panicle, causing yield loss'
    ],
    causes: [
      'Fungal pathogen Magnaporthe oryzae',
      'High humidity and leaf wetness',
      'Dense planting and excessive nitrogen',
      'Temperatures between 24-28°C'
    ],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/a/ae/Rice_blast.jpg'
    ]
  },
  {
    id: 'bacterial-leaf-blight',
    name: 'Bacterial Leaf Blight',
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    description: 'Bacterial leaf blight causes yellowing and drying of leaves, starting from the tips and margins. It is most severe during the rainy season and can cause significant yield loss.',
    symptoms: [
      'Yellowing and drying of leaf tips and margins',
      'Water-soaked stripes along leaf veins',
      'Leaves wilt and die prematurely',
      'V-shaped lesions progressing from leaf tip'
    ],
    causes: [
      'Bacterial pathogen Xanthomonas oryzae pv. oryzae',
      'Rainy weather and standing water',
      'Infected seeds or plant debris',
      'Wounds from insects or wind'
    ],
    images: [
      'https://www.invasive.org/images/768x512/1118208.jpg'
    ]
  },
  {
    id: 'bacterial-leaf-streak',
    name: 'Bacterial Leaf Streak',
    scientificName: 'Xanthomonas oryzae pv. oryzicola',
    description: 'Bacterial leaf streak is characterized by water-soaked lesions that develop into yellow to orange-brown streaks along the leaf veins.',
    symptoms: [
      'Water-soaked lesions on leaves',
      'Yellow to orange-brown streaks',
      'Lesions follow leaf veins',
      'Severe cases can cause leaf death'
    ],
    causes: [
      'Bacterial pathogen Xanthomonas oryzae pv. oryzicola',
      'High humidity and rainfall',
      'Infected seeds and plant debris',
      'Wounds from insects or wind'
    ],
    images: [
      'https://www.invasive.org/images/768x512/1118208.jpg'
    ]
  },
  {
    id: 'brown-spot',
    name: 'Brown Spot',
    scientificName: 'Cochliobolus miyabeanus',
    description: 'Brown spot is a fungal disease that causes small, circular to oval brown spots on leaves, sheaths, and panicles.',
    symptoms: [
      'Small, circular to oval brown spots',
      'Spots with gray centers and brown margins',
      'Lesions may coalesce and kill leaves',
      'Can affect grain quality'
    ],
    causes: [
      'Fungal pathogen Cochliobolus miyabeanus',
      'Poor soil fertility',
      'High humidity and rainfall',
      'Infected seeds and plant debris'
    ],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/1/15/RiceSheathArk.jpg'
    ]
  },
  {
    id: 'dead-heart',
    name: 'Dead Heart',
    scientificName: 'Scirpophaga incertulas',
    description: 'Dead heart is caused by stem borers that feed inside the stem, causing the central shoot to die and turn brown.',
    symptoms: [
      'Dead central shoot (dead heart)',
      'Brown, dried leaves',
      'Hollow stems with feeding marks',
      'Reduced tillering and yield'
    ],
    causes: [
      'Stem borer larvae feeding',
      'High nitrogen fertilization',
      'Dense planting',
      'Continuous rice cropping'
    ],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/1/15/RiceSheathArk.jpg'
    ]
  },
  {
    id: 'downy-mildew',
    name: 'Downy Mildew',
    scientificName: 'Sclerophthora macrospora',
    description: 'Downy mildew causes yellowing and stunting of plants, with white fungal growth on the underside of leaves.',
    symptoms: [
      'Yellowing of leaves',
      'White fungal growth on leaf undersides',
      'Stunted plant growth',
      'Reduced tillering'
    ],
    causes: [
      'Fungal pathogen Sclerophthora macrospora',
      'High humidity and rainfall',
      'Poor drainage',
      'Infected seeds'
    ],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/1/15/RiceSheathArk.jpg'
    ]
  },
  {
    id: 'hispa',
    name: 'Hispa',
    scientificName: 'Dicladispa armigera',
    description: 'Rice hispa is a leaf-feeding beetle that causes characteristic white streaks on leaves and can defoliate plants.',
    symptoms: [
      'White streaks on leaves',
      'Leaf mining damage',
      'Defoliation in severe cases',
      'Reduced photosynthesis'
    ],
    causes: [
      'Rice hispa beetle feeding',
      'High nitrogen fertilization',
      'Dense planting',
      'Continuous rice cropping'
    ],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/1/15/RiceSheathArk.jpg'
    ]
  },
  {
    id: 'sheath-blight',
    name: 'Sheath Blight',
    scientificName: 'Rhizoctonia solani',
    description: 'Sheath blight is a fungal disease that causes oval or irregular lesions on the leaf sheath near the water line, which can spread to leaves and panicles.',
    symptoms: [
      'Oval or irregular lesions on leaf sheaths',
      'Lesions with gray centers and brown borders',
      'Lesions may join and girdle the sheath',
      'Infection can spread to leaves and panicles'
    ],
    causes: [
      'Fungal pathogen Rhizoctonia solani',
      'High humidity and dense canopy',
      'Warm temperatures (28-32°C)',
      'Continuous rice cropping'
    ],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/1/15/RiceSheathArk.jpg'
    ]
  },
  {
    id: 'tungro',
    name: 'Tungro',
    scientificName: 'Rice tungro virus',
    description: 'Tungro is a viral disease transmitted by leafhoppers, causing stunting, yellowing, and reduced tillering.',
    symptoms: [
      'Stunted plant growth',
      'Yellow-orange leaf discoloration',
      'Reduced tillering',
      'Delayed flowering'
    ],
    causes: [
      'Rice tungro virus',
      'Green leafhopper vectors',
      'Continuous rice cropping',
      'High nitrogen fertilization'
    ],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/1/15/RiceSheathArk.jpg'
    ]
  }
];

// Mock detected results for demonstration
export type DetectionResult = {
  id: string;
  imageUrl: string;
  disease: Disease;
  confidence: number;
  date: string;
  location?: string;
};

export const detectionResults: DetectionResult[] = [
  {
    id: 'result-1',
    imageUrl: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg',
    disease: {
      ...diseases[0],
      confidence: 87
    },
    confidence: 87,
    date: '2023-04-15',
    location: 'Anuradhapura'
  },
  {
    id: 'result-2',
    imageUrl: 'https://images.pexels.com/photos/2260833/pexels-photo-2260833.jpeg',
    disease: {
      ...diseases[1],
      confidence: 92
    },
    confidence: 92,
    date: '2023-05-20',
    location: 'Polonnaruwa'
  },
  {
    id: 'result-3',
    imageUrl: 'https://images.pexels.com/photos/1484763/pexels-photo-1484763.jpeg',
    disease: {
      ...diseases[2],
      confidence: 78
    },
    confidence: 78,
    date: '2023-06-05',
    location: 'Kurunegala'
  }
];

// Mock treatment recommendations
export type TreatmentRecommendation = {
  id: string;
  diseaseId: string;
  organic: string[];
  chemical: string[];
  preventive: string[];
};

export const treatmentRecommendations: TreatmentRecommendation[] = [
  {
    id: 'treatment-1',
    diseaseId: 'rice-blast',
    organic: [
      'Use disease-resistant rice varieties',
      'Adjust planting date to avoid periods favorable for infection',
      'Apply silicon fertilizers to strengthen plant resistance',
      'Use balanced fertilization, avoiding excessive nitrogen'
    ],
    chemical: [
      'Apply propiconazole at recommended rates',
      'Use tricyclazole as a preventive measure',
      'Apply isoprothiolane during early infection stages',
      'Alternate fungicides with different modes of action to prevent resistance'
    ],
    preventive: [
      'Maintain good drainage in the field',
      'Manage irrigation to reduce leaf wetness duration',
      'Avoid dense planting that creates a humid microclimate',
      'Remove and destroy infected plant debris'
    ]
  },
  {
    id: 'treatment-2',
    diseaseId: 'sheathBlight',
    organic: [
      'Use wider plant spacing for better air circulation',
      'Incorporate effective microorganisms like Trichoderma in soil',
      'Apply rice straw compost to increase soil biodiversity',
      'Use silicon-rich amendments to strengthen plant cell walls'
    ],
    chemical: [
      'Apply azoxystrobin at early infection stages',
      'Use validamycin as a preventive treatment',
      'Apply hexaconazole for effective control',
      'Use propiconazole as an alternative fungicide'
    ],
    preventive: [
      'Avoid excessive nitrogen fertilization',
      'Practice field sanitation by removing infected debris',
      'Burn or deeply bury infected stubble after harvest',
      'Use balanced NPK fertilization'
    ]
  },
  {
    id: 'treatment-3',
    diseaseId: 'brown-spot',
    organic: [
      'Correct soil nutrient deficiencies, especially potassium',
      'Apply compost tea as a foliar spray',
      'Use crop rotation with non-host crops',
      'Apply neem oil as a botanical fungicide'
    ],
    chemical: [
      'Apply mancozeb for preventive treatment',
      'Use propiconazole for active infections',
      'Apply iprodione as an alternative fungicide',
      'Use carbendazim during seed treatment'
    ],
    preventive: [
      'Use disease-free seeds',
      'Treat seeds with hot water (53-54°C for 10-12 minutes)',
      'Ensure balanced fertilization',
      'Avoid water stress during critical growth stages'
    ]
  }
];

// Mock notifications and alerts
export type Alert = {
  id: string;
  title: string;
  message: string;
  type: 'regional' | 'weather' | 'government';
  date: string;
  region?: string;
  isRead: boolean;
};

export const alerts: Alert[] = [
  {
    id: 'alert-1',
    title: 'Rice Blast Alert in Anuradhapura',
    message: 'High risk of rice blast disease reported in multiple fields across Anuradhapura district. Farmers are advised to monitor their crops closely and take preventive measures.',
    type: 'regional',
    date: '2023-06-10',
    region: 'Anuradhapura',
    isRead: false
  },
  {
    id: 'alert-2',
    title: 'Heavy Rainfall Expected',
    message: 'Meteorological Department predicts heavy rainfall in Eastern and North Central Provinces for the next 3 days. This weather condition may increase the risk of fungal diseases in paddy fields.',
    type: 'weather',
    date: '2023-06-08',
    isRead: true
  },
  {
    id: 'alert-3',
    title: 'New Fungicide Distribution Program',
    message: 'The Ministry of Agriculture announces a subsidized fungicide distribution program starting next week. Registered farmers can collect supplies from their local agricultural centers.',
    type: 'government',
    date: '2023-06-05',
    isRead: false
  },
  {
    id: 'alert-4',
    title: 'Brown Spot Outbreak in Southern Province',
    message: 'Multiple reports of brown spot disease have been received from Hambantota and Matara districts. Farmers are advised to inspect their crops and apply appropriate treatments if symptoms are observed.',
    type: 'regional',
    date: '2023-06-01',
    region: 'Southern Province',
    isRead: true
  }
];

// Mock FAQ data
export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How accurate is the disease detection system?',
    answer: 'Our detection system has an accuracy rate of approximately 85-95% depending on the quality of the submitted image and the stage of the disease. For best results, we recommend taking clear, well-lit photos that focus specifically on the affected area.'
  },
  {
    id: 'faq-2',
    question: 'What should I do if the detection system cannot identify the disease?',
    answer: 'If our system cannot identify the disease, we recommend: 1) Taking another photo with better lighting and focus, 2) Consulting with your local agricultural extension officer, or 3) Contacting our support team for further assistance.'
  },
  {
    id: 'faq-3',
    question: 'How can I prevent rice diseases before they appear?',
    answer: 'Preventive measures include: using resistant varieties, practicing crop rotation, maintaining proper field drainage, balanced fertilization, proper spacing between plants, timely planting, and regular field monitoring. Our Disease Information section provides specific prevention tips for each disease.'
  },
  {
    id: 'faq-4',
    question: 'Are the recommended treatments safe for organic farming?',
    answer: 'Yes, we provide separate recommendations for organic farming practices. Our organic recommendations focus on cultural practices, biological controls, and organic-approved treatments that comply with organic certification requirements.'
  },
  {
    id: 'faq-5',
    question: 'How often should I check my fields for diseases?',
    answer: 'We recommend checking your fields at least once a week during regular growing conditions, and more frequently (2-3 times per week) during high-risk periods such as rainy season or when disease alerts have been issued for your region.'
  }
];

// Message types
export type Message = {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerEmail: string;
  subject: string;
  content: string;
  date: string;
  isRead: boolean;
  status: 'pending' | 'replied' | 'resolved';
};

export const messages: Message[] = [
  {
    id: 'msg-1',
    farmerId: 'farmer-1',
    farmerName: 'John Doe',
    farmerEmail: 'john@example.com',
    subject: 'Rice Blast Treatment Query',
    content: 'I have been following the recommended treatment for rice blast, but I\'m not seeing improvement. Could you please provide additional guidance?',
    date: '2023-06-15T10:30:00',
    isRead: false,
    status: 'pending'
  },
  {
    id: 'msg-2',
    farmerId: 'farmer-2',
    farmerName: 'Jane Smith',
    farmerEmail: 'jane@example.com',
    subject: 'New Disease Symptoms',
    content: 'I\'ve noticed some unusual symptoms in my paddy field. The leaves are turning yellow with brown spots. Could this be a new disease?',
    date: '2023-06-14T15:45:00',
    isRead: true,
    status: 'replied'
  },
  {
    id: 'msg-3',
    farmerId: 'farmer-3',
    farmerName: 'Robert Wilson',
    farmerEmail: 'robert@example.com',
    subject: 'Thank you for the help',
    content: 'The treatment recommendations worked perfectly! My crop is now healthy and growing well. Thank you for your assistance.',
    date: '2023-06-13T09:15:00',
    isRead: true,
    status: 'resolved'
  },
  {
    id: 'msg-4',
    farmerId: 'farmer-4',
    farmerName: 'Maria Garcia',
    farmerEmail: 'maria@example.com',
    subject: 'Weather Alert Question',
    content: 'I received a weather alert for my region. Should I take any special precautions for my paddy field?',
    date: '2023-06-12T14:20:00',
    isRead: false,
    status: 'pending'
  }
];