import MsuNav from '../navBar';
import { css } from '@emotion/react';

const styles = {
  background: css({
    height: '',
  }),
};
const Account = () => {
  return (
    <div style={{ marginTop: '100px' }}>
      <MsuNav />
      <h1>Account</h1>
      <div className="row">
        <div className="col">hello</div>
      </div>
    </div>
  );
};
export default Account;
