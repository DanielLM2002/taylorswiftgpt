import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './layouts/Layout';

import AuthProvider from './context/authProvider';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/home' element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
