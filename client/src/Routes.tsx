import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Account from './components/account';
import { AuthContext } from './utils/AuthContext';
import Create from './components/createAlert';
import HelpPg from './components/helpPg';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import ShuttleInfo from './components/shuttleinfo';
import { useContext } from 'react';

const LocalRoutes = () => {
  const user = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={user.user ? <Home /> : <Navigate to={'/login'} />} /> */}
        <Route
          path="/"
          element={
            user.user ? (
              user.user.role === 'admin' ? (
                <Navigate to={'/shuttleinfo'} />
              ) : user.user.role == 'driver' ? (
                <Navigate to={'/account'} />
              ) : (
                <Home />
              )
            ) : (
              <Navigate to={'/login'} />
            )
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/shuttleInfo" element={<ShuttleInfo />} />
        <Route path="/home" element={<Home />} />
        <Route path="/help" element={<HelpPg />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};
export default LocalRoutes;
