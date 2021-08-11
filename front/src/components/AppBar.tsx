import React from 'react';

import styles from './AppBar.module.scss';

function AppBar() {
  return (
    <div className={styles.appBarContainer}>
      <div className={styles.qoverLinkAndIconContainer}>
        <span className={`material-icons-outlined ${styles.chevronLeftIcon}`}>
          chevron_left
        </span>
        <a className={styles.qoverLink} href="https://qover.me">QOVER.ME</a>
      </div>
    </div>
  );
}

export default AppBar;
