import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

const icon = (path: string | React.ReactNode, viewBox = '0 0 24 24') =>
  ({ size = 18, color = 'currentColor', className }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
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
    <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 17V7h5a3 3 0 0 1 0 6H9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </>,
  '0 0 24 24'
);

export const IconRecycle = icon(
  <>
    <path d="M7.5 4.5L12 2l4.5 2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2v7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 16l-1.5-2.5L4 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.5 13.5h7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 16l1.5-2.5L20 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21.5 13.5h-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7.5 19.5L12 22l4.5-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22v-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </>
);

export const IconGlobe = icon(
  <>
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
  </>
);

export const IconCreditCard = icon(
  <>
    <rect x="1" y="4" width="22" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="1.5"/>
  </>
);

export const IconImage = icon(
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
    <polyline points="21 15 16 10 5 21" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </>
);

export const IconZoomIn = icon(
  <>
    <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </>
);

export const IconChevronLeft = icon(
  <polyline points="15 18 9 12 15 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
);

export const IconChevronRight = icon(
  <polyline points="9 18 15 12 9 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
);

export const IconX = icon(
  <>
    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </>
);

export const IconCheck = icon(
  <polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
);

export const IconHeart = icon(
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
);

export const IconSwish = icon(
  <>
    <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 14c.5 1.5 2 2.5 4 2.5s3.5-1 4-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 10c.5-1.5 2-2.5 4-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 10c-.5-1.5-2-2.5-4-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </>
);

export const IconBankgiro = icon(
  <>
    <rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="6" y1="15" x2="10" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </>
);

export const IconClock = icon(
  <>
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <polyline points="12 6 12 12 16 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </>
);
