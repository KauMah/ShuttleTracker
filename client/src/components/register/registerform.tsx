import * as Yup from 'yup';

import { $msured, $salmon, $white } from '../../assets/colors';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { api } from '../../utils/api';
import { css } from '@emotion/react';

interface Account {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  role: 'admin' | 'busOP' | 'rider';
}

const Values: Account = {
  firstName: '',
  lastName: '',
  password: '',
  passwordConfirm: '',
  role: 'rider',
};

const validation = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'First name can only have letters')
    .max(32, 'First name must be shorter than 32 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Last name can only have letters')
    .max(32, 'Last name must be shorter than 32 characters')
    .required('Last name is required'),
  password: Yup.string().min(8, 'Password requires at least 8 characters').required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password required'),
});

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
    fontSize: '8px',
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
      <Formik
        initialValues={Values}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting }) => {
          const { firstName, lastName, password, passwordConfirm, role } = values;
          const name = `${firstName} ${lastName}`;
          const email = `${lastName}${firstName.charAt(0)}@montclair.edu`;

          api
            .post('/auth/register', { name, email, password, passwordConfirm, role })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
          setTimeout(() => {
            setSubmitting(false);
          });
        }}
      >
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
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" id="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div css={styles.input}>
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <Field type="password" name="passwordConfirm" id="passwordConfirm" />
              <ErrorMessage name="passwordConfirm" component="div" />
            </div>
            <label htmlFor="role"> What are you?</label>
            <Field component="select" name="role" id="role">
              <option value="admin">Admin</option>
              <option value="busOP">Bus-operator</option>
              <option value="rider">rider</option>
            </Field>
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

export default RegisterForm;
