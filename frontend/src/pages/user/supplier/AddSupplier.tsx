import { type ChangeEvent, type FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../../../components/Input';
import { addSupplier } from '../../../store/slice/supplierSlice';
import { useAppDispatch } from '../../../utills/reduxHook';
import type { SupplierProps } from '../../../utills/types';

interface AddSupplierProps {
  onSuccess: () => void;
}

const AddSupplier = ({ onSuccess }: AddSupplierProps) => {
  const [form, setForm] = useState<Omit<SupplierProps, '_id'>>({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
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

    if (!form.name) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await dispatch(addSupplier(form));
      if (addSupplier.fulfilled.match(result)) {
        onSuccess();
        toast.success('Supplier added successfully');
        setForm({
          name: '',
          contactPerson: '',
          phone: '',
          email: '',
          address: '',
        });
      }
    } catch (err) {
      setError('Error adding Supplier. Please try again.');
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
        label='Contact Person'
        name='contactPerson'
        placeholder='Contact Person'
        value={form.contactPerson}
        onChange={handleChange}
        required
      />

      <Input
        id='email'
        className='mb-4'
        label='Email'
        name='email'
        placeholder='email'
        value={form.email}
        onChange={handleChange}
        required
      />

      <Input
        id='phone'
        className='mb-4'
        label='Phone'
        name='phone'
        placeholder='Phone'
        value={form.phone}
        onChange={handleChange}
        required
      />

      <div className='flex flex-col gap-2 mb-4'>
        <label htmlFor='description' className='font-semibold'>
          Address
        </label>

        <textarea
          id='address'
          name='address'
          placeholder='Address'
          className='ring-1 ring-gray-400 p-2 rounded outline-blue-300'
          value={form.address}
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

export default AddSupplier;
