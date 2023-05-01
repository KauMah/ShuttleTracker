import { Button, Form, Modal } from 'react-bootstrap';
import React, { FormEvent, useState } from 'react';

import { Stop } from './component';
import { api } from '../../utils/api';

interface AddStopModalProps {
  show: boolean;
  stop: Stop | null;
  onHide: () => void;
  loadData: () => void;
  onAddSuccess: () => void;
  reload: () => void;
}

const AddStopModal: React.FC<AddStopModalProps> = ({ show, onHide, loadData, onAddSuccess, reload }) => {
  const [name, setName] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/stop/new', {
        name,
        loc: {
          type: 'Point',
          coordinates: [parseFloat(x), parseFloat(y)],
        },
      });
      loadData();
      onAddSuccess();
      reload();
      onHide();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Stop</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="coordinates">
            <Form.Label>Coordinates (x, y)</Form.Label>
            <Form.Control type="text" placeholder="x" value={x} onChange={(e) => setX(e.target.value)} />
            <Form.Control type="text" placeholder="y" value={y} onChange={(e) => setY(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Stop
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddStopModal;
