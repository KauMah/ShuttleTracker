import { $black, $flash, $msured, $red, $salmon, $white } from '../../assets/colors';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import { api } from '../../utils/api';
import { css } from '@emotion/react';

interface Alert {
  _id: string;
  title: string;
  message: string;
}
const style = {
  alertbtn: css({
    display: 'flex',
    justifyContent: 'end',
    marginBottom: '5rem',
    marginTop: '-5rem',
  }),
  btn: css({
    height: '6rem',
    width: '10rem',
    fontSize: '1.4rem',
    fontFamily: 'Helvetica',
    backgroundColor: $salmon,
    color: $white,
    border: '2px solid red',
    borderRadius: '5px',
    ':hover': {
      backgroundColor: $flash,
      color: $black,
      border: '2px solid red',
    },
    '@media (max-width: 720px)': {
      width: '8rem',
    },
    '@media (max-width: 550px)': {
      width: '6rem',
    },
  }),
  title: css({
    fontSize: '1.8rem',
    fontFamily: 'Helvetica',
    color: $white,
    display: 'flex',
    justifyContent: 'center',
  }),
  mess: css({
    fontSize: '1.3rem',
    fontFamily: 'Helvetica',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
  }),
  text: css({
    fontFamily: 'Helvetica',
    fontSize: '1.2rem',
    display: 'flex',
    justifyContent: 'center',
  }),
  border: css({
    background: $salmon,
    borderRadius: '10px',
    border: '1px solid black',
  }),
  modalHead: css({
    fontFamily: 'Helvetica',
    fontSize: '2rem',
  }),
};
const AlertModal = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertsFetched, setAlertsFetched] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await api.get('/alerts/');
        if (response.data.data) {
          setAlerts(response.data.data);
          setAlertsFetched(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAlerts();
  }, []);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div css={style.alertbtn}>
      <Button css={style.btn} onClick={handleShowModal}>
        Show Alerts
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title css={style.modalHead}>Alerts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alertsFetched
            ? alerts.map((alert) => (
                <div key={alert._id}>
                  <div css={style.border}>
                    <div css={style.title}>Title:</div>
                    <p css={style.text}>{alert.title}</p>
                  </div>
                  <div>
                    <div css={style.mess}>Message:</div>
                    <p css={style.text}>{alert.message}</p>
                  </div>
                </div>
              ))
            : null}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default AlertModal;
