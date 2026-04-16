import React, { useCallback, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  portalGetEvents,
  portalCreateEvent,
  portalUpdateEvent,
  portalDeleteEvent,
} from '../../services/api';
import { PortalEvent } from '../../types';
import {
  CalendarCard,
  CalendarHeader,
  CheckboxRow,
  ConflictActions,
  ConflictBody,
  ConflictBox,
  ConflictCancelBtn,
  ConflictDeleteBtn,
  ConflictForceBtn,
  ConflictMeta,
  ConflictTitle,
  DayCell,
  DayEvents,
  DayNumber,
  DaysGrid,
  DeleteButton,
  EventDateCol,
  EventDateDow,
  EventDateNum,
  EventListAuthor,
  EventListCard,
  EventListInfo,
  EventListItem,
  EventListMeta,
  EventListTitle,
  EventPill,
  FieldGroup,
  FieldInput,
  FieldLabel,
  FieldRow,
  FieldSelect,
  FieldTextarea,
  FormBody,
  FormCard,
  FormCardHeader,
  FormCardTitle,
  FormClearButton,
  FormFooter,
  FormMessage,
  FormSection,
  FormSectionContent,
  FormSectionTitle,
  FormSectionToggle,
  ImageActionBtn,
  ImageActions,
  ImagePreview,
  ImageUploadArea,
  ImageUploadPlaceholder,
  InactiveBadge,
  KalenderWrapper,
  LeftColumn,
  MetaDot,
  MonthGroupLabel,
  MonthTitle,
  NavArrow,
  NewEventButton,
  PageHeader,
  PageTitle,
  RecurringCard,
  RecurringCardLocation,
  RecurringCardTime,
  RecurringCardTitle,
  RecurringDayGroup,
  RecurringDayHeader,
  RecurringGrid,
  EventPillMeta,
  EventPillTitle,
  SaveButton,
  SectionCount,
  SectionLabel,
  WeekDayLabel,
  WeekDays,
} from './PortalKalender.styles';

// ── Types ─────────────────────────────────────────────────────────────────────

type FormState = {
  title: string;
  description: string;
  location: string;
  contact_person: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  is_recurring: boolean;
  recurrence_day: string;
  recurrence_time: string;
  recurrence_duration_minutes: string;
  is_suspended: boolean;
  suspended_until: string;
  has_sunday_school: boolean;
  has_communion: boolean;
  registration_required: boolean;
  max_participants: string;
  registration_info: string;
  is_active: boolean;
};

const EMPTY_FORM: FormState = {
  title: '',
  description: '',
  location: '',
  contact_person: '',
  start_date: '',
  start_time: '11:00',
  end_date: '',
  end_time: '',
  is_recurring: false,
  recurrence_day: '',
  recurrence_time: '',
  recurrence_duration_minutes: '',
  is_suspended: false,
  suspended_until: '',
  has_sunday_school: false,
  has_communion: false,
  registration_required: false,
  max_participants: '',
  registration_info: '',
  is_active: true,
};

const DAYS_OF_WEEK = [
  { value: '0', label: 'Måndag' },
  { value: '1', label: 'Tisdag' },
  { value: '2', label: 'Onsdag' },
  { value: '3', label: 'Torsdag' },
  { value: '4', label: 'Fredag' },
  { value: '5', label: 'Lördag' },
  { value: '6', label: 'Söndag' },
];

const WEEK_LABELS = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

const SV_MONTHS = [
  'Januari',
  'Februari',
  'Mars',
  'April',
  'Maj',
  'Juni',
  'Juli',
  'Augusti',
  'September',
  'Oktober',
  'November',
  'December',
];

const SV_MONTHS_SHORT = [
  'jan',
  'feb',
  'mar',
  'apr',
  'maj',
  'jun',
  'jul',
  'aug',
  'sep',
  'okt',
  'nov',
  'dec',
];

// JS getDay() order: 0=Sun, 1=Mon … 6=Sat
const SV_DAYS_FULL = [
  'Söndag',
  'Måndag',
  'Tisdag',
  'Onsdag',
  'Torsdag',
  'Fredag',
  'Lördag',
];

// ── Helpers ───────────────────────────────────────────────────────────────────

// Use local (browser) date/time components — avoids UTC vs. local timezone bugs
function localDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function localTimeStr(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function formatTime(t?: string | null) {
  if (!t) return '';
  return t.slice(0, 5);
}

function eventToForm(ev: PortalEvent): FormState {
  const sd = ev.start_date ? new Date(ev.start_date) : null;
  const ed = ev.end_date ? new Date(ev.end_date) : null;
  return {
    title: ev.title,
    description: ev.description,
    location: ev.location,
    contact_person: ev.contact_person ?? '',
    start_date: sd ? localDateStr(sd) : '',
    start_time: sd ? localTimeStr(sd) : '11:00',
    end_date: ed ? localDateStr(ed) : '',
    end_time: ed ? localTimeStr(ed) : '',
    is_recurring: ev.is_recurring,
    recurrence_day: ev.recurrence_day !== null ? String(ev.recurrence_day) : '',
    recurrence_time: formatTime(ev.recurrence_time),
    recurrence_duration_minutes: ev.recurrence_duration_minutes
      ? String(ev.recurrence_duration_minutes)
      : '',
    is_suspended: ev.is_suspended,
    suspended_until: ev.suspended_until ?? '',
    has_sunday_school: ev.has_sunday_school,
    has_communion: ev.has_communion,
    registration_required: ev.registration_required,
    max_participants: ev.max_participants ? String(ev.max_participants) : '',
    registration_info: ev.registration_info ?? '',
    is_active: ev.is_active,
  };
}

function formToPayload(f: FormState): Partial<PortalEvent> {
  const startDt =
    f.start_date && f.start_time
      ? new Date(`${f.start_date}T${f.start_time}:00`).toISOString()
      : f.start_date
        ? new Date(`${f.start_date}T00:00:00`).toISOString()
        : '';
  const endDt =
    f.end_date && f.end_time
      ? new Date(`${f.end_date}T${f.end_time}:00`).toISOString()
      : f.end_date
        ? new Date(`${f.end_date}T00:00:00`).toISOString()
        : null;
  return {
    title: f.title,
    description: f.description,
    location: f.location,
    contact_person: f.contact_person,
    start_date: startDt,
    end_date: endDt ?? undefined,
    is_recurring: f.is_recurring,
    recurrence_day:
      f.is_recurring && f.recurrence_day !== ''
        ? Number(f.recurrence_day)
        : null,
    recurrence_time:
      f.is_recurring && f.recurrence_time ? `${f.recurrence_time}:00` : null,
    recurrence_duration_minutes:
      f.is_recurring && f.recurrence_duration_minutes
        ? Number(f.recurrence_duration_minutes)
        : null,
    is_suspended: f.is_suspended,
    suspended_until: f.suspended_until || null,
    has_sunday_school: f.has_sunday_school,
    has_communion: f.has_communion,
    registration_required: f.registration_required,
    max_participants: f.max_participants ? Number(f.max_participants) : null,
    registration_info: f.registration_info,
    is_active: f.is_active,
  };
}

// Full human-readable date string for an event
function formatFullDate(ev: PortalEvent): string {
  if (ev.is_recurring) {
    const dayName =
      DAYS_OF_WEEK.find(d => d.value === String(ev.recurrence_day))?.label ??
      '';
    const time = ev.recurrence_time
      ? ` kl. ${formatTime(ev.recurrence_time)}`
      : '';
    return `Varje ${dayName.toLowerCase()}${time}`;
  }
  if (ev.start_date) {
    const d = new Date(ev.start_date);
    const dayName = SV_DAYS_FULL[d.getDay()];
    return `${dayName} ${d.getDate()} ${SV_MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()} kl. ${localTimeStr(d)}`;
  }
  return '';
}

// Returns the conflicting event if date + time + location all match
function findConflict(
  form: FormState,
  events: PortalEvent[],
  editingId?: number
): PortalEvent | null {
  const others = events.filter(ev => ev.id !== editingId);
  const loc = form.location.trim().toLowerCase();

  if (form.is_recurring && form.recurrence_day !== '' && form.recurrence_time) {
    const day = Number(form.recurrence_day);
    const time = form.recurrence_time; // "HH:MM"
    for (const ev of others) {
      if (
        ev.is_recurring &&
        ev.recurrence_day === day &&
        ev.recurrence_time &&
        formatTime(ev.recurrence_time) === time &&
        ev.location.trim().toLowerCase() === loc
      ) {
        return ev;
      }
    }
  } else if (!form.is_recurring && form.start_date && form.start_time) {
    const newDate = new Date(`${form.start_date}T${form.start_time}:00`);
    const jsDay = newDate.getDay();
    const modelDay = jsDay === 0 ? 6 : jsDay - 1;

    for (const ev of others) {
      // One-time vs one-time: compare local date + local time + location
      if (!ev.is_recurring && ev.start_date) {
        const evDate = new Date(ev.start_date);
        if (
          localDateStr(evDate) === form.start_date &&
          localTimeStr(evDate) === form.start_time &&
          ev.location.trim().toLowerCase() === loc
        ) {
          return ev;
        }
      }
      // One-time vs recurring: same weekday + time + location
      if (
        ev.is_recurring &&
        ev.recurrence_day === modelDay &&
        ev.recurrence_time &&
        formatTime(ev.recurrence_time) === form.start_time &&
        ev.location.trim().toLowerCase() === loc
      ) {
        return ev;
      }
    }
  }
  return null;
}

// Returns dates in current month view that an event falls on
function getEventDatesInMonth(
  ev: PortalEvent,
  year: number,
  month: number
): number[] {
  const days: number[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  if (ev.is_recurring && ev.recurrence_day !== null) {
    // Only show occurrences on or after the event's start_date
    const startCutoff = ev.start_date
      ? (() => {
          const s = new Date(ev.start_date);
          return new Date(s.getFullYear(), s.getMonth(), s.getDate());
        })()
      : null;
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      if (startCutoff && date < startCutoff) continue;
      // JS weekday: 0=Sun..6=Sat; our model: 0=Mon..6=Sun
      const jsDay = date.getDay();
      const modelDay = jsDay === 0 ? 6 : jsDay - 1;
      if (modelDay === ev.recurrence_day) days.push(d);
    }
  } else if (ev.start_date) {
    const sd = new Date(ev.start_date);
    if (sd.getFullYear() === year && sd.getMonth() === month) {
      days.push(sd.getDate());
    }
  }
  return days;
}

// ── Component ─────────────────────────────────────────────────────────────────

const PortalKalender: React.FC = () => {
  const qc = useQueryClient();
  const today = new Date();

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<PortalEvent | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [suspensionOpen, setSuspensionOpen] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{
    text: string;
    error: boolean;
  } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [conflictEvent, setConflictEvent] = useState<PortalEvent | null>(null);

  const { data: events = [] } = useQuery('portal-events', portalGetEvents);

  const createMut = useMutation(portalCreateEvent, {
    onSuccess: () => {
      qc.invalidateQueries('portal-events');
      setSaveMsg({ text: 'Evenemang sparat!', error: false });
      setForm(EMPTY_FORM);
      setEditingEvent(null);
      setImageFile(null);
      setImagePreview(null);
      setRemoveImage(false);
      setTimeout(() => setSaveMsg(null), 3000);
    },
    onError: () =>
      setSaveMsg({ text: 'Något gick fel. Försök igen.', error: true }),
  });

  const updateMut = useMutation(
    (data: FormData | Partial<PortalEvent>) =>
      portalUpdateEvent(editingEvent!.id, data),
    {
      onSuccess: () => {
        qc.invalidateQueries('portal-events');
        setSaveMsg({ text: 'Ändringar sparade!', error: false });
        setImageFile(null);
        setImagePreview(null);
        setRemoveImage(false);
        setTimeout(() => setSaveMsg(null), 3000);
      },
      onError: () =>
        setSaveMsg({ text: 'Något gick fel. Försök igen.', error: true }),
    }
  );

  const deleteMut = useMutation((id: number) => portalDeleteEvent(id), {
    onSuccess: (_, deletedId) => {
      qc.invalidateQueries('portal-events');
      // If we deleted the conflicting event, proceed with creating the new one
      if (conflictEvent && deletedId === conflictEvent.id) {
        setConflictEvent(null);
        doActualSubmit();
        return;
      }
      setEditingEvent(null);
      setForm(EMPTY_FORM);
      setSaveMsg({ text: 'Evenemang raderat.', error: false });
      setTimeout(() => setSaveMsg(null), 3000);
    },
  });

  // When selecting an event to edit
  const selectEvent = useCallback((ev: PortalEvent) => {
    setEditingEvent(ev);
    setForm(eventToForm(ev));
    setRegistrationOpen(ev.registration_required);
    setSuspensionOpen(ev.is_suspended);
    setSaveMsg(null);
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(false);
    setConflictEvent(null);
  }, []);

  // When clicking a calendar day — prefill date
  const selectDay = useCallback(
    (dateStr: string) => {
      if (editingEvent) return; // don't override form when editing
      setSelectedDate(dateStr);
      setForm(f => ({ ...f, start_date: dateStr }));
    },
    [editingEvent]
  );

  const clearForm = () => {
    setForm(EMPTY_FORM);
    setEditingEvent(null);
    setSelectedDate(null);
    setRegistrationOpen(false);
    setSuspensionOpen(false);
    setSaveMsg(null);
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(false);
    setConflictEvent(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setRemoveImage(false);
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(true);
  };

  const set =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm(f => ({ ...f, [field]: e.target.value }));

  const toggle = (field: keyof FormState) => () =>
    setForm(f => ({ ...f, [field]: !f[field] }));

  const doActualSubmit = () => {
    setConflictEvent(null);
    const payload = formToPayload(form);
    if (imageFile || removeImage) {
      const fd = new FormData();
      (Object.entries(payload) as [string, unknown][]).forEach(([key, val]) => {
        fd.append(key, val === null || val === undefined ? '' : String(val));
      });
      if (imageFile) fd.append('image', imageFile);
      else fd.append('image', '');
      editingEvent ? updateMut.mutate(fd) : createMut.mutate(fd);
    } else {
      editingEvent ? updateMut.mutate(payload) : createMut.mutate(payload);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveMsg(null);
    const conflict = findConflict(form, events, editingEvent?.id);
    if (conflict) {
      setConflictEvent(conflict);
      return;
    }
    doActualSubmit();
  };

  const handleDelete = () => {
    if (!editingEvent) return;
    if (window.confirm(`Ta bort "${editingEvent.title}"?`))
      deleteMut.mutate(editingEvent.id);
  };

  // ── Calendar grid ────────────────────────────────────────────────────────

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
  // Make Monday = col 0
  const startCol = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

  // Map: day number → events
  const eventsByDay = new Map<number, PortalEvent[]>();
  for (const ev of events) {
    const dates = getEventDatesInMonth(ev, viewYear, viewMonth);
    for (const d of dates) {
      if (!eventsByDay.has(d)) eventsByDay.set(d, []);
      eventsByDay.get(d)!.push(ev);
    }
  }

  const cells: { day: number; current: boolean }[] = [];
  for (let i = 0; i < startCol; i++) {
    cells.push({ day: prevMonthDays - startCol + 1 + i, current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({
      day: cells.length - startCol - daysInMonth + 1,
      current: false,
    });
  }

  const isToday = (d: number) =>
    d === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();

  const cellDateStr = (d: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  // Sorted event list for the left panel
  const sortedEvents = [...events].sort((a, b) => {
    const aDate = a.is_recurring ? 0 : new Date(a.start_date).getTime();
    const bDate = b.is_recurring ? 0 : new Date(b.start_date).getTime();
    return aDate - bDate;
  });

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear(y => y - 1);
      setViewMonth(11);
    } else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear(y => y + 1);
      setViewMonth(0);
    } else setViewMonth(m => m + 1);
  };

  const isLoading = createMut.isLoading || updateMut.isLoading;

  return (
    <KalenderWrapper>
      <PageHeader>
        <PageTitle>Kalender</PageTitle>
        <NewEventButton onClick={clearForm}>
          <svg
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
          >
            <line x1='12' y1='5' x2='12' y2='19' />
            <line x1='5' y1='12' x2='19' y2='12' />
          </svg>
          Nytt evenemang
        </NewEventButton>
      </PageHeader>

      {/* ── Left column ── */}
      <LeftColumn>
        {/* Month calendar */}
        <CalendarCard>
          <CalendarHeader>
            <NavArrow onClick={prevMonth}>
              <svg
                width='12'
                height='12'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                strokeLinecap='round'
              >
                <polyline points='15 18 9 12 15 6' />
              </svg>
            </NavArrow>
            <MonthTitle>
              {SV_MONTHS[viewMonth]} {viewYear}
            </MonthTitle>
            <NavArrow onClick={nextMonth}>
              <svg
                width='12'
                height='12'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                strokeLinecap='round'
              >
                <polyline points='9 18 15 12 9 6' />
              </svg>
            </NavArrow>
          </CalendarHeader>

          <WeekDays>
            {WEEK_LABELS.map(l => (
              <WeekDayLabel key={l}>{l}</WeekDayLabel>
            ))}
          </WeekDays>

          <DaysGrid>
            {cells.map((cell, i) => {
              const dayEvents = cell.current
                ? (eventsByDay.get(cell.day) ?? [])
                : [];
              const ds = cell.current ? cellDateStr(cell.day) : '';
              return (
                <DayCell
                  key={i}
                  $today={cell.current && isToday(cell.day)}
                  $selected={!!ds && ds === selectedDate}
                  $otherMonth={!cell.current}
                  $hasEvents={dayEvents.length > 0}
                  onClick={() => cell.current && selectDay(ds)}
                >
                  <DayNumber
                    $today={cell.current && isToday(cell.day)}
                    $selected={!!ds && ds === selectedDate}
                  >
                    {cell.day}
                  </DayNumber>
                  <DayEvents>
                    {dayEvents.map(ev => {
                      const pillTime = ev.is_recurring
                        ? ev.recurrence_time
                          ? formatTime(ev.recurrence_time)
                          : ''
                        : ev.start_date
                          ? localTimeStr(new Date(ev.start_date))
                          : '';
                      return (
                        <EventPill
                          key={ev.id}
                          $recurring={ev.is_recurring}
                          onClick={e => {
                            e.stopPropagation();
                            selectEvent(ev);
                          }}
                          title={`${ev.title} · ${pillTime} · ${ev.location}`}
                        >
                          <EventPillTitle $recurring={ev.is_recurring}>
                            {ev.title}
                          </EventPillTitle>
                          <EventPillMeta $recurring={ev.is_recurring}>
                            {pillTime}
                            {pillTime && ev.location ? ' · ' : ''}
                            {ev.location}
                          </EventPillMeta>
                        </EventPill>
                      );
                    })}
                  </DayEvents>
                </DayCell>
              );
            })}
          </DaysGrid>
        </CalendarCard>

        {/* ── Event list ── */}
        <EventListCard>
          {/* Recurring events — grouped by weekday Mon → Sun */}
          {(() => {
            const recurring = events.filter(ev => ev.is_recurring);
            if (recurring.length === 0) return null;

            // Build map: recurrence_day (0–6) → events sorted by time
            const byDay = new Map<number, typeof recurring>();
            for (const ev of recurring) {
              const day = ev.recurrence_day ?? 0;
              if (!byDay.has(day)) byDay.set(day, []);
              byDay.get(day)!.push(ev);
            }
            Array.from(byDay.values()).forEach(evs =>
              evs.sort((a: PortalEvent, b: PortalEvent) =>
                (a.recurrence_time ?? '').localeCompare(b.recurrence_time ?? '')
              )
            );

            // Days present, in Mon-Sun order (0=Mon … 6=Sun in our model)
            const orderedDays = [0, 1, 2, 3, 4, 5, 6].filter(d => byDay.has(d));

            return (
              <>
                <SectionLabel>
                  Återkommande
                  <SectionCount>{recurring.length}</SectionCount>
                </SectionLabel>
                <RecurringGrid>
                  {orderedDays.map(day => {
                    const dayEvs = byDay.get(day)!;
                    const dayLabel =
                      DAYS_OF_WEEK.find(d => d.value === String(day))?.label ??
                      '—';
                    return (
                      <RecurringDayGroup key={day}>
                        <RecurringDayHeader>{dayLabel}</RecurringDayHeader>
                        {dayEvs.map(ev => {
                          const sel = editingEvent?.id === ev.id;
                          return (
                            <RecurringCard
                              key={ev.id}
                              $selected={sel}
                              onClick={() => selectEvent(ev)}
                            >
                              <RecurringCardTitle $selected={sel}>
                                {ev.title}
                                {!ev.is_active && (
                                  <InactiveBadge style={{ marginLeft: 4 }}>
                                    Inaktiv
                                  </InactiveBadge>
                                )}
                              </RecurringCardTitle>
                              {ev.recurrence_time && (
                                <RecurringCardTime $selected={sel}>
                                  kl. {formatTime(ev.recurrence_time)}
                                </RecurringCardTime>
                              )}
                              <RecurringCardLocation $selected={sel}>
                                {ev.location}
                              </RecurringCardLocation>
                            </RecurringCard>
                          );
                        })}
                      </RecurringDayGroup>
                    );
                  })}
                </RecurringGrid>
              </>
            );
          })()}

          {/* One-time events — grouped by month */}
          {(() => {
            const oneTime = sortedEvents.filter(ev => !ev.is_recurring);
            if (oneTime.length === 0) return null;

            // Group by "YYYY-MM"
            const groups = new Map<string, typeof oneTime>();
            for (const ev of oneTime) {
              const d = new Date(ev.start_date);
              const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
              if (!groups.has(key)) groups.set(key, []);
              groups.get(key)!.push(ev);
            }

            return (
              <>
                <SectionLabel>
                  Enskilda evenemang
                  <SectionCount>{oneTime.length}</SectionCount>
                </SectionLabel>
                {Array.from(groups.entries()).map(([key, evs]) => {
                  const [y, m] = key.split('-');
                  const monthName = SV_MONTHS[parseInt(m) - 1];
                  return (
                    <div key={key}>
                      <MonthGroupLabel>
                        {monthName} {y}
                      </MonthGroupLabel>
                      {evs.map(ev => {
                        const d = new Date(ev.start_date);
                        const sel = editingEvent?.id === ev.id;
                        const dow = SV_DAYS_FULL[d.getDay()].slice(0, 3);
                        return (
                          <EventListItem
                            key={ev.id}
                            $selected={sel}
                            onClick={() => selectEvent(ev)}
                          >
                            <EventDateCol>
                              <EventDateNum $selected={sel}>
                                {d.getDate()}
                              </EventDateNum>
                              <EventDateDow>{dow}</EventDateDow>
                            </EventDateCol>
                            <EventListInfo>
                              <EventListTitle>{ev.title}</EventListTitle>
                              <EventListMeta>
                                <span>{localTimeStr(d)}</span>
                                <MetaDot />
                                <span>{ev.location}</span>
                                {!ev.is_active && (
                                  <InactiveBadge>Inaktiv</InactiveBadge>
                                )}
                              </EventListMeta>
                              {ev.created_by_name && (
                                <EventListAuthor>
                                  <svg
                                    width='9'
                                    height='9'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                  >
                                    <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                                    <circle cx='12' cy='7' r='4' />
                                  </svg>
                                  {ev.created_by_name}
                                </EventListAuthor>
                              )}
                            </EventListInfo>
                          </EventListItem>
                        );
                      })}
                    </div>
                  );
                })}
              </>
            );
          })()}
        </EventListCard>
      </LeftColumn>

      {/* ── Right column: Form ── */}
      <FormCard>
        <FormCardHeader>
          <FormCardTitle>
            {editingEvent ? 'Redigera evenemang' : 'Nytt evenemang'}
          </FormCardTitle>
          {editingEvent && (
            <FormClearButton onClick={clearForm}>✕ Avbryt</FormClearButton>
          )}
        </FormCardHeader>

        <form onSubmit={handleSubmit}>
          <FormBody>
            {/* Grundläggande */}
            <FormSection>
              <FormSectionTitle>Grundläggande</FormSectionTitle>
              <FieldGroup>
                <FieldLabel htmlFor='title'>
                  Titel <span>*</span>
                </FieldLabel>
                <FieldInput
                  id='title'
                  value={form.title}
                  onChange={set('title')}
                  required
                  placeholder='Namn på evenemanget'
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel htmlFor='description'>
                  Beskrivning <span>*</span>
                </FieldLabel>
                <FieldTextarea
                  id='description'
                  value={form.description}
                  onChange={set('description')}
                  required
                  placeholder='Beskriv evenemanget...'
                />
              </FieldGroup>
              <FieldRow>
                <FieldGroup>
                  <FieldLabel htmlFor='location'>
                    Plats <span>*</span>
                  </FieldLabel>
                  <FieldInput
                    id='location'
                    value={form.location}
                    onChange={set('location')}
                    required
                    placeholder='t.ex. Pingstkyrkan Elim'
                  />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel htmlFor='contact_person'>
                    Kontaktperson
                  </FieldLabel>
                  <FieldInput
                    id='contact_person'
                    value={form.contact_person}
                    onChange={set('contact_person')}
                    placeholder='Namn'
                  />
                </FieldGroup>
              </FieldRow>
            </FormSection>

            {/* Datum & tid */}
            <FormSection>
              <FormSectionTitle>Datum & tid</FormSectionTitle>
              <FieldGroup>
                <FieldLabel>
                  Startdatum <span>*</span>
                </FieldLabel>
                <FieldRow>
                  <FieldInput
                    type='date'
                    value={form.start_date}
                    onChange={set('start_date')}
                    required
                  />
                  <FieldInput
                    type='time'
                    value={form.start_time}
                    onChange={set('start_time')}
                  />
                </FieldRow>
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Slutdatum</FieldLabel>
                <FieldRow>
                  <FieldInput
                    type='date'
                    value={form.end_date}
                    onChange={set('end_date')}
                  />
                  <FieldInput
                    type='time'
                    value={form.end_time}
                    onChange={set('end_time')}
                  />
                </FieldRow>
              </FieldGroup>
            </FormSection>

            {/* Återkommande */}
            <FormSectionToggle
              type='button'
              $open={form.is_recurring}
              onClick={() => {
                setForm(f => ({ ...f, is_recurring: !f.is_recurring }));
              }}
            >
              Återkommande evenemang
              <svg
                width='12'
                height='12'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                strokeLinecap='round'
              >
                <polyline points='6 9 12 15 18 9' />
              </svg>
            </FormSectionToggle>
            <FormSectionContent $open={form.is_recurring}>
              <FieldGroup>
                <FieldLabel>
                  Veckodag <span>*</span>
                </FieldLabel>
                <FieldSelect
                  value={form.recurrence_day}
                  onChange={set('recurrence_day')}
                >
                  <option value=''>Välj dag</option>
                  {DAYS_OF_WEEK.map(d => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </FieldSelect>
              </FieldGroup>
              <FieldRow>
                <FieldGroup>
                  <FieldLabel>Starttid</FieldLabel>
                  <FieldInput
                    type='time'
                    value={form.recurrence_time}
                    onChange={set('recurrence_time')}
                  />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Längd (min)</FieldLabel>
                  <FieldInput
                    type='number'
                    value={form.recurrence_duration_minutes}
                    onChange={set('recurrence_duration_minutes')}
                    placeholder='90'
                    min='0'
                  />
                </FieldGroup>
              </FieldRow>

              {/* Suspension */}
              <FormSectionToggle
                type='button'
                $open={suspensionOpen}
                onClick={() => setSuspensionOpen(o => !o)}
                style={{ marginTop: '0.6rem' }}
              >
                Avbrott / semester
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                >
                  <polyline points='6 9 12 15 18 9' />
                </svg>
              </FormSectionToggle>
              <FormSectionContent $open={suspensionOpen}>
                <CheckboxRow>
                  <input
                    type='checkbox'
                    checked={form.is_suspended}
                    onChange={toggle('is_suspended')}
                  />
                  Tillfälligt inställt
                </CheckboxRow>
                {form.is_suspended && (
                  <FieldGroup>
                    <FieldLabel>Återupptas (datum)</FieldLabel>
                    <FieldInput
                      type='date'
                      value={form.suspended_until}
                      onChange={set('suspended_until')}
                    />
                  </FieldGroup>
                )}
              </FormSectionContent>
            </FormSectionContent>

            {/* Inslag */}
            <FormSection>
              <FormSectionTitle>Inslag</FormSectionTitle>
              <CheckboxRow>
                <input
                  type='checkbox'
                  checked={form.has_sunday_school}
                  onChange={toggle('has_sunday_school')}
                />
                Söndagsskola
              </CheckboxRow>
              <CheckboxRow>
                <input
                  type='checkbox'
                  checked={form.has_communion}
                  onChange={toggle('has_communion')}
                />
                Nattvard
              </CheckboxRow>
            </FormSection>

            {/* Anmälan */}
            <FormSectionToggle
              type='button'
              $open={registrationOpen}
              onClick={() => setRegistrationOpen(o => !o)}
            >
              Anmälan
              <svg
                width='12'
                height='12'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                strokeLinecap='round'
              >
                <polyline points='6 9 12 15 18 9' />
              </svg>
            </FormSectionToggle>
            <FormSectionContent $open={registrationOpen}>
              <CheckboxRow>
                <input
                  type='checkbox'
                  checked={form.registration_required}
                  onChange={toggle('registration_required')}
                />
                Anmälan krävs
              </CheckboxRow>
              {form.registration_required && (
                <>
                  <FieldGroup>
                    <FieldLabel>Max deltagare</FieldLabel>
                    <FieldInput
                      type='number'
                      value={form.max_participants}
                      onChange={set('max_participants')}
                      placeholder='Lämna tomt för obegränsat'
                      min='1'
                    />
                  </FieldGroup>
                  <FieldGroup>
                    <FieldLabel>Anmälningsinformation</FieldLabel>
                    <FieldTextarea
                      value={form.registration_info}
                      onChange={set('registration_info')}
                      placeholder='Kontakt, länk, deadline...'
                    />
                  </FieldGroup>
                </>
              )}
            </FormSectionContent>

            {/* Bild */}
            <FormSection>
              <FormSectionTitle>Bild</FormSectionTitle>
              <FieldGroup>
                {(() => {
                  const existingUrl =
                    !removeImage && !imagePreview && editingEvent?.image
                      ? editingEvent.image
                      : null;
                  const previewSrc = imagePreview ?? existingUrl;
                  return (
                    <>
                      <ImageUploadArea
                        $hasImage={!!previewSrc}
                        htmlFor='event-image-input'
                      >
                        {previewSrc ? (
                          <ImagePreview
                            src={previewSrc}
                            alt='Förhandsgranskning'
                          />
                        ) : (
                          <ImageUploadPlaceholder>
                            <svg
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                            >
                              <rect x='3' y='3' width='18' height='18' rx='2' />
                              <circle cx='8.5' cy='8.5' r='1.5' />
                              <polyline points='21 15 16 10 5 21' />
                            </svg>
                            <span>Klicka för att ladda upp bild</span>
                            <span style={{ fontSize: '0.68rem', opacity: 0.6 }}>
                              JPG, PNG, WEBP
                            </span>
                          </ImageUploadPlaceholder>
                        )}
                        <input
                          id='event-image-input'
                          type='file'
                          accept='image/*'
                          onChange={handleImageChange}
                        />
                      </ImageUploadArea>
                      {previewSrc && (
                        <ImageActions>
                          <ImageActionBtn
                            type='button'
                            as='label'
                            htmlFor='event-image-input'
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
                    </>
                  );
                })()}
              </FieldGroup>
            </FormSection>

            {/* Status */}
            <FormSection>
              <FormSectionTitle>Status</FormSectionTitle>
              <CheckboxRow>
                <input
                  type='checkbox'
                  checked={form.is_active}
                  onChange={toggle('is_active')}
                />
                Aktiv (visas på webbplatsen)
              </CheckboxRow>
            </FormSection>
          </FormBody>

          <FormFooter>
            {conflictEvent && (
              <ConflictBox>
                <ConflictTitle>
                  <svg
                    width='13'
                    height='13'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2.5'
                    strokeLinecap='round'
                  >
                    <path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0-3.42 0z' />
                    <line x1='12' y1='9' x2='12' y2='13' />
                    <line x1='12' y1='17' x2='12.01' y2='17' />
                  </svg>
                  Tidskollision
                </ConflictTitle>
                <ConflictBody>
                  <strong>{conflictEvent.title}</strong> är redan planerat vid
                  samma tid.
                </ConflictBody>
                <ConflictMeta>{formatFullDate(conflictEvent)}</ConflictMeta>
                <ConflictActions>
                  <ConflictForceBtn type='button' onClick={doActualSubmit}>
                    Spara ändå
                  </ConflictForceBtn>
                  <ConflictDeleteBtn
                    type='button'
                    onClick={() => {
                      if (
                        window.confirm(
                          `Ta bort "${conflictEvent.title}" och skapa det nya evenemanget?`
                        )
                      )
                        deleteMut.mutate(conflictEvent.id);
                    }}
                  >
                    Ta bort kolliderande
                  </ConflictDeleteBtn>
                  <ConflictCancelBtn
                    type='button'
                    onClick={() => setConflictEvent(null)}
                  >
                    Avbryt
                  </ConflictCancelBtn>
                </ConflictActions>
              </ConflictBox>
            )}
            {saveMsg && (
              <FormMessage $error={saveMsg.error}>{saveMsg.text}</FormMessage>
            )}
            <SaveButton
              type='submit'
              $loading={isLoading}
              disabled={isLoading || !!conflictEvent}
            >
              {isLoading
                ? 'Sparar...'
                : editingEvent
                  ? 'Spara ändringar'
                  : 'Skapa evenemang'}
            </SaveButton>
            {editingEvent && (
              <DeleteButton type='button' onClick={handleDelete}>
                Ta bort evenemang
              </DeleteButton>
            )}
          </FormFooter>
        </form>
      </FormCard>
    </KalenderWrapper>
  );
};

export default PortalKalender;
