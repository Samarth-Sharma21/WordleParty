import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Check, Info, Users, AlertTriangle } from 'lucide-react';

const HowToPlayPage: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='container mx-auto px-4 py-12 flex-grow'>
        <div className='max-w-3xl mx-auto'>
          <h1 className='text-4xl font-bold mb-8'>How to Play</h1>

          <div className='space-y-12'>
            <section>
              <h2 className='text-2xl font-semibold mb-4 flex items-center'>
                <Info className='w-6 h-6 text-primary-600 mr-2' />
                Game Overview
              </h2>
              <div className='space-y-4'>
                <p className='text-neutral-700 dark:text-neutral-300'>
                  WordleParty is a multiplayer word guessing game where you and
                  your friends try to guess a hidden word in as few attempts as
                  possible.
                </p>
                <p className='text-neutral-700 dark:text-neutral-300'>
                  Each player takes turns guessing a 5-letter word (or 4 or 6
                  letters, depending on the settings). After each guess, the
                  letters will be colored to show how close you are to the
                  target word.
                </p>
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-semibold mb-4 flex items-center'>
                <Check className='w-6 h-6 text-success-600 mr-2' />
                Game Rules
              </h2>
              <div className='space-y-4'>
                <div className='bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6'>
                  <h3 className='font-semibold text-lg mb-3'>Letter Colors</h3>
                  <div className='space-y-3'>
                    <div className='flex items-center'>
                      <div className='letter-tile letter-correct mr-4'>A</div>
                      <p>
                        Green: The letter is in the word and in the correct
                        position.
                      </p>
                    </div>
                    <div className='flex items-center'>
                      <div className='letter-tile letter-present mr-4'>B</div>
                      <p>
                        Yellow: The letter is in the word but in the wrong
                        position.
                      </p>
                    </div>
                    <div className='flex items-center'>
                      <div className='letter-tile letter-absent mr-4'>C</div>
                      <p>Gray: The letter is not in the word.</p>
                    </div>
                  </div>
                </div>

                <p className='text-neutral-700 dark:text-neutral-300'>
                  You have 6 attempts to guess the word. The word is the same
                  for all players in the room, and everyone can see each other's
                  guesses.
                </p>

                <p className='text-neutral-700 dark:text-neutral-300'>
                  The first player to guess the word correctly wins the game!
                </p>
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-semibold mb-4 flex items-center'>
                <Users className='w-6 h-6 text-secondary-600 mr-2' />
                Multiplayer Features
              </h2>
              <div className='space-y-4'>
                <p className='text-neutral-700 dark:text-neutral-300'>
                  WordleParty supports up to 5 players in a single game room.
                  Each player takes turns guessing the word.
                </p>

                <div className='bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6'>
                  <h3 className='font-semibold text-lg mb-3'>Room Creation</h3>
                  <ol className='list-decimal pl-6 space-y-2'>
                    <li>Click "Create Room" on the play page</li>
                    <li>Set your preferences (word length, max players)</li>
                    <li>Share the 6-character room code with friends</li>
                    <li>Wait for players to join</li>
                    <li>
                      The game starts automatically when all players have joined
                    </li>
                  </ol>
                </div>

                <div className='bg-white dark:bg-neutral-800 rounded-xl shadow-soft p-6'>
                  <h3 className='font-semibold text-lg mb-3'>Joining a Room</h3>
                  <ol className='list-decimal pl-6 space-y-2'>
                    <li>Click "Join Room" on the play page</li>
                    <li>Enter the 6-character room code shared by the host</li>
                    <li>Enter your name</li>
                    <li>Join the game and start playing!</li>
                  </ol>
                </div>
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-semibold mb-4 flex items-center'>
                <AlertTriangle className='w-6 h-6 text-warning-600 mr-2' />
                Tips & Strategies
              </h2>
              <div className='space-y-4'>
                <p className='text-neutral-700 dark:text-neutral-300'>
                  Here are some strategies to help you become a WordleParty
                  master:
                </p>

                <ul className='list-disc pl-6 space-y-2 text-neutral-700 dark:text-neutral-300'>
                  <li>
                    Start with words that contain common vowels (A, E, I, O, U)
                    and frequent consonants (S, T, R, N, L).
                  </li>
                  <li>
                    Pay attention to your opponents' guesses and their letter
                    feedback.
                  </li>
                  <li>
                    Eliminate letters methodically based on the feedback you
                    receive.
                  </li>
                  <li>
                    Remember that there can be duplicate letters in a word.
                  </li>
                  <li>
                    Use the keyboard color hints to avoid reusing letters that
                    aren't in the word.
                  </li>
                </ul>
              </div>
            </section>

            <div className='flex justify-center pt-6'>
              <Link to='/play'>
                <Button size='lg'>Start Playing Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlayPage;
