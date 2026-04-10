import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MissionContainer,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  WorldSection,
  SectionTitle,
  MissionGrid,
  MissionCard,
  MissionImage,
  MissionOverlay,
  MissionCountry,
  MissionDescription,
  MissionStats,
  StatItem,
  StatNumber,
  StatLabel,
  InteractiveMap,
  MapContainer,
  WorldMapImage,
  CountryMarker,
  FloatingElements,
  FloatingOrb,
} from './MissionPage.styles';

// Mission countries data
const missionCountries = [
  {
    id: 1,
    country: 'Bangladesh',
    continent: 'Asien',
    description: 'Församlingsplantering och utbildningsprojekt i rurala områden.',
    images: ['bangladesh-mission.jpg', 'bangladesh-church.jpg', 'bangladesh-school.jpg'],
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
    description: 'Humanitär hjälp och församlingsarbete i konfliktdrabbade områden.',
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
    description: 'Försoning och återuppbyggnad efter folkmord, församlingsplantering.',
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
    description: 'Katastrofhjälp och evangelisation på ön samt stöd till lokala pastorer.',
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
    images: ['tanzania-mission.jpg', 'tanzania-orphanage.jpg', 'tanzania-medical.jpg'],
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
    description: 'Ökenområden evangelisation och vattenprojekt för lokalsamhällen.',
    images: ['tchad-mission.jpg', 'tchad-water.jpg'],
    stats: {
      churches: 5,
      members: 280,
      years: 9,
    },
    coordinates: { x: 54, y: 48 },
  },
];

const MissionPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const totalStats = missionCountries.reduce(
    (acc, mission) => ({
      churches: acc.churches + mission.stats.churches,
      members: acc.members + mission.stats.members,
      countries: missionCountries.length,
    }),
    { churches: 0, members: 0, countries: 0 }
  );

  const nextImage = (missionId: number, imagesLength: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [missionId]: ((prev[missionId] || 0) + 1) % imagesLength
    }));
  };

  const prevImage = (missionId: number, imagesLength: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [missionId]: ((prev[missionId] || 0) - 1 + imagesLength) % imagesLength
    }));
  };

  const getCurrentImage = (mission: any) => {
    const index = currentImageIndex[mission.id] || 0;
    return mission.images[index];
  };

  const handleCountryClick = (countryId: number) => {
    navigate(`/mission/country/${countryId}`);
  };

  return (
    <MissionContainer>
      <WorldSection>
        <SectionTitle>Våra Missionsfält</SectionTitle>
        <MapContainer>
          <InteractiveMap>
            <WorldMapImage 
              src="/images/mapa-mundo.png" 
              alt="World Map" 
              draggable={false}
            />
            {missionCountries.map((mission) => (
              <CountryMarker
                key={mission.id}
                $x={mission.coordinates.x}
                $y={mission.coordinates.y}
                $isActive={false}
                onClick={() => handleCountryClick(mission.id)}
                title={mission.country}
              >
                <div className="pulse" />
                <div className="marker" />
                <div className="country-label">{mission.country}</div>
              </CountryMarker>
            ))}
          </InteractiveMap>
        </MapContainer>

        <MissionGrid>
          {missionCountries.map((mission) => (
            <MissionCard
              key={mission.id}
              $isSelected={false}
              onClick={() => handleCountryClick(mission.id)}
            >
              <MissionImage $backgroundImage={getCurrentImage(mission)}>
                {mission.images.length > 1 && (
                  <>
                    <div 
                      className="image-nav prev"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage(mission.id, mission.images.length);
                      }}
                    >
                      ←
                    </div>
                    <div 
                      className="image-nav next"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage(mission.id, mission.images.length);
                      }}
                    >
                      →
                    </div>
                    <div className="image-indicators">
                      {mission.images.map((_, index) => (
                        <div
                          key={index}
                          className={`indicator ${index === (currentImageIndex[mission.id] || 0) ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(prev => ({
                              ...prev,
                              [mission.id]: index
                            }));
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
                <MissionOverlay>
                  <MissionCountry>{mission.country}</MissionCountry>
                  <div className="continent">{mission.continent}</div>
                </MissionOverlay>
              </MissionImage>
              
              <MissionDescription>
                <p>{mission.description}</p>
                <div className="mission-stats">
                  <div className="stat">
                    <span className="number">{mission.stats.churches}</span>
                    <span className="label">Församlingar</span>
                  </div>
                  <div className="stat">
                    <span className="number">{mission.stats.members}</span>
                    <span className="label">Medlemmar</span>
                  </div>
                  <div className="stat">
                    <span className="number">{mission.stats.years}</span>
                    <span className="label">År</span>
                  </div>
                </div>
              </MissionDescription>
            </MissionCard>
          ))}
        </MissionGrid>
      </WorldSection>
    </MissionContainer>
  );
};

export default MissionPage;