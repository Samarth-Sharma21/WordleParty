import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { AuthState } from '../types';

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  quickLogin: (displayName: string) => void;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simple fake authentication - any email/password combination works
      const user = {
        id: Math.random().toString(36).substring(2, 10),
        email,
        name: email.split('@')[0], // Use email prefix as name
      };

      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Login failed. Please try again.',
      }));
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simple fake registration - any details work
      const user = {
        id: Math.random().toString(36).substring(2, 10),
        email,
        name,
      };

      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Registration failed. Please try again.',
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  // Quick login function for demo purposes
  const quickLogin = (displayName: string) => {
    const user = {
      id: Math.random().toString(36).substring(2, 10),
      email: `${displayName.toLowerCase().replace(/\s+/g, '')}@demo.com`,
      name: displayName,
    };

    localStorage.setItem('user', JSON.stringify(user));
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, login, register, logout, quickLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
