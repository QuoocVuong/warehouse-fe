import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const Header = () => {
  return (
    <header className="bg-white p-4 flex justify-between items-center shadow-md ">
      <div className="flex items-center">
        <Link to="/"> {/* Liên kết đến trang chủ */}
          <div className="bg-blue-500 w-8 h-8 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
        </Link>
        <Link to="/" className="ml-2"> {/* Thêm Link cho h1 */}
          <h1 className="text-lg font-bold text-gray-800 ">Kho</h1> 
        </Link>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Tìm Kiếm Hoặc Gõ Lệnh (Ctrl + G)"
          />
          <svg
            className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <Link to="/notifications"> {/* Liên kết đến trang thông báo */}
          <svg
            className="w-5 h-5 text-gray-500 ml-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.015 2.015 0 0118 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V13a2.015 2.015 0 011.405-1.405L21 7m0 4h-5" />
          </svg>
        </Link>
        <div className="relative ml-4">
          <Link to="/help"> {/* Liên kết đến trang trợ giúp */}
            <button className="bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg flex items-center">
              Trợ Giúp
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </Link>
          <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded-full">
            2
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;