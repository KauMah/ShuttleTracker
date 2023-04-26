import { $msured } from '../../assets/colors';
import MsuFor from '../../assets/img/MSUFor.jpg';
import { css } from '@emotion/react';

const styles = {
  welcome: css({
    color: $msured,
    fontWeight: '700',
    fontSize: '50px',
    // marginLeft: '18%',
  }),

  leftCol: css({
    height: '120vh',
    width: '55vw',
    background: `url(${MsuFor}) no-repeat 50% 50%`,
    backgroundSize: '182%',
    '@media (max-width: 1180px)': {
      backgroundSize: '200%',
    },
    '@media (max-width: 988px)': {
      display: 'none',
    },
  }),
  rightCol: css({
    height: '100vh',
    width: '45vw',
    marginTop: '5%',
    '@media (max-width: 988px)': {
      marginLeft: '20%',
    },
  }),
};
const Forgot = () => {
  return (
    <div className="row">
      <div className="col-7" css={styles.leftCol} style={{ border: '2px solid black' }}></div>
      <div className="col-5" css={styles.rightCol}>
        <div className="d-flex justify-content-center" css={styles.welcome}>
          Forgot Password
        </div>
      </div>
    </div>
  );
};

export default Forgot;
