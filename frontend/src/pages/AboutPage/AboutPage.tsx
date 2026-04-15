import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { getTeamMembers } from '../../services/api';
import { TeamMember } from '../../types';
import {
  OmOssWrapper,
  HeroSection,
  HeroInner,
  HeroEyebrow,
  HeroTitle,
  HeroSubtitle,
  SectionLabel,
  PastorSection,
  PastorInner,
  PastorImagePanel,
  PastorTextPanel,
  PastorTextInner,
  MemberName,
  MemberRoleTitle,
  MemberDivider,
  MemberBio,
  StyrelseSection,
  StyrelseHeaderWrap,
  StyrelseImageWrap,
  StyrelseBioWrap,
  StyrelseBio,
  SectionSep,
  LoadingWrap,
} from './AboutPage.styles';

// ── Resolve photo URL (handles absolute, root-relative, and relative paths) ───
const photoUrl = (photo: string | undefined): string => {
  if (!photo) return '';
  if (photo.startsWith('http') || photo.startsWith('/')) return photo;
  return `/media/${photo}`;
};

// ── IntersectionObserver hook (callback-ref pattern) ─────────────────────────

function useInView(threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  const ref = useCallback<React.RefCallback<HTMLDivElement>>(
    (el) => {
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

// ── Fallback data ─────────────────────────────────────────────────────────────

const FALLBACK: TeamMember[] = [
  {
    id: 1,
    name: 'Samir & Sofia Clementsson',
    role: 'pastor',
    role_display: 'Pastor',
    section: 'pastorer',
    section_display: 'Pastorer',
    role_title: 'Pastor & föreståndare',
    bio: 'Thomas och Ingrid Eriksson leder tillsammans Pingstkyrkan Elim i Trelleborg. Med ett hjärta för Guds folk och en vision för ett levande och öppet samfund, har de under många år byggt upp en gemenskap präglad av kärlek, tillhörighet och tro.',
    photo: '/images/team-pastors.jpg',
    display_order: 1,
  },
  {
    id: 2,
    name: 'Tilda Persson',
    role: 'youth_leader',
    role_display: 'Youth Leader',
    section: 'ungdom',
    section_display: 'Ungdomspastor',
    role_title: 'Ungdomspastor',
    bio: 'Tilda Persson leder ungdomsarbetet i Elim med ett brinnande engagemang för unga vuxna och deras väg in i tro och liv. Hon tror på en generation som söker mening, äkthet och gemenskap.',
    photo: '/images/team-tilda.jpg',
    display_order: 2,
  },
  {
    id: 3,
    name: 'Styrelsen',
    role: 'elder',
    role_display: 'Elder',
    section: 'styrelse',
    section_display: 'Styrelse',
    role_title: 'Församlingens styrelse',
    bio: 'Församlingens styrelse bär ansvaret för den gemensamma visionen och det administrativa arbetet i Pingstkyrkan Elim. Tillsammans med pastorerna sätter de riktningen för verksamheten.',
    photo: '/images/team-board.jpg',
    display_order: 3,
  },
];

// ── PastorBlock ───────────────────────────────────────────────────────────────

const PastorBlock: React.FC<{ member: TeamMember }> = ({ member }) => {
  const img = useInView(0.1);
  const text = useInView(0.1);

  return (
    <PastorSection>
      <PastorInner>
        <PastorImagePanel ref={img.ref} $visible={img.visible}>
          {member.photo && <img src={photoUrl(member.photo)} alt={member.name} />}
        </PastorImagePanel>

        <PastorTextPanel ref={text.ref} $visible={text.visible}>
          <PastorTextInner>
            <SectionLabel $visible={text.visible}>Pastorer</SectionLabel>
            <MemberName>{member.name}</MemberName>
            {member.role_title && <MemberRoleTitle>{member.role_title}</MemberRoleTitle>}
            <MemberDivider />
            {member.bio && <MemberBio>{member.bio}</MemberBio>}
          </PastorTextInner>
        </PastorTextPanel>
      </PastorInner>
    </PastorSection>
  );
};

// ── UngdomBlock — same cinematic split-panel as pastors, reversed ─────────────

const UngdomBlock: React.FC<{ member: TeamMember }> = ({ member }) => {
  const img  = useInView(0.1);
  const text = useInView(0.1);

  return (
    <PastorSection>
      <PastorInner $reversed>
        <PastorTextPanel ref={text.ref} $visible={text.visible}>
          <PastorTextInner>
            <SectionLabel $visible={text.visible}>Ungdomspastor</SectionLabel>
            <MemberName>{member.name}</MemberName>
            {member.role_title && <MemberRoleTitle>{member.role_title}</MemberRoleTitle>}
            <MemberDivider />
            {member.bio && <MemberBio>{member.bio}</MemberBio>}
          </PastorTextInner>
        </PastorTextPanel>

        <PastorImagePanel ref={img.ref} $visible={img.visible} $reversed>
          {member.photo && <img src={photoUrl(member.photo)} alt={member.name} />}
        </PastorImagePanel>
      </PastorInner>
    </PastorSection>
  );
};

// ── StyrelseBlock ─────────────────────────────────────────────────────────────

const StyrelseBlock: React.FC<{ member: TeamMember }> = ({ member }) => {
  const header = useInView(0.1);
  const image  = useInView(0.08);
  const bio    = useInView(0.1);

  return (
    <StyrelseSection>
      <StyrelseHeaderWrap ref={header.ref} $visible={header.visible}>
        <SectionLabel $visible={header.visible}>Styrelse</SectionLabel>
        <MemberName>{member.name}</MemberName>
        {member.role_title && <MemberRoleTitle>{member.role_title}</MemberRoleTitle>}
      </StyrelseHeaderWrap>

      {member.photo && (
        <StyrelseImageWrap ref={image.ref} $visible={image.visible}>
          <img src={photoUrl(member.photo)} alt={member.name} />
        </StyrelseImageWrap>
      )}

      <StyrelseBioWrap ref={bio.ref} $visible={bio.visible}>
        {member.bio && <StyrelseBio>{member.bio}</StyrelseBio>}
      </StyrelseBioWrap>
    </StyrelseSection>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────────

const AboutPage: React.FC = () => {
  const { data, isLoading } = useQuery<TeamMember[]>('team-members', getTeamMembers);

  const members =
    Array.isArray(data) && data.length > 0 ? data : FALLBACK;

  const pastors  = members.filter(m => m.section === 'pastorer');
  const ungdom   = members.filter(m => m.section === 'ungdom');
  const styrelse = members.filter(m => m.section === 'styrelse');

  if (isLoading && !data) {
    return <LoadingWrap>Laddar…</LoadingWrap>;
  }

  return (
    <OmOssWrapper>

      {/* ── Hero — photo banner ──────────────────────────────────── */}
      <HeroSection>
        <HeroInner>
          <HeroEyebrow>Pingstkyrkan Elim · Trelleborg</HeroEyebrow>
          <HeroTitle>
            Om<span className="outline">Oss</span>
          </HeroTitle>
          <HeroSubtitle>
            Vi är en gemenskap av människor som tror på Gud, lever i gemenskap
            med varandra och vill vara en välsignelse för Trelleborg och världen.
          </HeroSubtitle>
        </HeroInner>
      </HeroSection>

      {/* ── Pastorer ─────────────────────────────────────────────── */}
      {pastors.map(m => (
        <React.Fragment key={m.id}>
          <SectionSep />
          <PastorBlock member={m} />
        </React.Fragment>
      ))}

      {/* ── Ungdomspastor ────────────────────────────────────────── */}
      {ungdom.map(m => (
        <React.Fragment key={m.id}>
          <SectionSep />
          <UngdomBlock member={m} />
        </React.Fragment>
      ))}

      {/* ── Styrelse ─────────────────────────────────────────────── */}
      {styrelse.map(m => (
        <React.Fragment key={m.id}>
          <SectionSep />
          <StyrelseBlock member={m} />
        </React.Fragment>
      ))}

    </OmOssWrapper>
  );
};

export default AboutPage;
