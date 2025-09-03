import classNames from 'classnames';
import { forwardRef, type TextareaHTMLAttributes } from 'react';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  id?: string;
  className?: string;
  containerClassName?: string;
  requiredLabel?: boolean;
  error?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, id, className, containerClassName, requiredLabel, error, ...rest },
    ref
  ) => {
    const containerClass = classNames(
      'flex flex-col gap-2',
      containerClassName,
      {}
    );
    const textareaClass = classNames(
      'ring-1 ring-gray-400 p-2 rounded outline-blue-300',
      className,
      {}
    );

    return (
      <div className={containerClass}>
        <label htmlFor={id} className='font-semibold'>
          {label}
          {requiredLabel && <span className='text-red-700'>*</span>}
        </label>

        <textarea id={id} ref={ref} className={textareaClass} {...rest} />

        {error && <div className='text-red-500'>{error}</div>}
      </div>
    );
  }
);

export default Textarea;
