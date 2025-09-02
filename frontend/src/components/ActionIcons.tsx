import {
  IconCirclePlus,
  IconFileDownload,
  IconFilter2,
} from '@tabler/icons-react';
import { Link } from 'react-router';

interface ActionIconsProps {
  onAdd?: () => void;
  addLink?: boolean;
  onDownload?: () => void;
}

const ActionIcons = ({ onAdd, addLink, onDownload }: ActionIconsProps) => {
  return (
    <div className='flex gap-3 items-center'>
      <IconFilter2
        width={24}
        height={24}
        className='text-blue-600 hover:text-blue-900 cursor-pointer'
      />
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
