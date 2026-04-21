import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { IconCalendar, IconClipboardList, IconHome } from '../Icons';
import {
  Backdrop,
  Breadcrumb,
  HamburgerButton,
  LogoutButton,
  MainArea,
  NavIcon,
  NavItem,
  NavSection,
  NavSectionLabel,
  PageContent,
  PortalWrapper,
  Sidebar,
  SidebarChurchName,
  SidebarFooter,
  SidebarHeader,
  SidebarNav,
  SidebarPortalLabel,
  TopBar,
  UserAvatar,
  UserInfo,
  UserName,
  WebsiteLink,
} from './PortalLayout.styles';

interface NavEntry {
  path: string;
  label: string;
  icon: React.ReactNode;
  permission?: string;
}

const NAV_ITEMS: NavEntry[] = [
  {
    path: '/portal/dashboard',
    label: 'Översikt',
    icon: <IconHome size={16} />,
  },
  {
    path: '/portal/kalender',
    label: 'Kalender',
    icon: <IconCalendar size={16} />,
    permission: 'kalender',
  },
  {
    path: '/portal/annonser',
    label: 'Annonser',
    icon: <IconClipboardList size={16} />,
    permission: 'annonser',
  },
  {
    path: '/portal/alpha',
    label: 'Alpha',
    icon: (
      <span
        style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontSize: '1rem',
          lineHeight: 1,
        }}
      >
        α
      </span>
    ),
    permission: 'alpha',
  },
  {
    path: '/portal/pre-teens',
    label: 'Pre-Teens',
    icon: (
      <span style={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.02em' }}>
        PT
      </span>
    ),
    permission: 'pre-teens',
  },
  {
    path: '/portal/ungdomar',
    label: 'Ungdomar',
    icon: (
      <span style={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.02em' }}>
        UG
      </span>
    ),
    permission: 'ungdomar',
  },
];

const PAGE_TITLES: Record<string, string> = {
  '/portal/dashboard': 'Översikt',
  '/portal/kalender': 'Kalender',
  '/portal/annonser': 'Annonser',
  '/portal/alpha': 'Alpha',
  '/portal/pre-teens': 'Pre-Teens',
  '/portal/ungdomar': 'Ungdomar',
};

interface PortalLayoutProps {
  children: React.ReactNode;
}

const PortalLayout: React.FC<PortalLayoutProps> = ({ children }) => {
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const visibleNav = NAV_ITEMS.filter(
    item => !item.permission || hasPermission(item.permission)
  );

  const initials = user
    ? `${user.first_name[0] ?? ''}${user.last_name[0] ?? ''}`.toUpperCase()
    : '?';

  const currentTitle = PAGE_TITLES[pathname] ?? 'Portal';

  const handleLogout = () => {
    logout();
    navigate('/portal/login');
  };

  return (
    <PortalWrapper>
      <Backdrop $open={sidebarOpen} onClick={() => setSidebarOpen(false)} />

      <Sidebar $open={sidebarOpen}>
        <SidebarHeader>
          <SidebarChurchName>Pingstkyrkan Elim</SidebarChurchName>
          <SidebarPortalLabel>Innehållsportal</SidebarPortalLabel>
        </SidebarHeader>

        <SidebarNav>
          <NavSection>
            <NavSectionLabel>Navigation</NavSectionLabel>
            {visibleNav.map(item => (
              <NavItem
                key={item.path}
                $active={pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <NavIcon>{item.icon}</NavIcon>
                {item.label}
              </NavItem>
            ))}
          </NavSection>
        </SidebarNav>

        <SidebarFooter>
          <WebsiteLink href='/' target='_blank' rel='noopener noreferrer'>
            <NavIcon>
              <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <circle cx='12' cy='12' r='10' />
                <line x1='2' y1='12' x2='22' y2='12' />
                <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
              </svg>
            </NavIcon>
            Visa webbplatsen
          </WebsiteLink>
          <UserInfo>
            <UserAvatar>{initials}</UserAvatar>
            <UserName>{user?.full_name ?? user?.email}</UserName>
          </UserInfo>
          <LogoutButton onClick={handleLogout}>
            <NavIcon>
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
                <polyline points='16 17 21 12 16 7' />
                <line x1='21' y1='12' x2='9' y2='12' />
              </svg>
            </NavIcon>
            Logga ut
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>

      <MainArea>
        <TopBar>
          <HamburgerButton
            aria-label='Öppna meny'
            onClick={() => setSidebarOpen(o => !o)}
          >
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
              <line x1='3' y1='6' x2='21' y2='6' />
              <line x1='3' y1='12' x2='21' y2='12' />
              <line x1='3' y1='18' x2='21' y2='18' />
            </svg>
          </HamburgerButton>
          <Breadcrumb>
            Portal &rsaquo; <span>{currentTitle}</span>
          </Breadcrumb>
        </TopBar>

        <PageContent>{children}</PageContent>
      </MainArea>
    </PortalWrapper>
  );
};

export default PortalLayout;
