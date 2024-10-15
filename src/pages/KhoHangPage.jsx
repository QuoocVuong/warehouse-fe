import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { FaFilter, FaPlus, FaEllipsisV } from 'react-icons/fa';
import axios from 'axios';
import Header from '../components/Header';
import { BsChevronDown } from 'react-icons/bs';
import moment from 'moment';

import AddKhoHang from './AddKhoHang';

const KhoHangPage = () => {
  const [filterOptions, setFilterOptions] = useState({
    tenKho: '',
  });

  const [khoHangs, setKhoHangs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedKhoHang, setSelectedKhoHang] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchKhoHangs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/v1/khohangs');
        setKhoHangs(response.data.data);
      } catch (error) {
        setError(error);
        console.error('Lỗi khi lấy danh sách kho hàng:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKhoHangs();
  }, [refreshKey]);

  useEffect(() => {
    // Kiểm tra xem có dữ liệu kho hàng được truyền từ EditKhoHang hay không
    if (location.state && location.state.updatedKhoHang) {
      // Cập nhật danh sách kho hàng
      setKhoHangs((prevKhoHangs) =>
        prevKhoHangs.map((khoHang) =>
          khoHang.id === location.state.updatedKhoHang.id ? location.state.updatedKhoHang : khoHang
        )
      );

      // Xóa dữ liệu khỏi location.state
      navigate(location.pathname, { state: {} }); 
    }
  }, [location.state, navigate]);


  const handleFilterChange = (name, value) => {
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });
  };

  const filteredKhoHangs = khoHangs.filter((khoHang) => {
    const matchesTenKho =
      !filterOptions.tenKho ||
      khoHang.tenKho.toLowerCase().includes(filterOptions.tenKho.toLowerCase());

    return matchesTenKho;
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelectedKhoHang(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa kho hàng này?')) {
      try {
        await axios.delete(`http://localhost:8080/v1/khohangs/${id}`);
        setKhoHangs(khoHangs.filter((khoHang) => khoHang.id !== id));
      } catch (error) {
        console.error('Lỗi khi xóa kho hàng', error);
        alert('Có lỗi xảy ra khi xóa kho hàng. Vui lòng thử lại.');
      }
    }
  };

  const handleEditClick = (khoHang) => {
    navigate(`/edit-khohang/${khoHang.id}`); 
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setRefreshKey(refreshKey + 1); 
  };

  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-[1200px] bg-gray-100">
      <Header />

      <div className="flex px-4 py-12 mx-auto max-w-7xl">
        <div className="w-full bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Kho Hàng
            </h2>
            <div className="flex">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mr-2 flex items-center transition duration-150 ease-in-out">
                <FaFilter className="mr-2 text-sm" /> Xem Kiểu Danh Sách
                <BsChevronDown className="w-4 h-4 ml-2" />
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center transition duration-150 ease-in-out"
              >
                <FaPlus className="mr-2 text-sm" /> Thêm Kho Hàng
              </button>
            </div>
          </div>

          {/* Form thêm kho hàng */}
          {showAddForm && (
            <AddKhoHang
              onClose={handleCloseForm}
              onKhoHangAdded={() => {
                handleCloseForm(); 
              }}
            />
          )}

          {/* Lọc theo tên kho hàng */}
          <div className="mb-4">
            <label htmlFor="tenKho" className="block text-sm font-medium text-gray-600">
              Tên Kho Hàng
            </label>
            <input
              type="text"
              id="tenKho"
              name="tenKho"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Nhập tên kho hàng"
              onChange={(e) => handleFilterChange('tenKho', e.target.value)}
            />
          </div>

          {/* Bảng danh sách kho hàng */}
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
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      STT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tên Kho Hàng
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ngày Tạo
                    </th>
                    <th
                      scope="col"
                      className="w-24 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    ></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredKhoHangs.map((khoHang, index) => (
                    <React.Fragment key={index}>
                      <tr
                        key={khoHang.id}
                        className="hover:bg-gray-100"
                        onClick={() => setSelectedKhoHang(khoHang)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {khoHang.tenKho}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {moment(khoHang.createdAt).format('DD/MM/YYYY')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                          <button className="text-gray-500 hover:text-gray-700">
                            <FaEllipsisV />
                            {selectedKhoHang === khoHang && (
                              <div
                                ref={dropdownRef}
                                className="absolute top-4 right-0 z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow-lg border border-gray-200"
                              >
                                <ul className="py-1 text-sm text-gray-700">
                                  <li>
                                    <Link
                                      to={`/edit-khohang/${khoHang.id}`}
                                      className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                      Chỉnh sửa
                                    </Link>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleDelete(khoHang.id);
                                      }}
                                      className="block px-4 py-2 hover:bg-gray-100 text-red-600"
                                    >
                                      Xóa
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <div className="text-sm text-gray-500 mt-4">Hiển thị {filteredKhoHangs.length} kho hàng</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KhoHangPage;