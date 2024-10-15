import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaPlus, FaEllipsisV, FaChevronRight, FaChevronLeft, FaCaretDown } from 'react-icons/fa';
import axios from 'axios';
import Header from '../components/Header';
import { BsChevronDown } from 'react-icons/bs';
import moment from 'moment';

const ProductsPage = () => {
  const [filterOptions, setFilterOptions] = useState({
    tenSanPham: '',
    status: '',
    tenNhom: '',
  });

  const [showSidebar, setShowSidebar] = useState(false); // Sidebar ẩn mặc định
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allNhomHangs, setAllNhomHangs] = useState([]); // Khai báo state allNhomHangs
  const [showDropdown, setShowDropdown] = useState(null); 
  const handleDropdownToggle = (productId) => {
    setShowDropdown(showDropdown === productId ? null : productId);
  };


  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/v1/products');
        setProducts(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchNhomHangs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/itemgroups');
        setAllNhomHangs(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhóm hàng:', error);
      }
    };

    fetchProducts();
    fetchNhomHangs();
  }, []);

  const handleFilterChange = (name, value) => {
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesTenSanPham = !filterOptions.tenSanPham || product.tenSanPham.toLowerCase().includes(filterOptions.tenSanPham.toLowerCase());
    const matchesStatus = !filterOptions.status || product.status === filterOptions.status;
    const matchesNhomHang = !filterOptions.tenNhom || (product.nhomHang && product.nhomHang.tenNhom === filterOptions.tenNhom);

    return matchesTenSanPham && matchesStatus && matchesNhomHang;
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelectedProduct(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await axios.delete(`http://localhost:8080/v1/products/${productId}`);

        // Cập nhật trực tiếp trạng thái sản phẩm trong mảng `products`
        setProducts((prevProducts) => prevProducts.map((product) => 
          product.id === productId ? { ...product, status: 'deleted' } : product
        ));

        setShowDropdown(null);
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        alert('Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.');
      }
    }
  };
  // const handleDeleteProduct = async (productId) => {
  //   if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
  //     try {
  //       await axios.delete(`http://localhost:8080/v1/products/${productId}`);
  
  //       // Gọi lại API để lấy danh sách sản phẩm mới nhất
  //       const response = await axios.get('http://localhost:8080/v1/products');
  //       setProducts(response.data.data);
  
  //       setShowDropdown(null);
  //     } catch (error) {
  //       console.error('Lỗi khi xóa sản phẩm:', error);
  //       alert('Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.');
  //     }
  //   }
  // };

  // Thêm useEffect để re-render khi products thay đổi
  useEffect(() => {
    // Không cần code gì trong useEffect, chỉ cần dependency là products
  }, [products]);


  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-[1200px] bg-gray-100">
      <Header />

      <div className="flex px-4 py-12 mx-auto max-w-7xl">
        <div className="w-full bg-white p-6 rounded-lg shadow-md">
          {/* Tiêu đề và nút */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Sản phẩm</h2>
            {/* Nút thêm sản phẩm */}
            <Link
              to="/add-product"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md flex items-center transition duration-150 ease-in-out"
            >
              <FaPlus className="mr-2 text-sm" /> Thêm Sản phẩm
            </Link>
          </div>

          {/* Lọc */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Lọc theo tên sản phẩm */}
            <div>
              <label htmlFor="tenSanPham" className="block text-sm font-medium text-gray-600">
                Tên Sản Phẩm
              </label>
              <input
                type="text"
                id="tenSanPham"
                name="tenSanPham"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Nhập tên sản phẩm"
                onChange={(e) => handleFilterChange('tenSanPham', e.target.value)}
              />
            </div>

            {/* Lọc theo trạng thái */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-600">
                Trạng Thái
              </label>
              <select
                id="status"
                name="status"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="selling">Đang bán</option>
                <option value="out_of_stock">Hết hàng</option>
                <option value="deleted">Đã xóa</option>
              </select>
            </div>

            {/* Lọc theo nhóm hàng */}
            <div>
              <label htmlFor="nhomHang" className="block text-sm font-medium text-gray-600">
                Nhóm Hàng
              </label>
              <select
                id="nhomHang"
                name="nhomHang"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={(e) => handleFilterChange('tenNhom', e.target.value)}
              >
                <option value="">Tất cả</option>
                {allNhomHangs.map((nhomHang) => (
                  <option key={nhomHang.id} value={nhomHang.tenNhom}>
                    {nhomHang.tenNhom}
                  </option>
                ))}
              </select>
            </div>
          </div>
{/* Bảng danh sách sản phẩm */}
          {isLoading ? (
            <div className="text-center py-4">Đang tải dữ liệu...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">
              Lỗi: {error.message}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap bg-white divide-y divide-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Trạng thái
                    </th> 
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Mã hàng
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nhóm hàng
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tên
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Đơn vị tính
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cổ phiếu mở đầu
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Định giá
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tỷ giá bán hàng tiêu chuẩn
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Chỉ định loại tài sản
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Hạn sử dụng
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product, index) => (
                    <React.Fragment key={index}>
                      <tr
                        key={index}
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setSelectedProduct(product)} 
                      >
                        {/* Thêm ...  */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                          <button
                            onClick={() => handleDropdownToggle(product.id)}
                            className={`text-gray-400 hover:text-gray-500 ${showDropdown === product.id ? 'text-blue-500' : ''}`}
                          >
                            <FaCaretDown className="w-5 h-5" />
                          </button>

                          {/* Dropdown */}
                          {showDropdown === product.id && (
                            <div className="absolute left-9 transform  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                <Link
                                  to={`/edit-product/${product.id}`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                  role="menuitem"
                                >
                                  Chỉnh sửa
                                </Link>
                                <button 
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-900 text-center rounded-md"
                                  role="menuitem"
                                >
                                  Xóa
                                </button>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                              ${product.status === 'selling' ? 'bg-green-100 text-green-800' : 
                               (product.status === 'out_of_stock' ? 'bg-red-100 text-red-800' :
                              (product.status === 'deleted' ? 'bg-red-700 text-white' : 
                                'bg-gray-100 text-gray-800'))}
                            `} 
                          >
                            • {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.maHang}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.nhomHang ? product.nhomHang.tenNhom : ''}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {product.tenSanPham}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.donViTinh}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.coPhieuMoDau}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.dinhGia}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.tyGiaBanHangTieuChuan}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.chiDinhLoaiTaiSan}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.hanSuDung
                            ? moment(product.hanSuDung.split('T')[0]).format('DD/MM/YYYY') // Hoặc dùng moment(product.hanSuDung, 'YYYY-MM-DDTHH:mm:ssZ').format('DD/MM/YYYY')
                            : ''}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <div className="text-sm text-gray-500 mt-4">
                 Tổng số {filteredProducts.length}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ProductsPage;