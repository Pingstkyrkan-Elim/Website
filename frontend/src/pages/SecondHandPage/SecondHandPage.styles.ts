import styled, { keyframes, css } from 'styled-components';

// ── Animations ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(36px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const lineGrow = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`;

// ── Page ──────────────────────────────────────────────────────────────────────

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f7f6f4;
  font-family: 'Inter', sans-serif;
  color: #1a1a1a;
  overflow-x: clip;
`;

// ── Hero ──────────────────────────────────────────────────────────────────────

export const Hero = styled.section`
  min-height: 100vh;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 6rem 2rem 5rem;
  text-align: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/pmu-hero.webp') 15% center / cover no-repeat;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(10, 8, 6, 0.2), rgba(10, 8, 6, 0.68));
    z-index: 0;
  }
`;

export const HeroEyebrow = styled.div`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(184, 134, 11, 0.9);
  margin-bottom: 1.5rem;
  animation: ${fadeUp} 0.8s ease both;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    background: rgba(184, 134, 11, 0.5);
  }
`;

export const HeroTitle = styled.h1`
  position: relative;
  z-index: 1;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(56px, 9vw, 120px);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.4rem;
  letter-spacing: -0.03em;
  line-height: 0.92;
  animation: ${fadeUp} 0.9s ease 0.1s both;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.7);
`;

export const HeroTagline = styled.p`
  position: relative;
  z-index: 1;
  font-size: clamp(15px, 1.6vw, 19px);
  color: rgba(255, 255, 255, 0.6);
  max-width: 520px;
  margin: 1.2rem auto 3rem;
  line-height: 1.7;
  font-weight: 300;
  animation: ${fadeUp} 0.9s ease 0.2s both;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.7);
`;

export const HeroBadges = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.9s ease 0.3s both;
`;

export const HeroBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 100px;
  padding: 0.5rem 1.1rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`;

export const HeroScroll = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  animation: ${fadeIn} 2s ease 1s both;
  opacity: 0.5;
`;

export const HeroScrollLine = styled.div`
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(184, 134, 11, 0.8), transparent);
`;

export const HeroScrollLabel = styled.span`
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
`;

// ── Info strip ────────────────────────────────────────────────────────────────

export const InfoStrip = styled.section`
  background: #ffffff;
  padding: 5rem 2rem;
`;

export const InfoInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const InfoBlock = styled.div``;

export const InfoLabel = styled.div`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(184, 134, 11, 0.7);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(184, 134, 11, 0.15);
    animation: ${lineGrow} 0.8s ease both;
    transform-origin: left;
  }
`;

export const HoursGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const HoursRow = styled.div<{ $closed?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  opacity: ${({ $closed }) => ($closed ? 0.35 : 1)};

  &:last-child {
    border-bottom: none;
  }
`;

export const HoursDay = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #1a1a1a;
`;

export const HoursTime = styled.span`
  font-size: 0.9rem;
  color: #555;
  font-variant-numeric: tabular-nums;
`;

export const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;

  &:hover span {
    color: #b8860b;
  }
`;

export const ContactIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(184, 134, 11, 0.08);
  border: 1px solid rgba(184, 134, 11, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  ${ContactItem}:hover & {
    background: rgba(184, 134, 11, 0.14);
    border-color: rgba(184, 134, 11, 0.3);
  }
`;

export const ContactText = styled.div``;

export const ContactTextLabel = styled.div`
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.35);
  margin-bottom: 0.15rem;
`;

export const ContactTextValue = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: #1a1a1a;
  transition: color 0.2s ease;
`;

// ── Mission / About ───────────────────────────────────────────────────────────

interface RevealProps {
  $visible: boolean;
}

export const AboutSection = styled.section<RevealProps>`
  background: #f7f6f4;
  padding: 6rem 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}
`;

export const AboutInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

export const AboutText = styled.div``;

export const SectionEyebrow = styled.div`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(184, 134, 11, 0.7);
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 700;
  color: #111;
  margin: 0 0 1.5rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
`;

export const SectionBody = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: #555;
  margin: 0 0 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const PMULink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #b8860b;
  text-decoration: none;
  border-bottom: 1px solid rgba(184, 134, 11, 0.3);
  padding-bottom: 2px;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    color: #8a6200;
    border-color: rgba(184, 134, 11, 0.7);
  }
`;

export const AboutVisual = styled.div`
  position: relative;
`;

export const AboutCard = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.06);
`;

export const AboutCardStat = styled.div`
  text-align: center;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }
`;

export const AboutCardStatNumber = styled.div`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #f0c040, #b8860b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.4rem;
`;

export const AboutCardStatLabel = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #888;
`;

// ── Donate CTA ────────────────────────────────────────────────────────────────

export const DonateSection = styled.section<RevealProps>`
  background: #111;
  padding: 6rem 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}
`;

export const DonateInner = styled.div`
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
`;

export const DonateTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 3.5vw, 46px);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
`;

export const DonateBody = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.45);
  margin: 0 0 2.5rem;
`;

export const DonateButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ButtonPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #f0c040, #b8860b);
  color: #1a1000;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 0.85rem 2rem;
  border-radius: 100px;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(184, 134, 11, 0.35);
  }
`;

export const ButtonOutline = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 0.85rem 2rem;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  text-decoration: none;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    color: #fff;
  }
`;

// ── Gallery ───────────────────────────────────────────────────────────────────

export const GallerySection = styled.section<RevealProps>`
  background: #0d0d0d;
  padding: 6rem 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}
`;

export const GalleryHeader = styled.div`
  padding: 0 2rem 3rem;
  max-width: 1100px;
  margin: 0 auto;
`;

export const GalleryTrack = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0 2rem 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface GalleryCardProps {
  $index: number;
  $visible: boolean;
}

export const GalleryCard = styled.div<GalleryCardProps>`
  flex: 0 0 auto;
  width: clamp(260px, 36vw, 480px);
  aspect-ratio: 3/2;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  scroll-snap-align: start;
  cursor: pointer;
  background: #1a1a1a;
  opacity: 0;
  transform: translateY(40px) scale(0.96);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease,
    box-shadow 0.3s ease;
  transition-delay: ${({ $index }) => $index * 60}ms;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0) scale(1);
    `}

  &:hover {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
    transform: translateY(-6px) scale(1.01);
  }
`;

export const GalleryCardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition:
    opacity 0.5s ease,
    transform 0.6s ease;
  &.loaded {
    opacity: 1;
  }
  ${GalleryCard}:hover & {
    transform: scale(1.06);
  }
`;

export const GalleryCardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 1.2rem;

  ${GalleryCard}:hover & {
    opacity: 1;
  }
`;

export const GalleryCardZoomIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: white;
  margin-left: auto;
`;

export const GalleryDots = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  padding: 1.5rem 2rem 0;
`;

export const GalleryDot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '20px' : '6px')};
  height: 6px;
  border-radius: 3px;
  background: ${({ $active }) =>
    $active ? '#f0c040' : 'rgba(255,255,255,0.2)'};
  border: none;
  cursor: pointer;
  padding: 0;
  transition:
    width 0.3s ease,
    background 0.3s ease;
`;

export const GalleryPlaceholder = styled.div`
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 2rem;
  border: 1.5px dashed rgba(255, 255, 255, 0.1);
  border-radius: 16px;
`;

export const GalleryPlaceholderIcon = styled.div`
  font-size: 2.5rem;
  opacity: 0.3;
`;

export const GalleryPlaceholderText = styled.p`
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  margin: 0;
`;

// ── Lightbox ──────────────────────────────────────────────────────────────────

const lightboxIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const imgIn = keyframes`
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: scale(1); }
`;

export const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${lightboxIn} 0.3s ease both;
`;

export const LightboxImg = styled.img`
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
  animation: ${imgIn} 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
`;

export const LightboxClose = styled.button`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

export const LightboxNav = styled.button<{ $dir: 'prev' | 'next' }>`
  position: fixed;
  top: 50%;
  ${({ $dir }) => ($dir === 'prev' ? 'left: 1.5rem' : 'right: 1.5rem')};
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

export const LightboxCounter = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.4);
`;

// ── Loading ───────────────────────────────────────────────────────────────────

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(184, 134, 11, 0.4);
`;
