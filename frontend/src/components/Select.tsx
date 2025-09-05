import classNames from 'classnames';
import { forwardRef, type SelectHTMLAttributes } from 'react';

export type OptionListProp = { value: string; label: string };

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  id?: string;
  className?: string;
  containerClassname?: string;
  defaultValue: string;
  optionList: OptionListProp[];
  requiredLabel?: boolean;
  error?: string;
  optionLabel?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      id,
      className,
      containerClassname,
      defaultValue,
      optionList,
      requiredLabel,
      error,
      optionLabel,
      ...props
    },
    ref
  ) => {
    const containerClass = classNames(
      'flex flex-col gap-2 flex-1',
      containerClassname,
      {}
    );
    const selectClass = classNames(
      'select ring-1 ring-gray-400 p-2 rounded outline-blue-300',
      className,
      {}
    );
    return (
      <div className={containerClass}>
        {label && (
          <label htmlFor={id} className='font-semibold'>
            {label}
            {requiredLabel && <span className='text-red-700'>*</span>}
          </label>
        )}
        <select
          id={id}
          ref={ref}
          className={selectClass}
          defaultValue={defaultValue}
          {...props}
        >
          <option value=''>{optionLabel ?? 'Please select one value'}</option>
          {optionList.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        {error && <div className='text-red-500'>{error}</div>}
      </div>
    );
  }
);

export default Select;
