import React, { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import API_ENDPOINTS from '../Config';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  // const userId = uuidv4();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6 || password.length > 10) {
      setError('Password should be between 6 and 10 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      const userId = email;
        const response = await axios.post(API_ENDPOINTS.REGISTER, { userId, email, password });
        if (response.status === 201) {
          alert('User created successfully');
          navigate('/login');
        }
        if (response.status === 409) {
          // alert('User Already exists with same emailid');
          setError('ser Already exists with same emailid');
        }
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('User already exists');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Register;