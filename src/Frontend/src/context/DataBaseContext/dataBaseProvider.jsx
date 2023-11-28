import { useState, useReducer } from 'react';
import dataBaseContext from './databaseContext';
import dataBaseReducer from './dataBaseReducer';

const DataBaseProvider = (props) => {
  const { children } = props;
  const { Provider } = dataBaseContext;
  const initState = {
    temperature: 5,
    currentChat: null,
    session: undefined
  };
  const [state, dispatch] = useReducer(dataBaseReducer, initState);

  const setDataBaseContextState = (type, payload) => {
    console.log({type, payload});
    dispatch({ type, payload });
  };

  return (
    <Provider
      value={{
        temperature: state.temperature,
        session: state.session,
        currentChat: state.currentChat,
        setDataBaseContextState        
      }}
    >
      { children }
    </Provider>
  );
};

export default DataBaseProvider;
