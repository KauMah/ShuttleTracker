/* eslint-disable react/no-unescaped-entities */
import { $grey, $red, $white } from '../../assets/colors';

import LoginForm from './loginForm';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { css } from '@emotion/react';

const styles = {
  background: {
    backgroundColor: $red,
    height: '100vh',
    width: '100vw',
    padding: '40px',
  },
  title: css({
    color: $white,
    fontSize: 50,
    transition: 'color 0.25s',
    '&:hover': {
      color: $grey,
    },
  }),
  container: {
    alignItems: 'center',
    textAlign: 'center' as const,
    width: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};
const Login = (): JSX.Element => {
  return (
    <div style={styles.background}>
      <h1 css={styles.title}>MSU</h1>
      <div style={styles.container} className="container-">
        <LoginForm />
      </div>
      <p className="d-flex justify-content-center" style={{ marginTop: '2vh' }}>
        {/* &nbsp; makes it so that it skips a space */}
        Don't have an account?&nbsp;<NavLink to="/register">Click Here</NavLink>
      </p>
      <div />
    </div>
  );
};
export default Login;
