import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  portalGetAlphaProgram,
  portalUpdateAlphaProgram,
  portalUploadAlphaPhoto,
  portalDeleteAlphaPhoto,
} from '../../services/api';
import { AlphaProgram } from '../../types';
import {
  PageHeader,
  PageTitle,
  ListCard,
  ListHeader,
  EmptyState,
  FormCard,
  FormHeader,
  FormBody,
  Field,
  Label,
  Input,
  Textarea,
  FormActions,
  SubmitBtn,
  ErrorMsg,
} from '../PortalAnnonser/PortalAnnonser.styles';
import {
  AlphaPageWrapper,
  NextAlphaRow,
  PhotoGrid,
  PhotoThumb,
  PhotoDeleteBtn,
  UploadRow,
  UploadBtn,
  UploadHint,
  CardPreviewOuter,
  CardPreviewHeader,
  CardPreviewBody,
  CardPreviewInner,
  PreviewTag,
  PreviewTitle,
  PreviewDesc,
  PreviewMeta,
  PreviewBtn,
  EmptyPreview,
  ClearBtn,
} from './PortalAlpha.styles';

// ── Form state ────────────────────────────────────────────────────────────────

interface NextForm {
  next_alpha_tag: string;
  next_alpha_title: string;
  next_alpha_desc: string;
  next_alpha_venue: string;
  next_alpha_location: string;
  next_alpha_email: string;
}

const programToForm = (d: AlphaProgram): NextForm => ({
  next_alpha_tag:      d.next_alpha_tag      ?? '',
  next_alpha_title:    d.next_alpha_title    ?? '',
  next_alpha_desc:     d.next_alpha_desc     ?? '',
  next_alpha_venue:    d.next_alpha_venue    ?? '',
  next_alpha_location: d.next_alpha_location ?? '',
  next_alpha_email:    d.next_alpha_email    ?? '',
});

const emptyForm = (): NextForm => ({
  next_alpha_tag:      '',
  next_alpha_title:    '',
  next_alpha_desc:     '',
  next_alpha_venue:    '',
  next_alpha_location: '',
  next_alpha_email:    '',
});

// ── Component ─────────────────────────────────────────────────────────────────

const PortalAlpha: React.FC = () => {
  const qc = useQueryClient();

  const [form, setForm] = useState<NextForm>(emptyForm());
  const [formLoaded, setFormLoaded] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // ── data ───────────────────────────────────────────────────────────────────

  const { data, isLoading } = useQuery<AlphaProgram>(
    'portal-alpha-program',
    portalGetAlphaProgram,
    {
      onSuccess: (d) => {
        if (!formLoaded) {
          setForm(programToForm(d));
          setFormLoaded(true);
        }
      },
    }
  );

  const photos = data?.gallery ?? [];
  const hasCard = !!form.next_alpha_title.trim();

  // ── mutations ──────────────────────────────────────────────────────────────

  const saveMut = useMutation(
    (payload: Partial<AlphaProgram>) => portalUpdateAlphaProgram(payload),
    {
      onSuccess: () => {
        qc.invalidateQueries('portal-alpha-program');
        qc.invalidateQueries('alpha-program');
        setSaveSuccess(true);
        setSaveError('');
        setTimeout(() => setSaveSuccess(false), 2500);
      },
      onError: () => setSaveError('Kunde inte spara. Försök igen.'),
    }
  );

  const uploadMut = useMutation(
    (file: File) => {
      const fd = new FormData();
      fd.append('image', file);
      return portalUploadAlphaPhoto(fd);
    },
    {
      onSuccess: () => {
        qc.invalidateQueries('portal-alpha-program');
        qc.invalidateQueries('alpha-program');
        setUploadError('');
      },
      onError: () => setUploadError('Uppladdning misslyckades.'),
    }
  );

  const deleteMut = useMutation(
    (id: number) => portalDeleteAlphaPhoto(id),
    {
      onSuccess: () => {
        qc.invalidateQueries('portal-alpha-program');
        qc.invalidateQueries('alpha-program');
      },
    }
  );

  // ── handlers ──────────────────────────────────────────────────────────────

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploadError('');
    for (const file of files) {
      await uploadMut.mutateAsync(file);
    }
    e.target.value = '';
  };

  const handleDeletePhoto = (id: number, caption?: string) => {
    if (!window.confirm(`Ta bort bilden${caption ? ` "${caption}"` : ''}?`)) return;
    deleteMut.mutate(id);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');
    saveMut.mutate({
      next_alpha_tag:      form.next_alpha_tag.trim(),
      next_alpha_title:    form.next_alpha_title.trim(),
      next_alpha_desc:     form.next_alpha_desc.trim(),
      next_alpha_venue:    form.next_alpha_venue.trim(),
      next_alpha_location: form.next_alpha_location.trim(),
      next_alpha_email:    form.next_alpha_email.trim(),
    });
  };

  const handleClear = () => {
    if (!window.confirm('Ta bort Nästa Alpha-kortet helt? Det kommer inte längre att visas på hemsidan.')) return;
    const cleared = emptyForm();
    setForm(cleared);
    saveMut.mutate({
      next_alpha_tag:      '',
      next_alpha_title:    '',
      next_alpha_desc:     '',
      next_alpha_location: '',
      next_alpha_email:    '',
    });
  };

  const isBusy = saveMut.isLoading;

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <AlphaPageWrapper>
      <PageHeader>
        <PageTitle>Alpha</PageTitle>
      </PageHeader>

      {/* ── Bilder ─────────────────────────────────────────────── */}
      <ListCard>
        <ListHeader>Bilder ({photos.length})</ListHeader>

        {isLoading && <EmptyState>Laddar…</EmptyState>}

        {!isLoading && photos.length === 0 && (
          <EmptyState>Inga bilder uppladdade ännu.</EmptyState>
        )}

        {photos.length > 0 && (
          <PhotoGrid>
            {photos.map((photo) => (
              <PhotoThumb key={photo.id}>
                <img src={photo.image} alt={photo.caption || 'Alpha'} />
                <PhotoDeleteBtn
                  onClick={() => handleDeletePhoto(photo.id, photo.caption)}
                  title="Ta bort"
                >
                  ✕
                </PhotoDeleteBtn>
              </PhotoThumb>
            ))}
          </PhotoGrid>
        )}

        <UploadRow>
          <UploadBtn htmlFor="alpha-photo-upload">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Ladda upp bilder
          </UploadBtn>
          <input
            id="alpha-photo-upload"
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleFilesChange}
          />
          {uploadMut.isLoading && <UploadHint>Laddar upp…</UploadHint>}
          {uploadError && (
            <UploadHint style={{ color: '#b43c3c' }}>{uploadError}</UploadHint>
          )}
          <UploadHint>Du kan välja flera filer samtidigt</UploadHint>
        </UploadRow>
      </ListCard>

      {/* ── Nästa Alpha form + preview ─────────────────────────── */}
      <NextAlphaRow>

        {/* Form */}
        <FormCard>
          <FormHeader><span>Nästa Alpha</span></FormHeader>
          <FormBody onSubmit={handleSave}>
            {saveError && <ErrorMsg>{saveError}</ErrorMsg>}

            {saveSuccess && (
              <div style={{
                padding: '0.6rem 0.9rem',
                background: 'rgba(60,140,60,0.08)',
                border: '1px solid rgba(60,140,60,0.2)',
                borderRadius: 8,
                color: '#2a7a2a',
                fontSize: '0.85rem',
              }}>
                Sparat!
              </div>
            )}

            <Field>
              <Label>Etikett</Label>
              <Input
                value={form.next_alpha_tag}
                onChange={e => setForm(f => ({ ...f, next_alpha_tag: e.target.value }))}
                placeholder="T.ex. Nästa Alpha"
              />
            </Field>

            <Field>
              <Label>Titel</Label>
              <Input
                value={form.next_alpha_title}
                onChange={e => setForm(f => ({ ...f, next_alpha_title: e.target.value }))}
                placeholder="T.ex. Välkommen med under vårterminen!"
              />
            </Field>

            <Field>
              <Label>Beskrivning</Label>
              <Textarea
                value={form.next_alpha_desc}
                onChange={e => setForm(f => ({ ...f, next_alpha_desc: e.target.value }))}
                placeholder="Kort beskrivning av kursen…"
                style={{ minHeight: 100 }}
              />
            </Field>

            <Field>
              <Label>Platsnamn</Label>
              <Input
                value={form.next_alpha_venue}
                onChange={e => setForm(f => ({ ...f, next_alpha_venue: e.target.value }))}
                placeholder="T.ex. Pingstkyrkan Elim"
              />
            </Field>

            <Field>
              <Label>Adress</Label>
              <Input
                value={form.next_alpha_location}
                onChange={e => setForm(f => ({ ...f, next_alpha_location: e.target.value }))}
                placeholder="T.ex. Engelbrektsgatan 68, Trelleborg"
              />
            </Field>

            <Field>
              <Label>E-post</Label>
              <Input
                type="email"
                value={form.next_alpha_email}
                onChange={e => setForm(f => ({ ...f, next_alpha_email: e.target.value }))}
                placeholder="anmalan@pingstkyrkan.se"
              />
            </Field>

            <FormActions>
              <SubmitBtn type="submit" disabled={isBusy}>
                {isBusy ? 'Sparar…' : 'Spara ändringar'}
              </SubmitBtn>
              {hasCard && (
                <ClearBtn type="button" onClick={handleClear} disabled={isBusy}>
                  Ta bort kort
                </ClearBtn>
              )}
            </FormActions>
          </FormBody>
        </FormCard>

        {/* Live preview */}
        <CardPreviewOuter>
          <CardPreviewHeader>Förhandsvisning</CardPreviewHeader>
          <CardPreviewBody>
            {hasCard ? (
              <CardPreviewInner>
                {form.next_alpha_tag && <PreviewTag>{form.next_alpha_tag}</PreviewTag>}
                <PreviewTitle>{form.next_alpha_title}</PreviewTitle>
                {form.next_alpha_desc && <PreviewDesc>{form.next_alpha_desc}</PreviewDesc>}
                {(form.next_alpha_venue || form.next_alpha_location) && (
                  <PreviewMeta>
                    📍 {form.next_alpha_venue && <span>{form.next_alpha_venue}</span>}
                    {form.next_alpha_venue && form.next_alpha_location ? ', ' : ''}
                    {form.next_alpha_location}
                  </PreviewMeta>
                )}
                <PreviewBtn>Anmäl dig</PreviewBtn>
              </CardPreviewInner>
            ) : (
              <EmptyPreview>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <span>Fyll i Titel för att se en förhandsvisning</span>
              </EmptyPreview>
            )}
          </CardPreviewBody>
        </CardPreviewOuter>

      </NextAlphaRow>
    </AlphaPageWrapper>
  );
};

export default PortalAlpha;
