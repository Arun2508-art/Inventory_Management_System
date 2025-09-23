import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ActionIcons from '../../../components/ActionIcons';
import Container from '../../../components/Container';
import Drawer from '../../../components/Drawer';
import Loading from '../../../components/Loading';
import SearchBar from '../../../components/SearchBar';
import Table1, { type Column } from '../../../components/Table1';
import {
  deleteSupplier,
  fetchSuppliers,
} from '../../../store/slice/supplierSlice';
import { supplierFIlter } from '../../../utills/filterData';
import { useAppDispatch, useAppSelector } from '../../../utills/reduxHook';
import type { SupplierProps } from '../../../utills/types';
import AddSupplier from './AddSupplier';

const columns: Column<SupplierProps>[] = [
  {
    key: 'name',
    label: 'Company Name',
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
  { key: 'contactPerson', label: 'Contact Person' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'address', label: 'Address' },
];

const ListSupplier = () => {
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState('Name');
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
      <Container title="Supplier's">
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
                filter={supplierFIlter}
                selectedFilter={filterText}
                setSelectedFilter={setFilterText}
              />
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
      </Container>

      <Drawer title='Add Supplier' isOpen={open} onClose={() => setOpen(false)}>
        <AddSupplier isOpen={open} onSuccess={() => setOpen(false)} />
      </Drawer>
    </>
  );
};

export default ListSupplier;
