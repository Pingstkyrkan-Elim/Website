import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HeaderWrapper,
  Nav,
  Logo,
  DesktopNav,
  NavItem,
  NavLink,
  MobileMenuButton,
  MobileNavOverlay,
  MobileNav,
  MobileNavHeader,
  MobileNavTitle,
  CloseButton,
  MobileNavList,
  MobileNavItem,
  MobileNavLink,
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  PortalButtonWrap,
  PortalIconButton,
  PortalDropdown,
  PortalDropdownUser,
  PortalDropdownUserName,
  PortalDropdownUserRole,
  PortalDropdownItem,
  PortalDropdownLogout,
} from './Header.styles';

const navigationItems = [
  { name: 'Hem', path: '/' },
  { name: 'Om Oss', path: '/about' },
  { name: 'Kalender', path: '/events' },
  { name: 'PMU Second Hand', path: '/pmu-second-hand' },
  { name: 'Historia', path: '/historia' },
  { name: 'Mission', path: '/mission' },
  { name: 'Kontakt', path: '/contact' },
];

const programItems = [
  { name: 'Alpha Kurs', path: '/programs/alpha-kurs' },
  { name: 'Pre-Teens', path: '/programs/pre-teens' },
  { name: 'Ungdomsträffar', path: '/programs/ungdomstraffar' },
];

// User icon SVG
const UserIcon = () => (
  <svg
    width='22'
    height='22'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.8'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
    <circle cx='12' cy='7' r='4' />
  </svg>
);

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        const totalHeroArea = window.innerHeight + window.innerHeight * 0.6;
        setIsOverHero(window.scrollY < totalHeroArea);
      } else {
        setIsOverHero(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close portal dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (portalRef.current && !portalRef.current.contains(e.target as Node)) {
        setPortalOpen(false);
      }
    };
    if (portalOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [portalOpen]);

  // Close nav dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(false);
    if (dropdownOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    logout();
    setPortalOpen(false);
    navigate('/');
  };

  return (
    <>
      <HeaderWrapper $isOverHero={isOverHero}>
        <Nav>
          <Logo to='/'>Pingstkyrkan Elim</Logo>

          <DesktopNav>
            {navigationItems.slice(0, 3).map(item => (
              <NavItem key={item.name}>
                <NavLink
                  to={item.path}
                  $isActive={location.pathname === item.path}
                >
                  {item.name}
                </NavLink>
              </NavItem>
            ))}

            <NavItem>
              <DropdownContainer onClick={e => e.stopPropagation()}>
                <DropdownButton
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  $isActive={location.pathname.startsWith('/programs')}
                  className={dropdownOpen ? 'open' : ''}
                >
                  Program
                  <div className='arrow' />
                </DropdownButton>
                <DropdownMenu $isOpen={dropdownOpen}>
                  {programItems.map(program => (
                    <DropdownItem
                      key={program.name}
                      to={program.path}
                      onClick={() => setDropdownOpen(false)}
                    >
                      {program.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </DropdownContainer>
            </NavItem>

            {navigationItems.slice(3).map(item => (
              <NavItem key={item.name}>
                <NavLink
                  to={item.path}
                  $isActive={location.pathname === item.path}
                >
                  {item.name}
                </NavLink>
              </NavItem>
            ))}
          </DesktopNav>

          {/* Portal login/user icon */}
          <PortalButtonWrap ref={portalRef}>
            <PortalIconButton
              onClick={() => setPortalOpen(!portalOpen)}
              aria-label='Portal'
            >
              <UserIcon />
            </PortalIconButton>

            <PortalDropdown $open={portalOpen}>
              {isAuthenticated && user ? (
                <>
                  <PortalDropdownUser>
                    <PortalDropdownUserName>
                      {user.full_name}
                    </PortalDropdownUserName>
                    <PortalDropdownUserRole>
                      {user.groups.join(' · ') || 'Portal'}
                    </PortalDropdownUserRole>
                  </PortalDropdownUser>
                  <PortalDropdownItem
                    to='/portal/dashboard'
                    onClick={() => setPortalOpen(false)}
                  >
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect x='3' y='3' width='7' height='7' />
                      <rect x='14' y='3' width='7' height='7' />
                      <rect x='3' y='14' width='7' height='7' />
                      <rect x='14' y='14' width='7' height='7' />
                    </svg>
                    Gå till portalen
                  </PortalDropdownItem>
                  <PortalDropdownLogout onClick={handleLogout}>
                    <svg
                      width='14'
                      height='14'
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
                    Logga ut
                  </PortalDropdownLogout>
                </>
              ) : (
                <PortalDropdownItem
                  to='/portal/login'
                  onClick={() => setPortalOpen(false)}
                >
                  <svg
                    width='14'
                    height='14'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4' />
                    <polyline points='10 17 15 12 10 7' />
                    <line x1='15' y1='12' x2='3' y2='12' />
                  </svg>
                  Logga in på portalen
                </PortalDropdownItem>
              )}
            </PortalDropdown>
          </PortalButtonWrap>

          <MobileMenuButton
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label='Toggle menu'
          >
            <div className='line' />
            <div className='line' />
            <div className='line' />
          </MobileMenuButton>
        </Nav>
      </HeaderWrapper>

      <MobileNavOverlay
        $isOpen={mobileOpen}
        onClick={() => setMobileOpen(false)}
      />
      <MobileNav $isOpen={mobileOpen}>
        <MobileNavHeader>
          <MobileNavTitle>Meny</MobileNavTitle>
          <CloseButton
            onClick={() => setMobileOpen(false)}
            aria-label='Close menu'
          >
            ×
          </CloseButton>
        </MobileNavHeader>
        <MobileNavList>
          {navigationItems.map(item => (
            <MobileNavItem key={item.name}>
              <MobileNavLink
                to={item.path}
                $isActive={location.pathname === item.path}
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </MobileNavLink>
            </MobileNavItem>
          ))}
          <MobileNavItem>
            <MobileNavLink
              to={isAuthenticated ? '/portal/dashboard' : '/portal/login'}
              $isActive={location.pathname.startsWith('/portal')}
              onClick={() => setMobileOpen(false)}
            >
              {isAuthenticated ? 'Portal' : 'Logga in'}
            </MobileNavLink>
          </MobileNavItem>
        </MobileNavList>
      </MobileNav>
    </>
  );
};

export default Header;
