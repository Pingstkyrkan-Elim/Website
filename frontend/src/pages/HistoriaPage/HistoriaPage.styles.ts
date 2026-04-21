import styled, { keyframes, css } from 'styled-components';

// ── Animations ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const lineGrow = keyframes`
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
`;

// ── Page wrapper ──────────────────────────────────────────────────────────────

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f8f7f4;
  font-family: 'Inter', sans-serif;
  overflow-x: clip;
`;

// ── Hero ──────────────────────────────────────────────────────────────────────

export const Hero = styled.section`
  min-height: 100vh;
  background:
    linear-gradient(rgba(8, 6, 4, 0.59), rgba(8, 6, 4, 0.67)),
    url('/images/historia-hero.avif') center center / cover no-repeat fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 4rem 2rem;
`;

export const HeroBackground = styled.div`
  display: none;
`;

export const HeroDecorYear = styled.div`
  position: absolute;
  bottom: 0.09em;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(120px, 20vw, 280px);
  font-weight: 700;
  color: rgba(109, 79, 2, 0.43);
  -webkit-text-stroke: 1px rgba(184, 134, 11, 0.4);
  letter-spacing: -0.05em;
  line-height: 1;
  user-select: none;
  white-space: nowrap;
  pointer-events: none;
  text-shadow: 0 2px 40px rgba(0, 0, 0, 0.6);
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  animation: ${fadeUp} 1s ease both;
`;

export const HeroEyebrow = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(184, 134, 11, 0.8);
  text-shadow:
    0 1px 12px rgba(0, 0, 0, 0.8),
    0 2px 24px rgba(0, 0, 0, 0.6);
`;

export const HeroTitle = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(72px, 12vw, 160px);
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.04em;
  line-height: 0.88;
  text-shadow:
    0 2px 20px rgba(0, 0, 0, 0.9),
    0 4px 40px rgba(0, 0, 0, 0.7);
`;

export const HeroSubtitle = styled.p`
  font-size: clamp(15px, 1.8vw, 20px);
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  max-width: 480px;
  line-height: 1.6;
  font-weight: 300;
  text-shadow:
    0 1px 12px rgba(0, 0, 0, 0.9),
    0 2px 24px rgba(0, 0, 0, 0.7);
`;

export const HeroScroll = styled.div`
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: ${fadeIn} 2s ease 1s both;
`;

export const HeroScrollLine = styled.div`
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, rgba(184, 134, 11, 0.6), transparent);
`;

export const HeroScrollLabel = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
`;

// ── Timeline section ──────────────────────────────────────────────────────────

export const TimelineSection = styled.section`
  position: relative;
  padding: 6rem 0 4rem;
`;

export const TimelineInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: calc(2rem + 1px);
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(184, 134, 11, 0.25) 8%,
      rgba(184, 134, 11, 0.25) 92%,
      transparent
    );
    transform-origin: top;
    animation: ${lineGrow} 1.5s ease both;

    @media (min-width: 700px) {
      left: 3rem;
    }
  }
`;

// ── Single entry ──────────────────────────────────────────────────────────────

interface EntryProps {
  $visible: boolean;
}

export const Entry = styled.article<EntryProps>`
  position: relative;
  padding: 0 0 5rem 3.5rem;
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}

  @media (min-width: 700px) {
    padding-left: 5rem;
  }

  &:last-child {
    padding-bottom: 2rem;
  }
`;

export const EntryDot = styled.div`
  position: absolute;
  left: calc(3.5rem - 1.5rem - 1px);
  top: 0.4rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #b8860b;
  box-shadow: 0 0 0 4px rgba(184, 134, 11, 0.12);

  @media (min-width: 700px) {
    left: calc(5rem - 1.5rem - 1px);
  }
`;

export const EntryPeriod = styled.div`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(40px, 7vw, 76px);
  font-weight: 700;
  color: rgba(184, 134, 11, 0.13);
  line-height: 1;
  letter-spacing: -0.04em;
  margin-bottom: 0.2rem;
  user-select: none;
  transition: color 0.3s ease;

  ${Entry}:hover & {
    color: rgba(184, 134, 11, 0.22);
  }
`;

export const EntryTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(22px, 3.5vw, 34px);
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.2rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

export const EntryDivider = styled.div`
  width: 36px;
  height: 2px;
  background: linear-gradient(to right, #b8860b, rgba(184, 134, 11, 0.15));
  margin: 1rem 0 1.4rem;
  border-radius: 2px;
`;

export const EntryContent = styled.div`
  font-size: 1rem;
  line-height: 1.85;
  color: #3a3530;
  max-width: 680px;

  p {
    margin: 0 0 1.1em;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

// ── Images ────────────────────────────────────────────────────────────────────

export const ImageGrid = styled.div<{ $count: number }>`
  display: grid;
  gap: 0.75rem;
  margin-top: 2rem;
  grid-template-columns: ${({ $count }) =>
    $count === 1 ? '1fr' : $count === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'};

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ImageItem = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: rgba(0, 0, 0, 0.04);

  img {
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
  }

  &:hover img {
    transform: scale(1.04);
  }

  &:first-child:only-child {
    aspect-ratio: 16 / 8;
    max-width: 680px;
  }
`;

// ── Leaders ───────────────────────────────────────────────────────────────────

export const LeadersSection = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  max-width: 680px;
`;

export const LeadersLabel = styled.div`
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #b8860b;
  margin-bottom: 0.85rem;
`;

export const LeadersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

export const LeaderPill = styled.span`
  display: inline-block;
  font-size: 0.78rem;
  color: #4a3e2e;
  background: rgba(184, 134, 11, 0.07);
  border: 1px solid rgba(184, 134, 11, 0.15);
  padding: 0.28rem 0.75rem;
  border-radius: 100px;
  font-weight: 500;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: rgba(184, 134, 11, 0.13);
    border-color: rgba(184, 134, 11, 0.28);
  }
`;

// ── Gallery (4+ images — horizontal scroll) ───────────────────────────────────

export const HistGalleryWrapper = styled.div`
  margin-top: 2rem;
  max-width: 680px;
`;

export const HistGalleryTrack = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 0.25rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const HistGalleryCard = styled.div`
  flex: 0 0 calc(50% - 0.375rem);
  scroll-snap-align: start;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  aspect-ratio: 4 / 3;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.07);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.25s ease;

  &:hover {
    border-color: rgba(184, 134, 11, 0.3);
    box-shadow: 0 6px 24px rgba(184, 134, 11, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 520px) {
    flex: 0 0 78%;
  }
`;

export const HistGalleryCardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition:
    opacity 0.3s ease,
    transform 0.5s ease;
  display: block;

  &.loaded {
    opacity: 1;
  }
  ${HistGalleryCard}:hover & {
    transform: scale(1.04);
  }
`;

export const HistGalleryCardOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0);
  color: #fff;
  opacity: 0;
  transition:
    background 0.2s ease,
    opacity 0.2s ease;

  ${HistGalleryCard}:hover & {
    background: rgba(0, 0, 0, 0.22);
    opacity: 1;
  }
`;

export const HistGalleryDots = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  margin-top: 0.85rem;
`;

export const HistGalleryDot = styled.button<{ $active: boolean }>`
  height: 4px;
  width: ${({ $active }) => ($active ? '20px' : '6px')};
  border-radius: 100px;
  background: ${({ $active }) =>
    $active ? '#b8860b' : 'rgba(184,134,11,0.22)'};
  border: none;
  padding: 0;
  cursor: pointer;
  transition:
    width 0.3s ease,
    background 0.2s ease;
`;

export const HistLightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(10, 8, 6, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  animation: ${fadeIn} 0.2s ease both;
`;

export const HistLightboxImg = styled.img`
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
  cursor: default;
  animation: ${fadeUp} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
`;

export const HistLightboxClose = styled.button`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
  }
`;

export const HistLightboxNav = styled.button<{ $dir: 'prev' | 'next' }>`
  position: fixed;
  ${({ $dir }) => ($dir === 'prev' ? 'left: 1.5rem' : 'right: 1.5rem')};
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const HistLightboxCounter = styled.div`
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.35);
`;

// ── Attribution ───────────────────────────────────────────────────────────────

export const AttributionSection = styled.footer`
  background: #0d0d0d;
  padding: 4rem 2rem;
  text-align: center;
`;

export const AttributionText = styled.p`
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.28);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.9;
`;

// ── Loading ───────────────────────────────────────────────────────────────────

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  color: rgba(184, 134, 11, 0.5);
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;
