import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsBell, BsSearch, BsChevronDown } from 'react-icons/bs';

const Header = () => {
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <header className="bg-white p-4 flex justify-between items-center shadow-md sticky top-0 z-10">
      {/* Logo và tiêu đề */}
      <div className="flex items-center">
        <Link to="/">
          <div className="bg-blue-500 w-8 h-8 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
        </Link>
      </div>

      {/* Thanh tìm kiếm và các dropdown */}
      <div className="flex items-center space-x-6">
        {/* Thanh tìm kiếm */}
        <div className="relative flex items-center">
          <input
            type="text"
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-500 transition duration-150 ease-in-out"
            placeholder="Tìm Kiếm Hoặc Gõ Lệnh (Ctrl + G)"
          />
          <BsSearch className="w-5 h-5 text-gray-500 absolute left-3" />
        </div>

        {/* Dropdown Thông báo */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg flex items-center transition duration-150 ease-in-out"
          >
            <BsBell className="w-5 h-5 text-gray-500" />
            <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              2
            </span>
          </button>
        </div>

        {/* Dropdown Workspace */}
        <div className="relative">
          <button
            onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
            className="bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg flex items-center transition duration-150 ease-in-out"
          >
            Workspaces
            <BsChevronDown className="w-4 h-4 ml-2 transition duration-150 ease-in-out transform" />
          </button>
        </div>

        {/* Dropdown Tài khoản */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg flex items-center transition duration-150 ease-in-out"
          >
            Tùy Chỉnh
            <BsChevronDown className="w-4 h-4 ml-2 transition duration-150 ease-in-out transform" />
          </button>
        </div>

        {/* Dropdown Trợ giúp */}
        <div className="relative">
          <button
            onClick={() => setIsHelpOpen(!isHelpOpen)}
            className="bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg flex items-center transition duration-150 ease-in-out"
          >
            Trợ Giúp
            <BsChevronDown className="w-4 h-4 ml-2 transition duration-150 ease-in-out transform" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;