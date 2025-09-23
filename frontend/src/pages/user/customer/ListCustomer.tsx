import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ActionIcons from '../../../components/ActionIcons';
import Container from '../../../components/Container';
import Drawer from '../../../components/Drawer';
import Loading from '../../../components/Loading';
import SearchBar from '../../../components/SearchBar';
import type { Column } from '../../../components/Table1';
import Table1 from '../../../components/Table1';
import {
  deleteCustomer,
  fetchCustomers,
} from '../../../store/slice/customerSlice';
import { customerFilter } from '../../../utills/filterData';
import { useAppDispatch, useAppSelector } from '../../../utills/reduxHook';
import type { CustomerProps } from '../../../utills/types';
import AddCustomer from './AddCustomer';

const columns: Column<CustomerProps>[] = [
  {
    key: 'name',
    label: 'Name',
    render: (value, row) => (
      <div className='flex gap-2 items-center'>
        <img
          src={row.image?.url || '/noAvatar.png'}
          alt={row.image?.name}
          width={30}
          height={30}
          className='rounded-md'
        />
        <span>{value as string}</span>
      </div>
    ),
  },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'address', label: 'Address' },
];

const ListCustomer = () => {
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState('Name');
  const dispatch = useAppDispatch();
  const { customers, isLoading, error } = useAppSelector(
    (state) => state.customerData
  );

  const handleDelete = async (data: CustomerProps) => {
    const result = await dispatch(deleteCustomer(data._id));
    if (deleteCustomer.fulfilled.match(result)) {
      toast.success('Supplier deleted successfully');
    }
  };

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <>
      <Container title="Customer's">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p className='text-red-600'>Error: {error}</p>
        ) : (
          <div className='bg-blue-100 rounded-md shadow-md'>
            <div className='flex justify-between items-center gap-4 px-4 py-3 mb-1'>
              <SearchBar placeholder={filterText} />
              <ActionIcons
                onAdd={() => setOpen(true)}
                onDownload={() => console.log('delete')}
                filter={customerFilter}
                selectedFilter={filterText}
                setSelectedFilter={setFilterText}
              />
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
                onDelete={handleDelete}
              />
            )}
          </div>
        )}
      </Container>

      <Drawer title='Add Customer' isOpen={open} onClose={() => setOpen(false)}>
        <AddCustomer isOpen={open} onSuccess={() => setOpen(false)} />
      </Drawer>
    </>
  );
};

export default ListCustomer;
