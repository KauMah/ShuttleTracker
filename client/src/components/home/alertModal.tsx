import { Button, Modal, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import { api } from '../../utils/api';

interface Alert {
  _id: string;
  title: string;
  message: string;
}
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
    <>
      <Button variant="primary" onClick={handleShowModal}>
        Show Alerts
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Alerts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alertsFetched
            ? alerts.map((alert) => (
                <div key={alert._id}>
                  <div>
                    <div>Title:</div>
                    <p>{alert.title}</p>
                  </div>
                  <div>
                    <div>Message:</div>
                    <p>{alert.message}</p>
                  </div>
                </div>
              ))
            : null}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AlertModal;
