import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { getUngdomarNews, UngdomarNews } from '../../services/api';
import {
  UngdomarFonts,
  NewsSection,
  NewsInner,
  NewsGrid,
  NewsCard,
  NewsAccent,
  NewsBody,
  NewsTag,
  NewsTitle,
  NewsDesc,
  NewsImage,
  BubblesColumn,
  PhotoBubble,
  PhotoSlideshow,
  SlideshowImg,
  AboutInner,
  AboutSection,
  AboutText,
  AboutVisual,
  AboutVisualInner,
  ActivitiesGrid,
  ActivitiesSection,
  ActivityCard,
  ActivityDesc,
  ActivityIcon,
  ActivityTag,
  ActivityTitle,
  CountdownCaption,
  CountdownLabel,
  CountdownNumber,
  CountdownSep,
  CountdownUnit,
  CountdownWrap,
  CTAPrimary,
  CTASecondary,
  FloatOrb,
  HeroBg,
  HeroCTARow,
  HeroContent,
  HeroSection,
  HeroSub,
  HeroTag,
  HeroTitle,
  InfoBox,
  InfoBoxIcon,
  InfoBoxText,
  InfoBoxTitle,
  InfoGrid,
  InfoSection,
  InstagramSection,
  InstagramLink,
  InstagramIcon,
  InstagramText,
  JoinBody,
  JoinBtn,
  JoinCard,
  JoinDetail,
  JoinDetails,
  JoinSection,
  JoinTitle,
  PageWrapper,
  ScanLine,
  SectionBody,
  SectionEyebrow,
  SectionHeader,
  SectionTitle,
  StatBox,
  StatLabel,
  StatNum,
  StatsRow,
  TickerBar,
  TickerInner,
  TickerItem,
} from './UngdomarPage.styles';

// ── Countdown ─────────────────────────────────────────────────────────────────

function getNextFridayCountdown() {
  const now = new Date();
  const day = now.getDay();
  const daysUntilFriday = (5 - day + 7) % 7 || 7;
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntilFriday);
  next.setHours(19, 0, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 7);
  const diff = next.getTime() - now.getTime();
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}
function pad(n: number) { return String(n).padStart(2, '0'); }

// ── Intersection observer ─────────────────────────────────────────────────────

function useVisible(threshold = 0.1) {
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

// ── Icons ─────────────────────────────────────────────────────────────────────

const IconZap = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      fill={color} fillOpacity="0.15" />
  </svg>
);
const IconSparkles = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 3L13.5 8.5H19L14.5 11.5L16 17L12 14L8 17L9.5 11.5L5 8.5H10.5L12 3Z"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      fill={color} fillOpacity="0.15" />
    <circle cx="19" cy="4" r="1.2" fill={color} fillOpacity="0.6" />
    <circle cx="5" cy="19" r="1" fill={color} fillOpacity="0.5" />
  </svg>
);
const IconMountain = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 20L9 8L13 14L16 10L21 20H3Z"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      fill={color} fillOpacity="0.12" />
  </svg>
);
const IconBook = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 4h7a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H4V4Z"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      fill={color} fillOpacity="0.12" />
    <path d="M20 4h-7a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h8V4Z"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      fill={color} fillOpacity="0.07" />
  </svg>
);
const IconMapPin = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.69 2 6 4.69 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.31-2.69-6-6-6Z"
      stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.15" />
    <circle cx="12" cy="8" r="2" stroke={color} strokeWidth="1.6" />
  </svg>
);
const IconClock = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.1" />
    <path d="M12 7v5l3 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconMail = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="2"
      stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.1" />
    <path d="M2 7l10 7 10-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const IconCalendar = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2"
      stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.1" />
    <path d="M16 3v4M8 3v4M3 9h18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="8" cy="14" r="1" fill={color} />
    <circle cx="12" cy="14" r="1" fill={color} />
    <circle cx="16" cy="14" r="1" fill={color} />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const ACTIVITIES = [
  {
    icon: <IconZap color="#8b5cf6" />, title: 'Fredagsträff',
    desc: 'Varje fredag kl 19:00 samlas vi i kyrkan. Musik, gemenskap, samtal om livet — det är här det händer.',
    tag: 'Varje fredag', tagColor: '#8b5cf6',
    accent: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', bg: 'rgba(139,92,246,0.15)',
  },
  {
    icon: <IconSparkles color="#ec4899" />, title: 'Fester & Events',
    desc: 'Kalas, spelkvällar, filmkvällar och spontana äventyr. Vi vet hur man har kul — riktigt kul.',
    tag: 'Terminsvis', tagColor: '#ec4899',
    accent: 'linear-gradient(135deg, #ec4899, #be185d)', bg: 'rgba(236,72,153,0.15)',
  },
  {
    icon: <IconMountain color="#06b6d4" />, title: 'Läger',
    desc: 'Sommar- och vinterläger där vi bryter vardagen, går djupare med varandra och med Gud.',
    tag: 'Sommar & vinter', tagColor: '#06b6d4',
    accent: 'linear-gradient(135deg, #06b6d4, #0284c7)', bg: 'rgba(6,182,212,0.15)',
  },
  {
    icon: <IconBook color="#84cc16" />, title: 'Bibelstudier',
    desc: 'Inga tråkiga lektioner. Äkta frågor, äkta svar, äkta samtal om tro, tvivel och det som verkligen spelar roll.',
    tag: 'Regelbundet', tagColor: '#84cc16',
    accent: 'linear-gradient(135deg, #84cc16, #4d7c0f)', bg: 'rgba(132,204,22,0.12)',
  },
];

const TICKER_ITEMS = [
  'Fredagsträff', 'Läger', 'Gemenskap', 'Events', 'Bibelstudier',
  'Fester', 'Ungdomar Elim', '13+ år', 'Fredag 19:00',
];

const SLIDESHOW_IMAGES = [
  '/images/historia/Music_groups.webp',
  '/images/historia/Song_groups.webp',
  '/images/historia/ElimPastors2.webp',
  '/images/Gudtjanst.jpeg',
  '/images/Activity-1.png',
  '/images/Activity-2.png',
  '/images/preteens-1.avif',
  '/images/historia/PastorsSofiSamir.png',
];

// ── Component ─────────────────────────────────────────────────────────────────

const TAG_COLORS: Record<string, string> = {
  default: '#8b5cf6', nyhet: '#8b5cf6', event: '#ec4899', läger: '#06b6d4',
  bibel: '#84cc16', info: '#f9a825', viktigt: '#f43f5e',
};
function tagColor(tag: string) {
  return TAG_COLORS[tag.toLowerCase()] ?? TAG_COLORS.default;
}

const UngdomarPage: React.FC = () => {
  const [countdown, setCountdown] = useState(getNextFridayCountdown());
  const [slideIdx, setSlideIdx] = useState(0);
  const [slideFade, setSlideFade] = useState(true);
  const [newsVisible, setNewsVisible] = useState(false);

  const { data: newsList = [] } = useQuery<UngdomarNews[]>('ungdomar-news', getUngdomarNews);

  const act0 = useVisible(); const act1 = useVisible();
  const act2 = useVisible(); const act3 = useVisible();
  const actRefs = [act0, act1, act2, act3];

  // One ref per bubble across sections
  const bub = Array.from({ length: 8 }, () => useVisible(0.05)); // eslint-disable-line react-hooks/rules-of-hooks

  useEffect(() => {
    if (newsList.length > 0) setNewsVisible(true);
  }, [newsList]);

  useEffect(() => {
    const id = setInterval(() => setCountdown(getNextFridayCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSlideFade(false);
      setTimeout(() => { setSlideIdx(i => (i + 1) % SLIDESHOW_IMAGES.length); setSlideFade(true); }, 400);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <PageWrapper>
      <UngdomarFonts />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <HeroSection>
        <HeroBg />
        <ScanLine />
        <FloatOrb $color="rgba(139,92,246,0.5)" $size={400} $x={-5}  $y={10}  $delay={0} />
        <FloatOrb $color="rgba(236,72,153,0.4)" $size={300} $x={75}  $y={60}  $delay={2} />
        <FloatOrb $color="rgba(6,182,212,0.35)" $size={250} $x={60}  $y={-10} $delay={1} />
        <HeroContent>
          <HeroTag><span />Pingstkyrkan Elim · 13+ år</HeroTag>
          <HeroTitle data-text="UNGDOMAR">UNGDOMAR</HeroTitle>
          <HeroSub>
            Vi är ett gäng ungdomar som gillar att hänga, skratta, fråga stora frågor och leva livet fullt ut tillsammans.
          </HeroSub>
          <HeroCTARow>
            <CTAPrimary href="/contact">Häng med oss</CTAPrimary>
            <CTASecondary href="#activities">Se vad vi gör</CTASecondary>
          </HeroCTARow>
          <CountdownWrap>
            <CountdownUnit><CountdownNumber>{pad(countdown.d)}</CountdownNumber><CountdownLabel>Dagar</CountdownLabel></CountdownUnit>
            <CountdownSep>:</CountdownSep>
            <CountdownUnit><CountdownNumber>{pad(countdown.h)}</CountdownNumber><CountdownLabel>Timmar</CountdownLabel></CountdownUnit>
            <CountdownSep>:</CountdownSep>
            <CountdownUnit><CountdownNumber>{pad(countdown.m)}</CountdownNumber><CountdownLabel>Minuter</CountdownLabel></CountdownUnit>
            <CountdownSep>:</CountdownSep>
            <CountdownUnit><CountdownNumber>{pad(countdown.s)}</CountdownNumber><CountdownLabel>Sekunder</CountdownLabel></CountdownUnit>
          </CountdownWrap>
          <CountdownCaption>Tills nästa fredagsträff kl 19:00</CountdownCaption>
        </HeroContent>
      </HeroSection>

      {/* ── Ticker ────────────────────────────────────────────────────────── */}
      <TickerBar>
        <TickerInner>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => <TickerItem key={i}>{item}</TickerItem>)}
        </TickerInner>
      </TickerBar>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <AboutSection>
        {/* Burbuja izquierda — About */}
        <BubblesColumn $side="left">
          <PhotoBubble ref={bub[0].ref} $size={300} $top="15%" $nudge="8%" $glow="#8b5cf6" $border="#8b5cf6" $delay={0} $visible={bub[0].visible}>
            <img src="/images/historia/Music_groups.webp" alt="" />
          </PhotoBubble>
        </BubblesColumn>

        {/* Burbuja derecha — About */}
        <BubblesColumn $side="right">
          <PhotoBubble ref={bub[1].ref} $size={280} $top="30%" $nudge="20%" $glow="#ec4899" $border="#ec4899" $delay={0.4} $visible={bub[1].visible}>
            <img src="/images/ungdomar-1.jpeg" alt="" />
          </PhotoBubble>
        </BubblesColumn>

        <AboutInner>
          <AboutText>
            <SectionEyebrow>Vilka är vi</SectionEyebrow>
            <SectionTitle>Ett gäng som<br /><em>gör livet bättre</em></SectionTitle>
            <SectionBody>
              Ungdomar Elim är för dig som är 13 år eller äldre och vill vara en del av något äkta. Varje fredag klockan 19 öppnar vi dörrarna i Pingstkyrkan Elim i Trelleborg. Ingen kostym, inget krångel — bara du, vi och en kväll som faktiskt är värd att leva.
            </SectionBody>
            <StatsRow>
              <StatBox><StatNum>13+</StatNum><StatLabel>Ålder</StatLabel></StatBox>
              <StatBox><StatNum>Fre</StatNum><StatLabel>Varje vecka</StatLabel></StatBox>
              <StatBox><StatNum>19:00</StatNum><StatLabel>Vi börjar</StatLabel></StatBox>
              <StatBox><StatNum>100%</StatNum><StatLabel>Välkommen</StatLabel></StatBox>
            </StatsRow>
          </AboutText>

          <AboutVisual>
            <AboutVisualInner>
              <PhotoSlideshow>
                <SlideshowImg src="/images/ungdomar-1.jpeg" alt="" $visible={true} />
              </PhotoSlideshow>
            </AboutVisualInner>
          </AboutVisual>
        </AboutInner>
      </AboutSection>

      {/* ── Ungdomar News ─────────────────────────────────────────────────── */}
      {newsList.length > 0 && (
        <NewsSection>
          <NewsInner>
            <SectionEyebrow style={{ marginBottom: '1.2rem' }}>Aktuellt</SectionEyebrow>
            <NewsGrid>
              {newsList.map((item, idx) => {
                const color = tagColor(item.tag);
                return (
                  <NewsCard key={item.id} $visible={newsVisible} $idx={idx} $color={color}>
                    <NewsAccent $color={color} />
                    <NewsBody>
                      <NewsTag $color={color}>{item.tag}</NewsTag>
                      <NewsTitle>{item.title}</NewsTitle>
                      <NewsDesc>{item.description}</NewsDesc>
                    </NewsBody>
                    {item.image && <NewsImage src={item.image} alt={item.title} />}
                  </NewsCard>
                );
              })}
            </NewsGrid>
          </NewsInner>
        </NewsSection>
      )}

      {/* ── Activities ────────────────────────────────────────────────────── */}
      <ActivitiesSection id="activities">
        {/* Burbuja izquierda — Activities */}
        <BubblesColumn $side="left">
          <PhotoBubble ref={bub[2].ref} $size={290} $top="10%" $nudge="25%" $glow="#06b6d4" $border="#06b6d4" $delay={0.3} $visible={bub[2].visible}>
            <img src="/images/historia/Song_groups.webp" alt="" />
          </PhotoBubble>
        </BubblesColumn>

        {/* Burbuja derecha — Activities */}
        <BubblesColumn $side="right">
          <PhotoBubble ref={bub[3].ref} $size={310} $top="35%" $nudge="5%" $glow="#84cc16" $border="#84cc16" $delay={0.6} $visible={bub[3].visible}>
            <img src="/images/historia/ElimPastors2.webp" alt="" />
          </PhotoBubble>
        </BubblesColumn>

        <SectionHeader>
          <SectionEyebrow>Vad vi gör</SectionEyebrow>
          <SectionTitle>Det händer <em>alltid</em><br />något</SectionTitle>
        </SectionHeader>
        <ActivitiesGrid>
          {ACTIVITIES.map((act, i) => {
            const { ref, visible } = actRefs[i];
            return (
              <ActivityCard key={act.title} ref={ref} $accent={act.accent} $visible={visible}
                style={{ transitionDelay: `${i * 0.12}s` }}>
                <ActivityIcon $bg={act.bg}>{act.icon}</ActivityIcon>
                <ActivityTitle>{act.title}</ActivityTitle>
                <ActivityDesc>{act.desc}</ActivityDesc>
                <ActivityTag $color={act.tagColor}>{act.tag}</ActivityTag>
              </ActivityCard>
            );
          })}
        </ActivitiesGrid>
      </ActivitiesSection>

      {/* ── Instagram ─────────────────────────────────────────────────────── */}
      <InstagramSection>
        <InstagramLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramIcon>
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#igGrad)" strokeWidth="1.8"/>
              <circle cx="12" cy="12" r="5" stroke="url(#igGrad)" strokeWidth="1.8"/>
              <circle cx="17.5" cy="6.5" r="1.2" fill="url(#igGrad)"/>
              <defs>
                <linearGradient id="igGrad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#f9a825"/>
                  <stop offset="35%" stopColor="#ec4899"/>
                  <stop offset="70%" stopColor="#8b5cf6"/>
                  <stop offset="100%" stopColor="#06b6d4"/>
                </linearGradient>
              </defs>
            </svg>
          </InstagramIcon>
          <InstagramText>
            <span>Följ oss på</span>
            <strong>@ungdomar.elim</strong>
          </InstagramText>
        </InstagramLink>
      </InstagramSection>

      {/* ── Info boxes ────────────────────────────────────────────────────── */}
      <InfoSection style={{ position: 'relative', overflow: 'visible' }}>
        {/* Burbuja izquierda — Info */}
        <BubblesColumn $side="left">
          <PhotoBubble ref={bub[4].ref} $size={285} $top="5%" $nudge="15%" $glow="#ec4899" $border="#ec4899" $delay={0.2} $visible={bub[4].visible}>
            <img src="/images/preteens-1.avif" alt="" />
          </PhotoBubble>
        </BubblesColumn>

        {/* Burbuja derecha — Info */}
        <BubblesColumn $side="right">
          <PhotoBubble ref={bub[5].ref} $size={295} $top="10%" $nudge="30%" $glow="#8b5cf6" $border="#8b5cf6" $delay={0.7} $visible={bub[5].visible}>
            <img src="/images/historia/PastorsSofiSamir.png" alt="" />
          </PhotoBubble>
        </BubblesColumn>

        <InfoGrid>
          <InfoBox $accent="#8b5cf6">
            <InfoBoxIcon><IconMapPin color="#8b5cf6" /></InfoBoxIcon>
            <InfoBoxTitle>Var</InfoBoxTitle>
            <InfoBoxText>Pingstkyrkan Elim, Trelleborg. Vi ses i kyrkan varje fredag.</InfoBoxText>
          </InfoBox>
          <InfoBox $accent="#ec4899">
            <InfoBoxIcon><IconClock color="#ec4899" /></InfoBoxIcon>
            <InfoBoxTitle>När</InfoBoxTitle>
            <InfoBoxText>Fredagar kl 19:00. Dyk in, ta det lugnt, stanna så länge du vill.</InfoBoxText>
          </InfoBox>
          <InfoBox $accent="#06b6d4">
            <InfoBoxIcon><IconMail color="#06b6d4" /></InfoBoxIcon>
            <InfoBoxTitle>Kontakt</InfoBoxTitle>
            <InfoBoxText>Har du frågor? Hör av dig till kyrkan så hjälper vi dig vidare.</InfoBoxText>
          </InfoBox>
        </InfoGrid>
      </InfoSection>

      {/* ── Join CTA ──────────────────────────────────────────────────────── */}
      <JoinSection>
        {/* Burbuja izquierda — Join */}
        <BubblesColumn $side="left">
          <PhotoBubble ref={bub[6].ref} $size={300} $top="20%" $nudge="5%" $glow="#84cc16" $border="#84cc16" $delay={0.5} $visible={bub[6].visible}>
            <img src="/images/Activity-1.png" alt="" />
          </PhotoBubble>
        </BubblesColumn>

        {/* Burbuja derecha — Join */}
        <BubblesColumn $side="right">
          <PhotoBubble ref={bub[7].ref} $size={275} $top="25%" $nudge="18%" $glow="#06b6d4" $border="#06b6d4" $delay={0.9} $visible={bub[7].visible}>
            <img src="/images/Gudtjanst.jpeg" alt="" />
          </PhotoBubble>
        </BubblesColumn>

        <JoinCard>
          <JoinTitle>Är du redo att hänga?</JoinTitle>
          <JoinBody>
            Ta med en kompis, eller kom själv. Ingen behöver känna sig ensam här.
          </JoinBody>
          <JoinDetails>
            <JoinDetail><IconMapPin color="#a78bfa" /><span>Pingstkyrkan Elim, Trelleborg</span></JoinDetail>
            <JoinDetail><IconCalendar color="#f472b6" /><span>Varje fredag</span></JoinDetail>
            <JoinDetail><IconClock color="#22d3ee" /><span>Kl 19:00</span></JoinDetail>
          </JoinDetails>
          <JoinBtn href="/contact">Kontakta oss</JoinBtn>
        </JoinCard>
      </JoinSection>
    </PageWrapper>
  );
};

export default UngdomarPage;
