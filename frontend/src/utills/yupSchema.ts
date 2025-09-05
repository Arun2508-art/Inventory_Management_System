import * as yup from 'yup';
import type {
  CategoryProps,
  CustomerProps,
  employeeProps,
  ProductProps,
  SupplierProps,
  warehouseProps,
} from './types';

export const productSchema: yup.ObjectSchema<Omit<ProductProps, '_id'>> =
  yup.object({
    name: yup.string().required('Please enter name'),
    sku: yup.string().required(),
    category: yup.string().optional(),
    price: yup
      .number()
      .transform((value, originValue) =>
        originValue === '' ? undefined : value
      )
      .typeError('Price must be a number')
      .optional(),
    quantity: yup
      .number()
      .transform((value, originValue) =>
        originValue === '' ? undefined : value
      )
      .typeError('Quantity must be a number')
      .optional(),
    supplier: yup.string().optional(),
    description: yup.string().optional(),
  });

export const categorySchema: yup.ObjectSchema<Omit<CategoryProps, '_id'>> =
  yup.object({
    name: yup.string().required('Please enter name'),
    sku: yup.string().required(),
    description: yup.string().optional(),
  });

export const staffSchema: yup.ObjectSchema<Omit<employeeProps, '_id'>> =
  yup.object({
    name: yup.string().required('Please enter company name'),
    employeeCode: yup.string().required(),
    email: yup.string().email('Invalid Email').required(),
    role: yup
      .string()
      .oneOf(['Admin', 'Manager', 'Staff', 'Warehouse', 'Sales', ''])
      .required(),
    phone: yup
      .string()
      .required('Phone is required')
      .matches(/^\d+$/, 'Phone must be digits only')
      .min(8, 'Phone must be at least 8 digits')
      .test(
        'no-repeated-digits',
        'Phone number cannot be all the same digit',
        (value) => !/^(\d)\1+$/.test(value ?? '') // fails if all digits are same
      ),
    address: yup.string().required(),
    department: yup.string().optional(),
    status: yup
      .string()
      .oneOf(['', 'active', 'inactive', 'onLeave'])
      .required(),
  });

export const customerSchema: yup.ObjectSchema<Omit<CustomerProps, '_id'>> =
  yup.object({
    name: yup.string().required('Please enter your name'),
    email: yup.string().email('Invalid Email').required(),
    phone: yup
      .string()
      .required('Phone is required')
      .matches(/^\d+$/, 'Phone must be digits only')
      .min(8, 'Phone must be at least 8 digits')
      .test(
        'no-repeated-digits',
        'Phone number cannot be all the same digit',
        (value) => !/^(\d)\1+$/.test(value ?? '') // fails if all digits are same
      ),
    address: yup.string().required(),
  });

export const supplierSchema: yup.ObjectSchema<Omit<SupplierProps, '_id'>> =
  yup.object({
    name: yup.string().required('Please enter company name'),
    contactPerson: yup.string().required('Please enter contact person name'),
    email: yup.string().email('Invalid Email').required(),
    phone: yup
      .string()
      .required('Phone is required')
      .matches(/^\d+$/, 'Phone must be digits only')
      .min(8, 'Phone must be at least 8 digits')
      .test(
        'no-repeated-digits',
        'Phone number cannot be all the same digit',
        (value) => !/^(\d)\1+$/.test(value ?? '') // fails if all digits are same
      ),
    address: yup.string().required(),
  });

export const warehouseSchema: yup.ObjectSchema<Omit<warehouseProps, '_id'>> =
  yup.object({
    name: yup.string().required('Please enter warehouse name'),
    contactPerson: yup.string().required('Please enter contact person name'),
    sku: yup.string().required('Please enter warehouse ID'),
    location: yup.string().required(),
    status: yup
      .string()
      .oneOf(['active', 'inActive'], 'Status must be active or inActive')
      .required('Status is required'),
    description: yup.string().optional(),
  });
