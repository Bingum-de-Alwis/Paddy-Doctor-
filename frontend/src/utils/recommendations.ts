export interface Recommendation {
  id: string;
  disease: string;
  preventiveMeasures: string[];
  treatmentOptions: string[];
  culturalPractices: string[];
  chemicalControl: string[];
  biologicalControl: string[];
}

export const recommendations: Recommendation[] = [
  {
    id: 'bacterial-leaf-blight',
    disease: 'Bacterial Leaf Blight',
    preventiveMeasures: [
      'Use disease-free seeds',
      'Practice crop rotation',
      'Maintain proper field drainage',
      'Avoid excessive nitrogen fertilization'
    ],
    treatmentOptions: [
      'Apply copper-based bactericides',
      'Use streptomycin sulfate',
      'Apply kasugamycin'
    ],
    culturalPractices: [
      'Remove and destroy infected plant debris',
      'Maintain proper plant spacing',
      'Control weeds in and around the field',
      'Avoid overhead irrigation'
    ],
    chemicalControl: [
      'Copper oxychloride (0.3%)',
      'Streptomycin sulfate (0.1%)',
      'Kasugamycin (0.1%)'
    ],
    biologicalControl: [
      'Use biocontrol agents like Pseudomonas fluorescens',
      'Apply Bacillus subtilis',
      'Use Trichoderma viride'
    ]
  },
  {
    id: 'bacterial-leaf-streak',
    disease: 'Bacterial Leaf Streak',
    preventiveMeasures: [
      'Use certified disease-free seeds',
      'Practice field sanitation',
      'Maintain proper water management',
      'Avoid excessive nitrogen application'
    ],
    treatmentOptions: [
      'Apply copper-based bactericides',
      'Use streptomycin sulfate',
      'Apply kasugamycin'
    ],
    culturalPractices: [
      'Remove infected plant debris',
      'Maintain proper plant spacing',
      'Control weeds',
      'Avoid overhead irrigation'
    ],
    chemicalControl: [
      'Copper oxychloride (0.3%)',
      'Streptomycin sulfate (0.1%)',
      'Kasugamycin (0.1%)'
    ],
    biologicalControl: [
      'Use Pseudomonas fluorescens',
      'Apply Bacillus subtilis',
      'Use Trichoderma viride'
    ]
  },
  {
    id: 'blast',
    disease: 'Blast',
    preventiveMeasures: [
      'Use resistant varieties',
      'Practice crop rotation',
      'Maintain proper field drainage',
      'Avoid excessive nitrogen fertilization'
    ],
    treatmentOptions: [
      'Apply tricyclazole',
      'Use isoprothiolane',
      'Apply azoxystrobin'
    ],
    culturalPractices: [
      'Remove infected plant debris',
      'Maintain proper plant spacing',
      'Control weeds',
      'Avoid overhead irrigation'
    ],
    chemicalControl: [
      'Tricyclazole (0.1%)',
      'Isoprothiolane (0.1%)',
      'Azoxystrobin (0.1%)'
    ],
    biologicalControl: [
      'Use Pseudomonas fluorescens',
      'Apply Bacillus subtilis',
      'Use Trichoderma viride'
    ]
  },
  {
    id: 'brown-spot',
    disease: 'Brown Spot',
    preventiveMeasures: [
      'Use disease-free seeds',
      'Practice crop rotation',
      'Maintain proper field drainage',
      'Avoid excessive nitrogen fertilization'
    ],
    treatmentOptions: [
      'Apply mancozeb',
      'Use copper oxychloride',
      'Apply propiconazole'
    ],
    culturalPractices: [
      'Remove infected plant debris',
      'Maintain proper plant spacing',
      'Control weeds',
      'Avoid overhead irrigation'
    ],
    chemicalControl: [
      'Mancozeb (0.2%)',
      'Copper oxychloride (0.3%)',
      'Propiconazole (0.1%)'
    ],
    biologicalControl: [
      'Use Pseudomonas fluorescens',
      'Apply Bacillus subtilis',
      'Use Trichoderma viride'
    ]
  },
  {
    id: 'dead-heart',
    disease: 'Dead Heart',
    preventiveMeasures: [
      'Use resistant varieties',
      'Practice crop rotation',
      'Maintain proper field drainage',
      'Avoid excessive nitrogen fertilization'
    ],
    treatmentOptions: [
      'Apply carbofuran',
      'Use fipronil',
      'Apply imidacloprid'
    ],
    culturalPractices: [
      'Remove infected plant debris',
      'Maintain proper plant spacing',
      'Control weeds',
      'Avoid overhead irrigation'
    ],
    chemicalControl: [
      'Carbofuran (0.1%)',
      'Fipronil (0.1%)',
      'Imidacloprid (0.1%)'
    ],
    biologicalControl: [
      'Use Beauveria bassiana',
      'Apply Metarhizium anisopliae',
      'Use Bacillus thuringiensis'
    ]
  },
  {
    id: 'downy-mildew',
    disease: 'Downy Mildew',
    preventiveMeasures: [
      'Use disease-free seeds',
      'Practice crop rotation',
      'Maintain proper field drainage',
      'Avoid excessive nitrogen fertilization'
    ],
    treatmentOptions: [
      'Apply metalaxyl',
      'Use fosetyl-aluminium',
      'Apply propamocarb'
    ],
    culturalPractices: [
      'Remove infected plant debris',
      'Maintain proper plant spacing',
      'Control weeds',
      'Avoid overhead irrigation'
    ],
    chemicalControl: [
      'Metalaxyl (0.1%)',
      'Fosetyl-aluminium (0.1%)',
      'Propamocarb (0.1%)'
    ],
    biologicalControl: [
      'Use Pseudomonas fluorescens',
      'Apply Bacillus subtilis',
      'Use Trichoderma viride'
    ]
  },
  {
    id: 'hispa',
    disease: 'Hispa',
    preventiveMeasures: [
      'Use resistant varieties',
      'Practice crop rotation',
      'Maintain proper field drainage',
      'Avoid excessive nitrogen fertilization'
    ],
    treatmentOptions: [
      'Apply carbaryl',
      'Use malathion',
      'Apply quinalphos'
    ],
    culturalPractices: [
      'Remove infected plant debris',
      'Maintain proper plant spacing',
      'Control weeds',
      'Avoid overhead irrigation'
    ],
    chemicalControl: [
      'Carbaryl (0.1%)',
      'Malathion (0.1%)',
      'Quinalphos (0.1%)'
    ],
    biologicalControl: [
      'Use Beauveria bassiana',
      'Apply Metarhizium anisopliae',
      'Use Bacillus thuringiensis'
    ]
  },
  {
    id: 'normal',
    disease: 'Normal',
    preventiveMeasures: [
      'Continue regular monitoring',
      'Maintain good agricultural practices',
      'Keep field clean and well-drained',
      'Follow recommended fertilization schedule'
    ],
    treatmentOptions: [
      'No treatment needed',
      'Continue preventive measures',
      'Monitor for any changes'
    ],
    culturalPractices: [
      'Maintain proper plant spacing',
      'Control weeds',
      'Practice proper water management',
      'Follow recommended cultural practices'
    ],
    chemicalControl: [
      'No chemical control needed',
      'Continue preventive measures',
      'Monitor for any changes'
    ],
    biologicalControl: [
      'No biological control needed',
      'Continue preventive measures',
      'Monitor for any changes'
    ]
  },
  {
    id: 'tungro',
    disease: 'Tungro',
    preventiveMeasures: [
      'Use resistant varieties',
      'Practice crop rotation',
      'Maintain proper field drainage',
      'Avoid excessive nitrogen fertilization'
    ],
    treatmentOptions: [
      'Apply imidacloprid',
      'Use thiamethoxam',
      'Apply pymetrozine'
    ],
    culturalPractices: [
      'Remove infected plant debris',
      'Maintain proper plant spacing',
      'Control weeds',
      'Avoid overhead irrigation'
    ],
    chemicalControl: [
      'Imidacloprid (0.1%)',
      'Thiamethoxam (0.1%)',
      'Pymetrozine (0.1%)'
    ],
    biologicalControl: [
      'Use Beauveria bassiana',
      'Apply Metarhizium anisopliae',
      'Use Bacillus thuringiensis'
    ]
  },
  {
    id: 'sheath-blight',
    disease: 'Sheath Blight',
    preventiveMeasures: [
      'Use disease-free seeds',
      'Practice crop rotation',
      'Maintain proper field drainage',
      'Avoid excessive nitrogen fertilization'
    ],
    treatmentOptions: [
      'Apply validamycin',
      'Use propiconazole',
      'Apply azoxystrobin'
    ],
    culturalPractices: [
      'Remove infected plant debris',
      'Maintain proper plant spacing',
      'Control weeds',
      'Avoid overhead irrigation'
    ],
    chemicalControl: [
      'Validamycin (0.1%)',
      'Propiconazole (0.1%)',
      'Azoxystrobin (0.1%)'
    ],
    biologicalControl: [
      'Use Pseudomonas fluorescens',
      'Apply Bacillus subtilis',
      'Use Trichoderma viride'
    ]
  }
]; 