import { useState, useReducer } from 'react';
import dataBaseContext from './databaseContext';
import dataBaseReducer from './dataBaseReducer';

const DataBaseProvider = (props) => {
  const { children } = props;
  const { Provider } = dataBaseContext;
  const initState = {
    loading: false,
    temperature: 5,
    currentChat: null,
    _collection: null,
    chats: undefined
  };
  const [state, dispatch] = useReducer(dataBaseReducer, initState);

  const setDataBaseContextState = (type, payload) => dispatch({ type, payload });

  return (
    <Provider
      value={{
        loading: state.loading,
        temperature: state.temperature,
        chats: state.chats,
        _collection: state._collection,
        currentChat: state.currentChat,
        setDataBaseContextState        
      }}
    >
      { children }
    </Provider>
  );
};

export default DataBaseProvider;
