import React from 'react';

import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import styles from './index.module.scss';

interface Props {
  helperText: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, // eslint-disable-line
  value: string,
}

function AgeField({ helperText, onChange, value }: Props) {
  return (
    <div className={styles.labelAndFieldContainer}>
      <p className={styles.label}>Age of the driver</p>
      <FormControl error={!!helperText} className={styles.formControl}>
        <TextField
          className={styles.textField}
          type="number"
          variant="outlined"
          value={value}
          onChange={onChange}
          error={!!helperText}
          margin="dense"
        />
        <FormHelperText
          className={styles.helperText}
          id="component-error-text"
        >

          {helperText}
        </FormHelperText>
      </FormControl>
    </div>
  );
}

AgeField.propTypes = {
  helperText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default AgeField;
