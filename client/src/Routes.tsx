import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthContext } from './utils/AuthContext';
import HelpPg from './components/helpPg';
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
        {/* <Route path="shuttleInfo" element={<shuttleInfo />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/help" element={<HelpPg />} />
        {/* <Route path="/account" element={<Account />} />
        <Route path='/logout' element= {<Logout />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
export default LocalRoutes;
