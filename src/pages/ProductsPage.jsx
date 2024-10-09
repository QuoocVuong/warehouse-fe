import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaPlus, FaEllipsisV } from 'react-icons/fa';
import Header from '../components/Header';

const ProductsPage = () => {
  const [filterOptions, setFilterOptions] = useState({
    'Được Giao Cho': false,
    'Được Tạo Bởi': false,
    'Nhân': false,
    'Hiện Nhân': false,
  });

  const productData = [
    { trangThai: 'Đã bật', nhomHang: '09', ten: '456' },
    { trangThai: 'Đã bật', nhomHang: '09', ten: 'lj' },
    { trangThai: 'Đã bật', nhomHang: '09', ten: '1777' },
    { trangThai: 'Đã bật', nhomHang: '09', ten: 'kjnkjn' },
    { trangThai: 'Đã bật', nhomHang: '09', ten: 'CD213298' },
    { trangThai: 'Đã bật', nhomHang: '12', ten: '22a23' },
    { trangThai: 'Đã bật', nhomHang: '12', ten: 'CD313' },
    { trangThai: 'Đã bật', nhomHang: '12', ten: 'Tunee' },
    { trangThai: 'Đã bật', nhomHang: '12', ten: 'sectoy' },
    { trangThai: 'Đã bật', nhomHang: '12', ten: 'quan ao' },
    { trangThai: 'Đã bật', nhomHang: '12', ten: '576373467' },
    { trangThai: 'Đã bật', nhomHang: '123', ten: '99' },
    { trangThai: 'Đã bật', nhomHang: '123', ten: '002' },
    { trangThai: 'Đã bật', nhomHang: '123', ten: '003' },
  ];

//   const filterItems = [
//     'Có biến thể', 
//     'Tên mục', 
//     '456', 
//     'lj',
//     'khẩu trang', 
//     'lkmlk', 
//     'HONGCO', 
//     'nhom6', 
//     'Tunne', 
//     'Micro', 
//     'sectoy', 
//     'ao khoac', 
//     '576373467', 
//     'Xe máy', 
//     'Iphone', 
//     '003'
//   ];

  const toggleFilter = (option) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  return (
    <main className="flex-1 p-8">
        <Header />
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Sản phẩm</h2>
        <div className="flex items-center">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg mr-2 flex items-center">
            <FaFilter className="mr-2" /> Xem Kiểu Danh Sách
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg mr-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg mr-2">
            <FaEllipsisV />
          </button>
          <Link to="/add-product" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center">
            <FaPlus className="mr-2" /> Thêm Sản phẩm
          </Link>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex mb-4">
        <div className="w-1/4 mr-4">
          <h3 className="text-md font-bold mb-2">Lọc Theo</h3>
          <ul className="space-y-2">
            {Object.keys(filterOptions).map((option) => (
              <li key={option}>
                <button
                  onClick={() => toggleFilter(option)}
                  className={`flex items-center w-full px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${filterOptions[option] ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  <svg
                    className={`w-4 h-4 mr-2 ${filterOptions[option] ? 'text-blue-500' : 'text-gray-400'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {filterOptions[option] ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    )}
                  </svg>
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h3 className="text-md font-bold mb-2">Lưu Bộ Lọc</h3>
            <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tên Bộ Lọc" />
          </div>
        </div>
        {/* Search and Filter Inputs */}
        <div className="w-3/4 flex">
          <div className="w-1/3 mr-2">
            <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tên" />
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Có biến thể</span>
              </label>
            </div>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Tên mục</span>
              </label>
            </div>
          </div>
          <div className="w-1/3 mr-2">
            <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Biến thể của" />
          </div>
          <div className="w-1/3">
            <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tên mục" />
            <div className="mt-2">
              <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhóm hàng" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 text-blue-700 font-bold py-2 px-4 rounded-lg mr-2 flex items-center">
          <FaFilter className="mr-2" /> 1 Bộ Lọc Sử Dụng
        </div>
        <div className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg flex items-center">
          <FaFilter className="mr-2" /> Nhóm hàng
        </div>
      </div>

      {/* Product List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng Thái
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nhóm hàng
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productData.map((product, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    • {product.trangThai}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.nhomHang}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.ten}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  -
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  3M <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg> 0 <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg> 0
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-blue-600 hover:text-blue-900">
                  <Link to={`/edit-product/${product.id}`}> 
                  Chỉnh sửa
                  </Link>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-sm text-gray-500 mt-4">20 trong tổng số 104</div>
      </div>
    </div>
    </main>
  );
};

export default ProductsPage;