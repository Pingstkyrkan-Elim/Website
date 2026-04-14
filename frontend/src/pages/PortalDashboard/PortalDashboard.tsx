import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { IconCalendar, IconClipboardList } from '../../components/Icons';
import {
  CardCTA,
  CardDescription,
  CardIconWrap,
  CardTitle,
  CardsGrid,
  DashboardWrapper,
  InfoBox,
  PermissionCard,
  SectionTitle,
  WelcomeGreeting,
  WelcomeHeader,
  WelcomeSubtitle,
} from './PortalDashboard.styles';

interface PortalSection {
  key: string;
  permission: string;
  path: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const PORTAL_SECTIONS: PortalSection[] = [
  {
    key: 'kalender',
    permission: 'kalender',
    path: '/portal/kalender',
    label: 'Kalender',
    description:
      'Lägg till och redigera gudstjänster och evenemang. Hantera återkommande aktiviteter och specialevenemang.',
    icon: <IconCalendar size={20} color="#c9a96e" />,
    color: 'rgba(201, 169, 110, 0.12)',
  },
  {
    key: 'annonser',
    permission: 'kalender',
    path: '/portal/annonser',
    label: 'Annonser',
    description:
      'Skapa och hantera viktiga annonser som visas på startsidan. Ange datum, plats och beskrivning.',
    icon: <IconClipboardList size={20} color="#7a9e7e" />,
    color: 'rgba(122, 158, 126, 0.12)',
  },
];

const PortalDashboard: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  const availableSections = PORTAL_SECTIONS.filter(s =>
    hasPermission(s.permission)
  );

  const firstName = user?.first_name ?? 'där';

  return (
    <DashboardWrapper>
      <WelcomeHeader>
        <WelcomeGreeting>Välkommen, {firstName}!</WelcomeGreeting>
        <WelcomeSubtitle>
          Här redigerar och hanterar du innehållet på Pingstkyrkan Elims
          webbplats. Använd sidofältet eller korten nedan för att navigera till
          ditt ansvarsområde.
        </WelcomeSubtitle>
      </WelcomeHeader>

      {availableSections.length > 0 ? (
        <>
          <SectionTitle>Dina sektioner</SectionTitle>
          <CardsGrid>
            {availableSections.map(section => (
              <PermissionCard
                key={section.key}
                onClick={() => navigate(section.path)}
              >
                <CardIconWrap $color={section.color}>
                  {section.icon}
                </CardIconWrap>
                <CardTitle>{section.label}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
                <CardCTA>Öppna</CardCTA>
              </PermissionCard>
            ))}
          </CardsGrid>
        </>
      ) : (
        <InfoBox>
          <strong>Inga behörigheter tilldelade ännu.</strong> Kontakta en
          administratör för att få tillgång till redigeringsverktyg.
        </InfoBox>
      )}
    </DashboardWrapper>
  );
};

export default PortalDashboard;
