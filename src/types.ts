import { ReactNode } from 'react';

export type ViewMode = 'landing' | 'scientist' | 'artist' | 'business';

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: ReactNode | ReactNode[];
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface ResearchOutput {
  title: string;
  authors: string;
  journal: string;
  year: string;
  thumbnail: string;
  link?: string;
  summary?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: 'science' | 'art' | 'both';
  image: string;
}

export interface Artwork {
  title: string;
  year: string;
  vimeoId: string;
  description: string;
}

export interface Outreach {
  title: string;
  role: string;
  description: ReactNode | ReactNode[];
  date: string;
  thumbnail?: string;
}
