import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const LoginWrapper = styled.div`
  min-height: 100vh;
  background: #0d1117;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        ellipse 600px 400px at 20% 30%,
        rgba(180, 140, 80, 0.07) 0%,
        transparent 70%
      ),
      radial-gradient(
        ellipse 500px 350px at 80% 70%,
        rgba(40, 70, 120, 0.1) 0%,
        transparent 70%
      );
    pointer-events: none;
  }
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: #161b22;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 2.8rem 2.4rem;
  animation: ${fadeIn} 0.4s ease;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    padding: 2rem 1.4rem;
    border-radius: 10px;
  }
`;

export const LogoArea = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const ChurchName = styled.h1`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.6rem;
  font-weight: 600;
  color: #e8d5a3;
  letter-spacing: 0.04em;
  margin: 0 0 0.2rem;
`;

export const PortalLabel = styled.p`
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  margin: 0;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  margin: 1.6rem 0;
`;

export const FormTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
  margin: 0 0 1.6rem;
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.1rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.45rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 7px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.95rem;
  outline: none;
  transition:
    border-color 0.2s,
    background 0.2s;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    border-color: rgba(201, 169, 110, 0.5);
    background: rgba(255, 255, 255, 0.07);
  }
`;

export const LoginButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  padding: 0.85rem;
  margin-top: 0.6rem;
  background: ${({ $loading }) =>
    $loading ? 'rgba(201, 169, 110, 0.5)' : 'rgba(201, 169, 110, 0.15)'};
  border: 1px solid rgba(201, 169, 110, 0.4);
  border-radius: 7px;
  color: #e8d5a3;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  transition:
    background 0.2s,
    border-color 0.2s;

  &:hover:not(:disabled) {
    background: rgba(201, 169, 110, 0.25);
    border-color: rgba(201, 169, 110, 0.6);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  margin: 0.8rem 0 0;
  padding: 0.7rem 1rem;
  background: rgba(220, 60, 60, 0.1);
  border: 1px solid rgba(220, 60, 60, 0.25);
  border-radius: 6px;
  color: #f08080;
  font-size: 0.85rem;
  text-align: center;
`;

export const BackLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 1.4rem;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.3);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.55);
  }
`;
