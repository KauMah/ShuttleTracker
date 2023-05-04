import { Button, Form, Modal } from 'react-bootstrap';
import React, { FormEvent, useState } from 'react';

import { Operator } from './component';
import { api } from '../../utils/api';

interface AddUserModalProps {
  show: boolean;
  user: Operator | null; // Make sure this property exists
  onHide: () => void;
  loadData: () => void;
  onAddSuccess: () => void;
  reload: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ show, onHide, loadData, onAddSuccess, reload }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [role, setRole] = useState('rider');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
        passwordConfirm,
        role,
      });
      loadData();
      onAddSuccess();
      reload();
      onHide();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
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
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="rider">Rider</option>
              <option value="driver">Driver</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginTop: '12px' }}>
            Add User
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserModal;
