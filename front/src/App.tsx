import React from 'react';

import AppBar from './components/AppBar';
import Footer from './components/Footer';
import Login from './components/Login';
import styles from './App.module.scss';

function App() {
  // TODO: use current screen in redux state
  const background = styles.loginScreenBg;
  // const background = styles.pricePlansScreenBg;
  return (
    <div className={`${styles.appContainer} ${background}`}>
      <AppBar />
      <div className={styles.contentContainer}>
        <Login />
      </div>
      <Footer />
    </div>
  );
}

export default App;
