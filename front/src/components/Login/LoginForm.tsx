import React, { SyntheticEvent, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircle from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Button from '@material-ui/core/Button';
import { login } from '../../actions/authActions';
import { addRequestErrorToQueue } from '../../actions/snackbarsActions';

import styles from './LoginForm.module.scss';
import { CustomHttpError } from '../../common/CustomHttpError';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [emailHelperText, setEmailHelperText] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHelperText, setPasswordHelperText] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [waiting, setWaiting] = useState(false);

  function handleOnEmailChange(event: SyntheticEvent) {
    setEmail((event.target as HTMLInputElement).value);
  }

  function handleOnPasswordChange(event: SyntheticEvent) {
    setPassword((event.target as HTMLInputElement).value);
  }

  function handleOnRememberMeChange(event: SyntheticEvent) {
    setRememberMe((event.target as HTMLInputElement).checked);
  }

  function handleOnSignInFinish() {
    setWaiting(false);
  }

  function handleOnSignInError(error: CustomHttpError) {
    const { customErrors } = error;

    if (customErrors.length) {
      customErrors.forEach((e) => {
        if (e.errorCode === 'auth-1') setEmailHelperText(e.frontMessage);
        else if (e.errorCode === 'auth-2') setPasswordHelperText(e.frontMessage);
        else if (e.errorCode === 'auth-3') setEmailHelperText(e.frontMessage);
        else if (e.errorCode === 'auth-4') setPasswordHelperText(e.frontMessage);
      });
    } else {
      addRequestErrorToQueue(error);
    }
  }

  function clearErrors() {
    setEmailHelperText('');
    setPasswordHelperText('');
  }

  function handleOnSignInSubmit(e: SyntheticEvent) {
    // TODO: For simplicity we don't check the form values before sending the request.
    // In a real environment we should also perform a check on the client side.
    e.preventDefault();
    clearErrors();

    if (!email) setEmailHelperText('Please enter your email.');
    if (!password) setPasswordHelperText('Please enter your password.');
    if (!email || !password) return;

    setWaiting(true);
    login({
      fields: { email, password, rememberMe },
      callbacks: {
        onFinish: handleOnSignInFinish,
        onError: handleOnSignInError,
      },
    });
  }

  function _handleOnForgotPwdClick() {
    // Not implemented
  }

  return (
    <div className={styles.loginFormContainer}>
      <p className={styles.welcomeTitle}>Welcome at Qover</p>
      <Box mt="1em">
        <form onSubmit={handleOnSignInSubmit}>
          <TextField
            className={styles.emailTextField}
            value={email}
            onChange={handleOnEmailChange}
            label="Email"
            error={!!emailHelperText}
            helperText={emailHelperText}
          />
          <TextField
            className={styles.passwordTextField}
            value={password}
            onChange={handleOnPasswordChange}
            type="password"
            label="Password"
            error={!!passwordHelperText}
            helperText={passwordHelperText}
          />
          <Box mt="1.5em" className={styles.rememberMeAndForgotPwdContainer}>
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  size="small"
                  checked={rememberMe}
                  onChange={handleOnRememberMeChange}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircle />}
                />
              )}
              label={<span className={styles.rememberMeLabel}>Remember me</span>}
            />
            <div
              onClick={_handleOnForgotPwdClick}
              onKeyDown={_handleOnForgotPwdClick}
              role="button"
              tabIndex={0}
              className={styles.forgotPwdContainer}
            >
              <p>Forgot your password?</p>
            </div>
          </Box>

          <Box mt="1.5em">
            <Button
              className={styles.signInButton}
              disabled={waiting}
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
            >
              Sign in to your account
            </Button>
          </Box>

        </form>

      </Box>

    </div>
  );
}

export default LoginForm;
