import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  
  const { login, authState } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;
    
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(email, password);
      addNotification({ type: 'success', message: 'Login successful!' });
      navigate('/dashboard');
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Login failed. Please check your credentials and try again.',
      });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <div className="bg-primary-600 text-white w-10 h-10 rounded-md flex items-center justify-center font-bold mr-2">
              W
            </div>
            <span className="text-2xl font-semibold">WordleParty</span>
          </Link>
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            Play with friends and track your progress
          </p>
        </div>
        
        {authState.error && (
          <div className="bg-error-50 dark:bg-error-950 border-l-4 border-error-500 text-error-700 dark:text-error-400 p-4 mb-6 rounded-md">
            {authState.error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="your.email@example.com"
            fullWidth
          />
          
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="••••••••"
            fullWidth
          />
          
          <div className="mt-6">
            <Button
              type="submit"
              fullWidth
              isLoading={authState.isLoading}
            >
              Sign in
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <Button
            variant="ghost"
            onClick={() => navigate('/play')}
            fullWidth
          >
            Continue without account
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;