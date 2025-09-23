import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ActionIcons from '../../components/ActionIcons';
import Container from '../../components/Container';
import Loading from '../../components/Loading';
import SearchBar from '../../components/SearchBar';
import type { Column } from '../../components/Table1';
import Table1 from '../../components/Table1';
import { deleteProduct, fetchProducts } from '../../store/slice/productSlice';
import { porductFIlter } from '../../utills/filterData';
import { useAppDispatch, useAppSelector } from '../../utills/reduxHook';
import type { ProductProps } from '../../utills/types';

const columns: Column<ProductProps>[] = [
  {
    key: 'name',
    label: 'Product Info',
    render: (value, row) => {
      return (
        <div className='flex gap-2 items-center'>
          <img
            src={row.images?.[0].url || 'noAvatar.png'}
            alt={row.images?.[0].name || ''}
            width={50}
            height={50}
            className='rounded-md object-cover'
          />
          <span className='capitalize'>{value as string}</span>
        </div>
      );
    },
  },
  { key: 'sku', label: 'SKU' },
  {
    key: 'category',
    label: 'Category',
    render: (_, row) => (
      <div>
        {typeof row.category === 'object' ? row.category?.name : row.category}
      </div>
    ),
  },

  {
    key: 'price',
    label: 'Price',
    render: (val) =>
      val === null ? (
        <div className='text-center'>-</div>
      ) : (
        `$${(val as number).toFixed(2)}`
      ),
  },
  {
    key: 'quantity',
    label: 'Qty',
    render: (val) =>
      val === null ? (
        <div className='text-center'>-</div>
      ) : (
        `$${(val as number).toFixed(2)}`
      ),
  },
  {
    key: 'supplier',
    label: 'Supplier',
    render: (_, row) => (
      <div>
        {typeof row.supplier === 'object' ? row.supplier?.name : row.supplier}
      </div>
    ),
  },
  { key: 'description', label: 'Description' },
];

const ListProduct = () => {
  const [filterText, setFilterText] = useState('Name');
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state) => state.productData);

  const handleDelete = async (data: ProductProps) => {
    const result = await dispatch(deleteProduct(data._id));
    if (deleteProduct.fulfilled.match(result)) {
      toast.success('Employee deleted successfully');
    } else if (deleteProduct.rejected.match(result)) {
      toast.error('Failed to delete product');
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container title='Products'>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='bg-blue-100 rounded-md shadow-md'>
          <div className='flex justify-between items-center gap-4 px-4 py-3 mb-1'>
            <SearchBar placeholder={filterText} />
            <ActionIcons
              addLink
              filter={porductFIlter}
              selectedFilter={filterText}
              setSelectedFilter={setFilterText}
            />
          </div>
          {products.length === 0 ? (
            <p className='h-[calc(100vh-210px)] flex justify-center items-center'>
              No Product details available.
            </p>
          ) : (
            <Table1<ProductProps>
              columns={columns}
              data={products}
              showCheckboxes
              onView={(row) => console.log('View', row)}
              onEdit={(row) => console.log('Edit', row)}
              onDelete={handleDelete}
            />
          )}
        </div>
      )}
    </Container>
  );
};

export default ListProduct;
