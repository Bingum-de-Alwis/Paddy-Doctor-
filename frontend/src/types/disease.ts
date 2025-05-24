export interface DiseaseImage {
  url: string;
  alt: string;
  caption: string;
}

export interface Disease {
  causativeAgent: string;
  affectedParts: string[];
  symptoms: string[];
  additionalInfo: string[];
  images: DiseaseImage[];
}

export interface DiseaseResponse {
  status: string;
  count: number;
  data: Disease[];
} 