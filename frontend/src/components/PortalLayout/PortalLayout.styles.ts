import styled from 'styled-components';

export const PortalWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f2efe9;
`;

// ── Sidebar ───────────────────────────────────────────────────────────────────

export const Sidebar = styled.aside`
  width: 240px;
  min-width: 240px;
  background: #12171f;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
`;

export const SidebarHeader = styled.div`
  padding: 1.6rem 1.4rem 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

export const SidebarChurchName = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: #e8d5a3;
  letter-spacing: 0.03em;
  line-height: 1.2;
`;

export const SidebarPortalLabel = styled.div`
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.28);
  margin-top: 0.2rem;
`;

export const SidebarNav = styled.nav`
  flex: 1;
  padding: 1rem 0.7rem;
  overflow-y: auto;
`;

export const NavSection = styled.div`
  margin-bottom: 0.3rem;
`;

export const NavSectionLabel = styled.div`
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.22);
  padding: 0.6rem 0.7rem 0.3rem;
`;

export const NavItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.65rem 0.8rem;
  border-radius: 7px;
  border: none;
  background: ${({ $active }) =>
    $active ? 'rgba(201, 169, 110, 0.12)' : 'transparent'};
  color: ${({ $active }) =>
    $active ? '#e8d5a3' : 'rgba(255, 255, 255, 0.5)'};
  font-size: 0.88rem;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  cursor: pointer;
  text-align: left;
  transition: background 0.15s, color 0.15s;
  position: relative;

  ${({ $active }) =>
    $active &&
    `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20%;
      bottom: 20%;
      width: 3px;
      background: #c9a96e;
      border-radius: 0 2px 2px 0;
    }
  `}

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.75);
  }
`;

export const NavIcon = styled.span`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.85;
`;

export const SidebarFooter = styled.div`
  padding: 1rem 0.7rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 0.8rem;
  margin-bottom: 0.3rem;
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(201, 169, 110, 0.2);
  border: 1px solid rgba(201, 169, 110, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 600;
  color: #e8d5a3;
  flex-shrink: 0;
`;

export const UserName = styled.div`
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 0.8rem;
  border-radius: 7px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  text-align: left;

  &:hover {
    background: rgba(220, 60, 60, 0.1);
    color: #f08080;
  }
`;

// ── Main area ─────────────────────────────────────────────────────────────────

export const MainArea = styled.main`
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const TopBar = styled.div`
  height: 56px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  gap: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const Breadcrumb = styled.div`
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.4);

  span {
    color: rgba(0, 0, 0, 0.7);
    font-weight: 500;
  }
`;

export const PageContent = styled.div`
  flex: 1;
  padding: 2.4rem 2.4rem;
`;
