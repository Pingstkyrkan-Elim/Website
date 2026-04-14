export interface ChurchInfo {
  name: string;
  address: {
    street: string;
    postal_code: string;
    city: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  donation_info: {
    swish: string;
    bankgiro: string;
    note: string;
  };
  service_times: {
    sunday_service: string;
    sunday_school: string;
  };
  location_note: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  date_time: string;
  location: string;
  is_active: boolean;
  has_children_service: boolean;
  language_support?: string;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: number;
  name: string;
  type: 'alpha' | 'youth' | 'sports' | 'prayer' | 'cafe' | 'other';
  type_display: string;
  description: string;
  schedule: string;
  age_group?: string;
  location: string;
  is_active: boolean;
  contact_info?: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface NewsPost {
  id: number;
  title: string;
  content: string;
  author: number;
  author_name: string;
  is_published: boolean;
  published_at: string;
  featured_image?: string;
  tags?: string;
  created_at: string;
  updated_at: string;
}

export interface PortalEvent {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date?: string | null;
  location: string;
  registration_required: boolean;
  registration_info?: string;
  max_participants?: number | null;
  contact_person?: string;
  image?: string | null;
  is_active: boolean;
  is_recurring: boolean;
  recurrence_day: number | null;
  recurrence_day_display: string | null;
  recurrence_time: string | null;
  recurrence_duration_minutes: number | null;
  is_suspended: boolean;
  suspended_until: string | null;
  next_occurrence: string | null;
  has_sunday_school: boolean;
  has_communion: boolean;
  created_by: number | null;
  created_by_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  location: string;
  registration_required: boolean;
  registration_info?: string;
  max_participants?: number;
  contact_person?: string;
  image?: string;
  is_active: boolean;
  // Recurrence
  is_recurring: boolean;
  recurrence_day: number | null; // 0=Monday … 6=Sunday
  recurrence_day_display: string | null;
  recurrence_time: string | null; // "HH:MM:SS"
  recurrence_duration_minutes: number | null;
  is_suspended: boolean;
  suspended_until: string | null; // "YYYY-MM-DD"
  next_occurrence: string | null; // ISO datetime
  has_sunday_school: boolean;
  has_communion: boolean;
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string; // "YYYY-MM-DD"
  location: string;
  image?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role:
    | 'pastor'
    | 'elder'
    | 'deacon'
    | 'worship_leader'
    | 'youth_leader'
    | 'volunteer'
    | 'staff';
  role_display: string;
  bio?: string;
  photo?: string;
  email?: string;
  phone?: string;
  display_order: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface DonationForm {
  donor_name?: string;
  donor_email?: string;
  amount: number;
  donation_type: 'tithe' | 'offering' | 'mission' | 'building' | 'other';
  message?: string;
  is_anonymous: boolean;
}

export interface MissionCountry {
  id: number;
  name: string;
  continent: string;
  description: string;
  images: string[];
  coordinates_x: number;
  coordinates_y: number;
  order: number;
}

export interface SecondHandStore {
  id: number;
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  opening_hours: { day: string; hours: string }[];
  donation_hours: { day: string; hours: string }[];
  images: string[];
  pmu_url: string;
  donation_info: string;
}

export interface HistoryEntry {
  id: number;
  period: string;
  year_start: number;
  title: string;
  content: string;
  images: string[];
  leaders: string[];
  order: number;
}

export interface AlphaPhoto {
  id: number;
  image: string;
  caption?: string;
  order: number;
}

export interface AlphaStep {
  emoji: string;
  title: string;
  desc: string;
}

export interface AlphaProgram {
  id: number;
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  intro_quote: string;
  intro_body: string;
  intro_image?: string | null;
  video_url: string;
  video_title: string;
  steps: AlphaStep[];
  topics: string[];
  next_alpha_tag: string;
  next_alpha_title: string;
  next_alpha_desc: string;
  next_alpha_location: string;
  next_alpha_email: string;
  closing_quote: string;
  gallery: AlphaPhoto[];
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}
