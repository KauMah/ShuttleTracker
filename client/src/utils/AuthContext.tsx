import { ReactNode, createContext, useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

import _ from 'lodash';
import { api } from './api';

export interface User {
  name: string;
  email: string;
  id: string;
  role: string;
  access_token: string;
}

interface AuthType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
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
    if (storedUser) {
      const usr = JSON.parse(storedUser);
      console.log(1, usr);
      api.defaults.headers.common.Authorization = `Bearer ${_.get(usr, 'access_token', '')}`;
    }
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    // if (!user) {
    //   navigate('/login');
    // } else {
    //   navigate('/home');
    // }
  }, []);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
