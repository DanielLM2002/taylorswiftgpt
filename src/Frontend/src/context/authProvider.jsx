import { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

const AuthProvider = (props) => {
  const { children } = props;
  const initialState = {};
  const { Provider } = authContext;
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setAuthContextState = (type, payload) => {
    dispatch({ type, payload });
  };

  return (
    <Provider
      value={{
        setAuthContextState
      }}
    >
      { children }
    </Provider>
  );
};

export default AuthProvider;
