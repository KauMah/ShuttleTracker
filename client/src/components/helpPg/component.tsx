import { $grey, $red, $white } from '../../assets/colors';

import React from 'react';
import { css } from '@emotion/react';

const styles = {
  background: {
    backgroundColor: $white,
    height: '1vh',
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

const helpPg = () => {
  return (
    <div style={styles.background}>
      <h1 css={styles.title}>MSU</h1>
      <div style={styles.container} className="container-"></div>
    </div>
  );
};
export default helpPg;
