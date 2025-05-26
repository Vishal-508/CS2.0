import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {  useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
const dispatch = useDispatch();
const { token ,error} = useSelector((state) => state.auth);
const location = useLocation();

useEffect(() => {
if (error) {
  toast.error(error);
  dispatch(clearError());
}
}, [error, dispatch]);
  if (!token) {
    toast.error('Please login to access this page');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;