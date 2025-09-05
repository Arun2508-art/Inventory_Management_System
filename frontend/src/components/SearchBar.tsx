import { IconSearch } from '@tabler/icons-react';

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar = ({ placeholder }: SearchBarProps) => {
  return (
    <form className='flex rounded-md px-2 py-1 items-center gap-1 border border-violet-500'>
      <button className='text-info' aria-label='search icon'>
        <IconSearch width={20} height={16} className='text-violet-500' />
      </button>
      <input
        type='search'
        name='navbar-search'
        placeholder={placeholder ? `Search by ${placeholder}...` : 'Search...'}
        className='outline-none bg-transparent flex-1 text-black md:min-w-60'
        autoComplete='off'
      />
    </form>
  );
};

export default SearchBar;
