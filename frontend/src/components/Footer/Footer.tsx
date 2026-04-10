import React from 'react';
import { useQuery } from 'react-query';
import { getChurchInfo } from '../../services/api';
import {
  FooterWrapper,
  Container,
  FooterContent,
  FooterSection,
  SectionTitle,
  Description,
  ContactInfo,
  ContactItem,
  ServiceTimes,
  ServiceTime,
  SocialLinks,
  SocialLink,
  BottomBar,
  Copyright,
  LocationNote,
} from './Footer.styles';

const Footer: React.FC = () => {
  const { data: churchInfo } = useQuery({
    queryKey: ['churchInfo'],
    queryFn: getChurchInfo,
  });

  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <FooterSection>
            <SectionTitle>Pingstkyrkan Elim</SectionTitle>
            <Description>
              En åldersblandad och multietnisk pingstkyrka med passion för att
              se Guds rike utbredas och människor berörda av Gud. Vi brinner för
              att göra Jesus känd, trodd och efterföljd i Trelleborg med omnejd.
            </Description>

            <SocialLinks>
              <SocialLink href='#' aria-label='Facebook'>
                <svg className='icon' viewBox='0 0 24 24'>
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                </svg>
              </SocialLink>
              <SocialLink href='#' aria-label='Instagram'>
                <svg className='icon' viewBox='0 0 24 24'>
                  <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.461-3.367-1.226l2.884-2.884c.613.613 1.461 1.043 2.483 1.043 1.934 0 3.503-1.569 3.503-3.503s-1.569-3.503-3.503-3.503S8.946 8.484 8.946 10.418c0 1.022.43 1.87 1.043 2.483l-2.884 2.884c-.765-.919-1.226-2.07-1.226-3.367 0-2.892 2.345-5.237 5.237-5.237s5.237 2.345 5.237 5.237-2.345 5.237-5.237 5.237z' />
                </svg>
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <SectionTitle>Kontaktuppgifter</SectionTitle>
            {churchInfo && (
              <ContactInfo>
                <ContactItem>
                  <svg className='icon' viewBox='0 0 24 24'>
                    <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
                  </svg>
                  <div>
                    {churchInfo.address.street}
                    <br />
                    {churchInfo.address.postal_code} {churchInfo.address.city}
                  </div>
                </ContactItem>

                <ContactItem>
                  <svg className='icon' viewBox='0 0 24 24'>
                    <path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
                  </svg>
                  <span>{churchInfo.contact.phone}</span>
                </ContactItem>

                <ContactItem>
                  <svg className='icon' viewBox='0 0 24 24'>
                    <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
                  </svg>
                  <span>{churchInfo.contact.email}</span>
                </ContactItem>
              </ContactInfo>
            )}
          </FooterSection>

          <FooterSection>
            <SectionTitle>Gudstjänster</SectionTitle>
            <ServiceTimes>
              <ServiceTime>
                <span className='day'>Söndagar</span>
                <span className='time'>11:00</span>
              </ServiceTime>
              <ServiceTime>
                <span className='day'>Söndagsskola</span>
                <span className='time'>Under gudstjänsten</span>
              </ServiceTime>
            </ServiceTimes>
          </FooterSection>
        </FooterContent>

        <BottomBar>
          <Copyright>
            © {new Date().getFullYear()} Pingstkyrkan Elim. En del av{' '}
            <a
              href='https://pingst.se'
              target='_blank'
              rel='noopener noreferrer'
            >
              Pingst Sverige
            </a>
            .
          </Copyright>
          <LocationNote>Fri parkering mellan kyrkan och Coop</LocationNote>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
