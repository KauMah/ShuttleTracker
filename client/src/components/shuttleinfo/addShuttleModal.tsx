import { Bus, Operator, Route } from './component';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { FormEvent, useEffect, useState } from 'react';

import { api } from '../../utils/api';

interface AddShuttleModalProps {
  show: boolean;
  bus: Bus | null;
  onHide: () => void;
  loadData: () => void;
  onAddSuccess: () => void;
  reload: () => void;
}

const AddShuttleModal: React.FC<AddShuttleModalProps> = ({ show, onHide, loadData, onAddSuccess, reload }) => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [active, setActive] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);

  const fetchRoutes = async () => {
    try {
      const response = await api.get('/route/');
      setRoutes(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await api.get('/user/drivers');
      setOperators(response.data.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRoutes();
    fetchDrivers();
  }, []);

  const handleRouteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const routeId = e.target.value;
    const selected = routes.find((route) => route._id === routeId);
    setSelectedRoute(selected || null);
  };

  const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const operatorId = e.target.value;
    const selected = operators.find((operator) => operator._id === operatorId);
    setSelectedOperator(selected || null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/shuttle/new', {
        capacity: 35,
        route: selectedRoute?._id,
        driver: selectedOperator?._id,
        active,
        occupancy: 0,
      });
      loadData();
      onAddSuccess();
      reload();
      onHide();
    } catch (err) {
      console.log(err);
      console.log(35, selectedRoute?._id, selectedOperator?._id, active);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Shuttle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="route">
            <Form.Label>Route</Form.Label>
            <Form.Select value={selectedRoute?._id || ''} onChange={(e) => handleRouteChange(e)}>
              <option value="">Select a route</option>
              {routes.map((routeItem) => (
                <option key={routeItem._id} value={routeItem._id}>
                  {routeItem.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="driver">
            <Form.Label>Operator</Form.Label>
            <Form.Select value={selectedOperator?._id || ''} onChange={(e) => handleOperatorChange(e)}>
              <option value="">Select an operator</option>
              {operators.map((operatorItem) => (
                <option key={operatorItem._id} value={operatorItem._id}>
                  {operatorItem.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Active</Form.Label>
            <Form.Check type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginTop: '7px' }}>
            Add Shuttle
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddShuttleModal;
