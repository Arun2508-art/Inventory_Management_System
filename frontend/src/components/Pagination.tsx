import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export interface PaginationProps {
  count: number[];
  activePage?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  itemsPerPageOptions?: number[];
  itemsPerPage?: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

const Pagination = ({
  count,
  activePage = 1,
  totalCount = 3,
  onPageChange,
  itemsPerPageOptions = [5, 10, 20],
  itemsPerPage = 10,
  onItemsPerPageChange,
}: PaginationProps) => {
  const handlePrev = () => {
    if (activePage > 1) onPageChange?.(activePage - 1);
  };

  const handleNext = () => {
    if (activePage < totalCount) onPageChange?.(activePage + 1);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = Number(e.target.value);
    onItemsPerPageChange?.(value);
  };

  return (
    <div className='flex items-center justify-between my-4 p-4'>
      {/* Left side page info */}
      <div className='text-sm font-medium text-gray-700'>
        Page {activePage} of {totalCount}
      </div>

      {/* Center */}
      <div className='flex gap-1 items-center'>
        {activePage !== 1 && (
          <button
            onClick={handlePrev}
            className='w-7 h-7 flex items-center justify-center rounded-md cursor-pointer hover:bg-blue-200'
            aria-label='Previous page'
          >
            <IconChevronLeft width={18} height={18} />
          </button>
        )}

        {count.map((item) => (
          <button
            key={item}
            onClick={() => onPageChange?.(item)}
            className={`w-7 h-7 flex items-center justify-center rounded-md cursor-pointer hover:bg-blue-200 ${
              activePage === item ? 'text-blue-700' : ''
            }`}
            aria-current={activePage === item ? 'page' : undefined}
            aria-label={`Go to page ${item}`}
          >
            {item}
          </button>
        ))}

        {activePage !== totalCount && (
          <button
            onClick={handleNext}
            className='w-7 h-7 flex items-center justify-center rounded-md cursor-pointer hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed'
            aria-label='Next page'
          >
            <IconChevronRight width={18} height={18} />
          </button>
        )}
      </div>

      {/* Right pagination controls */}
      <div className='flex gap-1 items-center'>
        <label
          htmlFor='itemsPerPage'
          className='text-sm font-medium text-gray-700'
        >
          Items per page:
        </label>
        <select
          id='itemsPerPage'
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className='p-0.5 rounded outline-blue-300 cursor-pointer'
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
