import styled, { keyframes } from 'styled-components';

// Full-page wrapper that holds the fixed background image across all sections
export const HomePageWrapper = styled.div`
  position: relative;
  background: url('/images/HomePage.png') center center / cover fixed;
  background-color: #6a4820;

  @media (max-width: 768px) {
    background-attachment: scroll;
  }
`;

// Full-screen hero section with background image extending to top
export const HeroSection = styled.section`
  min-height: calc(100vh + 70px); /* Extra height to cover navbar */
  margin-top: -70px; /* Pull up to cover navbar area */
  padding-top: 70px; /* Add padding to account for navbar */
  background: linear-gradient(
    rgba(0, 0, 0, 0.15) 0%,
    rgba(0, 0, 0, 0.45) 60%,
    rgba(0, 0, 0, 0.6) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;

  @media (max-width: 768px) {
    min-height: calc(80vh + 70px);
  }
`;

export const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 20px;
  z-index: 2;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2.4rem, 5.5vw, 4rem);
  font-weight: 700;
  margin-bottom: 1.4rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    rgba(255, 235, 175, 0.95) 50%,
    rgba(220, 175, 100, 0.9) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.95))
    drop-shadow(0 4px 18px rgba(0, 0, 0, 0.75))
    drop-shadow(0 8px 40px rgba(0, 0, 0, 0.5));
`;

export const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.15rem);
  font-weight: 400;
  color: rgba(255, 238, 195, 0.95);
  margin-bottom: 3rem;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  letter-spacing: 0.01em;
  text-shadow:
    0 1px 4px rgba(0, 0, 0, 0.95),
    0 2px 14px rgba(0, 0, 0, 0.8),
    0 5px 30px rgba(0, 0, 0, 0.55);
`;

export const CTAButton = styled.button`
  background: rgba(58, 106, 122, 0.55);
  color: white;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  border: 2px solid rgba(90, 138, 154, 0.6);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: rgba(58, 106, 122, 0.75);
    border-color: rgba(90, 138, 154, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(34, 72, 88, 0.45);
  }
`;

// Cloud-like animation keyframes
const cloudDrift = keyframes`
  0% {
    transform: translateX(-100px) translateY(0px) scale(1);
    opacity: 0.1;
  }
  25% {
    transform: translateX(0px) translateY(-20px) scale(1.1);
    opacity: 0.15;
  }
  50% {
    transform: translateX(50px) translateY(10px) scale(1.05);
    opacity: 0.2;
  }
  75% {
    transform: translateX(20px) translateY(-10px) scale(1.15);
    opacity: 0.12;
  }
  100% {
    transform: translateX(-100px) translateY(0px) scale(1);
    opacity: 0.1;
  }
`;

const cloudFloat = keyframes`
  0% {
    transform: translateX(100px) translateY(0px) scale(0.8);
    opacity: 0.08;
  }
  33% {
    transform: translateX(-20px) translateY(15px) scale(1.2);
    opacity: 0.15;
  }
  66% {
    transform: translateX(-80px) translateY(-25px) scale(1);
    opacity: 0.12;
  }
  100% {
    transform: translateX(100px) translateY(0px) scale(0.8);
    opacity: 0.08;
  }
`;

const cloudMorph = keyframes`
  0% {
    border-radius: 50% 60% 70% 40%;
    transform: scale(1) rotate(0deg);
  }
  25% {
    border-radius: 60% 50% 40% 70%;
    transform: scale(1.1) rotate(90deg);
  }
  50% {
    border-radius: 70% 40% 50% 60%;
    transform: scale(0.9) rotate(180deg);
  }
  75% {
    border-radius: 40% 70% 60% 50%;
    transform: scale(1.05) rotate(270deg);
  }
  100% {
    border-radius: 50% 60% 70% 40%;
    transform: scale(1) rotate(360deg);
  }
`;

const backgroundShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const ContentSection = styled.section`
  padding: 6rem 0;
  background: rgba(12, 8, 3, 0.5);
  position: relative;
  overflow: hidden;

  /* Cloud-like floating elements */
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    left: -10%;
    width: 300px;
    height: 150px;
    background: radial-gradient(
      ellipse 300px 150px,
      rgba(160, 120, 64, 0.15) 0%,
      rgba(160, 120, 64, 0.08) 40%,
      transparent 70%
    );
    border-radius: 50% 60% 70% 40%;
    animation: ${cloudDrift} 45s ease-in-out infinite;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 20%;
    right: -5%;
    width: 250px;
    height: 120px;
    background: radial-gradient(
      ellipse 250px 120px,
      rgba(122, 88, 40, 0.12) 0%,
      rgba(122, 88, 40, 0.06) 45%,
      transparent 75%
    );
    border-radius: 60% 50% 40% 70%;
    animation: ${cloudFloat} 35s ease-in-out infinite reverse;
    pointer-events: none;
  }

  /* Additional cloud layers */
  &:before {
    box-shadow:
      400px 100px 0 -50px rgba(255, 255, 255, 0.1),
      200px 200px 0 -30px rgba(160, 120, 64, 0.08),
      600px 50px 0 -40px rgba(122, 88, 40, 0.06),
      -100px 250px 0 -60px rgba(255, 204, 112, 0.08);
  }

  @media (max-width: 768px) {
    padding: 4rem 0;

    &::before,
    &::after {
      width: 200px;
      height: 100px;
      animation-duration: 25s, 30s;
    }
  }
`;

// Special first content section — transparent overlay over the fixed bg image
export const FirstContentSection = styled.section`
  padding: 5rem 0;
  background: rgba(10, 6, 2, 0.45);
  position: relative;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  font-weight: 500;
  text-align: center;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    rgba(255, 235, 175, 0.95) 50%,
    rgba(220, 175, 100, 0.9) 100%
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4rem;
  font-family: 'Playfair Display', Georgia, serif;
  letter-spacing: 0.01em;
  line-height: 1.2;
  position: relative;
  z-index: 2;
  animation: gradientMove 10s ease-in-out infinite;
  transition: all 0.8s ease;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.95))
    drop-shadow(0 4px 18px rgba(0, 0, 0, 0.75))
    drop-shadow(0 8px 40px rgba(0, 0, 0, 0.5));

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d4a030, transparent);
    transform: translateX(-50%) translateY(3rem);
    border-radius: 1px;
    opacity: 0.5;
    animation: pulse 4s ease-in-out infinite;
  }

  &:hover {
    transform: scale(1.03);
    animation-duration: 3s;
  }

  /* Dynamic styles for even sections (dark backgrounds) */
  .ContentSection:nth-child(even) & {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.95) 0%,
      #ffeaa7 25%,
      #fab1a0 50%,
      #e17055 75%,
      rgba(255, 255, 255, 0.95) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: none;

    &::before {
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.7),
        transparent
      );
    }
  }

  @keyframes gradientMove {
    0%,
    100% {
      background-position: 0% 50%;
    }
    25% {
      background-position: 100% 50%;
    }
    50% {
      background-position: 100% 100%;
    }
    75% {
      background-position: 0% 100%;
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.4;
      transform: translateX(-50%) translateY(3rem) scaleX(1);
    }
    50% {
      opacity: 0.8;
      transform: translateX(-50%) translateY(3rem) scaleX(1.2);
    }
  }

  @media (max-width: 768px) {
    &::before {
      transform: translateX(-50%) translateY(2rem);
    }

    @keyframes pulse {
      0%,
      100% {
        opacity: 0.4;
        transform: translateX(-50%) translateY(2rem) scaleX(1);
      }
      50% {
        opacity: 0.8;
        transform: translateX(-50%) translateY(2rem) scaleX(1.2);
      }
    }
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 2;
  justify-items: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }
`;

export const Card = styled.div`
  /* Warm golden glass sphere — default: amber */
  background:
    radial-gradient(
      circle at 38% 32%,
      rgba(255, 220, 130, 0.26) 0%,
      rgba(210, 155, 55, 0.13) 40%,
      rgba(140, 90, 20, 0.04) 75%,
      transparent 100%
    ),
    linear-gradient(
      145deg,
      rgba(255, 240, 180, 0.1) 0%,
      rgba(180, 120, 30, 0.08) 100%
    );
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  border-radius: 50%;
  width: 320px;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.4rem;
  border: 1.5px solid rgba(235, 185, 80, 0.38);
  box-shadow:
    0 24px 60px rgba(140, 90, 10, 0.32),
    0 8px 20px rgba(0, 0, 0, 0.18),
    inset 0 1.5px 0 rgba(255, 245, 195, 0.54),
    inset 0 -1px 0 rgba(140, 90, 10, 0.16);
  position: relative;
  overflow: hidden;
  text-align: center;
  animation: breathe 9s ease-in-out infinite;
  transition:
    transform 0.5s cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1),
    border-color 0.3s ease;

  /* Warm inner ambient glow */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background:
      radial-gradient(
        circle at 65% 68%,
        rgba(200, 140, 30, 0.1) 0%,
        transparent 55%
      ),
      radial-gradient(
        circle at 30% 20%,
        rgba(255, 240, 190, 0.09) 0%,
        transparent 40%
      );
    pointer-events: none;
    z-index: 0;
  }

  /* Glass specular highlight — top-left crescent */
  &::after {
    content: '';
    position: absolute;
    top: 10%;
    left: 10%;
    width: 42%;
    height: 24%;
    background: radial-gradient(
      ellipse at 40% 40%,
      rgba(255, 250, 220, 0.72) 0%,
      rgba(255, 235, 170, 0.38) 45%,
      transparent 75%
    );
    border-radius: 50%;
    filter: blur(4px);
    pointer-events: none;
    z-index: 1;
  }

  /* Rose-gold variant */
  &:nth-child(2n) {
    background:
      radial-gradient(
        circle at 38% 32%,
        rgba(245, 195, 130, 0.26) 0%,
        rgba(200, 135, 70, 0.13) 40%,
        rgba(140, 80, 30, 0.04) 75%,
        transparent 100%
      ),
      linear-gradient(
        145deg,
        rgba(250, 220, 170, 0.1) 0%,
        rgba(175, 110, 45, 0.08) 100%
      );
    border-color: rgba(220, 160, 80, 0.38);
    box-shadow:
      0 24px 60px rgba(160, 100, 20, 0.32),
      0 8px 20px rgba(0, 0, 0, 0.18),
      inset 0 1.5px 0 rgba(255, 235, 180, 0.52),
      inset 0 -1px 0 rgba(150, 95, 20, 0.16);
  }

  /* Deep ochre variant */
  &:nth-child(3n) {
    background:
      radial-gradient(
        circle at 38% 32%,
        rgba(230, 185, 80, 0.28) 0%,
        rgba(185, 130, 35, 0.14) 40%,
        rgba(120, 80, 15, 0.05) 75%,
        transparent 100%
      ),
      linear-gradient(
        145deg,
        rgba(240, 210, 140, 0.11) 0%,
        rgba(165, 110, 25, 0.09) 100%
      );
    border-color: rgba(210, 160, 55, 0.4);
    box-shadow:
      0 24px 60px rgba(130, 85, 8, 0.35),
      0 8px 20px rgba(0, 0, 0, 0.2),
      inset 0 1.5px 0 rgba(250, 230, 160, 0.55),
      inset 0 -1px 0 rgba(130, 85, 10, 0.18);
  }

  /* Warm copper variant */
  &:nth-child(4n) {
    background:
      radial-gradient(
        circle at 38% 32%,
        rgba(220, 170, 90, 0.26) 0%,
        rgba(175, 120, 55, 0.13) 40%,
        rgba(125, 78, 28, 0.04) 75%,
        transparent 100%
      ),
      linear-gradient(
        145deg,
        rgba(235, 200, 150, 0.1) 0%,
        rgba(160, 108, 42, 0.08) 100%
      );
    border-color: rgba(200, 150, 70, 0.38);
    box-shadow:
      0 24px 60px rgba(140, 88, 15, 0.33),
      0 8px 20px rgba(0, 0, 0, 0.18),
      inset 0 1.5px 0 rgba(245, 220, 170, 0.52),
      inset 0 -1px 0 rgba(140, 90, 18, 0.16);
  }

  /* Sand gold variant */
  &:nth-child(5n) {
    background:
      radial-gradient(
        circle at 38% 32%,
        rgba(250, 215, 115, 0.26) 0%,
        rgba(205, 160, 50, 0.13) 40%,
        rgba(145, 100, 20, 0.04) 75%,
        transparent 100%
      ),
      linear-gradient(
        145deg,
        rgba(255, 240, 175, 0.1) 0%,
        rgba(182, 132, 32, 0.08) 100%
      );
    border-color: rgba(230, 180, 70, 0.38);
    box-shadow:
      0 24px 60px rgba(150, 100, 12, 0.32),
      0 8px 20px rgba(0, 0, 0, 0.18),
      inset 0 1.5px 0 rgba(255, 245, 190, 0.54),
      inset 0 -1px 0 rgba(145, 98, 14, 0.16);
  }

  /* Warm honey variant */
  &:nth-child(6n) {
    background:
      radial-gradient(
        circle at 38% 32%,
        rgba(240, 200, 100, 0.28) 0%,
        rgba(195, 145, 45, 0.14) 40%,
        rgba(135, 88, 18, 0.05) 75%,
        transparent 100%
      ),
      linear-gradient(
        145deg,
        rgba(248, 225, 155, 0.11) 0%,
        rgba(172, 122, 30, 0.09) 100%
      );
    border-color: rgba(218, 168, 62, 0.4);
    box-shadow:
      0 24px 60px rgba(138, 90, 10, 0.34),
      0 8px 20px rgba(0, 0, 0, 0.19),
      inset 0 1.5px 0 rgba(252, 232, 168, 0.55),
      inset 0 -1px 0 rgba(138, 90, 12, 0.18);
  }

  &:nth-child(odd) {
    animation-delay: -1.5s;
  }
  &:nth-child(even) {
    animation-delay: -4.5s;
  }
  &:nth-child(3n) {
    animation-delay: -7s;
  }

  &:hover {
    transform: translateY(-10px) scale(1.04);
    border-color: rgba(255, 215, 100, 0.58);
    box-shadow:
      0 36px 80px rgba(140, 90, 10, 0.42),
      0 12px 28px rgba(0, 0, 0, 0.22),
      inset 0 1.5px 0 rgba(255, 250, 210, 0.65),
      inset 0 -1px 0 rgba(140, 90, 10, 0.2);
  }

  @keyframes breathe {
    0%,
    100% {
      transform: translateY(0px) scale(1);
    }
    30% {
      transform: translateY(-5px) scale(1.008);
    }
    60% {
      transform: translateY(-3px) scale(1.004);
    }
  }

  @media (max-width: 768px) {
    width: 260px;
    height: 260px;
    padding: 1.6rem;
  }

  @media (max-width: 480px) {
    width: 230px;
    height: 230px;
    padding: 1.4rem;
  }
`;

export const CardTitle = styled.h3`
  color: rgba(255, 248, 220, 0.98);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
  line-height: 1.3;
  letter-spacing: 0.01em;
  font-family: 'Playfair Display', Georgia, serif;
  text-align: center;
  position: relative;
  z-index: 2;
  text-shadow:
    0 1px 6px rgba(80, 40, 0, 0.55),
    0 2px 12px rgba(0, 0, 0, 0.35);
`;

export const CardContent = styled.p`
  color: rgba(255, 240, 190, 0.88);
  line-height: 1.55;
  font-size: 0.88rem;
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  text-align: center;
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 4px rgba(60, 30, 0, 0.45);
`;

export const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  position: relative;
  z-index: 2;
`;

export const ServiceTime = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-left: 3px solid #c8922a;
  padding: 1.8rem;
  margin: 1.5rem 0;
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  position: relative;
  z-index: 2;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    border-left-color: #0051d5;
  }
`;

export const DateTime = styled.div`
  font-weight: 600;
  color: #c8922a;
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.01em;
`;

export const ServiceTitle = styled.div`
  font-weight: 600;
  color: #1d1d1f;
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.01em;
`;

export const ServiceDescription = styled.div`
  font-size: 1rem;
  color: #515154;
  line-height: 1.6;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
`;

// Special welcome card floating over hero background
const glassMorphismStyles = `
  background: rgb(125 109 109 / 42%) !important; 
  backdrop-filter: blur(10px) !important;
  border-radius: 16px !important;
  padding: 2rem !important;
  margin-bottom: 2rem !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
  transition: transform 0.2s ease !important;
  display: block !important;
  width: auto !important;
  height: auto !important;
  min-height: auto !important;
  opacity: 1 !important;
  animation: none !important;
  transform: none !important;
  text-decoration: none !important;
  position: relative !important;
  overflow: visible !important;
  font-weight: 500;
`;

export const HomeWelcomeCard = styled.div.attrs({
  style: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease',
    display: 'block',
    width: 'auto',
    height: 'auto',
    minHeight: 'auto',
    opacity: '1',
    animation: 'none',
    transform: 'none',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'visible',
  },
})`
  /* Fallback styles with highest specificity */
  &&&&& {
    ${glassMorphismStyles}
  }

  /* Inline styles should override everything */
`;

export const HomeWelcomeCardTitle = styled.h3.attrs({
  style: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem',
    lineHeight: '1.3',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },
})`
  /* Ensure white text with inline styles */
  &&&&& {
    color: white !important;
    font-size: 1.5rem !important;
    font-weight: 600 !important;
    margin-bottom: 1rem !important;
    line-height: 1.3 !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
  }
`;

export const HomeWelcomeCardContent = styled.p.attrs({
  style: {
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: '1.6',
    fontSize: '1rem',
    margin: '0',
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
  },
})`
  /* Ensure proper text styling with inline styles */
  &&&&& {
    color: rgba(255, 255, 255, 0.9) !important;
    line-height: 1.6 !important;
    font-size: 1rem !important;
    margin: 0 !important;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
  }
`;

// Activities Section — transparent overlay over the fixed bg image
export const ActivitiesSection = styled.section`
  padding: 6rem 0;
  background: rgba(8, 5, 1, 0.52);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(
        circle at 20% 50%,
        rgba(120, 119, 198, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(255, 118, 117, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 80%,
        rgba(255, 204, 112, 0.1) 0%,
        transparent 50%
      );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 4rem 0;
  }

  /* Special styling for SectionTitle in ActivitiesSection */
  ${SectionTitle} {
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      rgba(255, 235, 175, 0.95) 50%,
      rgba(220, 175, 100, 0.9) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.95))
      drop-shadow(0 4px 18px rgba(0, 0, 0, 0.75))
      drop-shadow(0 8px 40px rgba(0, 0, 0, 0.5));

    &::before {
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.7),
        transparent
      );
    }
  }
`;

// Apple Mac-style Activity Cards
export const ActivityCardsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 2;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
  }
`;

export const ActivityCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 18px;
  padding: 0;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow:
    0 4px 25px rgba(0, 0, 0, 0.04),
    0 0 1px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 420px;

  &:hover {
    transform: translateY(-8px);
    box-shadow:
      0 25px 50px rgba(0, 0, 0, 0.08),
      0 0 1px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.06);
  }

  /* Different styles for even sections and ActivitiesSection */
  .ContentSection:nth-child(even) &,
  .ActivitiesSection & {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow:
      0 4px 25px rgba(0, 0, 0, 0.15),
      0 0 1px rgba(255, 255, 255, 0.1);

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      box-shadow:
        0 25px 50px rgba(0, 0, 0, 0.25),
        0 0 1px rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

export const ActivityCardImage = styled.div<{ $backgroundImage?: string }>`
  height: 225px;
  background: ${({ $backgroundImage }) =>
    $backgroundImage
      ? `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url('/images/${$backgroundImage}'), linear-gradient(135deg, #a07840 0%, #7a5828 100%)`
      : `linear-gradient(135deg, #a07840 0%, #7a5828 100%)`};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.05);
  }

  .ContentSection:nth-child(even) &,
  .ActivitiesSection & {
    background: ${({ $backgroundImage }) =>
      $backgroundImage
        ? `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('/images/${$backgroundImage}'), linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)`
        : `linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)`};
    background-size: cover;
    background-position: center;
  }
`;

export const ActivityCardContent = styled.div`
  padding: 2rem 1.8rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

export const ActivityCardMainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 1rem;
`;

export const ActivityCardDate = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
  color: #a07840;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.8rem;
  font-family: 'Inter', sans-serif;

  .ContentSection:nth-child(even) &,
  .ActivitiesSection & {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const ActivityCardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 0.8rem;
  line-height: 1.3;
  letter-spacing: -0.015em;
  font-family: 'Inter', sans-serif;

  .ContentSection:nth-child(even) &,
  .ActivitiesSection & {
    color: rgba(255, 255, 255, 0.95);
  }
`;

export const ActivityCardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #6e6e73;
  margin-bottom: 1.2rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;

  .ContentSection:nth-child(even) &,
  .ActivitiesSection & {
    color: rgba(255, 255, 255, 0.8);
  }
`;

export const ActivityCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: #86868b;
  font-family: 'Inter', sans-serif;
  margin-bottom: auto;

  .ContentSection:nth-child(even) &,
  .ActivitiesSection & {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const ActivityCardLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const ActivityCardTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

// Simple CTA Button for Cards
export const CardCTA = styled.button`
  background: rgba(74, 122, 74, 0.1);
  border: 1px solid rgba(74, 122, 74, 0.25);
  color: #4a7a4a;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    background: rgba(74, 122, 74, 0.18);
    border-color: rgba(74, 122, 74, 0.4);
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(46, 82, 48, 0.25);

    &::before {
      left: 100%;
    }
  }

  .ContentSection:nth-child(even) &,
  .ActivitiesSection & {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.9);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
    }
  }
`;

export const ActivityCardCTA = styled(CardCTA)`
  /* Inherits all styles from CardCTA with dark section styling */
`;
