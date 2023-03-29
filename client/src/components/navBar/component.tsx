import { $black, $grey, $lightGrey, $msured, $red, $white } from '../../assets/colors';

import { NavLink } from 'react-router-dom';
import { css } from '@emotion/react';

const styles = {
  buslogo: css({
    backgroundColor: $white,
    padding: '15px 30px',
    transform: 'skew(-14deg)',
  }),
  bltitle: css({
    color: $msured,
    fontFamily: 'Roboto',
    fontSize: '1.6em',
    fontWeight: '700',
    textAlign: 'center',
  }),
  msulogo: css({
    backgroundColor: $msured,
    transform: 'skew(-14deg)',
    padding: '30px 30px 25px',
  }),
  mltitle: css({
    color: $white,
    fontFamily: 'Roboto',
    fontSize: '1.7em',
    fontWeight: '700',
  }),
  msulinks: css({
    backgroundColor: $lightGrey,
    transform: 'skew(-14deg)',
  }),
  background: css({
    backgroundColor: $red,
    backdropFilter: 'blur(10px)',
    WebKitBackDropFilter: 'blur(2px)',
    height: '15vh',
    padding: '50px',
  }),
  title: css({
    color: $black,
    fontSize: 40,
    fontFamily: 'sans-serif',
    fontWeight: 'Bold',
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
      <div className="col-2" css={styles.buslogo}>
        <h1 css={styles.bltitle}>MSU Bus Shuttle Tracker</h1>
      </div>
      <div className="col-1" css={styles.msulogo}>
        <h1 css={styles.mltitle}>MSU</h1>
      </div>
      <div className="col-9" css={styles.msulinks}>
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
