import { Bus, Route } from './component';
// editShuttleModal.tsx
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { api } from '../../utils/api';

interface EditShuttleModalProps {
  show: boolean;
  bus: Bus | null;
  routes: Route[];
  onHide: () => void;
  onEditSuccess: () => void;
}

const EditShuttleModal: React.FC<EditShuttleModalProps> = ({ show, bus, routes, onHide, onEditSuccess }) => {
  const [capacity, setCapacity] = useState(bus ? bus.capacity : '');
  const [routeId, setRouteId] = useState(bus && bus.route ? bus.route._id : '');

  useEffect(() => {
    if (bus) {
      setCapacity(bus.capacity);
      setRouteId(bus.route ? bus.route._id : '');
    }
  }, [bus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bus) {
      try {
        const response = await api.post('/shuttle/edit', {
          id: bus._id,
          Bus: {
            capacity,
            route: routeId,
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
    const newCapacity = parseInt(e.target.value, 10);
    if (newCapacity >= 0) {
      setCapacity(newCapacity);
    }
  };

  const handleRouteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRouteId(e.target.value);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Bus</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Capacity</Form.Label>
            <Form.Control type="number" min="0" value={capacity} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Route</Form.Label>
            <Form.Control as="select" value={routeId} onChange={handleRouteChange} required>
              <option value="">Select Route</option>
              {routes.map((route) => (
                <option key={route._id} value={route._id}>
                  {route.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditShuttleModal;
