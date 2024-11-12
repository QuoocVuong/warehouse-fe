import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsBell, BsChevronDown } from 'react-icons/bs';
import { logout} from '../api/auth';

const Header = () => {
    const navigate = useNavigate();
    const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
 
    const [username, setUsername] = useState(null);

   
    const [notificationCount] = useState(0);

    const workspaceRef = useRef(null);
    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = parseJwt(token);
            setUsername(decodedToken.sub);
        }
    }, []);
    useEffect(() => {
      const handleClickOutside = (event) => {
          if (workspaceRef.current && !workspaceRef.current.contains(event.target)) {
              setIsWorkspaceOpen(false);
          }
          if (notificationRef.current && !notificationRef.current.contains(event.target)) {
              setIsNotificationOpen(false);
          }
          if (profileRef.current && !profileRef.current.contains(event.target)) {
              setIsProfileOpen(false);
          }
       
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setUsername(null);
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

   
    return (
        <header className="bg-white p-4 flex  items-center shadow-md sticky top-0 z-10 justify-around">
            <div className="flex items-center">
                <Link to="/">
                    <div className="bg-blue-500 w-8 h-8 rounded-md flex items-center justify-center">
                        <span className="text-white font-bold text-lg">E</span>
                    </div>
                </Link>
            </div>

            <div className="flex items-center space-x-6">
               

                <div className="relative">
                    <button
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                        className="relative  text-gray-700 font-medium py-2 px-4 rounded-lg flex items-center transition duration-150 ease-in-out"
                    >
                        <BsBell className="w-5 h-5 text-gray-500" />
                        {/* Thêm span hiển thị số thông báo mới nếu cần */}
                        {notificationCount > 0 && ( // Hiển thị số thông báo nếu > 0
                            <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {notificationCount}
                            </span>
                        )}
                    </button>
                    {/* Dropdown notification (nếu cần) */}
                    {isNotificationOpen && ( // Hiển thị dropdown khi isNotificationOpen là true
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200" ref={notificationRef}>
                            {/* Nội dung dropdown thông báo */}
                            {/* Ví dụ: */}
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Thông báo 1
                            </a>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Thông báo 2
                            </a>
                            {/* ... */}
                        </div>
                    )}


                </div>

                {/* Dropdown Workspace */}
                <div className="relative" ref={workspaceRef}>
                    <button
                        onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
                        className=" text-gray-700 font-medium py-2 px-4 rounded-lg flex items-center transition duration-150 ease-in-out"
                    >
                        Tùy chỉnh
                        <BsChevronDown className="w-4 h-4 ml-2 transition duration-150 ease-in-out transform" />
                    </button>
                    {isWorkspaceOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                             {/* Nội dung dropdown workspace */}
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Workspace 1
                            </a>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Workspace 2
                            </a>

                        </div>
                    )}
                </div>
                {/* Dropdown Tùy Chỉnh */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className=" text-gray-700 font-medium py-2 px-4 rounded-lg flex items-center transition duration-150 ease-in-out"
                    >
                        Thông tin cá nhân
                        <BsChevronDown className="w-4 h-4 ml-2 transition duration-150 ease-in-out transform" />
                    </button>
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                             {/* Nội dung dropdown Tùy Chỉnh */}
                            <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Profile
                            </a>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Cài đặt
                            </a>
                        </div>
                    )}
                </div>
             

                {username && (
                    <div className="flex items-center">
                        <span className="text-gray-700 mr-2">Xin chào, {username}!</span>
                        <button
                            onClick={handleLogout}
                            className=" hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
                        >
                            Đăng Xuất
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;