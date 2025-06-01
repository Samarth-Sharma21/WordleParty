import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const { register, authState } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;
    
    if (!name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
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
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await register(name, email, password);
      addNotification({ type: 'success', message: 'Registration successful!' });
      navigate('/dashboard');
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Registration failed. Please try again.',
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
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            Join the word game revolution
          </p>
        </div>
        
        {authState.error && (
          <div className="bg-error-50 dark:bg-error-950 border-l-4 border-error-500 text-error-700 dark:text-error-400 p-4 mb-6 rounded-md">
            {authState.error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            placeholder="Your name"
            fullWidth
          />
          
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
          
          <Input
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            placeholder="••••••••"
            fullWidth
          />
          
          <div className="mt-6">
            <Button
              type="submit"
              fullWidth
              isLoading={authState.isLoading}
            >
              Create account
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:underline">
              Sign in
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

export default RegisterPage;