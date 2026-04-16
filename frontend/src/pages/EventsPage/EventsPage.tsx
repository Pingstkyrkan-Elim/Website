import {
  IconBookOpen as BookOpen,
  IconCalendar as Calendar,
  IconClipboardList as ClipboardList,
  IconClock as Clock,
  IconHeart as Heart,
  IconMapPin as MapPin,
  IconPauseCircle as PauseCircle,
  IconPrinter as Printer,
  IconRefreshCw as RefreshCw,
  IconTimer as Timer,
  IconUser as User,
  IconX as X,
} from '../../components/Icons';
import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { getEvents } from '../../services/api';
import { Event } from '../../types';
import {
  CalendarContainer,
  CalendarDay,
  CalendarEvent,
  CalendarEventTime,
  CalendarEventTitle,
  CalendarGrid,
  CalendarHeader,
  CalendarNavBar,
  ContentSection,
  ContentWrapper,
  DayHeader,
  DayNumber,
  EventCard,
  EventCommunion,
  EventContent,
  EventCTA,
  EventDescription,
  EventImage,
  EventLocation,
  EventMeta,
  EventsContainer,
  EventsGrid,
  EventSundaySchool,
  EventTime,
  EventTitle,
  HeroSection,
  HeroSubtitle,
  HeroTitle,
  ListDayCount,
  ListDayDate,
  ListDayHeader,
  ListDayLabel,
  ListDaySection,
  ListDayWeekday,
  LoadingSpinner,
  ModalBadge,
  ModalBadgeRow,
  ModalBody,
  ModalCard,
  ModalCloseButton,
  ModalDescription,
  ModalHeader,
  ModalMetaItem,
  ModalMetaRow,
  ModalOverlay,
  ModalSection,
  ModalSectionText,
  ModalSectionTitle,
  ModalTitle,
  MonthNavButton,
  MonthNavigation,
  MonthTitle,
  NoEventsMessage,
  PrintArea,
  PrintButton,
  PrintChurchName,
  PrintDayBlock,
  PrintDayName,
  PrintEventName,
  PrintEventRow,
  PrintEventTag,
  PrintEventTime,
  PrintFooter,
  PrintFooterText,
  PrintHeader,
  PrintMonthTitle,
  PrintStyles,
  PrintWeekBlock,
  PrintWeekHeader,
  PrintWeekNumber,
  PrintWeekRange,
  PrintWeeksGrid,
  SuspendedBanner,
  ViewToggle,
  ViewToggleButton,
} from './EventsPage.styles';

type ViewMode = 'list' | 'calendar';

// JS getDay() 0=Sun…6=Sat  →  model recurrence_day 0=Mon…6=Sun
const jsToModelDay = (jsDay: number): number => (jsDay + 6) % 7;

const DAY_NAMES = [
  'Måndag',
  'Tisdag',
  'Onsdag',
  'Torsdag',
  'Fredag',
  'Lördag',
  'Söndag',
];

// ── EventModal ──────────────────────────────────────────────────────────────

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const open = event !== null;

  const formatDateFull = (iso: string) =>
    new Date(iso).toLocaleDateString('sv-SE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const formatTimeHHMM = (t: string) => t.slice(0, 5);

  const getDisplayTime = (ev: Event) =>
    ev.is_recurring && ev.recurrence_time
      ? formatTimeHHMM(ev.recurrence_time)
      : new Date(ev.start_date).toLocaleTimeString('sv-SE', {
          hour: '2-digit',
          minute: '2-digit',
        });

  return (
    <ModalOverlay $open={open} onClick={onClose}>
      <ModalCard $open={open} onClick={e => e.stopPropagation()}>
        {event && (
          <>
            <ModalHeader>
              <ModalTitle>{event.title}</ModalTitle>

              <ModalBadgeRow>
                {event.is_recurring && (
                  <ModalBadge $variant='green'>
                    <RefreshCw size={11} /> Varje{' '}
                    {DAY_NAMES[event.recurrence_day ?? 0]}
                  </ModalBadge>
                )}
                {event.has_sunday_school && (
                  <ModalBadge $variant='blue'>Söndagsskolan</ModalBadge>
                )}
                {event.has_communion && (
                  <ModalBadge $variant='purple'>Nattvard</ModalBadge>
                )}
                {event.registration_required && (
                  <ModalBadge $variant='blue'>Anmälan krävs</ModalBadge>
                )}
                {event.is_suspended && (
                  <ModalBadge $variant='orange'>
                    Suspenderat
                    {event.suspended_until
                      ? ` till ${event.suspended_until}`
                      : ''}
                  </ModalBadge>
                )}
                {event.max_participants && (
                  <ModalBadge>Max {event.max_participants} pers.</ModalBadge>
                )}
              </ModalBadgeRow>

              <ModalCloseButton onClick={onClose} aria-label='Stäng'>
                <X size={16} />
              </ModalCloseButton>
            </ModalHeader>

            <ModalBody>
              {/* Meta: date/time/location */}
              <ModalMetaRow>
                <ModalMetaItem>
                  <Calendar size={15} />
                  {event.is_recurring
                    ? `Varje ${DAY_NAMES[event.recurrence_day ?? 0]}`
                    : formatDateFull(event.start_date)}
                </ModalMetaItem>
                <ModalMetaItem>
                  <Clock size={15} /> {getDisplayTime(event)}
                </ModalMetaItem>
                {event.recurrence_duration_minutes && (
                  <ModalMetaItem>
                    <Timer size={15} /> {event.recurrence_duration_minutes} min
                  </ModalMetaItem>
                )}
                <ModalMetaItem>
                  <MapPin size={15} /> {event.location}
                </ModalMetaItem>
                {event.contact_person && (
                  <ModalMetaItem>
                    <User size={15} /> {event.contact_person}
                  </ModalMetaItem>
                )}
              </ModalMetaRow>

              {/* Description */}
              <ModalDescription>{event.description}</ModalDescription>

              {/* Suspension notice */}
              {event.is_suspended && (
                <ModalSection $variant='suspended'>
                  <ModalSectionTitle>
                    <PauseCircle size={14} /> Tillfälligt suspenderat
                  </ModalSectionTitle>
                  <ModalSectionText>
                    {event.suspended_until
                      ? `Denna aktivitet är pausad och återupptas ${event.suspended_until}.`
                      : 'Denna aktivitet är tillsvidare pausad. Håll utkik för uppdateringar!'}
                  </ModalSectionText>
                </ModalSection>
              )}

              {/* Registration info */}
              {event.registration_required && (
                <ModalSection $variant='registration'>
                  <ModalSectionTitle>
                    <ClipboardList size={14} /> Anmälan
                  </ModalSectionTitle>
                  <ModalSectionText>
                    {event.registration_info
                      ? event.registration_info
                      : 'Kontakta oss för mer information om hur du anmäler dig.'}
                  </ModalSectionText>
                </ModalSection>
              )}
            </ModalBody>
          </>
        )}
      </ModalCard>
    </ModalOverlay>
  );
};

// ── Main page ───────────────────────────────────────────────────────────────

const EventsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { data: events, isLoading } = useQuery({
    queryKey: ['events', 'all'],
    queryFn: () => getEvents(false),
  });

  const openModal = useCallback((event: Event) => setSelectedEvent(event), []);
  const closeModal = useCallback(() => setSelectedEvent(null), []);

  // ── Formatting ──────────────────────────────────────────────────────────

  const getEventDisplayTime = (event: Event): string => {
    if (event.is_recurring && event.recurrence_time)
      return event.recurrence_time.slice(0, 5);
    return new Date(event.start_date).toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCurrentMonth = () =>
    currentDate.toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' });

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + (direction === 'next' ? 1 : -1));
      return d;
    });
  };

  // ── Recurrence helpers ──────────────────────────────────────────────────

  const isRecurringActiveOnDate = (event: Event, date: Date): boolean => {
    if (!event.is_recurring || event.recurrence_day === null) return false;
    const startDate = new Date(event.start_date);
    startDate.setHours(0, 0, 0, 0);
    const check = new Date(date);
    check.setHours(0, 0, 0, 0);
    if (check < startDate) return false;
    if (jsToModelDay(date.getDay()) !== event.recurrence_day) return false;
    if (event.is_suspended) {
      if (!event.suspended_until) return false;
      const resume = new Date(event.suspended_until);
      resume.setHours(0, 0, 0, 0);
      if (check < resume) return false;
    }
    return true;
  };

  // ── Calendar helpers ────────────────────────────────────────────────────

  const getDaysInMonth = (date: Date): Date[] => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const start = new Date(firstDay);
    const dow = firstDay.getDay();
    start.setDate(start.getDate() + (dow === 0 ? -6 : -(dow - 1)));
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const getEventsForDate = (date: Date): Event[] => {
    if (!events) return [];
    return events.filter(ev =>
      ev.is_recurring
        ? isRecurringActiveOnDate(ev, date)
        : new Date(ev.start_date).toDateString() === date.toDateString()
    );
  };

  const isToday = (d: Date) => d.toDateString() === new Date().toDateString();
  const isCurrentMonth = (d: Date) => d.getMonth() === currentDate.getMonth();

  // ── Week helpers (list view) ────────────────────────────────────────────

  const getWeekBounds = (): { monday: Date; sunday: Date } => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const jsDay = today.getDay();
    const mondayOffset = jsDay === 0 ? -6 : 1 - jsDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset + weekOffset * 7);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
    return { monday, sunday };
  };

  const getISOWeekNumber = (date: Date): number => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
    const yearStart = new Date(d.getFullYear(), 0, 4);
    return (
      1 +
      Math.round(
        ((d.getTime() - yearStart.getTime()) / 86400000 -
          3 +
          ((yearStart.getDay() + 6) % 7)) /
          7
      )
    );
  };

  const getWeekEvents = (): Array<{
    event: Event;
    occurrenceDate: Date;
    isSuspended: boolean;
  }> => {
    if (!events) return [];
    const { monday, sunday } = getWeekBounds();
    const result: Array<{
      event: Event;
      occurrenceDate: Date;
      isSuspended: boolean;
    }> = [];

    events.forEach(ev => {
      if (ev.is_recurring && ev.recurrence_day !== null) {
        // Always show in list even if suspended — just flag it
        const occurrenceDate = new Date(monday);
        occurrenceDate.setDate(monday.getDate() + ev.recurrence_day);
        if (occurrenceDate > sunday) return;

        const startDate = new Date(ev.start_date);
        startDate.setHours(0, 0, 0, 0);
        if (occurrenceDate < startDate) return;

        const isSuspended =
          ev.is_suspended &&
          (!ev.suspended_until ||
            new Date(ev.suspended_until) > occurrenceDate);
        result.push({ event: ev, occurrenceDate, isSuspended });
      } else {
        const d = new Date(ev.start_date);
        if (d >= monday && d <= sunday) {
          result.push({ event: ev, occurrenceDate: d, isSuspended: false });
        }
      }
    });

    result.sort(
      (a, b) => a.occurrenceDate.getTime() - b.occurrenceDate.getTime()
    );
    return result;
  };

  // ── Print helpers ───────────────────────────────────────────────────────

  const buildPrintData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const weekMap = new Map<
      number,
      {
        weekNumber: number;
        weekLabel: string;
        days: Array<{ date: Date; dayName: string; events: Event[] }>;
      }
    >();

    const d = new Date(firstDay);
    while (d <= lastDay) {
      const weekNum = getISOWeekNumber(d);
      const modelDay = jsToModelDay(d.getDay());
      const dayEvents = getEventsForDate(new Date(d));

      if (!weekMap.has(weekNum)) {
        const mon = new Date(d);
        const dow = d.getDay();
        mon.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1));
        const sun = new Date(mon);
        sun.setDate(mon.getDate() + 6);
        const fmt = (dt: Date) =>
          dt.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' });
        weekMap.set(weekNum, {
          weekNumber: weekNum,
          weekLabel: `${fmt(mon)} – ${fmt(sun)}`,
          days: [],
        });
      }

      if (dayEvents.length > 0) {
        weekMap.get(weekNum)!.days.push({
          date: new Date(d),
          dayName: DAY_NAMES[modelDay],
          events: dayEvents,
        });
      }

      d.setDate(d.getDate() + 1);
    }

    return Array.from(weekMap.values()).filter(w => w.days.length > 0);
  };

  const renderPrintContent = () => {
    const weeks = buildPrintData();
    const monthLabel = currentDate.toLocaleDateString('sv-SE', {
      month: 'long',
      year: 'numeric',
    });

    return (
      <PrintArea id='print-calendar'>
        <PrintHeader>
          <PrintChurchName>Pingstkyrkan Elim</PrintChurchName>
          <PrintMonthTitle>
            Evenemang —{' '}
            {monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1)}
          </PrintMonthTitle>
        </PrintHeader>

        {weeks.length === 0 && (
          <p style={{ fontStyle: 'italic', color: '#7a5828' }}>
            Inga evenemang denna månad.
          </p>
        )}

        <PrintWeeksGrid>
          {weeks.map(({ weekNumber, weekLabel, days }) => (
            <PrintWeekBlock key={weekNumber}>
              <PrintWeekHeader>
                <PrintWeekNumber>Vecka {weekNumber}</PrintWeekNumber>
                <PrintWeekRange>{weekLabel}</PrintWeekRange>
              </PrintWeekHeader>

              {days.map(({ date, dayName, events }) => (
                <PrintDayBlock key={date.toDateString()}>
                  <PrintDayName>
                    {dayName} {date.getDate()}{' '}
                    {date.toLocaleDateString('sv-SE', { month: 'long' })}
                  </PrintDayName>

                  {events.map(ev => (
                    <PrintEventRow key={ev.id}>
                      <PrintEventTime>{getEventDisplayTime(ev)}</PrintEventTime>
                      <PrintEventName>{ev.title}</PrintEventName>
                      {ev.has_sunday_school && (
                        <PrintEventTag
                          $bg='rgba(42,90,106,0.1)'
                          $color='#2a5a6a'
                        >
                          Söndagsskolan
                        </PrintEventTag>
                      )}
                      {ev.has_communion && (
                        <PrintEventTag
                          $bg='rgba(122,58,160,0.1)'
                          $color='#7a3aa0'
                        >
                          Nattvard
                        </PrintEventTag>
                      )}
                      {ev.registration_required && (
                        <PrintEventTag
                          $bg='rgba(160,80,32,0.1)'
                          $color='#a05020'
                        >
                          Anmälan krävs
                        </PrintEventTag>
                      )}
                    </PrintEventRow>
                  ))}
                </PrintDayBlock>
              ))}
            </PrintWeekBlock>
          ))}
        </PrintWeeksGrid>

        <PrintFooter>
          <PrintFooterText>
            Pingstkyrkan Elim · Varmt välkommen!
          </PrintFooterText>
        </PrintFooter>
      </PrintArea>
    );
  };

  // ── Renderers ───────────────────────────────────────────────────────────

  const dayHeaders = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

  const renderViewToggle = () => (
    <ViewToggle>
      <ViewToggleButton
        $isActive={viewMode === 'list'}
        onClick={() => setViewMode('list')}
      >
        Lista
      </ViewToggleButton>
      <ViewToggleButton
        $isActive={viewMode === 'calendar'}
        onClick={() => setViewMode('calendar')}
      >
        Kalender
      </ViewToggleButton>
    </ViewToggle>
  );

  const renderCalendarView = () => (
    <>
      <CalendarNavBar>
        <MonthNavigation>
          <MonthNavButton onClick={() => navigateMonth('prev')}>
            ←
          </MonthNavButton>
          <MonthTitle>{getCurrentMonth()}</MonthTitle>
          <MonthNavButton onClick={() => navigateMonth('next')}>
            →
          </MonthNavButton>
        </MonthNavigation>
        <ViewToggle>
          <ViewToggleButton
            $isActive={viewMode === 'list'}
            onClick={() => setViewMode('list')}
          >
            Lista
          </ViewToggleButton>
          <ViewToggleButton
            $isActive={viewMode === 'calendar'}
            onClick={() => setViewMode('calendar')}
          >
            Kalender
          </ViewToggleButton>
          <PrintButton
            onClick={() => window.print()}
            title='Skriv ut månadskalender'
          >
            <Printer size={15} />
          </PrintButton>
        </ViewToggle>
      </CalendarNavBar>

      <CalendarGrid>
        {dayHeaders.map(d => (
          <DayHeader key={d}>{d}</DayHeader>
        ))}

        {getDaysInMonth(currentDate).map((day, i) => {
          const dayEvents = getEventsForDate(day);
          return (
            <CalendarDay
              key={i}
              $isCurrentMonth={isCurrentMonth(day)}
              $isToday={isToday(day)}
              $hasEvents={dayEvents.length > 0}
            >
              <DayNumber $isToday={isToday(day)}>{day.getDate()}</DayNumber>
              {dayEvents.map(ev => (
                <CalendarEvent
                  key={`${ev.id}-${day.toDateString()}`}
                  onClick={e => {
                    e.stopPropagation();
                    openModal(ev);
                  }}
                  title={ev.is_recurring ? 'Återkommande' : undefined}
                >
                  <CalendarEventTitle>
                    {ev.is_recurring && (
                      <RefreshCw
                        size={9}
                        style={{ marginRight: '2px', flexShrink: 0 }}
                      />
                    )}
                    {ev.title}
                  </CalendarEventTitle>
                  <CalendarEventTime>
                    {getEventDisplayTime(ev)}
                  </CalendarEventTime>
                </CalendarEvent>
              ))}
            </CalendarDay>
          );
        })}
      </CalendarGrid>
    </>
  );

  const renderListView = () => {
    const weekEntries = getWeekEvents();
    const { monday } = getWeekBounds();
    const weekNumber = getISOWeekNumber(monday);
    const weekLabel =
      weekOffset === 0
        ? 'Denna vecka'
        : weekOffset === 1
          ? 'Nästa vecka'
          : `Om ${weekOffset} veckor`;

    return (
      <>
        <CalendarHeader>
          <MonthNavigation>
            <MonthNavButton
              onClick={() => setWeekOffset(w => w - 1)}
              disabled={weekOffset === 0}
            >
              ←
            </MonthNavButton>
            <MonthTitle>
              Vecka {weekNumber}
              <span
                style={{
                  fontSize: '0.8em',
                  fontWeight: 400,
                  opacity: 0.7,
                  marginLeft: '0.5rem',
                }}
              >
                — {weekLabel}
              </span>
            </MonthTitle>
            <MonthNavButton onClick={() => setWeekOffset(w => w + 1)}>
              →
            </MonthNavButton>
          </MonthNavigation>
          {renderViewToggle()}
        </CalendarHeader>

        <EventsGrid>
          {isLoading && <LoadingSpinner />}

          {!isLoading && weekEntries.length === 0 && (
            <NoEventsMessage>
              <h3>Inga evenemang denna vecka</h3>
              <p>Byt till kalendervy för att se kommande månader!</p>
            </NoEventsMessage>
          )}

          {(() => {
            const dayGroups = weekEntries.reduce<
              Array<{ date: Date; entries: typeof weekEntries }>
            >((acc, entry) => {
              const key = entry.occurrenceDate.toDateString();
              const existing = acc.find(g => g.date.toDateString() === key);
              if (existing) {
                existing.entries.push(entry);
              } else {
                acc.push({ date: entry.occurrenceDate, entries: [entry] });
              }
              return acc;
            }, []);

            const WEEKDAY_NAMES = [
              'Söndag',
              'Måndag',
              'Tisdag',
              'Onsdag',
              'Torsdag',
              'Fredag',
              'Lördag',
            ];

            return dayGroups.map(({ date, entries }) => (
              <ListDaySection key={date.toDateString()}>
                <ListDayHeader>
                  <ListDayLabel>
                    <ListDayWeekday>
                      {WEEKDAY_NAMES[date.getDay()]}
                    </ListDayWeekday>
                    <ListDayDate>
                      {date.toLocaleDateString('sv-SE', {
                        day: 'numeric',
                        month: 'long',
                      })}
                    </ListDayDate>
                  </ListDayLabel>
                  {entries.length > 1 && (
                    <ListDayCount>{entries.length} evenemang</ListDayCount>
                  )}
                </ListDayHeader>

                {entries.map(({ event, occurrenceDate, isSuspended }) => (
                  <EventCard
                    key={`${event.id}-${occurrenceDate.toDateString()}`}
                    onClick={() => openModal(event)}
                    style={{ opacity: isSuspended ? 0.65 : 1 }}
                  >
                    <EventImage $backgroundImage={event.image} />
                    <EventContent>
                      <EventTitle>
                        {event.is_recurring && (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              fontSize: '0.72rem',
                              color: '#4a7a4a',
                              fontWeight: 600,
                              marginRight: '0.4rem',
                            }}
                          >
                            <RefreshCw size={10} /> Varje vecka
                          </span>
                        )}
                        {event.title}
                      </EventTitle>

                      <EventDescription>{event.description}</EventDescription>

                      {isSuspended && (
                        <SuspendedBanner>
                          <PauseCircle size={14} />
                          {event.suspended_until
                            ? `Suspenderat — återupptas ${event.suspended_until}`
                            : 'Tillsvidare suspenderat'}
                        </SuspendedBanner>
                      )}

                      <EventMeta>
                        <EventLocation>
                          <MapPin size={13} />
                          {event.location}
                        </EventLocation>
                        <EventTime>
                          <Clock size={13} />
                          {getEventDisplayTime(event)}
                        </EventTime>
                        {event.has_sunday_school && (
                          <EventSundaySchool>
                            <BookOpen size={13} />
                            Söndagsskolan
                          </EventSundaySchool>
                        )}
                        {event.has_communion && (
                          <EventCommunion>
                            <Heart size={13} />
                            Nattvard
                          </EventCommunion>
                        )}
                      </EventMeta>

                      <EventCTA
                        onClick={e => {
                          e.stopPropagation();
                          openModal(event);
                        }}
                      >
                        {event.registration_required && !isSuspended
                          ? 'Anmäl dig'
                          : 'Läs mer'}
                      </EventCTA>
                    </EventContent>
                  </EventCard>
                ))}
              </ListDaySection>
            ));
          })()}
        </EventsGrid>
      </>
    );
  };

  return (
    <>
      <PrintStyles />
      <EventsContainer>
        <HeroSection>
          <HeroTitle>Evenemang & Kalender</HeroTitle>
          <HeroSubtitle>
            Upptäck kommande evenemang och aktiviteter i vår församling. Vi
            välkomnar dig att vara med i vårt gemenskap!
          </HeroSubtitle>
        </HeroSection>

        <ContentWrapper>
          <ContentSection>
            <CalendarContainer>
              {viewMode === 'calendar'
                ? renderCalendarView()
                : renderListView()}
            </CalendarContainer>
          </ContentSection>
        </ContentWrapper>

        <EventModal event={selectedEvent} onClose={closeModal} />
      </EventsContainer>

      {renderPrintContent()}
    </>
  );
};

export default EventsPage;
