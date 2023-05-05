import 'bootstrap/dist/css/bootstrap.min.css';

import { $black, $flash, $msured, $white } from '../../assets/colors';
import React, { useState } from 'react';

import MsuNav from '../navBar';
import { css } from '@emotion/react';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  colLeft: css({
    backgroundColor: $white,
    //marginTop: '580px',
  }),
  questionLine: {
    borderBottom: '3px solid rgba(0,0,0,0.3)',
    marginTop: '20px',
    marginBottom: '10px',
  },
  colRight: {
    backgroundColor: $white,
    height: '100%',
    marginTop: '98px',
  },
  faqHeader: css({
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontSize: '3em',
    margin: '10px',
    fontWeight: '700',
    marginLeft: '4.5rem',
    '@media (max-width: 1400x)': {
      marginLeft: '4rem',
    },
    '@media (max-width: 1300x)': {
      marginLeft: '3rem',
    },
    '@media (max-width: 1200x)': {
      marginLeft: '2rem',
    },
    '@media (max-width: 1100x)': {
      marginLeft: '1rem',
    },
    '@media (max-width: 995px)': {
      marginLeft: '0rem',
    },
  }),
  headerTitle: css({
    position: 'absolute',
    top: '33%',
    left: '46%',
    transform: 'translate(-42%, -50%)',
    color: $msured,
    fontFamily: 'Helvetica',
    fontSize: '5em',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 1875px)': {
      marginTop: '.3em',
      fontSize: '4.5em',
    },
  }),
  faqTitle: css({
    display: 'block',
    '@media (max-width: 1025px)': {
      display: 'none',
    },
  }),
  faqShortTitle: css({
    display: 'none',
    '@media (max-width: 1025px)': {
      display: 'block',
      marginTop: '50px',
    },
  }),
  answerFont: css({
    fontFamily: 'Helvetica',
    fontSize: '1.5em',
    marginTop: '.75rem',
    marginBottom: '1.25rem',
    padding: '7.5px',
    color: $msured,
    '@media (max-width: 777px)': {
      fontSize: '1.4em',
    },
    '@media (max-width: 516px)': {
      fontSize: '1.3em',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.2em',
    },
  }),
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
  faqStatementFont: css({
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
    borderBottom: `1px solid ${$black}`,
    marginBottom: '1rem',
  },
  contactRow: css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: '20px',
    '@media screen and (max-width: 768px)': {
      justifyContent: 'center',
    },
  }),
  contactCard: css({
    border: '1px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
    width: '130%',
    height: '90%',
    '@media (max-width: 1520px)': {
      width: '130%',
      height: '90%',
    },
    '@media (max-width: 995px)': {
      width: '90%',
      height: '90%',
    },
  }),
  mainContainer: css({
    padding: '0 10%',
    //backgroundColor: $lightGrey,
  }),
  belowButton: css({
    backgroundColor: $white,
    border: 'none',
    color: $msured,
    fontSize: '1.5rem',
    cursor: 'pointer',
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
    textAlign: 'left',
    fontFamily: 'Helvetica',
    fontSize: '1.5rem',
    fontWeight: 600,
    color: $black,
    transition: 'background-color 0.15s ease',
    ':hover': {
      backgroundColor: $flash,
    },
    ':active': {
      backgroundColor: $white,
    },
    '@media (max-width: 777px)': {
      height: '7rem',
      fontSize: '1.4rem',
    },
    '@media (max-width: 516px)': {
      height: '7rem',
      fontSize: '1.3rem',
    },
    '@media (max-width: 480px)': {
      height: '7rem',
      fontSize: '1.2rem',
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
    fontSize: '1rem',
  },
  answerVisible: {
    maxHeight: '500px',
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
    const height = !isAnswerVisible ? answer.length * 0.7 : -answer.length * 0.7;
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
        <p css={styles.answerFont}>{answer}</p>
      </div>
    </div>
  );
};

const HelpPg = () => {
  const [expandedHeight, setExpandedHeight] = useState(0);
  const updateExpandedHeight = () => {
    setExpandedHeight(expandedHeight);
  };
  return (
    <div>
      <MsuNav />
      <div css={styles.mainContainer}>
        <div className="container">
          <div className="row">
            <div className="col-12" style={styles.colRight}>
              <div className="d-flex justify-content-center" css={styles.headerTitle}>
                <p className="faq-title" css={styles.faqTitle}>
                  Frequently Asked Questions
                </p>
                <p className="faq-short-title" css={styles.faqShortTitle}>
                  FAQ
                </p>
              </div>
              <div>
                <div>
                  <p css={styles.faqStatementFont}>
                    <span>
                      Please find answers to common questions about shuttle operation below. If you cannot find the
                      answer to your question here, please refer to the Important Contacts
                      <button css={styles.belowButton} onClick={scrollToBottom}>
                        Below
                      </button>
                      {''}.
                    </span>
                  </p>
                </div>
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
            <div className="row">
              <div
                className="col-12"
                css={styles.colLeft}
                style={{ marginTop: 50 + expandedHeight, transition: 'margin-top 0.3s ease' }}
              >
                <div css={styles.faqHeader}>
                  <div style={styles.contactHeader}>
                    <p> Important Contacts</p>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div css={styles.contactRow}>
                      <div className="col-12 col-md-6 col-lg-2">
                        <div className="card" css={[styles.contactHeader, styles.contactCard]}>
                          <p style={styles.contactHeadFont}>Shuttle Services</p>
                          <div style={styles.contactBodyFont}>
                            <p>Location: 145 Clove Rd.</p>
                            <p>Phone: 973-655-3326</p>
                            <p>Fax: 973-655-4494</p>
                            <p>Email: shuttle@montlcair.edu</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-2">
                        <div className="card" css={[styles.contactHeader, styles.contactCard]}>
                          <p style={styles.contactHeadFont}>Executive Director, Facilities {/*Technology*/}</p>
                          <p style={styles.execFont}>John Bonin</p>
                          <div style={styles.contactBodyFont}>
                            <p>Location: 150 Clove Road</p>
                            <p>Phone: 973-655-7868</p>
                            <p>E-mail: boninj@montclair.edu</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-2">
                        <div className="card" css={[styles.contactHeader, styles.contactCard]}>
                          <p style={styles.contactHeadFont}>Supervisor, Shuttle Services</p>
                          <p style={styles.execFont}>Cheryl Ofoha</p>
                          <div style={styles.contactBodyFont}>
                            <p>Location: 35 Clove Road</p>
                            <p>Phone: 973-655-3326</p>
                            <p>E-mail: lebertc@montclair.edu</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-2">
                        <div className="card" css={[styles.contactHeader, styles.contactCard]}>
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
