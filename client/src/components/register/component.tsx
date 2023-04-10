import { $black, $msured, $salmon, $white } from '../../assets/colors';

import RegisterForm from './registerform';
import { css } from '@emotion/react';
import msuReg from '../../assets/img/MsuReg.jpg';

const styles = {
  welcome: css({
    color: $msured,
    textShadow: '1.5px 1.5px black',
    fontWeight: '700',
    fontSize: '50px',
  }),
  leftCol: css({
    height: '100vh',
    width: '55vw',
    background: `url(${msuReg}) no-repeat 50% 50%`,
    backgroundSize: '100%',
    '@media (max-width: 988px)': {
      display: 'none',
    },
  }),
  rightCol: css({
    height: '100vh',
    width: '45vw',
    marginTop: '5%',
    '@media (max-width: 768px)': {
      marginLeft: '40%',
    },
  }),
};
const Register = () => {
  return (
    <div className="row">
      <div className="col-7" css={styles.leftCol} style={{ border: '2px solid black' }}>
        hello
      </div>
      <div className="col-5" css={styles.rightCol}>
        <div className="d-flex justify-content-center" css={styles.welcome}>
          MSU Registration
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};
export default Register;
