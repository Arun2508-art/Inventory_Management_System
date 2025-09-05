import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ActionIcons from '../../components/ActionIcons';
import Badge from '../../components/Badge';
import Container from '../../components/Container';
import Drawer from '../../components/Drawer';
import Loading from '../../components/Loading';
import SearchBar from '../../components/SearchBar';
import Table1, { type Column } from '../../components/Table1';
import {
  deleteWarehouse,
  fetchWarehouses,
} from '../../store/slice/warehouseSlice';
import { useAppDispatch, useAppSelector } from '../../utills/reduxHook';
import type { warehouseProps } from '../../utills/types';
import AddWarehouse from './AddWarehouse';

const columns: Column<warehouseProps>[] = [
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
        <span className='capitalize'>{value as string}</span>
      </div>
    ),
  },
  {
    key: 'contactPerson',
    label: 'Contact Person',
    render: (value) => <div className='capitalize'>{value}</div>,
  },
  {
    key: 'sku',
    label: 'Warehouse ID',
    render: (value) => <div className='capitalize'>{value}</div>,
  },
  { key: 'location', label: 'Address' },
  {
    key: 'status',
    label: 'Status',
    render: (value, row) => {
      return (
        <Badge variant={row.status} className='capitalize'>
          {value}
        </Badge>
      );
    },
  },
  { key: 'description', label: 'Description' },
];

const ListWarehouse = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { warehouseList, isLoading, error } = useAppSelector(
    (state) => state.warehouseData
  );

  const handleDelete = async (data: warehouseProps) => {
    const result = await dispatch(deleteWarehouse(data._id));
    if (deleteWarehouse.fulfilled.match(result)) {
      toast.success('Warehouse deleted successfully');
    }
  };

  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);

  return (
    <>
      <Container title="Warehouse's">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p className='text-red-600'>Error: {error}</p>
        ) : (
          <div className='bg-blue-100 rounded-md shadow-md'>
            <div className='flex justify-between items-center gap-4 px-4 py-3 mb-1'>
              <SearchBar />
              <ActionIcons onAdd={() => setOpen(true)} />
            </div>

            {warehouseList.length === 0 ? (
              <p className='h-[calc(100vh-210px)] flex justify-center items-center'>
                No Warehouse details available.
              </p>
            ) : (
              <Table1<warehouseProps>
                columns={columns}
                data={warehouseList}
                showCheckboxes
                onEdit={(row) => console.log('Edit', row)}
                onDelete={handleDelete}
              />
            )}
          </div>
        )}
      </Container>

      <Drawer
        title='Add Warehouse'
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <AddWarehouse isOpen={open} onSuccess={() => setOpen(false)} />
      </Drawer>
    </>
  );
};

export default ListWarehouse;
