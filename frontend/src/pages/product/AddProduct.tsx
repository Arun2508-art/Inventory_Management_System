import { yupResolver } from '@hookform/resolvers/yup';
import { IconCircleArrowLeft } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import ImageUpload from '../../components/ImageUpload';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import {
  addProduct,
  fetchCategorySupplier,
} from '../../store/slice/productSlice';
import { useAppDispatch, useAppSelector } from '../../utills/reduxHook';
import type { ImageType, ProductProps } from '../../utills/types';
import { productSchema } from '../../utills/yupSchema';

const AddProduct = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<ImageType[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categoryOption, supplierOption } = useAppSelector(
    (state) => state.productData
  );
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Omit<ProductProps, '_id'>>({
    defaultValues: {
      images: [],
      name: '',
      sku: '',
      category: '',
      price: undefined,
      quantity: undefined,
      description: '',
      supplier: '',
    },
    resolver: yupResolver(productSchema),
  });

  const onSubmit: SubmitHandler<Omit<ProductProps, '_id'>> = async (data) => {
    const productData = {
      ...data,
      images: uploadedImageUrl,
    };
    console.log(productData);
    try {
      const result = await dispatch(addProduct(productData));
      if (addProduct.fulfilled.match(result)) {
        toast.success('Product added successfully');
        reset();
        navigate('/products');
      } else if (addProduct.rejected.match(result)) {
        toast.error('Failed to add product');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const supplierData = useMemo(
    () =>
      supplierOption.map((item) => ({
        value: item._id,
        label: item.name,
      })),
    [supplierOption]
  );
  const categorydata = useMemo(
    () =>
      categoryOption.map((item) => ({
        value: item._id,
        label: item.name,
      })),
    [categoryOption]
  );

  useEffect(() => {
    dispatch(fetchCategorySupplier());
  }, [dispatch]);

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <ImageUpload
            id='prodimage'
            requiredLabel
            label='Upload your image'
            containerClassName='mb-4'
            setUploadedImageData={setUploadedImageUrl}
            multiple
          />
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
              id='sku'
              label='SKU'
              placeholder='SKU'
              requiredLabel
              {...register('sku')}
              error={errors.sku?.message}
            />
          </div>
          <div className='flex gap-4 flex-wrap mb-4'>
            <Select
              label='Category'
              id='category'
              defaultValue=''
              optionLabel='Please select the category'
              optionList={categorydata}
              {...register('category')}
              error={errors.category?.message}
            />
            <Input
              label='Price'
              id='price'
              placeholder='Price'
              {...register('price')}
              error={errors.price?.message}
            />
          </div>
          <div className='flex gap-4 flex-wrap mb-4'>
            <Input
              label='Quantity'
              id='quantity'
              placeholder='Quantity'
              {...register('quantity')}
              error={errors.quantity?.message}
            />
            <Select
              id='supplier'
              label='Supplier'
              defaultValue=''
              optionLabel='Please select the Supplier'
              optionList={supplierData}
              {...register('supplier')}
              error={errors.supplier?.message}
            />
          </div>
          <Textarea
            id='description'
            label='Description'
            placeholder='Description'
            containerClassName='mb-4'
            {...register('description')}
            error={errors.description?.message}
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

export default AddProduct;
