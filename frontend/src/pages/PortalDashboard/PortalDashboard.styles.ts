import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const DashboardWrapper = styled.div`
  animation: ${fadeUp} 0.35s ease;
`;

export const WelcomeHeader = styled.div`
  margin-bottom: 2.4rem;
`;

export const WelcomeGreeting = styled.h1`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2.2rem;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 0.5rem;
  line-height: 1.2;
`;

export const WelcomeSubtitle = styled.p`
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.45);
  margin: 0;
  max-width: 560px;
  line-height: 1.6;
`;

export const SectionTitle = styled.h2`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.35);
  margin: 0 0 1rem;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2.4rem;
`;

export const PermissionCard = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

export const CardIconWrap = styled.div<{ $color: string }>`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.3rem;
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
`;

export const CardDescription = styled.p`
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.45);
  margin: 0;
  line-height: 1.5;
  flex: 1;
`;

export const CardCTA = styled.span`
  font-size: 0.82rem;
  font-weight: 600;
  color: #c9a96e;
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &::after {
    content: '→';
  }
`;

export const InfoBox = styled.div`
  background: rgba(201, 169, 110, 0.08);
  border: 1px solid rgba(201, 169, 110, 0.2);
  border-radius: 8px;
  padding: 1rem 1.2rem;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.5);
  line-height: 1.6;

  strong {
    color: rgba(0, 0, 0, 0.7);
  }
`;
