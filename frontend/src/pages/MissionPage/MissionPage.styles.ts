import styled, { keyframes, css } from 'styled-components';

// ── Animations ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.6); opacity: 0; }
`;

// ── Page ──────────────────────────────────────────────────────────────────────

export const PageWrapper = styled.div`
  min-height: 100vh;
  background:
    linear-gradient(rgba(10, 8, 6, 0.72), rgba(10, 8, 6, 0.72)),
    url('/images/gold-world-map.jpg') center 40% / 80% no-repeat fixed,
    #12100d;
  font-family: 'Inter', sans-serif;
  color: #ffffff;
  overflow-x: clip;
`;

// ── Hero ──────────────────────────────────────────────────────────────────────

export const Hero = styled.section`
  position: relative;
  min-height: 100vh;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem 4rem;
  overflow: hidden;
`;

export const HeroMapBg = styled.div`
  display: none;
`;

export const HeroGlow = styled.div`
  display: none;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  animation: ${fadeUp} 0.9s ease both;
`;

export const HeroEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #b8860b;
  margin-bottom: 1.5rem;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 24px;
    height: 1px;
    background: #b8860b;
    opacity: 0.6;
  }
`;

export const HeroTitle = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(60px, 10vw, 130px);
  font-weight: 700;
  color: #ffffff;
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin: 0 0 1.5rem;
`;

export const HeroSubtitle = styled.p`
  font-size: clamp(15px, 1.6vw, 18px);
  color: rgba(255, 255, 255, 0.4);
  max-width: 500px;
  margin: 0 auto 3rem;
  line-height: 1.7;
  font-weight: 300;
`;

export const HeroStats = styled.div`
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export const HeroStat = styled.div`
  text-align: center;
`;

export const HeroStatNumber = styled.div`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #f0c040, #b8860b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
`;

export const HeroStatLabel = styled.div`
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 0.4rem;
`;

export const HeroScrollHint = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  opacity: 0.3;
`;

export const HeroScrollDot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #b8860b;
  animation: ${pulse} 1.8s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.3s;
  }
  &:nth-child(3) {
    animation-delay: 0.6s;
  }
`;

// ── Map section ───────────────────────────────────────────────────────────────

export const MapSection = styled.section`
  position: relative;
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

export const MapWrapper = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: #ffffff;
  padding: 2rem 2.5rem;
  box-shadow:
    0 0 0 1px rgba(184, 134, 11, 0.2),
    0 24px 60px rgba(0, 0, 0, 0.5),
    0 0 80px rgba(184, 134, 11, 0.06);
`;

export const MapImage = styled.img`
  width: 100%;
  display: block;
  opacity: 0.95;
`;

interface MarkerProps {
  $x: number;
  $y: number;
}

export const Marker = styled.button<MarkerProps>`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  transform: translate(-50%, -50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 2;

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #7a4f00;
    box-shadow:
      0 0 6px rgba(122, 79, 0, 0.6),
      0 1px 3px rgba(0, 0, 0, 0.3);
    position: relative;
    z-index: 1;
  }

  .ring {
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 1.5px solid rgba(122, 79, 0, 0.45);
    animation: ${pulse} 2s ease-in-out infinite;
  }

  .label {
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #3a2000;
    background: rgba(255, 255, 255, 0.85);
    padding: 2px 6px;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }

  &:hover .label {
    opacity: 1;
  }
`;

// ── Countries grid ────────────────────────────────────────────────────────────

export const GridSection = styled.section`
  position: relative;
  z-index: 2;
  background: transparent;
  padding: 5rem 2rem;

  @media (max-width: 640px) {
    padding: 3rem 1.25rem;
  }
`;

export const GridTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2rem;

  @media (max-width: 640px) {
    padding: 0;
  }
`;

export const GridSubtitle = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.35);
  margin: 0 0 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2rem;

  @media (max-width: 640px) {
    padding: 0;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 0;
  }
`;

interface CardProps {
  $visible: boolean;
}

export const Card = styled.article<CardProps>`
  background: rgba(18, 14, 10, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(184, 134, 11, 0.18);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(24px);

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
      transition:
        opacity 0.6s ease,
        transform 0.6s ease,
        border-color 0.3s ease,
        box-shadow 0.3s ease;
    `}

  &:hover {
    border-color: rgba(184, 134, 11, 0.35);
    box-shadow:
      0 8px 40px rgba(184, 134, 11, 0.1),
      0 0 0 1px rgba(184, 134, 11, 0.1);
    transform: translateY(-4px);
  }
`;

export const CardImageWrapper = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 0.5s ease,
    opacity 0.3s ease;
  opacity: 0;

  &.loaded {
    opacity: 1;
  }
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

export const CardImageNav = styled.button<{ $dir: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${({ $dir }) => ($dir === 'prev' ? 'left: 0.6rem' : 'right: 0.6rem')};
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 2;

  ${CardImageWrapper}:hover & {
    opacity: 1;
  }
`;

export const CardImageDots = styled.div`
  position: absolute;
  bottom: 0.6rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  z-index: 2;
`;

export const CardImageDot = styled.div<{ $active: boolean }>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${({ $active }) =>
    $active ? '#f0c040' : 'rgba(255,255,255,0.4)'};
  transition: background 0.2s ease;
`;

export const CardBody = styled.div`
  padding: 1.25rem 1.4rem 1.5rem;
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

export const CardCountry = styled.h3`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.01em;
`;

export const CardContinent = styled.span<{ $continent: string }>`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.25rem 0.65rem;
  border-radius: 100px;
  ${({ $continent }) => {
    switch ($continent) {
      case 'Afrika':
        return 'background: rgba(234,179,8,0.12); color: #fbbf24; border: 1px solid rgba(234,179,8,0.2);';
      case 'Asien':
        return 'background: rgba(16,185,129,0.12); color: #34d399; border: 1px solid rgba(16,185,129,0.2);';
      default:
        return 'background: rgba(99,102,241,0.12); color: #818cf8; border: 1px solid rgba(99,102,241,0.2);';
    }
  }}
`;

export const CardDescription = styled.p`
  font-size: 0.88rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
`;

// ── History section ───────────────────────────────────────────────────────────

export const HistorySection = styled.section`
  background: transparent;
  border-top: 1px solid rgba(184, 134, 11, 0.1);
  padding: 5rem 2rem;
`;

export const HistoryInner = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const HistoryTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(26px, 3.5vw, 40px);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.5rem;
`;

export const HistorySubtitle = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.3);
  margin: 0 0 3rem;
`;

export const HistoryGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
`;

export const HistoryCard = styled.div`
  background: rgba(18, 14, 10, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(184, 134, 11, 0.15);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: rgba(184, 134, 11, 0.3);
  }
`;

export const HistoryCardImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity 0.3s ease;
  &.loaded {
    opacity: 1;
  }
`;

export const HistoryCardBody = styled.div`
  padding: 1rem 1.1rem 1.2rem;
`;

export const HistoryCardTitle = styled.h4`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.5rem;
`;

export const HistoryCardText = styled.p`
  font-size: 0.82rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
`;

// ── Loading ───────────────────────────────────────────────────────────────────

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(184, 134, 11, 0.4);
`;
