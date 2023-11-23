import { useContext } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import firebaseAuth from '../config/firebase';
import authContext from '../context/authContext';

const useAuth = () => {
  const AuthContext = useContext(authContext);

  const signup = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password);

  const login = () => {
    try {
      
    } catch (exception) {
      console.log(exception);
    }
  };

  return { 
    AuthContext,
    signup,
    login 
  };
};

export default useAuth;
