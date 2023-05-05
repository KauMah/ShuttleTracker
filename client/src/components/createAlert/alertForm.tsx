import * as Yup from 'yup';

import { $flash, $msured, $salmon } from '../../assets/colors';
import { ErrorMessage, Field, Form, Formik } from 'formik';

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
  title: Yup.string().required('*Type is required'),
  message: Yup.string().required('*Description is required'),
  expiresAt: Yup.string()
    .matches(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/, '*Duration must be in the format hh:mm')
    .required('*Notification duration is required'),
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
  textBox: css({
    height: '3rem',
    width: '30rem',
    fontSize: '1.2rem',
    padding: '0.5rem',
    marginBottom: '2rem',
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
  error: css({
    color: $msured,
    display: 'flex',
    justifyContent: 'center',
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
              window.location.reload();
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
            <ErrorMessage name="title" component="div" css={styles.error} />
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
            <ErrorMessage name="message" component="div" css={styles.error} />
            <div style={{ position: 'relative', marginTop: '3rem' }} className="d-flex justify-content-center">
              <label htmlFor="expiresAt" css={styles.text}>
                Alert Duration
              </label>
              <Field type="text" name="expiresAt" id="expiresAt" placeholder="hh:mm" css={styles.textboxTime} />
            </div>
            <ErrorMessage name="expiresAt" component="p" css={styles.error} />
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
