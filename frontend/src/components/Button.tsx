import classNames from 'classnames';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', ...rest }, ref) => {
    const btnClasses = classNames(
      'text-white rounded px-4 py-2 cursor-pointer',
      className,
      {
        'bg-blue-600 hover:bg-blue-700': variant === 'primary',
        'bg-gray-900 hover:bg-gray-800': variant === 'secondary',
      }
    );
    return (
      <button className={btnClasses} ref={ref} {...rest}>
        {children}
      </button>
    );
  }
);

export default Button;
