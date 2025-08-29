import { IconChevronDown } from '@tabler/icons-react';
import { NavLink } from 'react-router';
import { menuItems } from '../utills/sidebar';

const Sidebar = () => {
  return (
    <div className='px-4 mt-1 text-sm h-[calc(100vh-72px)] overflow-auto sidebar-scroll'>
      {menuItems.map((list, index) => (
        <aside key={index} className='flex flex-col gap-3'>
          {list.items.map((item) =>
            item.options ? (
              <>
                <div className='flex items-center justify-center lg:justify-between gap-3 py-2 md:px-2 rounded-md text-gray-500 hover:bg-sky-100 '>
                  <div className='flex items-center justify-center gap-3'>
                    <img
                      src={item.icon}
                      width={20}
                      height={20}
                      alt={item.label}
                    />
                    <div className='hidden lg:block'>{item.label}</div>
                  </div>
                  <div>
                    <IconChevronDown stroke={1} width={14} height={14} />
                  </div>
                </div>
                {item.options.map((item) => (
                  <NavLink
                    to={item.href}
                    key={item.label}
                    className={({ isActive, isPending, isTransitioning }) =>
                      `flex items-center justify-center lg:justify-start gap-3 py-2 md:px-2 rounded-md text-gray-500 hover:bg-sky-100 ${
                        isActive ? 'bg-blue-100' : ''
                      } ${isPending ? 'bg-red-500' : ''} ${
                        isTransitioning ? 'bg-amber-500' : ''
                      }`
                    }
                  >
                    <div className='hidden lg:block'>{item.label}</div>
                  </NavLink>
                ))}
              </>
            ) : (
              <NavLink
                to={item.href}
                key={item.label}
                className={({ isActive, isPending, isTransitioning }) =>
                  `flex items-center justify-center lg:justify-start gap-3 py-2 md:px-2 rounded-md text-gray-500 hover:bg-sky-100 ${
                    isActive ? 'bg-blue-100' : ''
                  } ${isPending ? 'bg-red-500' : ''} ${
                    isTransitioning ? 'bg-amber-500' : ''
                  }`
                }
              >
                <img src={item.icon} width={20} height={20} alt={item.label} />

                <div className='hidden lg:block'>{item.label}</div>
              </NavLink>
            )
          )}
        </aside>
      ))}
    </div>
  );
};

export default Sidebar;
