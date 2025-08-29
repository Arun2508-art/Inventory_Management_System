export interface CheckboxProps {
  id?: string;
  label?: string;
  checked?: boolean;
  onChange?: () => void;
}

const Checkbox = ({ id, checked, onChange }: CheckboxProps) => {
  return (
    <input type='checkbox' id={id} checked={checked} onChange={onChange} />
  );
};

export default Checkbox;
