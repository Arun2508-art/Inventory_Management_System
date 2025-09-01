import {
  IconCirclePlus,
  IconFileDownload,
  IconFilter2,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Drawer from '../../components/Drawer';
import Loading from '../../components/Loading';
import SearchBar from '../../components/SearchBar';
import Table1, { type Column } from '../../components/Table1';
import {
  deleteSupplier,
  fetchSuppliers,
} from '../../store/slice/supplierSlice';
import { useAppDispatch, useAppSelector } from '../../utills/reduxHook';
import type { SupplierProps } from '../../utills/types';
import AddSupplier from './AddSupplier';

const columns: Column<SupplierProps>[] = [
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

const ListSupplier = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { suppliers, isLoading, error } = useAppSelector(
    (state) => state.supplierData
  );

  const handleDelete = async (data: SupplierProps) => {
    const result = await dispatch(deleteSupplier(data._id));
    if (deleteSupplier.fulfilled.match(result)) {
      toast.success('Supplier deleted successfully');
    }
  };

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  return (
    <>
      <div className='w-full min-h-[calc(100vh-72px)] bg-blue-50 p-4'>
        <h2 className='font-semibold text-xl mb-4'>Supplier</h2>

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

                <IconCirclePlus
                  stroke={1}
                  width={20}
                  height={20}
                  className='text-green-600 hover:text-green-900 cursor-pointer'
                  onClick={() => setOpen(true)}
                />

                <IconFileDownload
                  stroke={1}
                  width={20}
                  height={20}
                  className='text-orange-600 hover:text-orange-900 cursor-pointer'
                />
              </div>
            </div>
            {suppliers.length === 0 ? (
              <p className='h-[calc(100vh-210px)] flex justify-center items-center'>
                No supplier details available.
              </p>
            ) : (
              <Table1<SupplierProps>
                columns={columns}
                data={suppliers}
                showCheckboxes
                onView={(row) => console.log('View', row)}
                onEdit={(row) => console.log('Edit', row)}
                onDelete={handleDelete}
              />
            )}
          </div>
        )}
      </div>
      <Drawer title='Add Supplier' isOpen={open} onClose={() => setOpen(false)}>
        <AddSupplier onSuccess={() => setOpen(false)} />
      </Drawer>
    </>
  );
};

export default ListSupplier;
