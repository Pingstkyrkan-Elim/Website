import React, { useEffect, useRef, useState } from 'react';
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
} from './HistoriaPage.styles';
import { staticHistoryData } from './HistoriaUtils';

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
        <ImageGrid $count={Math.min(entry.images.length, 3)}>
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
