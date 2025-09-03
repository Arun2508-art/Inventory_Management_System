import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import { addCategory } from '../../store/slice/categorySlice';
import { useAppDispatch } from '../../utills/reduxHook';
import type { CategoryProps, OnSuccessHandlerProps } from '../../utills/types';
import { categorySchema } from '../../utills/yupSchema';

const AddCategory = ({ onSuccess, isOpen }: OnSuccessHandlerProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Omit<CategoryProps, '_id'>>({
    defaultValues: {
      name: '',
      sku: '',
      description: '',
    },
    resolver: yupResolver(categorySchema),
  });

  const onSubmit: SubmitHandler<Omit<CategoryProps, '_id'>> = async (data) => {
    try {
      const result = await dispatch(addCategory(data));
      if (addCategory.fulfilled.match(result)) {
        onSuccess();
        toast.success('Category added successfully');
        reset();
      } else if (addCategory.rejected.match(result)) {
        toast.error('Failed to add category');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Reset form when drawer is closed
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
        requiredLabel
        label='Name'
        placeholder='Name'
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        id='sku'
        containerClassName='mb-4'
        label='SKU'
        requiredLabel
        placeholder='SKU'
        {...register('sku')}
        error={errors.sku?.message}
      />

      <Textarea
        label='Description'
        id='description'
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

export default AddCategory;
