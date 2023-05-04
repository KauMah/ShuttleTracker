import { $grey, $msured, $white } from '../../assets/colors';

import AlertForm from './alertForm';
import ClearForm from './clearForm';
import { NavLink } from 'react-router-dom';
import { css } from '@emotion/react';

const styles = {
  msuLogo: css({
    height: '15vh',
    width: '20vw',
    backgroundColor: $msured,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    transform: 'skew(-9deg)',
    transition: 'color 0.25s',
    border: '1px solid white',
    boxShadow: '5px 5px 5px grey',
    '@media (max-width: 1100px)': {
      width: '25vw',
    },
    '@media (max-width: 830px)': {
      width: '30vw',
    },
    '@media (max-width: 765px)': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
  titleBus: css({
    color: $white,
    fontFamily: 'Helvetica',
    fontSize: 30,
    fontWeight: 700,
    textDecoration: 'none',
    transform: 'skew(5deg)',
    '&:hover': {
      color: $grey,
    },
    '@media (max-width: 765px)': {
      textAlign: 'center',
    },
  }),
  title: css({
    fontSize: '6.3rem',
    fontFamily: 'Helvetica',
    color: $msured,
    height: '30vh',
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
  }),
  alerts: css({
    fontSize: '3rem',
    fontFamily: 'Helvetica',
    marginTop: '3rem',
    marginBottom: '5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
  }),
};

const Create = () => {
  return (
    <>
      <div className="row fixed-top">
        <div className="col-12" css={styles.msuLogo}>
          <NavLink to="/shuttleInfo" css={styles.titleBus}>
            MSU Shuttle Tracker
          </NavLink>
        </div>
      </div>
      <div css={styles.title}>Alerts</div>
      <div>
        <div css={styles.alerts}>Create Alerts</div>
        <AlertForm />
      </div>
      <div style={{ marginBottom: '7rem' }}>
        <div css={styles.alerts}>Active Alerts</div>
        <ClearForm />
      </div>
    </>
  );
};

export default Create;
