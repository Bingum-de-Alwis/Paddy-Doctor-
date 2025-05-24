import React from 'react';
import { cn } from '../../utils/cn';

type CardProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
  compact?: boolean;
};

const Card: React.FC<CardProps> = ({
  className = '',
  children,
  onClick,
  hoverable = false,
  compact = false,
}) => {
  return (
    <div
      className={cn(
        'card',
        hoverable && 'transition-all hover:shadow-lg hover:-translate-y-1',
        compact ? 'p-4' : 'p-6',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => {
  return <div className={cn('mb-4', className)}>{children}</div>;
};

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => {
  return <h3 className={cn('text-xl font-semibold', className)}>{children}</h3>;
};

export const CardDescription: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => {
  return <p className={cn('text-gray-600 mt-1', className)}>{children}</p>;
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => {
  return <div className={cn('', className)}>{children}</div>;
};

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => {
  return <div className={cn('mt-4 pt-4 border-t border-gray-100', className)}>{children}</div>;
};

export default Card;