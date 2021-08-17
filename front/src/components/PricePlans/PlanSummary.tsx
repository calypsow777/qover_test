import React, { SyntheticEvent } from 'react';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';
import ValidSvg from '../../images/valid.svg';
import styles from './PlanSummary.module.scss';
import { roundToTwoDecimalPlaces } from '../../common/utils';

type PlanName = 'Global' | 'Universal'

interface Props {
  name: PlanName,
  isSelected: boolean,
  yearlyPrice: number,
  payMonthly: boolean,
  maxDurationTravel: number,
  medicalReimbursement: number,
  personalAssistanceAbroad: number,
  travelAssistanceAbroad: number,
  coverageDuration: number,
  onChooseThisPlanClick: (e: SyntheticEvent) => void, // eslint-disable-line
}

function PlanSummary({
  name, isSelected, yearlyPrice, payMonthly, maxDurationTravel,
  medicalReimbursement, personalAssistanceAbroad, travelAssistanceAbroad, coverageDuration, onChooseThisPlanClick,
}: Props) {
  const pricePlanTheme = createTheme({
    palette: {
      primary: {
        main: '#31cfda',
        contrastText: '#ffffff',
      },
    },
  });

  const containerStyle = isSelected ? styles.planSummaryContainerColored : styles.planSummaryContainerWhite;
  const itemContainerStyle = isSelected ? styles.itemContainerColored : styles.itemContainerWhite;
  const priceItemContainerStyle = isSelected ? styles.priceItemContainerColored : styles.priceItemContainerWhite;
  const buttonBackgrondColorStyle = isSelected ? styles.buttonBackgroundWhite : styles.buttonBackgroundColored;
  const price = payMonthly ? roundToTwoDecimalPlaces(yearlyPrice / 12) : yearlyPrice;
  const priceBottomText = payMonthly ? 'MONTHLY INCL. TAXES' : 'YEARLY INCL. TAXES';
  const priceLocaleString = 'de-DE';
  const buttonText = isSelected ? 'Plan selected' : 'Choose this plan';
  const buttonIcon = isSelected ? (
    <Icon>
      <img src={ValidSvg} height={20} width={20} alt="Valid icon" />
    </Icon>
  ) : <> </>;

  return (
    <ThemeProvider theme={pricePlanTheme}>
      <div className={containerStyle}>
        <div className={`${itemContainerStyle}`}>
          <h3 className={styles.planName}>{name}</h3>
        </div>
        <div className={`${itemContainerStyle} ${priceItemContainerStyle}`}>
          <p>
            <span className={styles.price}>{price.toLocaleString(priceLocaleString)}</span>
            <span>€</span>
          </p>
          <span className={styles.priceBottomText}>{priceBottomText}</span>
        </div>
        <div className={`${itemContainerStyle}`}>
          <span className={styles.bold}>
            Maximum duration travel
            <span className={styles.thin}> of</span>
            <span>{` ${maxDurationTravel} days`}</span>
          </span>
        </div>
        <div className={`${itemContainerStyle}`}>
          <span className={styles.bold}>
            Medical expenses reimbursement
            <span className={styles.thin}> up to</span>
            <span>{` ${medicalReimbursement.toLocaleString(priceLocaleString)} €`}</span>
          </span>
        </div>
        <div className={`${itemContainerStyle}`}>
          <span className={styles.bold}>
            Personal assistance abroad
            <span className={styles.thin}> up to</span>
            <span>{` ${personalAssistanceAbroad.toLocaleString(priceLocaleString)} €`}</span>
          </span>
        </div>
        <div className={`${itemContainerStyle}`}>
          <span className={styles.bold}>
            Travel assistance abroad
            <span className={styles.thin}> up to</span>
            <span>{` ${travelAssistanceAbroad.toLocaleString(priceLocaleString)} €`}</span>
            <div>
              <span className={styles.thin}>per insured per travel</span>
            </div>
          </span>
        </div>
        <div className={`${itemContainerStyle}`}>
          <span className={styles.bold}>{`Coverage duration: ${coverageDuration.toLocaleString(priceLocaleString)} year`}</span>
        </div>
        <div className={`${itemContainerStyle} ${styles.buttonContainer}`}>
          <div className={buttonBackgrondColorStyle}>
            <Button
              className={styles.button}
              onClick={onChooseThisPlanClick}
              variant={`${isSelected ? 'outlined' : 'contained'}`}
              color="primary"
              fullWidth
              disableElevation
              startIcon={buttonIcon}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>

  );
}

PlanSummary.propTypes = {
  name: PropTypes.oneOf(['Global', 'Universal']).isRequired,
  isSelected: PropTypes.bool.isRequired,
  yearlyPrice: PropTypes.number.isRequired,
  payMonthly: PropTypes.bool.isRequired,
  maxDurationTravel: PropTypes.number.isRequired,
  medicalReimbursement: PropTypes.number.isRequired,
  personalAssistanceAbroad: PropTypes.number.isRequired,
  travelAssistanceAbroad: PropTypes.number.isRequired,
  coverageDuration: PropTypes.number.isRequired,
  onChooseThisPlanClick: PropTypes.func.isRequired,
};

export default PlanSummary;
