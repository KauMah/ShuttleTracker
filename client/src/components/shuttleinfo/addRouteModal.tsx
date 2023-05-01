import { Button, Form, Modal } from 'react-bootstrap';
import React, { FormEvent, useState } from 'react';

import { api } from '../../utils/api';
// import { Route } from './component'; <- Remove this line

interface AddRouteModalProps {
  show: boolean;
  onHide: () => void;
  loadData: () => void;
}

const AddRouteModal: React.FC<AddRouteModalProps> = ({ show, onHide, loadData }) => {
  const [name, setName] = useState('');
  const [stops, setStops] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/route/new', {
        name,
        stops: stops.split(',').map((id) => id.trim()),
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
        <Modal.Title>Add New Route</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="stops">
            <Form.Label>Stops (comma separated IDs)</Form.Label>
            <Form.Control type="text" value={stops} onChange={(e) => setStops(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Route
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRouteModal;
