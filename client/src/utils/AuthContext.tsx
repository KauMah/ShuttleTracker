import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';

import AuthWrapper from '../components/AuthenticatedWrapper';
import HelpPg from '../components/helpPg';
import Login from '../components/login';

export interface User {
  name: string;
  email: string;
  id: string;
  role: string;
  access_token: string;
}

interface AuthType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const AuthContext = createContext<AuthType>({
  user: null,
  setUser: () => {},
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HelpPg />,
  },
  {
    path: '/home',
    element: <HelpPg />,
  },
  {
    path: '/login',
    element: <HelpPg />,
  },
]);

export const AuthProvider = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    console.log('eeee');
    if (!user) {
      redirect('/login');
    } else {
      redirect('/home');
    }
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />;
    </AuthContext.Provider>
  );
};
