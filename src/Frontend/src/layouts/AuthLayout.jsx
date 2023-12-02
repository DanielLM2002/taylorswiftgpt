import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthLayout = () => {
  const { AuthContext } = useAuth();
  const { userCredentials } = AuthContext;

  if (userCredentials !== undefined && userCredentials === null) {
    return <Navigate to='/login' />
  } 

  if (userCredentials) {
    return (
      <Outlet />
    );
  }
};

export default AuthLayout;
