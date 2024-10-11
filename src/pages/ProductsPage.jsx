import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaPlus, FaEllipsisV, FaRegHeart } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import SideBar from '../components/SideBar';

const ProductsPage = () => {
  const [filterOptions, setFilterOptions] = useState({
    'Được Giao Cho': false,
    'Được Tạo Bởi': false,
    'Nhân': false,
    'Hiện Nhân': false,
  });

  const productData = [
    { trangThai: 'Đã bật', nhomHang: '09', ten: '456', time: '3M' },
    { trangThai: 'Đã bật', nhomHang: '09', ten: 'lj', time: '3M' },
    { trangThai: 'Đã bật', nhomHang: '09', ten: '1777', time: '2M' },
    { trangThai: 'Đã bật', nhomHang: '09', ten: 'kjnkjn', time: '3M' },
    { trangThai: 'Đã bật', nhomHang: '09', ten: 'CD213298', time: '3M' },
    { trangThai: 'Đã bật', nhomHang: '12', ten: '22a23', time: '3M' },
    { trangThai: 'Đã bật', nhomHang: '12', ten: 'CD313', time: '3M' },
    { trangThai: 'Đã bật', nhomHang: '12', ten: 'Tunee', time: '3M' },
    { trangThai: 'Đã bật', nhomHang: '12', ten: 'sectoy', time: '3M' },
    { trangThai: 'Đã bật', nhomHang: '12', ten: 'quan ao', time: '3M' },
    { trangThai: 'Đã bật', nhomHang: '12', ten: '576373467', time: '3M' },
    { trangThai: 'Đã bật', nhomHang: '123', ten: '99', time: '2M' },
    { trangThai: 'Đã bật', nhomHang: '123', ten: '002', time: '1w' },
    { trangThai: 'Đã bật', nhomHang: '123', ten: '003', time: '2M' },
  ];

  const filterItems = [
    'Có biến thể',
    'Tên mục',
    '456',
   
  ];

  const toggleFilter = (option) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };
return (
  <div className="flex flex-col min-h-screen mx-auto max-w-[1200px]">
    <header className="bg-gray-100 p-4 sticky top-0 z-10">
      <Header />
    </header>

    <div className="flex-grow flex justify-center items-center"> {/* Bọc main và thêm flex-grow, justify-center, items-center */}
      <main className="flex  p-4 "> {/* Bỏ items-center từ main */}
        <div className="flex gap-4 h-full w-full items-center">
          {/* Sidebar - Sticky và top-0 */}
          {/* <div className="w-[200px] sticky top-0"> 
            <SideBar className="bg-gray-200 p-4 rounded-md shadow-md" /> 
          </div> */}

          {/* Khu vực chính */}
          <div className="flex-1 ">
            <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Title and Buttons */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Sản phẩm</h2>
          <div className="flex">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mr-2 flex items-center transition duration-150 ease-in-out">
              <FaFilter className="mr-2 text-sm" /> Xem Kiểu Danh Sách
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mr-2 transition duration-150 ease-in-out">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mr-2 transition duration-150 ease-in-out">
              <FaEllipsisV className="text-sm" />
            </button>
            <Link to="/add-product" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md flex items-center transition duration-150 ease-in-out">
              <FaPlus className="mr-2 text-sm" /> Thêm Sản phẩm
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex mb-6">
          {/* Left Filters */}
          <div className="w-1/4 mr-4">
            <h3 className="text-md font-bold text-gray-700 mb-2">Lọc Theo</h3>
            <ul className="space-y-2">
              {Object.keys(filterOptions).map((option) => (
                <li key={option}>
                  <button
                    onClick={() => toggleFilter(option)}
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out 
                      ${filterOptions[option] ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
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

            {/* Save Filter Section */}
            <div className="mt-4">
              <h3 className="text-md font-bold text-gray-700 mb-2">Lưu Bộ Lọc</h3>
              <input 
                type="text" 
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out" 
                placeholder="Tên Bộ Lọc" 
              />
            </div>
          </div>

          {/* Right Filters */}
          <div className="w-3/4 flex space-x-4">
            {/* Input columns */}
            {[
              ['Tên', 'Có biến thể', 'Tên mục'], 
              ['Biến thể của'], 
              ['Tên mục', 'Nhóm hàng'],
            ].map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col w-1/3">
                {column.map((placeholder, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="text"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      placeholder={placeholder}
                    />
                    {placeholder === 'Có biến thể' && (
                      <label className="inline-flex items-center ml-2">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Filters with Heart Icons */}
        <div className="w-1/4 mr-4">
          <ul className="space-y-2">
            {filterItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm text-gray-700">
                  <FaRegHeart className="text-red-500 mr-1 inline-block" />
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Active Filters and Group Button */}
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-md mr-2 flex items-center">
            <FaFilter className="mr-2 text-sm" /> 1 Bộ Lọc Sử Dụng
          </div>
          <div className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md flex items-center transition duration-150 ease-in-out">
            <FaFilter className="mr-2 text-sm" /> Nhóm hàng
          </div>
        </div>

        {/* Product List Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-fixed"> {/* Added table-fixed */}
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
                <th scope="col" className="w-24 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                </th>
                <th scope="col" className="w-24 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                </th>
                <th scope="col" className="w-24 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                    {product.time} <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg> 0 <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg> 0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/edit-product/${product.id}`} className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out">
                      Chỉnh sửa
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-sm text-gray-500 mt-4">20 trong tổng số 104</div>
        </div>
      </div>
            </div>
          </div>
        </div>
      </main>
    </div> {/* Kết thúc phần tử bọc main */}

    <footer className="bg-gray-300 p-4 sticky  z-10">
      <Footer />
    </footer>
  </div>
);
}

export default ProductsPage;