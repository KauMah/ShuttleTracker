import 'bootstrap/dist/css/bootstrap.min.css';

import { $black, $grey, $lightGrey, $msured, $white } from '../../assets/colors';

import FAQImg from '../../assets/img/FAQImg-4.jpg';
import MsuNav from '../navBar';
import { css } from '@emotion/react';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  colLeft: {
    backgroundColor: $white,
    height: '100vh',
    marginTop: '550px',
    '@media (max-width: 906px)': {
      marginLeft: '30%',
    },
  },
  card: {
    width: '100%',
    marginBottom: '20px',
    border: '1px solid rgba(0,0,0,0.6)',
    padding: '6px',
    margin: '10px',
    marginLeft: '-2px',
    borderRadius: '10px',
  },
  colRight: {
    backgroundColor: $white,
    height: '100vh',
    marginTop: '98px',
  },
  header: css({
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontSize: '3em',
    margin: '0px',
    padding: '0px',
    fontWeight: '700',
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
    background: `url(${FAQImg}) no-repeat 50% 50% fixed`,
    width: '100%',
    height: 'auto',
    marginLeft: '-921px',
    marginTop: '-900px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundPosition: '50% 30%',
    backgroundSize: 'cover',
    boxSizing: 'border-box',
  }),
  headerTitle: css({
    position: 'absolute',
    top: '30%',
    left: '53%',
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
  questionFont: {
    fontFamily: 'Helvetica',
    fontSize: '1.3em',
    color: $msured,
  },
  personFont: {
    fontFamily: 'Helvetica',
    fontSize: '1.3em',
    color: $black,
  },
  execFont: {
    fontFamily: 'Helvetica',
    fontSize: '1.2em',
    fontWeight: '600',
    color: $black,
  },
  contactHeadFont: {
    fontFamily: 'Helvetica',
    fontSize: '1.6em',
    fontWeight: '600',
    color: $msured,
  },
  contactBodyFont: {
    fontFamily: 'Helvetica',
    fontSize: '1.1em',
    fontWeight: '300',
    color: $black,
  },
  faqHeadFont: {
    fontFamily: 'Helvetica',
    fontSize: '1.7em',
    fontWeight: '400',
  },
  contactHeader: {
    //display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${$black}`,
    marginBottom: '10px',
    paddingBottom: '10px',
  },
  contact: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    paddingBottom: '10px',
    borderBottom: `1px solid ${$grey}`,
  },
  contactRow: css({
    display: 'flex',
    justifyContent: 'space-evenly',
    //flexWrap: 'wrap',
    width: '100%',
    marginTop: '20px',
  }),
  imageContainer: css({
    height: '542px',
    width: '1983px',
    marginLeft: '-346px',
    overflow: 'hidden',
    //border: '1px solid black',
  }),
  image: css({
    height: 'auto',
    width: '100%',
    display: 'block',
    //position: 'absolute',
    top: '50%',
    transform: 'translateY(-24%)',
    opacity: '0.9',
  }),
  contactsContainer: css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }),
  contactCard: css({
    border: '1px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '5px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '450px',
    height: 'auto',
    //display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }),
  mainContainer: css({
    padding: '0 10%', // adjust the percentage as needed for the desired column size
    backgroundColor: $white,
  }),
};

const HelpPg = () => {
  return (
    <div>
      <MsuNav />
      <div css={styles.mainContainer}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12" style={styles.colRight}>
              {/* <div css={styles.header}>
                <h1>FAQ</h1>
              </div> */}
              <div className="container">
                <div css={styles.imageContainer}>
                  <img src="src/assets/img/FAQImg-4.jpg" alt="Header" css={styles.image} />
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
                  <p style={styles.questionFont}>Q. How often do the buses run?</p>
                  <p style={styles.font}>
                    A. Every 8-15 mintues during peak ours, and every 20-30 mintues during off peak hours.
                  </p>
                </div>
                <div style={styles.card}>
                  <p style={styles.questionFont}>Q. How can I track the bus in real-time?</p>
                  <p style={styles.font}>
                    A. Navigate to the shuttle info page, find your shuttle, and you will see the information there.
                  </p>
                </div>
                <div style={styles.card}>
                  <p style={styles.questionFont}>
                    Q. Are there any restrictions on items or pets that can be brought onto the shuttle buses?
                  </p>
                  <p style={styles.font}>
                    A. Yes! On weekends however, the shuttle operates from 8:00AM-1:00AM as opposed to the usual
                    6:00AM-1:00AM on weekdays.
                  </p>
                </div>
                <div className="drawerContiner" style={styles.card}>
                  <p style={styles.questionFont}>
                    Q. How accessible are the shuttle buses for individuals with disabilities?
                  </p>
                  <p style={styles.font}>
                    A. Every 8-15 mintues during peak ours, and every 20-30 mintues during off peak hours.
                  </p>
                </div>
                <div style={styles.card}>
                  <p style={styles.questionFont}>Q. Can non-students or non-faculty members use the shuttle system?</p>
                  <p style={styles.font}>
                    A. Navigate to the shuttle info page, find your shuttle, and you will see the information there.
                  </p>
                </div>
                <div style={styles.card}>
                  <p style={styles.questionFont}>Q. Can a student or faculty member bring a visitor?</p>
                  <p style={styles.font}>
                    A. Yes! On weekends however, the shuttle operates from 8:00AM-1:00AM as opposed to the usual
                    6:00AM-1:00AM on weekdays.
                  </p>
                </div>
                <div className="drawerContiner" style={styles.card}>
                  <p style={styles.questionFont}>Q. What should I do if I left something on the shuttle?</p>
                  <p style={styles.font}>
                    A. Every 8-15 mintues during peak ours, and every 20-30 mintues during off peak hours.
                  </p>
                </div>
                <div style={styles.card}>
                  <p style={styles.questionFont}>
                    Q. How can I provide feedback or report an issue with the shuttle service?
                  </p>
                  <p style={styles.font}>
                    A. Navigate to the shuttle info page, find your shuttle, and you will see the information there.
                  </p>
                </div>
                <div style={styles.card}>
                  <p style={styles.questionFont}>Q. Does the shuttle operate on weekends?</p>
                  <p style={styles.font}>
                    A. Yes! On weekends however, the shuttle operates from 8:00AM-1:00AM as opposed to the usual
                    6:00AM-1:00AM on weekdays.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12" style={styles.colLeft}>
                <div css={styles.header}>
                  <p>Important</p>
                </div>
                <div css={styles.header}>
                  <div style={styles.contactHeader}>
                    <p>Contacts</p>
                  </div>
                </div>
                <div className="container-fluid">
                  <div className="row">
                    <div css={styles.contactRow}>
                      <div css={[styles.contactHeader, styles.contactCard]}>
                        <p style={styles.contactHeadFont}>Shuttle Services</p>
                        <div style={styles.contactBodyFont}>
                          <p>Location: 145 Clove Rd.</p>
                          <p>Phone: 973-655-3326</p>
                          <p>Fax: 973-655-4494</p>
                          <p>Email: shuttle@montlcair.edu</p>
                        </div>
                      </div>
                      <div css={[styles.contactHeader, styles.contactCard]}>
                        <p style={styles.contactHeadFont}>Executive Director, Facilities Technology</p>
                        <p style={styles.execFont}>John Bonin</p>
                        <div style={styles.contactBodyFont}>
                          <p>Location: 150 Clove Road</p>
                          <p>Phone: 973-655-7868</p>
                          <p>E-mail: boninj@montclair.edu</p>
                        </div>
                      </div>
                      <div css={[styles.contactHeader, styles.contactCard]}>
                        <p style={styles.contactHeadFont}>Supervisor, Shuttle Services</p>
                        <p style={styles.execFont}>Cheryl Ofoha</p>
                        <div style={styles.contactBodyFont}>
                          <p>Location: 35 Clove Road</p>
                          <p>Phone: 973-655-3326</p>
                          <p>E-mail: lebertc@montclair.edu</p>
                        </div>
                      </div>
                      <div css={[styles.contactHeader, styles.contactCard]}>
                        <p style={styles.contactHeadFont}>Coordinator, Commuter Life</p>
                        <p style={styles.execFont}>Antonio Talamo</p>
                        <div style={styles.contactBodyFont}>
                          <p>Phone: 973-655-3377</p>
                          <p>E-mail: talamoa@montclair.edu</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPg;
