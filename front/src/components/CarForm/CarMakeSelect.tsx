import React from 'react';

import PropTypes from 'prop-types';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './index.module.scss';

interface Props {
  helperText: string,
  onChange: (e: React.ChangeEvent<{ value: unknown }>) => void, // eslint-disable-line
  value: string,
  carMakes: string[],
}

function CarMakeSelect({
  helperText, onChange, value, carMakes,
}: Props) {
  return (
    <div className={styles.labelAndFieldContainer}>
      <p className={styles.label}>Car</p>
      <FormControl error={!!helperText} className={styles.formControl}>
        <Select
          className={styles.select}
          value={value}
          variant="outlined"
          margin="dense"
          onChange={onChange}
          classes={{
            icon: styles.selectIcon,
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {carMakes.map((make) => <MenuItem key={make} value={make}>{make}</MenuItem>)}

        </Select>
        <FormHelperText
          className={styles.helperText}
        >
          {helperText}
        </FormHelperText>
      </FormControl>

    </div>
  );
}

CarMakeSelect.propTypes = {
  helperText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  carMakes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CarMakeSelect;
