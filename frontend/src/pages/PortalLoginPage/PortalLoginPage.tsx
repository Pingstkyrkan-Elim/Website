import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  BackLink,
  ChurchName,
  Divider,
  ErrorMessage,
  FormGroup,
  FormTitle,
  Input,
  Label,
  LoginButton,
  LoginCard,
  LoginWrapper,
  LogoArea,
  PortalLabel,
} from './PortalLoginPage.styles';

const PortalLoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/portal/dashboard');
    } catch {
      setError('Felaktigt e-post eller lösenord. Försök igen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <LogoArea>
          <ChurchName>Pingstkyrkan Elim</ChurchName>
          <PortalLabel>Innehållsportal</PortalLabel>
        </LogoArea>

        <Divider />

        <FormTitle>Logga in</FormTitle>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">E-post</Label>
            <Input
              id="email"
              type="email"
              placeholder="din@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Lösenord</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </FormGroup>

          <LoginButton type="submit" disabled={loading} $loading={loading}>
            {loading ? 'Loggar in...' : 'Logga in'}
          </LoginButton>

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>

        <BackLink href="/">← Tillbaka till webbplatsen</BackLink>
      </LoginCard>
    </LoginWrapper>
  );
};

export default PortalLoginPage;
