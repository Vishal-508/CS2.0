import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../features/auth/authSlice';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { Button, Input, Card, Form, Logo } from '../../components/UI';
import { FaUserPlus } from 'react-icons/fa';
import OuterContainer from '../../components/UI/OuterContainer';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Registration failed');
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    dispatch(registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }));
  };

  return (
    <OuterContainer>
    <AuthContainer>
      <AuthCard>
        <Logo />
        <h2>Create an Account</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="6"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Registering...' : (
              <>
                <FaUserPlus /> Register
              </>
            )}
          </Button>
        </Form>
        <AuthFooter>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </AuthFooter>
      </AuthCard>
    </AuthContainer>
    </OuterContainer>
  );
};

// Reuse the same styled components from Login
const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  padding: 1rem;
`;

const AuthCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  text-align: center;

  h2 {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const AuthFooter = styled.div`
  margin-top: 1.5rem;
  font-size: 0.9rem;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Register;