import { useRef } from 'react';
import { FormLabel, TextField, Button, Grid } from '@material-ui/core';

const LoginForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(emailRef.current.value, passwordRef.current.value);
  };

  return (
    <>
      <h1>Login</h1>
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
