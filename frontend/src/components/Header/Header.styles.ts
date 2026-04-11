import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.header<{ $isOverHero?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(255, 255, 255, 0);
  transition:
    background 0.4s ease,
    border-color 0.4s ease;

  &:hover {
    background: rgba(8, 5, 2, 0.08);
    border-bottom-color: rgba(200, 160, 80, 0.08);
  }
`;

export const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  text-shadow:
    0 1px 4px rgba(0, 0, 0, 0.9),
    0 2px 14px rgba(0, 0, 0, 0.7),
    0 4px 28px rgba(0, 0, 0, 0.45);

  &:hover {
    color: white;
    opacity: 0.8;
  }

  .icon {
    width: 28px;
    height: 28px;
    margin-right: 0.5rem;
    fill: currentColor;
  }
`;

export const DesktopNav = styled.ul`
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2.5rem;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const NavItem = styled.li``;

export const NavLink = styled(Link)<{ $isActive?: boolean }>`
  color: white;
  font-weight: 400;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  position: relative;
  text-shadow:
    0 1px 4px rgba(0, 0, 0, 0.9),
    0 2px 14px rgba(0, 0, 0, 0.7),
    0 4px 28px rgba(0, 0, 0, 0.45);
  letter-spacing: 0.02em;

  ${({ $isActive }) =>
    $isActive &&
    `
    font-weight: 500;
    opacity: 1;
  `}

  &:hover {
    color: white;
    opacity: 0.85;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.6);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    &::after {
      width: 100%;
    }
  `}
`;

export const MobileMenuButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  cursor: pointer;
  padding: 0;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  @media (min-width: 1024px) {
    display: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .line {
    width: 18px;
    height: 1.5px;
    background: white;
    margin: 1.5px 0;
    transition: all 0.3s ease;
    border-radius: 1px;
  }
`;

export const MobileNavOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
`;

export const MobileNav = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 320px;
  background: linear-gradient(
    135deg,
    rgba(42, 30, 18, 0.97) 0%,
    rgba(74, 52, 24, 0.97) 100%
  );
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1001;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  overflow-y: auto;

  @media (max-width: 375px) {
    width: 100vw;
  }
`;

export const MobileNavHeader = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const MobileNavTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  font-family: 'Inter', sans-serif;
`;

export const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

export const MobileNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 2rem 0;
`;

export const MobileNavItem = styled.li`
  margin: 0;
`;

export const MobileNavLink = styled(Link)<{ $isActive?: boolean }>`
  display: block;
  padding: 1rem 2rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;

  ${({ $isActive }) =>
    $isActive &&
    `
    color: white;
    background: rgba(255, 255, 255, 0.05);
    border-left-color: white;
    font-weight: 500;
  `}

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.03);
  }
`;

// Dropdown styles
export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button<{ $isActive?: boolean }>`
  color: white;
  font-weight: 400;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  text-shadow:
    0 1px 4px rgba(0, 0, 0, 0.9),
    0 2px 14px rgba(0, 0, 0, 0.7),
    0 4px 28px rgba(0, 0, 0, 0.45);
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  ${({ $isActive }) =>
    $isActive &&
    `
    font-weight: 500;
    opacity: 1;
  `}

  &:hover {
    color: white;
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.6);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    &::after {
      width: 100%;
    }
  `}

  .arrow {
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 4px solid currentColor;
    transition: transform 0.2s ease;
  }

  &:hover .arrow,
  &.open .arrow {
    transform: rotate(180deg);
  }
`;

export const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background: rgba(12, 7, 2, 0.72);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 12px;
  border: 1px solid rgba(200, 160, 80, 0.2);
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.35),
    0 0 1px rgba(200, 160, 80, 0.15);
  min-width: 220px;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1000;
`;

export const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
  transition: all 0.2s ease;
  border-left: 2px solid transparent;

  &:hover {
    background: rgba(200, 160, 80, 0.12);
    color: white;
    border-left-color: rgba(200, 160, 80, 0.5);
  }
`;
