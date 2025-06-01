import React from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='bg-white dark:bg-neutral-900 py-4 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between'>
          {/* Logo and main nav */}
          <div className='flex items-center'>
            <Link to='/' className='flex items-center'>
              <div className='bg-primary-600 text-white w-8 h-8 rounded-md flex items-center justify-center font-bold mr-2'>
                W
              </div>
              <span className='text-xl font-semibold'>WordleParty</span>
            </Link>

            {/* Desktop Nav */}
            <nav className='hidden md:flex ml-8 space-x-6'>
              <Link
                to='/play'
                className='text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400'>
                Play
              </Link>
              <Link
                to='/how-to-play'
                className='text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400'>
                How to Play
              </Link>
              <Link
                to='/leaderboard'
                className='text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400'>
                Leaderboard
              </Link>
            </nav>
          </div>

          {/* User actions */}
          <div className='flex items-center space-x-4'>
            <button
              onClick={toggleDarkMode}
              className='p-2 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors duration-200'
              aria-label={
                isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
              }>
              {isDarkMode ? (
                <Sun className='w-5 h-5' />
              ) : (
                <Moon className='w-5 h-5' />
              )}
            </button>

            <Link to='/play' className='hidden md:block'>
              <Button variant='primary' size='sm'>
                Get Started
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className='md:hidden p-2 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
              aria-label='Toggle menu'>
              {isMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className='md:hidden mt-4 py-4 border-t border-neutral-200 dark:border-neutral-800 animate-fade-in'>
            <nav className='flex flex-col space-y-4'>
              <Link
                to='/play'
                className='text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400'
                onClick={() => setIsMenuOpen(false)}>
                Play
              </Link>
              <Link
                to='/how-to-play'
                className='text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400'
                onClick={() => setIsMenuOpen(false)}>
                How to Play
              </Link>
              <Link
                to='/leaderboard'
                className='text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400'
                onClick={() => setIsMenuOpen(false)}>
                Leaderboard
              </Link>

              <div className='pt-2 border-t border-neutral-200 dark:border-neutral-800'>
                <Link
                  to='/play'
                  className='btn btn-primary justify-start'
                  onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;