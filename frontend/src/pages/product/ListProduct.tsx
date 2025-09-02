import axios from 'axios';
import { useEffect, useState } from 'react';
import ActionIcons from '../../components/ActionIcons';
import SearchBar from '../../components/SearchBar';
import type { Column } from '../../components/Table1';
import Table1 from '../../components/Table1';

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id?: string;
  name: string;
  sku: string;
  category?: Category | null;
  price: number;
  quantity: number;
  description: string;
  supplier: string;
}

const columns: Column<Product>[] = [
  {
    key: 'name',
    label: 'Product Info',
    render: (value) => (
      <div className='flex gap-2 items-center'>
        <img
          src={'/images/logo.png'}
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
  { key: 'category', label: 'Category' },

  {
    key: 'price',
    label: 'Price',
    render: (val) => `$${(val as number).toFixed(2)}`,
  },
  { key: 'quantity', label: 'Qty' },
  { key: 'description', label: 'Description' },
  { key: 'supplier', label: 'Supplier' },
];

const dummyProduct: Product[] = [
  {
    name: 'Wireless Mouse',
    sku: 'WM-1001',
    category: { _id: '64f0c7a2f0b9a8c9b0123456', name: 'tech' }, // category ObjectId
    price: 29.99,
    quantity: 150,
    description: 'Ergonomic wireless mouse with adjustable DPI.',
    supplier: '64f0c7b6f0b9a8c9b0123457', // supplier ObjectId
  },
  {
    name: 'Mechanical Keyboard',
    sku: 'MK-2002',
    category: { _id: '64f0c7a2f0b9a8c9b0123456', name: 'tech' },
    price: 89.99,
    quantity: 80,
    description: 'RGB backlit mechanical keyboard with blue switches.',
    supplier: '64f0c7b6f0b9a8c9b0123458',
  },
  {
    name: '27-inch Monitor',
    sku: 'MN-3003',
    category: { _id: '64f0c7a2f0b9a8c9b0123456', name: 'tech' },
    price: 249.99,
    quantity: 40,
    description: 'Full HD IPS monitor with thin bezel design.',
    supplier: '64f0c7b6f0b9a8c9b0123457',
  },
  {
    name: 'USB-C Hub',
    sku: 'USBC-4004',
    category: { _id: '64f0c7a2f0b9a8c9b0123456', name: 'tech' },
    price: 49.99,
    quantity: 100,
    description: 'Multiport USB-C hub with HDMI and USB 3.0 ports.',
    supplier: '64f0c7b6f0b9a8c9b0123459',
  },
  {
    name: 'External Hard Drive 1TB',
    sku: 'EHD-5005',
    category: { _id: '64f0c7a2f0b9a8c9b0123456', name: 'tech' },
    price: 69.99,
    quantity: 60,
    description: 'Portable external hard drive with USB 3.1.',
    supplier: '64f0c7b6f0b9a8c9b0123458',
  },
];

const ListProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  console.log(products);

  return (
    <div className='w-full min-h-[calc(100vh-72px)] bg-blue-50 p-4'>
      <h2 className='font-semibold text-xl mb-4'>Products</h2>
      {products.length !== 0 ? (
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
              {/* <div className='flex gap-3 items-center'>
                <IconFilter2
                  width={24}
                  height={24}
                  className='text-blue-600 hover:text-blue-900 cursor-pointer'
                />
                <Link to='add'>
                  <IconCirclePlus
                    width={24}
                    height={24}
                    className='text-green-600 hover:text-green-900 cursor-pointer'
                  />
                </Link>
                <IconFileDownload
                  width={24}
                  height={24}
                  className='text-orange-600 hover:text-orange-900 cursor-pointer'
                />
              </div> */}
              <ActionIcons addLink />
            </div>

            <Table1<Product>
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

export default ListProduct;
