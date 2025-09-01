import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { NavLink } from 'react-router';
import { menuItems } from '../utills/sidebar';

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <div className='px-4 mt-1 text-sm h-[calc(100vh-72px)] overflow-auto sidebar-scroll'>
      {menuItems.map((list, index) => (
        <aside key={index} className='flex flex-col gap-3 mb-4'>
          {list.items.map((item) =>
            item.options ? (
              <div key={item.label} className='flex flex-col gap-2'>
                <div
                  className='flex items-center justify-center lg:justify-between gap-3 py-2 md:px-2 rounded-md text-gray-500 hover:bg-sky-100'
                  onClick={() => toggleSubmenu(item.label)}
                >
                  <div className='flex items-center justify-center gap-3'>
                    <img
                      src={item.icon}
                      width={20}
                      height={20}
                      alt={item.label}
                    />
                    <div className='hidden lg:block'>{item.label}</div>
                  </div>
                  <IconChevronDown
                    stroke={1}
                    width={14}
                    height={14}
                    className={`${
                      openSubmenu === item.label ? 'rotate-180' : 'rotate-0'
                    } transition-transform`}
                  />
                </div>
                <nav
                  className={`flex flex-col gap-1 overflow-hidden transition-max-height duration-300 ease-in-out ml-6 ${
                    openSubmenu === item.label ? 'max-h-96' : 'max-h-0'
                  }`}
                >
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
                </nav>
              </div>
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
