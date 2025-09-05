import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import { addWarehouse } from '../../store/slice/warehouseSlice';
import { useAppDispatch } from '../../utills/reduxHook';
import type { OnSuccessHandlerProps, warehouseProps } from '../../utills/types';
import { warehouseSchema } from '../../utills/yupSchema';

const statusData = [
  { value: 'active', label: 'Active' },
  { value: 'inActive', label: 'In Active' },
];

const AddWarehouse = ({ onSuccess, isOpen }: OnSuccessHandlerProps) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Omit<warehouseProps, '_id'>>({
    defaultValues: {
      name: '',
      contactPerson: '',
      sku: '',
      location: '',
      status: undefined,
      description: '',
    },
    resolver: yupResolver(warehouseSchema),
  });

  const onSubmit: SubmitHandler<Omit<warehouseProps, '_id'>> = async (data) => {
    try {
      const result = await dispatch(addWarehouse(data));
      if (addWarehouse.fulfilled.match(result)) {
        onSuccess();
        toast.success('Warehouse added successfully');
        reset;
      } else if (addWarehouse.rejected.match(result)) {
        toast.error('Failed to add warehouse');
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
        id='sku'
        containerClassName='mb-4'
        label='SKU'
        placeholder='SKU'
        requiredLabel
        {...register('sku')}
        error={errors.sku?.message}
      />
      <Input
        id='location'
        containerClassName='mb-4'
        label='Location'
        placeholder='location'
        requiredLabel
        {...register('location')}
        error={errors.location?.message}
      />
      <Select
        containerClassname='mb-4'
        id='status'
        label='Status'
        defaultValue=''
        optionLabel='Please Select status'
        optionList={statusData}
        {...register('status')}
        error={errors.status?.message}
      />
      <Textarea
        id='description'
        label='Description'
        placeholder='Description'
        containerClassName='mb-4'
        {...register('description')}
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

export default AddWarehouse;
