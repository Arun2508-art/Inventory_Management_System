import classNames from 'classnames';
import type { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant: 'active' | 'inActive';
}

const Badge = ({ children, className, variant = 'active' }: BadgeProps) => {
  const customClass = classNames(
    'p-1 text-center text-sm font-semibold rounded-md',
    className,
    {
      'bg-blue-500 text-white': variant === 'active',
      'bg-gray-500 text-white': variant === 'inActive',
    }
  );

  return <div className={customClass}>{children}</div>;
};

export default Badge;
