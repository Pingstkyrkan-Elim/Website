import styled, { css, keyframes, createGlobalStyle } from 'styled-components';

export const PreTeensFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
`;

// ── Design tokens ─────────────────────────────────────────────────────────────
// Dark base + electric violet accent + gold secondary

// ── Animations ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const tickIn = keyframes`
  0%   { transform: translateY(-8px) scale(0.9); opacity: 0; }
  100% { transform: translateY(0)    scale(1);   opacity: 1; }
`; 

const rotateSlow = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

// ── Page wrapper ──────────────────────────────────────────────────────────────

export const PTWrapper = styled.div<{ $light: boolean }>`
  background: ${({ $light }) => ($light ? '#f0eeff' : '#09090f')};
  color: ${({ $light }) => ($light ? '#09090f' : '#f5f0ff')};
  min-height: 100vh;
  overflow-x: clip;
  font-family:
    'Inter',
    -apple-system,
    sans-serif;
  transition:
    background 0.6s ease,
    color 0.6s ease;
`;

// ── Hero ──────────────────────────────────────────────────────────────────────

export const HeroSection = styled.section<{ $light: boolean }>`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  /* Photo layer */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/preteens-hero.jpg') center 65% / cover no-repeat;
    transform: scale(1);
    animation: heroZoom 14s ease-in-out infinite alternate;
    z-index: 0;
  }

  @keyframes heroZoom {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.06);
    }
  }

  /* Gradient overlay — brand colours at ~70% opacity so photo bleeds through */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        to bottom,
        transparent 55%,
        ${({ $light }) => ($light ? '#f0eeff' : '#0d0a1a')} 100%
      ),
      linear-gradient(
        135deg,
        rgba(24, 197, 232, 0.68) 0%,
        rgba(124, 58, 237, 0.62) 52%,
        rgba(255, 60, 172, 0.68) 100%
      );
    pointer-events: none;
    z-index: 1;
    transition: background 0.6s ease;
  }
`;

/* Kept as empty exports so JSX imports don't break — rendered as nothing */
export const HeroImage = styled.div`
  display: none;
`;
export const HeroDuotone = styled.div`
  display: none;
`;
export const HeroOverlay = styled.div`
  display: none;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
  padding: 120px 48px 80px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 100px 24px 60px;
  }
`;

export const HeroLogoRow = styled.div`
  margin-bottom: 28px;
  opacity: 0;
  animation: ${fadeUp} 0.7s ease forwards 0.1s;
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 20px;

  img {
    width: 190px;
    height: 190px;
    object-fit: cover;
    border-radius: 50%;
    filter: drop-shadow(0 6px 24px rgba(0, 0, 0, 0.25));
  }
`;

export const HeroEyebrow = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 16px;
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  animation: ${fadeUp} 0.7s ease forwards 0.2s;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 24px;
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
  }
`;

export const HeroTitle = styled.h1`
  font-family: 'Bebas Neue', 'Inter', sans-serif;
  font-size: clamp(4.5rem, 14vw, 12rem);
  font-weight: 400;
  line-height: 0.88;
  letter-spacing: 0.01em;
  color: #fff;
  margin: 0 0 24px;
  opacity: 0;
  animation: ${fadeUp} 0.8s ease forwards 0.35s;
  text-shadow: 0 4px 32px rgba(0, 0, 0, 0.2);

  span {
    display: block;
    &.outline {
      color: transparent;
      -webkit-text-stroke: 2.5px rgba(255, 255, 255, 0.9);
      text-shadow: none;
    }
  }
`;

export const HeroTagline = styled.p`
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.78);
  margin: 0 0 36px;
  letter-spacing: 0.06em;
  opacity: 0;
  animation: ${fadeUp} 0.8s ease forwards 0.5s;
`;

export const HeroCTARow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  opacity: 0;
  animation: ${fadeUp} 0.8s ease forwards 0.65s;
`;

export const HeroCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: rgba(255, 255, 255, 0.95);
  color: #7c3aed;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  transition:
    background 0.25s,
    transform 0.2s,
    box-shadow 0.25s;

  &:hover {
    background: #fff;
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.2);
  }
`;

export const HeroCTASecondary = styled(HeroCTA)`
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  border: 1.5px solid rgba(255, 255, 255, 0.45);

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    box-shadow: none;
    color: #fff;
  }
`;

// ── Bento Grid ────────────────────────────────────────────────────────────────

export const BentoSection = styled.section`
  padding: 80px 48px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 52px 20px;
  }
`;

export const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(120px, auto);
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

// Base bento card
const bentoCard = css`
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px) scale(1.01);
  }
`;

// Photo card — tall, spans 2 rows
export const BentoPhotoCard = styled.div<{ $visible: boolean }>`
  ${bentoCard}
  grid-column: span 5;
  grid-row: span 2;
  min-height: 480px;
  background: #111118;
  transition:
    opacity 1s ease,
    transform 1s ease;
  ${({ $visible }) =>
    $visible
      ? css`
          opacity: 1;
          transform: translateY(0);
        `
      : css`
          opacity: 0;
          transform: translateY(30px);
        `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(9, 9, 15, 0.6) 0%,
      transparent 50%
    );
  }

  @media (max-width: 900px) {
    grid-column: span 2;
    grid-row: span 1;
    min-height: 260px;
  }

  @media (max-width: 560px) {
    grid-column: span 1;
  }
`;

// About card
export const BentoAboutCard = styled.div<{ $visible: boolean }>`
  ${bentoCard}
  grid-column: span 4;
  background: #ec5cf6;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition:
    opacity 0.9s ease 0.1s,
    transform 0.9s ease 0.1s;
  ${({ $visible }) =>
    $visible
      ? css`
          opacity: 1;
          transform: translateY(0);
        `
      : css`
          opacity: 0;
          transform: translateY(30px);
        `}

  &:hover {
    box-shadow: 0 16px 40px rgba(139, 92, 246, 0.4);
  }

  @media (max-width: 900px) {
    grid-column: span 1;
  }
`;

export const BentoAboutLabel = styled.div`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
`;

export const BentoAboutTitle = styled.h3`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.2rem;
  line-height: 1;
  color: #fff;
  margin: 0 0 8px;
`;

export const BentoAboutText = styled.p`
  font-size: 0.88rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

// Meeting card
export const BentoMeetingCard = styled.div<{ $visible: boolean }>`
  ${bentoCard}
  grid-column: span 3;
  background: #bff178;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  transition:
    opacity 0.9s ease 0.2s,
    transform 0.9s ease 0.2s;
  ${({ $visible }) =>
    $visible
      ? css`
          opacity: 1;
          transform: translateY(0);
        `
      : css`
          opacity: 0;
          transform: translateY(30px);
        `}

  &:hover {
    box-shadow: 0 16px 40px rgba(251, 191, 36, 0.35);
  }

  @media (max-width: 900px) {
    grid-column: span 1;
  }
`;

export const BentoMeetingLabel = styled.div`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(9, 9, 15, 0.6);
  margin-bottom: 8px;
`;

export const BentoMeetingDay = styled.div`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  line-height: 0.95;
  color: #09090f;
`;

export const BentoMeetingTime = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #09090f;
`;

export const BentoMeetingPlace = styled.div`
  font-size: 0.82rem;
  font-weight: 500;
  color: rgba(9, 9, 15, 0.65);
  margin-top: 4px;
`;

// Countdown card — neon cyan
const pulseGlowCyan = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.0); }
  50%       { box-shadow: 0 0 28px 6px rgba(0, 240, 255, 0.18); }
`;

export const BentoCountdownCard = styled.div<{
  $visible: boolean;
  $light: boolean;
}>`
  ${bentoCard}
  grid-column: span 4;
  background: ${({ $light }) =>
    $light
      ? 'linear-gradient(145deg, #75dbf0 0%, #ffccf3 100%)'
      : 'linear-gradient(145deg, #001a22 0%, #000e18 100%)'};
  border: 1.5px solid
    rgba(0, 240, 255, ${({ $light }) => ($light ? '0.7' : '0.45')});
  padding: 28px 24px;
  animation: ${pulseGlowCyan} 3.5s ease-in-out infinite;
  transition:
    opacity 0.9s ease 0.3s,
    transform 0.9s ease 0.3s,
    background 0.5s ease,
    border-color 0.5s ease;
  ${({ $visible }) =>
    $visible
      ? css`
          opacity: 1;
          transform: translateY(0);
        `
      : css`
          opacity: 0;
          transform: translateY(30px);
        `}

  &:hover {
    box-shadow: 0 0 36px rgba(0, 240, 255, 0.28);
  }

  @media (max-width: 900px) {
    grid-column: span 2;
  }
  @media (max-width: 560px) {
    grid-column: span 1;
  }
`;

export const CountdownLabel = styled.div<{ $light?: boolean }>`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ $light }) => ($light ? '#d009bc' : '#00f0ff')};
  margin-bottom: 25px;
  text-shadow: ${({ $light }) =>
    $light ? 'none' : '0 0 10px rgba(0,240,255,0.6)'};
  transition: color 0.5s ease;
`;

export const CountdownLabelUnder = styled.div<{ $light?: boolean }>`
  font-size: 0.9rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: ${({ $light }) => ($light ? '#f72a2a' : '#e600ff')};
  margin-bottom: 25px;
  margin-top: 25px;
  text-shadow: ${({ $light }) =>
    $light ? 'none' : '0 0 10px rgba(229, 255, 0, 0.6)'};
  transition: color 0.5s ease;
`;

export const CountdownEvent = styled.div<{ $light?: boolean }>`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.8rem;
  color: ${({ $light }) => ($light ? '#5b3cf6' : '#e0faff')};
  margin-bottom: 30px;
  line-height: 1;
  transition: color 0.5s ease;
`;

export const CountdownNumbers = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

export const CountdownUnit = styled.div`
  text-align: center;
`;

export const CountdownNum = styled.div<{ $light?: boolean }>`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.2rem;
  line-height: 1;
  color: ${({ $light }) => ($light ? '#ee13f6' : '#00ff88')};
  text-shadow: ${({ $light }) =>
    $light ? 'none' : '0 0 14px rgba(255, 0, 76, 0.81)'};
  animation: ${tickIn} 0.3s ease;
  transition: color 0.5s ease;
`;

export const CountdownUnitLabel = styled.div<{ $light?: boolean }>`
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ $light }) =>
    $light ? 'rgba(0,122,138,0.6)' : 'rgba(0, 240, 255, 0.5)'};
  margin-top: 4px;
  transition: color 0.5s ease;
`;

// Verse card — neon orange / amber
const pulseGlowOrange = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 140, 30, 0.0); }
  50%       { box-shadow: 0 0 28px 6px rgba(255, 140, 30, 0.18); }
`;

export const BentoVerseCard = styled.div<{
  $visible: boolean;
  $light: boolean;
}>`
  ${bentoCard}
  grid-column: span 3;
  background: ${({ $light }) =>
    $light
      ? 'linear-gradient(145deg, #f02fac84 0%, #ffedd0 100%)'
      : 'linear-gradient(145deg, #1a000e 0%, #0f0700 100%)'};
  border: 1.5px solid
    rgba(255, 140, 30, ${({ $light }) => ($light ? '0.7' : '0.45')});
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${pulseGlowOrange} 4s ease-in-out infinite 0.8s;
  transition:
    opacity 0.9s ease 0.4s,
    transform 0.9s ease 0.4s,
    background 0.5s ease,
    border-color 0.5s ease;
  ${({ $visible }) =>
    $visible
      ? css`
          opacity: 1;
          transform: translateY(0);
        `
      : css`
          opacity: 0;
          transform: translateY(30px);
        `}

  &:hover {
    box-shadow: 0 0 36px rgba(255, 140, 30, 0.28);
  }

  @media (max-width: 900px) {
    grid-column: span 1;
  }
`;

export const VerseText = styled.blockquote<{ $light?: boolean }>`
  font-size: 0.98rem;
  line-height: 1.72;
  color: ${({ $light }) =>
    $light ? 'rgb(242, 7, 7)' : 'rgba(255,235,200,0.85)'};
  font-style: italic;
  margin: 0 0 12px;
  transition: color 0.5s ease;

  &::before {
    content: '"';
    display: block;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.5rem;
    line-height: 0.8;
    color: #ff8c1e;
    text-shadow: ${({ $light }) =>
      $light ? 'none' : '0 0 14px rgba(255,140,30,0.6)'};
    font-style: normal;
    margin-bottom: 8px;
  }
`;

export const VerseRef = styled.div<{ $light?: boolean }>`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ $light }) => ($light ? '#547605' : '#ff8c1e')};
  text-shadow: ${({ $light }) =>
    $light ? 'none' : '0 0 10px rgba(255,140,30,0.5)'};
  transition: color 0.5s ease;
`;

// ── VÄRLDENS LJUS interactive section ────────────────────────────────────────

export const LightSection = styled.section<{ $light: boolean }>`
  padding: 120px 48px;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: ${({ $light }) => ($light ? '#f5f0ff' : '#0d0a1a')};
  transition: background 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 70% 60% at 50% 50%,
      ${({ $light }) =>
          $light ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.08)'}
        0%,
      transparent 70%
    );
    transition: background 0.5s ease;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 80px 24px;
  }
`;

export const LightHint = styled.div<{ $light: boolean }>`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ $light }) => ($light ? '#7c3aed' : '#a78bfa')};
  margin-bottom: 24px;
  transition: color 0.5s ease;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease forwards;
`;

export const LightTitle = styled.h2<{ $light: boolean }>`
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(4rem, 12vw, 11rem);
  font-weight: 400;
  line-height: 0.9;
  letter-spacing: 0.02em;
  color: ${({ $light }) => ($light ? '#09090f' : 'transparent')};
  -webkit-text-stroke: ${({ $light }) =>
    $light ? '0' : '2px rgba(245,240,255,0.7)'};
  transition:
    color 0.4s ease,
    -webkit-text-stroke 0.4s ease;
  margin: 0 0 24px;
  cursor: pointer;
`;

export const LightSubtitle = styled.p<{ $light: boolean }>`
  font-size: 1rem;
  line-height: 1.75;
  color: ${({ $light }) =>
    $light ? 'rgba(66, 13, 241, 0.6)' : 'rgba(245,240,255,0.5)'};
  max-width: 460px;
  margin: 0 auto;
  transition: color 0.5s ease;
`;

export const LightBulb = styled.div<{ $light: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-bottom: 20px;
  color: ${({ $light }) => ($light ? '#7c3aed' : 'rgba(167,139,250,0.5)')};
  background: ${({ $light }) =>
    $light ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.06)'};
  border: 1.5px solid
    ${({ $light }) =>
      $light ? 'rgba(139,92,246,0.4)' : 'rgba(139,92,246,0.15)'};
  transition:
    color 0.5s ease,
    background 0.5s ease,
    border-color 0.5s ease,
    box-shadow 0.5s ease;
  box-shadow: ${({ $light }) =>
    $light ? '0 0 32px rgba(139,92,246,0.3)' : 'none'};
  animation: ${({ $light }) =>
    $light
      ? css`
          ${rotateSlow} 8s linear infinite
        `
      : 'none'};

  svg {
    width: 26px;
    height: 26px;
  }
`;

const bouncePop = keyframes`
  0%   { transform: scale(1); }
  40%  { transform: scale(1.08); }
  70%  { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

const wiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25%       { transform: rotate(-6deg); }
  75%       { transform: rotate(6deg); }
`;

export const LightToggleBtn = styled.button<{ $light: boolean }>`
  margin-top: 36px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  border-radius: 100px;
  border: 2px solid
    ${({ $light }) =>
      $light ? 'rgba(124,58,237,0.4)' : 'rgba(167,139,250,0.35)'};
  background: ${({ $light }) =>
    $light ? 'rgba(124,58,237,0.1)' : 'rgba(167,139,250,0.08)'};
  color: ${({ $light }) => ($light ? '#7c3aed' : '#a78bfa')};
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background 0.3s,
    border-color 0.3s,
    color 0.3s,
    box-shadow 0.3s;

  /* Subtle idle pulse to draw attention */
  animation: ${({ $light }) =>
    $light
      ? 'none'
      : css`
          ${wiggle} 3s ease-in-out 1.5s infinite
        `};

  &:hover {
    background: ${({ $light }) =>
      $light ? 'rgba(124,58,237,0.18)' : 'rgba(167,139,250,0.16)'};
    border-color: ${({ $light }) => ($light ? '#7c3aed' : '#a78bfa')};
    box-shadow: 0 0 20px
      ${({ $light }) =>
        $light ? 'rgba(124,58,237,0.25)' : 'rgba(167,139,250,0.2)'};
  }

  &:active {
    animation: ${bouncePop} 0.35s ease forwards;
  }

  svg {
    flex-shrink: 0;
  }
`;

// ── Closing section ───────────────────────────────────────────────────────────

export const ClosingSection = styled.section<{ $light: boolean }>`
  background: ${({ $light }) => ($light ? '#e8f06d' : '#09090f')};
  padding: 100px 48px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: background 0.6s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $light }) =>
      $light
        ? `radial-gradient(ellipse 60% 50% at 30% 50%, rgba(255,60,172,0.12) 0%, transparent 70%),
         radial-gradient(ellipse 40% 40% at 70% 50%, rgba(24,197,232,0.10) 0%, transparent 70%)`
        : `radial-gradient(ellipse 60% 50% at 30% 50%, rgba(139,92,246,0.07) 0%, transparent 70%),
         radial-gradient(ellipse 40% 40% at 70% 50%, rgba(251,191,36,0.05) 0%, transparent 70%)`};
    pointer-events: none;
    transition: background 0.6s ease;
  }

  @media (max-width: 768px) {
    padding: 72px 24px;
  }
`;

export const ClosingLabel = styled.div<{ $light: boolean }>`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ $light }) => ($light ? '#f919f5' : '#a78bfa')};
  margin-bottom: 20px;
  transition: color 0.5s ease;
`;

export const ClosingTitle = styled.h2<{ $light: boolean }>`
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem, 9vw, 8rem);
  font-weight: 400;
  line-height: 0.92;
  color: ${({ $light }) => ($light ? '#0a88dc' : '#f5f0ff')};
  margin: 0 0 16px;
  transition: color 0.5s ease;
`;

export const ClosingSubtitle = styled.p<{ $light: boolean }>`
  font-size: 0.95rem;
  color: ${({ $light }) =>
    $light ? 'rgba(19, 98, 5, 0.93)' : 'rgba(245,240,255,0.45)'};
  letter-spacing: 0.08em;
  margin: 0 0 44px;
  transition: color 0.5s ease;
`;

export const ClosingMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 48px;
`;

export const ClosingMetaItem = styled.div<{ $light: boolean }>`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.88rem;
  font-weight: 500;
  color: ${({ $light }) =>
    $light ? 'rgba(26,0,80,0.75)' : 'rgba(245,240,255,0.6)'};
  transition: color 0.5s ease;

  svg {
    opacity: 0.7;
    flex-shrink: 0;
  }

  span {
    color: ${({ $light }) => ($light ? '#f1078c' : '#fbbf24')};
    font-weight: 700;
    transition: color 0.5s ease;
  }
`;

export const ClosingDot = styled.div<{ $light: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({ $light }) =>
    $light ? 'rgba(26,0,80,0.3)' : 'rgba(245,240,255,0.2)'};
  transition: background 0.5s ease;
`;

export const ClosingCTA = styled.a<{ $light: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 40px;
  background: ${({ $light }) => ($light ? '#f728d1' : 'transparent')};
  color: ${({ $light }) => ($light ? '#e8f06d' : '#f5f0ff')};
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid
    ${({ $light }) => ($light ? '#cb0796' : 'rgba(139,92,246,0.5)')};
  border-radius: 100px;
  transition:
    background 0.25s,
    border-color 0.25s,
    box-shadow 0.25s,
    transform 0.2s,
    color 0.25s;

  &:hover {
    background: ${({ $light }) =>
      $light ? '#5b21b6' : 'rgba(139,92,246,0.12)'};
    border-color: ${({ $light }) => ($light ? '#5b21b6' : '#8b5cf6')};
    box-shadow: 0 0 24px
      ${({ $light }) =>
        $light ? 'rgba(124,58,237,0.4)' : 'rgba(139,92,246,0.3)'};
    color: ${({ $light }) => ($light ? '#e8f06d' : '#f5f0ff')};
    transform: translateY(-2px);
  }
`;

// ── Section separator ─────────────────────────────────────────────────────────

export const SectionSep = styled.div`
  height: 1px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(
    to right,
    transparent,
    rgba(139, 92, 246, 0.2) 20%,
    rgba(139, 92, 246, 0.2) 80%,
    transparent
  );
`;

// ── Pre-Teens News ────────────────────────────────────────────────────────────

const ptNewsReveal = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const PTNewsSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PTNewsSectionLabel = styled.div<{ $light?: boolean }>`
  font-family: 'Syne', 'Inter', sans-serif;
  font-size: 0.98rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ $light }) => ($light ? '#f31cdd' : '#ec5cf6')};
  margin-bottom: 1.4rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;

  &::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 2px;
    background: ${({ $light }) =>
      $light
        ? 'linear-gradient(to right, #d009bc, #5b3cf6)'
        : 'linear-gradient(to right, #ec5cf6, #06b8c5)'};
    border-radius: 2px;
  }
`;

export const PTNewsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface PTNewsCardProps { $idx: number; $visible: boolean; $light?: boolean; }

export const PTNewsCard = styled.div<PTNewsCardProps>`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border-radius: 18px;
  overflow: hidden;
  background: ${({ $light }) =>
    $light
      ? 'linear-gradient(135deg, #f0c6ff 0%, #c4d8ff 50%, #b0f0ff 100%)'
      : 'linear-gradient(135deg, #2e0854 0%, #0a1650 55%, #003850 100%)'};
  border: 1px solid ${({ $light }) =>
    $light ? 'rgba(180,80,255,0.25)' : 'rgba(180,80,255,0.2)'};
  box-shadow: ${({ $light }) =>
    $light
      ? '0 8px 32px rgba(124,58,237,0.15), 0 0 40px rgba(208,9,188,0.08)'
      : '0 8px 40px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.15)'};
  opacity: 0;
  animation: ${({ $visible }) => $visible ? ptNewsReveal : 'none'} 0.6s cubic-bezier(0.22,1,0.36,1)
    ${({ $idx }) => $idx * 0.1}s both;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;

  &:hover {
    border-color: ${({ $light }) =>
      $light ? 'rgba(124,58,237,0.45)' : 'rgba(180,80,255,0.5)'};
    box-shadow: ${({ $light }) =>
      $light
        ? '0 12px 48px rgba(124,58,237,0.2), 0 0 60px rgba(208,9,188,0.12)'
        : '0 12px 56px rgba(0,0,0,0.6), 0 0 60px rgba(124,58,237,0.25)'};
    transform: translateY(-3px);
  }
`;

export const PTNewsAccent = styled.div<{ $color: string }>`
  width: 5px;
  flex-shrink: 0;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 16px ${({ $color }) => $color}90, 0 0 32px ${({ $color }) => $color}40;
`;

export const PTNewsImage = styled.img`
  width: 170px;
  flex-shrink: 0;
  object-fit: cover;
  display: block;
  border-right: 1px solid rgba(0,0,0,0.06);
  order: -1;

  @media (max-width: 600px) {
    width: 100%;
    height: 160px;
    border-right: none;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }
`;

export const PTNewsBody = styled.div`
  flex: 1;
  padding: 1.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 0;
`;

export const PTNewsTag = styled.span<{ $color: string }>`
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  background: ${({ $color }) => $color}20;
  border: 1px solid ${({ $color }) => $color}50;
  padding: 0.2rem 0.65rem;
  border-radius: 100px;
  display: inline-block;
  width: fit-content;
`;

export const PTNewsTitle = styled.h4<{ $light?: boolean }>`
  font-family: 'Syne', 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ $light }) => ($light ? '#3b0080' : '#00f0ff')};
  text-shadow: ${({ $light }) =>
    $light ? 'none' : '0 0 20px rgba(0,240,255,0.5)'};
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.25;
`;

export const PTNewsDesc = styled.p<{ $light?: boolean }>`
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 450;
  color: ${({ $light }) => ($light ? 'rgba(40,0,80,0.75)' : 'rgba(200,230,255,0.8)')};
  margin: 0;
  line-height: 1.7;
`;
