import * as Yup from 'yup';

import { $flash, $lightGrey, $msured, $salmon } from '../../assets/colors';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { api } from '../../utils/api';
import { css } from '@emotion/react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Account {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: 'admin' | 'driver' | 'rider';
}

const Values: Account = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  role: 'rider',
};

const validation = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z]+$/, '*First name can only have letters')
    .max(32, '*First name must be shorter than 32 characters')
    .required('*First name is required'),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, '*Last name can only have letters')
    .max(32, '*Last name must be shorter than 32 characters')
    .required('*Last name is required'),
  email: Yup.string()
    .matches(/^[\w-.]+@montclair\.edu$/, '*Must be a MSU email')
    .required('*Valid MSU email required'),
  password: Yup.string().min(8, 'Password requires at least 8 characters').required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password required'),
});

const styles = {
  submitButton: css({
    backgroundColor: $salmon,
    height: '5vh 100%',
    width: '10vw 100%',
    fontSize: '2rem',
    fontWeight: 700,
    borderRadius: '13px',
    marginTop: '3vh',
    padding: 'auto',
    transition: 'background-color 0.25s',
    '&:hover': {
      backgroundColor: $flash,
    },
  }),
  input: css({
    fontFamily: 'Helvetica',
    width: '25vw',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.2rem',
    fontWeight: 500,
    marginBottom: '2vh',
    appearance: 'none',
    '& input': {
      height: '4vh',
      fontSize: '1rem',
      background: $lightGrey,
      borderRadius: '8px',
      border: 'none',
    },
  }),
  userRole: css({
    height: '4vh',
    backgroundColor: $lightGrey,
    borderRadius: '20px',
    fontWeight: 500,
    appearance: 'none',
    cursor: 'pointer',
  }),
  error: css({
    color: $msured,
  }),
};

const RegisterForm = (): JSX.Element => {
  const nav = useNavigate();
  return (
    <div className="d-flex justify-content-center" style={{ marginTop: '50px' }}>
      <Formik
        initialValues={Values}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting }) => {
          const { firstName, lastName, email, password, passwordConfirm, role } = values;
          const name = `${firstName} ${lastName}`;

          api
            .post('/auth/register', { name, email, password, passwordConfirm, role })
            .then((data) => {
              console.log(data);
              toast.success('Your account has been created!', {
                position: toast.POSITION.TOP_RIGHT,
              });
              nav('/login');
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
              <Field type="text" name="firstName" id="firstName" placeholder="First Name" />
              <ErrorMessage css={styles.error} name="firstName" component="div" />
            </div>
            <div css={styles.input}>
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" name="lastName" id="lastName" placeholder="Last Name" />
              <ErrorMessage css={styles.error} name="lastName" component="div" />
            </div>
            <div css={styles.input}>
              <label htmlFor="email">Email</label>
              <Field type="text" name="email" id="email" placeholder="Email" />
              <ErrorMessage css={styles.error} name="email" component="div" />
            </div>
            <div css={styles.input}>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" id="password" placeholder="Password" />
              <ErrorMessage css={styles.error} name="password" component="div" />
            </div>
            <div css={styles.input}>
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <Field type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirm Password" />
              <ErrorMessage css={styles.error} name="passwordConfirm" component="div" />
            </div>
            <label htmlFor="role">What are you?&nbsp;</label>
            <Field component="select" name="role" id="role" css={styles.userRole} style={{ textAlign: 'center' }}>
              <option value="admin">Admin</option>
              <option value="driver">Bus-operator</option>
              <option value="rider">Student</option>
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
