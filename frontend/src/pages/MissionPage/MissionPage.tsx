import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { getMissionCountries } from '../../services/api';
import { MissionCountry } from '../../types';
import { IconChevronLeft, IconChevronRight } from '../../components/Icons';
import {
  PageWrapper,
  Hero,
  HeroMapBg,
  HeroGlow,
  HeroContent,
  HeroEyebrow,
  HeroTitle,
  HeroSubtitle,
  HeroStats,
  HeroStat,
  HeroStatNumber,
  HeroStatLabel,
  HeroScrollHint,
  HeroScrollDot,
  GridSection,
  GridTitle,
  GridSubtitle,
  CardsGrid,
  Card,
  CardImageWrapper,
  CardImage,
  CardImageNav,
  CardImageDots,
  CardImageDot,
  CardBody,
  CardMeta,
  CardCountry,
  CardContinent,
  CardDescription,
  HistorySection,
  HistoryInner,
  HistoryTitle,
  HistorySubtitle,
  HistoryGrid,
  HistoryCard,
  HistoryCardImage,
  HistoryCardBody,
  HistoryCardTitle,
  HistoryCardText,
  LoadingWrapper,
} from './MissionPage.styles';

// ── Static fallback ───────────────────────────────────────────────────────────

const STATIC_COUNTRIES: MissionCountry[] = [
  { id: 1, name: 'Bangladesh', continent: 'Asien', description: 'I Bangladesh stöder vi det sociala projektet Agape Social Concern samt skolan Home of Peace (HOP). Projektet arbetar med utbildning och social omsorg i utsatta områden.', images: ['mission/Bangladesh1.webp', 'mission/Bangladesh6.webp'], coordinates_x: 74.4, coordinates_y: 41.0, order: 1 },
  { id: 2, name: 'Burundi', continent: 'Afrika', description: 'I Burundi stöder vi ett arbete med föräldralösa och utsatta barn i Tubabarane. Organisationen ger barn en trygg uppväxt med utbildning och omsorg.', images: ['mission/Burundi-2023-09.webp'], coordinates_x: 58.0, coordinates_y: 62.0, order: 2 },
  { id: 3, name: 'Kongo (DRC)', continent: 'Afrika', description: 'Via Barnsamariten som samarbetar med Let Africa Live stöder vi en sånads- och entreprenörsutbildning för utsatta kvinnor i Kongo.', images: ['mission/Barnsamariten2.webp', 'mission/Barnsamariten3.webp', 'mission/Barnsamariten4.webp', 'mission/Kongo_2024-04.webp'], coordinates_x: 53.0, coordinates_y: 60.0, order: 3 },
  { id: 4, name: 'Rwanda', continent: 'Afrika', description: 'I Rwanda stöder vi ett projekt för ungdomar i Gilgal. Projektet fokuserar på att ge unga människor hopp, utbildning och andlig vägledning.', images: ['mission/Rwanda.webp', 'mission/Rwanda1.webp', 'mission/Rwanda2.webp'], coordinates_x: 58.5, coordinates_y: 59.0, order: 4 },
  { id: 5, name: 'Sri Lanka', continent: 'Asien', description: 'Vi stöder fadderbarn med förskola och yrkesskola i Hirusara, Smyrna Church i Galle samt ungdomslägret Build 2023 Youth Camp.', images: ['mission/SriLanka1.webp', 'mission/Hirusara-2023-1.webp', 'mission/Hirusara-2023-4.webp', 'mission/SriLanka-2023-09.webp'], coordinates_x: 72.5, coordinates_y: 52.0, order: 5 },
  { id: 6, name: 'Tanzania', continent: 'Afrika', description: 'Via Tandalaföreningen stöder vi projekt i Nzega, Tanzania — senast installation av vattentankar för lokalsamhällen.', images: ['mission/Tandala-2023-10.webp'], coordinates_x: 59.5, coordinates_y: 63.5, order: 6 },
  { id: 7, name: 'Tchad', continent: 'Afrika', description: 'I Tchad stöder vi ett förskoleprojekt med 105 förskolor drivet av Folk & Språk. Tusentals barn i ökenregioner får tillgång till tidig utbildning.', images: ['mission/Tchad.webp', 'mission/Tchad2.webp'], coordinates_x: 54.0, coordinates_y: 48.0, order: 7 },
];

const HISTORY_ENTRIES = [
  { id: 1, title: 'Kongo — Pionjärerna', image: 'mission/Hilda_Ingrid_Karlsson.webp', text: 'Församlingens första missionär Rut Johansson sändes ut till Belgiska Kongo omkring 1920. Senare sände församlingen Lemuel och Hilda Karlsson, som arbetade med utbildning för barn.' },
  { id: 2, title: 'Sri Lanka & Thailand', image: 'mission/Nilsson_family.webp', text: 'Bertil och Reidun Nilsson sändes ut till Ceylon (Sri Lanka) och bildade 1961 en församling i Galle med 11 medlemmar. 1999 hade den växt till 700 medlemmar.' },
  { id: 3, title: 'Thailand — Familjen Bister', image: 'mission/Bister.webp', text: 'Arne och Irene Bister sändes ut och bildade en kristen grupp i Hatyai. De startade ett barndaghem och arbetade med litteratur och radioarbete.' },
];

// ── Card component with image slideshow ──────────────────────────────────────

const MissionCard: React.FC<{ country: MissionCountry; delay: number }> = ({ country, delay }) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setImgIndex(i => (i - 1 + country.images.length) % country.images.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setImgIndex(i => (i + 1) % country.images.length); };

  return (
    <Card ref={ref as React.RefObject<HTMLElement>} $visible={visible} style={{ transitionDelay: `${delay}ms` }}>
      <CardImageWrapper>
        <CardImage
          src={`/images/${country.images[imgIndex]}`}
          alt={country.name}
          onLoad={e => (e.currentTarget.className = 'loaded')}
          onError={e => { (e.currentTarget.parentElement as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.display = 'none'; }}
        />
        {country.images.length > 1 && (
          <>
            <CardImageNav $dir="prev" onClick={prev}><IconChevronLeft size={16} /></CardImageNav>
            <CardImageNav $dir="next" onClick={next}><IconChevronRight size={16} /></CardImageNav>
            <CardImageDots>
              {country.images.map((_, i) => <CardImageDot key={i} $active={i === imgIndex} />)}
            </CardImageDots>
          </>
        )}
      </CardImageWrapper>
      <CardBody>
        <CardMeta>
          <CardCountry>{country.name}</CardCountry>
          <CardContinent $continent={country.continent}>{country.continent}</CardContinent>
        </CardMeta>
        <CardDescription>{country.description}</CardDescription>
      </CardBody>
    </Card>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────────

const MissionPage: React.FC = () => {
  const { data: apiCountries, isLoading } = useQuery({
    queryKey: ['mission'],
    queryFn: getMissionCountries,
    retry: 1,
  });

  const countries = Array.isArray(apiCountries) && apiCountries.length > 0 ? apiCountries : STATIC_COUNTRIES;
  const continents = countries.map(c => c.continent).filter((v, i, a) => a.indexOf(v) === i);

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <Hero>
        <HeroMapBg />
        <HeroGlow />
        <HeroContent>
          <HeroEyebrow>Pingstkyrkan Elim</HeroEyebrow>
          <HeroTitle>Mission</HeroTitle>
          <HeroSubtitle>
            Vi stöder församlingsarbete, utbildning och humanitär hjälp i sju länder runt om i världen.
          </HeroSubtitle>
          <HeroStats>
            <HeroStat>
              <HeroStatNumber>{countries.length}</HeroStatNumber>
              <HeroStatLabel>Länder</HeroStatLabel>
            </HeroStat>
            <HeroStat>
              <HeroStatNumber>{continents.length}</HeroStatNumber>
              <HeroStatLabel>Kontinenter</HeroStatLabel>
            </HeroStat>
            <HeroStat>
              <HeroStatNumber>100+</HeroStatNumber>
              <HeroStatLabel>Års historia</HeroStatLabel>
            </HeroStat>
          </HeroStats>
        </HeroContent>
        <HeroScrollHint>
          <HeroScrollDot /><HeroScrollDot /><HeroScrollDot />
        </HeroScrollHint>
      </Hero>

      {/* ── Active missions grid ── */}
      <GridSection>
        <GridTitle>Våra Missionsfält</GridTitle>
        <GridSubtitle>Aktiva projekt och partnerskap runt om i världen</GridSubtitle>

        {isLoading && !apiCountries ? (
          <LoadingWrapper>Laddar missionsfält…</LoadingWrapper>
        ) : (
          <CardsGrid>
            {countries.map((country, i) => (
              <MissionCard key={country.id} country={country} delay={i * 80} />
            ))}
          </CardsGrid>
        )}
      </GridSection>

      {/* ── Mission history ── */}
      <HistorySection>
        <HistoryInner>
          <HistoryTitle>Missionshistoria</HistoryTitle>
          <HistorySubtitle>Pionjärer som lade grunden för vårt missionsarbete</HistorySubtitle>
          <HistoryGrid>
            {HISTORY_ENTRIES.map(entry => (
              <HistoryCard key={entry.id}>
                <HistoryCardImage
                  src={`/images/${entry.image}`}
                  alt={entry.title}
                  onLoad={e => (e.currentTarget.className = 'loaded')}
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
                <HistoryCardBody>
                  <HistoryCardTitle>{entry.title}</HistoryCardTitle>
                  <HistoryCardText>{entry.text}</HistoryCardText>
                </HistoryCardBody>
              </HistoryCard>
            ))}
          </HistoryGrid>
        </HistoryInner>
      </HistorySection>
    </PageWrapper>
  );
};

export default MissionPage;
