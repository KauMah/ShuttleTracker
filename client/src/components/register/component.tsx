import { $black, $lightGrey, $msured, $red, $white } from '../../assets/colors';

import { RegisterForm } from './registerform';
import { css } from '@emotion/react';

const styles = {
  MsuLogo: css({
    fontSize: '75px',
    '@media(max-width: 768px)': {
      fontSize: '60px',
    },
    fontFamily: 'Helvetica',
    fontWeight: '700',
    color: $msured,
    padding: '10px 35px',
  }),
  centerBlock: {
    backgroundColor: $white,
    marginTop: '20vh',
    height: '60vh',
    width: '65vw',
  },
  welcome: css({
    color: $msured,
    textShadow: '1px 1px black',
    fontWeight: '700',
    fontSize: '30px',
  }),
};
const Register = () => {
  return (
    <div style={{ backgroundColor: $lightGrey }}>
      <div className="row">
        <div className="col-5 mx-auto" style={styles.centerBlock}>
          <div className="d-flex justify-content-center" css={styles.welcome}>
            MSU Shuttle registration
          </div>
          <RegisterForm />
        </div>
      </div>
      <div className="row" style={{ height: '100vh' }}></div>
    </div>
  );
};
export default Register;
