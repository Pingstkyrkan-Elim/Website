import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { IconMapPin } from '../../components/Icons';
import { getAlphaProgram, resolveMediaUrl } from '../../services/api';
import { AlphaProgram, AlphaStep } from '../../types';
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
  IntroCard,
  IntroText,
  IntroQuote,
  IntroBody,
  IntroImageWrap,
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
  NextAlphaCard,
  NextAlphaTag,
  NextAlphaTitle,
  NextAlphaDesc,
  InfoRow,
  InfoItem,
  RegisterBtn,
  ClosingSection,
  ClosingQuote,
  ClosingSource,
  Divider,
  GalleryGrid,
  GalleryItem,
} from './AlphaPage.styles';

// ── Default fallback data ──────────────────────────────────────────────────────

const DEFAULT_STEPS: AlphaStep[] = [
  { emoji: '🍽️', title: 'Mat', desc: 'Varje träff börjar med en gemensam måltid. Det skapar en avslappnad stämning och ger tid att lära känna varandra.' },
  { emoji: '🎬', title: 'Film', desc: 'Vi tittar tillsammans på en kort film som introducerar kvällens tema på ett engagerande och tankeväckande sätt.' },
  { emoji: '💬', title: 'Samtal', desc: 'I små grupper pratar vi om det vi just sett. Inga rätta svar, inga krav — bara ett öppet samtal.' },
];

const DEFAULT_TOPICS = [
  'Finns det mer i livet?', 'Vem är Jesus?', 'Varför dog Jesus?',
  'Hur kan jag ha tillit?', 'Varför och hur ber man?', 'Hur läser man Bibeln?',
  'Hur leder Gud oss?', 'Alphahelgen — Vem är den Helige Ande?', 'Vad gör den Helige Ande?',
  'Hur kan jag stå emot det onda?', 'Varför och hur ska jag berätta för andra?',
  'Innebär Gud helande idag?', 'Vad säger Bibeln om kyrkan?',
];

// ── Scroll-reveal hook ────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Component ─────────────────────────────────────────────────────────────────

const AlphaPage: React.FC = () => {
  const { data } = useQuery<AlphaProgram>('alpha-program', getAlphaProgram, {
    staleTime: 5 * 60 * 1000,
  });

  const intro  = useInView();
  const video  = useInView();
  const steps  = useInView();
  const topics = useInView();
  const next   = useInView();
  const gallery = useInView();

  const d = data;
  const heroEyebrow   = d?.hero_eyebrow   ?? 'Pingstkyrkan Elim · Trelleborg';
  const heroTitle     = d?.hero_title     ?? 'Alpha';
  const heroSubtitle  = d?.hero_subtitle  ?? 'Utforska livet, tron och meningen — i en öppen och välkomnande atmosfär där alla frågor är välkomna.';
  const introQuote    = d?.intro_quote    ?? 'En plats där du kan utforska livet, tron och meningen.';
  const introBody     = d?.intro_body     ?? '';
  const introImage    = resolveMediaUrl(d?.intro_image);
  const videoUrl      = d?.video_url      ?? 'https://www.youtube.com/embed/HTCwMn6LKCI?rel=0&modestbranding=1';
  const videoTitle    = d?.video_title    ?? 'Vad är Alpha?';
  const stepsData     = (d?.steps && d.steps.length > 0) ? d.steps : DEFAULT_STEPS;
  const topicsData    = (d?.topics && d.topics.length > 0) ? d.topics : DEFAULT_TOPICS;
  const nextTag       = d?.next_alpha_tag   ?? 'Nästa Alpha';
  const nextTitle     = d?.next_alpha_title ?? 'Välkommen med under vårterminen!';
  const nextDesc      = d?.next_alpha_desc  ?? '';
  const nextLocation  = d?.next_alpha_location ?? 'Engelbrektsgatan 68, Trelleborg';
  const nextEmail     = d?.next_alpha_email ?? 'pingstkyrkan.trelleborg@gmail.com';
  const closingQuote  = d?.closing_quote  ?? '"Alpha är en plats där du kan vara precis den du är — med alla dina frågor, tvivel och tankar."';
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
            <CTAPrimary href="#anmalan">Anmäl dig</CTAPrimary>
            <CTASecondary href="#vad-ar-alpha">Läs mer</CTASecondary>
          </HeroCTARow>
        </HeroInner>
        <ScrollIndicator>
          <ScrollLine />
          Scrolla
        </ScrollIndicator>
      </HeroSection>

      {/* ── What is Alpha ──────────────────────────────────────── */}
      <Section id="vad-ar-alpha">
        <Container>
          <div
            ref={intro.ref}
            style={{
              opacity: intro.visible ? 1 : 0,
              transform: intro.visible ? 'none' : 'translateY(40px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <IntroCard>
              <IntroText>
                <IntroQuote>{introQuote}</IntroQuote>
                <IntroBody>{introBody}</IntroBody>
              </IntroText>
              <IntroImageWrap>
                <img
                  src={introImage || '/images/Activity-1.png'}
                  alt="Alpha gemenskap"
                  onError={e => {
                    (e.target as HTMLImageElement).src = '/images/Gudtjanst.jpeg';
                  }}
                />
              </IntroImageWrap>
            </IntroCard>
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
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
              <GalleryGrid>
                {galleryPhotos.map((photo) => (
                  <GalleryItem key={photo.id}>
                    <img
                      src={resolveMediaUrl(photo.image) ?? photo.image}
                      alt={photo.caption || 'Alpha'}
                    />
                  </GalleryItem>
                ))}
              </GalleryGrid>
            </div>
          </Container>
        </Section>
      )}

      {/* ── Next Alpha ─────────────────────────────────────────── */}
      <Section id="anmalan">
        <Container>
          <div
            ref={next.ref}
            style={{
              opacity: next.visible ? 1 : 0,
              transform: next.visible ? 'none' : 'translateY(40px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <NextAlphaCard>
              <NextAlphaTag>{nextTag}</NextAlphaTag>
              <NextAlphaTitle>{nextTitle}</NextAlphaTitle>
              <NextAlphaDesc>{nextDesc}</NextAlphaDesc>
              <InfoRow>
                <InfoItem>
                  <IconMapPin size={15} />
                  <span>Pingstkyrkan Elim</span>, {nextLocation}
                </InfoItem>
              </InfoRow>
              <RegisterBtn href={`mailto:${nextEmail}?subject=Anmälan Alpha`}>
                Anmäl dig
              </RegisterBtn>
            </NextAlphaCard>
          </div>
        </Container>
      </Section>

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
