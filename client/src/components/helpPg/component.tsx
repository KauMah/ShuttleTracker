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
              <h1>Contacts</h1>
            </div>
            <h4>Shuttle Services</h4>
            <p>Location: 145 Clove Rd.</p>
            <p>Phone: 973-655-3326</p>
            <p>Fax: 973-655-4494</p>
            <p>Email: shuttle@montlcair.edu</p>
            <h4>Executive Director, Facilities Technology</h4>
            <p>John Bonin</p>
            <p>Location: 150 Clove Road</p>
            <p>Phone: 973-655-7868</p>
            <p>E-mail: boninj@montclair.edu</p>
            <h4>Supervisor, Shuttle Services</h4>
            <p>Cheryl Ofoha</p>
            <p>Location: 35 Clove Road</p>
            <p>Phone: 973-655-3326</p>
            <p>E-mail: lebertc@montclair.edu</p>
            <h4>Coordinator, Commuter Life</h4>
            <p>Antonio Talamo</p>
            <p>Phone: 973-655-3377</p>
            <p>E-mail: talamoa@montclair.edu</p>
          </div>
          <div className="col-8" style={styles.colRight}>
            <div css={styles.header}>
              <h1>FAQ</h1>
            </div>
            <h6>Q. How often do the buses run?</h6>
            <p>A. Every 8-15 mintues during peak ours, and every 20-30 mintues during off peak hours.</p>
            <h6>Q. How can I track the bus in real-time?</h6>
            <p>A. Navigate to the shuttle info page, find your shuttle, and you will see the information there.</p>
            <h6>Q. Does the shuttle operate on weekends?</h6>
            <p>
              A. Yes! On weekends however, the shuttle operates from 8:00AM-1:00AM as opposed the usual 6:00AM-1:00AM on
              weekdays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HelpPg;
