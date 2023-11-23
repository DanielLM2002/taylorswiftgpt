import { useState } from 'react';
import authContext from './authContext';

const AuthProvider = (props) => {
  const { children } = props;
  const [userCredentials, setUserCredentials] = useState(undefined);
  const { Provider } = authContext;

  return (
    <Provider
      value={{
        userCredentials,
        setUserCredentials
      }}
    >
      { children }
    </Provider>
  );
};

export default AuthProvider;
