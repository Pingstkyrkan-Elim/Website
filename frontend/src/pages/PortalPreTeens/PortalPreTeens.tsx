import React, { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  portalCreatePreTeensEvent,
  portalDeletePreTeensEvent,
  portalGetPreTeensEvents,
  portalUpdatePreTeensEvent,
  PreTeensContent,
  portalGetPreTeensNews,
  portalCreatePreTeensNews,
  portalUpdatePreTeensNews,
  portalDeletePreTeensNews,
  PreTeensNews,
} from '../../services/api';
import {
  ErrorMsg,
  Field,
  FormActions,
  FormBody,
  FormCard,
  FormHeader,
  Input,
  Label,
  PageHeader,
  PageTitle,
  SubmitBtn,
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
} from '../PortalAnnonser/PortalAnnonser.styles';
import {
  CancelBtn,
  CurrentPhoto,
  CurrentPhotoWrap,
  DeleteBtn,
  EditBtn,
  EventCard,
  EventCardActions,
  EventCardBody,
  EventCardDate,
  EventCardName,
  EventCardNoPhoto,
  EventCardPhoto,
  EventsGrid,
  FormTopRow,
  NewEventBtn,
  NoPhoto,
  PTPortalWrapper,
  SuccessBadge,
  UploadBtn,
  UploadHint,
  UploadRow,
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
      {/* ── Pre-Teens News CRUD ────────────────────────────────── */}
      <PTNewsManager />
    </PTPortalWrapper>
  );
};

// ── News sub-component ────────────────────────────────────────────────────────

const EMPTY_NEWS = { tag: '', title: '', description: '', image: null as File | null, is_active: true };

const PTNewsManager: React.FC = () => {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState(EMPTY_NEWS);
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const { data: items = [], isLoading } = useQuery<PreTeensNews[]>(
    'portal-preteens-news', portalGetPreTeensNews
  );

  const buildFd = () => {
    const fd = new FormData();
    fd.append('tag', form.tag);
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('is_active', String(form.is_active));
    if (form.image) fd.append('image', form.image);
    return fd;
  };

  const createM = useMutation(portalCreatePreTeensNews, {
    onSuccess: () => { qc.invalidateQueries('portal-preteens-news'); reset(); },
    onError: () => setError('Det gick inte att spara.'),
  });

  const updateM = useMutation(
    ({ id, data }: { id: number; data: FormData }) => portalUpdatePreTeensNews(id, data),
    {
      onSuccess: () => { qc.invalidateQueries('portal-preteens-news'); reset(); },
      onError: () => setError('Det gick inte att uppdatera.'),
    }
  );

  const deleteM = useMutation(portalDeletePreTeensNews, {
    onSuccess: () => qc.invalidateQueries('portal-preteens-news'),
  });

  const reset = () => { setForm(EMPTY_NEWS); setEditId(null); setError(''); if (fileRef.current) fileRef.current.value = ''; };

  const openEdit = (item: PreTeensNews) => {
    setEditId(item.id);
    setForm({ tag: item.tag, title: item.title, description: item.description, image: null, is_active: item.is_active });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.tag.trim() || !form.title.trim() || !form.description.trim()) { setError('Etikett, rubrik och beskrivning krävs.'); return; }
    const fd = buildFd();
    if (editId !== null) updateM.mutate({ id: editId, data: fd });
    else createM.mutate(fd);
  };

  const isSaving = createM.isLoading || updateM.isLoading;

  return (
    <div style={{ marginTop: '2rem' }}>
      <PageHeader>
        <PageTitle>Nyheter</PageTitle>
      </PageHeader>

      <ListCard style={{ marginBottom: '1.6rem' }}>
        <ListHeader>Publicerade nyheter</ListHeader>
        {isLoading && <EmptyState>Laddar...</EmptyState>}
        {!isLoading && items.length === 0 && <EmptyState>Inga nyheter ännu.</EmptyState>}
        {items.map(item => (
          <AnnouncementRow key={item.id} $inactive={!item.is_active}>
            <AnnouncementInfo>
              <AnnouncementTitle>{item.title}</AnnouncementTitle>
              <AnnouncementMeta>
                <MetaChip>{item.tag}</MetaChip>
                <span>{item.description.slice(0, 80)}{item.description.length > 80 ? '…' : ''}</span>
              </AnnouncementMeta>
            </AnnouncementInfo>
            <RowActions>
              <ActionBtn onClick={() => openEdit(item)}>Redigera</ActionBtn>
              <ActionBtn $variant='danger' onClick={() => { if (window.confirm('Ta bort?')) deleteM.mutate(item.id); }}>Ta bort</ActionBtn>
            </RowActions>
          </AnnouncementRow>
        ))}
      </ListCard>

      <FormCard>
        <FormHeader>{editId !== null ? 'Redigera nyhet' : 'Lägg till nyhet'}</FormHeader>
        <FormBody as='form' onSubmit={handleSubmit}>
          <Field>
            <Label>Etikett</Label>
            <Input placeholder='t.ex. Nyhet, Event, Läger' value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} />
          </Field>
          <Field>
            <Label>Rubrik</Label>
            <Input placeholder='Rubrik' value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          </Field>
          <Field>
            <Label>Beskrivning</Label>
            <Input as='textarea' rows={3} placeholder='Beskrivning...' value={form.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm(f => ({ ...f, description: e.target.value }))}
              style={{ resize: 'vertical', minHeight: '80px' }} />
          </Field>
          <Field>
            <Label>Bild (valfritt)</Label>
            <Input ref={fileRef} type='file' accept='image/*' onChange={e => setForm(f => ({ ...f, image: e.target.files?.[0] ?? null }))} />
          </Field>
          <Field style={{ flexDirection: 'row', alignItems: 'center', gap: '0.6rem' }}>
            <input type='checkbox' id='pt-news-active' checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} />
            <Label htmlFor='pt-news-active' style={{ margin: 0 }}>Aktiv (visas på webbplatsen)</Label>
          </Field>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <FormActions>
            <SubmitBtn type='submit' disabled={isSaving}>{isSaving ? 'Sparar...' : editId !== null ? 'Uppdatera' : 'Skapa nyhet'}</SubmitBtn>
            {editId !== null && <ActionBtn type='button' onClick={reset}>Avbryt</ActionBtn>}
          </FormActions>
        </FormBody>
      </FormCard>
    </div>
  );
};

export default PortalPreTeens;
