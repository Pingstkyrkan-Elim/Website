import styled, { keyframes, createGlobalStyle } from 'styled-components';

export const UngdomarFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
`;

// ── Animations ────────────────────────────────────────────────────────────────

const gradientShift = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatB = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50%       { transform: translateY(-24px) scale(1.05); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(1.15); }
`;

const glitch = keyframes`
  0%  { clip-path: inset(0 0 95% 0); transform: translate(-4px, 0); }
  10% { clip-path: inset(40% 0 50% 0); transform: translate(4px, 0); }
  20% { clip-path: inset(70% 0 20% 0); transform: translate(-2px, 0); }
  30% { clip-path: inset(10% 0 85% 0); transform: translate(2px, 0); }
  40% { clip-path: inset(60% 0 30% 0); transform: translate(-4px, 0); }
  50% { clip-path: inset(0 0 100% 0);  transform: translate(0, 0); }
  100%{ clip-path: inset(0 0 100% 0);  transform: translate(0, 0); }
`;

const scanline = keyframes`
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const ticker = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const colorCycle = keyframes`
  0%   { color: #8b5cf6; }
  25%  { color: #ec4899; }
  50%  { color: #06b6d4; }
  75%  { color: #84cc16; }
  100% { color: #8b5cf6; }
`;

// ── Page wrapper ──────────────────────────────────────────────────────────────

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: #06040f;
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  color: #fff;
  overflow-x: clip;
`;

// ── Hero ──────────────────────────────────────────────────────────────────────

export const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: clip;
  padding: 120px 2rem 6rem;
`;

export const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 30%, rgba(139, 92, 246, 0.35) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 70%, rgba(236, 72, 153, 0.25) 0%, transparent 55%),
      radial-gradient(ellipse 50% 40% at 50% 100%, rgba(6, 182, 212, 0.2) 0%, transparent 50%),
      #06040f;
    animation: ${gradientShift} 12s ease infinite;
    background-size: 300% 300%;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(255,255,255,0.015) 2px,
        rgba(255,255,255,0.015) 4px
      );
    pointer-events: none;
  }
`;

export const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(to right, transparent, rgba(139, 92, 246, 0.6), transparent);
  z-index: 1;
  animation: ${scanline} 8s linear infinite;
  pointer-events: none;
`;

export const FloatOrb = styled.div<{ $color: string; $size: number; $x: number; $y: number; $delay?: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ $color }) => $color} 0%, transparent 70%);
  filter: blur(${({ $size }) => $size * 0.3}px);
  animation: ${floatB} ${({ $delay = 0 }) => 5 + $delay}s ease-in-out infinite;
  animation-delay: ${({ $delay = 0 }) => $delay}s;
  pointer-events: none;
  z-index: 0;
`;

export const WatermarkLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
`;

export const WatermarkText = styled.span<{
  $top: string;
  $left: string;
  $rotate: number;
  $size: string;
  $opacity: number;
  $delay: number;
  $duration: number;
  $blur?: number;
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  transform: rotate(${({ $rotate }) => $rotate}deg);
  font-family: 'Syne', 'Space Grotesk', sans-serif;
  font-size: ${({ $size }) => $size};
  font-weight: 800;
  letter-spacing: -0.04em;
  white-space: nowrap;
  user-select: none;
  color: #8b5cf6;
  opacity: ${({ $opacity }) => $opacity};
  -webkit-text-stroke: 1.5px currentColor;
  -webkit-text-fill-color: transparent;
  filter: blur(${({ $blur = 0 }) => $blur}px) drop-shadow(0 0 18px currentColor);
  animation: ${colorCycle} ${({ $duration }) => $duration}s linear infinite;
  animation-delay: -${({ $delay }) => $delay}s;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  width: min(96vw, 1200px);
`;

export const HeroTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.4);
  border-radius: 100px;
  padding: 0.4rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #a78bfa;
  margin-bottom: 1.8rem;
  animation: ${fadeUp} 0.8s ease both;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #8b5cf6;
    animation: ${pulse} 1.5s ease-in-out infinite;
    display: inline-block;
  }
`;

export const HeroTitle = styled.h1`
  font-family: 'Syne', 'Space Grotesk', sans-serif;
  font-size: clamp(3rem, 11vw, 9.5rem);
  font-weight: 800;
  line-height: 0.88;
  letter-spacing: -0.04em;
  margin: 0 0 1.2rem;
  background: linear-gradient(135deg, #fff 0%, #c4b5fd 35%, #ec4899 65%, #06b6d4 100%);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation:
    ${fadeUp} 0.9s ease 0.1s both,
    ${gradientShift} 6s ease infinite;
  position: relative;

  &::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(139,92,246,0.4) 0%, rgba(236,72,153,0.3) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${glitch} 6s steps(1) infinite;
    pointer-events: none;
  }
`;

export const HeroSub = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.35rem);
  color: rgba(255, 255, 255, 0.58);
  max-width: 540px;
  margin: 0 auto 2.5rem;
  line-height: 1.65;
  font-weight: 300;
  animation: ${fadeUp} 0.9s ease 0.25s both;
`;

export const HeroCTARow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.9s ease 0.4s both;
`;

export const CTAPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  border-radius: 100px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 0.03em;
  box-shadow: 0 0 30px rgba(139,92,246,0.5), 0 8px 32px rgba(139,92,246,0.3);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 0 50px rgba(139,92,246,0.7), 0 16px 48px rgba(139,92,246,0.4);
  }
`;

export const CTASecondary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  border-radius: 100px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.8);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  backdrop-filter: blur(12px);
  transition: border-color 0.2s, color 0.2s, background 0.2s;
  cursor: pointer;

  &:hover {
    border-color: rgba(139,92,246,0.6);
    color: #fff;
    background: rgba(139,92,246,0.1);
  }
`;

// ── Countdown ─────────────────────────────────────────────────────────────────

export const CountdownWrap = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  margin-top: 3.5rem;
  animation: ${fadeUp} 0.9s ease 0.55s both;

  @media (max-width: 480px) {
    gap: 0.7rem;
  }
`;

export const CountdownUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
`;

export const CountdownNumber = styled.div`
  font-family: 'Syne', monospace;
  font-size: clamp(2.2rem, 6vw, 3.5rem);
  font-weight: 800;
  color: #fff;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 0.4rem 0.9rem;
  min-width: 80px;
  text-align: center;
  backdrop-filter: blur(8px);
  letter-spacing: -0.03em;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(139,92,246,0.08) 0%, transparent 100%);
  }

  @media (max-width: 480px) {
    min-width: 58px;
    padding: 0.3rem 0.6rem;
  }
`;

export const CountdownLabel = styled.div`
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
`;

export const CountdownSep = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: rgba(139,92,246,0.5);
  align-self: center;
  padding-bottom: 1.4rem;
`;

export const CountdownCaption = styled.div`
  text-align: center;
  font-size: 0.99rem;
  color: rgba(71, 247, 44, 0.83);
  margin-top: 0.6rem;
  letter-spacing: 0.06em;
  animation: ${fadeUp} 0.9s ease 0.65s both;
  position: relative;
  z-index: 2;
`;

// ── Ticker ────────────────────────────────────────────────────────────────────

export const TickerBar = styled.div`
  background: linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4, #84cc16, #8b5cf6);
  background-size: 300% 100%;
  animation: ${gradientShift} 8s ease infinite;
  padding: 0.65rem 0;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  z-index: 5;
`;

export const TickerInner = styled.div`
  display: inline-flex;
  gap: 0;
  animation: ${ticker} 20s linear infinite;
`;

export const TickerItem = styled.span`
  font-family: 'Syne', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.85);
  padding: 0 2.5rem;

  &::before {
    content: '★';
    margin-right: 2.5rem;
  }
`;

// ── About strip ───────────────────────────────────────────────────────────────

export const AboutSection = styled.section`
  padding: 7rem 2rem;
  position: relative;
  overflow: visible;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(139,92,246,0.3), transparent);
  }
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
    gap: 3rem;
  }
`;

export const AboutText = styled.div``;

export const SectionEyebrow = styled.div`
  font-size: 0.92rem;
  font-weight: 900;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #ec25f0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;

  &::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 2px;
    background: linear-gradient(to right, #05b6ec, #ec4899);
    border-radius: 2px;
  }
`;

export const SectionTitle = styled.h2`
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin: 0 0 1.2rem;
  color: #fff;

  em {
    font-style: normal;
    background: linear-gradient(90deg, #8b5cf6, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const SectionBody = styled.p`
  font-size: 1.05rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.75;
  margin: 0;
  font-weight: 300;
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
`;

export const StatBox = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 1.2rem 1.4rem;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: rgba(139,92,246,0.4);
    background: rgba(139,92,246,0.06);
  }
`;

export const StatNum = styled.div`
  font-family: 'Syne', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.3rem;
`;

export const StatLabel = styled.div`
  font-size: 0.80rem;
  color: rgba(255, 255, 255, 0.44);
  font-weight: 500;
`;

export const AboutVisual = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BubbleCluster = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
`;

interface ClusterBubbleProps {
  $size: number;
  $top: string;
  $left: string;
  $glow: string;
  $border: string;
  $delay: number;
  $zIndex?: number;
}

export const ClusterBubble = styled.div<ClusterBubbleProps>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${({ $border }) => $border};
  box-shadow:
    0 0 20px ${({ $glow }) => $glow},
    0 0 60px ${({ $glow }) => $glow}60,
    inset 0 0 25px rgba(0,0,0,0.4);
  animation: ${floatB} ${({ $delay }) => 4 + $delay}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  z-index: ${({ $zIndex = 1 }) => $zIndex};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: saturate(1.1) brightness(0.9);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, ${({ $glow }) => $glow}20 0%, transparent 60%);
    pointer-events: none;
  }
`;

export const VisualCard = styled.div`
  width: 100%;
  max-width: 420px;
  aspect-ratio: 9 / 10;
  background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.15), rgba(6,182,212,0.1));
  border: 1px solid rgba(139,92,246,0.25);
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Syne', sans-serif;
  font-size: clamp(5rem, 12vw, 9rem);
  font-weight: 800;
  color: rgba(139,92,246,0.25);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      rgba(139,92,246,0.12) 60deg,
      transparent 120deg,
      rgba(236,72,153,0.08) 180deg,
      transparent 240deg,
      rgba(6,182,212,0.1) 300deg,
      transparent 360deg
    );
    animation: ${spin} 20s linear infinite;
  }

  &::after {
    content: 'FREDAG 19:00';
    position: absolute;
    bottom: 1.5rem;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.25em;
    color: rgba(255,255,255,0.4);
  }
`;

export const VisualDecor = styled.div<{ $color: string; $pos: string }>`
  position: absolute;
  ${({ $pos }) => $pos};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  filter: blur(20px);
  pointer-events: none;
`;

// ── Activities ────────────────────────────────────────────────────────────────

export const ActivitiesSection = styled.section`
  padding: 6rem 2rem;
  position: relative;
  overflow: visible;
`;

export const SectionHeader = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 4rem;

  /* Centre the eyebrow line inside a header */
  & > div:first-child {
    justify-content: center;
  }
`;

export const ActivitiesGrid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

interface ActivityCardProps {
  $accent: string;
  $visible?: boolean;
}

export const ActivityCard = styled.div<ActivityCardProps>`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 24px;
  padding: 2.2rem 2rem;
  position: relative;
  overflow: hidden;
  cursor: default;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(30px)')};
  transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, background 0.3s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ $accent }) => $accent};
    border-radius: 2px 2px 0 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: -60px;
    right: -60px;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: ${({ $accent }) => $accent};
    opacity: 0.06;
    filter: blur(30px);
    transition: opacity 0.3s;
  }

  &:hover {
    border-color: rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.05);

    &::after {
      opacity: 0.12;
    }
  }
`;

export const ActivityIcon = styled.div<{ $bg: string }>`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
`;

export const ActivityTitle = styled.h3`
  font-family: 'Syne', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.6rem;
  letter-spacing: -0.02em;
`;

export const ActivityDesc = styled.p`
  font-size: 0.92rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.65;
  margin: 0;
`;

export const ActivityTag = styled.span<{ $color: string }>`
  display: inline-block;
  margin-top: 1.2rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  background: ${({ $color }) => $color}18;
  border: 1px solid ${({ $color }) => $color}30;
  padding: 0.25rem 0.7rem;
  border-radius: 100px;
`;

// ── Join section ──────────────────────────────────────────────────────────────

export const JoinSection = styled.section`
  padding: 6rem 2rem;
  position: relative;
  overflow: visible;
`;

export const JoinCard = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: linear-gradient(135deg,
    rgba(139,92,246,0.15) 0%,
    rgba(236,72,153,0.1) 50%,
    rgba(6,182,212,0.08) 100%
  );
  border: 1px solid rgba(139,92,246,0.25);
  border-radius: 32px;
  padding: 4rem 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 50%, rgba(139,92,246,0.12) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(236,72,153,0.1) 0%, transparent 50%);
  }

  @media (max-width: 600px) {
    padding: 2.5rem 1.5rem;
    border-radius: 24px;
  }
`;

export const JoinTitle = styled.h2`
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0 0 1rem;
  position: relative;
  z-index: 1;
`;

export const JoinBody = styled.p`
  font-size: 1.05rem;
  color: rgba(255,255,255,0.5);
  max-width: 500px;
  margin: 0 auto 2.2rem;
  line-height: 1.7;
  position: relative;
  z-index: 1;
`;

export const JoinDetails = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2.2rem;
  position: relative;
  z-index: 1;
`;

export const JoinDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.7);
  font-weight: 500;

  span:first-child {
    font-size: 1.1rem;
  }
`;

export const JoinBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 2.4rem;
  border-radius: 100px;
  background: #fff;
  color: #06040f;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 0.02em;
  position: relative;
  z-index: 1;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 8px 40px rgba(255,255,255,0.15);

  &:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 16px 60px rgba(255,255,255,0.25);
  }
`;

// ── Info boxes ────────────────────────────────────────────────────────────────

export const InfoSection = styled.section`
  padding: 3rem 2rem 6rem;
`;

export const InfoGrid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoBox = styled.div<{ $accent: string }>`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: ${({ $accent }) => $accent}50;
    background: ${({ $accent }) => $accent}08;
  }
`;

export const InfoBoxIcon = styled.div`
  font-size: 1.8rem;
  margin-bottom: 0.3rem;
`;

export const InfoBoxTitle = styled.div`
  font-family: 'Syne', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
`;

export const InfoBoxText = styled.div`
  font-size: 0.88rem;
  color: rgba(255,255,255,0.4);
  line-height: 1.6;
`;

// ── Neon photo bubbles ────────────────────────────────────────────────────────

const bubbleReveal = keyframes`
  0%   { opacity: 0; transform: scale(0.4) translateY(30px); filter: blur(12px); }
  60%  { opacity: 1; transform: scale(1.06) translateY(-4px); filter: blur(0); }
  100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
`;

// BubblesColumn wraps ONE bubble — placed per-section, per-side
export const BubblesColumn = styled.div<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({ $side }) => $side}: 0;
  width: calc((100% - 1100px) / 2);
  min-width: 220px;
  pointer-events: none;
  z-index: 3;

  @media (max-width: 1300px) {
    display: none;
  }
`;

interface PhotoBubbleProps {
  $size: number;
  $top: string;
  $nudge: string;   // horizontal offset within column, e.g. "15%", "60%", "-10px"
  $glow: string;
  $delay: number;
  $border: string;
  $visible?: boolean;
}

export const PhotoBubble = styled.div<PhotoBubbleProps>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $nudge }) => $nudge};
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${({ $border }) => $border};
  box-shadow:
    0 0 24px ${({ $glow }) => $glow},
    0 0 70px ${({ $glow }) => $glow}80,
    0 0 120px ${({ $glow }) => $glow}35,
    inset 0 0 30px rgba(0,0,0,0.45);
  opacity: 0;
  animation: ${bubbleReveal} 0.9s cubic-bezier(0.22,1,0.36,1) ${({ $delay }) => $delay * 0.25}s both,
             ${floatB} ${({ $delay }) => 5 + $delay}s ease-in-out ${({ $delay }) => 0.9 + $delay * 0.25}s infinite;
  animation-play-state: ${({ $visible }) => ($visible ? 'running' : 'paused')};
  transition: box-shadow 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: saturate(1.2) brightness(0.88);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, ${({ $glow }) => $glow}28 0%, transparent 55%);
    pointer-events: none;
  }
`;

// ── Photo slideshow ───────────────────────────────────────────────────────────

export const AboutVisualInner = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const PhotoSlideshow = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(139,92,246,0.3);
  box-shadow:
    0 0 40px rgba(139,92,246,0.2),
    0 0 80px rgba(236,72,153,0.1),
    0 24px 60px rgba(0,0,0,0.5);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    background: linear-gradient(
      135deg,
      rgba(139,92,246,0.06) 0%,
      transparent 50%,
      rgba(236,72,153,0.04) 100%
    );
    z-index: 1;
    pointer-events: none;
  }
`;

export const SlideshowImg = styled.img<{ $visible: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.4s ease;
  filter: saturate(1.1);
`;

// ── Instagram section ─────────────────────────────────────────────────────────

const igShimmer = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const InstagramSection = styled.section`
  padding: 2rem 2rem 4rem;
  display: flex;
  justify-content: center;
`;

export const InstagramLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.4rem 2.4rem;
  border-radius: 20px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;

  &:hover {
    background: rgba(255,255,255,0.06);
    border-color: rgba(139,92,246,0.35);
    transform: translateY(-3px);
  }
`;

export const InstagramIcon = styled.div`
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  filter:
    drop-shadow(0 0 12px rgba(236,72,153,0.7))
    drop-shadow(0 0 30px rgba(139,92,246,0.5));
  animation: ${igShimmer} 4s ease infinite;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const InstagramText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  span {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 500;
  }

  strong {
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(90deg, #f9a825, #ec4899, #8b5cf6, #06b6d4);
    background-size: 300% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${igShimmer} 4s ease infinite;
  }
`;

// ── Ungdomar News section ─────────────────────────────────────────────────────

const newsReveal = keyframes`
  from { opacity: 0; transform: translateY(28px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

export const NewsSection = styled.section`
  padding: 5rem 2rem 2rem;
  position: relative;
`;

export const NewsInner = styled.div`
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const NewsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

interface NewsCardProps { $visible?: boolean; $idx: number; $color: string; }

export const NewsCard = styled.div<NewsCardProps>`
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background: linear-gradient(135deg, rgba(10,8,20,0.95), rgba(18,14,35,0.9));
  border: 1px solid ${({ $color }) => $color}40;
  box-shadow:
    0 0 30px ${({ $color }) => $color}18,
    0 8px 32px rgba(0,0,0,0.4);
  opacity: 0;
  animation: ${({ $visible }) => $visible ? newsReveal : 'none'} 0.7s cubic-bezier(0.22,1,0.36,1)
    ${({ $idx }) => $idx * 0.12}s both;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;

  &:hover {
    border-color: ${({ $color }) => $color}80;
    box-shadow:
      0 0 50px ${({ $color }) => $color}30,
      0 16px 48px rgba(0,0,0,0.5);
    transform: translateY(-2px);
  }
`;

export const NewsAccent = styled.div<{ $color: string }>`
  width: 5px;
  min-height: 100%;
  flex-shrink: 0;
  background: linear-gradient(to bottom, ${({ $color }) => $color}, ${({ $color }) => $color}60);
  box-shadow: 0 0 20px ${({ $color }) => $color}, 0 0 40px ${({ $color }) => $color}50;
`;

export const NewsBody = styled.div`
  flex: 1;
  padding: 1.6rem 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  min-width: 0;
`;

export const NewsTag = styled.span<{ $color: string }>`
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  background: ${({ $color }) => $color}15;
  border: 1px solid ${({ $color }) => $color}45;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  display: inline-block;
  width: fit-content;
  text-shadow: 0 0 12px ${({ $color }) => $color}80;
`;

export const NewsTitle = styled.h4`
  font-family: 'Syne', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  color: #39ff6e;
  text-shadow: 0 0 20px rgba(76, 194, 108, 0.4), 0 0 40px rgba(57,255,110,0.15);
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

export const NewsDesc = styled.p`
  font-size: 1.1rem;
  color: rgba(255,255,255,0.65);
  margin: 0;
  line-height: 1.65;
`;

export const NewsImage = styled.img`
  width: 180px;
  flex-shrink: 0;
  object-fit: cover;
  display: block;
  border-right: 1px solid rgba(255,255,255,0.06);
  order: -1;

  @media (max-width: 600px) {
    width: 100%;
    height: 180px;
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
`;
