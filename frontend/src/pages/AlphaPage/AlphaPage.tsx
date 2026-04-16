import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from 'react-query';
import {
  IconChevronLeft,
  IconChevronRight,
  IconMapPin,
  IconX,
  IconZoomIn,
} from '../../components/Icons';
import { getAlphaProgram } from '../../services/api';
import { AlphaPhoto, AlphaProgram, AlphaStep } from '../../types';
import {
  HistGalleryTrack,
  HistGalleryDots,
  HistGalleryDot,
  HistLightbox,
  HistLightboxImg,
  HistLightboxClose,
  HistLightboxNav,
  HistLightboxCounter,
} from '../HistoriaPage/HistoriaPage.styles';
import {
  AlphaWrapper,
  MeshOrb,
  HeroSection,
  HeroInner,
  AlphaLogo,
  HeroEyebrow,
  HeroTitle,
  HeroSubtitle,
  HeroCTARow,
  CTAPrimary,
  CTASecondary,
  ScrollIndicator,
  ScrollLine,
  Section,
  SectionAlt,
  Container,
  SectionEyebrow,
  SectionTitle,
  SectionLead,
  IntroDuoLayout,
  IntroCard,
  IntroText,
  IntroQuote,
  IntroBody,
  IntroRegCard,
  IntroRegTag,
  IntroRegTitle,
  IntroRegDesc,
  IntroRegMeta,
  IntroRegBtn,
  VideoWrap,
  StepsGrid,
  StepCard,
  StepEmoji,
  StepTitle,
  StepDesc,
  TopicsGrid,
  TopicCard,
  TopicNumber,
  TopicText,
  ClosingSection,
  ClosingQuote,
  ClosingSource,
  Divider,
  AlphaGalleryWrapper,
  AlphaGalleryCard,
  AlphaGalleryCardImg,
  AlphaGalleryCardOverlay,
} from './AlphaPage.styles';

// ── Default fallback data ──────────────────────────────────────────────────────

const DEFAULT_STEPS: AlphaStep[] = [
  {
    emoji: '🍽️',
    title: 'Mat',
    desc: 'Varje träff börjar med en gemensam måltid. Det skapar en avslappnad stämning och ger tid att lära känna varandra.',
  },
  {
    emoji: '🎬',
    title: 'Film',
    desc: 'Vi tittar tillsammans på en kort film som introducerar kvällens tema på ett engagerande och tankeväckande sätt.',
  },
  {
    emoji: '💬',
    title: 'Samtal',
    desc: 'I små grupper pratar vi om det vi just sett. Inga rätta svar, inga krav — bara ett öppet samtal.',
  },
];

const DEFAULT_TOPICS = [
  'Finns det mer i livet?',
  'Vem är Jesus?',
  'Varför dog Jesus?',
  'Hur kan jag ha tillit?',
  'Varför och hur ber man?',
  'Hur läser man Bibeln?',
  'Hur leder Gud oss?',
  'Alphahelgen — Vem är den Helige Ande?',
  'Vad gör den Helige Ande?',
  'Hur kan jag stå emot det onda?',
  'Varför och hur ska jag berätta för andra?',
  'Innebär Gud helande idag?',
  'Vad säger Bibeln om kyrkan?',
];

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
// Uses a callback ref so it works even when the element mounts after data loads.

function useInView(threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  const ref = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        },
        { threshold }
      );
      obs.observe(el);
    },
    [threshold]
  );
  return { ref, visible };
}

// ── Gallery with horizontal scroll + lightbox ─────────────────────────────────

const AlphaGallery: React.FC<{ photos: AlphaPhoto[] }> = ({ photos }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevLight = useCallback(
    () =>
      setLightboxIndex(i =>
        i !== null ? (i - 1 + photos.length) % photos.length : null
      ),
    [photos.length]
  );
  const nextLight = useCallback(
    () => setLightboxIndex(i => (i !== null ? (i + 1) % photos.length : null)),
    [photos.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLight();
      if (e.key === 'ArrowRight') nextLight();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, closeLightbox, prevLight, nextLight]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cardWidth = track.scrollWidth / photos.length;
      setActiveSlide(Math.round(track.scrollLeft / cardWidth));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [photos.length]);

  return (
    <>
      <AlphaGalleryWrapper>
        <HistGalleryTrack ref={trackRef as React.RefObject<HTMLDivElement>}>
          {photos.map((photo, i) => (
            <AlphaGalleryCard
              key={photo.id}
              onClick={() => setLightboxIndex(i)}
            >
              <AlphaGalleryCardImg
                src={photo.image}
                alt={photo.caption || `Alpha — bild ${i + 1}`}
                onLoad={e => (e.currentTarget.className = 'loaded')}
              />
              <AlphaGalleryCardOverlay>
                <IconZoomIn size={18} />
              </AlphaGalleryCardOverlay>
            </AlphaGalleryCard>
          ))}
        </HistGalleryTrack>
        <HistGalleryDots>
          {photos.map((_, i) => (
            <HistGalleryDot
              key={i}
              $active={i === activeSlide}
              onClick={() => {
                const track = trackRef.current;
                if (!track) return;
                const cardWidth = track.scrollWidth / photos.length;
                track.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
              }}
            />
          ))}
        </HistGalleryDots>
      </AlphaGalleryWrapper>

      {lightboxIndex !== null &&
        ReactDOM.createPortal(
          <HistLightbox onClick={closeLightbox}>
            <HistLightboxClose onClick={closeLightbox}>
              <IconX size={18} />
            </HistLightboxClose>
            <HistLightboxNav
              $dir='prev'
              onClick={e => {
                e.stopPropagation();
                prevLight();
              }}
            >
              <IconChevronLeft size={22} />
            </HistLightboxNav>
            <HistLightboxImg
              src={photos[lightboxIndex].image}
              alt={
                photos[lightboxIndex].caption ||
                `Alpha — bild ${lightboxIndex + 1}`
              }
              onClick={e => e.stopPropagation()}
            />
            <HistLightboxNav
              $dir='next'
              onClick={e => {
                e.stopPropagation();
                nextLight();
              }}
            >
              <IconChevronRight size={22} />
            </HistLightboxNav>
            <HistLightboxCounter>
              {lightboxIndex + 1} / {photos.length}
            </HistLightboxCounter>
          </HistLightbox>,
          document.body
        )}
    </>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────

const AlphaPage: React.FC = () => {
  const { data } = useQuery<AlphaProgram>('alpha-program', getAlphaProgram, {
    staleTime: 5 * 60 * 1000,
  });

  const intro = useInView();
  const video = useInView();
  const steps = useInView();
  const topics = useInView();
  const gallery = useInView();

  const d = data;
  const heroEyebrow = d?.hero_eyebrow ?? 'Pingstkyrkan Elim · Trelleborg';
  const heroTitle = d?.hero_title ?? 'Alpha';
  const heroSubtitle =
    d?.hero_subtitle ??
    'Utforska livet, tron och meningen — i en öppen och välkomnande atmosfär där alla frågor är välkomna.';
  const introQuote =
    d?.intro_quote ?? 'En plats där du kan utforska livet, tron och meningen.';
  const introBody = d?.intro_body ?? '';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const introImage = d?.intro_image ?? null;
  const videoUrl = d?.video_url ?? '';
  const videoTitle = d?.video_title ?? 'Vad är Alpha?';
  const stepsData = d?.steps && d.steps.length > 0 ? d.steps : DEFAULT_STEPS;
  const topicsData =
    d?.topics && d.topics.length > 0 ? d.topics : DEFAULT_TOPICS;
  const nextTag = d?.next_alpha_tag ?? '';
  const nextTitle = d?.next_alpha_title ?? '';
  const nextDesc = d?.next_alpha_desc ?? '';
  const nextVenue = d?.next_alpha_venue ?? '';
  const nextLocation = d?.next_alpha_location ?? '';
  const nextEmail = d?.next_alpha_email ?? '';
  const hasNextAlpha = !!(d && nextTitle.trim());
  const closingQuote =
    d?.closing_quote ??
    '"Alpha är en plats där du kan vara precis den du är — med alla dina frågor, tvivel och tankar."';
  const galleryPhotos = d?.gallery ?? [];

  return (
    <AlphaWrapper>
      <MeshOrb />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <HeroSection>
        <HeroInner>
          <AlphaLogo>α</AlphaLogo>
          <HeroEyebrow>{heroEyebrow}</HeroEyebrow>
          <HeroTitle>{heroTitle}</HeroTitle>
          <HeroSubtitle>{heroSubtitle}</HeroSubtitle>
          <HeroCTARow>
            <CTAPrimary href='#anmalan'>Anmäl dig</CTAPrimary>
            <CTASecondary href='#vad-ar-alpha'>Läs mer</CTASecondary>
          </HeroCTARow>
        </HeroInner>
        <ScrollIndicator>
          <ScrollLine />
          Scrolla
        </ScrollIndicator>
      </HeroSection>

      {/* ── What is Alpha + Registration ───────────────────────── */}
      <Section id='vad-ar-alpha'>
        <Container>
          <div
            ref={intro.ref}
            style={{
              opacity: intro.visible ? 1 : 0,
              transform: intro.visible ? 'none' : 'translateY(40px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <IntroDuoLayout $single={!hasNextAlpha}>
              {/* Left — what is Alpha */}
              <IntroCard>
                <IntroText>
                  <IntroQuote>{introQuote}</IntroQuote>
                  <IntroBody>{introBody}</IntroBody>
                </IntroText>
              </IntroCard>

              {/* Right — registration (only when configured) */}
              {hasNextAlpha && (
                <IntroRegCard id='anmalan'>
                  <IntroRegTag>{nextTag}</IntroRegTag>
                  <IntroRegTitle>{nextTitle}</IntroRegTitle>
                  <IntroRegDesc>{nextDesc}</IntroRegDesc>
                  <IntroRegMeta>
                    <IconMapPin size={14} />
                    {nextVenue && <span>{nextVenue}</span>}
                    {nextLocation
                      ? `${nextVenue ? ', ' : ''}${nextLocation}`
                      : ''}
                  </IntroRegMeta>
                  <IntroRegBtn
                    href={`mailto:${nextEmail}?subject=Anmälan Alpha`}
                  >
                    Anmäl dig
                  </IntroRegBtn>
                </IntroRegCard>
              )}
            </IntroDuoLayout>
          </div>
        </Container>
      </Section>

      {/* ── Video ──────────────────────────────────────────────── */}
      <SectionAlt>
        <Container>
          <SectionEyebrow>Se filmen</SectionEyebrow>
          <SectionTitle>{videoTitle}</SectionTitle>
          <SectionLead>
            Titta på den här korta filmen och få en känsla för vad Alpha handlar
            om och vad du kan förvänta dig.
          </SectionLead>
          <div
            ref={video.ref}
            style={{
              opacity: video.visible ? 1 : 0,
              transform: video.visible ? 'none' : 'translateY(30px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            {videoUrl && (
              <VideoWrap>
                <iframe
                  src={videoUrl}
                  title={videoTitle}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </VideoWrap>
            )}
          </div>
        </Container>
      </SectionAlt>

      {/* ── How it works ───────────────────────────────────────── */}
      <Section>
        <Container>
          <SectionEyebrow>Hur fungerar det?</SectionEyebrow>
          <SectionTitle>Enkelt. Öppet. Välkomnande.</SectionTitle>
          <SectionLead>
            Varje Alpha-kväll följer samma enkla format — och det är det som gör
            det så bra.
          </SectionLead>
          <div
            ref={steps.ref}
            style={{
              opacity: steps.visible ? 1 : 0,
              transform: steps.visible ? 'none' : 'translateY(40px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <StepsGrid>
              {stepsData.map((step, i) => (
                <StepCard key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <StepEmoji>{step.emoji}</StepEmoji>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDesc>{step.desc}</StepDesc>
                </StepCard>
              ))}
            </StepsGrid>
          </div>
        </Container>
      </Section>

      {/* ── Topics ─────────────────────────────────────────────── */}
      <SectionAlt>
        <Container>
          <SectionEyebrow>{topicsData.length} veckor</SectionEyebrow>
          <SectionTitle>Vad pratar vi om?</SectionTitle>
          <SectionLead>
            Varje vecka utforskar vi en ny fråga. Alla är välkomna att ställa
            frågor, tvivla och fundera högt.
          </SectionLead>
          <div
            ref={topics.ref}
            style={{
              opacity: topics.visible ? 1 : 0,
              transform: topics.visible ? 'none' : 'translateY(30px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <TopicsGrid>
              {topicsData.map((topic, i) => (
                <TopicCard key={i} $index={i}>
                  <TopicNumber>{String(i + 1).padStart(2, '0')}</TopicNumber>
                  <TopicText>{topic}</TopicText>
                </TopicCard>
              ))}
            </TopicsGrid>
          </div>
        </Container>
      </SectionAlt>

      {/* ── Gallery ────────────────────────────────────────────── */}
      {galleryPhotos.length > 0 && (
        <Section>
          <Container>
            <SectionEyebrow>Bilder</SectionEyebrow>
            <SectionTitle>Alpha i bilder</SectionTitle>
            <div
              ref={gallery.ref}
              style={{
                opacity: gallery.visible ? 1 : 0,
                transform: gallery.visible ? 'none' : 'translateY(30px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
              }}
            >
              <AlphaGallery photos={galleryPhotos} />
            </div>
          </Container>
        </Section>
      )}

      {/* ── Closing quote ──────────────────────────────────────── */}
      <ClosingSection>
        <Divider />
        <ClosingQuote>{closingQuote}</ClosingQuote>
        <ClosingSource>Pingstkyrkan Elim · Trelleborg</ClosingSource>
      </ClosingSection>
    </AlphaWrapper>
  );
};

export default AlphaPage;
