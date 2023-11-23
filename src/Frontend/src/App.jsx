import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';

import AuthProvider from './context/authProvider';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
          <Route path='/home' element={<AuthLayout />}>
            <Route index path='/home' element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
