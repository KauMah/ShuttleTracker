import * as Yup from 'yup';

import { $flash, $salmon } from '../../assets/colors';
import { Field, Form, Formik } from 'formik';

import { api } from '../../utils/api';
import { css } from '@emotion/react';

interface Questions {
  title: string;
  message: string;
  expiresAt: string;
}
const Values: Questions = {
  title: '',
  message: '',
  expiresAt: '',
};
const validation = Yup.object().shape({
  title: Yup.string().required('Type is required'),
  message: Yup.string().required('Description is required'),
  expiresAt: Yup.string().required('Notification duration is required'),
});

const styles = {
  text: css({
    fontSize: '1.4rem',
    fontFamily: 'Helvetica',
    fontWeight: 500,
    position: 'absolute',
    marginTop: '-2.5rem',
    '@media (max-width: 650px)': {
      fontSize: '1.3rem',
    },
  }),
  dropDown: css({
    height: '2rem',
    width: '50rem',
    fontWeight: 700,
    fontSize: '1.2rem',
    borderRadius: '100px',
    border: '1px solid #D1190D',
    display: 'flex',
    alignContent: 'center',
    textAlignLast: 'center',
    cursor: 'pointer',
  }),
  textBox: css({
    height: '3rem',
    width: '30rem',
    fontSize: '1.2rem',
    padding: '0.5rem',
    borderRadius: '0.3rem',
    border: '1px solid #D1190D',
    textAlignLast: 'center',
  }),
  textboxTime: css({
    height: '3rem',
    width: '10rem',
    fontSize: '1.2rem',
    padding: '0.5rem',
    borderRadius: '0.3rem',
    border: '1px solid #D1190D',
    textAlignLast: 'center',
  }),
  submitButton: css({
    backgroundColor: $salmon,
    height: '5vh 100%',
    width: '10vw 100%',
    fontSize: '22px',
    fontWeight: 700,
    borderRadius: '13px',
    marginTop: '3vh',
    padding: 'auto',
    transition: 'background-color 0.25s',
    '&:hover': {
      backgroundColor: $flash,
    },
  }),
};
const AlertForm = (): JSX.Element => {
  return (
    <div>
      <Formik
        initialValues={Values}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting }) => {
          const { title, message, expiresAt } = values;
          const date = new Date();
          date.setMinutes(date.getMinutes() + parseInt(expiresAt));
          date.setHours(date.getHours() + parseInt(expiresAt));
          const expiresAtISO = date.toISOString();

          api
            .post('/alerts/new', { title, message, expiresAt: expiresAtISO })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ position: 'relative', marginTop: '3rem' }} className="d-flex justify-content-center">
              <label htmlFor="title" css={styles.text}>
                Alert Type(Max Length 100)
              </label>
              <Field type="text" name="title" id="title" placeholder="Title" css={styles.textBox} maxLength={100} />
            </div>
            <div style={{ position: 'relative', marginTop: '3rem' }} className="d-flex justify-content-center">
              <label htmlFor="message" css={styles.text}>
                Alert Description(Max Length 200)
              </label>
              <Field
                type="text"
                name="message"
                id="message"
                placeholder="Description"
                css={styles.textBox}
                maxLength={200}
              />
            </div>
            <div style={{ position: 'relative', marginTop: '3rem' }} className="d-flex justify-content-center">
              <label htmlFor="expiresAt" css={styles.text}>
                Alert Duration
              </label>
              <Field
                type="time"
                name="expiresAt"
                id="expiresAt"
                placeholder="Time"
                css={styles.textboxTime}
                maxLength={100}
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: '3vh' }}>
              <button type="submit" disabled={isSubmitting} css={styles.submitButton}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AlertForm;
