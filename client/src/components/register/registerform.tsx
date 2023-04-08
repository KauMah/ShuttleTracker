import * as Yup from 'yup';

import { $black, $grey, $lightGrey, $msured, $salmon, $white } from '../../assets/colors';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { css } from '@emotion/react';

interface Account {
  firstName: string;
  lastName: string;
  pass: string;
  confirmPass: string;
}

const Values: Account = {
  firstName: '',
  lastName: '',
  pass: '',
  confirmPass: '',
};

const validation = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'First name can only have letters')
    .required('First name is required'),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Last name can only have letters')
    .required('Last name is required'),
  pass: Yup.string().min(8, 'Password requires at least 8 characters').required('Password is required'),
  confirmPass: Yup.string()
    .oneOf([Yup.ref('pass')], 'Passwords must match')
    .required('Confirm password required'),
});
const onSubmit = (values: Account, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

const styles = {
  submitButton: css({
    color: $white,
    backgroundColor: $msured,
    height: '5vh',
    width: '10vh',
    fontWeight: 500,
    transition: 'background-color 0.25s',
    '&:hover': {
      backgroundColor: $salmon,
    },
  }),
  error: {
    color: $white,
    fontsize: '8px',
  },
  input: css({
    fontFamily: 'Helvetica',
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 500,
    marginBottom: '.5vh',
    '& label': {
      marginBottom: '.8vh',
    },
  }),
};

const RegisterForm = (): JSX.Element => {
  return (
    <div className="d-flex justify-content-center" style={{ marginTop: '20px' }}>
      <Formik initialValues={Values} validationSchema={validation} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div css={styles.input}>
              <label htmlFor="firstName">First Name</label>
              <Field type="text" name="firstName" id="firstName" />
              <ErrorMessage name="firstName" component="div" />
            </div>
            <div css={styles.input}>
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" name="lastName" id="lastName" />
              <ErrorMessage name="lastName" component="div" />
            </div>
            <div css={styles.input}>
              <label htmlFor="pass">Password</label>
              <Field type="password" name="pass" id="pass" />
              <ErrorMessage name="pass" component="div" />
            </div>
            <div css={styles.input}>
              <label htmlFor="confirmPass">Confirm Password</label>
              <Field type="password" name="confirmPass" id="confirmPass" />
              <ErrorMessage name="confirmPass" component="div" />
            </div>
            <div style={{ textAlign: 'center' }}>
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

export default RegisterForm;
