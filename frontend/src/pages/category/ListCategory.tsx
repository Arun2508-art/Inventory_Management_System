import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ActionIcons from '../../components/ActionIcons';
import Container from '../../components/Container';
import Drawer from '../../components/Drawer';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import Table1, { type Column } from '../../components/Table1';
import {
  deleteCategory,
  fetchAllCategory,
} from '../../store/slice/categorySlice';
import { catergoryFilter } from '../../utills/filterData';
import { useAppDispatch, useAppSelector } from '../../utills/reduxHook';
import type { CategoryProps } from '../../utills/types';
import AddCategory from './AddCategory';
import UpdateCategory from './UpdateCategory';

const columns: Column<CategoryProps>[] = [
  {
    key: 'name',
    label: 'Name',
    sort: true,
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
  { key: 'sku', label: 'Category ID' },
  { key: 'description', label: 'Description' },
];

const ListCategory = () => {
  const [open, setOpen] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [initialState, setInitialState] = useState<CategoryProps>({
    name: '',
    sku: '',
    description: '',
    _id: '',
  });
  const [filterText, setFilterText] = useState('Name');
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

  const handleEdit = (data: CategoryProps) => {
    setInitialState(data);
    setOpenUpdateForm(true);
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  return (
    <>
      <Container title='Categories'>
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
                filter={catergoryFilter}
                selectedFilter={filterText}
                setSelectedFilter={setFilterText}
              />
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
                  onEdit={handleEdit}
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
      </Container>

      <Drawer title='Add Category' isOpen={open} onClose={() => setOpen(false)}>
        <AddCategory isOpen={open} onSuccess={() => setOpen(false)} />
      </Drawer>
      <Drawer
        title='Update Category'
        isOpen={openUpdateForm}
        onClose={() => setOpenUpdateForm(false)}
      >
        <UpdateCategory
          isOpen={openUpdateForm}
          onSuccess={() => setOpenUpdateForm(false)}
          initialState={initialState}
          setInitialState={setInitialState}
        />
      </Drawer>
    </>
  );
};

export default ListCategory;
