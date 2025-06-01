import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Footer from '../components/layout/Footer';
import { Monitor, Smartphone, Users, Zap, Code, Award } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      {/* Hero Section */}
      <section className='py-16 md:py-24 bg-gradient-to-b from-white to-primary-50 dark:from-neutral-900 dark:to-primary-950'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col lg:flex-row items-center'>
            <div className='lg:w-1/2 lg:pr-12 mb-10 lg:mb-0'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in'>
                The Ultimate{' '}
                <span className='text-primary-600'>Multiplayer</span> Word Game
              </h1>
              <p
                className='text-lg text-neutral-600 dark:text-neutral-300 mb-8 animate-fade-in'
                style={{ animationDelay: '0.1s' }}>
                Challenge your friends in real-time word-guessing battles.
                Create rooms, share with friends, and see who has the best
                vocabulary!
              </p>
              <div
                className='flex flex-col sm:flex-row gap-4 animate-fade-in'
                style={{ animationDelay: '0.2s' }}>
                <Link to='/play'>
                  <Button variant='primary' size='lg'>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
            <div
              className='lg:w-1/2 animate-fade-in'
              style={{ animationDelay: '0.3s' }}>
              <div className='relative'>
                <div className='absolute -top-4 -left-4 w-64 h-64 bg-accent-400 rounded-full opacity-20 animate-float'></div>
                <div
                  className='absolute bottom-8 right-8 w-40 h-40 bg-secondary-400 rounded-full opacity-20 animate-float'
                  style={{ animationDelay: '1.5s' }}></div>

                {/* Game board illustration */}
                <div className='relative z-10 bg-white dark:bg-neutral-800 rounded-xl shadow-medium p-6 md:p-8'>
                  <div className='grid grid-cols-5 gap-2 mb-4'>
                    {['W', 'O', 'R', 'D', 'S'].map((letter, i) => (
                      <div
                        key={i}
                        className={`letter-tile ${
                          i % 2 === 0 ? 'letter-correct' : 'letter-present'
                        }`}>
                        {letter}
                      </div>
                    ))}
                  </div>
                  <div className='grid grid-cols-5 gap-2 mb-4'>
                    {['G', 'A', 'M', 'E', 'S'].map((letter, i) => (
                      <div
                        key={i}
                        className={`letter-tile ${
                          i % 2 !== 0 ? 'letter-correct' : 'letter-pending'
                        }`}>
                        {letter}
                      </div>
                    ))}
                  </div>
                  <div className='grid grid-cols-5 gap-2'>
                    {['P', 'L', 'A', 'Y', 'S'].map((letter, i) => (
                      <div key={i} className='letter-tile letter-pending'>
                        {letter}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 bg-white dark:bg-neutral-900'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Game Features
            </h2>
            <p className='text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto'>
              Everything you love about word games, now with multiplayer fun!
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='card text-center'>
              <div className='bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Users className='w-8 h-8 text-primary-600 dark:text-primary-400' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Multiplayer Rooms</h3>
              <p className='text-neutral-600 dark:text-neutral-400'>
                Create private game rooms and invite 2-3 friends to join the
                word-guessing fun.
              </p>
            </div>

            <div className='card text-center'>
              <div className='bg-secondary-100 dark:bg-secondary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Zap className='w-8 h-8 text-secondary-600 dark:text-secondary-400' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Real-Time Play</h3>
              <p className='text-neutral-600 dark:text-neutral-400'>
                See your friends' guesses as they happen and compete to solve
                the word first.
              </p>
            </div>

            <div className='card text-center'>
              <div className='bg-accent-100 dark:bg-accent-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Code className='w-8 h-8 text-accent-600 dark:text-accent-400' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Custom Games</h3>
              <p className='text-neutral-600 dark:text-neutral-400'>
                Choose different word lengths and challenge levels for varied
                gameplay.
              </p>
            </div>

            <div className='card text-center'>
              <div className='bg-success-100 dark:bg-success-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Award className='w-8 h-8 text-success-600 dark:text-success-400' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Competitive Play</h3>
              <p className='text-neutral-600 dark:text-neutral-400'>
                Track your stats and climb the leaderboards to become the
                ultimate word master.
              </p>
            </div>

            <div className='card text-center'>
              <div className='bg-warning-100 dark:bg-warning-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Smartphone className='w-8 h-8 text-warning-600 dark:text-warning-400' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Mobile Friendly</h3>
              <p className='text-neutral-600 dark:text-neutral-400'>
                Play anywhere on any device with our responsive design that
                works perfectly on mobile.
              </p>
            </div>

            <div className='card text-center'>
              <div className='bg-error-100 dark:bg-error-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Monitor className='w-8 h-8 text-error-600 dark:text-error-400' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Guest Play</h3>
              <p className='text-neutral-600 dark:text-neutral-400'>
                Jump straight into games without signing up, perfect for quick
                matches with friends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 md:py-24 bg-primary-600 text-white'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>
            Ready to Challenge Your Friends?
          </h2>
          <p className='text-xl mb-8 opacity-90 max-w-2xl mx-auto'>
            Create a game room in seconds and share it with your friends to
            start playing!
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Link to='/play'>
              <Button variant='accent' size='lg' className='min-w-[200px]'>
                Start Playing Now
              </Button>
            </Link>
            <Link to='/how-to-play'>
              <Button
                variant='outline'
                size='lg'
                className='min-w-[200px] border-white text-white hover:bg-white hover:bg-opacity-20'>
                How to Play
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
