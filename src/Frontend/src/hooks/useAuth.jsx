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
import dataBaseContext from '../context/DataBaseContext/databaseContext';
import useDataBase from './useDataBase';

const useAuth = () => {
  const AuthContext = useContext(authContext);
  const DataBaseContext = useContext(dataBaseContext);
  const { setUserCredentials } = AuthContext;
  const { setSession, setCurrentChat } = DataBaseContext;
  const { handleSession } = useDataBase();

  const signup = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);
  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(firebaseAuth, googleProvider);
  };
  const logout = () => {
    signOut(firebaseAuth);
    setSession(undefined);
    setCurrentChat(null);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(firebaseAuth, currentUser => {
      setUserCredentials(currentUser);
      handleSession(currentUser.uid);
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
