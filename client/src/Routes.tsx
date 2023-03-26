import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthContext } from './utils/AuthContext';
import Home from './components/home';
import Login from './components/login';
import { useContext } from 'react';

const LocalRoutes = () => {
  const user = useContext(AuthContext);
  console.log(user.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user.user ? <Home /> : <Navigate to={'/login'} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default LocalRoutes;
