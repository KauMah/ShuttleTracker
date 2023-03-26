import { ReactNode, createContext, useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';

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

interface AuthProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  //maybe isnt needed??????
  useEffect(() => {
    if (!user) {
      redirect('/login');
    } else {
      redirect('/help');
    }
  }, [user]);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
