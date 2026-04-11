import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CountryDetailContainer,
  HeroSection,
  HeroImage,
  HeroContent,
  CountryTitle,
  CountryContinent,
  BackButton,
  MainContent,
  DescriptionSection,
  StatsSection,
  StatCard,
  StatNumber,
  StatLabel,
  GallerySection,
  GalleryTitle,
  ImageGallery,
  GalleryImage,
  ImageModal,
  ModalContent,
  CloseButton,
  NavigationButtons,
  NavButton,
} from './CountryDetailPage.styles';

// Mission countries data (same as in MissionPage)
const missionCountries = [
  {
    id: 1,
    country: 'Bangladesh',
    continent: 'Asien',
    description:
      'Församlingsplantering och utbildningsprojekt i rurala områden.',
    longDescription:
      'I Bangladesh arbetar vi med att plantera församlingar i rurala områden där evangeliet aldrig tidigare har hörts. Vi stöder lokala pastorer genom utbildning och resurser, och driver utvecklingsprojekt som fokuserar på utbildning och hälsovård. Vårt arbete sträcker sig över flera regioner och har lett till grundandet av nya församlingar och utbildning av hundratals lokala ledare.',
    images: [
      'bangladesh-mission.jpg',
      'bangladesh-church.jpg',
      'bangladesh-school.jpg',
    ],
    stats: {
      churches: 8,
      members: 450,
      years: 12,
    },
    coordinates: { x: 74.4, y: 41.0 },
  },
  {
    id: 2,
    country: 'Burundi',
    continent: 'Afrika',
    description: 'Stöd till lokala församlingar och utbildning för ungdomar.',
    longDescription:
      'I Burundi fokuserar vårt arbete på att stärka lokala församlingar och ge ungdomar möjligheter till utbildning och utveckling. Vi driver program för ledarskapsutbildning och stöder lokala pastorer med resurser och mentorskap. Vårt ungdomsarbete inkluderar yrkesutbildning och program som hjälper unga människor att bygga en hållbar framtid.',
    images: ['burundi-mission.jpg', 'burundi-youth.jpg'],
    stats: {
      churches: 6,
      members: 320,
      years: 8,
    },
    coordinates: { x: 58, y: 62 },
  },
  {
    id: 3,
    country: 'Kongo (DRC)',
    continent: 'Afrika',
    description:
      'Humanitär hjälp och församlingsarbete i konfliktdrabbade områden.',
    longDescription:
      'I Demokratiska republiken Kongo arbetar vi i konfliktdrabbade områden för att ge humanitär hjälp och stöd till lokala församlingar. Vårt arbete inkluderar nödhjälp, återuppbyggnad av samfund, och stöd till internflyktingar. Vi arbetar också med fredsbyggande initiativ och försoning mellan olika grupper.',
    images: ['kongo-mission.jpg', 'kongo-aid.jpg', 'kongo-church.jpg'],
    stats: {
      churches: 12,
      members: 680,
      years: 15,
    },
    coordinates: { x: 53, y: 60 },
  },
  {
    id: 4,
    country: 'Rwanda',
    continent: 'Afrika',
    description:
      'Försoning och återuppbyggnad efter folkmord, församlingsplantering.',
    longDescription:
      'I Rwanda fokuserar vårt arbete på försoning och andlig läkning efter folkmordet 1994. Vi arbetar med att plantera nya församlingar och stöder lokala initiativ för fredsbyggande och försoning mellan olika ethniska grupper. Vårt arbete inkluderar trauma-healing program och stöd till änkor och föräldralösa barn.',
    images: ['rwanda-mission.jpg'],
    stats: {
      churches: 10,
      members: 580,
      years: 18,
    },
    coordinates: { x: 60.8, y: 57.0 },
  },
  {
    id: 5,
    country: 'Sri Lanka',
    continent: 'Asien',
    description:
      'Katastrofhjälp och evangelisation på ön samt stöd till lokala pastorer.',
    longDescription:
      'I Sri Lanka kombinerar vi katastrofhjälp med evangelisation och stöd till lokala pastorer. Efter tsunamin 2004 har vi fortsatt att arbeta med återuppbyggnad och utveckling av lokala samfund. Vi driver program för pastorsutbildning och stöder församlingar i både urbana och rurala områden.',
    images: ['srilanka-mission.jpg', 'srilanka-disaster.jpg'],
    stats: {
      churches: 7,
      members: 390,
      years: 10,
    },
    coordinates: { x: 72.1, y: 53.6 },
  },
  {
    id: 6,
    country: 'Tanzania',
    continent: 'Afrika',
    description: 'Barnhem och utbildning samt medicinsk hjälp i avlägsna byar.',
    longDescription:
      'I Tanzania driver vi barnhem för föräldralösa barn och ger utbildning till barn i avlägsna byar. Vi arbetar också med att ge medicinsk hjälp och stöd till lokala hälsocentraler. Vårt arbete inkluderar brunnsgrävning, jordbruksutbildning och stöd till kvinnogrupper för ekonomisk utveckling.',
    images: [
      'tanzania-mission.jpg',
      'tanzania-orphanage.jpg',
      'tanzania-medical.jpg',
    ],
    stats: {
      churches: 14,
      members: 850,
      years: 20,
    },
    coordinates: { x: 59, y: 65 },
  },
  {
    id: 7,
    country: 'Tchad',
    continent: 'Afrika',
    description:
      'Ökenområden evangelisation och vattenprojekt för lokalsamhällen.',
    longDescription:
      'I Tchad arbetar vi i utmanande ökenområden med evangelisation och vattenprojekt. Vi stöder nomadiska samfund genom att bygga brunnar och ge tillgång till rent vatten. Vårt arbete inkluderar också översättning av Bibeln till lokala språk och utbildning av lokala evangelister.',
    images: ['tchad-mission.jpg', 'tchad-water.jpg'],
    stats: {
      churches: 5,
      members: 280,
      years: 9,
    },
    coordinates: { x: 54, y: 48 },
  },
];

const CountryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const countryId = parseInt(id || '0');
  const country = missionCountries.find(c => c.id === countryId);

  if (!country) {
    return (
      <CountryDetailContainer>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1>Land inte funnet</h1>
          <button onClick={() => navigate('/mission')}>
            Tillbaka till mission
          </button>
        </div>
      </CountryDetailContainer>
    );
  }

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;

    if (direction === 'prev') {
      setSelectedImageIndex(
        selectedImageIndex === 0
          ? country.images.length - 1
          : selectedImageIndex - 1
      );
    } else {
      setSelectedImageIndex(
        selectedImageIndex === country.images.length - 1
          ? 0
          : selectedImageIndex + 1
      );
    }
  };

  return (
    <CountryDetailContainer>
      <BackButton onClick={() => navigate('/mission')}>
        ← Tillbaka till mission
      </BackButton>

      <HeroSection>
        <HeroImage src={`/images/${country.images[0]}`} alt={country.country} />
        <HeroContent>
          <CountryTitle>{country.country}</CountryTitle>
          <CountryContinent>{country.continent}</CountryContinent>
        </HeroContent>
      </HeroSection>

      <MainContent>
        <DescriptionSection>
          <h2>Om vårt arbete</h2>
          <p>{country.longDescription || country.description}</p>
        </DescriptionSection>

        <StatsSection>
          <StatCard>
            <StatNumber>{country.stats.churches}</StatNumber>
            <StatLabel>Församlingar</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{country.stats.members}</StatNumber>
            <StatLabel>Medlemmar</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{country.stats.years}</StatNumber>
            <StatLabel>År av arbete</StatLabel>
          </StatCard>
        </StatsSection>

        {country.images.length > 1 && (
          <GallerySection>
            <GalleryTitle>Bildgalleri</GalleryTitle>
            <ImageGallery>
              {country.images.map((image, index) => (
                <GalleryImage
                  key={index}
                  src={`/images/${image}`}
                  alt={`${country.country} ${index + 1}`}
                  onClick={() => openImageModal(index)}
                />
              ))}
            </ImageGallery>
          </GallerySection>
        )}
      </MainContent>

      {selectedImageIndex !== null && (
        <ImageModal onClick={closeImageModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={closeImageModal}>&times;</CloseButton>
            <img
              src={`/images/${country.images[selectedImageIndex]}`}
              alt={`${country.country} ${selectedImageIndex + 1}`}
            />
            <NavigationButtons>
              <NavButton onClick={() => navigateImage('prev')}>‹</NavButton>
              <NavButton onClick={() => navigateImage('next')}>›</NavButton>
            </NavigationButtons>
          </ModalContent>
        </ImageModal>
      )}
    </CountryDetailContainer>
  );
};

export default CountryDetailPage;
