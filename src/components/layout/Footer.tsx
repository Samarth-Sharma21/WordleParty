import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-neutral-900 py-6 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              © 2025 WordleParty. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 transition-colors duration-200"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;