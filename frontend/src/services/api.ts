import axios from 'axios';
import {
  AlphaPhoto,
  AlphaProgram,
  Announcement,
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
  PortalEvent,
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Portal auth ───────────────────────────────────────────────────────────────

export interface PortalUser {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  groups: string[];
}

export const loginUser = async (
  email: string,
  password: string
): Promise<{ access: string; refresh: string }> => {
  const response = await api.post('/users/auth/login/', { email, password });
  return response.data;
};

export const getPortalMe = async (): Promise<PortalUser> => {
  const response = await api.get<PortalUser>('/users/auth/me/');
  return response.data;
};

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
  const response = await api.get<{ results: TeamMember[] } | TeamMember[]>(
    '/team/'
  );
  const data = response.data;
  return Array.isArray(data)
    ? data
    : (data as { results: TeamMember[] }).results;
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
  const response = await api.get<
    PaginatedResponse<MissionCountry> | MissionCountry[]
  >('/mission/');
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
  const response = await api.get<
    PaginatedResponse<HistoryEntry> | HistoryEntry[]
  >('/history/');
  const data = response.data;
  if (Array.isArray(data)) return data;
  return (data as PaginatedResponse<HistoryEntry>).results ?? [];
};

// ── Portal: Event CRUD ────────────────────────────────────────────────────────

export const portalGetEvents = async (): Promise<PortalEvent[]> => {
  const response = await api.get<{ count: number; results: PortalEvent[] }>(
    '/portal/events/'
  );
  return response.data.results ?? (response.data as unknown as PortalEvent[]);
};

export const portalCreateEvent = async (
  data: FormData | Partial<PortalEvent>
): Promise<PortalEvent> => {
  const isFormData = data instanceof FormData;
  const response = await api.post<PortalEvent>('/portal/events/', data, {
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
  });
  return response.data;
};

export const portalUpdateEvent = async (
  id: number,
  data: FormData | Partial<PortalEvent>
): Promise<PortalEvent> => {
  const isFormData = data instanceof FormData;
  const response = await api.patch<PortalEvent>(`/portal/events/${id}/`, data, {
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
  });
  return response.data;
};

export const portalDeleteEvent = async (id: number): Promise<void> => {
  await api.delete(`/portal/events/${id}/`);
};

// ── Announcements (public) ────────────────────────────────────────────────────

export const getAnnouncements = async (): Promise<Announcement[]> => {
  const response = await api.get<Announcement[] | { results: Announcement[] }>(
    '/announcements/'
  );
  const data = response.data;
  if (Array.isArray(data)) return data;
  return data.results ?? [];
};

// ── Portal: Announcement CRUD ─────────────────────────────────────────────────

export const portalGetAnnouncements = async (): Promise<Announcement[]> => {
  const response = await api.get<Announcement[] | { results: Announcement[] }>(
    '/portal/announcements/'
  );
  const data = response.data;
  if (Array.isArray(data)) return data;
  return data.results ?? [];
};

export const portalCreateAnnouncement = async (
  data: FormData | Partial<Announcement>
): Promise<Announcement> => {
  const isFormData = data instanceof FormData;
  const response = await api.post<Announcement>(
    '/portal/announcements/',
    data,
    {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    }
  );
  return response.data;
};

export const portalUpdateAnnouncement = async (
  id: number,
  data: FormData | Partial<Announcement>
): Promise<Announcement> => {
  const isFormData = data instanceof FormData;
  const response = await api.patch<Announcement>(
    `/portal/announcements/${id}/`,
    data,
    { headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {} }
  );
  return response.data;
};

export const portalDeleteAnnouncement = async (id: number): Promise<void> => {
  await api.delete(`/portal/announcements/${id}/`);
};

// ── Alpha Program ─────────────────────────────────────────────────────────────

export const getAlphaProgram = async (): Promise<AlphaProgram> => {
  const response = await api.get<AlphaProgram>('/alpha-program/');
  return response.data;
};

export const portalGetAlphaProgram = async (): Promise<AlphaProgram> => {
  const response = await api.get<AlphaProgram>('/portal/alpha-program/');
  return response.data;
};

export const portalUpdateAlphaProgram = async (
  data: FormData | Partial<AlphaProgram>
): Promise<AlphaProgram> => {
  const isFormData = data instanceof FormData;
  const response = await api.patch<AlphaProgram>(
    '/portal/alpha-program/',
    data,
    {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    }
  );
  return response.data;
};

export const portalUploadAlphaPhoto = async (
  formData: FormData
): Promise<AlphaPhoto> => {
  const response = await api.post<AlphaPhoto>(
    '/portal/alpha-photos/',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data;
};

export const portalDeleteAlphaPhoto = async (id: number): Promise<void> => {
  await api.delete(`/portal/alpha-photos/${id}/`);
};

// ── Pre-Teens ─────────────────────────────────────────────────────────────────

export interface PreTeensContent {
  id: number;
  event_name: string;
  event_datetime: string; // ISO 8601
  photo: string | null;
  updated_at: string;
}

export const getPreTeensContent = async (): Promise<PreTeensContent> => {
  const response = await api.get<PreTeensContent>('/pre-teens/');
  return response.data;
};

export const portalGetPreTeensEvents = async (): Promise<PreTeensContent[]> => {
  const response = await api.get<
    { count: number; results: PreTeensContent[] } | PreTeensContent[]
  >('/portal/pre-teens/');
  const data = response.data;
  if (Array.isArray(data)) return data;
  return (data as { results: PreTeensContent[] }).results ?? [];
};

export const portalCreatePreTeensEvent = async (
  data: FormData
): Promise<PreTeensContent> => {
  const response = await api.post<PreTeensContent>('/portal/pre-teens/', data, {
    headers: multipartHeaders,
  });
  return response.data;
};

export const portalUpdatePreTeensEvent = async (
  id: number,
  data: FormData
): Promise<PreTeensContent> => {
  const response = await api.patch<PreTeensContent>(
    `/portal/pre-teens/${id}/`,
    data,
    { headers: multipartHeaders }
  );
  return response.data;
};

export const portalDeletePreTeensEvent = async (id: number): Promise<void> => {
  await api.delete(`/portal/pre-teens/${id}/`);
};

// multipartHeaders: unset Content-Type so the browser sets it with the correct boundary
const multipartHeaders = { 'Content-Type': undefined as unknown as string };

// ── Ungdomar News ─────────────────────────────────────────────────────────────

export interface UngdomarNews {
  id: number;
  tag: string;
  title: string;
  description: string;
  image: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const getUngdomarNews = async (): Promise<UngdomarNews[]> => {
  const response = await api.get<{ count: number; results: UngdomarNews[] } | UngdomarNews[]>('/ungdomar-news/');
  return Array.isArray(response.data) ? response.data : (response.data as any).results ?? [];
};

export const portalGetUngdomarNews = async (): Promise<UngdomarNews[]> => {
  const response = await api.get<{ count: number; results: UngdomarNews[] } | UngdomarNews[]>('/portal/ungdomar-news/');
  return Array.isArray(response.data) ? response.data : (response.data as any).results ?? [];
};

export const portalCreateUngdomarNews = async (data: FormData): Promise<UngdomarNews> => {
  const response = await api.post<UngdomarNews>('/portal/ungdomar-news/', data, {
    headers: multipartHeaders,
  });
  return response.data;
};

export const portalUpdateUngdomarNews = async (id: number, data: FormData): Promise<UngdomarNews> => {
  const response = await api.patch<UngdomarNews>(`/portal/ungdomar-news/${id}/`, data, {
    headers: multipartHeaders,
  });
  return response.data;
};

export const portalDeleteUngdomarNews = async (id: number): Promise<void> => {
  await api.delete(`/portal/ungdomar-news/${id}/`);
};

// ── Pre-Teens News ────────────────────────────────────────────────────────────

export interface PreTeensNews {
  id: number;
  tag: string;
  title: string;
  description: string;
  image: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const getPreTeensNews = async (): Promise<PreTeensNews[]> => {
  const res = await api.get<{ count: number; results: PreTeensNews[] } | PreTeensNews[]>('/preteens-news/');
  return Array.isArray(res.data) ? res.data : (res.data as any).results ?? [];
};

export const portalGetPreTeensNews = async (): Promise<PreTeensNews[]> => {
  const res = await api.get<{ count: number; results: PreTeensNews[] } | PreTeensNews[]>('/portal/preteens-news/');
  return Array.isArray(res.data) ? res.data : (res.data as any).results ?? [];
};

export const portalCreatePreTeensNews = async (data: FormData): Promise<PreTeensNews> => {
  const res = await api.post<PreTeensNews>('/portal/preteens-news/', data, { headers: multipartHeaders });
  return res.data;
};

export const portalUpdatePreTeensNews = async (id: number, data: FormData): Promise<PreTeensNews> => {
  const res = await api.patch<PreTeensNews>(`/portal/preteens-news/${id}/`, data, { headers: multipartHeaders });
  return res.data;
};

export const portalDeletePreTeensNews = async (id: number): Promise<void> => {
  await api.delete(`/portal/preteens-news/${id}/`);
};

export default api;
