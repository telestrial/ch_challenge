import { createTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Login from './Login';

import './App.css';

const theme = createTheme({
  palette: {
    background: {
      default: '#1d3557',
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Login />
      </ThemeProvider>
    </>
  );
}

export default App;
