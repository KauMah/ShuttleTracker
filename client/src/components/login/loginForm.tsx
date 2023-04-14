import { $grey, $lightGrey, $white } from '../../assets/colors';
import { redirect, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { AuthContext } from '../../utils/AuthContext';
import { Formik } from 'formik';
import TextInput from '../TextInput';
import _ from 'lodash';
import { api } from '../../utils/api';
import axios from 'axios';
import { css } from '@emotion/react';
import { toast } from 'react-toastify';

interface LoginValues {
  email?: string;
  password?: string;
}

const styles = {
  submitButton: css({
    backgroundColor: $lightGrey,
    height: '40px',
    width: '25%',
    padding: '5px',
    fontWeight: 900,
    fontSize: '25px',
    transition: 'background-color 0.25s',
    '&:hover': {
      backgroundColor: $grey,
    },
  }),
  error: {
    color: $white,
    fontsize: '8px',
  },
};

const LoginForm = (): JSX.Element => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={(values) => {
        const errors: LoginValues = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[\w-.]+@montclair\.edu$/.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        api
          .post('/auth/login', values)
          .then((data) => {
            // console.log(_.get(data, 'data.user.access_token', ''));
            setUser(_.get(data, 'data.user', ''));
            localStorage.setItem('user', JSON.stringify(_.get(data, 'data.user', '')));
            axios.defaults.headers.common.Authorization = 'Bearer your_token_here';
            redirect('/');
          })
          .catch((err) => {
            toast(_.get(err, 'response.data.error[0].message', 'Failed unexpectedly, check connection'), {
              type: 'error',
            });
          });

        setTimeout(() => {
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <TextInput
            name="email"
            placeholder="Enter your email"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <p style={styles.error}>{errors.email && touched.email && errors.email}</p>
          <TextInput
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <p style={styles.error}>{errors.password && touched.password && errors.password}</p>

          <button css={styles.submitButton} type="submit" disabled={isSubmitting}>
            SUBMIT
          </button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
