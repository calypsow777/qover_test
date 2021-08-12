import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import LoginForm from './LoginForm';
import styles from './index.module.scss';

import QoverLogo from '../../images/qoverLogo.svg';

function Login() {
  const askAccessButtonTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
    },
  });

  function _handleOnAskAccessClick() {
    // Not implemented
  }

  return (
    <div className={styles.indexContainer}>
      <img src={QoverLogo} alt="Qover logo" />
      <Box mt="2em">
        <LoginForm />
        <Box mt="1.2em">
          <ThemeProvider theme={askAccessButtonTheme}>
            <Button onClick={_handleOnAskAccessClick} className={styles.askAccessButton} variant="outlined" color="primary" fullWidth>
              <p>
                Don&apos;t have an account?
                <span className={styles.askAccessSpan}>Ask access</span>
              </p>
            </Button>
          </ThemeProvider>

        </Box>
      </Box>

    </div>
  );
}

export default Login;
