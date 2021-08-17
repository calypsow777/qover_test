import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import PaySwitch from './PaySwitch';
import PlanSummary from './PlanSummary';
import styles from './index.module.scss';
import { GetPricesResponse } from '../../common/prices';
import LookupSvg from '../../images/lookup.svg';

interface Props {
  prices: GetPricesResponse;
}

function PricePlans({ prices }: Props) {
  const [payYearly, setPayYearly] = useState(false);
  const [planSelected, setPlanSelected] = useState('global');

  function handleOnPaySwitchChange() {
    setPayYearly(!payYearly);
  }

  function handleOnChooseGlobalClick() {
    setPlanSelected('global');
  }

  function handleOnChooseUniversalClick() {
    setPlanSelected('universal');
  }

  function handleOnShowFullTableClick() {
    // Not implemented.
  }

  return (
    <div className={styles.pricePlansContainer}>
      <h2 className={styles.title}>Select a plan</h2>
      <Box className={styles.paySwitchContainer}>
        <PaySwitch checked={payYearly} onChange={handleOnPaySwitchChange} />
      </Box>

      <Box mt="2em" className={styles.planSummariesContainer}>
        <PlanSummary
          name="Global"
          isSelected={planSelected === 'global'}
          yearlyPrice={prices.global.yearlyPrice}
          payMonthly={!payYearly}
          maxDurationTravel={90}
          medicalReimbursement={1000000}
          personalAssistanceAbroad={5000}
          travelAssistanceAbroad={1000}
          coverageDuration={1}
          onChooseThisPlanClick={handleOnChooseGlobalClick}
        />

        <PlanSummary
          name="Universal"
          isSelected={planSelected === 'universal'}
          yearlyPrice={prices.universal.yearlyPrice}
          payMonthly={!payYearly}
          maxDurationTravel={180}
          medicalReimbursement={3000000}
          personalAssistanceAbroad={10000}
          travelAssistanceAbroad={2500}
          coverageDuration={1}
          onChooseThisPlanClick={handleOnChooseUniversalClick}
        />
      </Box>

      <Box mt="2.5em">
        <div
          className={styles.showFullLinkAndIconContainer}
          onClick={handleOnShowFullTableClick}
          onKeyDown={handleOnShowFullTableClick}
          tabIndex={0}
          role="link"
        >
          <span className={styles.showFullTableLink}>
            Show me the full comparison table
          </span>
          <img className={styles.lookupIcon} src={LookupSvg} height={15} width={17} alt="Lookup icon" />
        </div>

      </Box>

    </div>
  );
}

PricePlans.propTypes = {
  prices: PropTypes.shape({
    global: PropTypes.shape({
      yearlyPrice: PropTypes.number,
    }),
    universal: PropTypes.shape({
      yearlyPrice: PropTypes.number,
    }),
  }).isRequired,
};

export default PricePlans;
