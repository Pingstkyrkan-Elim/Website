import React, { useEffect, useRef, useState } from 'react';
import { submitContactForm } from '../../services/api';
import {
  IconBankgiro,
  IconCheck,
  IconCreditCard,
  IconHeart,
  IconMail,
  IconMapPin,
  IconParking,
  IconPhone,
  IconSwish,
  IconX,
} from '../../components/Icons';
import {
  PageWrapper,
  Hero,
  HeroEyebrow,
  HeroTitle,
  HeroSubtitle,
  InfoSection,
  InfoInner,
  InfoCard,
  InfoCardIcon,
  InfoCardLabel,
  InfoCardValue,
  InfoCardNote,
  InfoCardLink,
  MainSection,
  MainInner,
  FormBlock,
  SectionEyebrow,
  SectionTitle,
  Form,
  FormRow,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSubmit,
  FormSuccess,
  FormError,
  MapBlock,
  MapEmbed,
  MapCTA,
  DonationSection,
  DonationInner,
  DonationHeader,
  DonationEyebrow,
  DonationTitle,
  DonationCard,
  DonationCardIcon,
  DonationCardLabel,
  DonationCardValue,
  DonationCardNote,
} from './ContactPage.styles';

// ── Scroll-reveal hook ────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
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

const ContactPage: React.FC = () => {
  const info = useInView();
  const main = useInView();
  const donation = useInView();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitContactForm(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const address = encodeURIComponent(
    'Engelbrektsgatan 68, 231 34 Trelleborg, Sverige'
  );
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
  const embedUrl = `https://maps.google.com/maps?q=${address}&output=embed&z=15`;

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <Hero>
        <HeroEyebrow>Pingstkyrkan Elim</HeroEyebrow>
        <HeroTitle>Kontakt</HeroTitle>
        <HeroSubtitle>Vi finns här för dig — hör gärna av dig.</HeroSubtitle>
      </Hero>

      {/* ── Info cards ── */}
      <InfoSection
        ref={info.ref as React.RefObject<HTMLElement>}
        $visible={info.visible}
      >
        <InfoInner>
          <InfoCard>
            <InfoCardIcon>
              <IconMapPin size={18} />
            </InfoCardIcon>
            <InfoCardLabel>Adress</InfoCardLabel>
            <InfoCardValue>
              Pingstkyrkan Elim
              <br />
              Engelbrektsgatan 68
              <br />
              231 34 Trelleborg
            </InfoCardValue>
          </InfoCard>

          <InfoCard>
            <InfoCardIcon>
              <IconPhone size={18} />
            </InfoCardIcon>
            <InfoCardLabel>Telefon</InfoCardLabel>
            <InfoCardLink href='tel:+46761686434'>0761-68 64 34</InfoCardLink>
          </InfoCard>

          <InfoCard>
            <InfoCardIcon>
              <IconMail size={18} />
            </InfoCardIcon>
            <InfoCardLabel>E-post</InfoCardLabel>
            <InfoCardLink href='mailto:pingstkyrkan.trelleborg@gmail.com'>
              pingstkyrkan.trelleborg@gmail.com
            </InfoCardLink>
          </InfoCard>

          <InfoCard>
            <InfoCardIcon>
              <IconParking size={18} />
            </InfoCardIcon>
            <InfoCardLabel>Parkering</InfoCardLabel>
            <InfoCardValue>Fri parkering</InfoCardValue>
            <InfoCardNote>Mellan kyrkan och Coop</InfoCardNote>
          </InfoCard>
        </InfoInner>
      </InfoSection>

      {/* ── Form + Map ── */}
      <MainSection
        ref={main.ref as React.RefObject<HTMLElement>}
        $visible={main.visible}
      >
        <MainInner>
          {/* Contact form */}
          <FormBlock>
            <SectionEyebrow>Skriv till oss</SectionEyebrow>
            <SectionTitle>Skicka ett meddelande</SectionTitle>

            {status === 'success' ? (
              <FormSuccess>
                <IconCheck size={16} /> Tack! Ditt meddelande har skickats. Vi
                återkommer så snart vi kan.
              </FormSuccess>
            ) : (
              <Form onSubmit={handleSubmit}>
                <FormRow>
                  <FormGroup>
                    <FormLabel>Namn</FormLabel>
                    <FormInput
                      name='name'
                      value={form.name}
                      onChange={handleChange}
                      placeholder='Ditt namn'
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>E-post</FormLabel>
                    <FormInput
                      name='email'
                      type='email'
                      value={form.email}
                      onChange={handleChange}
                      placeholder='din@email.se'
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <FormLabel>Ämne</FormLabel>
                  <FormInput
                    name='subject'
                    value={form.subject}
                    onChange={handleChange}
                    placeholder='Vad handlar ditt meddelande om?'
                    required
                  />
                </FormGroup>

                <FormGroup style={{ flexGrow: 1 }}>
                  <FormLabel>Meddelande</FormLabel>
                  <FormTextarea
                    name='message'
                    value={form.message}
                    onChange={handleChange}
                    placeholder='Skriv ditt meddelande här...'
                    required
                  />
                </FormGroup>

                {status === 'error' && (
                  <FormError>
                    <IconX size={16} /> Något gick fel. Försök igen eller
                    kontakta oss via telefon.
                  </FormError>
                )}

                <FormSubmit
                  type='submit'
                  $loading={status === 'loading'}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Skickar…' : 'Skicka meddelande'}
                </FormSubmit>
              </Form>
            )}
          </FormBlock>

          {/* Map */}
          <MapBlock>
            <SectionEyebrow>Hitta hit</SectionEyebrow>
            <SectionTitle>Engelbrektsgatan 68</SectionTitle>
            <MapEmbed>
              <iframe
                title='Pingstkyrkan Elim karta'
                src={embedUrl}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            </MapEmbed>
            <MapCTA href={mapsUrl} target='_blank' rel='noopener noreferrer'>
              Öppna i Google Maps →
            </MapCTA>
          </MapBlock>
        </MainInner>
      </MainSection>

      {/* ── Donation info ── */}
      <DonationSection
        ref={donation.ref as React.RefObject<HTMLElement>}
        $visible={donation.visible}
      >
        <DonationInner>
          <DonationHeader>
            <DonationEyebrow>Stöd vårt arbete</DonationEyebrow>
            <DonationTitle>Ge en gåva</DonationTitle>
          </DonationHeader>

          <DonationCard>
            <DonationCardIcon>
              <IconSwish size={18} />
            </DonationCardIcon>
            <DonationCardLabel>Swish</DonationCardLabel>
            <DonationCardValue>123 494 42 11</DonationCardValue>
            <DonationCardNote>Märk med "gåva"</DonationCardNote>
          </DonationCard>

          <DonationCard>
            <DonationCardIcon>
              <IconBankgiro size={18} />
            </DonationCardIcon>
            <DonationCardLabel>Bankgiro</DonationCardLabel>
            <DonationCardValue>591-7703</DonationCardValue>
            <DonationCardNote>Märk med "gåva"</DonationCardNote>
          </DonationCard>

          <DonationCard>
            <DonationCardIcon>
              <IconHeart size={18} />
            </DonationCardIcon>
            <DonationCardLabel>Din gåva går till</DonationCardLabel>
            <DonationCardValue
              style={{
                fontSize: '1rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
              }}
            >
              Församlingens arbete lokalt och globalt
            </DonationCardValue>
            <DonationCardNote>
              Mission, barn &amp; ungdom, socialt arbete
            </DonationCardNote>
          </DonationCard>
        </DonationInner>
      </DonationSection>
    </PageWrapper>
  );
};

export default ContactPage;
