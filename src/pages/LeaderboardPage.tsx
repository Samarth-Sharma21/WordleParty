import React, { useState } from 'react';
import { Award, Users, Calendar, User, Search } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  wins: number;
  winRate: number;
  avgAttempts: number;
  isCurrentUser?: boolean;
}

const LeaderboardPage: React.FC = () => {
  const { authState } = useAuth();
  const [activeTab, setActiveTab] = useState<'global' | 'weekly' | 'friends'>(
    'global'
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for leaderboard entries
  const globalLeaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      rank: 1,
      name: 'Alex Wilson',
      wins: 48,
      winRate: 92,
      avgAttempts: 3.2,
    },
    {
      id: '2',
      rank: 2,
      name: 'Sarah Johnson',
      wins: 32,
      winRate: 88,
      avgAttempts: 3.5,
    },
    {
      id: '3',
      rank: 3,
      name: authState.user?.name || 'You',
      wins: 18,
      winRate: 75,
      avgAttempts: 4.2,
      isCurrentUser: true,
    },
    {
      id: '4',
      rank: 4,
      name: 'Mike Thompson',
      wins: 15,
      winRate: 70,
      avgAttempts: 4.5,
    },
    {
      id: '5',
      rank: 5,
      name: 'Jessica Lee',
      wins: 12,
      winRate: 65,
      avgAttempts: 4.8,
    },
    {
      id: '6',
      rank: 6,
      name: 'David Chen',
      wins: 10,
      winRate: 60,
      avgAttempts: 5.0,
    },
    {
      id: '7',
      rank: 7,
      name: 'Emma Davis',
      wins: 8,
      winRate: 55,
      avgAttempts: 5.1,
    },
    {
      id: '8',
      rank: 8,
      name: 'James Wilson',
      wins: 7,
      winRate: 50,
      avgAttempts: 5.2,
    },
    {
      id: '9',
      rank: 9,
      name: 'Olivia Martin',
      wins: 6,
      winRate: 45,
      avgAttempts: 5.3,
    },
    {
      id: '10',
      rank: 10,
      name: 'Noah Garcia',
      wins: 5,
      winRate: 40,
      avgAttempts: 5.4,
    },
  ];

  const weeklyLeaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      rank: 1,
      name: 'Sarah Johnson',
      wins: 12,
      winRate: 95,
      avgAttempts: 3.0,
    },
    {
      id: '2',
      rank: 2,
      name: 'Alex Wilson',
      wins: 10,
      winRate: 90,
      avgAttempts: 3.2,
    },
    {
      id: '3',
      rank: 3,
      name: 'Mike Thompson',
      wins: 8,
      winRate: 85,
      avgAttempts: 3.5,
    },
    {
      id: '4',
      rank: 4,
      name: 'Jessica Lee',
      wins: 7,
      winRate: 80,
      avgAttempts: 3.8,
    },
    {
      id: '5',
      rank: 5,
      name: authState.user?.name || 'You',
      wins: 6,
      winRate: 75,
      avgAttempts: 4.0,
      isCurrentUser: true,
    },
    {
      id: '6',
      rank: 6,
      name: 'David Chen',
      wins: 5,
      winRate: 70,
      avgAttempts: 4.2,
    },
    {
      id: '7',
      rank: 7,
      name: 'Emma Davis',
      wins: 4,
      winRate: 65,
      avgAttempts: 4.5,
    },
    {
      id: '8',
      rank: 8,
      name: 'James Wilson',
      wins: 3,
      winRate: 60,
      avgAttempts: 4.8,
    },
    {
      id: '9',
      rank: 9,
      name: 'Olivia Martin',
      wins: 2,
      winRate: 55,
      avgAttempts: 5.0,
    },
    {
      id: '10',
      rank: 10,
      name: 'Noah Garcia',
      wins: 1,
      winRate: 50,
      avgAttempts: 5.2,
    },
  ];

  const friendsLeaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      rank: 1,
      name: 'Sarah Johnson',
      wins: 32,
      winRate: 88,
      avgAttempts: 3.5,
    },
    {
      id: '2',
      rank: 2,
      name: authState.user?.name || 'You',
      wins: 18,
      winRate: 75,
      avgAttempts: 4.2,
      isCurrentUser: true,
    },
    {
      id: '3',
      rank: 3,
      name: 'Mike Thompson',
      wins: 15,
      winRate: 70,
      avgAttempts: 4.5,
    },
    {
      id: '4',
      rank: 4,
      name: 'Jessica Lee',
      wins: 12,
      winRate: 65,
      avgAttempts: 4.8,
    },
  ];

  const getActiveLeaderboard = () => {
    switch (activeTab) {
      case 'weekly':
        return weeklyLeaderboard;
      case 'friends':
        return friendsLeaderboard;
      case 'global':
      default:
        return globalLeaderboard;
    }
  };

  const filteredLeaderboard = getActiveLeaderboard().filter((entry) =>
    entry.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='min-h-screen flex flex-col bg-background-light dark:bg-background-dark'>
      <div className='container mx-auto px-4 py-8 flex-grow'>
        <div className='max-w-4xl mx-auto'>
          <div className='mb-8 text-center'>
            <h1 className='text-3xl font-bold mb-2'>Leaderboard</h1>
            <p className='text-neutral-600 dark:text-neutral-400'>
              See how you rank against other WordleParty players
            </p>
          </div>

          <div className='mb-6'>
            <div className='flex flex-col sm:flex-row gap-4 mb-6'>
              <div className='flex-grow'>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Search className='h-5 w-5 text-neutral-400' />
                  </div>
                  <input
                    type='text'
                    className='input pl-10 w-full'
                    placeholder='Search players...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className='flex rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700'>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'global'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                  }`}
                  onClick={() => setActiveTab('global')}>
                  <Award className='w-4 h-4 inline-block mr-1' />
                  Global
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'weekly'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                  }`}
                  onClick={() => setActiveTab('weekly')}>
                  <Calendar className='w-4 h-4 inline-block mr-1' />
                  Weekly
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'friends'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                  }`}
                  onClick={() => setActiveTab('friends')}>
                  <Users className='w-4 h-4 inline-block mr-1' />
                  Friends
                </button>
              </div>
            </div>

            <Card>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-neutral-200 dark:border-neutral-700'>
                      <th className='px-4 py-3 text-left text-sm font-medium text-neutral-500 dark:text-neutral-400'>
                        Rank
                      </th>
                      <th className='px-4 py-3 text-left text-sm font-medium text-neutral-500 dark:text-neutral-400'>
                        Player
                      </th>
                      <th className='px-4 py-3 text-right text-sm font-medium text-neutral-500 dark:text-neutral-400'>
                        Wins
                      </th>
                      <th className='px-4 py-3 text-right text-sm font-medium text-neutral-500 dark:text-neutral-400'>
                        Win Rate
                      </th>
                      <th className='px-4 py-3 text-right text-sm font-medium text-neutral-500 dark:text-neutral-400'>
                        Avg. Attempts
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeaderboard.length > 0 ? (
                      filteredLeaderboard.map((entry) => (
                        <tr
                          key={entry.id}
                          className={`border-b border-neutral-200 dark:border-neutral-700 ${
                            entry.isCurrentUser
                              ? 'bg-primary-50 dark:bg-primary-900/20'
                              : ''
                          }`}>
                          <td className='px-4 py-4'>
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                              ${
                                entry.rank === 1
                                  ? 'bg-warning-100 dark:bg-warning-900 text-warning-800 dark:text-warning-200'
                                  : entry.rank === 2
                                  ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                                  : entry.rank === 3
                                  ? 'bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200'
                                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                              }`}>
                              {entry.rank}
                            </div>
                          </td>
                          <td className='px-4 py-4'>
                            <div className='flex items-center'>
                              <div className='w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center mr-3'>
                                <User className='w-4 h-4 text-primary-600 dark:text-primary-400' />
                              </div>
                              <span
                                className={`font-medium ${
                                  entry.isCurrentUser
                                    ? 'text-primary-600 dark:text-primary-400'
                                    : ''
                                }`}>
                                {entry.name}
                                {entry.isCurrentUser && (
                                  <span className='ml-2 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-0.5 rounded-full'>
                                    You
                                  </span>
                                )}
                              </span>
                            </div>
                          </td>
                          <td className='px-4 py-4 text-right font-medium'>
                            {entry.wins}
                          </td>
                          <td className='px-4 py-4 text-right font-medium'>
                            {entry.winRate}%
                          </td>
                          <td className='px-4 py-4 text-right font-medium'>
                            {entry.avgAttempts.toFixed(1)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className='px-4 py-8 text-center text-neutral-500 dark:text-neutral-400'>
                          No players found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {activeTab === 'global' && (
            <div className='bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 mb-8'>
              <h3 className='font-medium mb-2'>How Rankings Work</h3>
              <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                Global rankings are calculated based on total wins, win rate,
                and average number of attempts. Players must have completed at
                least 10 games to be eligible for the leaderboard.
              </p>
            </div>
          )}

          {activeTab === 'weekly' && (
            <div className='bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 mb-8'>
              <h3 className='font-medium mb-2'>Weekly Competition</h3>
              <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                Weekly rankings reset every Monday at 00:00 UTC. Compete against
                others to earn special badges and rewards! Current week: April 8
                - April 14, 2025
              </p>
            </div>
          )}

          {activeTab === 'friends' && !authState.isAuthenticated && (
            <div className='bg-primary-50 dark:bg-primary-900 border-l-4 border-primary-500 p-4 rounded-md mb-8'>
              <p className='text-primary-700 dark:text-primary-300'>
                Sign in to see how you rank against your friends and add new
                friends to your network.
              </p>
            </div>
          )}

          {activeTab === 'friends' &&
            authState.isAuthenticated &&
            filteredLeaderboard.length < 5 && (
              <div className='text-center mb-8'>
                <Button variant='outline' size='sm'>
                  <Users className='w-4 h-4 mr-2' />
                  Find More Friends
                </Button>
              </div>
            )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LeaderboardPage;
