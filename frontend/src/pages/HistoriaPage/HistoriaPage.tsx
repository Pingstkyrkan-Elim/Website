import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import {
  HistoriaContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  BookContainer,
  IPadWrapper,
  IPadFrame,
  IPadScreen,
  BookPages,
  LeftPage,
  RightPage,
  PageContent,
  PageNumber,
  NavigationControls,
  NavButton,
  CloseBookButton,
  SwipeArea,
  AppleCover,
  AppleTitle,
  AppleSubtitle,
  AppleButton,
  AppleOrbs,
} from './HistoriaPage.styles';
import { historyStories } from './HistoriaUtils';

const HistoriaPage: React.FC = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const swipeAreaRef = useRef<HTMLDivElement>(null);

  const nextStory = () => {
    if (currentStory < historyStories.length - 1) {
      setCurrentStory(currentStory + 1);
    }
  };

  const prevStory = () => {
    if (currentStory > 0) {
      setCurrentStory(currentStory - 1);
    }
  };

  const activateScreen = () => {
    setIsActive(true);
  };

  const deactivateScreen = () => {
    setIsActive(false);
    setCurrentStory(0);
  };

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextStory();
    }
    if (isRightSwipe) {
      prevStory();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;
      
      if (e.key === 'ArrowLeft') {
        prevStory();
      } else if (e.key === 'ArrowRight') {
        nextStory();
      } else if (e.key === 'Escape') {
        deactivateScreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, currentStory]);

  const currentStoryData = historyStories[currentStory];

  return (
    <HistoriaContainer>
      <BookContainer>
        <IPadWrapper $isActive={isActive}>
          <IPadFrame />
          <IPadScreen $isActive={isActive} onClick={!isActive ? activateScreen : undefined}>
            {!isActive && (
              <AppleCover>
                <AppleOrbs>
                  {/* Generate year bubbles from 1920 to 2026 */}
                  {Array.from({length: 30}, (_, i) => {
                    const year = 1920 + (i * 3.5); // Spread years across the timeline
                    const actualYear = Math.round(year);
                    if (actualYear > 2026) return null;
                    
                    return (
                      <div 
                        key={actualYear}
                        className="year-bubble"
                        style={{
                          left: `${15 + (i % 6) * 15}%`,
                          top: `${20 + Math.floor(i / 6) * 20}%`,
                          animationDelay: `${-i * 0.3}s`
                        }}
                      >
                        {actualYear}
                      </div>
                    );
                  })}
                </AppleOrbs>
                <AppleTitle>Historia</AppleTitle>
                <AppleSubtitle>
                  Upptäck Pingstkyrkan Elims rika historia genom en interaktiv iPad. 
                  Swipe eller klicka för att navigera genom vår resa från 1920 till idag.
                </AppleSubtitle>
                <AppleButton onClick={activateScreen}>
                  Tryck för att starta
                </AppleButton>
              </AppleCover>
            )}

          {isActive && (
            <BookPages>
              <SwipeArea
                ref={swipeAreaRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <LeftPage>
                  <PageContent>
                    <div className="image-page">
                      {currentStoryData.image && currentStoryData.image.length > 0 ? (
                        currentStoryData.image.length === 1 ? (
                          <img 
                            src={`/images/${currentStoryData.image[0]}`}
                            alt={currentStoryData.title}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="image-gallery">
                            {currentStoryData.image.map((img, index) => (
                              <img 
                                key={index}
                                src={`/images/${img}`}
                                alt={`${currentStoryData.title} - Bild ${index + 1}`}
                                className="gallery-image"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            ))}
                          </div>
                        )
                      ) : (
                        <div className="no-image">
                          <div className="placeholder-text">Ingen bild tillgänglig</div>
                        </div>
                      )}
                      <div className="image-caption">
                        <div className="image-title">{currentStoryData.title}</div>
                      </div>
                    </div>
                  </PageContent>
                </LeftPage>
                
                <RightPage>
                  <PageContent>
                    <div className="text-page">
                      <h2 className="story-title">{currentStoryData.title}</h2>
                      <div className="story-date">{currentStoryData.date}</div>
                      
                      <div className="story-content">
                        {currentStoryData.content.split('\n\n').map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                      
                      {currentStoryData.details && (
                        <div className="story-details">
                          <h4>FÖRESTÅNDARE:</h4>
                          <ul>
                            {currentStoryData.details.map((detail, index) => (
                              <li key={index}>{detail}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                  </PageContent>
                </RightPage>
              </SwipeArea>

              <NavigationControls>
                <NavButton 
                  onClick={prevStory} 
                  disabled={currentStory === 0}
                  $position="left"
                >
                  ←
                </NavButton>

                <NavButton 
                  onClick={nextStory} 
                  disabled={currentStory === historyStories.length - 1}
                  $position="right"
                >
                  →
                </NavButton>
              </NavigationControls>

              <CloseBookButton onClick={deactivateScreen}>
                <X size={16} />
              </CloseBookButton>
            </BookPages>
          )}
          </IPadScreen>
        </IPadWrapper>
      </BookContainer>
    </HistoriaContainer>
  );
};

export default HistoriaPage;