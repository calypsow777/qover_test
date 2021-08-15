import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import Login from './components/Login';
import SnackbarsManager from './components/SnackbarsManager';
import styles from './App.module.scss';
import { RootState } from './store';
import { verify } from './actions/authActions';

function App() {
  const [waiting, setWaiting] = useState(true);

  const currentScreen = useSelector((state: RootState) => state.global.currentScreen);
  const background = currentScreen === 'pricePlans' ? styles.pricePlansScreenBg : styles.loginScreenBg;
  const imgBackground = currentScreen === 'carForm' ? styles.carFormScreenImgBg : {};

  function handleOnVerifySuccess() {
    setWaiting(false);
  }

  function handleOnVerifyError() {
    setWaiting(false);
  }

  useEffect(() => {
    verify({
      callbacks: {
        onSuccess: handleOnVerifySuccess,
        onError: handleOnVerifyError,
      },
    });
  }, []);

  function renderContent() {
    if (waiting) {
      return (
        <div className={styles.circularProgressContainer}>
          <CircularProgress color="secondary" />
        </div>
      );
    }

    if (currentScreen === 'login') {
      return (
        <Login />
      );
    }

    return null;
  }

  return (
    <div className={`${styles.appContainer} ${background}`}>
      <AppBar />
      <div className={`${styles.contentContainer} ${imgBackground}`}>
        {renderContent()}
      </div>
      <SnackbarsManager />
      <Footer />
    </div>
  );
}

export default App;
