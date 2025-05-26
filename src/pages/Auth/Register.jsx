import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, resetRegisterSuccess } from '../../features/auth/authSlice';
// import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { Button, Input, Card, Form, Logo } from '../../components/UI';
import { FaUserPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import OuterContainer from '../../components/UI/OuterContainer';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error, registerSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

 useEffect(() => {
  if (error) {
    toast.error(error.message || 'Registration failed', {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (registerSuccess) {
    toast.success('Registration successful! Please login', {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(resetRegisterSuccess());
    navigate('/login');
  }
}, [error, registerSuccess, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }));
  };

  return (

      <AuthContainer>
        <AuthCard>
          <Logo />
          <h2>Create an Account</h2>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="username"
              placeholder="Full Name"
              value={formData.username}
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
          
            <Button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Registering...' : (
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