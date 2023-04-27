import { $msured } from '../../assets/colors';
import RegisterForm from './registerform';
import { css } from '@emotion/react';
import msuReg from '../../assets/img/MsuReg.jpg';

const styles = {
  welcome: css({
    color: $msured,
    // width: '18%',
    marginLeft: '18%',
    fontWeight: 700,
    fontSize: '3rem',
    '@media (max-width: 800px)': {
      marginLeft: '0%',
    },
  }),
  leftCol: css({
    height: '120vh',
    width: '55vw',
    background: `url(${msuReg}) no-repeat 50% 50%`,
    backgroundSize: '120%',
    '@media (max-width: 988px)': {
      display: 'none',
    },
  }),
  rightCol: css({
    height: '100vh',
    width: '45vw',
    marginTop: '5%',
    '@media (max-width: 988px)': {
      marginLeft: '30%',
    },
  }),
};
const Register = () => {
  return (
    <div className="row">
      <div className="col-7" css={styles.leftCol} style={{ border: '2px solid black' }}></div>
      <div className="col-5" css={styles.rightCol}>
        <div css={styles.welcome}>MSU Shuttle Registration</div>
        <RegisterForm />
      </div>
    </div>
  );
};
export default Register;
