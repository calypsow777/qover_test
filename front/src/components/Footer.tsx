import React from 'react';

import { useSelector } from 'react-redux';

import { RootState } from '../store';

import styles from './Footer.module.scss';

function Footer() {
  const currentScreen = useSelector((state: RootState) => state.global.currentScreen);
  const footerStyle = currentScreen === 'pricePlans' ? styles.footerContainerDark : styles.footerContainerLight;

  return (
    <div className={footerStyle}>
      © Qover 2021
    </div>
  );
}

export default Footer;
