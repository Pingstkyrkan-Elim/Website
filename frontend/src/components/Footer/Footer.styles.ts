import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background: linear-gradient(
    rgba(0, 0, 0, 0.8), 
    rgba(0, 0, 0, 0.9)
  ), url('/images/HomePage.png'), 
  linear-gradient(135deg, #4a3418 0%, #2a1e12 100%);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  padding: 5rem 0 3rem;
  margin-top: auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2px);
  }

  > * {
    position: relative;
    z-index: 2;
  }

  @media (max-width: 768px) {
    background-attachment: scroll;
  }
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

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const FooterSection = styled.div`
  flex: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 0 1 350px;
  }
`;

export const SectionTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

export const Description = styled.p`
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  opacity: 0.9;

  .icon {
    width: 16px;
    height: 16px;
    fill: ${({ theme }) => theme.colors.secondary.main};
    flex-shrink: 0;
  }
`;

export const ServiceTimes = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ServiceTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }

  .day {
    font-weight: 500;
  }

  .time {
    color: ${({ theme }) => theme.colors.secondary.main};
    font-weight: 600;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.neutral.white};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary.main};
    color: ${({ theme }) => theme.colors.neutral.dark};
    transform: translateY(-2px);
  }

  .icon {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;

export const BottomBar = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  opacity: 0.8;
`;

export const Copyright = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: 0.9rem;

  a {
    color: ${({ theme }) => theme.colors.secondary.main};

    &:hover {
      color: ${({ theme }) => theme.colors.secondary.light};
    }
  }
`;

export const LocationNote = styled.p`
  font-size: 0.9rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.secondary.light};
`;
