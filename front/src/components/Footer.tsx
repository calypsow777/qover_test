import React from 'react';

import styles from './Footer.module.scss';

function Footer() {
  // TODO: change color if current screen = pricePlans
  const footerStyle = styles.footerContainerDark;
  return (
    <div className={footerStyle}>
      © Qover 2021
    </div>
  );
}

export default Footer;
