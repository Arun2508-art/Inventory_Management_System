import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ActionIcons from '../../components/ActionIcons';
import Drawer from '../../components/Drawer';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import Table1, { type Column } from '../../components/Table1';
import {
  deleteCategory,
  fetchAllCategory,
} from '../../store/slice/categorySlice';
import { useAppDispatch, useAppSelector } from '../../utills/reduxHook';
import type { CategoryProps } from '../../utills/types';
import AddCategory from './AddCategory';

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

const ListCategory = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { categoryList, isLoading, error } = useAppSelector(
    (state) => state.categoryData
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(categoryList.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPageItems = categoryList.slice(startIndex, endIndex);

  const handleDelete = async (data: CategoryProps) => {
    const result = await dispatch(deleteCategory(data._id));
    if (deleteCategory.fulfilled.match(result)) {
      toast.success('Category deleted successfully');
    }
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  return (
    <>
      <div className='w-full min-h-[calc(100vh-72px)] bg-blue-50 p-4'>
        <h2 className='font-semibold text-xl mb-4'>Categories</h2>

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
              {/* <div className='flex gap-3 items-center'>
                <IconFilter2 className='text-blue-600 hover:text-blue-900 cursor-pointer' />

                <IconCirclePlus
                  className='text-green-600 hover:text-green-900 cursor-pointer'
                  onClick={() => setOpen(true)}
                />

                <IconFileDownload className='text-orange-600 hover:text-orange-900 cursor-pointer' />
              </div> */}
              <ActionIcons onAdd={() => setOpen(true)} />
            </div>

            {currentPageItems.length === 0 ? (
              <p className='h-[calc(100vh-150px)] flex justify-center items-center'>
                No categories available.
              </p>
            ) : (
              <>
                <Table1<CategoryProps>
                  columns={columns}
                  data={currentPageItems}
                  showCheckboxes
                  onEdit={(row) => console.log('Edit', row)}
                  onDelete={handleDelete}
                />
                <Pagination
                  count={pageNumbers}
                  activePage={currentPage}
                  totalCount={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPageOptions={[5, 10, 20, 50]}
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={(newItemsPerPage) => {
                    setItemsPerPage(newItemsPerPage);
                    setCurrentPage(1); // reset to page 1 on items per page change
                  }}
                />
              </>
            )}
          </div>
        )}
      </div>

      <Drawer title='Add Category' isOpen={open} onClose={() => setOpen(false)}>
        <AddCategory onSuccess={() => setOpen(false)} />
      </Drawer>
    </>
  );
};

export default ListCategory;
