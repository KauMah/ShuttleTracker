import { Bus, Route } from './component';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { api } from '../../utils/api';

interface EditShuttleModalProps {
  show: boolean;
  bus: Bus | null;
  routes: Route[];
  onHide: () => void;
  onEditSuccess: (updatedBus: Bus) => void;
}

const EditShuttleModal: React.FC<EditShuttleModalProps> = ({ show, bus, routes, onHide, onEditSuccess }) => {
  const [capacity, setCapacity] = useState<string>(bus ? bus.capacity.toString() : '');
  const [routeId, setRouteId] = useState(bus && bus.route ? bus.route._id : '');

  useEffect(() => {
    if (bus) {
      setCapacity(bus.capacity.toString());
      setRouteId(bus.route ? bus.route._id : '');
    }
  }, [bus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bus) {
      try {
        const response = await api.post('/shuttle/edit', {
          id: bus._id,
          shuttle: {
            capacity: parseInt(capacity, 10),
            route: routeId,
            driver: bus.driver,
            active: bus.active,
            loc: bus.loc,
          },
        });
        if (response.status === 200) {
          onEditSuccess({
            ...bus,
            capacity: parseInt(capacity, 10),
            route: routes.find((r: Route) => r._id === routeId)!,
          });
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
      setCapacity(e.target.value);
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
