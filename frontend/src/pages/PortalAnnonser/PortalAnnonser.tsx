import React, { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  portalGetAnnouncements,
  portalCreateAnnouncement,
  portalUpdateAnnouncement,
  portalDeleteAnnouncement,
} from '../../services/api';
import { Announcement } from '../../types';
import {
  PageWrapper,
  PageHeader,
  PageTitle,
  NewButton,
  ListCard,
  ListHeader,
  AnnouncementRow,
  AnnouncementInfo,
  AnnouncementTitle,
  AnnouncementMeta,
  MetaChip,
  RowActions,
  ActionBtn,
  EmptyState,
  FormCard,
  FormHeader,
  FormBody,
  Field,
  Label,
  Input,
  Textarea,
  ToggleRow,
  ToggleLabel,
  Toggle,
  FormActions,
  SubmitBtn,
  CancelBtn,
  ErrorMsg,
  ImageUploadArea,
  ImagePreview,
  ImageUploadPlaceholder,
  ImageActions,
  ImageActionBtn,
} from './PortalAnnonser.styles';

// ── helpers ───────────────────────────────────────────────────────────────────

interface FormState {
  title: string;
  description: string;
  date: string;
  location: string;
  is_active: boolean;
}

const emptyForm = (): FormState => ({
  title: '',
  description: '',
  date: '',
  location: '',
  is_active: true,
});

const announcementToForm = (a: Announcement): FormState => ({
  title: a.title,
  description: a.description,
  date: a.date,
  location: a.location,
  is_active: a.is_active,
});

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

// ── component ─────────────────────────────────────────────────────────────────

const PortalAnnonser: React.FC = () => {
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>(emptyForm());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formError, setFormError] = useState('');

  // image state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const { data: announcements = [], isLoading } = useQuery(
    'portal-announcements',
    portalGetAnnouncements
  );

  const createMut = useMutation(portalCreateAnnouncement, {
    onSuccess: () => {
      qc.invalidateQueries('portal-announcements');
      qc.invalidateQueries('announcements');
      resetForm();
    },
    onError: () => setFormError('Error al crear el anuncio.'),
  });

  const updateMut = useMutation(
    ({ id, data }: { id: number; data: FormData | Partial<Announcement> }) =>
      portalUpdateAnnouncement(id, data),
    {
      onSuccess: () => {
        qc.invalidateQueries('portal-announcements');
        qc.invalidateQueries('announcements');
        resetForm();
      },
      onError: () => setFormError('Error al actualizar el anuncio.'),
    }
  );

  const deleteMut = useMutation((id: number) => portalDeleteAnnouncement(id), {
    onSuccess: () => {
      qc.invalidateQueries('portal-announcements');
      qc.invalidateQueries('announcements');
    },
  });

  const resetForm = () => {
    setForm(emptyForm());
    setEditingId(null);
    setFormError('');
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startEdit = (a: Announcement) => {
    setForm(announcementToForm(a));
    setEditingId(a.id);
    setFormError('');
    setImageFile(null);
    setImagePreview(a.image ?? null);
    setRemoveImage(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setRemoveImage(false);
    const reader = new FileReader();
    reader.onload = ev => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(true);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const buildPayload = (): FormData | Partial<Announcement> => {
    if (imageFile || removeImage) {
      const fd = new FormData();
      fd.append('title', form.title.trim());
      fd.append('description', form.description.trim());
      fd.append('date', form.date);
      fd.append('location', form.location.trim());
      fd.append('is_active', String(form.is_active));
      if (imageFile) {
        fd.append('image', imageFile);
      } else if (removeImage) {
        fd.append('image', '');
      }
      return fd;
    }
    return {
      title: form.title.trim(),
      description: form.description.trim(),
      date: form.date,
      location: form.location.trim(),
      is_active: form.is_active,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!form.title.trim()) {
      setFormError('Titel är obligatoriskt.');
      return;
    }
    if (!form.date) {
      setFormError('Datum är obligatoriskt.');
      return;
    }

    const payload = buildPayload();

    if (editingId !== null) {
      updateMut.mutate({ id: editingId, data: payload });
    } else {
      createMut.mutate(payload);
    }
  };

  const isBusy = createMut.isLoading || updateMut.isLoading;

  return (
    <PageWrapper>
      <PageHeader>
        <PageTitle>Viktiga Annonser</PageTitle>
        <NewButton onClick={resetForm}>+ Ny annons</NewButton>
      </PageHeader>

      {/* ── List ────────────────────────────────────────────────── */}
      <ListCard>
        <ListHeader>Alla annonser ({announcements.length})</ListHeader>

        {isLoading && <EmptyState>Laddar…</EmptyState>}

        {!isLoading && announcements.length === 0 && (
          <EmptyState>
            Inga annonser ännu. Klicka på "+ Ny annons" för att skapa en.
          </EmptyState>
        )}

        {announcements.map((a: Announcement) => (
          <AnnouncementRow key={a.id} $inactive={!a.is_active}>
            {a.image && (
              <img
                src={a.image}
                alt=''
                style={{
                  width: 48,
                  height: 48,
                  objectFit: 'cover',
                  borderRadius: 6,
                  flexShrink: 0,
                }}
              />
            )}
            <AnnouncementInfo>
              <AnnouncementTitle>{a.title}</AnnouncementTitle>
              <AnnouncementMeta>
                <MetaChip>{formatDate(a.date)}</MetaChip>
                {a.location && <MetaChip>{a.location}</MetaChip>}
                {!a.is_active && <MetaChip>Inaktiv</MetaChip>}
              </AnnouncementMeta>
              {a.description && (
                <div
                  style={{
                    fontSize: '0.82rem',
                    color: '#666',
                    marginTop: '0.25rem',
                  }}
                >
                  {a.description.length > 100
                    ? a.description.slice(0, 100) + '…'
                    : a.description}
                </div>
              )}
            </AnnouncementInfo>
            <RowActions>
              <ActionBtn onClick={() => startEdit(a)}>Redigera</ActionBtn>
              <ActionBtn
                $variant='danger'
                onClick={() => {
                  if (window.confirm(`Ta bort "${a.title}"?`)) {
                    deleteMut.mutate(a.id);
                  }
                }}
              >
                Ta bort
              </ActionBtn>
            </RowActions>
          </AnnouncementRow>
        ))}
      </ListCard>

      {/* ── Form ────────────────────────────────────────────────── */}
      <FormCard>
        <FormHeader>
          <span>{editingId !== null ? 'Redigera annons' : 'Ny annons'}</span>
          {editingId !== null && (
            <CancelBtn type='button' onClick={resetForm}>
              ✕
            </CancelBtn>
          )}
        </FormHeader>

        <FormBody onSubmit={handleSubmit}>
          {formError && <ErrorMsg>{formError}</ErrorMsg>}

          <Field>
            <Label>Titel *</Label>
            <Input
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder='Titel på annonsen'
            />
          </Field>

          <Field>
            <Label>Datum *</Label>
            <Input
              type='date'
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            />
          </Field>

          <Field>
            <Label>Plats</Label>
            <Input
              value={form.location}
              onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
              placeholder='T.ex. Stora salen'
            />
          </Field>

          <Field>
            <Label>Beskrivning</Label>
            <Textarea
              value={form.description}
              onChange={e =>
                setForm(f => ({ ...f, description: e.target.value }))
              }
              placeholder='Kortfattad beskrivning av annonsen…'
            />
          </Field>

          {/* Image upload */}
          <Field>
            <Label>Bild</Label>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <ImageUploadArea
              $hasImage={!!imagePreview}
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <ImagePreview src={imagePreview} alt='preview' />
              ) : (
                <ImageUploadPlaceholder>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'
                  >
                    <rect x='3' y='3' width='18' height='18' rx='2' />
                    <circle cx='8.5' cy='8.5' r='1.5' />
                    <polyline points='21 15 16 10 5 21' />
                  </svg>
                  <span>Klicka för att ladda upp bild</span>
                </ImageUploadPlaceholder>
              )}
            </ImageUploadArea>
            {imagePreview && (
              <ImageActions>
                <ImageActionBtn
                  type='button'
                  onClick={() => fileInputRef.current?.click()}
                >
                  Byt bild
                </ImageActionBtn>
                <ImageActionBtn
                  type='button'
                  $danger
                  onClick={handleRemoveImage}
                >
                  Ta bort bild
                </ImageActionBtn>
              </ImageActions>
            )}
          </Field>

          <ToggleRow>
            <ToggleLabel>Aktiv (visas på hemsidan)</ToggleLabel>
            <Toggle
              type='checkbox'
              checked={form.is_active}
              onChange={e =>
                setForm(f => ({ ...f, is_active: e.target.checked }))
              }
            />
          </ToggleRow>

          <FormActions>
            <SubmitBtn type='submit' disabled={isBusy}>
              {isBusy
                ? 'Sparar…'
                : editingId !== null
                  ? 'Spara ändringar'
                  : 'Skapa annons'}
            </SubmitBtn>
            {editingId !== null && (
              <CancelBtn type='button' onClick={resetForm}>
                Avbryt
              </CancelBtn>
            )}
          </FormActions>
        </FormBody>
      </FormCard>
    </PageWrapper>
  );
};

export default PortalAnnonser;
