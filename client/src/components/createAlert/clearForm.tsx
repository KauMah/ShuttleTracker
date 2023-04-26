import { $flash, $salmon } from '../../assets/colors';
import { Field, Form, Formik } from 'formik';

import { api } from '../../utils/api';
import { css } from '@emotion/react';

interface Account {
  id: string;
}

const Values: Account = {
  id: '',
};

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
const ClearForm = (): JSX.Element => {
  return (
    <div>
      <Formik
        initialValues={Values}
        onSubmit={(values, { setSubmitting }) => {
          const { id } = values;

          api
            .post('/alerts/clear', { id })
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
              <label htmlFor="id" css={styles.text}>
                Alert ID
              </label>
              <Field type="text" name="id" id="id" placeholder="ID" css={styles.textBox} maxLength={100} />
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

export default ClearForm;
