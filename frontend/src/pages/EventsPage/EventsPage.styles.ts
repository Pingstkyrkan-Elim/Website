import styled, { createGlobalStyle } from 'styled-components';

export const EventsContainer = styled.div`
  min-height: 100vh;
  background: url('/images/Gudtjanst.jpeg') center center / cover fixed;
  background-color: #6a4820;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 768px) {
    background-attachment: scroll;
  }
`;

export const HeroSection = styled.div`
  color: white;
  text-align: center;
  padding: 6rem 2rem 4rem;
  position: relative;
  overflow: hidden;
  min-height: calc(50vh + 70px);
  margin-top: -70px;
  padding-top: calc(6rem + 70px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    rgba(0, 0, 0, 0.1) 0%,
    rgba(10, 6, 2, 0.42) 60%,
    rgba(12, 8, 3, 0.58) 100%
  );

  & > * {
    position: relative;
    z-index: 3;
  }

  @media (max-width: 768px) {
    padding: calc(4rem + 70px) 1rem 3rem;
    min-height: calc(40vh + 70px);
  }

  @media (max-width: 480px) {
    padding: calc(3rem + 70px) 0.5rem 2rem;
    min-height: calc(35vh + 70px);
  }
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2.4rem, 5.5vw, 4rem);
  font-weight: 700;
  margin: 0 0 1.4rem 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    rgba(255, 235, 175, 0.95) 50%,
    rgba(220, 175, 100, 0.9) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  /* drop-shadow works on clipped text, text-shadow does not */
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.95))
    drop-shadow(0 4px 18px rgba(0, 0, 0, 0.75))
    drop-shadow(0 8px 40px rgba(0, 0, 0, 0.5));

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.15rem;
  font-weight: 400;
  color: rgba(255, 238, 195, 0.95);
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.7;
  letter-spacing: 0.01em;
  text-shadow:
    0 1px 4px rgba(0, 0, 0, 0.95),
    0 2px 14px rgba(0, 0, 0, 0.8),
    0 5px 30px rgba(0, 0, 0, 0.55);

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

// Full-width dark warm overlay section — matches HomePage's ContentSection overlay
export const ContentWrapper = styled.section`
  background: rgba(12, 8, 3, 0.5);
  padding: 0;
`;

export const ContentSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 4rem;
  position: relative;
  z-index: 4;
  background: transparent;
  min-height: 60vh;

  @media (max-width: 768px) {
    padding: 2rem 1rem 3rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem 2rem;
  }
`;

export const CalendarContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 10px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.06),
    0 2px 8px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;

  @media (max-width: 768px) {
    border-radius: 20px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    border-radius: 16px;
    padding: 6px;
    margin: 0 0.5rem;
  }
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
    text-align: center;
    padding: 1.2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 12px;
  }
`;

export const MonthTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #a07840;
  margin: 0;
  text-align: center;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  gap: 0.5rem;
  background: rgba(122, 88, 40, 0.08);
  border-radius: 14px;
  padding: 0.4rem;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const ViewToggleButton = styled.button<{ $isActive: boolean }>`
  padding: 0.8rem 1.8rem;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: ${({ $isActive }) => ($isActive ? 'white' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? '#7a5828' : '#6b7280')};
  box-shadow: ${({ $isActive }) =>
    $isActive ? '0 3px 12px rgba(122, 88, 40, 0.15)' : 'none'};

  &:hover {
    background: ${({ $isActive }) =>
      $isActive ? 'white' : 'rgba(255, 255, 255, 0.6)'};
    color: ${({ $isActive }) => ($isActive ? '#7a5828' : '#7a5828')};
  }

  @media (max-width: 768px) {
    flex: 1;
    padding: 0.8rem 1rem;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 0.7rem 0.8rem;
    font-size: 0.8rem;
  }
`;

// Calendar Grid Components
export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(120px, auto);
  gap: 1px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 1rem;
`;

export const CalendarNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 10px;
`;

export const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const MonthNavButton = styled.button`
  background: rgba(160, 120, 64, 0.1);
  border: 1px solid rgba(160, 120, 64, 0.2);
  border-radius: 8px;
  color: #a07840;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  &:hover {
    background: rgba(160, 120, 64, 0.2);
    border-color: rgba(122, 88, 40, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DayHeader = styled.div`
  background: rgba(122, 88, 40, 0.1);
  padding: 1rem 0.5rem;
  text-align: center;
  font-weight: 600;
  color: #a07840;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const CalendarDay = styled.div<{
  $isCurrentMonth: boolean;
  $isToday: boolean;
  $hasEvents: boolean;
}>`
  background: white;
  min-height: 120px;
  max-height: 220px;
  overflow-y: auto;
  padding: 0.5rem;
  position: relative;
  opacity: ${({ $isCurrentMonth }) => ($isCurrentMonth ? 1 : 0.4)};
  border-left: 3px solid
    ${({ $isToday }) => ($isToday ? '#7a5828' : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    background: rgba(122, 88, 40, 0.02);
  }

  @media (max-width: 768px) {
    min-height: 80px;
    max-height: 160px;
    padding: 0.25rem;
  }

  @media (max-width: 480px) {
    min-height: 60px;
    max-height: 120px;
    padding: 0.2rem;
  }
`;

export const DayNumber = styled.div<{ $isToday: boolean }>`
  font-weight: ${({ $isToday }) => ($isToday ? '700' : '500')};
  color: ${({ $isToday }) => ($isToday ? '#7a5828' : '#7a5828')};
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  background: ${({ $isToday }) =>
    $isToday ? 'rgba(122, 88, 40, 0.1)' : 'transparent'};
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CalendarEvent = styled.div`
  background: linear-gradient(135deg, #3a6a7a 0%, #4a7a4a 100%);
  color: white;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 2px 8px rgba(122, 88, 40, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 0.6rem;
    padding: 0.1rem 0.3rem;
  }
`;

export const CalendarEventTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CalendarEventTime = styled.div`
  font-size: 0.6rem;
  opacity: 0.9;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 0.5rem;
  }
`;

export const EventsCount = styled.div`
  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;
  background: rgba(160, 120, 64, 0.2);
  color: #a07840;
  border-radius: 12px;
  padding: 0.1rem 0.4rem;
  font-size: 0.6rem;
  font-weight: 600;
`;

export const EventsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  padding: 1.5rem 2rem;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

export const ListDaySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    gap: 0.75rem;
  }
`;

export const ListDayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  border-left: 3px solid #a07040;

  @media (max-width: 768px) {
    padding-left: 0.75rem;
  }
`;

export const ListDayLabel = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
`;

export const ListDayWeekday = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #a07040;
`;

export const ListDayDate = styled.span`
  font-size: 1.15rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.02em;
`;

export const ListDayCount = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  color: #a07040;
  background: rgba(160, 112, 64, 0.08);
  border: 1px solid rgba(160, 112, 64, 0.18);
  padding: 0.2rem 0.65rem;
  border-radius: 20px;
  white-space: nowrap;
`;

export const EventCard = styled.div`
  cursor: pointer;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.02),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  display: flex;
  width: 100%;
  min-height: 180px;
  animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  opacity: 0;
  transform: translateY(20px);

  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
  &:nth-child(4) {
    animation-delay: 0.4s;
  }
  &:nth-child(5) {
    animation-delay: 0.5s;
  }
  &:nth-child(6) {
    animation-delay: 0.6s;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 20px 48px rgba(0, 0, 0, 0.1),
      0 2px 8px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    border-color: rgba(160, 120, 64, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(135deg, #3a6a7a 0%, #4a7a4a 100%);
    border-radius: 4px 0 0 4px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: 280px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    border-radius: 16px;
    min-height: 250px;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const EventImage = styled.div<{ $backgroundImage?: string }>`
  width: 240px;
  min-width: 180px;
  flex-shrink: 0;
  margin: 0.85rem;
  border-radius: 14px;
  background: ${({ $backgroundImage }) =>
    $backgroundImage
      ? `linear-gradient(rgba(122, 88, 40, 0.1), rgba(160, 120, 64, 0.2)), url('${$backgroundImage}') center/cover`
      : 'linear-gradient(135deg, rgba(160, 120, 64, 0.9) 0%, rgba(122, 88, 40, 0.9) 100%)'};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    height: 160px;
    margin: 1rem 1rem 0;
    order: -1;
  }

  @media (max-width: 480px) {
    height: 130px;
    margin: 0.8rem 0.8rem 0;
    border-radius: 12px;
  }
`;

export const EventDate = styled.div`
  color: #a07840;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const EventContent = styled.div`
  padding: 1.4rem 1.8rem 1.4rem 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
  gap: 0.7rem;

  @media (max-width: 768px) {
    padding: 1.2rem 1.5rem;
    gap: 0.6rem;
  }
`;

export const EventTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const EventDescription = styled.p`
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    -webkit-line-clamp: 3;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const EventMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem 1.2rem;
  font-size: 0.85rem;
  color: #6b7280;
  margin-top: auto;
`;

export const EventLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 220px;
`;

export const EventTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

export const EventSundaySchool = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 600;
  font-size: 0.8rem;
  color: #2a5a6a;
`;

export const EventCommunion = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 600;
  font-size: 0.8rem;
  color: #7a3aa0;
`;

export const EventCTA = styled.button`
  background: rgba(160, 120, 64, 0.1);
  border: 1px solid rgba(160, 120, 64, 0.2);
  color: #a07840;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  align-self: flex-start;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    background: rgba(160, 120, 64, 0.15);
    border-color: rgba(160, 120, 64, 0.3);
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(160, 120, 64, 0.2);

    &::before {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
`;

export const NoEventsMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #6b7280;

  h3 {
    font-size: 1.4rem;
    margin: 0 0 1rem 0;
    color: #a07840;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
    opacity: 0.8;
  }
`;

// ── Suspended badge ────────────────────────────────────────────────────────

export const SuspendedBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(180, 100, 40, 0.08);
  border: 1px solid rgba(180, 100, 40, 0.2);
  border-radius: 8px;
  padding: 0.45rem 0.8rem;
  font-size: 0.8rem;
  color: #a05020;
  font-weight: 500;
  margin-top: 0.5rem;

  .icon {
    font-size: 0.9rem;
  }
`;

// ── Registration button ─────────────────────────────────────────────────────

export const RegistrationButton = styled.button`
  background: linear-gradient(135deg, #3a6a7a 0%, #4a7a4a 100%);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.02em;

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(58, 106, 122, 0.35);
  }
`;

// ── Event modal ─────────────────────────────────────────────────────────────

export const ModalOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition:
    opacity 0.25s ease,
    visibility 0.25s ease;
`;

export const ModalCard = styled.div<{ $open: boolean }>`
  background: #faf7f4;
  border-radius: 24px;
  max-width: 680px;
  width: 100%;
  max-height: 88vh;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25);
  transform: ${({ $open }) =>
    $open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)'};
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;

  @media (max-width: 480px) {
    border-radius: 16px;
    max-height: 92vh;
  }
`;

export const ModalHeader = styled.div`
  position: relative;
  padding: 2rem 2rem 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 34px;
  height: 34px;
  background: rgba(0, 0, 0, 0.06);
  border: none;
  border-radius: 50%;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  color: #444;

  &:hover {
    background: rgba(0, 0, 0, 0.12);
  }
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 2.5rem 0 0;
  line-height: 1.3;
  font-family: 'Playfair Display', Georgia, serif;
`;

export const ModalBadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.8rem;
`;

export const ModalBadge = styled.span<{
  $variant?: 'green' | 'blue' | 'orange' | 'red' | 'purple';
}>`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  background: ${({ $variant }) =>
    $variant === 'green'
      ? 'rgba(74, 122, 74, 0.12)'
      : $variant === 'blue'
        ? 'rgba(58, 106, 122, 0.12)'
        : $variant === 'orange'
          ? 'rgba(180, 100, 40, 0.1)'
          : $variant === 'red'
            ? 'rgba(192, 64, 48, 0.1)'
            : $variant === 'purple'
              ? 'rgba(120, 60, 160, 0.1)'
              : 'rgba(0,0,0,0.06)'};
  color: ${({ $variant }) =>
    $variant === 'green'
      ? '#3a6a3a'
      : $variant === 'blue'
        ? '#2a5a6a'
        : $variant === 'orange'
          ? '#a05020'
          : $variant === 'red'
            ? '#c04030'
            : $variant === 'purple'
              ? '#7a3aa0'
              : '#555'};
`;

export const ModalBody = styled.div`
  padding: 1.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

export const ModalMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  font-size: 0.9rem;
  color: #555;
`;

export const ModalMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 500;
`;

export const ModalDescription = styled.p`
  font-size: 0.97rem;
  line-height: 1.7;
  color: #333;
  margin: 0;
  white-space: pre-line;
`;

export const ModalSection = styled.div<{
  $variant?: 'registration' | 'suspended';
}>`
  background: ${({ $variant }) =>
    $variant === 'registration'
      ? 'rgba(58, 106, 122, 0.06)'
      : $variant === 'suspended'
        ? 'rgba(180, 100, 40, 0.06)'
        : 'rgba(0,0,0,0.03)'};
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'registration'
        ? 'rgba(58, 106, 122, 0.18)'
        : $variant === 'suspended'
          ? 'rgba(180, 100, 40, 0.2)'
          : 'rgba(0,0,0,0.08)'};
  border-radius: 12px;
  padding: 1.1rem 1.3rem;
`;

export const ModalSectionTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #888;
  margin: 0 0 0.6rem 0;
`;

export const ModalSectionText = styled.p`
  font-size: 0.92rem;
  line-height: 1.6;
  color: #333;
  margin: 0;
  white-space: pre-line;
`;

// ── (keep LoadingSpinner below) ─────────────────────────────────────────────

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 2rem;

  &::after {
    content: '';
    width: 32px;
    height: 32px;
    border: 3px solid rgba(122, 88, 40, 0.1);
    border-top: 3px solid #7a5828;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// ── Print ────────────────────────────────────────────────────────────────────

export const PrintStyles = createGlobalStyle`
  @media print {
    @page {
      size: A4 portrait;
      margin: 8mm 10mm 8mm 10mm;
    }

    /* Force backgrounds and colors to print */
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Allow natural multi-page flow */
    html, body {
      height: auto !important;
      overflow: visible !important;
    }

    /* Hide everything */
    body * {
      visibility: hidden !important;
    }

    /* Show only the print area and all its children */
    #print-calendar,
    #print-calendar * {
      visibility: visible !important;
    }

    /* Position at top of document — no height cap, no overflow clip */
    #print-calendar {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      overflow: visible !important;
      font-family: 'Playfair Display', Georgia, serif;
      color: #1a1008;
    }
  }
`;

export const PrintArea = styled.div`
  display: none;

  @media print {
    display: block;
  }
`;

export const PrintHeader = styled.div`
  @media print {
    text-align: center;
    margin-bottom: 3mm;
    padding-bottom: 2mm;

    &::after {
      content: '';
      display: block;
      height: 0.5pt;
      background: linear-gradient(
        to right,
        transparent,
        #b88a18 20%,
        #b88a18 80%,
        transparent
      );
      margin-top: 2.5mm;
    }
  }
`;

export const PrintChurchName = styled.h1`
  @media print {
    font-size: 13pt;
    font-weight: 700;
    color: #3a1800;
    margin: 0 0 1.5mm 0;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-family: 'Playfair Display', Georgia, serif;
  }
`;

export const PrintMonthTitle = styled.h2`
  @media print {
    font-size: 9pt;
    font-weight: 400;
    color: #8a6020;
    margin: 0;
    letter-spacing: 0.06em;
    font-style: italic;
  }
`;

export const PrintWeeksGrid = styled.div`
  @media print {
    columns: 2;
    column-gap: 5mm;
  }
`;

/* PrintColumn is kept as a passthrough — no longer used for layout */
export const PrintColumn = styled.div``;

export const PrintWeekBlock = styled.div`
  @media print {
    border: 0.5pt solid #d4aa60;
    overflow: hidden;
    break-inside: avoid;
    display: inline-block;
    width: 100%;
    margin-bottom: 2.5mm;
    box-sizing: border-box;
  }
`;

export const PrintWeekHeader = styled.div`
  @media print {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(
      to right,
      #7a5810,
      #b88a18,
      #c8a028,
      #b88a18,
      #7a5810
    );
    padding: 1mm 2.5mm;
  }
`;

export const PrintWeekNumber = styled.span`
  @media print {
    font-size: 7pt;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }
`;

export const PrintWeekRange = styled.span`
  @media print {
    font-size: 6.5pt;
    color: rgba(255, 255, 255, 0.78);
    font-style: italic;
  }
`;

export const PrintDayBlock = styled.div`
  @media print {
    padding: 0.8mm 2.5mm 0.5mm;
    border-bottom: 0.4pt solid #ecdcb4;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0.8mm;
    }
  }
`;

export const PrintDayName = styled.div`
  @media print {
    font-size: 6.5pt;
    font-weight: 700;
    color: #8a6018;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding-bottom: 0.3mm;
    margin-bottom: 0.3mm;
    border-bottom: 0.3pt solid #e8d090;
  }
`;

export const PrintEventRow = styled.div`
  @media print {
    display: flex;
    align-items: center;
    gap: 1.5mm;
    padding: 0.45mm 0 0.45mm 0.5mm;
  }
`;

export const PrintEventTime = styled.span`
  @media print {
    font-size: 7pt;
    font-weight: 700;
    color: #6a4808;
    min-width: 11mm;
    flex-shrink: 0;
    font-family: 'Inter', sans-serif;
  }
`;

export const PrintEventName = styled.span`
  @media print {
    font-size: 7.5pt;
    font-weight: 600;
    color: #1a0800;
    flex: 1;
  }
`;

export const PrintEventContact = styled.span`
  @media print {
    font-size: 6pt;
    color: #9a7840;
    font-style: italic;
    flex-shrink: 0;
    padding-left: 2mm;
    border-left: 0.5pt solid #d4b070;
    margin-left: 0.5mm;
    white-space: nowrap;
  }
`;

export const PrintEventMeta = styled.div`
  @media print {
    display: flex;
    align-items: center;
    gap: 1.5mm;
    flex-wrap: wrap;
    padding: 0.1mm 0 0.4mm 13mm;
  }
`;

export const PrintEventTag = styled.span<{ $bg?: string; $color?: string }>`
  @media print {
    font-size: 5pt;
    font-weight: 700;
    color: ${({ $color }) => $color ?? '#3a1800'};
    background: ${({ $bg }) => $bg ?? 'rgba(58,24,0,0.07)'};
    padding: 0.2mm 1.5mm;
    border-radius: 20pt;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }
`;

export const PrintFooter = styled.div`
  @media print {
    text-align: center;
    margin-top: 2.5mm;
    break-inside: avoid;

    &::before {
      content: '';
      display: block;
      height: 0.5pt;
      background: linear-gradient(
        to right,
        transparent,
        #b88a18 20%,
        #b88a18 80%,
        transparent
      );
      margin-bottom: 1.5mm;
    }
  }
`;

export const PrintFooterText = styled.p`
  @media print {
    font-size: 6pt;
    color: #9a7030;
    margin: 0;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`;

export const PrintButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 0.9rem;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  margin-left: 0.2rem;
  border-left: 1px solid rgba(122, 88, 40, 0.15);
  padding-left: 0.9rem;

  &:hover {
    background: rgba(255, 255, 255, 0.6);
    color: #7a5828;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 0.8rem;
  }

  @media print {
    display: none;
  }
`;
