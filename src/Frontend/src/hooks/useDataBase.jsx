import { useContext, useEffect } from 'react';
import dataBaseContext from '../context/DataBaseContext/databaseContext';
import { firestore } from '../config/firebase';
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';

const useDataBase = () => {
  const DataBaseContext = useContext(dataBaseContext);
  const { setSession } = DataBaseContext;
  const handleSession = async (id) => {
    const _collection = collection(firestore, 'session');
    let session = null;
    const docs = await getDocs(_collection, where('id', '==', id));
    docs.forEach(doc => {
      if (doc.id === id) {
        session = {...doc.data(), id:doc.id}
      }
    });
    setSession(session);
  };

  return {
    DataBaseContext,
    handleSession
  };
};

export default useDataBase;
