import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAAG78wwd1L_4mNhGLt9w04EZtgDHn1aRk',
  authDomain: 'taylorswiftgpt-auth.firebaseapp.com',
  projectId: 'taylorswiftgpt-auth',
  storageBucket: 'taylorswiftgpt-auth.appspot.com',
  messagingSenderId: '1088945886393',
  appId: '1:1088945886393:web:ee04fb1e5965f7076cb768',
  measurementId: 'G-2YKSVWC8S8'
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export default firebaseAuth;
