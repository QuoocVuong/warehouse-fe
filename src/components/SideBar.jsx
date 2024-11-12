import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { 
  FaBuilding, 
  FaCogs, 
  FaExchangeAlt, 
  FaTools, 
  FaUsers,FaHome, FaMoneyBillWave, FaShoppingCart, FaShoppingBasket, FaChartBar, FaUserTie, FaCreditCard, FaMoneyCheckAlt, FaFolder, FaShieldAlt, FaChartLine, FaBox, FaHeadset, FaGlobe, FaFolderOpen,FaHammer
} from 'react-icons/fa'; 

const SideBar = () => {
  const [activeItem, setActiveItem] = useState('Kho');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'Trang Chủ', icon: <FaHome />, link: '/dashboard' },
    { name: 'Kế toán', icon: <FaMoneyBillWave />, link: '/accounting' },
    { name: 'Tài sản', icon: <FaShoppingCart />, link: '/assets' },
    { name: 'Build', icon: <FaTools />, link: '/build' },
    { name: 'Mua hàng', icon: <FaShoppingBasket />, link: '/purchasing' },
    { name: 'CRM', icon: <FaChartBar />, link: '/crm' },
    { name: 'Nhân Sự', icon: <FaUserTie />, link: '/hr' },
    { name: 'Khoản Vay', icon: <FaCreditCard />, link: '/loans' },
    { name: 'Bảng Lương', icon: <FaMoneyCheckAlt />, link: '/payroll' },
    { name: 'Dự án', icon: <FaFolder />, link: '/projects' },
    { name: 'Chất lượng', icon: <FaShieldAlt />, link: '/quality' },
    { name: 'Bán hàng', icon: <FaChartLine />, link: '/sales' },
    { name: 'Kho', icon: <FaBox />, link: '/' },
    { name: 'Hỗ trợ', icon: <FaHeadset />, link: '/support' },
    { name: 'Website', icon: <FaGlobe />, link: '/website' },
    { name: 'Cài Đặt', icon: <FaCogs />, link: '/settings' },
    { name: 'Tiện ích', icon: <FaFolderOpen />, link: '/utilities' },
  ];

  const domainItems = [
    { name: 'Sản xuất', icon: <FaBuilding />, link: '/domain/production' },
  ];

  const adminItems = [
    { name: 'Tùy biến', icon: <FaHammer />, link: '/admin/customization' },
    { name: 'Tích hợp', icon: <FaExchangeAlt />, link: '/admin/integration' },
    { name: 'Công cụ', icon: <FaTools />, link: '/admin/tools' },
    { name: 'Người sử dụng', icon: <FaUsers />, link: '/admin/users' },
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
      className={`bg-white rounded-lg w-64 transition-transform duration-300 ease-in-out hover:scale-105  h-fit  z-10
        md:relative md:translate-x-0 md:h-auto`} // Thay đổi h-screen thành h-fit, bỏ fixed và top-16
     
      >
        {/* Bộ phận */}
        <h3 className="text-gray-600 uppercase text-sm font-semibold px-4 py-3 mt-8">Bộ Phận</h3>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className={`flex items-center px-4 py-2 rounded-lg group hover:bg-gray-100  transform hover:scale-105 transition-all duration-200 text-gray-700 relative ${
                  activeItem === item.name ? 'bg-gray-200 shadow-inner' : ''
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
                {activeItem === item.name && (
                    <span className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-lg"></span>
                  )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Tên miền */}
        <h3 className="text-gray-600 uppercase text-sm font-semibold px-4 py-3 mt-8">Tên miền</h3>
        <ul className="space-y-2">
          {domainItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className={`flex items-center px-4 py-2 rounded-lg group hover:bg-gray-100  transform hover:scale-105 transition-all duration-200 text-gray-700`}
                onClick={() => {
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

        {/* Quản trị */}
        <h3 className="text-gray-600 uppercase text-sm font-semibold px-4 py-3 mt-8">Quản trị</h3>
        <ul className="space-y-2">
          {adminItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className={`flex items-center px-4 py-2 rounded-lg group hover:bg-gray-100  transform hover:scale-105 transition-all duration-200 text-gray-700`}
                onClick={() => {
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