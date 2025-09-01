import {
  IconCirclePlus,
  IconFileDownload,
  IconFilter2,
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { Link } from 'react-router';
import Loading from '../../../components/Loading';
import SearchBar from '../../../components/SearchBar';
import type { Column } from '../../../components/Table1';
import Table1 from '../../../components/Table1';
import { fetchCustomers } from '../../../store/slice/customerSlice';
import { useAppDispatch, useAppSelector } from '../../../utills/reduxHook';
import type { CustomerProps } from '../../../utills/types';

const columns: Column<CustomerProps>[] = [
  {
    key: 'name',
    label: 'Category Name',
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
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'address', label: 'Address' },
];

const ListCustomer = () => {
  const dispatch = useAppDispatch();
  const { customers, isLoading, error } = useAppSelector(
    (state) => state.customerData
  );

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  console.log(error, customers);

  return (
    <div className='w-full min-h-[calc(100vh-72px)] bg-blue-50 p-4'>
      <h2 className='font-semibold text-xl mb-4'>Customer's</h2>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <p className='text-red-600'>Error: {error}</p>
      ) : (
        <div className='bg-blue-100 rounded-md shadow-md'>
          <div className='flex justify-between items-center gap-4 px-4 py-3 mb-1'>
            <div>
              <SearchBar />
            </div>
            <div className='flex gap-3 items-center'>
              <IconFilter2
                stroke={1}
                width={20}
                height={20}
                className='text-blue-600 hover:text-blue-900 cursor-pointer'
              />
              <Link to='add'>
                <IconCirclePlus
                  stroke={1}
                  width={20}
                  height={20}
                  className='text-green-600 hover:text-green-900 cursor-pointer'
                />
              </Link>
              <IconFileDownload
                stroke={1}
                width={20}
                height={20}
                className='text-orange-600 hover:text-orange-900 cursor-pointer'
              />
            </div>
          </div>
          {customers.length === 0 ? (
            <p className='h-[calc(100vh-210px)] flex justify-center items-center'>
              No supplier details available.
            </p>
          ) : (
            <Table1<CustomerProps>
              columns={columns}
              data={customers}
              showCheckboxes
              onView={(row) => console.log('View', row)}
              onEdit={(row) => console.log('Edit', row)}
              onDelete={(row) => console.log('Delete', row)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ListCustomer;
