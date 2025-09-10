import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Container from '../components/Container';
import type { Column } from '../components/Table1';
import Table1 from '../components/Table1';
import {
  deleteBillingProduct,
  fetchBillingAllProducts,
  fetchBillingProduct,
} from '../store/slice/billingSlice';
import { useAppDispatch, useAppSelector } from '../utills/reduxHook';
import type { ProductProps } from '../utills/types';

export interface ScannedProduct {
  _id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  total?: number;
}

const columns: Column<ScannedProduct>[] = [
  {
    key: 'name',
    label: 'Name',
    render: (value) => (
      <div className='flex gap-2 items-center'>
        <img
          src={'/noAvatar.png'}
          alt=''
          width={30}
          height={30}
          className='rounded-md'
        />
        <span>{value as string}</span>
      </div>
    ),
  },
  { key: 'sku', label: 'SKU' },
  { key: 'price', label: 'Price' },
  { key: 'quantity', label: 'Quantity' },
  {
    key: 'total',
    label: 'Total',
    render: (_, row) => `$${((row.price * row.quantity) as number).toFixed(2)}`,
  },
];

const Billing = () => {
  const [scanInput, setScanInput] = useState('');

  const dispatch = useAppDispatch();
  const { billingItems, suggestionItems } = useAppSelector(
    (state) => state.billingData
  );
  const [filterData, setFilterData] = useState<
    Pick<ProductProps, 'name' | 'sku' | 'quantity' | 'category'>[]
  >([]);

  const handleScanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput.trim()) return;

    const result = await dispatch(fetchBillingProduct(scanInput));
    if (fetchBillingProduct.fulfilled.match(result)) {
      toast.success('Product added');
    }

    setScanInput('');
  };

  const handleClick = async (data: string) => {
    const result = await dispatch(fetchBillingProduct(data));
    if (fetchBillingProduct.fulfilled.match(result)) {
      toast.success('Product added');
    }

    setScanInput('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setScanInput(inputValue);

    if (inputValue.trim() === '') {
      setFilterData([]); // Hide suggestions when input is empty
    } else {
      const filtered = suggestionItems.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilterData(filtered); // Show filtered suggestions
    }
  };

  const handleDelete = async (data: ScannedProduct) => {
    const result = await dispatch(deleteBillingProduct(data._id));
    if (deleteBillingProduct.fulfilled.match(result)) {
      toast.success('product deleted successfully');
    }
  };

  const totalAmount = useMemo(() => {
    return billingItems.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }, [billingItems]);

  useEffect(() => {
    dispatch(fetchBillingAllProducts());
  }, [dispatch]);

  return (
    <Container title='Billing'>
      <div className='relative'>
        <form onSubmit={handleScanSubmit} className='mb-4'>
          <input
            type='text'
            value={scanInput}
            onChange={handleChange}
            placeholder='Scan or enter SKU'
            className='ring-1 ring-gray-400 p-2 rounded-l outline-blue-300'
            autoFocus
          />
          <button
            type='submit'
            className='bg-blue-600 text-white px-4 py-2 rounded-r'
          >
            Add
          </button>
        </form>
        {scanInput && filterData.length > 0 && (
          <ul className='absolute bg-gray-50 max-h-96 overflow-auto p-2 top-full mt-1 rounded'>
            {filterData?.map((item) => (
              <li
                className='flex gap-3 items-center p-3 mb-4 border-b border-blue-300'
                key={item.sku}
                onClick={() => {
                  handleClick(item.sku);
                }}
              >
                <div className='flex gap-2 items-center'>
                  <img
                    src={'/noAvatar.png'}
                    alt=''
                    width={30}
                    height={30}
                    className='rounded-md'
                  />
                  <span>{item.name}</span>
                </div>
                <div>{item.sku}</div>
                <div>
                  {typeof item.category === 'object'
                    ? item.category.name
                    : item.category}
                </div>
                <div>{item.quantity}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {billingItems.length === 0 ? (
        <p className='h-[calc(100vh-210px)] flex justify-center items-center'>
          No products scanned yet
        </p>
      ) : (
        <Table1<ScannedProduct>
          columns={columns}
          data={billingItems}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={handleDelete}
        />
      )}
      {/* <table className='w-full border-collapse'>
        <thead>
          <tr>
            <th className='border p-2 text-left'>Name</th>
            <th className='border p-2 text-left'>SKU</th>
            <th className='border p-2 text-right'>Price</th>
            <th className='border p-2 text-right'>Quantity</th>
            <th className='border p-2 text-right'>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product._id}>
              <td className='border p-2'>{product.name}</td>
              <td className='border p-2'>{product.sku}</td>
              <td className='border p-2 text-right'>
                ${product.price.toFixed(2)}
              </td>
              <td className='border p-2 text-right'>{product.quantity}</td>
              <td className='border p-2 text-right'>
                ${(product.price * product.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
          {cart.length === 0 && (
            <tr>
              <td colSpan={5} className='border p-2 text-center'>
                No products scanned yet
              </td>
            </tr>
          )}
        </tbody>
      </table> */}

      <div className='flex flex-col gap-3 mr-4 mt-6'>
        <div className='font-semibold text-right'>
          Subtotal: ${totalAmount.toFixed(2)}
        </div>

        <div className='font-semibold text-right'>GST: $50</div>

        <div className='font-semibold text-right'>
          Total Amount: ${(totalAmount + 50).toFixed(2)}
        </div>

        <div className='flex justify-end'>
          <Button variant='secondary'>Check out</Button>
        </div>
      </div>
    </Container>
  );
};

export default Billing;
