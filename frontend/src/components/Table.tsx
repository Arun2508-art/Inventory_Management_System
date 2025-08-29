import { IconEdit, IconEye, IconTrashX } from '@tabler/icons-react';
import Checkbox from './Checkbox';

const dummyProduct = [
  {
    name: 'Wireless Mouse',
    sku: 'WM-1001',
    category: '64f0c7a2f0b9a8c9b0123456', // category ObjectId
    price: 29.99,
    quantity: 150,
    description: 'Ergonomic wireless mouse with adjustable DPI.',
    supplier: '64f0c7b6f0b9a8c9b0123457', // supplier ObjectId
  },
  {
    name: 'Mechanical Keyboard',
    sku: 'MK-2002',
    category: '64f0c7a2f0b9a8c9b0123456',
    price: 89.99,
    quantity: 80,
    description: 'RGB backlit mechanical keyboard with blue switches.',
    supplier: '64f0c7b6f0b9a8c9b0123458',
  },
  {
    name: '27-inch Monitor',
    sku: 'MN-3003',
    category: '64f0c7a2f0b9a8c9b0123459',
    price: 249.99,
    quantity: 40,
    description: 'Full HD IPS monitor with thin bezel design.',
    supplier: '64f0c7b6f0b9a8c9b0123457',
  },
  {
    name: 'USB-C Hub',
    sku: 'USBC-4004',
    category: '64f0c7a2f0b9a8c9b012345a',
    price: 49.99,
    quantity: 100,
    description: 'Multiport USB-C hub with HDMI and USB 3.0 ports.',
    supplier: '64f0c7b6f0b9a8c9b0123459',
  },
  {
    name: 'External Hard Drive 1TB',
    sku: 'EHD-5005',
    category: '64f0c7a2f0b9a8c9b012345b',
    price: 69.99,
    quantity: 60,
    description: 'Portable external hard drive with USB 3.1.',
    supplier: '64f0c7b6f0b9a8c9b0123458',
  },
];

const Table = () => {
  return (
    <div className='overflow-x-auto max-w-full rounded-b-md'>
      <table className='table-fixed border-collapse bg-white min-w-full'>
        <thead>
          <tr className='h-[45px] text-base border-b border-gray-200'>
            <th className='text-left px-3'>
              <Checkbox />
            </th>
            <th className='text-left font-medium px-3'>Name</th>
            <th className='text-left font-medium px-3'>SKU</th>
            <th className='text-left font-medium px-3'>Category</th>
            <th className='text-left font-medium px-3'>Price</th>
            <th className='text-left font-medium px-3'>Quantity</th>
            <th className='text-left font-medium px-3'>Description</th>
            <th className='text-left font-medium px-3'>Supplier</th>
            <th className='text-left font-medium px-3'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyProduct.map((item) => (
            <tr
              className={`h-[55px] text-sm border-gray-200 border-b last:border-0`}
              key={item.name}
            >
              <td className='px-3'>
                <input type='checkbox' />
              </td>
              <td className='px-3 text-nowrap max-w-64 overflow-hidden text-ellipsis'>
                <div className='flex gap-2 items-center'>
                  <img
                    src={'/images/logo.png'}
                    alt=''
                    width={30}
                    height={30}
                    className='rounded-md'
                  />
                  <div>{item.name}</div>
                </div>
              </td>
              <td className='px-3 text-nowrap max-w-64 overflow-hidden text-ellipsis'>
                {item.sku}
              </td>
              <td className='px-3 text-nowrap max-w-64 overflow-hidden text-ellipsis'>
                {item.category}
              </td>
              <td className='px-3 text-nowrap max-w-64 overflow-hidden text-ellipsis'>
                ${item.price}
              </td>
              <td className='px-3 text-nowrap max-w-64 overflow-hidden text-ellipsis'>
                {item.quantity}
              </td>
              <td className='px-3 text-nowrap max-w-64 overflow-hidden text-ellipsis'>
                {item.description}
              </td>
              <td className='px-3 text-nowrap max-w-64 overflow-hidden text-ellipsis'>
                {item.supplier}
              </td>
              <td className='px-3 text-nowrap max-w-64 overflow-hidden text-ellipsis'>
                <div className='flex gap-1 items-center'>
                  <IconEye
                    className='text-orange-300 p-0.5 rounded-md hover:text-orange-700 cursor-pointer'
                    width={24}
                    height={24}
                  />
                  <IconEdit
                    className='text-blue-300 p-0.5 rounded-md hover:text-blue-700 cursor-pointer'
                    width={24}
                    height={24}
                  />
                  <IconTrashX
                    width={24}
                    height={24}
                    className='p-0.5 rounded-md text-red-300 hover:text-red-700 cursor-pointer'
                    // onClick={() => {
                    //   handleDelete(item._id);
                    // }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
