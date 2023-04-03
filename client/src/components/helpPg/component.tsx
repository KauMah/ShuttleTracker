import { $grey, $red } from '../../assets/colors';

import Navbar from '../navBar';
import { css } from '@emotion/react';

const styles = {
  colLeft: {
    backgroundColor: $grey,
    height: '100vh',
  },
  colRight: {
    backgroundColor: $red,
    height: '100vh',
  },
  header: css({
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  }),
  title: css({}),
};
const HelpPg = () => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-4" style={styles.colLeft}>
            <div css={styles.header}>
              <h1>Important Contacts</h1>
            </div>
          </div>
          <div className="col-8" style={styles.colRight}>
            <div css={styles.header}>
              <h1>FAQ</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HelpPg;
