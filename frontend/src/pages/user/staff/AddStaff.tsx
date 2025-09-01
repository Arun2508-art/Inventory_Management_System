import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import { addEmployee } from '../../../store/slice/employeeSlice';
import { useAppDispatch } from '../../../utills/reduxHook';
import type { employeeProps } from '../../../utills/types';

const roleData = [
  { value: '', label: 'Please Select role' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Admin' },
  { value: 'staff', label: 'Staff' },
  { value: 'warehouse', label: 'Warehouse Staff' },
  { value: 'sales', label: 'Sales Person' },
];

const statusData = [
  { value: '', label: 'Please Select status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'In Active' },
  { value: 'onLeave', label: 'On Leave' },
];

const AddStaff = () => {
  const [form, setForm] = useState<Omit<employeeProps, '_id'>>({
    name: '',
    phone: '',
    email: '',
    address: '',
    employeeCode: '',
    role: 'admin',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      const result = await dispatch(addEmployee(form));
      if (addEmployee.fulfilled.match(result)) {
        toast.success('Employee added successfully');
        setForm({
          name: '',
          phone: '',
          email: '',
          address: '',
          employeeCode: '',
          role: 'staff',
        });
        navigate('/user/staff');
      }
    } catch (err) {
      setError('Error adding Employee. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-[calc(100vh-72px)] bg-blue-50 p-4'>
      <h2 className='font-semibold text-xl mb-4'>Add Employee</h2>
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
              id='email'
              label='Email'
              name='email'
              placeholder='email'
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex gap-4 flex-wrap mb-4'>
            <Input
              id='employeeCode'
              label='Employee ID'
              name='employeeCode'
              placeholder='Employee ID'
              value={form.employeeCode}
              onChange={handleChange}
              required
            />
            <Input
              id='phone'
              label='Phone'
              name='phone'
              placeholder='Phone'
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className='flex gap-4 flex-wrap mb-4'>
            <Select
              name='role'
              id='role'
              label='Role'
              defaultValue=''
              optionList={roleData}
              required
            />

            <Select
              name='status'
              id='status'
              label='Status'
              defaultValue=''
              optionList={statusData}
              required
            />
          </div>

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
        </form>{' '}
      </div>
    </div>
  );
};

export default AddStaff;
