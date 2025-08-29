import { IconEdit, IconEye, IconTrashX } from '@tabler/icons-react';
import Checkbox from './Checkbox';

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  showCheckboxes?: boolean;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

const Table1 = <T,>({
  columns,
  data,
  showCheckboxes = false,
  onView,
  onEdit,
  onDelete,
}: TableProps<T>) => {
  return (
    <div className='overflow-x-auto max-w-full rounded-b-md'>
      <table className='table-fixed border-collapse bg-white min-w-full'>
        <thead>
          <tr className='h-[45px] text-base border-b border-gray-200'>
            {showCheckboxes && (
              <th className='text-left px-3'>
                <Checkbox />
              </th>
            )}
            {columns.map((col) => (
              <th key={String(col.key)} className='text-left font-medium px-3'>
                {col.label}
              </th>
            ))}
            {(onView || onEdit || onDelete) && (
              <th className='text-left font-medium px-3'>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className='h-[55px] text-sm border-gray-200 border-b last:border-0 hover:bg-gray-50'
            >
              {showCheckboxes && (
                <td className='px-3'>
                  <input type='checkbox' />
                </td>
              )}
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className='px-3 text-nowrap max-w-64 overflow-hidden text-ellipsis'
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key])}
                </td>
              ))}
              {(onView || onEdit || onDelete) && (
                <td className='px-3 text-nowrap max-w-64 overflow-hidden text-ellipsis'>
                  <div className='flex gap-1 items-center'>
                    {onView && (
                      <IconEye
                        className='text-orange-300 p-0.5 rounded-md hover:text-orange-700 cursor-pointer'
                        width={24}
                        height={24}
                        onClick={() => onView(row)}
                      />
                    )}
                    {onEdit && (
                      <IconEdit
                        className='text-blue-300 p-0.5 rounded-md hover:text-blue-700 cursor-pointer'
                        width={24}
                        height={24}
                        onClick={() => onEdit(row)}
                      />
                    )}
                    {onDelete && (
                      <IconTrashX
                        width={24}
                        height={24}
                        className='p-0.5 rounded-md text-red-300 hover:text-red-700 cursor-pointer'
                        onClick={() => onDelete(row)}
                      />
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table1;
