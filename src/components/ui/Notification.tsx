import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Notification as NotificationType } from '../../types';
import { useNotification } from '../../context/NotificationContext';

interface NotificationProps {
  notification: NotificationType;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const { removeNotification } = useNotification();
  
  const { id, message, type } = notification;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(id);
    }, notification.duration || 5000);
    
    return () => clearTimeout(timer);
  }, [id, notification.duration, removeNotification]);
  
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success-500" />,
    info: <Info className="w-5 h-5 text-primary-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-warning-500" />,
    error: <AlertCircle className="w-5 h-5 text-error-500" />,
  };
  
  const bgColors = {
    success: 'bg-success-50 dark:bg-success-950 border-l-4 border-success-500',
    info: 'bg-primary-50 dark:bg-primary-950 border-l-4 border-primary-500',
    warning: 'bg-warning-50 dark:bg-warning-950 border-l-4 border-warning-500',
    error: 'bg-error-50 dark:bg-error-950 border-l-4 border-error-500',
  };
  
  return (
    <div
      className={`rounded-md shadow-medium py-3 px-4 flex items-start animate-slide-up mb-2 ${bgColors[type]}`}
    >
      <div className="flex-shrink-0 mr-3 pt-0.5">{icons[type]}</div>
      <div className="flex-1 text-sm">
        <p className="font-medium text-neutral-900 dark:text-neutral-50">{message}</p>
      </div>
      <button
        onClick={() => removeNotification(id)}
        className="ml-4 flex-shrink-0 text-neutral-400 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-neutral-400"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

const NotificationContainer: React.FC = () => {
  const { notifications } = useNotification();
  
  if (notifications.length === 0) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-sm space-y-2">
      {notifications.map(notification => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationContainer;