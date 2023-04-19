import { $grey, $msured, $white } from '../../assets/colors';

import AlertForm from './alertForm';
import { css } from '@emotion/react';

const styles = {
  msuLogo: css({
    height: '15vh',
    width: '20vw',
    backgroundColor: $msured,
    transform: 'skew(-10deg)',
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
    },
  }),
  titleBus: css({
    color: $white,
    fontFamily: 'Helvetica',
    fontSize: 30,
    fontWeight: 700,
    marginTop: '3vh',
    textAlign: 'center',
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
          <h1 css={styles.titleBus}>MSU Shuttle Tracker</h1>
        </div>
      </div>
      <div css={styles.title}>Alert</div>
      <>
        <AlertForm />
      </>
    </>
  );
};

export default Create;
