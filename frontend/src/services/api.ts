import axios from 'axios';
import {
  ChurchInfo,
  HistoryEntry,
  MissionCountry,
  SecondHandStore,
  Service,
  Program,
  NewsPost,
  Event,
  TeamMember,
  ContactForm,
  DonationForm,
  PaginatedResponse,
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication if needed
api.interceptors.request.use(
  config => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Church information
export const getChurchInfo = async (): Promise<ChurchInfo> => {
  const response = await api.get<ChurchInfo>('/church-info/');
  return response.data;
};

// Services
export const getServices = async (): Promise<Service[]> => {
  const response = await api.get<Service[]>('/services/');
  return response.data;
};

export const getUpcomingServices = async (): Promise<Service[]> => {
  const response = await api.get<Service[]>('/services/upcoming/');
  return response.data;
};

// Programs
export const getPrograms = async (type?: string): Promise<Program[]> => {
  const response = await api.get<PaginatedResponse<Program>>('/programs/', {
    params: type ? { type } : undefined,
  });
  return response.data.results;
};

// News
export const getNewsposts = async (): Promise<PaginatedResponse<NewsPost>> => {
  const response = await api.get<PaginatedResponse<NewsPost>>('/news/');
  return response.data;
};

export const getLatestNews = async (limit: number = 5): Promise<NewsPost[]> => {
  const response = await api.get<NewsPost[]>('/news/latest/', {
    params: { limit },
  });
  return response.data;
};

export const getNewsPost = async (id: number): Promise<NewsPost> => {
  const response = await api.get<NewsPost>(`/news/${id}/`);
  return response.data;
};

// Events
export const getEvents = async (
  showPast: boolean = false
): Promise<Event[]> => {
  const response = await api.get<PaginatedResponse<Event>>('/events/', {
    params: showPast ? { show_past: true } : undefined,
  });
  return response.data.results;
};

export const getEvent = async (id: number): Promise<Event> => {
  const response = await api.get<Event>(`/events/${id}/`);
  return response.data;
};

// Team
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const response = await api.get<TeamMember[]>('/team/');
  return response.data;
};

// Contact
export const submitContactForm = async (
  contactData: ContactForm
): Promise<void> => {
  await api.post('/contact/', contactData);
};

// Donations
export const submitDonation = async (
  donationData: DonationForm
): Promise<void> => {
  await api.post('/donations/', donationData);
};

// Mission
export const getMissionCountries = async (): Promise<MissionCountry[]> => {
  const response = await api.get<PaginatedResponse<MissionCountry> | MissionCountry[]>('/mission/');
  const data = response.data;
  if (Array.isArray(data)) return data;
  return (data as PaginatedResponse<MissionCountry>).results ?? [];
};

// Second Hand
export const getSecondHandStore = async (): Promise<SecondHandStore | null> => {
  const response = await api.get<SecondHandStore | null>('/second-hand/');
  return response.data;
};

// History
export const getHistoryEntries = async (): Promise<HistoryEntry[]> => {
  const response = await api.get<PaginatedResponse<HistoryEntry> | HistoryEntry[]>('/history/');
  const data = response.data;
  if (Array.isArray(data)) return data;
  return (data as PaginatedResponse<HistoryEntry>).results ?? [];
};

export default api;
