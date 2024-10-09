import React from 'react';
import { Link } from 'react-router-dom';

const QuickAccess = () => {
  const accessItems = [
    { title: 'Sản phẩm', info: '104 Available', color: 'green', link: '/products' },
    { title: 'Yêu cầu nguyên liệu', info: '1 Pending', color: 'yellow', link: '/material-requests' },
    { title: 'Chứng từ kho', info: '', color: 'gray', link: '/warehouse-documents' },
    { title: 'Biên lai nhận hàng', info: '4 To Bill', color: 'yellow', link: '/goods-receipts' },
    { title: 'Phiếu giao hàng', info: '1 To Bill', color: 'yellow', link: '/delivery-orders' },
    { title: 'Số cái hàng tồn kho', info: '', color: 'gray', link: '/stock-items' },
    { title: 'Số tồn kho', info: '', color: 'gray', link: '/stock-quantities' },
    { title: 'Bảng Thông Tin Tổng Hợp', info: '', color: 'gray', link: '/summary-reports' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Quick Access</h2>
      <div className="grid grid-cols-3 gap-4">
        {accessItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.link} 
            className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out no-underline" 
          >
            <div className="flex justify-between items-center">
              <h3 className="text-md font-bold text-gray-800">{item.title}</h3> 
              <span
                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                  item.color === 'green'
                    ? 'bg-green-100 text-green-800'
                    : item.color === 'yellow'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {item.info ? `• ${item.info}` : ''}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;