import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { FaBars } from 'react-icons/fa';

const SideBar = () => {
  const [activeItem, setActiveItem] = useState('Kho');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  const menuItems = [
    { name: 'Trang Chủ', icon: '⚙️', link: '/dashboard' }, 
    { name: 'Kế toán', icon: '💰', link: '/accounting' }, 
    { name: 'Tài sản', icon: '🛍️', link: '/assets' }, 
    { name: 'Build', icon: '🛠️', link: '/build' }, 
    { name: 'Mua hàng', icon: '🛒', link: '/purchasing' }, 
    { name: 'CRM', icon: '📊', link: '/crm' }, 
    { name: 'Nhân Sự', icon: '💼', link: '/hr' }, 
    { name: 'Khoản Vay', icon: '💳', link: '/loans' }, 
    { name: 'Bảng Lương', icon: '💵', link: '/payroll' }, 
    { name: 'Dự án', icon: '📁', link: '/projects' },
    { name: 'Chất lượng', icon: '🛡️', link: '/quality' }, 
    { name: 'Bán hàng', icon: '📈', link: '/sales' }, 
    { name: 'Kho', icon: '📦', link: '/inventory' },
    { name: 'Hỗ trợ', icon: '🎧', link: '/support' },
    { name: 'Website', icon: '🌐', link: '/website' },
    { name: 'Cài Đặt', icon: '⚙️', link: '/settings' }, 
    { name: 'Tiện ích', icon: '📂', link: '/utilities' }, 
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false); 
      } else {
        setIsSidebarOpen(true); 
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Nút hamburger */}
      <button 
        className="fixed top-4 left-4 z-20 md:hidden" 
        onClick={toggleSidebar}
      >
        <FaBars className="text-gray-800" size={24} />
      </button>

      {/* Sidebar */}
      <div 
        className={`bg-white shadow-md rounded-lg w-64 transition-transform duration-300 ease-in-out hover:scale-105 fixed top-16 left-0 h-screen z-10 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:h-auto`}
      >
        <h2 className="text-lg font-bold p-4">Kho</h2> 
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className={`flex items-center px-4 py-2 rounded-lg group hover:bg-gray-100 text-gray-700 transition-colors duration-200 ${
                  activeItem === item.name ? 'bg-gray-200' : ''
                }`}
                onClick={() => {
                  setActiveItem(item.name);
                  if (window.innerWidth < 768) { 
                    setIsSidebarOpen(false); 
                  }
                }}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isSidebarOpen && window.innerWidth < 768 && ( 
        <div 
          className="fixed inset-0 bg-black opacity-50 z-10" 
          onClick={toggleSidebar} 
        ></div>
      )}
    </div>
  );
};

export default SideBar;