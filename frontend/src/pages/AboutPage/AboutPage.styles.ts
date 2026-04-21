import styled, { css, keyframes } from 'styled-components';

// ── Animations ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const orbPulse = keyframes`
  0%, 100% { opacity: 0.15; transform: scale(1); }
  50%       { opacity: 0.25; transform: scale(1.08); }
`;

const pulseRing = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(201, 120, 32, 0.35); }
  70%  { box-shadow: 0 0 0 18px rgba(201, 120, 32, 0); }
  100% { box-shadow: 0 0 0 0 rgba(201, 120, 32, 0); }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _floatY = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _lineGrow = keyframes`
  from { width: 0; }
  to   { width: 32px; }
`;

// ── Warm dark palette (not pure black) ────────────────────────────────────────
// Base: #111009  Surface: #161309  Alt: #131108

// ── Page wrapper ──────────────────────────────────────────────────────────────

export const OmOssWrapper = styled.div`
  background: #111009;
  color: #f0ead8;
  min-height: 100vh;
  overflow-x: clip;
  font-family:
    'Inter',
    -apple-system,
    sans-serif;
`;

// ── Hero — photo banner (compact, human, alive) ───────────────────────────────

export const HeroSection = styled.section`
  position: relative;
  min-height: 50vh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;

  /* Congregation photo as background */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/om-oss-hero.jpg') center 40% / cover no-repeat;
    transform: scale(1.03);
    transition: transform 8s ease;
  }

  /* Gradient overlay: light at top, dark at bottom → text pops */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(17, 16, 9, 0.05) 0%,
      rgba(17, 16, 9, 0.3) 40%,
      rgba(17, 16, 9, 0.78) 70%,
      rgba(17, 16, 9, 1) 100%
    );
    pointer-events: none;
  }
`;

export const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 64px 64px;

  @media (max-width: 768px) {
    padding: 0 28px 48px;
  }
`;

export const HeroEyebrow = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c97820;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  animation: ${fadeUp} 0.7s ease forwards 0.15s;

  &::before {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    background: #c97820;
  }
`;

export const HeroTitle = styled.h1`
  font-size: clamp(3rem, 7vw, 6.5rem);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.03em;
  color: #f0ead8;
  margin: 0 0 20px;
  opacity: 0;
  animation: ${fadeUp} 0.8s ease forwards 0.3s;

  span {
    display: inline;
    &.outline {
      color: transparent;
      -webkit-text-stroke: 1.5px rgba(201, 120, 32, 0.7);
      margin-left: 0.18em;
    }
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(240, 234, 216, 0.62);
  max-width: 480px;
  margin: 0;
  opacity: 0;
  animation: ${fadeUp} 0.8s ease forwards 0.5s;
`;

// ── Section label (shared) ────────────────────────────────────────────────────

export const SectionLabel = styled.div<{ $visible?: boolean }>`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #c97820;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
  ${({ $visible }) =>
    $visible
      ? css`
          opacity: 1;
          transform: translateY(0);
        `
      : css`
          opacity: 0;
          transform: translateY(20px);
        `}

  &::before {
    content: '';
    display: inline-block;
    height: 1px;
    background: currentColor;
    width: ${({ $visible }) => ($visible ? '32px' : '0')};
    transition: width 0.6s ease;
  }
`;

// ── Pastorer Section ──────────────────────────────────────────────────────────

export const PastorSection = styled.section`
  padding: 72px 48px;
  background: #111009;

  @media (max-width: 768px) {
    padding: 48px 20px;
  }
`;

export const PastorInner = styled.div<{ $reversed?: boolean }>`
  max-width: 1060px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: ${({ $reversed }) =>
    $reversed ? '0.52fr 1.48fr' : '1.48fr 0.52fr'};
  min-height: 460px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(201, 120, 32, 0.1);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    height: auto;
    ${({ $reversed }) =>
      $reversed &&
      css`
        > :first-child {
          order: 2;
        }
        > :last-child {
          order: 1;
        }
      `}
  }
`;

export const PastorImagePanel = styled.div<{
  $visible: boolean;
  $reversed?: boolean;
}>`
  position: relative;
  overflow: hidden;
  /* Stretch to match text panel height */
  align-self: stretch;
  transition:
    opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1),
    transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
  ${({ $visible }) =>
    $visible
      ? css`
          opacity: 1;
          transform: scale(1);
        `
      : css`
          opacity: 0;
          transform: scale(1.04);
        `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    display: block;
    transition: transform 8s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $reversed }) =>
      $reversed
        ? 'linear-gradient(to left, transparent 55%, rgba(17,16,9,0.9) 100%)'
        : 'linear-gradient(to right, transparent 55%, rgba(17,16,9,0.9) 100%)'};

    @media (max-width: 900px) {
      background: linear-gradient(
        to bottom,
        transparent 40%,
        rgba(17, 16, 9, 0.92) 100%
      );
    }
  }

  @media (max-width: 900px) {
    min-height: 280px;
  }
`;

export const PastorTextPanel = styled.div<{ $visible: boolean }>`
  background: #161309;
  display: flex;
  align-items: center;
  padding: 48px 44px;
  transition:
    opacity 0.85s ease 0.25s,
    transform 0.85s ease 0.25s;
  ${({ $visible }) =>
    $visible
      ? css`
          opacity: 1;
          transform: translateX(0);
        `
      : css`
          opacity: 0;
          transform: translateX(32px);
        `}

  @media (max-width: 900px) {
    padding: 36px 28px;
  }
`;

export const PastorTextInner = styled.div`
  width: 100%;
`;

export const MemberName = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #f0ead8;
  margin: 0 0 10px;
`;

export const MemberRoleTitle = styled.div`
  font-size: 0.86rem;
  font-weight: 500;
  color: rgba(201, 120, 32, 0.9);
  margin-bottom: 26px;
  letter-spacing: 0.04em;
`;

export const MemberDivider = styled.div`
  width: 32px;
  height: 2px;
  background: linear-gradient(to right, #c97820, transparent);
  margin-bottom: 24px;
`;

export const MemberBio = styled.p`
  font-size: 0.93rem;
  line-height: 1.85;
  color: rgba(240, 234, 216, 0.55);
`;

// ── Ungdomspastor Section ─────────────────────────────────────────────────────

export const UngdomSection = styled.section`
  background: linear-gradient(160deg, #131108 0%, #161309 100%);
  position: relative;
  overflow: hidden;
  padding: 72px 48px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 60% 80% at 75% 50%,
      rgba(201, 120, 32, 0.055) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 72px 28px;
  }
`;

export const UngdomInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

export const UngdomTextSide = styled.div<{ $visible: boolean }>`
  transition:
    opacity 0.9s ease,
    transform 0.9s ease;
  ${({ $visible }) =>
    $visible
      ? css`
          opacity: 1;
          transform: translateX(0);
        `
      : css`
          opacity: 0;
          transform: translateX(-40px);
        `}
`;

export const UngdomImageSide = styled.div<{ $visible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
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
          transform: translateY(36px);
        `}
`;

export const UngdomPortraitWrap = styled.div`
  position: relative;
  /* Slightly smaller — more refined */
  width: 280px;
  height: 280px;

  @media (max-width: 480px) {
    width: 220px;
    height: 220px;
  }
`;

export const UngdomPortraitGlow = styled.div`
  position: absolute;
  inset: -28px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(201, 120, 32, 0.14) 0%,
    transparent 70%
  );
  animation: ${orbPulse} 4s ease-in-out infinite;
`;

export const UngdomPortraitRing = styled.div`
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1.5px solid rgba(201, 120, 32, 0.48);
  animation: ${pulseRing} 3s ease-out infinite;
`;

export const UngdomPortraitRing2 = styled.div`
  position: absolute;
  inset: -13px;
  border-radius: 50%;
  border: 1px solid rgba(201, 120, 32, 0.14);
`;

export const UngdomPortraitImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  display: block;
  position: relative;
  z-index: 1;
`;

// ── Styrelse Section ──────────────────────────────────────────────────────────

export const StyrelseSection = styled.section`
  padding: 72px 48px 100px;
  background: #131108;

  @media (max-width: 768px) {
    padding: 48px 20px 72px;
  }
`;

export const StyrelseHeaderWrap = styled.div<{ $visible: boolean }>`
  max-width: 1060px;
  margin: 0 auto 36px;
  transition:
    opacity 0.9s ease,
    transform 0.9s ease;
  ${({ $visible }) =>
    $visible
      ? css`
          opacity: 1;
          transform: translateY(0);
        `
      : css`
          opacity: 0;
          transform: translateY(24px);
        `}
`;

export const StyrelseImageWrap = styled.div<{ $visible: boolean }>`
  position: relative;
  max-width: 1060px;
  margin: 0 auto;
  height: 400px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(201, 120, 32, 0.08);
  transition:
    opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s,
    transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
  ${({ $visible }) =>
    $visible
      ? css`
          opacity: 1;
          transform: scale(1);
        `
      : css`
          opacity: 0;
          transform: scale(1.04);
        `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
    display: block;
    transition: transform 8s ease;
  }

  &:hover img {
    transform: scale(1.03);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(17, 16, 9, 0.55) 100%
    );
  }
`;

export const StyrelseBioWrap = styled.div<{ $visible: boolean }>`
  max-width: 1060px;
  margin: 0 auto;
  padding-top: 40px;
  transition:
    opacity 0.9s ease 0.35s,
    transform 0.9s ease 0.35s;
  ${({ $visible }) =>
    $visible
      ? css`
          opacity: 1;
          transform: translateY(0);
        `
      : css`
          opacity: 0;
          transform: translateY(24px);
        `}
`;

export const StyrelseBio = styled.p`
  font-size: 0.97rem;
  line-height: 1.88;
  color: rgba(240, 234, 216, 0.52);
  max-width: 620px;
`;

// ── Section divider ───────────────────────────────────────────────────────────

export const SectionSep = styled.div`
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(201, 120, 32, 0.16) 20%,
    rgba(201, 120, 32, 0.16) 80%,
    transparent
  );
`;

// ── Loading ───────────────────────────────────────────────────────────────────

export const LoadingWrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(240, 234, 216, 0.3);
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: #111009;
`;
