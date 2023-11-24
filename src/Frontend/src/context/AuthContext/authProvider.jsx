import { useState } from 'react';
import authContext from './authContext';

const AuthProvider = (props) => {
  const { children } = props;
  const { Provider } = authContext;
  const [userCredentials, setUserCredentials] = useState(undefined);

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
