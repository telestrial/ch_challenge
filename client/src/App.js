import { useState } from 'react';
import { createTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Login from './Login';
import Users from './Users';

import './App.css';

const theme = createTheme({
  palette: {
    background: {
      default: '#1d3557',
    },
  },
});

function App() {
  const [showUsers, setShowUsers] = useState(false);

  const showUsersHandler = (authStatus) => {
    setShowUsers(authStatus);
    console.log('App level hit!');
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* {!showUsers && <Login showUsers={showUsersHandler} />} */}
        {/* {showUsers && 'YA'} */}
        <Users />
      </ThemeProvider>
    </>
  );
}

export default App;
