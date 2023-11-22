import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './layouts/Layout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
