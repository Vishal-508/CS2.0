import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { loginUser, clearError } from '../../features/auth/authSlice';
// import { toast } from 'react-hot-toast';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Button, Input, Card, Form, Logo } from '../../components/UI';
import { FaSignInAlt } from 'react-icons/fa';
import OuterContainer from '../../components/UI/OuterContainer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, loading } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const result = await dispatch(loginUser(formData)).unwrap();
  } catch (error) {
    toast.error(error.message || 'Invalid credentials', {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

  return (
    <OuterContainer>
      <AuthContainer>
        <AuthCard>
          <Logo />
          <h2>Login to CivicSync</h2>
          <Form onSubmit={handleSubmit}>
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
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : (
                <>
                  <FaSignInAlt /> Login
                </>
              )}
            </Button>
          </Form>
          <AuthFooter>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </AuthFooter>
        </AuthCard>
      </AuthContainer>
    </OuterContainer>
  );
};
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

export default Login;