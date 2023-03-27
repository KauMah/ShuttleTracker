import { $grey, $red, $white } from '../../assets/colors';

import { NavLink } from 'react-router-dom';
import { css } from '@emotion/react';

const styles = {
  background: {
    backgroundColor: $red,
    height: '25vh',
    padding: '60px',
  },
  title: css({
    color: $white,
    fontSize: 50,
    // borderBottom: '100px',
    lineHeight: '0px',
    transition: 'color 0.25s',
    '&:hover': {
      color: $grey,
    },
  }),
  links: {
    fontSize: 20,
    padding: '20px',
    lineHeight: '0px',
  },
};

const Navbar = () => {
  return (
    <div className="row">
      <div className="col" style={styles.background}>
        <h1 css={styles.title}>MSU</h1>
      </div>
      <div className="col" style={styles.background}>
        <div className="d-flex justify-content-end">
          <NavLink to="/home" style={styles.links}>
            Home
          </NavLink>
          <NavLink to="/shuttleInfo" style={styles.links}>
            View Shuttle-Info
          </NavLink>
          <NavLink to="/help" style={styles.links}>
            Help
          </NavLink>
          <NavLink to="/account" style={styles.links}>
            Account
          </NavLink>
          <NavLink to="/logout" style={styles.links}>
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
