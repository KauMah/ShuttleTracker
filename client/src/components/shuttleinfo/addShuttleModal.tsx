import { Button, Form, Modal } from 'react-bootstrap';
import React, { FormEvent, useState } from 'react';

import { api } from '../../utils/api';
// import { Shuttle } from './component'; <- Remove this line

interface AddShuttleModalProps {
  show: boolean;
  onHide: () => void;
  loadData: () => void;
}

const AddShuttleModal: React.FC<AddShuttleModalProps> = ({ show, onHide, loadData }) => {
  const [capacity, setCapacity] = useState<number | ''>('');
  const [route, setRoute] = useState('');
  const [driver, setDriver] = useState('');
  const [active, setActive] = useState(true);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/shuttle/new', {
        capacity,
        route,
        driver,
        active,
      });
      loadData();
      onHide();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Shuttle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="capacity">
            <Form.Label>Capacity</Form.Label>
            <Form.Control type="number" value={capacity} onChange={(e) => setCapacity(parseInt(e.target.value))} />
          </Form.Group>
          <Form.Group controlId="route">
            <Form.Label>Route ID</Form.Label>
            <Form.Control type="text" value={route} onChange={(e) => setRoute(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="driver">
            <Form.Label>Driver ID</Form.Label>
            <Form.Control type="text" value={driver} onChange={(e) => setDriver(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Active</Form.Label>
            <Form.Check type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Shuttle
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddShuttleModal;
