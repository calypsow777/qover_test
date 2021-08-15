import React from 'react';

import { useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftOutlined';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import json2mq from 'json2mq';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { logout } from '../actions/authActions';

import { RootState } from '../store';

import styles from './AppBar.module.scss';

function AppBar() {
  const user = useSelector((state: RootState) => state.users.user);

  const screenWidthIsMin600Px = useMediaQuery(
    json2mq({
      minWidth: 600,
    }),
  );

  const navItemsTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
    },
  });

  function handleOnLogoutClick() {
    logout();
  }

  const buttonsSize = screenWidthIsMin600Px ? 'medium' : 'small';

  return (
    <div className={styles.appBarContainer}>
      <ThemeProvider theme={navItemsTheme}>
        <Container className={styles.navItemsContainer} maxWidth="lg">
          <div>
            <Button color="primary" size={buttonsSize} startIcon={<ChevronLeftIcon className={styles.chevronLeftIcon} />}>
              <a className={styles.qoverLink} href="https://qover.me">qover.me</a>
            </Button>
          </div>
          {user && (
            <Button color="primary" size={buttonsSize} onClick={handleOnLogoutClick}>Log out</Button>
          )}
        </Container>
      </ThemeProvider>

    </div>
  );
}

export default AppBar;
