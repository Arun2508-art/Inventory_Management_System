import {
  IconCirclePlus,
  IconFileDownload,
  IconFilter2,
} from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import SearchBar from '../../components/SearchBar';
import Table1, { type Column } from '../../components/Table1';

interface CategoryProps {
  _id?: string;
  name: string;
  sku: string;
  description: string;
}

const columns: Column<CategoryProps>[] = [
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
  { key: 'sku', label: 'Category ID' },
  { key: 'description', label: 'Description' },
];

const dummyProduct: CategoryProps[] = [
  {
    name: 'Wireless Mouse',
    sku: 'WM-1001',
    description: 'Ergonomic wireless mouse with adjustable DPI.',
  },
  {
    name: 'Mechanical Keyboard',
    sku: 'MK-2002',
    description: 'RGB backlit mechanical keyboard with blue switches.',
  },
  {
    name: '27-inch Monitor',
    sku: 'MN-3003',
    description: 'Full HD IPS monitor with thin bezel design.',
  },
  {
    name: 'USB-C Hub',
    sku: 'USBC-4004',
    description: 'Multiport USB-C hub with HDMI and USB 3.0 ports.',
  },
  {
    name: 'External Hard Drive 1TB',
    sku: 'EHD-5005',
    description: 'Portable external hard drive with USB 3.1.',
  },
];

const ListCategory = () => {
  const [Categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    axios
      .get<CategoryProps[]>('http://localhost:5000/api/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='w-full min-h-[calc(100vh-72px)] bg-blue-50 p-4'>
      <h2 className='font-semibold text-xl mb-4'>Categories</h2>
      {Categories.length !== 0 ? (
        <p className='h-[calc(100vh-150px)] flex justify-center items-center'>
          No products available.
        </p>
      ) : (
        <>
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

            <Table1<CategoryProps>
              columns={columns}
              data={dummyProduct}
              showCheckboxes
              onView={(row) => console.log('View', row)}
              onEdit={(row) => console.log('Edit', row)}
              onDelete={(row) => console.log('Delete', row)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ListCategory;
