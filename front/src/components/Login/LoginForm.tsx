import React from 'react';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircle from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Button from '@material-ui/core/Button';

import styles from './LoginForm.module.scss';

function LoginForm() {
  function _handleOnForgotPwdClick() {
    // Not implemented
  }

  return (
    <div className={styles.loginFormContainer}>
      <p className={styles.welcomeTitle}>Welcome at Qover</p>
      <Box mt="1em">
        <TextField className={styles.emailTextField} label="Email" />
        <TextField className={styles.passwordTextField} type="password" label="Password" />
        <Box mt="1.5em" className={styles.rememberMeAndForgotPwdContainer}>
          <FormControlLabel
            control={(
              <Checkbox
                color="primary"
                size="small"
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
          <Button className={styles.signInButton} variant="contained" color="primary" fullWidth>
            Sign in to your account
          </Button>
        </Box>

      </Box>

    </div>
  );
}

export default LoginForm;
