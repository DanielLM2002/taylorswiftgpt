import { useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';

import firebaseAuth from '../config/firebase';
import authContext from '../context/authContext';

const useAuth = () => {
  const AuthContext = useContext(authContext);
  const { setUserCredentials } = AuthContext;

  const signup = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password);

  const login = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);

  const logout = () => signOut(firebaseAuth);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(firebaseAuth, currentUser => setUserCredentials(currentUser));
    return () => unSubscribe();
  }, []);

  return { 
    AuthContext,
    signup,
    login,
    logout 
  };
};

export default useAuth;
