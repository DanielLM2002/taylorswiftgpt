import { useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup 
} from 'firebase/auth';

import { firebaseAuth } from '../config/firebase';
import authContext from '../context/AuthContext/authContext';
import dataBaseContext from '../context/DataBaseContext/dataBaseContext';
import useDataBase from './useDataBase';

import { 
  CHATS,
  CURRENT_CHAT,
  USER_CREDENTIALS 
} from '../types';

const useAuth = () => {
  const AuthContext = useContext(authContext);
  const DataBaseContext = useContext(dataBaseContext);
  const { userCredentials, setAuthContextState } = AuthContext;
  const { setDataBaseContextState } = DataBaseContext;
  const { handleChats } = useDataBase();

  const signup = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);
  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(firebaseAuth, googleProvider);
  };
  const logout = () => {
    signOut(firebaseAuth);
    setDataBaseContextState(CHATS, undefined);
    setDataBaseContextState(CURRENT_CHAT, null);
    document.title = 'TaylorSwiftGPT';
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(firebaseAuth, currentUser => {
      setAuthContextState(USER_CREDENTIALS, currentUser);
      if (!userCredentials || userCredentials === undefined) {
        handleChats(currentUser.uid);
      }
    });
    return () => unSubscribe();
  }, []);

  return { 
    AuthContext,
    signup,
    login,
    loginWithGoogle,
    logout 
  };
};

export default useAuth;
