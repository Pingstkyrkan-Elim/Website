import styled from 'styled-components';

export const CountryDetailContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5ede0 0%, #d4b888 100%);
`;

export const BackButton = styled.button`
  position: fixed;
  top: 100px;
  left: 2rem;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  color: #7a5828;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    position: relative;
    top: 0;
    left: 0;
    margin: 1rem;
    width: fit-content;
  }
`;

export const HeroSection = styled.section`
  position: relative;
  height: 70vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 50vh;
  }
`;

export const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 2rem;
`;

export const CountryTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const CountryContinent = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const DescriptionSection = styled.section`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;

  h2 {
    font-size: 2.5rem;
    color: #7a5828;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #555;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 2rem;
    
    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }
`;

export const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const StatCard = styled.div`
  background: linear-gradient(135deg, #7a5828 0%, #4a3418 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(44, 90, 160, 0.3);
  transform: translateY(0);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(44, 90, 160, 0.4);
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 300;
`;

export const GallerySection = styled.section`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const GalleryTitle = styled.h2`
  font-size: 2.5rem;
  color: #7a5828;
  margin-bottom: 2rem;
  font-weight: 600;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const GalleryImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    height: 200px;
  }
`;

export const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  cursor: pointer;
`;

export const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  cursor: default;

  img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 10px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export const NavigationButtons = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 -50px;
`;

export const NavButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  &:first-child {
    margin-left: -60px;
  }

  &:last-child {
    margin-right: -60px;
  }

  @media (max-width: 768px) {
    &:first-child {
      margin-left: -40px;
    }

    &:last-child {
      margin-right: -40px;
    }
  }
`;