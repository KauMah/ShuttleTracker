// components/EditStopModal.tsx

import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'; // Import useEffect

import { Stop } from './component';
import { api } from '../../utils/api';

interface EditStopModalProps {
  show: boolean;
  stop: Stop | null;
  onHide: () => void;
  onEditSuccess: (updatedStop: Stop) => void;
  reload: () => void; // Add this line
}

const EditStopModal: React.FC<EditStopModalProps> = ({ show, stop, onHide, onEditSuccess, reload }) => {
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
        if (response.status === 201) {
          const updatedStop = {
            ...stop,
            name,
          };
          onEditSuccess(updatedStop);
          reload(); // Add this line
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    setName(stop ? stop.name : '');
    if (!show) {
      onHide(); // Add this line here
    }
  }, [stop, show, onHide]);

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
