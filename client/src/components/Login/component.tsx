import { $grey, $red, $white } from '../../assets/colors';

import LoginForm from './loginForm';
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
    // display: 'flex',
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
    </div>
  );
};
export default Login;
