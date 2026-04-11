import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import HistoriaPage from './pages/HistoriaPage/HistoriaPage';
import MissionPage from './pages/MissionPage/MissionPage';
import ProgramsPage from './pages/ProgramsPage/ProgramsPage';
import NewsPage from './pages/NewsPage/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage/NewsDetailPage';
import EventsPage from './pages/EventsPage/EventsPage';
import EventDetailPage from './pages/EventDetailPage/EventDetailPage';
import ContactPage from './pages/ContactPage/ContactPage';
import TeamPage from './pages/TeamPage/TeamPage';
import CountryDetailPage from './pages/CountryDetailPage/CountryDetailPage';
import SecondHandPage from './pages/SecondHandPage/SecondHandPage';

// Modern church theme with styled-components
const theme = {
  colors: {
    primary: {
      main: '#7a5828',
      light: '#a07840',
      dark: '#4a3418',
    },
    secondary: {
      main: '#c8922a',
      light: '#dba840',
      dark: '#a07020',
    },
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

// Create a query client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Layout>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/historia' element={<HistoriaPage />} />
              <Route path='/mission' element={<MissionPage />} />
              <Route path='/mission/country/:id' element={<CountryDetailPage />} />
              <Route path='/programs' element={<ProgramsPage />} />
              <Route path='/news' element={<NewsPage />} />
              <Route path='/news/:id' element={<NewsDetailPage />} />
              <Route path='/events' element={<EventsPage />} />
              <Route path='/events/:id' element={<EventDetailPage />} />
              <Route path='/team' element={<TeamPage />} />
              <Route path='/contact' element={<ContactPage />} />
              <Route path='/pmu-second-hand' element={<SecondHandPage />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
