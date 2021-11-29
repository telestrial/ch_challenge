import { useRef, useState } from 'react';
import { FormLabel, TextField, Button, Grid, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { checkLogin } from '../api';

const LoginForm = ({ isAuthorized }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [emailValidity, setEmailValidity] = useState(true);
  const [passwordValidity, setPasswordValidity] = useState(true);
  const [failedLogin, setFailedLogin] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // If user tries to submit either field blank, do not hit database and
    // instead let them know.
    if (emailRef.current.value === '' || passwordRef.current.value === '') {
      if (emailRef.current.value === '') setEmailValidity(false);
      if (passwordRef.current.value === '') setPasswordValidity(false);
    } else {
      const login = await checkLogin(
        emailRef.current.value,
        passwordRef.current.value
      );

      if (login.uuid) {
        isAuthorized(true);
      } else {
        setFailedLogin(true);
      }
    }
  };

  return (
    <>
      <h1>Login</h1>
      {failedLogin && (
        <Box mb="1rem">
          <Alert
            onClose={() => {
              setFailedLogin(false);
            }}
            severity="error"
          >
            We were unable to log you in. Please try again.
          </Alert>
        </Box>
      )}
      <form onSubmit={onSubmitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormLabel hidden>Email</FormLabel>
            <TextField
              inputRef={emailRef}
              type="email"
              id="email"
              label="Email"
              variant="outlined"
              fullWidth={true}
              error={!emailValidity}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel hidden>Password</FormLabel>
            <TextField
              inputRef={passwordRef}
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              fullWidth={true}
              error={!passwordValidity}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="Submit"
              color="primary"
              variant="contained"
              fullWidth={true}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginForm;
