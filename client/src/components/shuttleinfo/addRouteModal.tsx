import { Button, Form, Modal } from 'react-bootstrap';
import React, { FormEvent, useEffect, useState } from 'react';
import { Route, Stop } from './component';

import { api } from '../../utils/api';

interface AddRouteModalProps {
  show: boolean;
  route: Route | null;
  onAddSuccess: () => void;
  onHide: () => void;
  loadData: () => void;
  reload: () => void;
}

const AddRouteModal: React.FC<AddRouteModalProps> = ({ show, onHide, loadData }) => {
  const [name, setName] = useState('');
  const [allStops, setAllStops] = useState<Stop[]>([]);
  const [selectedStops, setSelectedStops] = useState<string[]>([]);

  const fetchStops = async () => {
    try {
      const response = await api.get('/stop/');
      setAllStops(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/route/new', {
        name,
        stops: selectedStops,
      });
      loadData();
      onHide();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedStops([...selectedStops, value]);
    } else {
      setSelectedStops(selectedStops.filter((stopId) => stopId !== value));
    }
  };

  useEffect(() => {
    fetchStops();
  }, []);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Route</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="stops">
            <Form.Label>Stops:</Form.Label>
            {allStops.map((stop) => (
              <Form.Check
                key={stop._id}
                type="checkbox"
                label={stop.name}
                value={stop._id}
                onChange={handleCheckboxChange}
              />
            ))}
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
