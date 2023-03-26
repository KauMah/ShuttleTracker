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

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Login />,
//   },
//   {
//     path: '/help',
//     element: <HelpPg />,
//   },
// ]);

export const AuthProvider = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  //maybe isnt needed??????
  useEffect(() => {
    if (!user) {
      console.log('www');
      redirect('/');
    } else {
      console.log('lllll');
      redirect('/help');
    }
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!user && <Login />}
      {user && <AuthWrapper />}
    </AuthContext.Provider>
  );
};
