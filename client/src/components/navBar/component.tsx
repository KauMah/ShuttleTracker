import { $black, $grey, $lightGrey, $msured, $red, $white } from '../../assets/colors';

import { AuthContext } from '../../utils/AuthContext';
import { NavLink } from 'react-router-dom';
import { css } from '@emotion/react';
import msuNav from '../../assets/img/MsuNav.jpg';
import { useContext } from 'react';

const styles = {
  buslogo: css({
    backgroundColor: $white,
    padding: '15px 30px',
    transform: 'skew(-14deg)',
    border: `1.5px solid #D1190D`,
  }),
  bltitle: css({
    color: $msured,
    fontFamily: 'Helvetica',
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
    fontFamily: 'Helvetica',
    fontSize: '1.7em',
    fontWeight: '700',
    textAlign: 'center',
  }),
  msuimg: css({
    background: `url(${msuNav}) no-repeat 50% 50% fixed`,
    backgroundSize: 'cover',
    backgroundColor: $lightGrey,
    border: `.5px solid #D1190D`,
    transform: 'skew(-14deg)',
    opacity: 0.9,
  }),
  links: css({
    color: $white,
    fontSize: 20,
    fontFamily: 'Helvetica',
    textDecoration: 'none',
    fontWeight: '900',
    padding: '30px 30px',
    alignContent: 'center',
    // '&:hover': {
    //   color: $black,
    // },
  }),
  button: css({
    height: '50px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '10px 30px',
    marginTop: '20px',
    '&:hover': {
      transition: '0.5s',
      // background: '#e8be23',
      background: $white,
      // color: $black,
      // background: 'linear-gradient(0deg rgba(255,50,155,0) 55%, rgba(255,255,25,.3) 55%, rgba(255,25,255,.3) 100%))',
      // background: 'linear-gradient(to right, #1d4350, #a43941)',//red ocean
      // background: 'linear-gradient(to right, #ff4b1f, #1fddff)', //ali
      // background: 'linear-gradient(to right, #BA5370, #F4E2D8)', //purp white
      // background: 'linear-gradient(to right, #4DA0B0, #D39D38)', //purp white

      opacity: 0.7,
      //creates a child that makes the text dark when hovering
      '& a': {
        color: $black,
      },
    },
  }),
};
const Navbar = () => {
  const { setUser } = useContext(AuthContext);
  return (
    // <div className="row" css={{ 'container-fluid' }}>

    <div className="row">
      <div className="col-2" css={styles.buslogo}>
        <h1 css={styles.bltitle}>MSU Bus Shuttle Tracker</h1>
      </div>
      <div className="col-1" css={styles.msulogo}>
        <h1 css={styles.mltitle}>MSU</h1>
      </div>
      <div className="col-9" css={styles.msuimg}>
        <div className="d-flex justify-content-end">
          <div css={styles.button}>
            <NavLink to="/home" css={styles.links}>
              Home
            </NavLink>
          </div>
          <NavLink to="/shuttleInfo" css={styles.links}>
            Shuttle
          </NavLink>
          <NavLink to="/help" css={styles.links}>
            Help
          </NavLink>
          <NavLink to="/account" css={styles.links}>
            Account
          </NavLink>
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
  );
};
export default Navbar;
