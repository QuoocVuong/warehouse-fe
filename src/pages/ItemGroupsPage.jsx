import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaPlus, FaEllipsisV } from 'react-icons/fa';
import axios from 'axios';
import Header from '../components/Header';
import { BsChevronDown } from 'react-icons/bs';
import moment from 'moment';
import { callGolangAPI } from '../api/auth';

const ItemGroupsPage = () => {
  const [filterOptions, setFilterOptions] = useState({
    tenNhom: '',
  });

  const [itemGroups, setItemGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItemGroup, setSelectedItemGroup] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchItemGroups = async () => {
        setIsLoading(true);
        try {
            const data = await callGolangAPI('itemgroups', {}, 'get');
            setItemGroups(data.data);
        } catch (error) {
            setError(error);
            console.error("Error fetching item groups:", error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchItemGroups();
}, []);

  const handleFilterChange = (name, value) => {
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });
  };

  const filteredItemGroups = itemGroups.filter((itemGroup) => {
    const matchesTenNhom =
      !filterOptions.tenNhom ||
      itemGroup.tenNhom.toLowerCase().includes(filterOptions.tenNhom.toLowerCase());

    return matchesTenNhom;
  });

  const handleDropdownToggle = (itemGroupId) => {
    setShowDropdown(showDropdown === itemGroupId ? null : itemGroupId);
    };

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(null); // Đóng dropdown khi click bên ngoài
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

const handleDelete = async (id) => {
  if (window.confirm("Bạn có chắc chắn muốn xóa nhóm hàng này?")) {
      try {
          await callGolangAPI(`itemgroups/${id}`, {}, 'delete'); // Sử dụng callGolangAPI
          setItemGroups(prevItemGroups => prevItemGroups.filter(itemGroup => itemGroup.id !== id));
          setShowDropdown(null); // Đóng dropdown sau khi xóa
      } catch (error) {
          console.error("Lỗi khi xóa nhóm hàng", error);
          alert("Có lỗi xảy ra khi xóa nhóm hàng. Vui lòng thử lại.");
      }
  }
};
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-[1200px] bg-gray-100">
      <Header />

      <div className="flex px-4 py-12 mx-auto max-w-7xl">
        <div className="w-full bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Nhóm Hàng
            </h2>
            <div className="flex">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mr-2 flex items-center transition duration-150 ease-in-out">
                <FaFilter className="mr-2 text-sm" /> Xem Kiểu Danh Sách
                <BsChevronDown className="w-4 h-4 ml-2" />
              </button>
              <Link
                to="/add-item-group"
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center transition duration-150 ease-in-out"
              >
                <FaPlus className="mr-2 text-sm" /> Thêm Nhóm Hàng
              </Link>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="tenNhom"
              className="block text-sm font-medium text-gray-600"
            >
              Tên Nhóm Hàng
            </label>
            <input
              type="text"
              id="tenNhom"
              name="tenNhom"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Nhập tên nhóm hàng"
              onChange={(e) => handleFilterChange('tenNhom', e.target.value)}
            />
          </div>

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
                      Tên Nhóm Hàng
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
                  {filteredItemGroups.map((itemGroup, index) => (
                    <React.Fragment key={index}>
                      <tr
                        key={itemGroup.id}
                        className="hover:bg-gray-100"
                        onClick={() => setSelectedItemGroup(itemGroup)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {itemGroup.tenNhom}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {moment(itemGroup.createdAt).format('DD/MM/YYYY')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                          <button className="text-gray-500 hover:text-gray-700"
                                            onClick={() => handleDropdownToggle(itemGroup.id)} // Gọi handleDropdownToggle
                                            ref={showDropdown === itemGroup.id ? dropdownRef : null}
                          >
                            <FaEllipsisV />
                            {showDropdown === itemGroup.id &&  (
                              <div
                                ref={dropdownRef}
                                className="absolute top-4 right-0 z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow-lg border border-gray-200 ref={dropdownRef}"
                              >
                                <ul className="py-1 text-sm text-gray-700">
                                  <li>
                                    <Link
                                      to={`/edit-item-group/${itemGroup.id}`}
                                      className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                      Chỉnh sửa
                                    </Link>
                                  </li>
                                  <li>
                                    <a
                                      href="#" // Sử dụng href="#" để ngăn chặn chuyển hướng mặc định
                                      onClick={(e) => {
                                        e.preventDefault(); // Ngăn chặn hành vi mặc định của <a>
                                        handleDelete(itemGroup.id);
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
              <div className="text-sm text-gray-500 mt-4">
                Hiển thị {filteredItemGroups.length} nhóm hàng
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemGroupsPage;