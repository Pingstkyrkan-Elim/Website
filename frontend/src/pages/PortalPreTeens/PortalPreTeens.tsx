import React, { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  portalGetPreTeensEvents,
  portalCreatePreTeensEvent,
  portalUpdatePreTeensEvent,
  portalDeletePreTeensEvent,
  PreTeensContent,
} from '../../services/api';
import {
  PageHeader,
  PageTitle,
  FormCard,
  FormHeader,
  FormBody,
  Field,
  Label,
  Input,
  FormActions,
  SubmitBtn,
  ErrorMsg,
} from '../PortalAnnonser/PortalAnnonser.styles';
import {
  PTPortalWrapper,
  EventsGrid,
  EventCard,
  EventCardPhoto,
  EventCardNoPhoto,
  EventCardBody,
  EventCardName,
  EventCardDate,
  EventCardActions,
  EditBtn,
  DeleteBtn,
  NewEventBtn,
  SuccessBadge,
  CurrentPhotoWrap,
  CurrentPhoto,
  NoPhoto,
  UploadRow,
  UploadBtn,
  UploadHint,
  FormTopRow,
  CancelBtn,
} from './PortalPreTeens.styles';

// ── Helpers ───────────────────────────────────────────────────────────────────

function photoUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  if (raw.startsWith('http')) return raw;
  const base = process.env.REACT_APP_API_URL ?? 'http://localhost:8000';
  return raw.startsWith('/') ? `${base}${raw}` : `${base}/media/${raw}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('sv-SE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// datetime-local format: YYYY-MM-DDTHH:mm
function toDatetimeLocal(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// ── Empty form ────────────────────────────────────────────────────────────────

const emptyForm = () => ({ event_name: '', event_datetime: '' });

// ── Component ─────────────────────────────────────────────────────────────────

const PortalPreTeens: React.FC = () => {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // ── Data ───────────────────────────────────────────────────────────────────

  const { data: events = [], isLoading } = useQuery<PreTeensContent[]>(
    'portal-preteens-events',
    portalGetPreTeensEvents
  );

  // ── Mutations ──────────────────────────────────────────────────────────────

  const invalidate = () => {
    qc.invalidateQueries('portal-preteens-events');
    qc.invalidateQueries('preteens-content');
  };

  const createMutation = useMutation(portalCreatePreTeensEvent, {
    onSuccess: () => {
      invalidate();
      resetForm();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    },
    onError: (e: any) =>
      setSaveError(
        e?.response?.data ? JSON.stringify(e.response.data) : 'Något gick fel.'
      ),
  });

  const updateMutation = useMutation(
    ({ id, data }: { id: number; data: FormData }) =>
      portalUpdatePreTeensEvent(id, data),
    {
      onSuccess: () => {
        invalidate();
        resetForm();
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      },
      onError: (e: any) =>
        setSaveError(
          e?.response?.data
            ? JSON.stringify(e.response.data)
            : 'Något gick fel.'
        ),
    }
  );

  const deleteMutation = useMutation(portalDeletePreTeensEvent, {
    onSuccess: () => {
      invalidate();
      setDeleteError('');
    },
    onError: () => setDeleteError('Kunde inte ta bort evenemanget.'),
  });

  // ── Form helpers ───────────────────────────────────────────────────────────

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm());
    setPendingFile(null);
    setPreviewUrl(null);
    setCurrentPhoto(null);
    setSaveError('');
  };

  const openCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (ev: PreTeensContent) => {
    setEditingId(ev.id);
    setForm({
      event_name: ev.event_name,
      event_datetime: toDatetimeLocal(ev.event_datetime),
    });
    setCurrentPhoto(photoUrl(ev.photo));
    setPendingFile(null);
    setPreviewUrl(null);
    setSaveError('');
    setShowForm(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');
    const fd = new FormData();
    fd.append('event_name', form.event_name);
    fd.append('event_datetime', new Date(form.event_datetime).toISOString());
    if (pendingFile) fd.append('photo', pendingFile);

    if (editingId !== null) {
      updateMutation.mutate({ id: editingId, data: fd });
    } else {
      createMutation.mutate(fd);
    }
  };

  const isSaving = createMutation.isLoading || updateMutation.isLoading;
  const photoPreview = previewUrl ?? currentPhoto;

  // ── Render ─────────────────────────────────────────────────────────────────

  if (isLoading)
    return (
      <PTPortalWrapper>
        <p>Laddar…</p>
      </PTPortalWrapper>
    );

  return (
    <PTPortalWrapper>
      <PageHeader>
        <PageTitle>Pre-Teens — Evenemang</PageTitle>
        {saveSuccess && <SuccessBadge>Sparat!</SuccessBadge>}
      </PageHeader>

      {/* ── Event cards ── */}
      {events.length > 0 && (
        <EventsGrid>
          {events.map(ev => (
            <EventCard key={ev.id}>
              {photoUrl(ev.photo) ? (
                <EventCardPhoto src={photoUrl(ev.photo)!} alt={ev.event_name} />
              ) : (
                <EventCardNoPhoto>Inget foto</EventCardNoPhoto>
              )}
              <EventCardBody>
                <EventCardName>{ev.event_name}</EventCardName>
                <EventCardDate>{formatDate(ev.event_datetime)}</EventCardDate>
                <EventCardActions>
                  <EditBtn onClick={() => openEdit(ev)}>Redigera</EditBtn>
                  <DeleteBtn
                    onClick={() => {
                      if (window.confirm(`Ta bort "${ev.event_name}"?`))
                        deleteMutation.mutate(ev.id);
                    }}
                    disabled={deleteMutation.isLoading}
                  >
                    Ta bort
                  </DeleteBtn>
                </EventCardActions>
              </EventCardBody>
            </EventCard>
          ))}
        </EventsGrid>
      )}

      {deleteError && (
        <ErrorMsg style={{ marginBottom: '1rem' }}>{deleteError}</ErrorMsg>
      )}

      {!showForm && (
        <NewEventBtn onClick={openCreate}>+ Nytt evenemang</NewEventBtn>
      )}

      {/* ── Create / Edit form ── */}
      {showForm && (
        <FormCard as='form' onSubmit={handleSubmit}>
          <FormTopRow>
            <FormHeader>
              {editingId !== null ? 'Redigera evenemang' : 'Nytt evenemang'}
            </FormHeader>
            <CancelBtn type='button' onClick={resetForm}>
              Avbryt
            </CancelBtn>
          </FormTopRow>
          <FormBody>
            <Field>
              <Label>Namn på evenemanget</Label>
              <Input
                value={form.event_name}
                onChange={e =>
                  setForm(f => ({ ...f, event_name: e.target.value }))
                }
                placeholder='t.ex. Sleep Over'
                required
              />
            </Field>
            <Field>
              <Label>Datum och tid</Label>
              <Input
                type='datetime-local'
                value={form.event_datetime}
                onChange={e =>
                  setForm(f => ({ ...f, event_datetime: e.target.value }))
                }
                required
              />
            </Field>
          </FormBody>

          <FormHeader style={{ marginTop: '1.2rem' }}>
            Foto (bento-grid)
          </FormHeader>
          <FormBody>
            <CurrentPhotoWrap>
              {photoPreview ? (
                <CurrentPhoto src={photoPreview} alt='Foto' />
              ) : (
                <NoPhoto>Inget foto</NoPhoto>
              )}
            </CurrentPhotoWrap>
            <UploadRow>
              <input
                ref={fileRef}
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <UploadBtn type='button' onClick={() => fileRef.current?.click()}>
                {pendingFile ? pendingFile.name : 'Välj foto'}
              </UploadBtn>
              {pendingFile && <UploadHint>Ej sparat ännu</UploadHint>}
            </UploadRow>
          </FormBody>

          {saveError && <ErrorMsg>{saveError}</ErrorMsg>}

          <FormActions>
            <SubmitBtn type='submit' disabled={isSaving}>
              {isSaving
                ? 'Sparar…'
                : editingId !== null
                  ? 'Spara ändringar'
                  : 'Skapa evenemang'}
            </SubmitBtn>
          </FormActions>
        </FormCard>
      )}
    </PTPortalWrapper>
  );
};

export default PortalPreTeens;
