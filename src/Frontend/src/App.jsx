import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';

import AuthProvider from './context/AuthContext/authProvider';
import DataBaseProvider from './context/DataBaseContext/dataBaseProvider';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataBaseProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Route>
            <Route path='/' element={<AuthLayout />}>
              <Route index path='/' element={<Navigate to='/taylorswift.ai' />} />
              <Route index path='/taylorswift.ai' element={<Home />} />
            </Route>
          </Routes>
        </DataBaseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
