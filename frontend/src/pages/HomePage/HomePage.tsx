import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IconMapPin, IconClock } from '../../components/Icons';
import { getUpcomingServices, getLatestNews } from '../../services/api';
import {
  HomePageWrapper,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  CTAButton,
  ContentSection,
  FirstContentSection,
  Container,
  SectionTitle,
  CardsGrid,
  Card,
  CardTitle,
  CardContent,
  HomeWelcomeCard,
  HomeWelcomeCardTitle,
  HomeWelcomeCardContent,
  ServiceTime,
  DateTime,
  ServiceTitle,
  ServiceDescription,
  ActivitiesSection,
  ActivityCardsGrid,
  ActivityCard,
  ActivityCardImage,
  ActivityCardContent,
  ActivityCardMainContent,
  ActivityCardDate,
  ActivityCardTitle,
  ActivityCardDescription,
  ActivityCardMeta,
  ActivityCardLocation,
  ActivityCardTime,
  ActivityCardCTA,
  CardContentWrapper,
} from './HomePage.styles';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: upcomingServices } = useQuery({
    queryKey: ['upcomingServices'],
    queryFn: getUpcomingServices,
  });
  const { data: latestNews } = useQuery({
    queryKey: ['latestNews'],
    queryFn: () => getLatestNews(3),
  });

  return (
    <HomePageWrapper>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Välkommen till Pingstkyrkan Elim</HeroTitle>
          <HeroSubtitle>
            Vi vill som Guds församling vara en andlig oas och verka för att
            göra Jesus känd, trodd och efterföljd i Trelleborg med omnejd.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <FirstContentSection>
        <Container>
          <HomeWelcomeCard>
            <HomeWelcomeCardTitle>
              Varmt välkommen till vår frikyrka i Trelleborg!
            </HomeWelcomeCardTitle>
            <HomeWelcomeCardContent>
              Vi är en åldersblandad och multietnisk pingstkyrka med många barn
              och ungdomar och flera olika verksamheter för alla åldrar. Vi är
              en församlingsfamilj med passion för att se Guds rike utbredas och
              människor berörda av Gud. Vi brinner för att göra Jesus känd,
              trodd och efterföljd i Trelleborg med omnejd. Vi hoppas att du ska
              upptäcka livet med Jesus och även känna dig varmt välkommen i vår
              församlingsgemenskap!
            </HomeWelcomeCardContent>
          </HomeWelcomeCard>

          <HomeWelcomeCard>
            <HomeWelcomeCardTitle>Varför Elim</HomeWelcomeCardTitle>
            <HomeWelcomeCardContent>
              Elim nämns i Bibeln som en av lägerplatserna för israeliterna
              under uttåget från Egypten. Elim är belägen på Sinaihalvöns västra
              sida, troligen vid Wadi Gharandel, en oas 100 km sydöst om Suez.
              Enligt 4 Mos 33:9 fanns det vid Elim tolv källor och sjuttio
              palmer och där slog israeliterna läger efter att ha vandrat från
              Mara cirka 25 kilometer norr därom.
            </HomeWelcomeCardContent>
          </HomeWelcomeCard>
        </Container>
      </FirstContentSection>

      <ContentSection>
        <Container>
          <SectionTitle>Kommande Gudstjänster</SectionTitle>

          <>
            <HomeWelcomeCard>
              <HomeWelcomeCardTitle>
                Gudstjänster varje söndag
              </HomeWelcomeCardTitle>
              <HomeWelcomeCardContent>
                Söndagar kl. 11:00 - Våra gudstjänster präglas av sång, bön och
                undervisning från bibeln. Efter gudstjänsten är det gemenskap
                och mingel med fika. Många människor i alla åldrar söker sig
                till våra gudstjänster. Predikan tolkas ofta till engelska och
                predikotexten finns även översatt till flera olika språk. Barnen
                samlas till söndagskola under tiden gudstjänsten pågår. Efter
                gudstjänsten är det gemenskap och mingel med fika. Du och din
                familj är varmt välkommen att besöka oss. Det är fri parkering
                mellan kyrkan och Coop. Vi hoppas du ska känna dig hemma!
              </HomeWelcomeCardContent>
            </HomeWelcomeCard>
          </>

          <SectionTitle>Våra Program</SectionTitle>
          <CardsGrid>
            <Card>
              <CardContentWrapper>
                <CardTitle>Kraftkällan</CardTitle>
                <CardContent>
                  Tisdagar 19:00 - Vi tror på att Gud hör och besvarar bön. Vi
                  har många berättelser om betydelsen av gemensam
                  församlingsbön.
                </CardContent>
              </CardContentWrapper>
            </Card>

            <Card>
              <CardContentWrapper>
                <CardTitle>Cafe Oasen</CardTitle>
                <CardContent>
                  Onsdagar 14:00 - En möteplats för alla generationer!
                </CardContent>
              </CardContentWrapper>
            </Card>

            <Card>
              <CardContentWrapper>
                <CardTitle>Alpha Kurs</CardTitle>
                <CardContent>
                  En kurs på ca. 13 veckor där vi möts för att samtala kring de
                  stora frågorna i livet. Vi vill ge dig chansen att utforska
                  vad kristen tro kan få betyda för dig.
                </CardContent>
              </CardContentWrapper>
            </Card>

            <Card>
              <CardContentWrapper>
                <CardTitle>Pre-Teens</CardTitle>
                <CardContent>
                  Torsdagar 17:30-19:00 - Ungdomarna (10-13 år) samlas för lek,
                  gemenskap, pyssel och olika aktiviteter.
                </CardContent>
              </CardContentWrapper>
            </Card>

            <Card>
              <CardContentWrapper>
                <CardTitle>Ungdomsträffar</CardTitle>
                <CardContent>
                  Fredagar 19:00 - Ungdomarna (13-25 år) samlas för möte,
                  gemenskap och olika aktiviteter. Häng på!
                </CardContent>
              </CardContentWrapper>
            </Card>

            <Card>
              <CardContentWrapper>
                <CardTitle>Sport i Pilehallen</CardTitle>
                <CardContent>
                  Söndagar 14:30-16:30 - Vi sportar i nybyggda Pilehallen.
                  Oftast spelar vi fotboll men det finns möjlighet till alla
                  möjliga aktiviteter.
                </CardContent>
              </CardContentWrapper>
            </Card>
          </CardsGrid>
        </Container>
      </ContentSection>

      <ActivitiesSection>
        <Container>
          <SectionTitle>Viktiga Annonser</SectionTitle>
          <ActivityCardsGrid>
            <ActivityCard>
              <ActivityCardImage $backgroundImage='Pastor.jpg' />
              <ActivityCardContent>
                <ActivityCardMainContent>
                  <ActivityCardDate>Nutid</ActivityCardDate>
                  <ActivityCardTitle>
                    Vi söker Pastor / Föreståndare
                  </ActivityCardTitle>
                  <ActivityCardDescription>
                    Har du ett hjärta för att nå unga människor och familjer med
                    evangeliet? Brinner du för att leda en levande och
                    mångkulturell församling i tillväxt?
                  </ActivityCardDescription>
                  <ActivityCardMeta>
                    <ActivityCardLocation>
                      <IconMapPin size={13} />
                      Elim Pingstkyrka
                    </ActivityCardLocation>
                  </ActivityCardMeta>
                </ActivityCardMainContent>
                <ActivityCardCTA onClick={() => navigate('/events')}>
                  Läs mer
                </ActivityCardCTA>
              </ActivityCardContent>
            </ActivityCard>

            <ActivityCard>
              <ActivityCardImage $backgroundImage='HomePage.png' />
              <ActivityCardContent>
                <ActivityCardMainContent>
                  <ActivityCardDate>12-14 September 2025</ActivityCardDate>
                  <ActivityCardTitle>Möteshelg</ActivityCardTitle>
                  <ActivityCardDescription>
                    Fredag kl.19.00 kvällsmöte med Morgan Carlsson
                  </ActivityCardDescription>
                  <ActivityCardDescription>
                    Lördag kl.14.00 - 16.00 seminarium med Ignmar Aronson
                  </ActivityCardDescription>
                  <ActivityCardMeta>
                    <ActivityCardLocation>
                      <IconMapPin size={13} />
                      Elim Pingstkyrka
                    </ActivityCardLocation>
                    <ActivityCardTime>
                      <IconClock size={13} />
                      Lordag: 14:00
                    </ActivityCardTime>
                  </ActivityCardMeta>
                </ActivityCardMainContent>
                <ActivityCardCTA onClick={() => navigate('/events')}>
                  Läs mer
                </ActivityCardCTA>
              </ActivityCardContent>
            </ActivityCard>

            <ActivityCard>
              <ActivityCardImage $backgroundImage='Gudtjanst.jpeg' />
              <ActivityCardContent>
                <ActivityCardMainContent>
                  <ActivityCardDate>31 December 2025</ActivityCardDate>
                  <ActivityCardTitle>Nyårsbön & Reflektion</ActivityCardTitle>
                  <ActivityCardDescription>
                    Avsluta året tillsammans i bön och tacksamhet. Vi
                    reflekterar över det gångna året och ber för det nya som
                    komma skall.
                  </ActivityCardDescription>
                  <ActivityCardMeta>
                    <ActivityCardLocation>
                      <IconMapPin size={13} />
                      Elim Pingstkyrka
                    </ActivityCardLocation>
                    <ActivityCardTime>
                      <IconClock size={13} />
                      22:00
                    </ActivityCardTime>
                  </ActivityCardMeta>
                </ActivityCardMainContent>
                <ActivityCardCTA onClick={() => navigate('/events')}>
                  Läs mer
                </ActivityCardCTA>
              </ActivityCardContent>
            </ActivityCard>
          </ActivityCardsGrid>
        </Container>
      </ActivitiesSection>

      {latestNews && latestNews.length > 0 && (
        <ContentSection>
          <Container>
            <SectionTitle>Senaste Nytt</SectionTitle>
            <CardsGrid>
              {latestNews.map(news => (
                <Card key={news.id}>
                  <CardTitle>{news.title}</CardTitle>
                  <CardContent>{news.content.substring(0, 150)}...</CardContent>
                  <ServiceDescription>
                    {new Date(news.published_at).toLocaleDateString('sv-SE')} -{' '}
                    {news.author_name}
                  </ServiceDescription>
                </Card>
              ))}
            </CardsGrid>
          </Container>
        </ContentSection>
      )}
    </HomePageWrapper>
  );
};

export default HomePage;
