import { IconCircleArrowLeft } from '@tabler/icons-react';
import axios from 'axios';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import Input from '../../components/Input';

interface ProductForm {
  name: string;
  sku: string;
  category: string;
  price: string;
  quantity: string;
  description: string;
  supplier: string;
}

const AddProduct = () => {
  const [form, setForm] = useState<ProductForm>({
    name: '',
    sku: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
    supplier: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.sku || !form.price) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:5000/api/products', {
        ...form,
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity, 10) || 0,
      });
      alert('Product added successfully');
      setForm({
        name: '',
        sku: '',
        category: '',
        price: '',
        quantity: '',
        description: '',
        supplier: '',
      });
    } catch (err) {
      setError('Error adding product. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-[calc(100vh-72px)] bg-blue-50 p-4'>
      <div className='flex gap-2 items-center mb-4'>
        <div>
          <IconCircleArrowLeft
            width={24}
            height={24}
            className='text-blue-500 hover:text-blue-800 cursor-pointer'
            onClick={() => navigate('/products')}
          />
        </div>
        <h2 className='font-semibold text-xl mb-1'>Add Product</h2>
      </div>
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
          <div className='flex gap-4 flex-wrap mb-4'>
            <Input
              label='Category ID'
              id='category'
              name='category'
              placeholder='Category ID'
              value={form.category}
              onChange={handleChange}
            />

            <Input
              label='Price'
              id='price'
              name='price'
              type='number'
              placeholder='Price'
              step='0.01'
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex gap-4 flex-wrap mb-4'>
            <Input
              label='Quantity'
              id='quantity'
              name='quantity'
              type='number'
              placeholder='Quantity'
              value={form.quantity}
              onChange={handleChange}
            />

            <Input
              label='Supplier ID'
              id='supplier'
              className='ring-1 ring-gray-400 rounded p-2'
              name='supplier'
              placeholder='Supplier ID'
              value={form.supplier}
              onChange={handleChange}
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
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
