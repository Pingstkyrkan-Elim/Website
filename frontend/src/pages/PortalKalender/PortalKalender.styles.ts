import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const KalenderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 1.6rem;
  align-items: start;
  animation: ${fadeIn} 0.3s ease;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

// ── Page title ────────────────────────────────────────────────────────────────

export const PageHeader = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
`;

export const PageTitle = styled.h1`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
`;

export const NewEventButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 1.1rem;
  background: #1a1a2e;
  color: #e8d5a3;
  border: none;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2a2a4e;
  }
`;

// ── Left column ───────────────────────────────────────────────────────────────

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

// ── Month calendar ────────────────────────────────────────────────────────────

export const CalendarCard = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 12px;
  overflow: hidden;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

export const MonthTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
  text-transform: capitalize;
`;

export const NavArrow = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  transition: background 0.15s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0.5rem 0.8rem 0.3rem;
  gap: 2px;
`;

export const WeekDayLabel = styled.div`
  text-align: center;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.35);
  padding: 0.2rem 0;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: auto;
  gap: 2px;
  padding: 0 0.8rem 0.8rem;
  align-items: start;
`;

export const DayCell = styled.div<{
  $today?: boolean;
  $selected?: boolean;
  $otherMonth?: boolean;
  $hasEvents?: boolean;
}>`
  min-height: 58px;
  border-radius: 8px;
  padding: 4px 5px;
  align-self: stretch;
  cursor: pointer;
  background: ${({ $today, $selected }) =>
    $selected
      ? 'rgba(180, 120, 40, 0.12)'
      : $today
        ? 'rgba(201, 169, 110, 0.1)'
        : 'transparent'};
  border: ${({ $today, $selected }) =>
    $selected
      ? '2px solid #c9a96e'
      : $today
        ? '1.5px solid rgba(201, 169, 110, 0.4)'
        : '1.5px solid transparent'};
  opacity: ${({ $otherMonth }) => ($otherMonth ? 0.35 : 1)};
  transition:
    background 0.15s,
    border-color 0.15s;

  &:hover {
    background: ${({ $selected }) =>
      $selected ? 'rgba(180, 120, 40, 0.18)' : 'rgba(0, 0, 0, 0.04)'};
  }
`;

export const DayNumber = styled.div<{ $today?: boolean; $selected?: boolean }>`
  font-size: 0.78rem;
  font-weight: ${({ $today, $selected }) =>
    $today || $selected ? '700' : '400'};
  color: ${({ $selected }) => ($selected ? '#7a4a18' : 'rgba(0, 0, 0, 0.7)')};
  line-height: 1;
  margin-bottom: 3px;
`;

export const DayEvents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const EventPill = styled.div<{ $recurring?: boolean }>`
  padding: 2px 4px 3px;
  border-radius: 3px;
  background: ${({ $recurring }) =>
    $recurring ? 'rgba(80, 120, 200, 0.1)' : 'rgba(201, 169, 110, 0.13)'};
  border-left: 2px solid
    ${({ $recurring }) => ($recurring ? '#4a6dba' : '#c9a96e')};
  cursor: pointer;
  transition: background 0.1s;
  overflow: hidden;

  &:hover {
    background: ${({ $recurring }) =>
      $recurring ? 'rgba(80, 120, 200, 0.2)' : 'rgba(201, 169, 110, 0.25)'};
  }
`;

export const EventPillTitle = styled.div<{ $recurring?: boolean }>`
  font-size: 0.61rem;
  font-weight: 600;
  color: ${({ $recurring }) => ($recurring ? '#4a6dba' : '#8a6020')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
`;

export const EventPillMeta = styled.div<{ $recurring?: boolean }>`
  font-size: 0.57rem;
  color: ${({ $recurring }) =>
    $recurring ? 'rgba(74,109,186,0.7)' : 'rgba(138,96,32,0.65)'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  margin-top: 1px;
`;

export const MoreDot = styled.div`
  font-size: 0.6rem;
  color: rgba(0, 0, 0, 0.35);
  padding-left: 4px;
`;

// ── Event list — shared ───────────────────────────────────────────────────────

export const EventListCard = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 12px;
  overflow: hidden;
`;

export const SectionLabel = styled.div`
  padding: 0.75rem 1.2rem 0.5rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.35);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionCount = styled.span`
  font-size: 0.65rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.25);
  letter-spacing: 0;
`;

export const InactiveBadge = styled.span`
  font-size: 0.62rem;
  padding: 1px 6px;
  border-radius: 20px;
  background: rgba(220, 60, 60, 0.08);
  color: #c04040;
  border: 1px solid rgba(220, 60, 60, 0.15);
`;

// ── Recurring cards — grouped by weekday ─────────────────────────────────────

// Outer flex row: one column per day, Mon → Sun
export const RecurringGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 1rem 1rem;
`;

// One column per weekday
export const RecurringDayGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 118px;
  flex: 1 1 118px;
  max-width: 160px;
`;

export const RecurringDayHeader = styled.div`
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #4a6dba;
  padding: 0 0.1rem;
`;

export const RecurringCard = styled.div<{ $selected?: boolean }>`
  border-radius: 9px;
  padding: 0.6rem 0.7rem;
  cursor: pointer;
  background: ${({ $selected }) =>
    $selected ? 'rgba(180, 120, 40, 0.12)' : 'rgba(74, 109, 186, 0.05)'};
  border: 1.5px solid
    ${({ $selected }) => ($selected ? '#c9a96e' : 'rgba(74, 109, 186, 0.18)')};
  transition:
    background 0.15s,
    border-color 0.15s;

  &:hover {
    background: ${({ $selected }) =>
      $selected ? 'rgba(180, 120, 40, 0.18)' : 'rgba(74, 109, 186, 0.1)'};
    border-color: ${({ $selected }) =>
      $selected ? '#c9a96e' : 'rgba(74, 109, 186, 0.35)'};
  }
`;

// day label inside card — hidden now (shown in header), kept for compat
export const RecurringCardDay = styled.div<{ $selected?: boolean }>`
  display: none;
`;

export const RecurringCardTitle = styled.div<{ $selected?: boolean }>`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ $selected }) => ($selected ? '#7a4a18' : '#1a1a2e')};
  line-height: 1.3;
  margin-bottom: 0.25rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const RecurringCardTime = styled.div<{ $selected?: boolean }>`
  font-size: 0.71rem;
  font-weight: 500;
  color: ${({ $selected }) => ($selected ? '#9a6820' : '#4a6dba')};
`;

export const RecurringCardLocation = styled.div<{ $selected?: boolean }>`
  font-size: 0.67rem;
  color: ${({ $selected }) =>
    $selected ? 'rgba(120,70,20,0.6)' : 'rgba(0,0,0,0.32)'};
  margin-top: 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// ── One-time events (dated list) ──────────────────────────────────────────────

export const MonthGroup = styled.div``;

export const MonthGroupLabel = styled.div`
  padding: 0.5rem 1.2rem 0.3rem;
  font-size: 0.67rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.28);
  background: rgba(0, 0, 0, 0.015);
  border-top: 1px solid rgba(0, 0, 0, 0.04);
`;

export const EventListItem = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 0.7rem 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  cursor: pointer;
  background: ${({ $selected }) =>
    $selected ? 'rgba(180, 120, 40, 0.07)' : 'transparent'};
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
`;

export const EventDateCol = styled.div`
  min-width: 36px;
  text-align: center;
  flex-shrink: 0;
`;

export const EventDateNum = styled.div<{ $selected?: boolean }>`
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1;
  color: #1a1a2e;
`;

export const EventDateDow = styled.div`
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.35);
  letter-spacing: 0.05em;
  margin-top: 2px;
`;

export const EventListInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const EventListTitle = styled.div`
  font-size: 0.88rem;
  font-weight: 600;
  color: #1a1a2e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EventListMeta = styled.div`
  font-size: 0.73rem;
  color: rgba(0, 0, 0, 0.38);
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

export const MetaDot = styled.span`
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  display: inline-block;
  flex-shrink: 0;
`;

export const EventListAuthor = styled.div`
  font-size: 0.68rem;
  color: rgba(0, 0, 0, 0.28);
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-top: 3px;
`;

// kept for backward compat but unused
export const EventListDate = styled.div``;
export const EventDateBadge = styled.div``;
export const EventDateDay = styled.div``;
export const EventDateMonth = styled.div``;
export const EventListHeader = styled.div``;

// ── Right column: Form ────────────────────────────────────────────────────────

export const FormCard = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 12px;
  overflow: hidden;
  position: sticky;
  top: 72px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
`;

export const FormCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;
`;

export const FormCardTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
`;

export const FormClearButton = styled.button`
  font-size: 0.78rem;
  color: rgba(0, 0, 0, 0.35);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition:
    color 0.15s,
    background 0.15s;

  &:hover {
    color: rgba(0, 0, 0, 0.6);
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const FormBody = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const FormSection = styled.div`
  margin-bottom: 1.2rem;
`;

export const FormSectionTitle = styled.div`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.35);
  margin-bottom: 0.7rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

export const FormSectionToggle = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.35);
  background: none;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding: 0 0 0.4rem;
  margin-bottom: ${({ $open }) => ($open ? '0.7rem' : '1.2rem')};
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: rgba(0, 0, 0, 0.55);
  }

  svg {
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.2s;
  }
`;

export const FormSectionContent = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  margin-bottom: ${({ $open }) => ($open ? '1.2rem' : '0')};
`;

export const FieldGroup = styled.div`
  margin-bottom: 0.8rem;
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
`;

export const FieldLabel = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 0.3rem;

  span {
    color: #c04040;
    margin-left: 2px;
  }
`;

export const FieldInput = styled.input`
  width: 100%;
  padding: 0.55rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 7px;
  font-size: 0.88rem;
  color: #1a1a2e;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
  background: #fafafa;

  &:focus {
    border-color: rgba(201, 169, 110, 0.5);
    background: #fff;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
`;

export const FieldTextarea = styled.textarea`
  width: 100%;
  padding: 0.55rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 7px;
  font-size: 0.88rem;
  color: #1a1a2e;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
  background: #fafafa;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;

  &:focus {
    border-color: rgba(201, 169, 110, 0.5);
    background: #fff;
  }
`;

export const FieldSelect = styled.select`
  width: 100%;
  padding: 0.55rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 7px;
  font-size: 0.88rem;
  color: #1a1a2e;
  outline: none;
  background: #fafafa;
  cursor: pointer;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    border-color: rgba(201, 169, 110, 0.5);
    background: #fff;
  }
`;

export const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
  margin-bottom: 0.5rem;

  input[type='checkbox'] {
    width: 15px;
    height: 15px;
    accent-color: #1a1a2e;
    cursor: pointer;
  }
`;

export const FormFooter = styled.div`
  padding: 1rem 1.2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: sticky;
  bottom: 0;
  background: #fff;
`;

export const SaveButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  background: #1a1a2e;
  color: #e8d5a3;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #2a2a4e;
  }
`;

export const DeleteButton = styled.button`
  width: 100%;
  padding: 0.6rem;
  background: none;
  color: #c04040;
  border: 1px solid rgba(200, 60, 60, 0.2);
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s;

  &:hover {
    background: rgba(200, 60, 60, 0.06);
    border-color: rgba(200, 60, 60, 0.35);
  }
`;

// ── Image upload ──────────────────────────────────────────────────────────────

export const ImageUploadArea = styled.label<{ $hasImage?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  min-height: ${({ $hasImage }) => ($hasImage ? 'auto' : '90px')};
  border: 1.5px dashed
    ${({ $hasImage }) =>
      $hasImage ? 'rgba(201, 169, 110, 0.4)' : 'rgba(0, 0, 0, 0.15)'};
  border-radius: 8px;
  cursor: pointer;
  background: ${({ $hasImage }) =>
    $hasImage ? 'transparent' : 'rgba(0, 0, 0, 0.02)'};
  transition:
    border-color 0.2s,
    background 0.2s;
  overflow: hidden;

  &:hover {
    border-color: rgba(201, 169, 110, 0.6);
    background: rgba(201, 169, 110, 0.03);
  }

  input[type='file'] {
    display: none;
  }
`;

export const ImagePreview = styled.img`
  width: 100%;
  max-height: 160px;
  object-fit: cover;
  border-radius: 6px;
  display: block;
`;

export const ImageUploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 1rem;
  color: rgba(0, 0, 0, 0.3);
  font-size: 0.78rem;
  pointer-events: none;

  svg {
    opacity: 0.4;
  }
`;

export const ImageActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.4rem;
`;

export const ImageActionBtn = styled.button<{ $danger?: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 5px;
  border: 1px solid
    ${({ $danger }) =>
      $danger ? 'rgba(200, 60, 60, 0.25)' : 'rgba(0, 0, 0, 0.12)'};
  background: none;
  color: ${({ $danger }) => ($danger ? '#c04040' : 'rgba(0, 0, 0, 0.45)')};
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${({ $danger }) =>
      $danger ? 'rgba(200, 60, 60, 0.06)' : 'rgba(0, 0, 0, 0.04)'};
  }
`;

// ── Conflict warning ──────────────────────────────────────────────────────────

export const ConflictBox = styled.div`
  border: 1.5px solid rgba(220, 120, 30, 0.35);
  background: rgba(255, 170, 60, 0.06);
  border-radius: 8px;
  padding: 0.85rem 1rem;
  margin-bottom: 0.2rem;
`;

export const ConflictTitle = styled.div`
  font-size: 0.78rem;
  font-weight: 700;
  color: #a05010;
  margin-bottom: 0.35rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const ConflictBody = styled.div`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.5;

  strong {
    color: #1a1a2e;
  }
`;

export const ConflictMeta = styled.div`
  font-size: 0.76rem;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 0.2rem;
`;

export const ConflictActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.7rem;
`;

export const ConflictForceBtn = styled.button`
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid rgba(220, 120, 30, 0.3);
  background: none;
  color: #a05010;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: rgba(220, 120, 30, 0.08);
  }
`;

export const ConflictCancelBtn = styled.button`
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: none;
  color: rgba(0, 0, 0, 0.45);
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

export const ConflictDeleteBtn = styled.button`
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid rgba(200, 60, 60, 0.25);
  background: none;
  color: #c04040;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: rgba(200, 60, 60, 0.06);
  }
`;

export const FormMessage = styled.div<{ $error?: boolean }>`
  font-size: 0.8rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  background: ${({ $error }) =>
    $error ? 'rgba(200, 60, 60, 0.08)' : 'rgba(60, 160, 100, 0.08)'};
  border: 1px solid
    ${({ $error }) =>
      $error ? 'rgba(200, 60, 60, 0.2)' : 'rgba(60, 160, 100, 0.2)'};
  color: ${({ $error }) => ($error ? '#c04040' : '#2a7a50')};
`;
