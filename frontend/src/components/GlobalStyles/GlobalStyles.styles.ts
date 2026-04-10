import { createGlobalStyle } from 'styled-components';

export const GlobalStylesWrapper = createGlobalStyle`
  /* Import Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap');

  /* CSS Reset and Base Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.colors.neutral.dark};
    background-color: ${({ theme }) => theme.colors.neutral.white};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  h1 {
    font-size: 2.5rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 2rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      font-size: 1.75rem;
    }
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.25rem;
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.dark};
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.3s ease;
  }

  /* Utility Classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.sm};

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding: 0 ${({ theme }) => theme.spacing.md};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      padding: 0 ${({ theme }) => theme.spacing.lg};
    }
  }

  .section-padding {
    padding: ${({ theme }) => theme.spacing.xl} 0;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding: ${({ theme }) => theme.spacing.xxl} 0;
    }
  }

  .text-center {
    text-align: center;
  }

  .text-primary {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  .text-secondary {
    color: ${({ theme }) => theme.colors.secondary.main};
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  /* Animation classes */
  .fade-in {
    animation: fadeIn 0.6s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .slide-up {
    animation: slideUp 0.8s ease-out;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
