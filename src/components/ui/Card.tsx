import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  titleClassName = '',
  contentClassName = '',
}) => {
  return (
    <div className={`card ${className}`}>
      {title && (
        <h2 className={`text-xl font-semibold mb-4 ${titleClassName}`}>{title}</h2>
      )}
      <div className={contentClassName}>{children}</div>
    </div>
  );
};

export default Card;