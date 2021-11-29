import { Container, Box } from '@material-ui/core';

import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <Container fixed>
      <Box display="flex" justifyContent="center">
        <Box mt="25%" bgcolor="white" borderRadius="5px" p="1rem">
          <LoginForm />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
