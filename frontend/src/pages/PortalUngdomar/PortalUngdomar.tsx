import React, { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  portalGetUngdomarNews,
  portalCreateUngdomarNews,
  portalUpdateUngdomarNews,
  portalDeleteUngdomarNews,
  UngdomarNews,
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

const EMPTY_FORM = { tag: '', title: '', description: '', image: null as File | null, is_active: true };

const PortalUngdomar: React.FC = () => {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const { data: items = [], isLoading } = useQuery<UngdomarNews[]>(
    'portal-ungdomar-news',
    portalGetUngdomarNews
  );

  const buildFormData = () => {
    const fd = new FormData();
    fd.append('tag', form.tag);
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('is_active', String(form.is_active));
    if (form.image) fd.append('image', form.image);
    return fd;
  };

  const createMutation = useMutation(portalCreateUngdomarNews, {
    onSuccess: () => { qc.invalidateQueries('portal-ungdomar-news'); resetForm(); },
    onError: () => setError('Det gick inte att spara. Försök igen.'),
  });

  const updateMutation = useMutation(
    ({ id, data }: { id: number; data: FormData }) => portalUpdateUngdomarNews(id, data),
    {
      onSuccess: () => { qc.invalidateQueries('portal-ungdomar-news'); resetForm(); },
      onError: () => setError('Det gick inte att uppdatera. Försök igen.'),
    }
  );

  const deleteMutation = useMutation(portalDeleteUngdomarNews, {
    onSuccess: () => qc.invalidateQueries('portal-ungdomar-news'),
  });

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setError('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const openEdit = (item: UngdomarNews) => {
    setEditId(item.id);
    setForm({ tag: item.tag, title: item.title, description: item.description, image: null, is_active: item.is_active });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.tag.trim() || !form.title.trim() || !form.description.trim()) {
      setError('Etikett, rubrik och beskrivning krävs.');
      return;
    }
    const fd = buildFormData();
    if (editId !== null) {
      updateMutation.mutate({ id: editId, data: fd });
    } else {
      createMutation.mutate(fd);
    }
  };

  const isSaving = createMutation.isLoading || updateMutation.isLoading;

  return (
    <div>
      <PageHeader>
        <PageTitle>Ungdomar — Nyheter</PageTitle>
      </PageHeader>

      {/* ── List ──────────────────────────────────────────────────────────── */}
      <ListCard style={{ marginBottom: '1.6rem' }}>
        <ListHeader>Publicerade nyheter</ListHeader>
        {isLoading && <EmptyState>Laddar...</EmptyState>}
        {!isLoading && items.length === 0 && (
          <EmptyState>Inga nyheter skapade ännu.</EmptyState>
        )}
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
              <ActionBtn
                $variant="danger"
                onClick={() => { if (window.confirm('Ta bort denna nyhet?')) deleteMutation.mutate(item.id); }}
              >
                Ta bort
              </ActionBtn>
            </RowActions>
          </AnnouncementRow>
        ))}
      </ListCard>

      {/* ── Form ──────────────────────────────────────────────────────────── */}
      <FormCard>
        <FormHeader>{editId !== null ? 'Redigera nyhet' : 'Lägg till nyhet'}</FormHeader>
        <FormBody as="form" onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="un-tag">Etikett</Label>
            <Input
              id="un-tag"
              placeholder="t.ex. Nyhet, Event, Läger"
              value={form.tag}
              onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
            />
          </Field>
          <Field>
            <Label htmlFor="un-title">Rubrik</Label>
            <Input
              id="un-title"
              placeholder="Rubrik på nyheten"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />
          </Field>
          <Field>
            <Label htmlFor="un-desc">Beskrivning</Label>
            <Input
              as="textarea"
              id="un-desc"
              rows={3}
              placeholder="Kort beskrivning..."
              value={form.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm(f => ({ ...f, description: e.target.value }))}
              style={{ resize: 'vertical', minHeight: '80px' }}
            />
          </Field>
          <Field>
            <Label htmlFor="un-image">Bild (valfritt)</Label>
            <Input
              ref={fileRef}
              id="un-image"
              type="file"
              accept="image/*"
              onChange={e => setForm(f => ({ ...f, image: e.target.files?.[0] ?? null }))}
            />
          </Field>
          <Field style={{ flexDirection: 'row', alignItems: 'center', gap: '0.6rem' }}>
            <input
              type="checkbox"
              id="un-active"
              checked={form.is_active}
              onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))}
            />
            <Label htmlFor="un-active" style={{ margin: 0 }}>Aktiv (visas på webbplatsen)</Label>
          </Field>

          {error && <ErrorMsg>{error}</ErrorMsg>}

          <FormActions>
            <SubmitBtn type="submit" disabled={isSaving}>
              {isSaving ? 'Sparar...' : editId !== null ? 'Uppdatera' : 'Skapa nyhet'}
            </SubmitBtn>
            {editId !== null && (
              <ActionBtn type="button" onClick={resetForm}>Avbryt</ActionBtn>
            )}
          </FormActions>
        </FormBody>
      </FormCard>
    </div>
  );
};

export default PortalUngdomar;
