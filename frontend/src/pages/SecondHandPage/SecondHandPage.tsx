import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { getSecondHandStore } from '../../services/api';
import { SecondHandStore } from '../../types';
import {
  AboutCard,
  AboutCardStat,
  AboutCardStatLabel,
  AboutCardStatNumber,
  AboutInner,
  AboutSection,
  AboutText,
  AboutVisual,
  ButtonOutline,
  ButtonPrimary,
  ContactIcon,
  ContactItem,
  ContactList,
  ContactText,
  ContactTextLabel,
  ContactTextValue,
  DonateBody,
  DonateButtons,
  DonateInner,
  DonateSection,
  DonateTitle,
  GalleryCard,
  GalleryCardImg,
  GalleryCardOverlay,
  GalleryCardZoomIcon,
  GalleryDot,
  GalleryDots,
  GalleryHeader,
  GalleryPlaceholder,
  GalleryPlaceholderIcon,
  GalleryPlaceholderText,
  GallerySection,
  GalleryTrack,
  Hero,
  HeroBadge,
  HeroBadges,
  HeroEyebrow,
  HeroScroll,
  HeroScrollLabel,
  HeroScrollLine,
  HeroTagline,
  HeroTitle,
  HoursDay,
  HoursGrid,
  HoursRow,
  HoursTime,
  InfoBlock,
  InfoInner,
  InfoLabel,
  InfoStrip,
  Lightbox,
  LightboxClose,
  LightboxCounter,
  LightboxImg,
  LightboxNav,
  PageWrapper,
  PMULink,
  SectionBody,
  SectionEyebrow,
  SectionTitle,
} from './SecondHandPage.styles';

// ── Static fallback ───────────────────────────────────────────────────────────

const STATIC_STORE: SecondHandStore = {
  id: 0,
  name: 'PMU Second Hand',
  tagline: 'Välkurada fynd — ett bättre miljö',
  description:
    'PMU Second Hand drivs av PMU tillsammans med Pingstkyrkan Elim i Trelleborg. Överskottet delas lika mellan PMU och församlingen.',
  address: 'Tommarpsvägen 85, Trelleborg',
  phone: '0410-100 80',
  email: '',
  opening_hours: [
    { day: 'Måndag', hours: 'Stängt' },
    { day: 'Tisdag', hours: '11:00–18:00' },
    { day: 'Onsdag', hours: '11:00–18:00' },
    { day: 'Torsdag', hours: '11:00–18:00' },
    { day: 'Fredag', hours: '11:00–18:00' },
    { day: 'Lördag', hours: '10:00–15:00' },
    { day: 'Söndag', hours: 'Stängt' },
  ],
  donation_hours: [
    { day: 'Måndag', hours: '9:00–16:00' },
    { day: 'Tisdag', hours: '9:00–18:00' },
    { day: 'Onsdag', hours: '9:00–18:00' },
    { day: 'Torsdag', hours: '9:00–18:00' },
    { day: 'Fredag', hours: '9:00–18:00' },
    { day: 'Lördag', hours: '10:00–15:00' },
  ],
  images: [],
  pmu_url: 'https://pmu.se',
  donation_info:
    'Vi tar emot välskötta kläder, böcker, husgeråd och prydnadsföremål. Lämna ditt bidrag direkt i butiken under öppettiderna.',
};

// ── Scroll-reveal hook ────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
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
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Page ──────────────────────────────────────────────────────────────────────

const SecondHandPage: React.FC = () => {
  const { data: apiStore, isLoading } = useQuery({
    queryKey: ['second-hand'],
    queryFn: getSecondHandStore,
    retry: 1,
  });

  const raw = apiStore ?? STATIC_STORE;
  const store: SecondHandStore = {
    ...STATIC_STORE,
    ...raw,
    images: Array.isArray(raw?.images) ? raw.images : [],
    opening_hours: Array.isArray(raw?.opening_hours)
      ? raw.opening_hours
      : STATIC_STORE.opening_hours,
    donation_hours: Array.isArray(raw?.donation_hours)
      ? raw.donation_hours
      : STATIC_STORE.donation_hours,
  };

  const about = useInView();
  const donate = useInView();
  const gallery = useInView();
  const trackRef = useRef<HTMLDivElement>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevLight = () =>
    setLightboxIndex(i =>
      i !== null ? (i - 1 + store.images.length) % store.images.length : null
    );
  const nextLight = () =>
    setLightboxIndex(i => (i !== null ? (i + 1) % store.images.length : null));

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
      const cardWidth = track.scrollWidth / store.images.length;
      setActiveSlide(Math.round(track.scrollLeft / cardWidth));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [store.images.length]);

  const hasGallery = store.images.length > 0;

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <Hero>
        <HeroEyebrow>Pingstkyrkan Elim × PMU</HeroEyebrow>
        <HeroTitle>{store.name}</HeroTitle>
        <HeroTagline>
          {store.tagline || 'Välkurade fynd för en bättre värld'}
        </HeroTagline>
        <HeroBadges>
          <HeroBadge>Återvinning</HeroBadge>
          <HeroBadge>Biståndsarbete</HeroBadge>
          <HeroBadge>Kontantfri butik</HeroBadge>
          <HeroBadge>
            {store.address.split(',')[1]?.trim() || 'Trelleborg'}
          </HeroBadge>
        </HeroBadges>
        <HeroScroll>
          <HeroScrollLine />
          <HeroScrollLabel>Scroll</HeroScrollLabel>
        </HeroScroll>
      </Hero>

      {/* ── About / Mission ── */}
      <AboutSection
        ref={about.ref as React.RefObject<HTMLElement>}
        $visible={about.visible}
      >
        <AboutInner>
          <AboutText>
            <SectionEyebrow>Om butiken</SectionEyebrow>
            <SectionTitle>Shopping med syfte</SectionTitle>
            {store.description
              .split('\n')
              .filter(Boolean)
              .map((p, i) => (
                <SectionBody key={i}>{p}</SectionBody>
              ))}
            <SectionBody>
              PMU (Pingstmissionens utvecklingssamarbete) är en
              biståndsorganisation som driver Second Hand-butiker med syfte att
              generera biståndspengar till sociala projekt både i Sverige och
              utlandet — och bidra till en bättre miljö genom återvinning.
            </SectionBody>
            <PMULink
              href={store.pmu_url}
              target='_blank'
              rel='noopener noreferrer'
            >
              Läs mer på PMU:s hemsida →
            </PMULink>
          </AboutText>

          <AboutVisual>
            <AboutCard>
              <AboutCardStat>
                <AboutCardStatNumber>50%</AboutCardStatNumber>
                <AboutCardStatLabel>
                  Till PMU:s biståndsarbete
                </AboutCardStatLabel>
              </AboutCardStat>
              <AboutCardStat>
                <AboutCardStatNumber>50%</AboutCardStatNumber>
                <AboutCardStatLabel>Till Pingstkyrkan Elim</AboutCardStatLabel>
              </AboutCardStat>
              <AboutCardStat>
                <AboutCardStatNumber>100+</AboutCardStatNumber>
                <AboutCardStatLabel>PMU-butiker i Sverige</AboutCardStatLabel>
              </AboutCardStat>
            </AboutCard>
          </AboutVisual>
        </AboutInner>
      </AboutSection>

      {/* ── Gallery ── */}
      <GallerySection
        ref={gallery.ref as React.RefObject<HTMLElement>}
        $visible={gallery.visible}
      >
        <GalleryHeader>
          <SectionEyebrow style={{ color: 'rgba(184,134,11,0.7)' }}>
            Galleri
          </SectionEyebrow>
          <SectionTitle style={{ color: '#ffffff' }}>Från butiken</SectionTitle>
        </GalleryHeader>

        {hasGallery ? (
          <>
            <GalleryTrack ref={trackRef}>
              {store.images.map((img, i) => (
                <GalleryCard
                  key={i}
                  $index={i}
                  $visible={gallery.visible}
                  onClick={() => openLightbox(i)}
                >
                  <GalleryCardImg
                    src={`/images/secondhand/${img}`}
                    alt={`${store.name} bild ${i + 1}`}
                    onLoad={e => (e.currentTarget.className = 'loaded')}
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        'none';
                    }}
                  />
                  <GalleryCardOverlay>
                    <GalleryCardZoomIcon>⤢</GalleryCardZoomIcon>
                  </GalleryCardOverlay>
                </GalleryCard>
              ))}
            </GalleryTrack>
            <GalleryDots>
              {store.images.map((_, i) => (
                <GalleryDot
                  key={i}
                  $active={i === activeSlide}
                  onClick={() => {
                    const track = trackRef.current;
                    if (!track) return;
                    const cardWidth = track.scrollWidth / store.images.length;
                    track.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
                  }}
                />
              ))}
            </GalleryDots>
          </>
        ) : (
          <GalleryPlaceholder>
            <GalleryPlaceholderIcon>🖼</GalleryPlaceholderIcon>
            <GalleryPlaceholderText>Bilder kommer snart</GalleryPlaceholderText>
          </GalleryPlaceholder>
        )}
      </GallerySection>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox onClick={closeLightbox}>
          <LightboxClose onClick={closeLightbox}>✕</LightboxClose>
          <LightboxNav
            $dir='prev'
            onClick={e => {
              e.stopPropagation();
              prevLight();
            }}
          >
            ‹
          </LightboxNav>
          <LightboxImg
            src={`/images/secondhand/${store.images[lightboxIndex]}`}
            alt={`${store.name} bild ${lightboxIndex + 1}`}
            onClick={e => e.stopPropagation()}
          />
          <LightboxNav
            $dir='next'
            onClick={e => {
              e.stopPropagation();
              nextLight();
            }}
          >
            ›
          </LightboxNav>
          <LightboxCounter>
            {lightboxIndex + 1} / {store.images.length}
          </LightboxCounter>
        </Lightbox>
      )}

      {/* ── Hours & Contact ── */}
      <InfoStrip>
        <InfoInner>
          <InfoBlock>
            <InfoLabel>Öppettider</InfoLabel>
            <HoursGrid>
              {store.opening_hours.map(({ day, hours }) => {
                const closed = hours.toLowerCase() === 'stängt';
                return (
                  <HoursRow key={day} $closed={closed}>
                    <HoursDay>{day}</HoursDay>
                    <HoursTime>{hours}</HoursTime>
                  </HoursRow>
                );
              })}
            </HoursGrid>
          </InfoBlock>

          {store.donation_hours.length > 0 && (
            <InfoBlock>
              <InfoLabel>Gåvomottagning</InfoLabel>
              <HoursGrid>
                {store.donation_hours.map(({ day, hours }) => (
                  <HoursRow key={day}>
                    <HoursDay>{day}</HoursDay>
                    <HoursTime>{hours}</HoursTime>
                  </HoursRow>
                ))}
              </HoursGrid>
            </InfoBlock>
          )}

          <InfoBlock>
            <InfoLabel>Kontakt & Hitta hit</InfoLabel>
            <ContactList>
              <ContactItem as='div'>
                <ContactIcon>📍</ContactIcon>
                <ContactText>
                  <ContactTextLabel>Adress</ContactTextLabel>
                  <ContactTextValue>{store.address}</ContactTextValue>
                </ContactText>
              </ContactItem>
              {store.phone && (
                <ContactItem href={`tel:${store.phone.replace(/\s/g, '')}`}>
                  <ContactIcon>📞</ContactIcon>
                  <ContactText>
                    <ContactTextLabel>Telefon</ContactTextLabel>
                    <ContactTextValue>{store.phone}</ContactTextValue>
                  </ContactText>
                </ContactItem>
              )}
              {store.email && (
                <ContactItem href={`mailto:${store.email}`}>
                  <ContactIcon>✉️</ContactIcon>
                  <ContactText>
                    <ContactTextLabel>E-post</ContactTextLabel>
                    <ContactTextValue>{store.email}</ContactTextValue>
                  </ContactText>
                </ContactItem>
              )}
            </ContactList>
          </InfoBlock>
        </InfoInner>
      </InfoStrip>

      {/* ── Donate CTA ── */}
      <DonateSection
        ref={donate.ref as React.RefObject<HTMLElement>}
        $visible={donate.visible}
      >
        <DonateInner>
          <SectionEyebrow style={{ color: 'rgba(184,134,11,0.7)' }}>
            Donera
          </SectionEyebrow>
          <DonateTitle>Bidra med dina prylar</DonateTitle>
          <DonateBody>
            {store.donation_info ||
              'Vi tar emot välskötta kläder, böcker, husgeråd och prydnadsföremål under butikens öppettider.'}
          </DonateBody>
          <DonateButtons>
            <ButtonPrimary
              href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              Hitta till butiken
            </ButtonPrimary>
            {store.phone && (
              <ButtonOutline href={`tel:${store.phone.replace(/\s/g, '')}`}>
                Ring oss
              </ButtonOutline>
            )}
          </DonateButtons>
        </DonateInner>
      </DonateSection>
    </PageWrapper>
  );
};

export default SecondHandPage;
