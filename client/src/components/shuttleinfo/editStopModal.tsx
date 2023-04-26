// components/EditStopModal.tsx

import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';

import { Stop } from './component';
import { api } from '../../utils/api';

interface EditStopModalProps {
  show: boolean;
  stop: Stop | null;
  onHide: () => void;
  onEditSuccess: () => void;
}

const EditStopModal: React.FC<EditStopModalProps> = ({ show, stop, onHide, onEditSuccess }) => {
  const [name, setName] = useState(stop ? stop.name : '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stop) {
      try {
        const response = await api.post('/stop/edit', {
          stop: {
            _id: stop._id,
            name,
            loc: stop.loc,
          },
        });
        if (response.status === 200) {
          onEditSuccess();
          onHide();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Stop</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStopModal;
