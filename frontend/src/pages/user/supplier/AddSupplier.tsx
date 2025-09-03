import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import { addSupplier } from '../../../store/slice/supplierSlice';
import { useAppDispatch } from '../../../utills/reduxHook';
import type {
  OnSuccessHandlerProps,
  SupplierProps,
} from '../../../utills/types';
import { supplierSchema } from '../../../utills/yupSchema';

const AddSupplier = ({ onSuccess, isOpen }: OnSuccessHandlerProps) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Omit<SupplierProps, '_id'>>({
    defaultValues: {
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
    },
    resolver: yupResolver(supplierSchema),
  });

  const onSubmit: SubmitHandler<Omit<SupplierProps, '_id'>> = async (data) => {
    try {
      const result = await dispatch(addSupplier(data));
      if (addSupplier.fulfilled.match(result)) {
        onSuccess();
        toast.success('Supplier added successfully');
        reset();
      }
      if (addSupplier.rejected.match(result)) {
        toast.error('Failed to add supplier');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        id='name'
        containerClassName='mb-4'
        label='Name'
        placeholder='Name'
        requiredLabel
        {...register('name')}
        error={errors.name?.message}
      />

      <Input
        id='contactPerson'
        containerClassName='mb-4'
        label='Contact Person'
        placeholder='Contact Person'
        requiredLabel
        {...register('contactPerson')}
        error={errors.contactPerson?.message}
      />

      <Input
        id='email'
        containerClassName='mb-4'
        label='Email'
        placeholder='email'
        requiredLabel
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        id='phone'
        containerClassName='mb-4'
        label='Phone'
        placeholder='Phone'
        requiredLabel
        {...register('phone')}
        error={errors.phone?.message}
      />
      <Textarea
        id='address'
        containerClassName='mb-4'
        label='Address'
        placeholder='Address'
        requiredLabel
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
  );
};

export default AddSupplier;
