import styled, { keyframes } from 'styled-components';

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const floatingOrb = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
  100% {
    transform: translateY(0px) rotate(360deg);
  }
`;

const glowEffect = keyframes`
  0% {
    box-shadow: 
      0 0 20px rgba(200, 146, 42, 0.3),
      0 0 40px rgba(200, 146, 42, 0.2),
      0 0 60px rgba(200, 146, 42, 0.1);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(200, 146, 42, 0.4),
      0 0 60px rgba(200, 146, 42, 0.3),
      0 0 90px rgba(200, 146, 42, 0.2);
  }
  100% {
    box-shadow: 
      0 0 20px rgba(200, 146, 42, 0.3),
      0 0 40px rgba(200, 146, 42, 0.2),
      0 0 60px rgba(200, 146, 42, 0.1);
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

export const MissionContainer = styled.div`
  min-height: 100vh;
  background: 
    /* Base gradient matching HomePage */
    linear-gradient(135deg, 
      #faf7f4 0%, 
      #f4ede6 15%,
      #ede3d8 30%,
      #e8ddd0 45%,
      #ede3d8 60%,
      #f4ede6 75%,
      #faf7f4 100%
    );
  background-size: 100% 100%;
  position: relative;
  overflow-x: hidden;
  animation: ${backgroundShift} 30s ease-in-out infinite;

  /* Cloud-like floating elements */
  &::before {
    content: '';
    position: absolute;
    top: 10%;
    left: -5%;
    width: 350px;
    height: 175px;
    background: radial-gradient(ellipse 350px 175px, rgba(160, 120, 64, 0.12) 0%, rgba(160, 120, 64, 0.06) 40%, transparent 70%);
    border-radius: 60% 40% 70% 50%;
    animation: ${cloudDrift} 50s ease-in-out infinite;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 30%;
    right: -8%;
    width: 280px;
    height: 140px;
    background: radial-gradient(ellipse 280px 140px, rgba(122, 88, 40, 0.10) 0%, rgba(122, 88, 40, 0.05) 45%, transparent 75%);
    border-radius: 70% 50% 60% 40%;
    animation: ${cloudFloat} 40s ease-in-out infinite reverse, ${cloudMorph} 60s ease-in-out infinite;
    pointer-events: none;
  }
`;

export const FloatingElements = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

export const FloatingOrb = styled.div<{ $delay: number }>`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(160, 120, 64, 0.15) 0%,
    rgba(122, 88, 40, 0.08) 50%,
    transparent 100%
  );
  filter: blur(40px);
  animation: ${floatingOrb} ${props => 15 + props.$delay}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;

  &:nth-child(1) {
    top: 10%;
    left: 10%;
  }

  &:nth-child(2) {
    top: 60%;
    right: 15%;
  }

  &:nth-child(3) {
    bottom: 20%;
    left: 20%;
  }
`;

export const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  z-index: 2;
  padding: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 50% 30%, rgba(200, 146, 42, 0.1) 0%, transparent 60%),
      radial-gradient(circle at 30% 70%, rgba(88, 86, 214, 0.08) 0%, transparent 60%);
    z-index: -1;
  }
`;

export const HeroContent = styled.div<{ $isVisible: boolean }>`
  max-width: 1000px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: translateY(${props => props.$isVisible ? '0' : '60px'});
  transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1);
`;

export const HeroTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  margin: 0 0 2rem 0;
  background: linear-gradient(
    135deg,
    #FFFFFF 0%,
    #E0E0E0 20%,
    #c8922a 40%,
    #a07840 60%,
    #FFFFFF 80%,
    #c8922a 100%
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${backgroundShift} 8s ease-in-out infinite;
  font-family: 'Georgia', 'Playfair Display', serif;
  letter-spacing: -0.02em;
  text-shadow: 0 0 40px rgba(200, 146, 42, 0.3);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, transparent, #c8922a, transparent);
    border-radius: 2px;
    animation: ${glowEffect} 3s ease-in-out infinite;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 4rem 0;
  line-height: 1.6;
  font-weight: 300;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export const MissionStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
  margin-top: 3rem;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

export const StatItem = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem 1.5rem;
  min-width: 120px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-5px);
    border-color: rgba(200, 146, 42, 0.3);
    box-shadow: 0 10px 30px rgba(200, 146, 42, 0.2);
  }
`;

export const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #c8922a;
  margin-bottom: 0.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
`;

export const WorldSection = styled.section`
  padding: 4rem 0;
  position: relative;
  z-index: 2;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 500;
  text-align: center;
  margin: 0;
  padding: 3rem 0rem 0rem 0rem ;
  background: linear-gradient(
    135deg,
    #2a1e12 0%,
    #a07840 30%,
    #7a5828 70%,
    #2a1e12 100%
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${backgroundShift} 10s ease-in-out infinite;
  font-family: 'Georgia', 'Playfair Display', serif;
  letter-spacing: 0.01em;
  line-height: 1.2;
  position: relative;
  z-index: 10;
  transition: all 0.8s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -1.5rem;
    left: 50%;
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #a07840, transparent);
    transform: translateX(-50%);
    border-radius: 1px;
    opacity: 0.5;
    animation: ${pulseAnimation} 4s ease-in-out infinite;
  }

  &:hover {
    transform: scale(1.03);
    animation-duration: 3s;
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 90vh;
  margin: 0;
  position: relative;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const WorldMapImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
  display: block;
`;

export const InteractiveMap = styled.div`
  position: relative;
  display: inline-block;
  z-index: 5;
`;

export const CountryMarker = styled.div<{ $x: number; $y: number; $isActive: boolean }>`
  position: absolute;
  left: ${props => props.$x}%;
  top: ${props => props.$y}%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  pointer-events: all;

  .pulse {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(58, 106, 122, 0.35);
    animation: ${pulseAnimation} 2s ease-in-out infinite;
    transform: translate(-50%, -50%);
    top: 0;
    left: 50%;
  }

  .marker {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${props => props.$isActive ? '#224858' : '#3a6a7a'};
    border: 3px solid rgba(255, 255, 255, 0.9);
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(58, 106, 122, 0.65);
    position: relative;
  }

  .country-label {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 600;
    color: #3a6a7a;
    text-align: center;
    white-space: nowrap;
    border: 1px solid rgba(160, 120, 64, 0.2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
    pointer-events: none;
  }

  &:hover .marker {
    background: #7a5828;
    transform: scale(1.3);
    box-shadow: 0 0 30px rgba(122, 88, 40, 0.8);
  }

  &:hover .country-label {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover .country-label {
    opacity: 1;
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 1);
    border-color: rgba(160, 120, 64, 0.4);
  }
`;

export const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
  position: relative;
  z-index: 5;
  background: rgba(248, 249, 250, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -20px 40px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const MissionCard = styled.div<{ $isSelected: boolean }>`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${props => props.$isSelected ? 'rgba(160, 120, 64, 0.4)' : 'rgba(160, 120, 64, 0.1)'};
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  z-index: 6;
  transform: ${props => props.$isSelected ? 'scale(1.02)' : 'scale(1)'};

  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(160, 120, 64, 0.4);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.1),
      0 0 30px rgba(160, 120, 64, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(160, 120, 64, 0.1) 0%,
      transparent 50%,
      rgba(122, 88, 40, 0.1) 100%
    );
    opacity: ${props => props.$isSelected ? 1 : 0};
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
`;

export const MissionImage = styled.div<{ $backgroundImage: string }>`
  height: 250px;
  background: 
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)),
    url('/images/${props => props.$backgroundImage}'),
    linear-gradient(135deg, #a07840 0%, #7a5828 100%);
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;

  .image-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    z-index: 10;
    opacity: 0;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(160, 120, 64, 0.8);
      border-color: rgba(160, 120, 64, 0.5);
      transform: translateY(-50%) scale(1.1);
    }

    &.prev {
      left: 15px;
    }

    &.next {
      right: 15px;
    }
  }

  .image-indicators {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.3s ease;

    .indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        background: #a07840;
        box-shadow: 0 0 10px rgba(160, 120, 64, 0.5);
      }

      &:hover {
        background: rgba(255, 255, 255, 0.8);
        transform: scale(1.2);
      }
    }
  }

  &:hover {
    .image-nav,
    .image-indicators {
      opacity: 1;
    }
  }
`;

export const MissionOverlay = styled.div`
  padding: 1.5rem;
  background: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.8) 100%);
  width: 100%;
  position: relative;

  .continent {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

export const MissionCountry = styled.h3`
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
  font-family: 'Georgia', 'Playfair Display', serif;
`;

export const MissionDescription = styled.div`
  padding: 2rem;

  p {
    color: #4a5568;
    line-height: 1.6;
    margin: 0 0 1.5rem 0;
    font-size: 1rem;
  }

  .mission-stats {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1rem;

    .stat {
      text-align: center;
      flex: 1;

      .number {
        display: block;
        font-size: 1.5rem;
        font-weight: 700;
        color: #a07840;
        margin-bottom: 0.25rem;
      }

      .label {
        font-size: 0.8rem;
        color: #6c757d;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }
  }
`;