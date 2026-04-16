import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 1.6rem;
  align-items: start;
  animation: ${fadeIn} 0.3s ease;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

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

export const NewButton = styled.button`
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

// ── List ──────────────────────────────────────────────────────────────────────

export const ListCard = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 12px;
  overflow: hidden;
`;

export const ListHeader = styled.div`
  padding: 1rem 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  font-weight: 600;
  font-size: 0.88rem;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const AnnouncementRow = styled.div<{ $inactive?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 0.9rem 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  opacity: ${({ $inactive }) => ($inactive ? 0.5 : 1)};
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }
`;

export const AnnouncementInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const AnnouncementTitle = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  color: #1a1a2e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AnnouncementMeta = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.15rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const MetaChip = styled.span`
  background: rgba(122, 88, 40, 0.08);
  color: #7a5828;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
`;

export const RowActions = styled.div`
  display: flex;
  gap: 0.35rem;
  flex-shrink: 0;
`;

export const ActionBtn = styled.button<{ $variant?: 'danger' }>`
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'danger' ? 'rgba(180,60,60,0.3)' : 'rgba(0,0,0,0.12)'};
  background: transparent;
  color: ${({ $variant }) => ($variant === 'danger' ? '#b43c3c' : '#444')};
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: ${({ $variant }) =>
      $variant === 'danger' ? 'rgba(180,60,60,0.08)' : 'rgba(0,0,0,0.05)'};
  }
`;

export const EmptyState = styled.div`
  padding: 2.5rem 1.2rem;
  text-align: center;
  color: #aaa;
  font-size: 0.9rem;
`;

// ── Form ──────────────────────────────────────────────────────────────────────

export const FormCard = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 12px;
  overflow: hidden;
  position: sticky;
  top: 1rem;
`;

export const FormHeader = styled.div`
  padding: 1rem 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  font-weight: 600;
  font-size: 0.95rem;
  color: #1a1a2e;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FormBody = styled.form`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const Input = styled.input`
  padding: 0.55rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  font-size: 0.9rem;
  color: #1a1a2e;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #a07840;
  }
`;

export const Textarea = styled.textarea`
  padding: 0.55rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  font-size: 0.9rem;
  color: #1a1a2e;
  outline: none;
  resize: vertical;
  min-height: 90px;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    border-color: #a07840;
  }
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0;
`;

export const ToggleLabel = styled.span`
  font-size: 0.88rem;
  color: #444;
`;

export const Toggle = styled.input`
  width: 36px;
  height: 20px;
  cursor: pointer;
  accent-color: #1a1a2e;
`;

export const FormActions = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-top: 0.4rem;
`;

export const SubmitBtn = styled.button`
  flex: 1;
  padding: 0.65rem;
  background: #1a1a2e;
  color: #e8d5a3;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #2a2a4e;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CancelBtn = styled.button`
  padding: 0.65rem 1rem;
  background: transparent;
  color: #666;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

export const ErrorMsg = styled.div`
  padding: 0.6rem 0.9rem;
  background: rgba(180, 60, 60, 0.08);
  border: 1px solid rgba(180, 60, 60, 0.2);
  border-radius: 8px;
  color: #b43c3c;
  font-size: 0.85rem;
`;

// ── Image upload ──────────────────────────────────────────────────────────────

export const ImageUploadArea = styled.label<{ $hasImage?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed
    ${({ $hasImage }) =>
      $hasImage ? 'rgba(160,120,64,0.4)' : 'rgba(0,0,0,0.15)'};
  border-radius: 8px;
  padding: ${({ $hasImage }) => ($hasImage ? '0' : '1.2rem')};
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(160, 120, 64, 0.6);
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
  color: #aaa;
  font-size: 0.8rem;

  svg {
    opacity: 0.5;
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
    ${({ $danger }) => ($danger ? 'rgba(180,60,60,0.3)' : 'rgba(0,0,0,0.15)')};
  background: transparent;
  color: ${({ $danger }) => ($danger ? '#b43c3c' : '#555')};
  cursor: pointer;

  &:hover {
    background: ${({ $danger }) =>
      $danger ? 'rgba(180,60,60,0.08)' : 'rgba(0,0,0,0.05)'};
  }
`;
