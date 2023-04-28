import { $grey, $msured, $red, $white } from '../../assets/colors';

import LoginForm from './loginForm';
import { NavLink } from 'react-router-dom';
import { css } from '@emotion/react';

const styles = {
  background: {
    height: '100vh',
    width: '100vw',
    padding: '80px',
  },
  container: css({
    background: $white,
    height: '55vh',
    width: '50%',
    border: '1px solid red',
    borderRadius: '50px',
    alignItems: 'center',
    textAlign: 'center' as const,
    paddingTop: '55px',
    marginLeft: 'auto',
    marginRight: 'auto',
    '@media (max-width: 765px)': {
      width: '70%',
    },
    '@media (max-width: 500px)': {
      width: '90%',
    },
  }),
  title: css({
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
  titleLogin: css({
    fontFamily: 'Helvetica',
    fontSize: '8vh',
    fontWeight: 500,
    textAlign: 'center',
    marginTop: '-5vh',
    color: $msured,
  }),
  link: css({
    textDecoration: 'none',
    color: $msured,
    '&:hover': {
      color: $red,
    },
  }),
  clickHere: css({
    fontFamily: 'Helvetica',
    fontSize: '15px',
    fontWeight: 500,
  }),
};
const Login = (): JSX.Element => {
  // const toastify = new Toastify({});
  return (
    <div>
      <div className="row">
        <div className="col-12" css={styles.title}>
          <h1 css={styles.titleBus}>MSU Shuttle Tracker</h1>
        </div>
      </div>
      <div style={styles.background}>
        <h2 css={styles.titleLogin}>Login</h2>
        <div css={styles.container} className="container">
          <LoginForm />
        </div>
        <div css={styles.clickHere}>
          <p className="d-flex justify-content-center" style={{ marginTop: '2vh' }}>
            {/* &nbsp; makes it so that it skips a space */}
            Forgot Password?&nbsp;
            <NavLink to="/forgotPass" css={styles.link}>
              Click Here
            </NavLink>
          </p>
          <p className="d-flex justify-content-center" style={{ marginTop: '-3vh' }}>
            {/* &nbsp; makes it so that it skips a space */}
            Dont have an account?&nbsp;
            <NavLink to="/register" css={styles.link}>
              Click Here
            </NavLink>
          </p>
        </div>
        <div />
      </div>
    </div>
  );
};
export default Login;
