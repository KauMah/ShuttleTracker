import { Button, Form, Modal } from 'react-bootstrap';
import React, { FormEvent, useEffect, useState } from 'react';

import { Operator } from './component';
import { api } from '../../utils/api';

interface EditUserModalProps {
  show: boolean;
  user: Operator | null;
  onHide: () => void;
  onEditSuccess: () => void;
  reload: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ show, user, onHide, onEditSuccess, reload }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('rider');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword('');
      setRole(user.role);
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      await api.post('/user/adminEdit', {
        user: {
          id: user._id,
          name,
          email,
          password: password || undefined,
          role,
        },
      });
      onEditSuccess();
      reload();
      onHide();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password (leave blank to keep unchanged)</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="rider">Rider</option>
              <option value="driver">Driver</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginTop: '12px' }}>
            Edit User
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
