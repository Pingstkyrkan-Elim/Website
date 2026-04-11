import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { LayoutWrapper, MainContent } from './Layout.styles';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
