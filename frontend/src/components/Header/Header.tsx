import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Check if we're on homepage and get hero + first content section height
      if (location.pathname === '/') {
        const heroHeight = window.innerHeight; // 100vh
        const firstSectionHeight = window.innerHeight * 0.6; // Approximate height
        const totalHeroArea = heroHeight + firstSectionHeight;
        setIsOverHero(window.scrollY < totalHeroArea);
      } else {
        setIsOverHero(false);
      }
    };

    // Set initial state
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeMobileNav = () => {
    setMobileOpen(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false);
    };

    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <HeaderWrapper $isOverHero={isOverHero}>
        <Nav>
          <Logo to='/'>Pingstkyrkan Elim</Logo>

          <DesktopNav>
            {/* Hem, Om Oss, Kalender */}
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

            {/* Program dropdown */}
            <NavItem>
              <DropdownContainer onClick={e => e.stopPropagation()}>
                <DropdownButton
                  onClick={handleDropdownToggle}
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
                      onClick={closeDropdown}
                    >
                      {program.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </DropdownContainer>
            </NavItem>

            {/* PMU Second Hand, Mission, Kontakt */}
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

          <MobileMenuButton
            onClick={handleMobileToggle}
            aria-label='Toggle menu'
          >
            <div className='line' />
            <div className='line' />
            <div className='line' />
          </MobileMenuButton>
        </Nav>
      </HeaderWrapper>

      <MobileNavOverlay $isOpen={mobileOpen} onClick={closeMobileNav} />
      <MobileNav $isOpen={mobileOpen}>
        <MobileNavHeader>
          <MobileNavTitle>Meny</MobileNavTitle>
          <CloseButton onClick={closeMobileNav} aria-label='Close menu'>
            ×
          </CloseButton>
        </MobileNavHeader>
        <MobileNavList>
          {navigationItems.map(item => (
            <MobileNavItem key={item.name}>
              <MobileNavLink
                to={item.path}
                $isActive={location.pathname === item.path}
                onClick={closeMobileNav}
              >
                {item.name}
              </MobileNavLink>
            </MobileNavItem>
          ))}
        </MobileNavList>
      </MobileNav>
    </>
  );
};

export default Header;
