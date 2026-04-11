import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from 'react-query';
import { getHistoryEntries } from '../../services/api';
import { HistoryEntry } from '../../types';
import {
  PageWrapper,
  Hero,
  HeroBackground,
  HeroDecorYear,
  HeroContent,
  HeroEyebrow,
  HeroTitle,
  HeroSubtitle,
  HeroScroll,
  HeroScrollLine,
  HeroScrollLabel,
  TimelineSection,
  TimelineInner,
  Entry,
  EntryDot,
  EntryPeriod,
  EntryTitle,
  EntryDivider,
  EntryContent,
  ImageGrid,
  ImageItem,
  LeadersSection,
  LeadersLabel,
  LeadersList,
  LeaderPill,
  AttributionSection,
  AttributionText,
  LoadingWrapper,
  HistGalleryWrapper,
  HistGalleryTrack,
  HistGalleryCard,
  HistGalleryCardImg,
  HistGalleryCardOverlay,
  HistGalleryDots,
  HistGalleryDot,
  HistLightbox,
  HistLightboxImg,
  HistLightboxClose,
  HistLightboxNav,
  HistLightboxCounter,
} from './HistoriaPage.styles';
import { staticHistoryData } from './HistoriaUtils';
import { IconChevronLeft, IconChevronRight, IconX, IconZoomIn } from '../../components/Icons';

// ── Scroll-reveal hook ────────────────────────────────────────────────────────

const useInView = (threshold = 0.12): [React.RefObject<HTMLElement>, boolean] => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

// ── EntryGallery (horizontal scroll + lightbox for 4+ images) ────────────────

const EntryGallery: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);
  const prevLight = () => setLightboxIndex(i => i !== null ? (i - 1 + images.length) % images.length : null);
  const nextLight = () => setLightboxIndex(i => i !== null ? (i + 1) % images.length : null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLight();
      if (e.key === 'ArrowRight') nextLight();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cardWidth = track.scrollWidth / images.length;
      setActiveSlide(Math.round(track.scrollLeft / cardWidth));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [images.length]);

  return (
    <>
      <HistGalleryWrapper>
        <HistGalleryTrack ref={trackRef as React.RefObject<HTMLDivElement>}>
          {images.map((img, i) => (
            <HistGalleryCard key={i} onClick={() => setLightboxIndex(i)}>
              <HistGalleryCardImg
                src={`/images/${img}`}
                alt={`${title} — bild ${i + 1}`}
                onLoad={e => (e.currentTarget.className = 'loaded')}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <HistGalleryCardOverlay>
                <IconZoomIn size={18} />
              </HistGalleryCardOverlay>
            </HistGalleryCard>
          ))}
        </HistGalleryTrack>
        <HistGalleryDots>
          {images.map((_, i) => (
            <HistGalleryDot
              key={i}
              $active={i === activeSlide}
              onClick={() => {
                const track = trackRef.current;
                if (!track) return;
                const cardWidth = track.scrollWidth / images.length;
                track.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
              }}
            />
          ))}
        </HistGalleryDots>
      </HistGalleryWrapper>

      {lightboxIndex !== null && ReactDOM.createPortal(
        <HistLightbox onClick={closeLightbox}>
          <HistLightboxClose onClick={closeLightbox}><IconX size={18} /></HistLightboxClose>
          <HistLightboxNav $dir="prev" onClick={e => { e.stopPropagation(); prevLight(); }}>
            <IconChevronLeft size={22} />
          </HistLightboxNav>
          <HistLightboxImg
            src={`/images/${images[lightboxIndex]}`}
            alt={`${title} — bild ${lightboxIndex + 1}`}
            onClick={e => e.stopPropagation()}
          />
          <HistLightboxNav $dir="next" onClick={e => { e.stopPropagation(); nextLight(); }}>
            <IconChevronRight size={22} />
          </HistLightboxNav>
          <HistLightboxCounter>{lightboxIndex + 1} / {images.length}</HistLightboxCounter>
        </HistLightbox>,
        document.body
      )}
    </>
  );
};

// ── TimelineEntry component ───────────────────────────────────────────────────

const TimelineEntry: React.FC<{ entry: HistoryEntry; delay: number }> = ({ entry, delay }) => {
  const [ref, visible] = useInView();

  return (
    <Entry
      ref={ref as React.RefObject<HTMLElement>}
      $visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <EntryDot />
      <EntryPeriod>{entry.period}</EntryPeriod>
      <EntryTitle>{entry.title}</EntryTitle>
      <EntryDivider />

      <EntryContent>
        {entry.content.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </EntryContent>

      {entry.images.length > 0 && (
        entry.images.length > 3 ? (
          <EntryGallery images={entry.images} title={entry.title} />
        ) : (
          <ImageGrid $count={entry.images.length}>
            {entry.images.map((img, i) => (
              <ImageItem key={i}>
                <img
                  src={`/images/${img}`}
                  alt={`${entry.title} — bild ${i + 1}`}
                  onLoad={e => (e.currentTarget.className = 'loaded')}
                  onError={e => {
                    const parent = e.currentTarget.parentElement as HTMLElement;
                    if (parent) parent.style.display = 'none';
                  }}
                />
              </ImageItem>
            ))}
          </ImageGrid>
        )
      )}

      {entry.leaders.length > 0 && (
        <LeadersSection>
          <LeadersLabel>Föreståndare</LeadersLabel>
          <LeadersList>
            {entry.leaders.map((leader, i) => (
              <LeaderPill key={i}>{leader}</LeaderPill>
            ))}
          </LeadersList>
        </LeadersSection>
      )}
    </Entry>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────────

const HistoriaPage: React.FC = () => {
  const { data: apiEntries, isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: getHistoryEntries,
    retry: 1,
  });

  const entries: HistoryEntry[] = Array.isArray(apiEntries) && apiEntries.length > 0
    ? apiEntries
    : staticHistoryData;

  return (
    <PageWrapper>
      <Hero>
        <HeroBackground />
        <HeroDecorYear>1919 – 2025</HeroDecorYear>

        <HeroContent>
          <HeroEyebrow>Pingstkyrkan Elim · Trelleborg</HeroEyebrow>
          <HeroTitle>Historia</HeroTitle>
          <HeroSubtitle>
            En resa genom mer än hundra år av tro, gemenskap och tillväxt.
          </HeroSubtitle>
        </HeroContent>

        <HeroScroll>
          <HeroScrollLine />
          <HeroScrollLabel>Scrolla</HeroScrollLabel>
        </HeroScroll>
      </Hero>

      <TimelineSection>
        <TimelineInner>
          {isLoading && !apiEntries ? (
            <LoadingWrapper>Laddar historia…</LoadingWrapper>
          ) : (
            entries.map((entry, index) => (
              <TimelineEntry
                key={entry.id}
                entry={entry}
                delay={index === 0 ? 100 : 0}
              />
            ))
          )}
        </TimelineInner>
      </TimelineSection>

      <AttributionSection>
        <AttributionText>
          Innehållet är hämtat från utställningen som Lilian Thonney gjorde till
          församlingens 100-års jubileum 2019, samt från boken "Pingströrelsen i
          Skåne — historia och utveckling" sammanställd av Rune Sahrling.
          Dokumentationsgrupp: Bo och Christina Ganslardt, Maja Hansson,
          Birgitta Eborn, Sten Bengtsson, Elsa Hansson, Eva Hansson,
          Anna-Gretha Svensson, Kenneth och Marianne Olofsson och Hilda Olsson.
        </AttributionText>
      </AttributionSection>
    </PageWrapper>
  );
};

export default HistoriaPage;
