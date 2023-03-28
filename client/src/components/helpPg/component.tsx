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
  title: css({}),
};
const HelpPg = () => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-4" style={styles.colLeft}></div>
          <div className="col-8" style={styles.colRight}></div>
        </div>
      </div>
    </div>
  );
};
export default HelpPg;