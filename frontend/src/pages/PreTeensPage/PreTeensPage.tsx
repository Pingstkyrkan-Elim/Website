import React, { useCallback, useEffect, useState } from 'react';
import {
  IconCalendar,
  IconClock,
  IconMapPin,
  IconUser,
} from '../../components/Icons';
import {
  PTWrapper,
  HeroSection,
  HeroImage,
  HeroDuotone,
  HeroOverlay,
  HeroContent,
  HeroEyebrow,
  HeroTitle,
  HeroTagline,
  HeroCTARow,
  HeroCTA,
  HeroCTASecondary,
  HeroLogoRow,
  BentoSection,
  BentoGrid,
  BentoPhotoCard,
  BentoAboutCard,
  BentoAboutLabel,
  BentoAboutTitle,
  BentoAboutText,
  BentoMeetingCard,
  BentoMeetingLabel,
  BentoMeetingDay,
  BentoMeetingTime,
  BentoMeetingPlace,
  BentoCountdownCard,
  CountdownLabel,
  CountdownEvent,
  CountdownNumbers,
  CountdownUnit,
  CountdownNum,
  CountdownUnitLabel,
  BentoVerseCard,
  VerseText,
  VerseRef,
  LightSection,
  LightHint,
  LightTitle,
  LightSubtitle,
  LightBulb,
  ClosingSection,
  ClosingLabel,
  ClosingTitle,
  ClosingSubtitle,
  ClosingMeta,
  ClosingMetaItem,
  ClosingDot,
  ClosingCTA,
  SectionSep,
} from './PreTeensPage.styles';

// ── Sleep Over countdown target — last week of June 2026 ──────────────────────
const SLEEP_OVER = new Date('2026-06-26T18:00:00');

function getRemaining(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  / 60_000),
    seconds: Math.floor((diff % 60_000)     / 1_000),
  };
}

function useCountdown(target: Date) {
  const [remaining, setRemaining] = useState(() => getRemaining(target));
  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(target)), 1_000);
    return () => clearInterval(id);
  }, [target]);
  return remaining;
}

// ── IntersectionObserver hook ─────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  const ref = useCallback<React.RefCallback<HTMLDivElement>>(
    (el) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
        { threshold }
      );
      obs.observe(el);
    },
    [threshold]
  );
  return { ref, visible };
}

// ── Page ──────────────────────────────────────────────────────────────────────

const PreTeensPage: React.FC = () => {
  const [lightMode, setLightMode] = useState(false);
  const countdown = useCountdown(SLEEP_OVER);

  const bento   = useInView(0.06);
  const light   = useInView(0.12);
  const closing = useInView(0.12);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <PTWrapper $light={lightMode}>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <HeroSection>
        <HeroImage />
        <HeroDuotone />
        <HeroOverlay />
        <HeroContent>
          <HeroLogoRow>
            <img src="/images/preteens-logo.png" alt="Pre-Teens logo" />
          </HeroLogoRow>
          <HeroEyebrow>Pingstkyrkan Elim · 10–13 år</HeroEyebrow>
          <HeroTitle>
            <span>HANS VERK</span>
            <span className="outline">ÄR VI</span>
          </HeroTitle>
          <HeroTagline>
            Jesus är vår identitet · Efesierbrevet 2:10
          </HeroTagline>
          <HeroCTARow>
            <HeroCTA href="#kom-med">Kom &amp; se</HeroCTA>
            <HeroCTASecondary href="#bento">Läs mer</HeroCTASecondary>
          </HeroCTARow>
        </HeroContent>
      </HeroSection>

      {/* ── VÄRLDENS LJUS — interactive section ──────────────── */}
      <LightSection
        $light={lightMode}
        onMouseEnter={() => setLightMode(true)}
        onMouseLeave={() => setLightMode(false)}
        ref={light.ref}
      >
        <LightBulb $light={lightMode}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            <circle cx="12" cy="12" r="4"/>
          </svg>
        </LightBulb>
        <LightHint $light={lightMode}>
          Matteus 5:14 — Håll muspekaren här
        </LightHint>
        <LightTitle $light={lightMode}>
          DU ÄR VÄRLDENS LJUS
        </LightTitle>
        <LightSubtitle $light={lightMode}>
          {lightMode
            ? 'En stad uppe på ett berg kan inte döljas. Lysa!'
            : 'Håll muspekaren för att tända ljuset.'}
        </LightSubtitle>
      </LightSection>

      <SectionSep />

      {/* ── Bento Grid ─────────────────────────────────────────── */}
      <BentoSection id="bento">
        <BentoGrid ref={bento.ref}>

          {/* Big photo */}
          <BentoPhotoCard $visible={bento.visible}>
            <img
              src="/images/preteens-2.avif"
              alt="Pre-Teens"
              onError={e => { (e.currentTarget as HTMLImageElement).src = '/images/preteens-hero.jpg'; }}
            />
          </BentoPhotoCard>

          {/* About */}
          <BentoAboutCard $visible={bento.visible}>
            <BentoAboutLabel>Vilka är vi?</BentoAboutLabel>
            <BentoAboutTitle>Pre-Teens</BentoAboutTitle>
            <BentoAboutText>
              Vi är ett gäng unga människor mellan 10 och 13 år som träffas
              varje vecka för att ha kul, bygga vänskap och utforska vad det
              betyder att vara skapad av Gud — med ett syfte.
            </BentoAboutText>
          </BentoAboutCard>

          {/* Meeting info */}
          <BentoMeetingCard $visible={bento.visible}>
            <BentoMeetingLabel>Nästa träff</BentoMeetingLabel>
            <BentoMeetingDay>TORSDAG</BentoMeetingDay>
            <BentoMeetingTime>Kl 17:30</BentoMeetingTime>
            <BentoMeetingPlace>Pingstkyrkan Elim, Trelleborg</BentoMeetingPlace>
          </BentoMeetingCard>

          {/* Countdown */}
          <BentoCountdownCard $visible={bento.visible}>
            <CountdownLabel>Räkna ner till</CountdownLabel>
            <CountdownEvent>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:8,verticalAlign:'middle',opacity:0.8}}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            Sleep Over
          </CountdownEvent>
            <CountdownNumbers>
              <CountdownUnit>
                <CountdownNum key={countdown.days}>{pad(countdown.days)}</CountdownNum>
                <CountdownUnitLabel>Dagar</CountdownUnitLabel>
              </CountdownUnit>
              <CountdownUnit>
                <CountdownNum key={`h${countdown.hours}`}>{pad(countdown.hours)}</CountdownNum>
                <CountdownUnitLabel>Tim</CountdownUnitLabel>
              </CountdownUnit>
              <CountdownUnit>
                <CountdownNum key={`m${countdown.minutes}`}>{pad(countdown.minutes)}</CountdownNum>
                <CountdownUnitLabel>Min</CountdownUnitLabel>
              </CountdownUnit>
              <CountdownUnit>
                <CountdownNum key={`s${countdown.seconds}`}>{pad(countdown.seconds)}</CountdownNum>
                <CountdownUnitLabel>Sek</CountdownUnitLabel>
              </CountdownUnit>
            </CountdownNumbers>
          </BentoCountdownCard>

          {/* Verse */}
          <BentoVerseCard $visible={bento.visible}>
            <VerseText>
              Hans verk är vi, skapade i Kristus Jesus till goda gärningar
              som Gud har förberett för att vi ska vandra i dem.
            </VerseText>
            <VerseRef>Efesierbrevet 2:10 · Svenska Folkbibeln</VerseRef>
          </BentoVerseCard>

        </BentoGrid>
      </BentoSection>

      <SectionSep />

      {/* ── Closing ────────────────────────────────────────────── */}
      <ClosingSection id="kom-med" ref={closing.ref}>
        <ClosingLabel>Välkommen</ClosingLabel>
        <ClosingTitle>
          GÖM DIG INTE.{'\n'}LYSA.
        </ClosingTitle>
        <ClosingSubtitle>
          Alla är välkomna. Inga krav. Bara gemenskap.
        </ClosingSubtitle>
        <ClosingMeta>
          <ClosingMetaItem>
            <IconCalendar size={15} /> <span>Varje torsdag</span>
          </ClosingMetaItem>
          <ClosingDot />
          <ClosingMetaItem>
            <IconClock size={15} /> <span>Kl 17:30</span>
          </ClosingMetaItem>
          <ClosingDot />
          <ClosingMetaItem>
            <IconMapPin size={15} /> <span>Pingstkyrkan Elim</span>
          </ClosingMetaItem>
          <ClosingDot />
          <ClosingMetaItem>
            <IconUser size={15} /> <span>10–13 år</span>
          </ClosingMetaItem>
        </ClosingMeta>
        <ClosingCTA href="mailto:info@pingstkyrkan.se?subject=Pre-Teens">
          Kontakta oss
        </ClosingCTA>
      </ClosingSection>

    </PTWrapper>
  );
};

export default PreTeensPage;
