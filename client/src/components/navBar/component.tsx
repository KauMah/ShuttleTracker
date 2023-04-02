import { $black, $msured, $transparent, $white } from '../../assets/colors';

import { AuthContext } from '../../utils/AuthContext';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { css } from '@emotion/react';
import msuNav from '../../assets/img/MsuNav.jpg';
import { useContext } from 'react';

const styles = {
  buslogo: css({
    backgroundColor: $white,
    padding: '15px 30px',
    transform: 'skew(-10deg)',
    border: `1.5px solid #D1190D`,
    height: '100px',
    width: '160px',
    paddingTop: '10px',
    marginLeft: '-10px',
    marginTop: '-10px',
  }),
  bltitle: css({
    color: $msured,
    fontFamily: 'Helvetica',
    fontSize: '1.3em',
    fontWeight: '700',
    textAlign: 'center',
  }),
  msulogo: css({
    backgroundColor: $msured,
    transform: 'skew(-10deg)',
    height: '100px',
    width: '100px',
    marginTop: '-10px',
  }),
  mltitle: css({
    color: $white,
    fontFamily: 'Helvetica',
    fontSize: '1.3em',
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: '40px',
  }),
  msuimg: css({
    background: `url(${msuNav}) no-repeat 50% 50% fixed`,
    backgroundSize: 'cover',
    border: `.5px solid #D1190D`,
    transform: 'skew(-10deg)',
    marginTop: '-10px',
    opacity: 0.9,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center ',
    alignItems: 'center',
    width: '87%',
  }),
  links: css({
    color: $white,
    fontSize: 20,
    fontFamily: 'Helvetica',
    textDecoration: 'none',
    fontWeight: '900',
    padding: '30px 30px',
  }),
  button: css({
    height: '50px',
    width: '120px',
    backgroundColor: $transparent,
    borderRadius: '20px',
    marginRight: '15px',
    padding: '10px 0px',
    textAlign: 'center',
    '&:hover': {
      transition: '0.5s',
      background: $white,
      opacity: 0.9,
      //creates a child that makes the text dark when hovering
      '& a': {
        color: $black,
      },
    },
  }),
};

const MsuNav = () => {
  const { setUser } = useContext(AuthContext);
  return (
    <Navbar className="fixed-top" collapseOnSelect expand="lg" bg={$transparent} variant={$transparent}>
      <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll" />
      <Navbar.Collapse>
        <div className="container-fluid">
          <div className="row" style={{ flexWrap: 'nowrap' }}>
            <div className="col-2" css={styles.buslogo}>
              <h1 css={styles.bltitle}>MSU Bus Shuttle Tracker</h1>
            </div>
            <div className="col-1" css={styles.msulogo}>
              <h1 css={styles.mltitle}>MSU</h1>
            </div>
            <div className="col-9" css={styles.msuimg}>
              <div css={styles.button}>
                <NavLink to="/home" css={styles.links}>
                  Home
                </NavLink>
              </div>
              <div css={styles.button}>
                <NavLink to="/shuttleInfo" css={styles.links}>
                  Shuttle
                </NavLink>
              </div>
              <div css={styles.button}>
                <NavLink to="/help" css={styles.links}>
                  Help
                </NavLink>
              </div>
              <div css={styles.button}>
                <NavLink to="/account" css={styles.links}>
                  Account
                </NavLink>
              </div>
              <div css={styles.button}>
                <NavLink
                  to=""
                  css={styles.links}
                  onClick={() => {
                    setUser(null);
                    localStorage.removeItem('user');
                  }}
                >
                  Logout
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default MsuNav;
