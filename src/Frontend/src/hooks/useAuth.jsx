import { useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup 
} from 'firebase/auth';

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

import { firebaseAuth, firestore } from '../config/firebase';
import authContext from '../context/authContext';

const useAuth = () => {
  const AuthContext = useContext(authContext);
  const { setUserCredentials, setSession, setCurrentChat } = AuthContext;

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
