import { $black, $flash, $msured, $salmon } from '../../assets/colors';
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
    <div style={{ marginTop: '100px' }}>
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
                  <Modal.Title>Password Change</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Formik
                    initialValues={Values}
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
                        <div>
                          <label htmlFor="user.email">Email</label>
                          <Field type="user.email" name="user.email" id="user.email" placeholder="Email" />
                          <ErrorMessage name="user.email" component="div" />
                        </div>
                        <div>
                          <label htmlFor="password">Password</label>
                          <Field type="user.password" name="user.password" id="user.password" placeholder="Password" />
                          <ErrorMessage name="user.password" component="div" />
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '3vh' }}>
                          <button type="submit" disabled={isSubmitting}>
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
