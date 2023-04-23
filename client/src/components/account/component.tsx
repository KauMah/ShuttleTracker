import { $black, $flash, $msured, $salmon } from '../../assets/colors';

import { AuthContext } from '../../utils/AuthContext';
import MsuNav from '../navBar';
import { api } from '../../utils/api';
import { css } from '@emotion/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  title: css({
    color: $msured,
    fontSize: '4.3rem',
    fontFamily: 'Helvetica',
    fontWeight: 500,
  }),
  infoBox: css({
    height: '7vh',
    width: '80vw',
    color: $msured,
    fontFamily: 'Helvetica',
    fontWeight: 700,
    marginTop: '.5rem',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'space-between',
  }),
  button: css({
    background: $msured,
    color: $black,
    height: '7vh',
    width: '80vw',
    fontFamily: 'Helvetica',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '.5rem',
    cursor: 'pointer',
    '&:hover': {
      background: $flash,
      color: $salmon,
    },
  }),
};
const Account = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    api.defaults.headers.common.Authorization = null;
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleNoti = () => {
    console.log('redirects to noti changes');
  };

  const handlePass = () => {
    console.log('redirects to pass change');
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <MsuNav />
      <h1 className="d-flex justify-content-center" css={styles.title}>
        Account
      </h1>
      <div className="row" style={{ marginTop: '2rem' }}>
        <div className="col d-flex justify-content-center">
          <div style={{ flexDirection: 'column' }}>
            <div css={styles.infoBox}>
              <div style={{ margin: '1.5vh 1vw' }}>Role:</div>
              <div className="col d-flex justify-content-end" style={{ margin: '1.5vh 1vw' }}>
                {user?.role}
              </div>
            </div>
            <div css={styles.infoBox}>
              <div style={{ margin: '1.5vh 1vw' }}>Email: </div>
              <div className="col d-flex justify-content-end" style={{ margin: '1.5vh 1vw' }}>
                {user?.email}
              </div>
            </div>
            <div css={styles.infoBox}>
              <div style={{ margin: '1.5vh 1vw' }}>Name:</div>
              <div className="col d-flex justify-content-end" style={{ margin: '1.5vh 1vw' }}>
                {user?.name}
              </div>
            </div>
            <button onClick={handleNoti} css={styles.button}>
              Manage Notifications
            </button>
            <button onClick={handlePass} css={styles.button}>
              Change Password
            </button>
            <button onClick={handleLogout} css={styles.button}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;
