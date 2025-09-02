export interface PaginationProps {
  count: number[];
  activePage?: number;
  totalCount?: number;
}

const Pagination = ({
  count,
  activePage = 1,
  totalCount = 3
}: PaginationProps) => {
  return (
    <>
      {totalCount > 8 && (
        <div className='flex items-center justify-between mt-8 mb-4'>
          <button className='font-normal text-md p-2 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer'>
            Previous
          </button>
          <div className='flex gap-2'>
            {count.map((item) => (
              <div
                key={item}
                className={`px-3 py-2 rounded-md cursor-pointer ${
                  activePage === item
                    ? 'bg-blue-500 hover:bg-blue-700'
                    : 'bg-gray-200 hover:bg-gray-400'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <button className='font-normal text-md p-2 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer'>
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
