import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineCalendar, AiOutlineShoppingCart } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { useStateContext } from '../contexts/ContextProvider';
import { MdOutlineCancel } from 'react-icons/md';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'todays quotes',
          icon: <AiOutlineCalendar />,
        },
      ],
    },
  
    {
      title: 'Orders',
      links: [
        {
          name: 'new quote',
          icon: <AiOutlineShoppingCart />,
        },
        {
          name: 'existing quotes',
          icon: <FiShoppingBag />,
        },
      ],
    },
  ];

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden float-right"
              >
                <MdOutlineCancel />
              </button>
          <div className="mt-20">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name.split(' ').join('')}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;