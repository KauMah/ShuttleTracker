import { $black, $grey, $red, $white } from '../../assets/colors';

import { NavLink } from 'react-router-dom';
import { css } from '@emotion/react';

const styles = {
  msulogo: css({
    backgroundColor: $white,
    transform: 'skew(10deg)',
    padding: '15px 30px',
  }),
  msulinks: css({
    backgroundColor: $red,
    transform: 'skew(-14deg)',
  }),
  background: css({
    backgroundColor: $red,
    backdropFilter: 'blur(10px)',
    WebKitBackDropFilter: 'blur(2px)',
    mask: 'linear-gradient(black 30%, transparent)',
    height: '15vh',
    padding: '50px',
  }),
  title: css({
    color: $black,
    fontSize: 40,
    fontFamily: 'sans-serif',
    fontWeight: 'Bold',
    // fontStyle: 'oblique',
    lineHeight: '50px',
    textAlign: 'center',
    transition: 'color 0.25s',
    '&:hover': {
      color: $grey,
    },
  }),
  links: css({
    color: $black,
    fontSize: 25,
    fontWeight: 'bold',
    padding: '30px 30px',
    textAlign: 'center',
  }),
};

const Navbar = () => {
  return (
    <div className="row">
      <div className="col-2" css={styles.msulogo}>
        <h1 css={styles.title}>MSU</h1>
      </div>
      <div className="col-10" css={styles.msulinks}>
        <div className="d-flex justify-content-end">
          <NavLink to="/home" css={styles.links}>
            Home
          </NavLink>
          <NavLink to="/shuttleInfo" css={styles.links}>
            Shuttle
          </NavLink>
          <NavLink to="/help" css={styles.links}>
            Help
          </NavLink>
          <NavLink to="/account" css={styles.links}>
            Account
          </NavLink>
          <NavLink to="/logout" css={styles.links}>
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
