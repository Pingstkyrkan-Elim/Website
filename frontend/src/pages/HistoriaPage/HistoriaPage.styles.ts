import styled, { keyframes } from 'styled-components';

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const appleGlow = keyframes`
  0% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
  }
  100% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
`;

const floatingAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const gradientShift = keyframes`
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

const pulseGlow = keyframes`
  0% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
`;

const backgroundFloat = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
`;

const lightPulse = keyframes`
  0% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
`;

// Cloud-like animation keyframes
const cloudDrift = keyframes`
  0% {
    transform: translateX(-120px) translateY(0px) scale(1);
    opacity: 0.12;
  }
  25% {
    transform: translateX(-10px) translateY(-25px) scale(1.15);
    opacity: 0.18;
  }
  50% {
    transform: translateX(60px) translateY(15px) scale(1.08);
    opacity: 0.22;
  }
  75% {
    transform: translateX(30px) translateY(-15px) scale(1.2);
    opacity: 0.15;
  }
  100% {
    transform: translateX(-120px) translateY(0px) scale(1);
    opacity: 0.12;
  }
`;

const cloudFloat = keyframes`
  0% {
    transform: translateX(120px) translateY(0px) scale(0.9);
    opacity: 0.1;
  }
  33% {
    transform: translateX(-30px) translateY(20px) scale(1.25);
    opacity: 0.17;
  }
  66% {
    transform: translateX(-100px) translateY(-30px) scale(1.1);
    opacity: 0.14;
  }
  100% {
    transform: translateX(120px) translateY(0px) scale(0.9);
    opacity: 0.1;
  }
`;

const cloudMorph = keyframes`
  0% {
    border-radius: 60% 40% 80% 50%;
    transform: scale(1) rotate(0deg);
  }
  25% {
    border-radius: 70% 60% 40% 80%;
    transform: scale(1.12) rotate(90deg);
  }
  50% {
    border-radius: 80% 50% 60% 70%;
    transform: scale(0.95) rotate(180deg);
  }
  75% {
    border-radius: 50% 80% 70% 60%;
    transform: scale(1.08) rotate(270deg);
  }
  100% {
    border-radius: 60% 40% 80% 50%;
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

export const HistoriaContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    160deg,
    #eddcb8 0%,
    #e0c890 20%,
    #d4b870 40%,
    #c8a858 55%,
    #d4b870 70%,
    #ddc88a 85%,
    #eddcb8 100%
  );
  background-size: 300% 300%;
  animation: ${backgroundShift} 20s ease-in-out infinite;
  position: relative;
  overflow-x: hidden;

  /* Cloud-like floating elements */
  &::before {
    content: '';
    position: absolute;
    top: 15%;
    left: -8%;
    width: 400px;
    height: 200px;
    background: radial-gradient(ellipse 400px 200px, rgba(160, 120, 64, 0.14) 0%, rgba(160, 120, 64, 0.08) 40%, transparent 70%);
    border-radius: 70% 50% 80% 60%;
    animation: ${cloudDrift} 55s ease-in-out infinite, ${cloudMorph} 45s ease-in-out infinite;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 25%;
    right: -10%;
    width: 320px;
    height: 160px;
    background: radial-gradient(ellipse 320px 160px, rgba(122, 88, 40, 0.12) 0%, rgba(122, 88, 40, 0.06) 45%, transparent 75%);
    border-radius: 80% 60% 70% 40%;
    animation: ${cloudFloat} 42s ease-in-out infinite reverse, ${cloudMorph} 65s ease-in-out infinite reverse;
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 2;
  }

  @media (max-width: 768px) {
    background-attachment: scroll;
  }
`;

export const HeroSection = styled.div`
  color: #F0E4D0;
  text-align: center;
  padding: 4rem 2rem 2rem;
  position: relative;
  overflow: hidden;
  min-height: 25vh;
  margin-top: 25px;
  padding-top: calc(4rem + 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: 
    rgba(122, 88, 40, 0.2),
    linear-gradient(135deg, 
      rgba(42, 30, 18, 0.8) 0%,
      rgba(60, 44, 24, 0.7) 50%,
      rgba(122, 88, 40, 0.8) 100%
    );
  backdrop-filter: blur(20px);
  border-radius: 0 0 2rem 2rem;
  box-shadow: 
    0 8px 32px rgba(42, 30, 18, 0.4),
    0 4px 16px rgba(122, 88, 40, 0.3),
    inset 0 1px 0 rgba(122, 88, 40, 0.1);

  @media (max-width: 768px) {
    padding: calc(3rem + 50px) 1rem 2rem;
    min-height: 20vh;
    border-radius: 0 0 1.5rem 1.5rem;
  }
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2.4rem, 5.5vw, 4rem);
  font-weight: 700;
  margin: 0 0 1.4rem 0;
  line-height: 1.1;
  letter-spacing: -0.02em;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    rgba(255, 235, 175, 0.95) 50%,
    rgba(220, 175, 100, 0.90) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 2;
  filter:
    drop-shadow(0 2px 6px rgba(0, 0, 0, 0.95))
    drop-shadow(0 4px 18px rgba(0, 0, 0, 0.75))
    drop-shadow(0 8px 40px rgba(0, 0, 0, 0.50));

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.15rem;
  font-weight: 400;
  color: rgba(255, 238, 195, 0.95);
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.7;
  letter-spacing: 0.01em;
  position: relative;
  z-index: 2;
  text-shadow:
    0 1px 4px rgba(0, 0, 0, 0.95),
    0 2px 14px rgba(0, 0, 0, 0.80),
    0 5px 30px rgba(0, 0, 0, 0.55);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const BookContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 4rem;
  perspective: 2000px;

  @media (max-width: 768px) {
    min-height: 75vh;
    padding: 0.5rem;
  }
`;

export const IPadWrapper = styled.div<{ $isActive: boolean }>`
  position: relative;
  width: 1024px;
  height: 810px;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  transform: ${({ $isActive }) => 
    $isActive 
      ? 'scale(1.05)' 
      : 'scale(1)'};
  filter: ${({ $isActive }) => 
    $isActive 
      ? 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4)) drop-shadow(0 10px 20px rgba(200, 146, 42, 0.25)) drop-shadow(0 0 40px rgba(200, 146, 42, 0.15))' 
      : 'drop-shadow(0 40px 80px rgba(0, 0, 0, 0.5)) drop-shadow(0 15px 30px rgba(42, 30, 18, 0.4)) drop-shadow(0 0 60px rgba(200, 146, 42, 0.1))'};
  top: 100px;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: 
      radial-gradient(ellipse at center, 
        rgba(200, 146, 42, 0.15) 0%, 
        rgba(122, 88, 40, 0.1) 30%, 
        transparent 70%);
    border-radius: 65px;
    z-index: -1;
    opacity: ${({ $isActive }) => $isActive ? '0.8' : '0.5'};
    transition: opacity 0.6s ease;
  }

  @media (max-width: 1200px) {
    width: 85vw;
    height: calc(85vw * 0.88);
    max-width: 810px;
    max-height: 792px;
  }

  @media (max-width: 768px) {
    width: 90vw;
    height: calc(90vw * 0.88);
    max-width: 600px;
    max-height: 528px;
  }

  @media (max-width: 480px) {
    width: 95vw;
    height: calc(95vw * 0.88);
    max-width: 480px;
    max-height: 422px;
  }

  &:hover {
    transform: ${({ $isActive }) => 
      $isActive 
        ? 'scale(1.08)' 
        : 'scale(1.02)'};
    filter: ${({ $isActive }) => 
      $isActive 
        ? 'drop-shadow(0 35px 70px rgba(0, 0, 0, 0.35)) drop-shadow(0 15px 30px rgba(122, 88, 40, 0.2))' 
        : 'drop-shadow(0 45px 90px rgba(0, 0, 0, 0.45)) drop-shadow(0 20px 40px rgba(42, 30, 18, 0.35))'};
  }
`;

export const IPadFrame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(145deg, 
      #1D1D1F 0%,
      #2C2C2E 30%,
      #3A3A3C 50%,
      #2C2C2E 70%,
      #1D1D1F 100%
    );
  border-radius: 45px;
  padding: 25px;
  box-shadow: 
    0 0 0 2px rgba(0, 0, 0, 0.4),
    0 4px 8px rgba(0, 0, 0, 0.3),
    0 12px 24px rgba(0, 0, 0, 0.35),
    0 20px 40px rgba(0, 0, 0, 0.4),
    inset 0 2px 0 rgba(255, 255, 255, 0.08),
    inset 0 -2px 0 rgba(0, 0, 0, 0.4);
  z-index: 1;
  position: relative;

  @media (max-width: 768px) {
    border-radius: 35px;
    padding: 18px;
  }

  @media (max-width: 480px) {
    border-radius: 28px;
    padding: 15px;
  }

  /* Top speaker/camera area */
  &::before {
    content: '';
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    height: 6px;
    background: 
      linear-gradient(90deg, 
        transparent 0%,
        rgba(0, 0, 0, 0.6) 15%,
        rgba(0, 0, 0, 0.8) 45%,
        rgba(0, 0, 0, 0.4) 55%,
        rgba(0, 0, 0, 0.8) 85%,
        transparent 100%
      );
    border-radius: 3px;
    
    @media (max-width: 768px) {
      width: 150px;
      height: 5px;
      top: 15px;
    }

    @media (max-width: 480px) {
      width: 120px;
      height: 4px;
      top: 12px;
    }
  }

  /* Home indicator */
  &::after {
    content: '';
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    width: 140px;
    height: 4px;
    background: 
      linear-gradient(90deg, 
        transparent 0%,
        rgba(0, 0, 0, 0.4) 20%,
        rgba(0, 0, 0, 0.6) 50%,
        rgba(0, 0, 0, 0.4) 80%,
        transparent 100%
      );
    border-radius: 2px;
    
    @media (max-width: 768px) {
      width: 120px;
      bottom: 15px;
      height: 3px;
    }

    @media (max-width: 480px) {
      width: 100px;
      bottom: 12px;
      height: 3px;
    }
  }
`;

export const IPadScreen = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 25px;
  left: 25px;
  right: 25px;
  bottom: 25px;
  background: 
    /* Geometric pattern overlay */
    linear-gradient(90deg, transparent 49%, rgba(160, 120, 64, 0.05) 50%, transparent 51%),
    linear-gradient(0deg, transparent 49%, rgba(122, 88, 40, 0.05) 50%, transparent 51%),
    /* Dynamic gradient mesh */
    conic-gradient(from 180deg at 20% 20%, rgba(160, 120, 64, 0.15) 0deg, transparent 60deg, rgba(122, 88, 40, 0.15) 120deg, transparent 180deg),
    conic-gradient(from 0deg at 80% 80%, rgba(122, 88, 40, 0.12) 0deg, transparent 60deg, rgba(160, 120, 64, 0.12) 120deg, transparent 180deg),
    /* Base futuristic gradient */
    linear-gradient(
      145deg,
      #f0e4d0 0%,
      #dcc8a0 20%,
      #c8b080 40%,
      #b09050 60%,
      #c8b080 80%,
      #f0e4d0 100%
    );
  background-size: 
    30px 30px,
    30px 30px,
    200px 200px,
    180px 180px,
    100% 100%;
  border-radius: 22px;
  overflow: hidden;
  cursor: ${({ $isActive }) => ($isActive ? 'default' : 'pointer')};
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 5;
  display: flex;
  flex-direction: column;
  box-shadow: 
    inset 0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    top: 18px;
    left: 18px;
    right: 18px;
    bottom: 18px;
    border-radius: 18px;
  }

  @media (max-width: 480px) {
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 14px;
  }

  /* Glass reflection effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(
        125deg, 
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.05) 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.02) 75%,
        rgba(255, 255, 255, 0.08) 100%
      );
    pointer-events: none;
    z-index: 1;
    opacity: ${({ $isActive }) => ($isActive ? '0.7' : '1')};
    transition: opacity 0.6s ease;
  }

  ${({ $isActive }) => !$isActive && `
    /* Play button when inactive */
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100px;
      height: 100px;
      background: 
        radial-gradient(circle, 
          rgba(255, 255, 255, 0.95) 0%,
          rgba(255, 255, 255, 0.85) 100%
        );
      border-radius: 50%;
      opacity: 0.9;
      z-index: 15;
      box-shadow: 
        0 10px 30px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      
      /* Play triangle */
      clip-path: polygon(40% 30%, 40% 70%, 70% 50%);
      background-image: 
        linear-gradient(135deg, 
          rgba(0, 0, 0, 0.8) 0%,
          rgba(0, 0, 0, 0.6) 100%
        );

      @media (max-width: 768px) {
        width: 80px;
        height: 80px;
      }

      @media (max-width: 480px) {
        width: 70px;
        height: 70px;
      }
    }

    &:hover::after {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 
        0 15px 40px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(0, 0, 0, 0.2);
    }
  `}
`;

export const BookPages = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 15px;
  background: linear-gradient(135deg, #f8f2e8 0%, #e9ecef 100%);
  animation: ${fadeInUp} 0.8s ease-out;
  z-index: 3;
  overflow: hidden;
  
  @media (max-width: 768px) {
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    border-radius: 10px;
  }
`;

export const LeftPage = styled.div`
  width: 50%;
  height: 100%;
  background: linear-gradient(to right, #faf9f7 0%, #f8f6f4 100%);
  border-radius: 15px 0 0 15px;
  box-shadow: 
    inset 2px 0 5px rgba(0, 0, 0, 0.1),
    1px 0 3px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent 5%, rgba(0, 0, 0, 0.1) 50%, transparent 95%);
  }
`;

export const RightPage = styled.div`
  width: 50%;
  height: 100%;
  background: linear-gradient(to left, #faf9f7 0%, #f8f6f4 100%);
  border-radius: 0 15px 15px 0;
  box-shadow: 
    inset -2px 0 5px rgba(0, 0, 0, 0.1),
    -1px 0 3px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent 5%, rgba(0, 0, 0, 0.1) 50%, transparent 95%);
  }
`;

export const SwipeArea = styled.div`
  width: 100%;
  height: 100%;
  touch-action: pan-y;
  display: flex;
`;

export const PageContent = styled.div`
  padding: 3rem 2.5rem 5rem 2.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;

  .image-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    img {
      max-width: 100%;
      max-height: 70%;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      border: 3px solid rgba(139, 69, 19, 0.2);
    }

    .image-gallery {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      max-width: 100%;
      max-height: 70%;
      width: 100%;
      overflow-y: auto;
      padding: 0.5rem;
      
      .gallery-image {
        width: 100%;
        height: auto;
        min-height: 220px;
        max-height: 280px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
        border: 3px solid rgba(139, 69, 19, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        
        &:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }
      }
    }

    .no-image {
      max-height: 70%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .placeholder-text {
        color: #8B4513;
        font-style: italic;
        font-size: 1.1rem;
        opacity: 0.7;
        text-align: center;
      }
    }
    
    .image-caption {
      margin-top: 2rem;
      text-align: center;
      
      .image-title {
        color: #5D4E37;
        font-size: 1.1rem;
        font-weight: 500;
        font-style: italic;
      }
    }
  }

  .text-page {
    height: 100%;
    
    .story-title {
      color: #2c3e50;
      font-size: 2.2rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      line-height: 1.2;
      font-family: 'Playfair Display', serif;
    }
    
    .story-date {
      color: #8B4513;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      font-style: italic;
    }

    .story-content {
      flex: 1;
      
      p {
        color: #34495e;
        font-size: 1rem;
        line-height: 1.7;
        margin: 0 0 1.2rem 0;
        text-align: justify;
        font-family: 'Inter', sans-serif;
      }
    }

    .story-details {
      margin-top: auto;
      padding: 1.5rem;
      background: rgba(139, 69, 19, 0.08);
      border-radius: 8px;
      border-left: 4px solid #8B4513;
      
      h4 {
        color: #8B4513;
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0 0 0.8rem 0;
      }
      
      ul {
        margin: 0;
        padding-left: 1.2rem;
        
        li {
          color: #5D4E37;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 0.4rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem 4rem 1.5rem;
  }
`;

export const PageNumber = styled.div`
  position: absolute;
  bottom: 1.5rem;
  right: 2rem;
  color: #8B4513;
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0.6;
  font-style: italic;
`;

export const NavigationControls = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: 10;
  pointer-events: none;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    bottom: 1rem;
  }
`;

export const NavButton = styled.button<{ $position: 'left' | 'right' }>`
  background: rgba(139, 69, 19, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 50%;
  color: #FFD700;
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 12px rgba(139, 69, 19, 0.4),
    inset 0 1px 3px rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;

  &:hover:not(:disabled) {
    background: rgba(160, 82, 45, 0.95);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(139, 69, 19, 0.5);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }
`;

export const CloseBookButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(220, 53, 69, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 25px;
  color: white;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
  z-index: 100;

  &:hover {
    background: rgba(220, 53, 69, 1);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(220, 53, 69, 0.4);
  }

  @media (max-width: 768px) {
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

// Modern Apple-style cover components
export const AppleCover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: 
    /* Floating orb effects */
    radial-gradient(circle at 30% 20%, rgba(160, 120, 64, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(122, 88, 40, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 60%),
    /* Modern glass effect background */
    linear-gradient(135deg, 
      rgba(248, 249, 250, 0.9) 0%, 
      rgba(232, 234, 246, 0.85) 25%, 
      rgba(197, 202, 233, 0.8) 50%, 
      rgba(159, 168, 218, 0.85) 75%, 
      rgba(248, 249, 250, 0.9) 100%
    );
  z-index: 25;
  border-radius: 22px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
    animation: ${pulseGlow} 4s ease-in-out infinite;
  }
`;

export const AppleTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  background: linear-gradient(
    135deg,
    #2c3e50 0%,
    #a07840 25%,
    #7a5828 50%,
    #a07840 75%,
    #2c3e50 100%
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientShift} 8s ease-in-out infinite, ${floatingAnimation} 6s ease-in-out infinite;
  text-align: center;
  letter-spacing: -0.02em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  filter: drop-shadow(0 2px 10px rgba(160, 120, 64, 0.3));
  width: 100%;
  display: block;
`;

export const AppleSubtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 400;
  color: #4a5568;
  text-align: center;
  line-height: 1.6;
  margin: 0 0 2.5rem 0;
  max-width: 80%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  opacity: 0;
  animation: ${fadeInUp} 1s ease-out 0.5s forwards;
`;

export const AppleButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(160, 120, 64, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(160, 120, 64, 0.3);
  border-radius: 50px;
  color: #a07840;
  font-size: 1rem;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  animation: ${fadeInUp} 1s ease-out 1s forwards, ${appleGlow} 3s ease-in-out infinite 2s;
  
  &:hover {
    background: rgba(160, 120, 64, 0.2);
    border-color: rgba(160, 120, 64, 0.5);
    transform: translateY(-2px);
    box-shadow: 
      0 10px 30px rgba(160, 120, 64, 0.2),
      0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  &::after {
    content: '▶';
    font-size: 0.8rem;
    opacity: 0.8;
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: translateX(2px);
  }
`;

// Subtle ambient bubble animations for iPad screen background
const bubbleFloat1 = keyframes`
  0% {
    transform: translateY(0px) translateX(0px) scale(0.8);
    opacity: 0.1;
  }
  25% {
    transform: translateY(-15px) translateX(10px) scale(1.1);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-10px) translateX(-5px) scale(0.9);
    opacity: 0.15;
  }
  75% {
    transform: translateY(-20px) translateX(8px) scale(1.05);
    opacity: 0.18;
  }
  100% {
    transform: translateY(0px) translateX(0px) scale(0.8);
    opacity: 0.1;
  }
`;

const bubbleFloat2 = keyframes`
  0% {
    transform: translateY(0px) translateX(0px) scale(0.7);
    opacity: 0.12;
  }
  30% {
    transform: translateY(-8px) translateX(-12px) scale(1.2);
    opacity: 0.22;
  }
  60% {
    transform: translateY(-18px) translateX(6px) scale(0.85);
    opacity: 0.16;
  }
  90% {
    transform: translateY(-5px) translateX(-8px) scale(1.1);
    opacity: 0.2;
  }
  100% {
    transform: translateY(0px) translateX(0px) scale(0.7);
    opacity: 0.12;
  }
`;


export const AppleOrbs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
  
  /* Year bubble styling - More noticeable */
  .year-bubble {
    position: absolute;
    width: 55px;
    height: 55px;
    background: radial-gradient(circle, rgba(160, 120, 64, 0.7) 0%, rgba(160, 120, 64, 0.35) 60%, rgba(160, 120, 64, 0.1) 100%);
    border-radius: 50%;
    border: 2px solid rgba(160, 120, 64, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.95);
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif;
    animation: ${bubbleFloat1} 8s ease-in-out infinite;
    text-shadow: 
      0 1px 2px rgba(0, 0, 0, 0.3),
      0 0 8px rgba(160, 120, 64, 0.8);
    box-shadow: 
      0 4px 15px rgba(160, 120, 64, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    
    /* Alternate colors for variety */
    &:nth-child(even) {
      background: radial-gradient(circle, rgba(122, 88, 40, 0.7) 0%, rgba(122, 88, 40, 0.35) 60%, rgba(122, 88, 40, 0.1) 100%);
      border-color: rgba(122, 88, 40, 0.6);
      color: rgba(255, 255, 255, 0.95);
      animation: ${bubbleFloat2} 9s ease-in-out infinite;
      text-shadow: 
        0 1px 2px rgba(0, 0, 0, 0.3),
        0 0 8px rgba(122, 88, 40, 0.8);
      box-shadow: 
        0 4px 15px rgba(122, 88, 40, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
    
    /* Special styling for milestone years */
    &:nth-child(3n) {
      background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(255, 215, 0, 0.4) 60%, rgba(255, 215, 0, 0.15) 100%);
      border-color: rgba(255, 215, 0, 0.7);
      color: rgba(139, 69, 19, 0.95);
      font-weight: 800;
      transform: scale(1.15);
      text-shadow: 
        0 1px 2px rgba(0, 0, 0, 0.4),
        0 0 10px rgba(255, 215, 0, 0.9);
      box-shadow: 
        0 6px 20px rgba(255, 215, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
    }
    
    /* Hover effect */
    &:hover {
      transform: scale(1.3);
      background: radial-gradient(circle, rgba(160, 120, 64, 0.9) 0%, rgba(160, 120, 64, 0.6) 60%, rgba(160, 120, 64, 0.2) 100%);
      color: rgba(255, 255, 255, 1);
      border-color: rgba(160, 120, 64, 0.8);
      z-index: 10;
      box-shadow: 
        0 8px 25px rgba(160, 120, 64, 0.5),
        0 0 30px rgba(160, 120, 64, 0.7),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
      text-shadow: 
        0 1px 3px rgba(0, 0, 0, 0.5),
        0 0 15px rgba(160, 120, 64, 1);
    }
    
    /* Animation variations for different bubbles */
    &:nth-child(5n) {
      animation-duration: 10s;
    }
    
    &:nth-child(7n) {
      animation-duration: 7s;
    }
    
    &:nth-child(11n) {
      animation-duration: 11s;
    }
  }
`;