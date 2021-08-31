import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import Login from './components/Login';
import CarForm from './components/CarForm';
import PricePlans from './components/PricePlans';
import SnackbarsManager from './components/SnackbarsManager';
import styles from './App.module.scss';
import { RootState } from './store';
import { verify } from './actions/authActions';
import { changeCurrentScreen } from './actions/globalActions';

function App() {
  const [waiting, setWaiting] = useState(true);

  const currentScreen = useSelector((state: RootState) => state.global.currentScreen);
  const prices = useSelector((state: RootState) => state.prices.prices);
  const background = currentScreen === 'pricePlans' ? styles.pricePlansScreenBg : styles.loginScreenBg;
  const imgBackground = currentScreen === 'carForm' ? styles.carFormScreenImgBg : {};

  function handleOnVerifySuccess() {
    setWaiting(false);
  }

  function handleOnVerifyError() {
    setWaiting(false);
  }

  useEffect(() => {
    verify().then(handleOnVerifySuccess).catch(handleOnVerifyError);
  }, []);

  useEffect(() => {
    if (prices) changeCurrentScreen('pricePlans');
  }, [prices]);

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

    if (currentScreen === 'carForm') {
      return (
        <CarForm />
      );
    }

    if (currentScreen === 'pricePlans') {
      return (
        <PricePlans prices={prices!} />
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
