import { useContext, useEffect } from 'react';
import dataBaseContext from '../context/DataBaseContext/databaseContext';

const useDataBase = () => {
  const DataBaseContext = useContext(dataBaseContext);

  return {
    DataBaseContext,
  };
};

export default useDataBase;
