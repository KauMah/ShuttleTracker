import 'bootstrap/dist/css/bootstrap.min.css';

import { $black, $flash, $grey, $lightGrey, $msured, $red, $salmon, $white } from '../../assets/colors';
import React, { useState } from 'react';

import FAQImg from '../../assets/img/FAQImg-4.jpg';
import MsuNav from '../navBar';
import { css } from '@emotion/react';
import { transform } from 'lodash';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  colLeft: css({
    backgroundColor: $white,
    height: '50vh',
    //marginTop: '580px',
    '@media (max-width: 700px)': {
      marginLeft: '30%',
    },
  }),
  card: {
    width: '100%',
    marginBottom: '20px',
    border: '1px solid rgba(0,0,0,0.4)',
    padding: '6px',
    margin: '10px',
    marginLeft: '-2px',
    borderRadius: '10px',
  },
  questionLine: {
    borderBottom: '3px solid rgba(0,0,0,0.3)',
    marginTop: '20px',
    marginBottom: '10px',
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
    margin: '10px',
    padding: '0px',
    fontWeight: '700',
  }),
  headerTitle: css({
    position: 'absolute',
    top: '25%',
    left: '51%',
    transform: 'translate(-50%, -50%)',
    color: $msured,
    fontFamily: 'Helvetica',
    fontSize: '5em',
  }),
  font: {
    fontFamily: 'Helvetica',
    fontSize: '1.3em',
    //fontWeight: '100',
    marginTop: '.75rem',
    marginBottom: '1.25rem',
    padding: '7.5px',
    color: $msured,
  },
  questionFont: {
    fontFamily: 'Helvetica',
    fontSize: '1.3em',
    color: $black,
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
    fontSize: '1.6em',
    fontWeight: '400',
    marginTop: '20rem',
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
  contactsContainer: css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }),
  contactCard: css({
    border: '1px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '15px',
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
  button: css({
    backgroundColor: $white,
    border: 'none',
    color: $msured,
    //padding: '8px 16px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '28px',
    //margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.15s ease',
    ':hover': {
      backgroundColor: $flash,
    },
    ':active': {
      backgroundColor: $white,
    },
  }),
  questionButton: css({
    backgroundColor: $white,
    height: '5rem',
    width: '100%',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    textAlign: 'left',
    //padding: '14px',
    fontFamily: 'Helvetica',
    fontSize: '1.3em',
    color: $black,
    transition: 'background-color 0.15s ease',
    ':hover': {
      backgroundColor: $flash,
    },
    ':active': {
      backgroundColor: $white,
    },
  }),
  arrow: {
    marginLeft: '10px',
    transition: '0.3s',
  },
  answerContainer: {
    overflow: 'hidden',
    maxHeight: 0,
    transition: 'max-height 0.5s ease',
  },
  answerVisible: {
    maxHeight: '500px',
    //overflow: 'hidden',
  },
};

const scrollToBottom = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};

const QuestionAnswer = ({ question, answer, updateExpandedHeight }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const toggleAnswer = () => {
    const height = !isAnswerVisible ? answer.length * 1.1 : -answer.length * 1.1;
    updateExpandedHeight(height);
    setIsAnswerVisible(!isAnswerVisible);
  };

  return (
    <div style={styles.questionLine}>
      <button css={styles.questionButton} onClick={toggleAnswer}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {question}
          <span
            style={{
              ...styles.arrow,
              transform: isAnswerVisible ? 'rotate(0deg)' : 'rotate(180deg)',
            }}
          >
            ^
          </span>
        </div>
      </button>
      <div style={{ ...styles.answerContainer, ...(isAnswerVisible ? styles.answerVisible : {}) }}>
        <p style={styles.font}>{answer}</p>
      </div>
    </div>
  );
};

const HelpPg = () => {
  const [totalExpandedHeight, setTotalExpandedHeight] = useState(0);
  const [expandedHeight, setExpandedHeight] = useState(0);
  const updateExpandedHeight = (height) => {
    setExpandedHeight(expandedHeight + height);
  };
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
                {/* <div css={styles.imageContainer}>
                  <img src="src/assets/img/FAQImg-4.jpg" alt="Header" css={styles.image} />
                </div> */}
                <div css={styles.headerTitle}>
                  <p>Frequently Asked Questions</p>
                </div>
              </div>
              <div>
                <div>
                  <p style={styles.faqHeadFont}>
                    <span>
                      Please find answers to common questions about shuttle operation below. If you cannot find the
                      answer to your question here, please refer to the Important Contacts
                      <button css={styles.button} onClick={scrollToBottom}>
                        Below
                      </button>
                      {''}.
                    </span>
                  </p>
                </div>
                {/* <div className="row">
                  <div className="col-6">test1</div>
                  <div className="col-6">test2</div>
                </div> */}
                <QuestionAnswer
                  question="Q. How often do the buses run?"
                  answer="A. Every 8-15 mintues during peak ours, and every 20-30 mintues during off peak hours."
                  updateExpandedHeight={updateExpandedHeight}
                />
                <QuestionAnswer
                  question="Q. How can I track the bus in real-time?"
                  answer="A. Navigate to the shuttle info page, find your shuttle, and you will see the information there."
                  updateExpandedHeight={updateExpandedHeight}
                />
                <QuestionAnswer
                  question="Q. Are there any restrictions on items or pets that can be brought onto the shuttle buses?"
                  answer="A. Yes! On weekends however, the shuttle operates from 8:00AM-1:00AM as opposed to the usual
                  6:00AM-1:00AM on weekdays."
                  updateExpandedHeight={updateExpandedHeight}
                />
                <QuestionAnswer
                  question="Q. How accessible are the shuttle buses for individuals with disabilities?"
                  answer="A. Every 8-15 mintues during peak ours, and every 20-30 mintues during off peak hours."
                  updateExpandedHeight={updateExpandedHeight}
                />
                <QuestionAnswer
                  question="Q. Can non-students or non-faculty members use the shuttle system?"
                  answer="A. Navigate to the shuttle info page, find your shuttle, and you will see the information there."
                  updateExpandedHeight={updateExpandedHeight}
                />
                <QuestionAnswer
                  question="Q. Can a student or faculty member bring a visitor?"
                  answer="A. Yes! On weekends however, the shuttle operates from 8:00AM-1:00AM as opposed to the usual
                  6:00AM-1:00AM on weekdays."
                  updateExpandedHeight={updateExpandedHeight}
                />
                <QuestionAnswer
                  question="Q. What should I do if I left something on the shuttle?"
                  answer="A. Every 8-15 mintues during peak ours, and every 20-30 mintues during off peak hours."
                  updateExpandedHeight={updateExpandedHeight}
                />
                <QuestionAnswer
                  question="Q. How can I provide feedback or report an issue with the shuttle service?"
                  answer="A. Navigate to the shuttle info page, find your shuttle, and you will see the information there."
                  updateExpandedHeight={updateExpandedHeight}
                />
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
              <div
                className="col-12"
                css={styles.colLeft}
                style={{ marginTop: 250 + expandedHeight, transition: 'height 0.3s ease' }}
              >
                <div css={styles.header}>
                  <div style={styles.contactHeader}>
                    <p> Important Contacts</p>
                  </div>
                </div>
                <div className="container-fluid">
                  <div className="row">
                    <div css={styles.contactsContainer}></div>
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
                        <p style={styles.contactHeadFont}>Executive Director, Facilities {/*Technology*/}</p>
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
