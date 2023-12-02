import { useState, useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

const AuthProvider = (props) => {
  const { children } = props;
  const { Provider } = authContext;
  const initState = { userCredentials: undefined };
  const [state, dispatch] = useReducer(authReducer, initState);

  const setAuthContextState = (type, payload) => dispatch({ type, payload });

  return (
    <Provider
      value={{
        userCredentials: state.userCredentials,
        setAuthContextState
      }}
    >
      { children }
    </Provider>
  );
};

export default AuthProvider;
