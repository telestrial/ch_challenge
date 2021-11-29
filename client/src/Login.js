import { Container, Box } from '@material-ui/core';

import LoginForm from './components/LoginForm';

const Login = ({ showUsers }) => {
  const isAuthorized = (authStatus) => {
    showUsers(authStatus);
  };

  return (
    <Container fixed>
      <Box display="flex" justifyContent="center">
        <Box mt="25%" bgcolor="white" borderRadius="5px" p="1rem">
          <LoginForm isAuthorized={isAuthorized} />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
