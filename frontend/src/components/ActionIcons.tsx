import {
  IconCirclePlus,
  IconFileDownload,
  IconFilter2,
} from '@tabler/icons-react';
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { Link } from 'react-router';

interface ActionIconsProps {
  onAdd?: () => void;
  addLink?: boolean;
  onDownload?: () => void;
  filter?: string[];
  selectedFilter?: string;
  setSelectedFilter?: Dispatch<SetStateAction<string>>;
}

const ActionIcons = ({
  onAdd,
  addLink,
  onDownload,
  filter,
  selectedFilter,
  setSelectedFilter,
}: ActionIconsProps) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const dropdownFilterRef = useRef<HTMLDivElement>(null);

  // Close dropdown if click outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownFilterRef.current &&
        !dropdownFilterRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className='flex gap-3 items-center'>
      {Array.isArray(filter) && filter.length > 0 && (
        <div className='relative'>
          <IconFilter2
            width={24}
            height={24}
            className='text-blue-600 hover:text-blue-900 cursor-pointer'
            onClick={() => setFilterOpen(!filterOpen)}
          />
          {filterOpen && (
            <div
              className='absolute top-full right-1 min-w-20 bg-blue-200 p-1 mt-1 rounded'
              ref={dropdownFilterRef}
            >
              <ul className='flex flex-col gap-1'>
                {filter.map((item) => (
                  <li
                    key={item}
                    className={`px-4 py-2 cursor-pointer text-nowrap rounded hover:bg-blue-300 ${
                      item === selectedFilter
                        ? 'text-blue-800 font-semibold'
                        : ''
                    }`}
                    onClick={() => setSelectedFilter?.(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {onAdd && (
        <IconCirclePlus
          width={24}
          height={24}
          className='text-green-600 hover:text-green-900 cursor-pointer'
          onClick={onAdd}
        />
      )}
      {addLink && (
        <Link to='add' aria-label='Add'>
          <IconCirclePlus
            width={24}
            height={24}
            className='text-green-600 hover:text-green-900 cursor-pointer'
          />
        </Link>
      )}
      {onDownload && (
        <IconFileDownload
          width={24}
          height={24}
          className='text-orange-600 hover:text-orange-900 cursor-pointer'
          onClick={onDownload}
        />
      )}
    </div>
  );
};

export default ActionIcons;
