import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { Users, Award, User, History, Settings } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const DashboardPage: React.FC = () => {
  const { authState } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  // Mock game history data
  const recentGames = [
    { id: '1', date: '2025-04-10', word: 'REACT', result: 'won', attempts: 4 },
    { id: '2', date: '2025-04-09', word: 'VITES', result: 'lost', attempts: 6 },
    { id: '3', date: '2025-04-08', word: 'GAMES', result: 'won', attempts: 3 },
  ];
  
  // Mock stats
  const stats = {
    gamesPlayed: 24,
    gamesWon: 18,
    currentStreak: 3,
    maxStreak: 7,
    averageAttempts: 4.2,
  };
  
  const handleCreateRoom = () => {
    navigate('/create-room');
  };
  
  const handleJoinRoom = () => {
    navigate('/join-room');
  };
  
  const handleQuickPlay = () => {
    addNotification({
      type: 'info',
      message: 'Finding a random game for you...',
    });
    
    // Simulate finding a game
    setTimeout(() => {
      navigate('/game/ABC123');
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main content */}
        <div className="w-full md:w-2/3">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {authState.user?.name}!
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Ready for another word challenge?
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <Card className="bg-primary-50 dark:bg-primary-900 border border-primary-100 dark:border-primary-800">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Win Rate</p>
                  <p className="text-2xl font-bold">{Math.round((stats.gamesWon / stats.gamesPlayed) * 100)}%</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-secondary-50 dark:bg-secondary-900 border border-secondary-100 dark:border-secondary-800">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center mr-4">
                  <History className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Current Streak</p>
                  <p className="text-2xl font-bold">{stats.currentStreak}</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-accent-50 dark:bg-accent-900 border border-accent-100 dark:border-accent-800">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-accent-100 dark:bg-accent-800 flex items-center justify-center mr-4">
                  <Settings className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Avg. Attempts</p>
                  <p className="text-2xl font-bold">{stats.averageAttempts}</p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card title="Play Options">
              <div className="space-y-4">
                <Button onClick={handleCreateRoom} fullWidth>
                  Create Room
                </Button>
                <Button onClick={handleJoinRoom} variant="secondary" fullWidth>
                  Join Room
                </Button>
                <Button onClick={handleQuickPlay} variant="outline" fullWidth>
                  Quick Play
                </Button>
              </div>
            </Card>
            
            <Card title="Recent Games">
              <div className="space-y-3">
                {recentGames.map(game => (
                  <div
                    key={game.id}
                    className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
                  >
                    <div>
                      <p className="font-mono font-medium">{game.word}</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {new Date(game.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs mr-2 ${
                        game.result === 'won'
                          ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200'
                          : 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200'
                      }`}>
                        {game.result === 'won' ? 'WON' : 'LOST'}
                      </span>
                      <span className="text-sm">{game.attempts} tries</span>
                    </div>
                  </div>
                ))}
                <Link
                  to="/history"
                  className="block text-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm mt-4"
                >
                  View all games
                </Link>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3">
          <Card title="Friends Online">
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-success-600 dark:text-success-400">Online</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                  onClick={() => {
                    addNotification({
                      type: 'info',
                      message: 'Invitation sent to Sarah Johnson',
                    });
                  }}
                >
                  Invite
                </Button>
              </div>
              
              <div className="flex items-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                </div>
                <div>
                  <p className="font-medium">Mike Thompson</p>
                  <p className="text-sm text-success-600 dark:text-success-400">Online</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                  onClick={() => {
                    addNotification({
                      type: 'info',
                      message: 'Invitation sent to Mike Thompson',
                    });
                  }}
                >
                  Invite
                </Button>
              </div>
              
              <div className="flex items-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg opacity-60">
                <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                </div>
                <div>
                  <p className="font-medium">Jessica Lee</p>
                  <p className="text-sm text-neutral-500">Offline</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                  disabled
                >
                  Invite
                </Button>
              </div>
              
              <Link to="/friends" className="flex items-center justify-center p-3 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                <Users className="w-5 h-5 mr-2" />
                <span>Find more friends</span>
              </Link>
            </div>
          </Card>
          
          <Card title="Leaderboard" className="mt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-warning-50 dark:bg-warning-900 rounded-lg border-l-4 border-warning-500">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-warning-100 dark:bg-warning-800 flex items-center justify-center mr-3 text-warning-800 dark:text-warning-200 font-bold">
                    1
                  </div>
                  <p className="font-medium">Alex Wilson</p>
                </div>
                <p className="font-mono">48 wins</p>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border-l-4 border-neutral-400">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mr-3 text-neutral-800 dark:text-neutral-200 font-bold">
                    2
                  </div>
                  <p className="font-medium">Sarah Johnson</p>
                </div>
                <p className="font-mono">32 wins</p>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border-l-4 border-accent-500">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-800 flex items-center justify-center mr-3 text-accent-800 dark:text-accent-200 font-bold">
                    3
                  </div>
                  <p className="font-medium">You</p>
                </div>
                <p className="font-mono">18 wins</p>
              </div>
              
              <Link
                to="/leaderboard"
                className="block text-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm mt-4"
              >
                View full leaderboard
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;