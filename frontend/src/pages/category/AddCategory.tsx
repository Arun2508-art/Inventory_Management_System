import axios from 'axios';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import Input from '../../components/Input';

interface ProductForm {
  name: string;
  sku: string;
  description: string;
}

const AddCategory = () => {
  const [form, setForm] = useState<ProductForm>({
    name: '',
    sku: '',
    description: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

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

    console.log(form);

    try {
      await axios.post('http://localhost:5000/api/category', {
        ...form,
      });
      alert('Category added successfully');
      setForm({
        name: '',
        sku: '',
        description: '',
      });
    } catch (err) {
      setError('Error adding Category. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-[calc(100vh-72px)] bg-blue-50 p-4'>
      <h2 className='font-semibold text-xl mb-4'>Add Category</h2>
      <div className='bg-white rounded-md p-4'>
        <form onSubmit={handleSubmit}>
          <div className='flex gap-4 flex-wrap mb-4'>
            <Input
              id='name'
              name='name'
              label='Name'
              placeholder='Name'
              value={form.name}
              onChange={handleChange}
              required
            />

            <Input
              id='sku'
              label='SKU'
              name='sku'
              placeholder='SKU'
              value={form.sku}
              onChange={handleChange}
              required
            />
          </div>

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
      </div>
    </div>
  );
};

export default AddCategory;
