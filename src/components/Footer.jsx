import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cột 1: Giới thiệu */}
          <div className="shadow-md rounded-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam
              ultricies, nisl nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.
            </p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className="shadow-md rounded-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-500 transition duration-150 ease-in-out">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-500 transition duration-150 ease-in-out">
                  Sản phẩm
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-500 transition duration-150 ease-in-out">
                  Dịch vụ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-500 transition duration-150 ease-in-out">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Liên hệ */}
          <div className="shadow-md rounded-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-600">Địa chỉ:</span> 123 Đường ABC, Quận XYZ, TP.HCM
              </li>
              <li>
                <span className="text-gray-600">Điện thoại:</span> (028) 123 4567
              </li>
              <li>
                <span className="text-gray-600">Email:</span> contact@example.com
              </li>
            </ul>
          </div>

          {/* Cột 4: Mạng xã hội */}
          <div className="shadow-md rounded-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-500 transform hover:scale-110 transition duration-150 ease-in-out">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transform hover:scale-110 transition duration-150 ease-in-out">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transform hover:scale-110 transition duration-150 ease-in-out">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transform hover:scale-110 transition duration-150 ease-in-out">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-gray-600">
          <p>© {new Date().getFullYear()} My React App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;