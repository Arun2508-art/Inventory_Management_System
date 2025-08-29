export type OptionListProp = { value: string; label: string };

export interface SelectProps {
  name: string;
  id: string;
  defaultValue: string;
  optionList: OptionListProp[];
}

const Select = ({ name, id, defaultValue, optionList }: SelectProps) => {
  return (
    <select
      name={name}
      id={id}
      className='ring-1 ring-gray-200 p-2 rounded-md'
      defaultValue={defaultValue}
    >
      {optionList.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
