import React from 'react';
import { Link } from 'react-router-dom';

const MastersAndReports = () => {
  const mastersData = [
    {
      title: 'Hàng hóa và giá cả',
      items: [
        { name: 'Sản phẩm', link: '/products' },
        { name: 'Nhóm hàng', link: '/item-groups' },
        { name: 'Sản phẩm lỗ', link: '/loss-making-products' },
        { name: 'Bảng giá', link: '/price-lists' },
        { name: 'Giá sản phẩm', link: '/product-prices' },
        { name: 'Quy tắc giao hàng', link: '/delivery-rules' },
        { name: 'Quy tắc định giá', link: '/pricing-rules' },
        { name: 'Mục Thay thế', link: '/substitutes' },
        { name: 'mực Nhà sản xuất', link: '/manufacturers' },
        { name: 'Số thuê hải quan', link: '/customs-tariffs' },
      ],
    },
    {
      title: 'Giao dịch hàng tồn kho',
      items: [
        { name: 'Yêu cầu nguyên liệu', link: '/material-requests' },
        { name: 'Chứng từ kho', link: '/warehouse-documents' },
        { name: 'Phiếu giao hàng', link: '/delivery-orders' },
        { name: 'Biên lai nhận hàng', link: '/goods-receipts' },
        { name: 'Danh sách lựa chọn', link: '/selection-lists' },
        { name: 'Giao hàng tận nơi', link: '/on-site-delivery' },
      ],
    },
    {
      title: 'Báo cáo hàng tồn kho',
      items: [
        { name: 'Số cái hàng tồn kho', link: '/stock-items-report' },
        { name: 'Số tồn kho', link: '/stock-quantities-report' },
        { name: 'Dự kiến số lượng tồn kho', link: '/projected-stock-report' },
        { name: 'Tóm tắt cổ phiếu', link: '/stock-summary-report' },
        { name: 'Hàng tồn kho cũ dần', link: '/aging-stock-report' },
        { name: 'Giá cổ phiếu', link: '/stock-value-report' },
      ],
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md ">
      <h2 className="text-lg font-bold mb-4">Masters & Reports</h2>
      <div className="grid grid-cols-3 gap-4">
        {mastersData.map((section, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg transform hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out" 
          >
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              {section.title}
            </h3>
            <ul className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link to={item.link} className="flex items-center no-underline text-gray-700 hover:text-blue-500">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      {(itemIndex < 3 && index !== 2) ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      ) : (
                        <circle cx="12" cy="12" r="5" fill="currentColor" />
                      )}
                    </svg>
                    <span className="text-base">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MastersAndReports;