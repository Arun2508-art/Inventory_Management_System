import { type ChangeEvent, type FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../../components/Input';
import { addCategory } from '../../store/slice/categorySlice';
import { useAppDispatch } from '../../utills/reduxHook';
import type { CategoryProps } from '../../utills/types';

interface AddCategoryProps {
  onSuccess: () => void;
}

const AddCategory = ({ onSuccess }: AddCategoryProps) => {
  const [form, setForm] = useState<Omit<CategoryProps, '_id'>>({
    name: '',
    sku: '',
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
      const result = await dispatch(addCategory(form));
      if (addCategory.fulfilled.match(result)) {
        onSuccess();
        toast.success('Category added successfully');
        setForm({
          name: '',
          sku: '',
          description: '',
        });
      }
    } catch (err) {
      setError('Error adding Category. Please try again.');
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
        id='sku'
        className='mb-4'
        label='SKU'
        name='sku'
        placeholder='SKU'
        value={form.sku}
        onChange={handleChange}
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
        {loading ? 'Adding...' : 'Add Category'}
      </button>
    </form>
  );
};

export default AddCategory;
