import * as Yup from 'yup';

import { $grey, $lightGrey, $white } from '../../assets/colors';

import { Formik } from 'formik';
import TextInput from '../TextInput';
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

const validation = Yup.object().shape({});

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

export const RegisterForm = (): JSX.Element => {
  return (
    <div className="d-flex justify-content-center">
      <h1> Create account</h1>
    </div>
  );
};
