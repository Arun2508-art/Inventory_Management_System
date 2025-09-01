import type { SelectHTMLAttributes } from 'react';

export type OptionListProp = { value: string; label: string };

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  id: string;
  defaultValue: string;
  optionList: OptionListProp[];
  required?: boolean;
}

const Select = ({
  label,
  name,
  id,
  defaultValue,
  optionList,
  required,
  ...props
}: SelectProps) => {
  return (
    <div className='flex flex-col gap-2 flex-1'>
      {label && (
        <label htmlFor={id} className='font-semibold'>
          {label}
          {required && <span className='text-red-700'>*</span>}
        </label>
      )}
      <select
        name={name}
        id={id}
        className='ring-1 ring-gray-400 p-2 rounded outline-blue-300'
        defaultValue={defaultValue}
        {...props}
      >
        {optionList.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
