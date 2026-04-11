import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background:
    linear-gradient(rgba(0,0,0,0.82), rgba(0,0,0,0.92)),
    url('/images/HomePage.png') center center / cover no-repeat fixed;
  color: white;
  padding: 4.5rem 0 0;
  margin-top: auto;
  position: relative;

  @media (max-width: 768px) {
    background-attachment: scroll;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (min-width: 768px) {
    padding: 0 3rem;
  }
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BrandName = styled.div`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.01em;
  line-height: 1.2;
`;

export const BrandTagline = styled.div`
  font-size: 0.82rem;
  color: rgba(255,255,255,0.35);
  line-height: 1.6;
  max-width: 220px;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-top: 0.5rem;
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  color: rgba(255,255,255,0.6);
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(184,134,11,0.15);
    border-color: rgba(184,134,11,0.3);
    color: #f0c040;
    transform: translateY(-2px);
  }

  .icon {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionLabel = styled.div`
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(184,134,11,0.7);
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  color: rgba(255,255,255,0.6);
  font-size: 0.85rem;
  line-height: 1.5;

  svg {
    flex-shrink: 0;
    margin-top: 1px;
    color: rgba(184,134,11,0.6);
  }
`;

export const ServiceRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const ServiceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);

  &:last-child { border-bottom: none; }
`;

export const ServiceDay = styled.span`
  font-size: 0.83rem;
  color: rgba(255,255,255,0.5);
`;

export const ServiceTime = styled.span`
  font-size: 0.83rem;
  font-weight: 600;
  color: rgba(184,134,11,0.85);
`;

export const DonationRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

export const DonationRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const DonationLabel = styled.div`
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(184,134,11,0.6);
`;

export const DonationValue = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  letter-spacing: 0.02em;
`;

export const DonationNote = styled.div`
  font-size: 0.75rem;
  color: rgba(255,255,255,0.3);
  font-style: italic;
  margin-top: 0.2rem;
`;

export const BottomBar = styled.div`
  border-top: 1px solid rgba(255,255,255,0.07);
  margin-top: 3.5rem;
  padding: 1.4rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Copyright = styled.p`
  font-size: 0.78rem;
  color: rgba(255,255,255,0.3);
  margin: 0;

  a {
    color: rgba(184,134,11,0.6);
    text-decoration: none;
    &:hover { color: #f0c040; }
  }
`;

export const LocationNote = styled.p`
  font-size: 0.78rem;
  color: rgba(255,255,255,0.25);
  margin: 0;
`;

