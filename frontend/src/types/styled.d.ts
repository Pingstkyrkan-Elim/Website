import 'styled-components';

// Define the theme interface
interface Theme {
  colors: {
    primary: {
      main: string;
      light: string;
      dark: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
    };
    neutral: {
      white: string;
      light: string;
      gray: string;
      dark: string;
      black: string;
    };
    accent: {
      gold: string;
      success: string;
      warning: string;
      error: string;
    };
    oasis: {
      green: string;
      greenLight: string;
      greenDark: string;
      blue: string;
      blueLight: string;
      blueDark: string;
    };
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    large: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
    full: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
}

// Extend the DefaultTheme interface
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
