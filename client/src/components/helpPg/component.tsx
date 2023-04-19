import 'bootstrap/dist/css/bootstrap.min.css';

import { $black, $grey, $lightGrey, $white } from '../../assets/colors';

import FAQImg from '../../assets/img/FAQImg-4.jpg';
import MsuNav from '../navBar';
import { css } from '@emotion/react';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  colLeft: {
    backgroundColor: $lightGrey,
    height: '100vh',
    marginTop: '640px',
  },
  card: {
    width: '100%',
    marginBottom: '20px',
    border: '1px solid rgba(0,0,0,0.6',
    padding: '6px',
    margin: '10px',
    marginLeft: '-3px',
    borderRadius: '10px',
  },
  colRight: {
    backgroundColor: $white,
    height: '100vh',
    marginTop: '98px',
  },
  header: css({
    //display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    //fontFamily: 'Helvetica',
  }),
  //title: css({}),
  dropdownMenu: css({
    //display: 'none',
    //position: 'absolute',
    backgroundColor: $white,
    boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
    padding: '12px 16px',
    zIndex: 1,
    //top: '100%',
    //left: '0',
    width: '100%',
  }),
  headerImage: css({
    background: `url(${FAQImg}) no-repeat 50% 50%`,
    width: '100%',
    height: 'auto',
    marginLeft: '-921px',
    marginTop: '-900px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundPosition: '50% 30%',
    backgroundSize: 'cover',
  }),
  headerTitle: css({
    position: 'absolute',
    top: '30%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
    color: $white,
    fontFamily: 'Helvetica',
    fontSize: '5em',
  }),
  font: {
    fontFamily: 'Helvetica',
    fontSize: '1.3em',
    fontWeight: '100',
  },
  bolderFont: {
    fontFamily: 'Helvetica',
    fontSize: '1.3em',
    fontWeight: '600',
  },
  faqHeadFont: {
    fontFamily: 'Helvetica',
    fontSize: '1.7em',
    fontWeight: '400',
  },
  contactHeader: {
    //display: 'flex',
    sjustifyContent: 'space-between',
    borderBottom: `1px solid ${$black}`,
    marginBottom: '10px',
    paddingBottom: '10px',
    //textAlign: 'center',
  },
  contact: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    paddingBottom: '10px',
    borderBottom: `1px solid ${$grey}`,
  },
};

const HelpPg = () => {
  return (
    <div>
      <MsuNav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3" style={styles.colLeft}>
            <div css={styles.header}>
              <h1>Important</h1>
            </div>
            <div css={styles.header}>
              <div style={styles.contactHeader}>
                <h1>Contacts</h1>
              </div>
            </div>
            <div>
              <div css={styles.contactHeader}>
                <h3>Shuttle Services</h3>
                <div style={styles.font}>
                  <p>Location: 145 Clove Rd.</p>
                  <p>Phone: 973-655-3326</p>
                  <p>Fax: 973-655-4494</p>
                  <p>Email: shuttle@montlcair.edu</p>
                </div>
              </div>
              <div css={styles.contactHeader}>
                <h3>Executive Director, Facilities Technology</h3>
                <h4>John Bonin</h4>
                <div style={styles.font}>
                  <p>Location: 150 Clove Road</p>
                  <p>Phone: 973-655-7868</p>
                  <p>E-mail: boninj@montclair.edu</p>
                </div>
              </div>
              <div css={styles.contactHeader}>
                <h3>Supervisor, Shuttle Services</h3>
                <h4>Cheryl Ofoha</h4>
                <div style={styles.font}>
                  <p>Location: 35 Clove Road</p>
                  <p>Phone: 973-655-3326</p>
                  <p>E-mail: lebertc@montclair.edu</p>
                </div>
              </div>
              <div css={styles.contactHeader}>
                <h3>Coordinator, Commuter Life</h3>
                <h4>Antonio Talamo</h4>
                <div style={styles.font}>
                  <p>Phone: 973-655-3377</p>
                  <p>E-mail: talamoa@montclair.edu</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9" style={styles.colRight}>
            {/* <div css={styles.header}>
              <h1>FAQ</h1>
            </div> */}
            <div className="container">
              <div css={styles.headerImage}>
                <img src="src/assets/img/FAQImg-4.jpg" alt="Header" />
              </div>
              <div css={styles.headerTitle}>
                <p>Frequently Asked Questions</p>
              </div>
            </div>
            <div>
              <div>
                <p style={styles.faqHeadFont}>
                  Please find answers to commonly asked questions about shuttle operation below:
                </p>
              </div>
              <div style={styles.card}>
                <p style={styles.bolderFont}>Q. How often do the buses run?</p>
                <p style={styles.font}>
                  A. Every 8-15 mintues during peak ours, and every 20-30 mintues during off peak hours.
                </p>
              </div>
              <div style={styles.card}>
                <p style={styles.bolderFont}>Q. How can I track the bus in real-time?</p>
                <p style={styles.font}>
                  A. Navigate to the shuttle info page, find your shuttle, and you will see the information there.
                </p>
              </div>
              <div style={styles.card}>
                <p style={styles.bolderFont}>
                  Q. Are there any restrictions on items or pets that can be brought onto the shuttle buses?
                </p>
                <p style={styles.font}>
                  A. Yes! On weekends however, the shuttle operates from 8:00AM-1:00AM as opposed to the usual
                  6:00AM-1:00AM on weekdays.
                </p>
              </div>
              <div className="drawerContiner" style={styles.card}>
                <p style={styles.bolderFont}>
                  Q. How accessible are the shuttle buses for individuals with disabilities?
                </p>
                <p style={styles.font}>
                  A. Every 8-15 mintues during peak ours, and every 20-30 mintues during off peak hours.
                </p>
              </div>
              <div style={styles.card}>
                <p style={styles.bolderFont}>Q. Can non-students or non-faculty members use the shuttle system?</p>
                <p style={styles.font}>
                  A. Navigate to the shuttle info page, find your shuttle, and you will see the information there.
                </p>
              </div>
              <div style={styles.card}>
                <p style={styles.bolderFont}>Q. Can a student or faculty member bring a visitor?</p>
                <p style={styles.font}>
                  A. Yes! On weekends however, the shuttle operates from 8:00AM-1:00AM as opposed to the usual
                  6:00AM-1:00AM on weekdays.
                </p>
              </div>
              <div className="drawerContiner" style={styles.card}>
                <p style={styles.bolderFont}>Q. What should I do if I left something on the shuttle?</p>
                <p style={styles.font}>
                  A. Every 8-15 mintues during peak ours, and every 20-30 mintues during off peak hours.
                </p>
              </div>
              <div style={styles.card}>
                <p style={styles.bolderFont}>
                  Q. How can I provide feedback or report an issue with the shuttle service?
                </p>
                <p style={styles.font}>
                  A. Navigate to the shuttle info page, find your shuttle, and you will see the information there.
                </p>
              </div>
              <div style={styles.card}>
                <p style={styles.bolderFont}>Q. Does the shuttle operate on weekends?</p>
                <p style={styles.font}>
                  A. Yes! On weekends however, the shuttle operates from 8:00AM-1:00AM as opposed to the usual
                  6:00AM-1:00AM on weekdays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPg;
