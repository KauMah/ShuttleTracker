import { $black, $lightGrey, $msured } from '../../assets/colors';
import { useEffect, useState } from 'react';

import MsuNav from '../navBar';
import { api } from '../../utils/api';
import { css } from '@emotion/react';

const styles = {
  infoBox: css({
    background: $lightGrey,
    height: '7vh',
    width: '80vw',
    marginTop: '5px',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'space-between',
  }),
  text: css({
    display: 'flex',
    justifyContent: 'space-between',
  }),
};
const Account = () => {
  const [data, setData] = useState({ email: '', password: '' });

  useEffect(() => {
    api
      .get('/user/')
      .then((response) => {
        console.log('response', response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data: ${error.message');
      });
  }, []);
  return (
    <div style={{ marginTop: '100px' }}>
      <MsuNav />
      <h1>Account</h1>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <div style={{ flexDirection: 'column' }}>
            <div css={styles.infoBox}>
              <div style={{ margin: '1.5vh 1vw' }}>Email:</div>
              <div className="col d-flex justify-content-end" style={{ margin: '1.5vh 1vw' }}>
                {data.email}test
              </div>
            </div>
            <div css={styles.infoBox}>
              <div style={{ margin: '1.5vh 1vw' }}>Password: </div>
              <div className="col d-flex justify-content-end" style={{ margin: '1.5vh 1vw' }}>
                {data.password}test
              </div>
            </div>
            <div css={styles.infoBox}>
              <div style={{ margin: '1.5vh 1vw' }}>Role:</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;
