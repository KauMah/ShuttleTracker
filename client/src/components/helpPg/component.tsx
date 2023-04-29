import 'bootstrap/dist/css/bootstrap.min.css';

import { $black, $flash, $grey, $msured, $white } from '../../assets/colors';
import React, { useState } from 'react';

//import { Function } from 'lodash';
//import FAQImg from '../../assets/img/FAQImg-4.jpg';
import MsuNav from '../navBar';
import { css } from '@emotion/react';

//import { string } from 'yup';

//import { transform } from 'lodash';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  colLeft: css({
    backgroundColor: $white,
    height: '50vh',
    //marginTop: '580px',
    '@media (maxWidth: 700px)': {
      marginLeft: '30%',
    },
  }),
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
    top: '33%',
    left: '46%',
    transform: 'translate(-41%, -50%)',
    color: $msured,
    fontFamily: 'Helvetica',
    fontSize: '5em',
    display: 'flex',
    alignItems: 'center',
    //backgroundColor: 'red',
    // justifyContent: 'center',
  }),
  font: {
    fontFamily: 'Helvetica',
    fontSize: '1.5em',
    //fontWeight: '100',
    marginTop: '.75rem',
    marginBottom: '1.25rem',
    padding: '7.5px',
    color: $msured,
  },
  personFont: {
    fontFamily: 'Helvetica',
    fontSize: '1.3em',
    color: $black,
  },
  execFont: {
    fontFamily: 'Helvetica',
    fontSize: '1.3em',
    fontWeight: '600',
    color: $black,
  },
  contactHeadFont: {
    fontFamily: 'Helvetica',
    fontSize: '1.5em',
    fontWeight: '600',
    color: $msured,
  },
  contactBodyFont: {
    fontFamily: 'Helvetica',
    fontSize: '1em',
    fontWeight: '300',
    color: $black,
  },
  faqHeadFont: css({
    fontFamily: 'Helvetica',
    fontSize: '1.5em',
    fontWeight: '400',
    marginTop: '20rem',
    marginBottom: '0rem',
    '@media (max-width: 700px)': {
      marginTop: '20rem',
    },
  }),
  contactHeader: {
    // display: 'flex', //useless
    // justifyContent: 'space-between', //useless
    borderBottom: `1px solid ${$black}`,
    marginBottom: '.5rem',
    // paddingBottom: '10px', useless
  },
  // contact: { useless isnt used
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   marginBottom: '10px',
  //   paddingBottom: '10px',
  //   borderBottom: `1px solid ${$grey}`,
  // },
  contactRow: css({
    display: 'flex',
    justifyContent: 'space-evenly',
    //flexWrap: 'wrap', useless
    width: '100%',
    marginTop: '20px',
  }),
  contactsContainer: css({
    //useless what does this do?
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }),
  contactCard: css({
    border: '1px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '15px',
    padding: '20px',
    // backgroundColor: '#fff', useless
    // boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', useless
    width: '20rem',
    height: '20rem',
    // display: 'flex',
    // flexDirection: 'column', useless
    // justifyContent: 'space-between', useless
  }),
  mainContainer: css({
    padding: '0 10%',
    backgroundColor: $white,
  }),
  button: css({
    backgroundColor: $white,
    border: 'none',
    color: $msured,
    // padding: '8px 16px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '27px',
    //margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
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
    fontFamily: 'Helvetica',
    fontSize: '1.5em',
    //fontWeight: 600,
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

interface QA {
  question: string;
  answer: string;
  updateExpandedHeight: (height: number) => void;
}

const QuestionAnswer = (props: QA) => {
  const { question, answer, updateExpandedHeight } = props;

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
  //const [totalExpandedHeight, setTotalExpandedHeight] = useState(0);
  const [expandedHeight, setExpandedHeight] = useState(0);
  const updateExpandedHeight = (height: number) => {
    //const { height } = prop;
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
                <div className="d-flex justify-content-center" css={styles.headerTitle}>
                  <p>Frequently Asked Questions</p>
                </div>
              </div>
              <div>
                <div>
                  <p css={styles.faqHeadFont}>
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
                  answer="A. Pets may not be allowed unless they are service animals, and certain items such as hazardous materials or large luggage may be prohibited.  Please check with the shuttle system's policies for specific details."
                  updateExpandedHeight={updateExpandedHeight}
                />
                <QuestionAnswer
                  question="Q. How accessible are the shuttle buses for individuals with disabilities?"
                  answer="A. The shuttle system should be fully accessible for individuals with disabilities.  This includes features such as wheelchair ramps, low floors, and priority seating."
                  updateExpandedHeight={updateExpandedHeight}
                />
                <QuestionAnswer
                  question="Q. Can non-students or non-faculty members use the shuttle system?"
                  answer="A. If you are a non-student or non-faculty member, you may be able to use the shuttle system."
                  updateExpandedHeight={updateExpandedHeight}
                />
                <QuestionAnswer
                  question="Q. What should I do if I left something on the shuttle?"
                  answer="A. If you left semething on the shuttle, you should contact the shuttle system's lost and found department."
                  updateExpandedHeight={updateExpandedHeight}
                />
                <QuestionAnswer
                  question="Q. How can I provide feedback or report an issue with the shuttle service?"
                  answer="A. Please look below at the Important Contacts and reach out to the shuttle email for smaller questions, and any of the Executives and Coordinators for more serious inquiries."
                  updateExpandedHeight={updateExpandedHeight}
                />
                <QuestionAnswer
                  question="Q. Does the shuttle operate on weekends?"
                  answer="A. Yes! On weekends however, the shuttle operates from 8:00AM-1:00AM as opposed to the usual
                  6:00AM-1:00AM on weekdays."
                  updateExpandedHeight={updateExpandedHeight}
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: '25rem' }}>
              <div
                className="col-12"
                css={styles.colLeft}
                style={{ marginTop: 150 + expandedHeight, transition: 'height 0.3s ease' }}
              >
                <div css={styles.header}>
                  <div style={styles.contactHeader}>
                    <p> Important Contacts</p>
                  </div>
                </div>
                <div className="container-fluid">
                  <div className="row">
                    <div css={styles.contactsContainer}>
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
    </div>
  );
};

export default HelpPg;
