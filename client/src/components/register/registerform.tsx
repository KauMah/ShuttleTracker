import { $grey, $lightGrey, $white } from '../../assets/colors';

import { Formik } from 'formik';
import TextInput from '../TextInput';
import { css } from '@emotion/react';

interface Account {
  first?: string;
  last?: string;
  pass?: string;
  passconfirmed?: string;
}

function validateFirst(value: any) {
  let error;
  if (!value) {
    error = 'First Name Required';
  } else if (!/^[a-zA-Z]$/i.test(value)) {
    error = 'Please Enter Your First Name';
  }
  return error;
}
function validateLast(value: any) {
  let error;
  if (!value) {
    error = 'Last Name Required';
  } else if (!/^[a-zA-Z]$/i.test(value)) {
    error = 'Please Enter Your First Name';
  }
  return error;
}
function validatePass(value: any) {
  let error;
  if (!value) {
    error = 'First Name Required';
  } else if (!/^[a-zA-Z]$/i.test(value)) {
    error = 'Please Enter A Valid Password';
  }
  return error;
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

export const RegisterForm = (): JSX.Element => {
  return (
    <div className="d-flex justify-content-center">
      <h1> Create account</h1>
      <Formik
        initialValues={{ first: '', last: '', pass: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <TextInput
              name="First Name"
              placeholder="Enter Your First Name"
              type="First Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={validateFirst.value}
            />
            <p style={styles.error}>{errors.first && touched.first && errors.first}</p>
          </form>
        )}
      </Formik>
    </div>
  );
};

// const formik = useFormik({
//   initialValues: {
//     email: '',
//     password: '',
//   },
//   onSubmit: (value) => {
//     console.log('woof');
//   },
// });
