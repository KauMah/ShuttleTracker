// editRouteModal.tsx
import { Button, Form, Modal } from 'react-bootstrap';
import React, { FormEvent, useEffect, useState } from 'react';
import { Route, Stop } from './component';

import { api } from '../../utils/api';

interface EditRouteModalProps {
  show: boolean;
  route: Route | null;
  onHide: () => void;
  onEditSuccess: () => void;
}

const EditRouteModal: React.FC<EditRouteModalProps> = ({ show, route, onHide, onEditSuccess }) => {
  const [name, setName] = useState(route ? route.name : '');
  const [allStops, setAllStops] = useState<Stop[]>([]);
  const [selectedStops, setSelectedStops] = useState<string[]>(route ? route.stops.map((stop) => stop._id) : []);

  useEffect(() => {
    setName(route ? route.name : '');
    setSelectedStops(route ? route.stops.map((stop) => stop._id) : []);
  }, [route]);

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
    if (route) {
      console.log(route._id, name, selectedStops);
      try {
        const response = await api.post('/route/edit', {
          id: route._id,
          route: {
            name: name,
            stops: selectedStops,
          },
        });
        console.log(route);
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
        <Modal.Title>Edit Route</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={handleChange} required />
          </Form.Group>
          {/* <Form.Group controlId="stops">
            <Form.Label>Stops</Form.Label>
            {allStops.map((stop) => (
              <Form.Check
                key={stop._id}
                type="checkbox"
                label={stop.name}
                value={stop._id}
                checked={selectedStops.includes(stop._id)}
                onChange={handleCheckboxChange}
              />
            ))}
          </Form.Group> */}
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditRouteModal;
