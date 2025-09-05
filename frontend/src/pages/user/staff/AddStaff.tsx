import { yupResolver } from '@hookform/resolvers/yup';
import { IconCircleArrowLeft } from '@tabler/icons-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Textarea from '../../../components/Textarea';
import { addEmployee } from '../../../store/slice/employeeSlice';
import { useAppDispatch } from '../../../utills/reduxHook';
import type { employeeProps } from '../../../utills/types';
import { staffSchema } from '../../../utills/yupSchema';

const roleData = [
  { value: 'Manager', label: 'Manager' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Staff', label: 'Staff' },
  { value: 'Warehouse', label: 'Warehouse Staff' },
  { value: 'Sales', label: 'Sales Person' },
];

const statusData = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'In Active' },
  { value: 'onLeave', label: 'On Leave' },
];

const AddStaff = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Omit<employeeProps, '_id'>>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      employeeCode: '',
      role: '',
      status: '',
    },
    resolver: yupResolver(staffSchema),
  });

  const onSubmit: SubmitHandler<Omit<employeeProps, '_id'>> = async (data) => {
    try {
      const result = await dispatch(addEmployee(data));
      if (addEmployee.fulfilled.match(result)) {
        toast.success('Employee added successfully');
        reset;
        navigate('/user/staff');
      } else if (addEmployee.rejected.match(result)) {
        toast.error('Failed to add employee');
      }
    } catch (err) {
      console.error(err);
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
            onClick={() => navigate('/user/staff')}
          />
        </div>
        <h2 className='font-semibold text-xl mb-1'>Add Staff</h2>
      </div>

      <div className='bg-white rounded-md p-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-4 flex-wrap mb-4'>
            <Input
              id='name'
              label='Name'
              placeholder='Name'
              requiredLabel
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              id='email'
              label='Email'
              placeholder='email'
              requiredLabel
              {...register('email')}
              error={errors.email?.message}
            />
          </div>
          <div className='flex gap-4 flex-wrap mb-4'>
            <Input
              id='employeeCode'
              label='Employee ID'
              placeholder='Employee ID'
              requiredLabel
              {...register('employeeCode')}
              error={errors.employeeCode?.message}
            />
            <Input
              id='phone'
              label='Phone'
              placeholder='Phone'
              requiredLabel
              {...register('phone')}
              error={errors.phone?.message}
            />
          </div>

          <div className='flex gap-4 flex-wrap mb-4'>
            <Select
              id='role'
              label='Role'
              defaultValue=''
              optionLabel='Please Select role'
              optionList={roleData}
              requiredLabel
              {...register('role')}
              error={errors.role?.message}
            />

            <Select
              id='status'
              label='Status'
              defaultValue=''
              optionList={statusData}
              optionLabel='Please Select status'
              requiredLabel
              {...register('status')}
              error={errors.status?.message}
            />
          </div>

          <Textarea
            containerClassName='mb-4'
            id='address'
            label='Address'
            placeholder='Address'
            {...register('address')}
            error={errors.address?.message}
          />

          <button
            type='submit'
            disabled={isSubmitting}
            className='bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer'
          >
            {isSubmitting ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
