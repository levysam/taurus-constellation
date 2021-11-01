import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  groupIds: string[];
}

interface AuthData {
  token: string;
  user: User;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: Credentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({
  children,
}) => {
  const [data, setData] = useState<AuthData>(() => {
    const token = localStorage.getItem('@TaurusConstellation:token');
    const user = localStorage.getItem('@TaurusConstellation:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthData;
  });

  /**
   * Sign in.
   */
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/session', {
      email,
      password,
    });
    const { token, user } = response.data;

    localStorage.setItem('@TaurusConstellation:token', token);
    localStorage.setItem('@TaurusConstellation:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      token,
      user,
    });
  }, []);

  /**
   * Sign out.
   */
  const signOut = useCallback(() => {
    localStorage.removeItem('@TaurusConstellation:token');
    localStorage.removeItem('@TaurusConstellation:user');

    setData({} as AuthData);
  }, []);

  /**
   * Update user.
   */
  const updateUser = useCallback((user: User) => {
    localStorage.setItem('@TaurusConstellation:user', JSON.stringify(user));

    setData({
      token: data.token,
      user,
    });
  }, [setData, data.token]);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider.');
  }

  return context;
};
