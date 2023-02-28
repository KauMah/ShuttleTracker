import { createContext, useState } from 'react';

import AuthWrapper from '../components/AuthenticatedWrapper';
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

export const AuthProvider = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!user && <Login />}
      {user && <AuthWrapper />}
    </AuthContext.Provider>
  );
};
