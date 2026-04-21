import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Page layout ───────────────────────────────────────────────────────────────

export const AlphaPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  animation: ${fadeIn} 0.3s ease;
`;

export const NextAlphaRow = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 1.6rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

// ── Card preview ──────────────────────────────────────────────────────────────

export const CardPreviewOuter = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 12px;
  overflow: hidden;
  position: sticky;
  top: 1rem;
`;

export const CardPreviewHeader = styled.div`
  padding: 1rem 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  font-weight: 600;
  font-size: 0.88rem;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const CardPreviewBody = styled.div`
  padding: 1.2rem;
`;

export const CardPreviewInner = styled.div`
  background: linear-gradient(160deg, #fffcf4 0%, #fff6e0 100%);
  border: 1px solid rgba(200, 150, 40, 0.22);
  border-radius: 18px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  min-height: 200px;

  &::before {
    content: '';
    position: absolute;
    top: -40px;
    right: -40px;
    width: 180px;
    height: 180px;
    background: radial-gradient(
      circle,
      rgba(200, 150, 40, 0.13) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  &::after {
    content: 'α';
    position: absolute;
    bottom: -0.2em;
    right: 0.2em;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 9rem;
    font-weight: 700;
    color: rgba(200, 150, 40, 0.07);
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }
`;

export const PreviewTag = styled.div`
  display: inline-flex;
  background: rgba(201, 120, 32, 0.1);
  border: 1px solid rgba(201, 120, 32, 0.28);
  border-radius: 50px;
  padding: 0.28rem 0.8rem;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #b8680e;
  margin-bottom: 0.9rem;
`;

export const PreviewTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1208;
  margin: 0 0 0.6rem;
  line-height: 1.2;
`;

export const PreviewDesc = styled.p`
  font-size: 0.78rem;
  line-height: 1.7;
  color: #5a4428;
  margin: 0 0 1rem;
`;

export const PreviewMeta = styled.div`
  font-size: 0.72rem;
  color: #7a6040;
  margin-bottom: 1rem;
  padding-top: 0.6rem;
  border-top: 1px solid rgba(200, 150, 40, 0.15);

  span {
    color: #c97820;
    font-weight: 600;
  }
`;

export const PreviewBtn = styled.div`
  display: inline-flex;
  padding: 0.6rem 1.6rem;
  border-radius: 50px;
  background: #1a1208;
  color: #f5efe0;
  font-size: 0.78rem;
  font-weight: 600;
`;

export const EmptyPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  color: #bbb;
  font-size: 0.82rem;
  gap: 0.5rem;
  text-align: center;
`;

// ── Delete button ─────────────────────────────────────────────────────────────

export const ClearBtn = styled.button`
  padding: 0.65rem 1rem;
  background: transparent;
  color: #b43c3c;
  border: 1px solid rgba(180, 60, 60, 0.3);
  border-radius: 8px;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(180, 60, 60, 0.06);
    border-color: rgba(180, 60, 60, 0.5);
  }
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.7rem;
  padding: 1rem 1.2rem 0.4rem;
`;

export const PhotoThumb = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.08);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const PhotoDeleteBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(180, 60, 60, 0.85);
  border: none;
  color: #fff;
  font-size: 0.7rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.15s;

  ${PhotoThumb}:hover & {
    opacity: 1;
  }
`;

export const UploadRow = styled.div`
  padding: 1rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  flex-wrap: wrap;
`;

export const UploadBtn = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: #1a1a2e;
  color: #e8d5a3;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2a2a4e;
  }
`;

export const UploadHint = styled.span`
  font-size: 0.78rem;
  color: #aaa;
`;
