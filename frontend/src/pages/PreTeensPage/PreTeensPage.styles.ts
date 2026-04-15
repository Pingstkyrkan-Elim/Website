import styled, { keyframes, css } from 'styled-components';

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

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
  50%       { box-shadow: 0 0 32px 8px rgba(139, 92, 246, 0.2); }
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
  background: ${({ $light }) => $light ? '#f0eeff' : '#09090f'};
  color: ${({ $light }) => $light ? '#09090f' : '#f5f0ff'};
  min-height: 100vh;
  overflow-x: hidden;
  font-family: 'Inter', -apple-system, sans-serif;
  transition: background 0.6s ease, color 0.6s ease;
`;

// ── Hero ──────────────────────────────────────────────────────────────────────

export const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* Logo gradient: cyan → violet → magenta */
  background: linear-gradient(135deg, #18c5e8 0%, #7c3aed 52%, #ff3cac 100%);

  /* Subtle noise texture for depth */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 60% at 20% 30%, rgba(255,255,255,0.10) 0%, transparent 60%),
      radial-gradient(ellipse 50% 50% at 80% 70%, rgba(0,0,0,0.12) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  /* Fade hero bottom into the LightSection below */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 280px;
    background: linear-gradient(to bottom, transparent 0%, #0d0a1a 100%);
    pointer-events: none;
    z-index: 0;
  }
`;

/* Kept as empty exports so JSX imports don't break — rendered as nothing */
export const HeroImage    = styled.div`display: none;`;
export const HeroDuotone  = styled.div`display: none;`;
export const HeroOverlay  = styled.div`display: none;`;

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
    filter: drop-shadow(0 6px 24px rgba(0,0,0,0.25));
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

  &::before, &::after {
    content: '';
    display: block;
    width: 24px;
    height: 1px;
    background: rgba(255,255,255,0.5);
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
  text-shadow: 0 4px 32px rgba(0,0,0,0.2);

  span {
    display: block;
    &.outline {
      color: transparent;
      -webkit-text-stroke: 2.5px rgba(255,255,255,0.9);
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
  background: rgba(255,255,255,0.95);
  color: #7c3aed;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s, box-shadow 0.25s;

  &:hover {
    background: #fff;
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(0,0,0,0.2);
  }
`;

export const HeroCTASecondary = styled(HeroCTA)`
  background: transparent;
  color: rgba(255,255,255,0.9);
  border: 1.5px solid rgba(255,255,255,0.45);

  &:hover {
    background: rgba(255,255,255,0.12);
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
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
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
  transition: opacity 1s ease, transform 1s ease;
  ${({ $visible }) => $visible
    ? css`opacity: 1; transform: translateY(0);`
    : css`opacity: 0; transform: translateY(30px);`
  }

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
    background: linear-gradient(to top, rgba(9,9,15,0.6) 0%, transparent 50%);
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
  background: #8b5cf6;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s;
  ${({ $visible }) => $visible
    ? css`opacity: 1; transform: translateY(0);`
    : css`opacity: 0; transform: translateY(30px);`
  }

  &:hover { box-shadow: 0 16px 40px rgba(139,92,246,0.4); }

  @media (max-width: 900px) { grid-column: span 1; }
`;

export const BentoAboutLabel = styled.div`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
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
  color: rgba(255,255,255,0.8);
  margin: 0;
`;

// Meeting card
export const BentoMeetingCard = styled.div<{ $visible: boolean }>`
  ${bentoCard}
  grid-column: span 3;
  background: #fbbf24;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  transition: opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s;
  ${({ $visible }) => $visible
    ? css`opacity: 1; transform: translateY(0);`
    : css`opacity: 0; transform: translateY(30px);`
  }

  &:hover { box-shadow: 0 16px 40px rgba(251,191,36,0.35); }

  @media (max-width: 900px) { grid-column: span 1; }
`;

export const BentoMeetingLabel = styled.div`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(9,9,15,0.6);
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
  color: rgba(9,9,15,0.65);
  margin-top: 4px;
`;

// Countdown card
export const BentoCountdownCard = styled.div<{ $visible: boolean }>`
  ${bentoCard}
  grid-column: span 4;
  background: #111118;
  border: 1px solid rgba(139,92,246,0.2);
  padding: 28px 24px;
  animation: ${pulseGlow} 4s ease-in-out infinite;
  transition: opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s;
  ${({ $visible }) => $visible
    ? css`opacity: 1; transform: translateY(0);`
    : css`opacity: 0; transform: translateY(30px);`
  }

  @media (max-width: 900px) { grid-column: span 2; }
  @media (max-width: 560px) { grid-column: span 1; }
`;

export const CountdownLabel = styled.div`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #a78bfa;
  margin-bottom: 16px;
`;

export const CountdownEvent = styled.div`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.8rem;
  color: #f5f0ff;
  margin-bottom: 20px;
  line-height: 1;
`;

export const CountdownNumbers = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

export const CountdownUnit = styled.div`
  text-align: center;
`;

export const CountdownNum = styled.div`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.2rem;
  line-height: 1;
  color: #a78bfa;
  animation: ${tickIn} 0.3s ease;
`;

export const CountdownUnitLabel = styled.div`
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(167,139,250,0.55);
  margin-top: 4px;
`;

// Verse card
export const BentoVerseCard = styled.div<{ $visible: boolean }>`
  ${bentoCard}
  grid-column: span 3;
  background: linear-gradient(135deg, #1a0a2e 0%, #0f0920 100%);
  border: 1px solid rgba(139,92,246,0.15);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s;
  ${({ $visible }) => $visible
    ? css`opacity: 1; transform: translateY(0);`
    : css`opacity: 0; transform: translateY(30px);`
  }

  @media (max-width: 900px) { grid-column: span 1; }
`;

export const VerseText = styled.blockquote`
  font-size: 0.88rem;
  line-height: 1.72;
  color: rgba(245,240,255,0.78);
  font-style: italic;
  margin: 0 0 12px;

  &::before {
    content: '"';
    display: block;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.5rem;
    line-height: 0.8;
    color: #8b5cf6;
    font-style: normal;
    margin-bottom: 8px;
  }
`;

export const VerseRef = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #a78bfa;
`;

// ── VÄRLDENS LJUS interactive section ────────────────────────────────────────

export const LightSection = styled.section<{ $light: boolean }>`
  padding: 120px 48px;
  text-align: center;
  cursor: default;
  position: relative;
  overflow: hidden;
  background: ${({ $light }) => $light ? '#f5f0ff' : '#0d0a1a'};
  transition: background 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 70% 60% at 50% 50%,
      ${({ $light }) => $light
        ? 'rgba(139,92,246,0.12)'
        : 'rgba(139,92,246,0.08)'}
      0%, transparent 70%
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
  color: ${({ $light }) => $light ? '#7c3aed' : '#a78bfa'};
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
  color: ${({ $light }) => $light ? '#09090f' : 'transparent'};
  -webkit-text-stroke: ${({ $light }) => $light ? '0' : '2px rgba(245,240,255,0.7)'};
  transition: color 0.4s ease, -webkit-text-stroke 0.4s ease;
  margin: 0 0 24px;
  cursor: pointer;
`;

export const LightSubtitle = styled.p<{ $light: boolean }>`
  font-size: 1rem;
  line-height: 1.75;
  color: ${({ $light }) => $light ? 'rgba(9,9,15,0.6)' : 'rgba(245,240,255,0.5)'};
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
  color: ${({ $light }) => $light ? '#7c3aed' : 'rgba(167,139,250,0.5)'};
  background: ${({ $light }) => $light ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.06)'};
  border: 1.5px solid ${({ $light }) => $light ? 'rgba(139,92,246,0.4)' : 'rgba(139,92,246,0.15)'};
  transition: color 0.5s ease, background 0.5s ease, border-color 0.5s ease,
              box-shadow 0.5s ease;
  box-shadow: ${({ $light }) => $light ? '0 0 32px rgba(139,92,246,0.3)' : 'none'};
  animation: ${({ $light }) => $light ? css`${rotateSlow} 8s linear infinite` : 'none'};

  svg { width: 26px; height: 26px; }
`;

// ── Closing section ───────────────────────────────────────────────────────────

export const ClosingSection = styled.section`
  background: #09090f;
  padding: 100px 48px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 30% 50%, rgba(139,92,246,0.07) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 70% 50%, rgba(251,191,36,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 72px 24px;
  }
`;

export const ClosingLabel = styled.div`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #a78bfa;
  margin-bottom: 20px;
`;

export const ClosingTitle = styled.h2`
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem, 9vw, 8rem);
  font-weight: 400;
  line-height: 0.92;
  color: #f5f0ff;
  margin: 0 0 16px;
`;

export const ClosingSubtitle = styled.p`
  font-size: 0.95rem;
  color: rgba(245,240,255,0.45);
  letter-spacing: 0.08em;
  margin: 0 0 44px;
`;

export const ClosingMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 48px;
`;

export const ClosingMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.88rem;
  font-weight: 500;
  color: rgba(245,240,255,0.6);

  svg { opacity: 0.55; flex-shrink: 0; }

  span {
    color: #fbbf24;
    font-weight: 700;
  }
`;

export const ClosingDot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(245,240,255,0.2);
`;

export const ClosingCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 40px;
  background: transparent;
  color: #f5f0ff;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border: 1.5px solid rgba(139,92,246,0.5);
  border-radius: 100px;
  transition: background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.2s;

  &:hover {
    background: rgba(139,92,246,0.12);
    border-color: #8b5cf6;
    box-shadow: 0 0 24px rgba(139,92,246,0.3);
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
    rgba(139,92,246,0.2) 20%,
    rgba(139,92,246,0.2) 80%,
    transparent
  );
`;
