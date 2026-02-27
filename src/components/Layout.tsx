import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import type { ReactNode } from 'react';
import { defaultTheme } from './ui/Theme';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          isplay: 'flex',
          paddingTop: 4,
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}
      >
        {children}
      </Container>
    </ThemeProvider>
  );
}

export { Layout };
