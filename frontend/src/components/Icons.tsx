import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const icon =
  (path: string | React.ReactNode, viewBox = '0 0 24 24') =>
  ({ size = 18, color = 'currentColor', className, style }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={color}
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      style={style}
      aria-hidden='true'
    >
      {typeof path === 'string' ? <path d={path} /> : path}
    </svg>
  );

export const IconMapPin = icon(
  'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'
);

export const IconPhone = icon(
  'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z'
);

export const IconMail = icon(
  'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
);

export const IconParking = icon(
  <>
    <rect
      x='3'
      y='3'
      width='18'
      height='18'
      rx='3'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <path
      d='M9 17V7h5a3 3 0 0 1 0 6H9'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </>,
  '0 0 24 24'
);

export const IconRecycle = icon(
  <>
    <path
      d='M7.5 4.5L12 2l4.5 2.5'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M12 2v7'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <path
      d='M4 16l-1.5-2.5L4 11'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M2.5 13.5h7'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <path
      d='M20 16l1.5-2.5L20 11'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M21.5 13.5h-7'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <path
      d='M7.5 19.5L12 22l4.5-2.5'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M12 22v-7'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </>
);

export const IconGlobe = icon(
  <>
    <circle
      cx='12'
      cy='12'
      r='10'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <path
      d='M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
  </>
);

export const IconCreditCard = icon(
  <>
    <rect
      x='1'
      y='4'
      width='22'
      height='16'
      rx='2'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <line
      x1='1'
      y1='10'
      x2='23'
      y2='10'
      stroke='currentColor'
      strokeWidth='1.5'
    />
  </>
);

export const IconImage = icon(
  <>
    <rect
      x='3'
      y='3'
      width='18'
      height='18'
      rx='2'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <circle cx='8.5' cy='8.5' r='1.5' fill='currentColor' />
    <polyline
      points='21 15 16 10 5 21'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinejoin='round'
    />
  </>
);

export const IconZoomIn = icon(
  <>
    <circle
      cx='11'
      cy='11'
      r='8'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <line
      x1='21'
      y1='21'
      x2='16.65'
      y2='16.65'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <line
      x1='11'
      y1='8'
      x2='11'
      y2='14'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <line
      x1='8'
      y1='11'
      x2='14'
      y2='11'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </>
);

export const IconChevronLeft = icon(
  <polyline
    points='15 18 9 12 15 6'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  />
);

export const IconChevronRight = icon(
  <polyline
    points='9 18 15 12 9 6'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  />
);

export const IconX = icon(
  <>
    <line
      x1='18'
      y1='6'
      x2='6'
      y2='18'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <line
      x1='6'
      y1='6'
      x2='18'
      y2='18'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </>
);

export const IconCheck = icon(
  <polyline
    points='20 6 9 17 4 12'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  />
);

export const IconHeart = icon(
  <path
    d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    strokeLinejoin='round'
  />
);

export const IconSwish = icon(
  <>
    <rect
      x='3'
      y='3'
      width='18'
      height='18'
      rx='4'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <path
      d='M8 14c.5 1.5 2 2.5 4 2.5s3.5-1 4-2.5'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <path
      d='M8 10c.5-1.5 2-2.5 4-2.5'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <path
      d='M16 10c-.5-1.5-2-2.5-4-2.5'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </>
);

export const IconBankgiro = icon(
  <>
    <rect
      x='2'
      y='5'
      width='20'
      height='14'
      rx='2'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <line
      x1='2'
      y1='10'
      x2='22'
      y2='10'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <line
      x1='6'
      y1='15'
      x2='10'
      y2='15'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </>
);

export const IconClock = icon(
  <>
    <circle
      cx='12'
      cy='12'
      r='10'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <polyline
      points='12 6 12 12 16 14'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </>
);

export const IconCalendar = icon(
  <>
    <rect
      x='3'
      y='4'
      width='18'
      height='18'
      rx='2'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <line
      x1='16'
      y1='2'
      x2='16'
      y2='6'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <line
      x1='8'
      y1='2'
      x2='8'
      y2='6'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <line
      x1='3'
      y1='10'
      x2='21'
      y2='10'
      stroke='currentColor'
      strokeWidth='1.5'
    />
  </>
);

export const IconUser = icon(
  <>
    <path
      d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <circle
      cx='12'
      cy='7'
      r='4'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
  </>
);

export const IconBookOpen = icon(
  <>
    <path
      d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </>
);

export const IconClipboardList = icon(
  <>
    <rect
      x='8'
      y='2'
      width='8'
      height='4'
      rx='1'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <path
      d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <line
      x1='9'
      y1='12'
      x2='15'
      y2='12'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <line
      x1='9'
      y1='16'
      x2='13'
      y2='16'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </>
);

export const IconPauseCircle = icon(
  <>
    <circle
      cx='12'
      cy='12'
      r='10'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <line
      x1='10'
      y1='15'
      x2='10'
      y2='9'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <line
      x1='14'
      y1='15'
      x2='14'
      y2='9'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </>
);

export const IconPrinter = icon(
  <>
    <polyline
      points='6 9 6 2 18 2 18 9'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <rect
      x='6'
      y='14'
      width='12'
      height='8'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
  </>
);

export const IconRefreshCw = icon(
  <>
    <polyline
      points='23 4 23 10 17 10'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <polyline
      points='1 20 1 14 7 14'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </>
);

export const IconTimer = icon(
  <>
    <circle
      cx='12'
      cy='13'
      r='8'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <polyline
      points='12 9 12 13 15 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <line
      x1='10'
      y1='2'
      x2='14'
      y2='2'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </>
);

export const IconHome = icon(
  <>
    <path
      d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <polyline
      points='9 22 9 12 15 12 15 22'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </>
);

export const IconMusic = icon(
  <>
    <path
      d='M9 18V5l12-2v13'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <circle
      cx='6'
      cy='18'
      r='3'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <circle
      cx='18'
      cy='16'
      r='3'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
  </>
);

export const IconSettings = icon(
  <>
    <circle
      cx='12'
      cy='12'
      r='3'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <path
      d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </>
);
