import { useState } from 'react';
import dataBaseContext from './databaseContext';

const DataBaseProvider = (props) => {
  const { children } = props;
  const { Provider } = dataBaseContext;
  const [session, setSession] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(null);

  return (
    <Provider
      value={{
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

export default DataBaseProvider;
