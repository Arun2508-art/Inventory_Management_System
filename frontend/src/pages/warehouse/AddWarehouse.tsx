import { type ChangeEvent, type FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { addWarehouse } from '../../store/slice/warehouseSlice';
import { useAppDispatch } from '../../utills/reduxHook';
import type { OnSuccessHandlerProps, warehouseProps } from '../../utills/types';

const statusData = [
  { value: '', label: 'Please Select status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'In Active' },
];

const AddWarehouse = ({ onSuccess }: OnSuccessHandlerProps) => {
  const [form, setForm] = useState<Omit<warehouseProps, '_id'>>({
    name: '',
    contactPerson: '',
    sku: '',
    location: '',
    status: 'active',
    description: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.sku) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await dispatch(addWarehouse(form));
      if (addWarehouse.fulfilled.match(result)) {
        onSuccess();
        toast.success('Warehouse added successfully');
        setForm({
          name: '',
          contactPerson: '',
          sku: '',
          location: '',
          status: 'active',
          description: '',
        });
      }
    } catch (err) {
      setError('Error adding Warehouse. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id='name'
        className='mb-4'
        name='name'
        label='Name'
        placeholder='Name'
        value={form.name}
        onChange={handleChange}
        required
      />
      <Input
        id='contactPerson'
        className='mb-4'
        name='contactPerson'
        label='Contact Person'
        placeholder='Contact Person'
        value={form.contactPerson}
        onChange={handleChange}
        required
      />
      <Input
        id='sku'
        className='mb-4'
        label='SKU'
        name='sku'
        placeholder='SKU'
        value={form.sku}
        onChange={handleChange}
        required
      />
      <Input
        id='location'
        className='mb-4'
        name='location'
        label='Location'
        placeholder='location'
        value={form.location}
        onChange={handleChange}
        required
      />
      <Select
        name='status'
        className='mb-4'
        id='status'
        label='Status'
        defaultValue='active'
        optionList={statusData}
        required
      />
      <div className='flex flex-col gap-2 mb-4'>
        <label htmlFor='description' className='font-semibold'>
          Description
        </label>

        <textarea
          id='description'
          name='description'
          placeholder='Description'
          className='ring-1 ring-gray-400 p-2 rounded outline-blue-300'
          value={form.description}
          onChange={handleChange}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
        type='submit'
        disabled={loading}
        className='bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer'
      >
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
};

export default AddWarehouse;
