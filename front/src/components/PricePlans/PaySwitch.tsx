import React from 'react';

import PropTypes from 'prop-types';

import Switch from '@material-ui/core/Switch';

import styles from './PaySwitch.module.scss';

interface Props {
  checked: boolean,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, // eslint-disable-line
}

function PaySwitch({ checked, onChange }: Props) {
  return (
    <div className={styles.switchAndLabelsContainer}>
      <span className={`${styles.label} ${checked ? {} : styles.bold}`}>PAY MONTHLY</span>
      <Switch
        checked={checked}
        onChange={onChange}
        color="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
        classes={{
          track: styles.track,
        }}
      />
      <span className={`${styles.label} ${checked ? styles.bold : {}}`}>PAY YEARLY</span>
    </div>
  );
}

PaySwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PaySwitch;
