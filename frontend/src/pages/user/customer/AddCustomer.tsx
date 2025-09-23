import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import ImageUpload from '../../../components/ImageUpload';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import { addCustomer } from '../../../store/slice/customerSlice';
import { useAppDispatch } from '../../../utills/reduxHook';
import type {
  CustomerProps,
  ImageType,
  OnSuccessHandlerProps,
} from '../../../utills/types';
import { customerSchema } from '../../../utills/yupSchema';

const AddCustomer = ({ onSuccess, isOpen }: OnSuccessHandlerProps) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<ImageType>({
    name: '',
    url: '',
  });
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Omit<CustomerProps, '_id'>>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    resolver: yupResolver(customerSchema),
  });

  const onHandleSubmit: SubmitHandler<Omit<CustomerProps, '_id'>> = async (
    data
  ) => {
    const UploadData = {
      ...data,
      image: uploadedImageUrl,
    };

    try {
      const result = await dispatch(addCustomer(UploadData));
      if (addCustomer.fulfilled.match(result)) {
        onSuccess();
        toast.success('Customer added successfully');
        reset();
      } else if (addCustomer.rejected.match(result)) {
        toast.error('Failed to add customer');
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
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <ImageUpload
        id='categoryimage'
        requiredLabel
        label='Upload your image'
        containerClassName='mb-4'
        setUploadedImageData={setUploadedImageUrl}
      />

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

export default AddCustomer;
