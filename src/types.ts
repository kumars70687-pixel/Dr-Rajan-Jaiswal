export type Language = 'en' | 'hi';

export type ThemeId = 'sage' | 'sapphire' | 'champagne' | 'nocturne';

export interface ThemeOption {
  id: ThemeId;
  name: string;
  nameHindi: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
}

export interface AppointmentFormData {
  patientName: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  contactMethod: 'whatsapp' | 'phone';
}

export interface ReviewItem {
  id: string;
  excerpt: string;
  theme: string;
  source: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}
