import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainContent = styled.main`
  flex: 1;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
`;
