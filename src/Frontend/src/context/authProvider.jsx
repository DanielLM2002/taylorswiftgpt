import { useState } from 'react';
import authContext from './authContext';

const AuthProvider = (props) => {
  const { children } = props;
  const [userCredentials, setUserCredentials] = useState(undefined);
  const [session, setSession] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(null);
  const { Provider } = authContext;

  return (
    <Provider
      value={{
        userCredentials,
        setUserCredentials,
        session,
        setSession,
        currentChat,
        setCurrentChat
      }}
    >
      { children }
    </Provider>
  );
};

export default AuthProvider;
