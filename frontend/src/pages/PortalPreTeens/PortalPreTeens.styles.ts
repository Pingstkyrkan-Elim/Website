import styled from 'styled-components';

export const PTPortalWrapper = styled.div`
  max-width: 860px;
`;

// ── Event cards grid ──────────────────────────────────────────────────────────

export const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 1.4rem;
`;

export const EventCard = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
  }
`;

export const EventCardPhoto = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
`;

export const EventCardNoPhoto = styled.div`
  width: 100%;
  height: 140px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #9ca3af;
`;

export const EventCardBody = styled.div`
  padding: 14px 16px 16px;
`;

export const EventCardName = styled.div`
  font-weight: 700;
  font-size: 1rem;
  color: #1a1a2e;
  margin-bottom: 4px;
`;

export const EventCardDate = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 14px;
`;

export const EventCardActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const EditBtn = styled.button`
  flex: 1;
  padding: 0.45rem 0;
  background: #1a1a2e;
  color: #e8d5a3;
  border: none;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2a2a4e;
  }
`;

export const DeleteBtn = styled.button`
  flex: 1;
  padding: 0.45rem 0;
  background: transparent;
  color: #dc2626;
  border: 1px solid rgba(220, 38, 38, 0.35);
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s;

  &:hover {
    background: rgba(220, 38, 38, 0.07);
    border-color: #dc2626;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const NewEventBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.65rem 1.3rem;
  background: #1a1a2e;
  color: #e8d5a3;
  border: none;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 1.4rem;

  &:hover {
    background: #2a2a4e;
  }
`;

// ── Form extras ───────────────────────────────────────────────────────────────

export const FormTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 0;
`;

export const CancelBtn = styled.button`
  padding: 0.35rem 0.9rem;
  background: transparent;
  color: #6b7280;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`;

export const CurrentPhotoWrap = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  background: #f0f0f0;
  margin-bottom: 12px;
`;

export const CurrentPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const NoPhoto = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  color: #999;
`;

export const UploadRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const UploadBtn = styled.button`
  padding: 0.55rem 1.1rem;
  background: #1a1a2e;
  color: #e8d5a3;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  max-width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background: #2a2a4e;
  }
`;

export const UploadHint = styled.span`
  font-size: 0.78rem;
  color: #c97820;
`;

export const SuccessBadge = styled.span`
  padding: 0.35rem 0.9rem;
  background: #d4edda;
  color: #1a5c2a;
  border-radius: 100px;
  font-size: 0.82rem;
  font-weight: 600;
`;
