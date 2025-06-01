import React from 'react';

interface GameHeaderProps {
  onBack: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ onBack }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>
      
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Wordle Party</h1>
      
      <div className="w-20">{
        /* Empty div for flex spacing */
      }</div>
    </div>
  );
};

export default GameHeader;