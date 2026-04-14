import styled, { keyframes, css } from 'styled-components';

// ── Animations ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// ── Page ──────────────────────────────────────────────────────────────────────

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f7f6f4;
  font-family: 'Inter', sans-serif;
  color: #1a1a1a;
  overflow-x: hidden;
`;

// ── Hero ──────────────────────────────────────────────────────────────────────

export const Hero = styled.section`
  min-height: 60vh;
  background:
    linear-gradient(rgba(10, 8, 6, 0.7), rgba(10, 8, 6, 0.7)),
    url('/images/elim-church.png') center 40% / cover no-repeat fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 2rem 5rem;
  position: relative;
`;

export const HeroEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(184, 134, 11, 0.9);
  margin-bottom: 1.2rem;
  animation: ${fadeUp} 0.8s ease both;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 24px;
    height: 1px;
    background: rgba(184, 134, 11, 0.5);
  }
`;

export const HeroTitle = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(52px, 8vw, 110px);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 1rem;
  letter-spacing: -0.03em;
  line-height: 0.92;
  animation: ${fadeUp} 0.9s ease 0.1s both;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.7);
`;

export const HeroSubtitle = styled.p`
  font-size: clamp(15px, 1.6vw, 18px);
  color: rgba(255, 255, 255, 0.55);
  max-width: 460px;
  margin: 0;
  line-height: 1.7;
  font-weight: 300;
  animation: ${fadeUp} 0.9s ease 0.2s both;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.6);
`;

// ── Info section ──────────────────────────────────────────────────────────────

interface RevealProps {
  $visible: boolean;
}

export const InfoSection = styled.section<RevealProps>`
  background: #ffffff;
  padding: 5rem 2rem;
  opacity: 0;
  transform: translateY(28px);
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

export const InfoInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div`
  background: #f7f6f4;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 18px;
  padding: 1.8rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: rgba(184, 134, 11, 0.2);
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.06);
  }
`;

export const InfoCardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(184, 134, 11, 0.08);
  border: 1px solid rgba(184, 134, 11, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin-bottom: 0.4rem;
`;

export const InfoCardLabel = styled.div`
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(184, 134, 11, 0.7);
`;

export const InfoCardValue = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  color: #1a1a1a;
  line-height: 1.5;
`;

export const InfoCardNote = styled.div`
  font-size: 0.8rem;
  color: #888;
  line-height: 1.5;
`;

export const InfoCardLink = styled.a`
  font-size: 0.95rem;
  font-weight: 500;
  color: #1a1a1a;
  text-decoration: none;
  transition: color 0.2s ease;
  line-height: 1.5;

  &:hover {
    color: #b8860b;
  }
`;

// ── Main content (form + map) ─────────────────────────────────────────────────

export const MainSection = styled.section<RevealProps>`
  padding: 5rem 2rem 6rem;
  background: #f7f6f4;
  opacity: 0;
  transform: translateY(28px);
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

export const MainInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

// ── Form ──────────────────────────────────────────────────────────────────────

export const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionEyebrow = styled.div`
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(184, 134, 11, 0.7);
  margin-bottom: 0.8rem;
`;

export const SectionTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(26px, 3vw, 38px);
  font-weight: 700;
  color: #111;
  margin: 0 0 2rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const FormLabel = styled.label`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #666;
`;

const inputBase = css`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #1a1a1a;
  background: #ffffff;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  box-sizing: border-box;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border-color: rgba(184, 134, 11, 0.5);
    box-shadow: 0 0 0 3px rgba(184, 134, 11, 0.08);
  }
`;

export const FormInput = styled.input`
  ${inputBase}
`;

export const FormTextarea = styled.textarea`
  ${inputBase}
  resize: vertical;
  min-height: 130px;
  flex-grow: 1;
  line-height: 1.6;
`;

export const FormSubmit = styled.button<{ $loading?: boolean }>`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #f0c040, #b8860b);
  color: #1a1000;
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 0.9rem 2.2rem;
  border: none;
  border-radius: 100px;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(184, 134, 11, 0.3);
  }
`;

export const FormSuccess = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(74, 124, 63, 0.08);
  border: 1px solid rgba(74, 124, 63, 0.2);
  border-radius: 10px;
  padding: 1rem 1.2rem;
  font-size: 0.9rem;
  color: #2e5230;
  animation: ${fadeIn} 0.4s ease both;
`;

export const FormError = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(192, 64, 48, 0.07);
  border: 1px solid rgba(192, 64, 48, 0.2);
  border-radius: 10px;
  padding: 1rem 1.2rem;
  font-size: 0.9rem;
  color: #8b2020;
  animation: ${fadeIn} 0.4s ease both;
`;

// ── Map / directions block ────────────────────────────────────────────────────

export const MapBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MapEmbed = styled.div`
  border-radius: 18px;
  overflow: hidden;
  background: #e8e4de;
  aspect-ratio: 4/3;
  border: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  margin-bottom: 1.2rem;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
`;

// ── Donation section ──────────────────────────────────────────────────────────

export const DonationSection = styled.section<RevealProps>`
  background: #111;
  padding: 5rem 2rem;
  opacity: 0;
  transform: translateY(28px);
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

export const DonationInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.8rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const DonationHeader = styled.div`
  grid-column: 1 / -1;
  margin-bottom: 0.5rem;
`;

export const DonationCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: rgba(184, 134, 11, 0.3);
  }
`;

export const DonationCardIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(184, 134, 11, 0.1);
  border: 1px solid rgba(184, 134, 11, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(184, 134, 11, 0.8);
  margin-bottom: 0.3rem;
`;

export const DonationCardLabel = styled.div`
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(184, 134, 11, 0.6);
`;

export const DonationCardValue = styled.div`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.01em;
`;

export const DonationCardNote = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
  margin-top: 0.2rem;
`;

export const DonationEyebrow = styled.div`
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(184, 134, 11, 0.7);
  margin-bottom: 0.6rem;
`;

export const DonationTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, 2.5vw, 34px);
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.02em;
`;

export const MapCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #111;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 0.85rem 1.8rem;
  border-radius: 100px;
  text-decoration: none;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
  align-self: flex-start;

  &:hover {
    background: #222;
    transform: translateY(-2px);
  }
`;
