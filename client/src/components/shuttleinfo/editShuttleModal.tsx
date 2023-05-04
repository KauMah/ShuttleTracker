import { Bus, Route } from './component';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { api } from '../../utils/api';

interface EditShuttleModalProps {
  show: boolean;
  bus: Bus | null;
  routes: Route[];
  drivers: {
    _id: string;
    name: string;
  }[];
  onHide: () => void;
  onEditSuccess: (updatedBus: Bus) => void;
  reload: () => void;
}

const EditShuttleModal: React.FC<EditShuttleModalProps> = ({ show, bus, routes, drivers, onHide, onEditSuccess }) => {
  const [routeId, setRouteId] = useState(bus && bus.route ? bus.route._id : '');
  const [driverId, setDriverId] = useState(bus && bus.driver ? bus.driver : '');

  useEffect(() => {
    if (bus) {
      setRouteId(bus.route ? bus.route._id : '');
      setDriverId(bus.driver ? bus.driver : '');
    }
  }, [bus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bus) {
      try {
        const response = await api.post('/shuttle/edit', {
          id: bus._id,
          shuttle: {
            route: routeId,
            driver: driverId,
            active: bus.active,
            loc: bus.loc,
          },
        });
        if (response.status === 200) {
          onEditSuccess({
            ...bus,
            route: routes.find((r: Route) => r._id === routeId)!,
            driver: driverId,
          });
          onHide();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleRouteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRouteId(e.target.value);
  };

  const handleDriverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDriverId(e.target.value);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Bus</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Route</Form.Label>
            <select value={routeId} onChange={handleRouteChange} required className="form-control">
              <option value="">Select Route</option>
              {routes.map((route) => (
                <option key={route._id} value={route._id}>
                  {route.name}
                </option>
              ))}
            </select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Driver</Form.Label>
            <select value={driverId} onChange={handleDriverChange} required className="form-control">
              <option value="">Select Driver</option>
              {drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver.name}
                </option>
              ))}
            </select>
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
