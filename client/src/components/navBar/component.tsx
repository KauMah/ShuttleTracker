import { $black, $burgerbtn, $flash, $msured, $transparent, $white } from '../../assets/colors';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../utils/AuthContext';
import { Navbar } from 'react-bootstrap';
import { api } from '../../utils/api';
import { css } from '@emotion/react';
import msuNav from '../../assets/img/MsuNav.jpg';

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
    height: '100px',
    marginLeft: '12px',
    backgroundSize: 'cover',
    border: `.5px solid #D1190D`,
    transform: 'skew(-10deg)',
    marginTop: '-10px',
    opacity: 0.9,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center ',
    alignItems: 'center',
    width: '100%',
  }),
  links: css({
    color: $white,
    fontSize: '1.3rem',
    fontFamily: 'Helvetica',
    textDecoration: 'none',
    fontWeight: '500',
    marginTop: '8px',
  }),
  linksCondensed: css({
    color: $flash,
    fontSize: 20,
    fontFamily: 'Helvetica',
    textDecoration: 'none',
    fontWeight: '900',
    padding: '20px 20px',
  }),
  buttonCondensed: css({
    height: '50px',
    width: '100vw',
    backgroundColor: $burgerbtn,
    marginLeft: '-10px',
    padding: '10px',
    textAlign: 'center',
    '&:hover': {
      transition: '0.5s',
      background: $msured,
      opacity: 0.9,
      //creates a child that makes the text dark when hovering
      '& a': {
        color: $black,
      },
    },
  }),
  button: css({
    height: '3rem',
    width: '6.8rem',
    backgroundColor: $burgerbtn,
    borderRadius: '15px',
    marginRight: '15px',
    display: 'flex',
    justifyContent: 'center',
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
  const { user, setUser } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log('hello there');
      navigate('/login');
    }
  });

  const handleNavbarToggle = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Navbar
      className="fixed-top"
      collapseOnSelect
      expand="md"
      bg={$transparent}
      variant={$transparent}
      expanded={expanded}
    >
      <div className="row">
        <div className="col-2" css={styles.buslogo}>
          <h1 css={styles.bltitle}>Bus Shuttle Tracker</h1>
        </div>
        <div className="col-1" css={styles.msulogo}>
          <h1 css={styles.mltitle}>MSU</h1>
        </div>
      </div>
      <Navbar.Toggle
        aria-controls="navbarScroll"
        data-bs-target="#navbarScroll"
        style={{ position: 'absolute', top: '15px', right: '15px' }}
        onClick={handleNavbarToggle}
      />
      <Navbar.Collapse id="#basic-navbar-nav" className="justify-content-end">
        <div className="container-fluid">
          <div className="row" style={{ flexWrap: 'nowrap' }}>
            {expanded ? (
              <div className="col-12">
                <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div css={styles.buttonCondensed}>
                    <NavLink to="/home" css={styles.linksCondensed}>
                      Home
                    </NavLink>
                  </div>
                  <div css={styles.buttonCondensed}>
                    <NavLink to="/create" css={styles.linksCondensed}>
                      Alert
                    </NavLink>
                  </div>
                  <div css={styles.buttonCondensed}>
                    <NavLink to="/shuttleInfo" css={styles.linksCondensed}>
                      Shuttle
                    </NavLink>
                  </div>
                  <div css={styles.buttonCondensed}>
                    <NavLink to="/help" css={styles.linksCondensed}>
                      Help
                    </NavLink>
                  </div>
                  <div css={styles.buttonCondensed}>
                    <NavLink to="/account" css={styles.linksCondensed}>
                      Account
                    </NavLink>
                  </div>
                  <div css={styles.buttonCondensed}>
                    <NavLink
                      to=""
                      css={styles.linksCondensed}
                      onClick={() => {
                        setUser(null);
                        api.defaults.headers.common.Authorization = null;
                        localStorage.removeItem('user');
                      }}
                    >
                      Logout
                    </NavLink>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-12 justify-content-end" css={styles.msuimg}>
                <div css={styles.button}>
                  <NavLink to="/home" css={styles.links}>
                    Home
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
            )}
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default MsuNav;
