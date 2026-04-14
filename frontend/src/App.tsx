import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import { AuthProvider, useAuth } from './context/AuthContext';

import Layout from './components/Layout/Layout';
import PortalLayout from './components/PortalLayout/PortalLayout';

import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import HistoriaPage from './pages/HistoriaPage/HistoriaPage';
import MissionPage from './pages/MissionPage/MissionPage';
import ProgramsPage from './pages/ProgramsPage/ProgramsPage';
import AlphaPage from './pages/AlphaPage/AlphaPage';
import NewsPage from './pages/NewsPage/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage/NewsDetailPage';
import EventsPage from './pages/EventsPage/EventsPage';
import EventDetailPage from './pages/EventDetailPage/EventDetailPage';
import ContactPage from './pages/ContactPage/ContactPage';
import TeamPage from './pages/TeamPage/TeamPage';
import CountryDetailPage from './pages/CountryDetailPage/CountryDetailPage';
import SecondHandPage from './pages/SecondHandPage/SecondHandPage';
import PortalLoginPage from './pages/PortalLoginPage/PortalLoginPage';
import PortalDashboard from './pages/PortalDashboard/PortalDashboard';
import PortalKalender from './pages/PortalKalender/PortalKalender';
import PortalAnnonser from './pages/PortalAnnonser/PortalAnnonser';
import PortalAlpha from './pages/PortalAlpha/PortalAlpha';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected route — redirects to login if not authenticated
function PortalRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to='/portal/login' replace />;
  return <PortalLayout>{children}</PortalLayout>;
}

// Redirect already-logged-in users away from login page
function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to='/portal/dashboard' replace />;
  return <>{children}</>;
}

const theme = {
  colors: {
    primary: { main: '#7a5828', light: '#a07840', dark: '#4a3418' },
    secondary: { main: '#c8922a', light: '#dba840', dark: '#a07020' },
    neutral: {
      white: '#ffffff',
      light: '#f5ede0',
      gray: '#8a7860',
      dark: '#2a2018',
      black: '#000000',
    },
    accent: {
      gold: '#d4a030',
      success: '#4a7c3f',
      warning: '#c8922a',
      error: '#c04030',
    },
    oasis: {
      green: '#4a7a4a',
      greenLight: '#6a9a6a',
      greenDark: '#2e5230',
      blue: '#3a6a7a',
      blueLight: '#5a8a9a',
      blueDark: '#224858',
    },
  },
  fonts: {
    primary: '"Inter", "Roboto", "Helvetica Neue", sans-serif',
    secondary: '"Playfair Display", "Georgia", serif',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    large: '1200px',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    full: '50%',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.15)',
    large: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <AuthProvider>
            <ScrollToTop />
            <Routes>
              {/* ── Public website ─────────────────────────────────────── */}
              <Route
                path='/'
                element={
                  <Layout>
                    <HomePage />
                  </Layout>
                }
              />
              <Route
                path='/about'
                element={
                  <Layout>
                    <AboutPage />
                  </Layout>
                }
              />
              <Route
                path='/historia'
                element={
                  <Layout>
                    <HistoriaPage />
                  </Layout>
                }
              />
              <Route
                path='/mission'
                element={
                  <Layout>
                    <MissionPage />
                  </Layout>
                }
              />
              <Route
                path='/mission/country/:id'
                element={
                  <Layout>
                    <CountryDetailPage />
                  </Layout>
                }
              />
              <Route
                path='/programs'
                element={
                  <Layout>
                    <ProgramsPage />
                  </Layout>
                }
              />
              <Route
                path='/alpha'
                element={
                  <Layout>
                    <AlphaPage />
                  </Layout>
                }
              />
              <Route
                path='/programs/alpha-kurs'
                element={
                  <Layout>
                    <AlphaPage />
                  </Layout>
                }
              />
              <Route
                path='/news'
                element={
                  <Layout>
                    <NewsPage />
                  </Layout>
                }
              />
              <Route
                path='/news/:id'
                element={
                  <Layout>
                    <NewsDetailPage />
                  </Layout>
                }
              />
              <Route
                path='/events'
                element={
                  <Layout>
                    <EventsPage />
                  </Layout>
                }
              />
              <Route
                path='/events/:id'
                element={
                  <Layout>
                    <EventDetailPage />
                  </Layout>
                }
              />
              <Route
                path='/team'
                element={
                  <Layout>
                    <TeamPage />
                  </Layout>
                }
              />
              <Route
                path='/contact'
                element={
                  <Layout>
                    <ContactPage />
                  </Layout>
                }
              />
              <Route
                path='/pmu-second-hand'
                element={
                  <Layout>
                    <SecondHandPage />
                  </Layout>
                }
              />

              {/* ── Portal ─────────────────────────────────────────────── */}
              <Route
                path='/portal'
                element={<Navigate to='/portal/login' replace />}
              />
              <Route
                path='/portal/login'
                element={
                  <GuestRoute>
                    <PortalLoginPage />
                  </GuestRoute>
                }
              />
              <Route
                path='/portal/dashboard'
                element={
                  <PortalRoute>
                    <PortalDashboard />
                  </PortalRoute>
                }
              />
              <Route
                path='/portal/kalender'
                element={
                  <PortalRoute>
                    <PortalKalender />
                  </PortalRoute>
                }
              />
              <Route
                path='/portal/annonser'
                element={
                  <PortalRoute>
                    <PortalAnnonser />
                  </PortalRoute>
                }
              />
              <Route
                path='/portal/alpha'
                element={
                  <PortalRoute>
                    <PortalAlpha />
                  </PortalRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
