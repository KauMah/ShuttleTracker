import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';

import { Route } from './component';
import { api } from '../../utils/api';

interface EditRouteModalProps {
  show: boolean;
  route: Route | null;
  onHide: () => void;
  onEditSuccess: () => void;
}

const EditRouteModal: React.FC<EditRouteModalProps> = ({ show, route, onHide, onEditSuccess }) => {
  const [name, setName] = useState(route ? route.name : '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (route) {
      try {
        const response = await api.post('/route/edit', {
          id: route._id,
          route: {
            name,
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
        <Modal.Title>Edit Route</Modal.Title>
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

export default EditRouteModal;
