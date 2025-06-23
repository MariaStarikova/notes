import { createContext, useContext, useState, type ReactNode, type FC } from 'react';

export interface User {
  email: string;
  password: string;
}

type Callback = () => void;

interface AuthContextValue {
  user: User | null;
  signin: (i: User, c: Callback) => void;
  signout: (c: Callback) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signin = (newUser: User, callback: Callback) => {
    setUser(newUser);
    callback();
  };

  const signout = (callback: Callback) => {
    setUser(null);
    callback();
  };

  const value = {
    user,
    signin,
    signout
  } as AuthContextValue;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
