import styled, { keyframes } from 'styled-components';

// ── Animations ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const shimmer = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// ── Page wrapper ──────────────────────────────────────────────────────────────

// Dummy export to satisfy existing imports (no longer used as a visual element)
export const MeshOrb = styled.div`display: none;`;

export const AlphaWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
`;

// ── Hero ──────────────────────────────────────────────────────────────────────

export const HeroSection = styled.section`
  min-height: calc(100vh + 70px);
  margin-top: -70px;
  padding-top: 70px;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  background: #2a1f14;

  /* Hero photo */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/Activity-1.png') center center / cover no-repeat;
    z-index: 0;
  }

  /* Gradient overlay — dark at bottom, lighter at top */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        to bottom,
        rgba(15, 10, 5, 0.20) 0%,
        rgba(15, 10, 5, 0.30) 40%,
        rgba(15, 10, 5, 0.72) 75%,
        rgba(15, 10, 5, 0.90) 100%
      );
    z-index: 1;
  }

  @media (max-width: 768px) {
    min-height: calc(90vh + 70px);
    align-items: flex-end;
  }
`;

export const HeroInner = styled.div`
  max-width: 860px;
  width: 100%;
  padding: 0 2rem 5rem;
  position: relative;
  z-index: 2;
  animation: ${fadeUp} 0.9s cubic-bezier(0.25, 0.1, 0.25, 1) both;
  text-align: left;

  @media (max-width: 768px) {
    padding: 0 1.4rem 3.5rem;
    text-align: center;
  }
`;

export const AlphaLogo = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(145deg, #e8a030 0%, #c97820 100%);
  box-shadow: 0 6px 24px rgba(200, 120, 20, 0.4);
  margin-bottom: 1.8rem;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
`;

export const HeroEyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(220, 168, 80, 0.9);
  margin: 0 0 1rem;
`;

export const HeroTitle = styled.h1`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(3.2rem, 7vw, 5.5rem);
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -0.03em;
  margin: 0 0 1.2rem;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    rgba(255, 235, 175, 0.95) 50%,
    rgba(220, 175, 100, 0.9) 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 8s ease infinite;
`;

export const HeroSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2vw, 1.18rem);
  font-weight: 400;
  color: rgba(255, 240, 210, 0.88);
  line-height: 1.7;
  max-width: 560px;
  margin: 0 0 2.4rem;
`;

export const HeroCTARow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const CTAPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.9rem 2.2rem;
  border-radius: 50px;
  background: linear-gradient(135deg, #e8a030 0%, #c97820 100%);
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(200, 120, 20, 0.4);
  transition: transform 0.22s ease, box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(200, 120, 20, 0.55);
  }
`;

export const CTASecondary = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.9rem 2.2rem;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: rgba(255, 255, 255, 0.88);
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition: background 0.22s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  color: rgba(255, 255, 255, 0.35);
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  z-index: 2;
  animation: ${fadeIn} 1.5s 1s both;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const ScrollLine = styled.div`
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.35), transparent);
`;

// ── Shared section shell ──────────────────────────────────────────────────────

export const Section = styled.section`
  background: #ffffff;
  padding: 6rem 0;

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

export const SectionAlt = styled.section`
  background: #f8f5f0;
  padding: 6rem 0;

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1.2rem;
  }
`;

export const SectionEyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #c97820;
  text-align: center;
  margin: 0 0 0.7rem;
`;

export const SectionTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.9rem, 4vw, 2.8rem);
  font-weight: 600;
  text-align: center;
  color: #1a1208;
  line-height: 1.2;
  margin: 0 0 0.9rem;
  letter-spacing: -0.02em;
`;

export const SectionLead = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  line-height: 1.72;
  color: #5a4830;
  text-align: center;
  max-width: 620px;
  margin: 0 auto 3rem;
`;

// ── Intro card ────────────────────────────────────────────────────────────────

export const IntroCard = styled.div`
  background: #ffffff;
  border: 1px solid rgba(180, 140, 60, 0.12);
  border-radius: 24px;
  padding: 3.5rem;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.04),
    0 12px 40px rgba(180, 120, 20, 0.08);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem 1.6rem;
    gap: 2rem;
  }
`;

export const IntroText = styled.div``;

export const IntroQuote = styled.blockquote`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.55rem;
  font-weight: 500;
  color: #1a1208;
  line-height: 1.48;
  margin: 0 0 1.3rem;
  font-style: italic;

  &::before {
    content: '"';
    font-size: 2.8rem;
    color: rgba(200, 150, 40, 0.5);
    line-height: 0;
    vertical-align: -0.45rem;
    margin-right: 0.05em;
  }
`;

export const IntroBody = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.75;
  color: #4a3820;
  margin: 0;
`;

export const IntroImageWrap = styled.div`
  border-radius: 18px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.08),
    0 16px 48px rgba(0, 0, 0, 0.12);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }
`;

// ── Video ─────────────────────────────────────────────────────────────────────

export const VideoWrap = styled.div`
  max-width: 820px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 20px 60px rgba(0, 0, 0, 0.14);
  aspect-ratio: 16 / 9;
  border: 1px solid rgba(0, 0, 0, 0.06);

  iframe {
    width: 100%;
    height: 100%;
    display: block;
    border: none;
  }
`;

// ── Steps ─────────────────────────────────────────────────────────────────────

export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 440px;
    margin: 0 auto;
  }
`;

export const StepCard = styled.div`
  background: #ffffff;
  border: 1px solid rgba(180, 140, 60, 0.14);
  border-radius: 20px;
  padding: 2.2rem 1.8rem;
  text-align: center;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.04),
    0 8px 28px rgba(180, 120, 20, 0.06);
  transition: transform 0.26s ease, box-shadow 0.26s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 4px 16px rgba(0, 0, 0, 0.06),
      0 16px 48px rgba(180, 120, 20, 0.12);
  }
`;

export const StepEmoji = styled.div`
  font-size: 2.6rem;
  margin-bottom: 1rem;
`;

export const StepTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.35rem;
  font-weight: 600;
  color: #1a1208;
  margin: 0 0 0.65rem;
`;

export const StepDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  line-height: 1.65;
  color: #5a4830;
  margin: 0;
`;

// ── Topics ────────────────────────────────────────────────────────────────────

export const TopicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 0.8rem;
`;

export const TopicCard = styled.div<{ $index: number }>`
  background: #ffffff;
  border: 1px solid rgba(180, 140, 60, 0.14);
  border-radius: 14px;
  padding: 1.1rem 1.3rem;
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: #fffbf4;
    border-color: rgba(200, 150, 40, 0.3);
    transform: translateY(-2px);
  }
`;

export const TopicNumber = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  color: #c97820;
  background: rgba(200, 150, 40, 0.1);
  border-radius: 6px;
  padding: 0.2rem 0.48rem;
  flex-shrink: 0;
  margin-top: 0.05rem;
  letter-spacing: 0.04em;
`;

export const TopicText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  line-height: 1.45;
  color: #2a1f10;
  margin: 0;
`;

// ── Gallery ───────────────────────────────────────────────────────────────────

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.1rem;
`;

export const GalleryItem = styled.div`
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.26s ease, box-shadow 0.26s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.55s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  &:hover img {
    transform: scale(1.06);
  }
`;

// ── Next Alpha card ───────────────────────────────────────────────────────────

export const NextAlphaCard = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background: #fffbf4;
  border: 1px solid rgba(200, 150, 40, 0.2);
  border-radius: 24px;
  padding: 3rem 3.5rem;
  text-align: center;
  box-shadow:
    0 2px 12px rgba(0, 0, 0, 0.04),
    0 16px 48px rgba(180, 120, 20, 0.1);

  @media (max-width: 600px) {
    padding: 2rem 1.6rem;
  }
`;

export const NextAlphaTag = styled.div`
  display: inline-block;
  background: rgba(200, 150, 40, 0.1);
  border: 1px solid rgba(200, 150, 40, 0.3);
  border-radius: 50px;
  padding: 0.38rem 1.1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #c97820;
  margin-bottom: 1.4rem;
`;

export const NextAlphaTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2rem;
  font-weight: 600;
  color: #1a1208;
  margin: 0 0 0.8rem;
  line-height: 1.25;
`;

export const NextAlphaDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.72;
  color: #4a3820;
  margin: 0 0 1.8rem;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  color: #7a6040;

  span {
    color: #c97820;
    font-weight: 600;
  }
`;

export const RegisterBtn = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2.8rem;
  border-radius: 50px;
  background: linear-gradient(135deg, #e8a030 0%, #c97820 100%);
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 6px 22px rgba(200, 120, 20, 0.38);
  transition: transform 0.22s ease, box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 34px rgba(200, 120, 20, 0.52);
  }
`;

// ── Closing quote ─────────────────────────────────────────────────────────────

export const ClosingSection = styled.section`
  background: #1a1208;
  padding: 5rem 0;
  text-align: center;
`;

export const ClosingQuote = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.5rem, 3.5vw, 2.3rem);
  font-weight: 500;
  font-style: italic;
  color: rgba(255, 235, 185, 0.9);
  max-width: 740px;
  margin: 0 auto 1.4rem;
  line-height: 1.55;
  padding: 0 2rem;
`;

export const ClosingSource = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(200, 150, 40, 0.65);
`;

export const Divider = styled.div`
  width: 56px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(200, 150, 40, 0.55), transparent);
  margin: 0 auto 2.8rem;
`;
