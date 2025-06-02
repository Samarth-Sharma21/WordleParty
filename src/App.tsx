import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PlayPage from './pages/PlayPage';
import GamePage from './pages/GamePage';
import HowToPlayPage from './pages/HowToPlayPage';
import { GameProvider } from './context/GameContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode preference
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const storedDarkMode = localStorage.getItem('darkMode');

    if (storedDarkMode !== null) {
      setIsDarkMode(storedDarkMode === 'true');
    } else {
      setIsDarkMode(prefersDarkMode);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to the document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Store preference
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <GameProvider>
      <NotificationProvider>
        <Router basename="/WordleParty">
          <div className='min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-neutral-900 dark:text-neutral-50'>
            <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <div className='flex-grow'>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/play' element={<PlayPage />} />
                <Route path='/game' element={<GamePage />} />
                <Route path='/game/:roomId' element={<GamePage />} />
                <Route path='/how-to-play' element={<HowToPlayPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </NotificationProvider>
    </GameProvider>
  );
}

export default App;
