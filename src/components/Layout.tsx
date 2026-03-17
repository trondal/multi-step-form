import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import type { ReactNode } from 'react';
import { defaultTheme } from './ui/Theme';
import { Link } from 'react-router-dom';

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
          display: 'flex',
          justifyContent: 'space-evenly',
          bgcolor: 'background.default'
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/files">Files</Link>
        <Link to="/users">Users</Link>
      </Container>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          paddingTop: 2,
          flexDirection: 'column',
          justifyContent: 'center',
          bgcolor: 'background.default'
        }}
      >
        {children}
      </Container>
    </ThemeProvider>
  );
}

export { Layout };
