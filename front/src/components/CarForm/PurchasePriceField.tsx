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

function PurchasePriceField({ helperText, onChange, value }: Props) {
  return (
    <div className={styles.labelAndFieldContainer}>
      <p className={styles.label}>Purchase price</p>
      <FormControl error={!!helperText} className={styles.formControl}>
        <div className={styles.priceFieldAndEuroSymbol}>
          <TextField
            className={styles.textField}
            type="number"
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!helperText}
            margin="dense"
          />
          <p>€</p>
        </div>
        <FormHelperText
          className={styles.helperText}
        >
          {helperText}
        </FormHelperText>
      </FormControl>
    </div>
  );
}

PurchasePriceField.propTypes = {
  helperText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default PurchasePriceField;
