import React from 'react';
import { FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-800 border-0 font-semibold">
      <div className="container mx-auto py-8 px-4"> {/* Thêm padding cho container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Cột 1: Giới thiệu */}
          <div 
            className="transform hover:scale-105 transition duration-300 ease-in-out rounded-lg p-3" 
            /* Loại bỏ shadow-lg */
          >
            <h3 className="text-sm font-bold mb-2">Về chúng tôi</h3>
            <p className="text-xs text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div 
            className="transform hover:scale-105 transition duration-300 ease-in-out rounded-lg p-3"
            /* Loại bỏ shadow-lg */
          >
            <h3 className="text-sm font-bold mb-2">Liên kết nhanh</h3>
            <ul className="space-y-1">
              <li>
                <a 
                  href="#" 
                  className="text-xs text-gray-600 hover:text-blue-500 transition duration-150 ease-in-out"
                >
                  Trang chủ
                </a>
              </li>
              {/* ...Các liên kết khác... */}
            </ul>
          </div>

          {/* Cột 3: Liên hệ */}
          <div 
            className="transform hover:scale-105 transition duration-300 ease-in-out rounded-lg p-3"
            /* Loại bỏ shadow-lg */
          >
            <h3 className="text-sm font-bold mb-2">Liên hệ</h3>
            <ul className="space-y-1">
              <li className="text-xs text-gray-600">
                <span className="text-gray-600">Địa chỉ:</span> 123 Đường ABC
              </li>
              {/* ...Thông tin liên hệ khác... */}
            </ul>
          </div>

          {/* Cột 4: Mạng xã hội */}
          <div 
            className="transform hover:scale-105 transition duration-300 ease-in-out rounded-lg p-3"
            /* Loại bỏ shadow-lg */
          >
            <h3 className="text-sm font-bold mb-2">Theo dõi chúng tôi</h3>
            <div className="flex space-x-2">
              <a 
                href="#" 
                className="text-gray-600 hover:text-blue-500 transform hover:scale-110 transition duration-150 ease-in-out" 
              >
                <FaFacebook size={16} />
              </a>
              {/* ...Các mạng xã hội khác... */}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-gray-800">
          <p className="text-xs">© {new Date().getFullYear()} My React App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;