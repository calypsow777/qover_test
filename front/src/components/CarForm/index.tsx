import React, {
  SyntheticEvent, useState, useEffect,
} from 'react';

import { validate } from 'class-validator';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CarFormFields } from './CarFormFields';
import { getCarMakes, getPrices } from '../../actions/pricesActions';
import { RootState } from '../../store';
import AgeField from './AgeField';
import CarMakeSelect from './CarMakeSelect';
import PurchasePriceField from './PurchasePriceField';
import { CustomHttpError } from '../../common/CustomHttpError';
import { addRequestErrorToQueue } from '../../actions/snackbarsActions';

import styles from './index.module.scss';

function CarForm() {
  const [age, setAge] = useState('');
  const [ageHelperText, setAgeHelperText] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carMakeHelperText, setCarMakeHelperText] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [purchasePriceHelperText, setPurchasePriceHelperText] = useState('');
  const [globalError, setGlobalError] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [loading, setLoading] = useState(true);

  const carMakes = useSelector((state: RootState) => state.prices.carMakes);

  const carFormTheme = createTheme({
    palette: {
      primary: {
        main: '#31cfda',
      },
    },
  });

  function handleOnFetchCarMakesFinish() {
    setLoading(false);
  }

  useEffect(() => {
    getCarMakes().finally(handleOnFetchCarMakesFinish);
  }, []);

  useEffect(() => {
    if (globalError) setGlobalError('');
  }, [age, carMake, purchasePrice]);

  function handleOnAgeChange(e: SyntheticEvent) {
    if (ageHelperText) setAgeHelperText('');
    setAge((e.target as HTMLInputElement).value);
  }

  function handleOnPurchasePriceChange(e: SyntheticEvent) {
    if (purchasePriceHelperText) setPurchasePriceHelperText('');
    setPurchasePrice((e.target as HTMLInputElement).value);
  }

  function handleOnCarMakeChange(e: React.ChangeEvent<{ value: unknown }>) {
    if (carMakeHelperText) setCarMakeHelperText('');
    setCarMake(e.target.value as string);
  }

  function clearErrors() {
    setAgeHelperText('');
    setCarMakeHelperText('');
  }

  function handleOnGetPricesError(error: CustomHttpError) {
    const { customErrors } = error;

    if (customErrors.length) {
      customErrors.forEach((e) => {
        if (e.errorCode === 'prices-10') setGlobalError(e.frontMessage);
      });
    } else {
      addRequestErrorToQueue(error);
    }
  }

  function handleOnGetPricesFinish() {
    setWaiting(false);
  }

  async function handleOnGetAPriceSubmit(e: SyntheticEvent) {
    e.preventDefault();

    clearErrors();

    let ageIsValid = true;
    let carMakeIsValid = true;
    const purchasePriceIsValid = true;

    const numAge = Number.parseInt(age, 10);
    const numPurchasePrice = Number.parseInt(purchasePrice, 10);

    const carFormFields = new CarFormFields({ driverAge: numAge, carMake, purchasePrice: numPurchasePrice });
    const errors = await validate(carFormFields, { stopAtFirstError: true });
    errors.forEach((err) => {
      const { constraints = {} } = err;
      if (err.property === 'driverAge') {
        ageIsValid = false;
        setAgeHelperText(constraints.isInt || constraints.isPositive || constraints.min || constraints.max);
      } else if (err.property === 'carMake') {
        carMakeIsValid = false;
        setCarMakeHelperText(constraints.isNotEmpty);
      } else if (err.property === 'purchasePrice') {
        setPurchasePriceHelperText(constraints.isNumber || constraints.isPositive || constraints.min);
      }
    });

    if (ageIsValid && carMakeIsValid && purchasePriceIsValid) {
      if (numAge < 25 && carMake === 'Porsche') {
        setGlobalError('Sorry! We cannot accept this particular risk.');
      } else {
        setWaiting(true);
        getPrices({
          fields: {
            driverAge: numAge,
            carMake,
            purchasePrice: numPurchasePrice,
          },
        }).catch(handleOnGetPricesError).finally(handleOnGetPricesFinish);
      }
    }

    return null;
  }

  return (
    <ThemeProvider theme={carFormTheme}>
      <div className={styles.carFormContainer}>
        <form onSubmit={handleOnGetAPriceSubmit}>
          {loading
            ? (
              <CircularProgress color="primary" />
            )
            : (
              <div className={styles.formContainer}>
                <AgeField helperText={ageHelperText} onChange={handleOnAgeChange} value={age} />

                <CarMakeSelect helperText={carMakeHelperText} onChange={handleOnCarMakeChange} value={carMake} carMakes={carMakes} />

                <PurchasePriceField helperText={purchasePriceHelperText} onChange={handleOnPurchasePriceChange} value={purchasePrice} />

                <div className={styles.globalErrorContainer}>
                  <p className={styles.label} />
                  <p className={styles.helperText}>{globalError}</p>
                </div>

                <div className={styles.getAPriceButtonContainer}>
                  <p className={styles.label} />
                  <Button
                    className={styles.getAPriceButton}
                    disabled={waiting}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Get a price
                  </Button>
                </div>
              </div>
            )}
        </form>
      </div>
    </ThemeProvider>

  );
}

export default CarForm;
