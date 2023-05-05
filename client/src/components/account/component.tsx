import * as Yup from 'yup';

import { $black, $flash, $lightGrey, $msured, $red, $salmon } from '../../assets/colors';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';

import { AuthContext } from '../../utils/AuthContext';
import { Modal } from 'react-bootstrap';
import MsuNav from '../navBar';
import { api } from '../../utils/api';
import { css } from '@emotion/react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Pass {
  user: {
    password: string;
  };
  passCon: string;
}
const Values: Pass = {
  user: {
    password: '',
  },
  passCon: '',
};

const validation = Yup.object().shape({
  user: Yup.object().shape({
    password: Yup.string().min(8, '*Password requires at least 8 characters').required('*Password is required'),
  }),
  passCon: Yup.string()
    .oneOf([Yup.ref('user.password')], '*Passwords must match')
    .required('*Confirm password required'),
});

const styles = {
  title: css({
    color: $msured,
    fontSize: '4.3rem',
    fontFamily: 'Helvetica',
    fontWeight: 500,
  }),
  infoBox: css({
    height: '7vh',
    width: '80vw',
    color: $msured,
    fontFamily: 'Helvetica',
    fontWeight: 700,
    marginTop: '.5rem',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'space-between',
  }),
  button: css({
    background: $msured,
    color: $black,
    height: '7vh',
    width: '80vw',
    fontFamily: 'Helvetica',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '.5rem',
    cursor: 'pointer',
    '&:hover': {
      background: $flash,
      color: $salmon,
    },
  }),
  submitButton: css({
    backgroundColor: $salmon,
    width: '5rem 10%',
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
    width: '29rem',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.2rem',
    fontWeight: 500,
    marginBottom: '2vh',
    appearance: 'none',
    '& input': {
      height: '2.3rem',
      fontSize: '1rem',
      background: $lightGrey,
      borderRadius: '8px',
      border: 'none',
    },
  }),
  error: css({
    color: $msured,
  }),
  passChange: css({
    fontFamily: 'Helvetica',
    fontSize: '1.8rem',
  }),
};
const Account = () => {
  const { user, setUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    api.defaults.headers.common.Authorization = null;
    localStorage.removeItem('user');
    navigate('/login');
  };
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div style={{ marginTop: '13rem' }}>
      <MsuNav />
      <h1 className="d-flex justify-content-center" css={styles.title}>
        Account
      </h1>
      <div className="row" style={{ marginTop: '2rem' }}>
        <div className="col d-flex justify-content-center">
          <div style={{ flexDirection: 'column' }}>
            <div css={styles.infoBox}>
              <div style={{ margin: '1.5vh 1vw' }}>Role:</div>
              <div className="col d-flex justify-content-end" style={{ margin: '1.5vh 1vw' }}>
                {user?.role}
              </div>
            </div>
            <div css={styles.infoBox}>
              <div style={{ margin: '1.5vh 1vw' }}>Email: </div>
              <div className="col d-flex justify-content-end" style={{ margin: '1.5vh 1vw' }}>
                {user?.email}
              </div>
            </div>
            <div css={styles.infoBox}>
              <div style={{ margin: '1.5vh 1vw' }}>Name:</div>
              <div className="col d-flex justify-content-end" style={{ margin: '1.5vh 1vw' }}>
                {user?.name}
              </div>
            </div>
            <div>
              <button onClick={handleShowModal} css={styles.button}>
                Change Password
              </button>
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title css={styles.passChange}>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Formik
                    initialValues={Values}
                    validationSchema={validation}
                    onSubmit={(values, { setSubmitting }) => {
                      const {
                        user: { password },
                      } = values;

                      api
                        .post('/user/edit', { user: { password } })
                        .then((data) => {
                          console.log(data);
                          toast.success('Your account has been Updated!', {
                            position: toast.POSITION.TOP_RIGHT,
                          });
                          handleCloseModal();
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                      setTimeout(() => {
                        console.log(false);
                      });
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div css={styles.input}>
                          <label htmlFor="password">Password</label>
                          <Field type="password" name="user.password" id="user.password" placeholder="Password" />
                          <ErrorMessage css={styles.error} name="user.password" component="div" />
                        </div>
                        <div css={styles.input}>
                          <label htmlFor="passCon">Confirm Password</label>
                          <Field type="password" name="passCon" id="passCon" placeholder="Confirm Password" />
                          <ErrorMessage css={styles.error} name="passCon" component="div" />
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '3vh' }}>
                          <button type="submit" disabled={isSubmitting} css={styles.submitButton}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Modal.Body>
              </Modal>
            </div>
            <button onClick={handleLogout} css={styles.button}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;
