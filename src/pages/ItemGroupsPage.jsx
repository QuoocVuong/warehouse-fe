import React, { useState } from 'react';
import { FaFolder, FaEllipsisV, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const ItemGroupsPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const itemGroups = [
    { name: '12', isParent: true, link: '/item-group/12' },
    { name: '123', isParent: false, link: '/item-group/123' },
    { name: '1234', isParent: false, link: '/item-group/1234' },
    { name: '15456', isParent: true, link: '/item-group/15456' },
    { name: '188', isParent: false, link: '/item-group/188' },
    { name: '2543', isParent: true, link: '/item-group/2543' },
    { name: '88', isParent: false, link: '/item-group/88' },
    { name: 'AK-47', isParent: true, link: '/item-group/AK-47' },
    { name: 'chattayrua', isParent: false, link: '/item-group/chattayrua' },
    { name: 'Dịch vụ', isParent: false, link: '/item-group/Dịch vụ' },
    { name: 'đồ gia dụng', isParent: true, link: '/item-group/đồ gia dụng' },
    { name: 'fdgdf', isParent: false, link: '/item-group/fdgdf' },
    { name: 'Hihi', isParent: false, link: '/item-group/Hihi' },
    { name: 'hkvhjv', isParent: false, link: '/item-group/hkvhjv' },
    { name: 'khach6', isParent: false, link: '/item-group/khach6' },
    { name: 'Ltmt4-4', isParent: false, link: '/item-group/Ltmt4-4' },
    { name: 'màu 1', isParent: false, link: '/item-group/màu 1' },
    { name: 'n8.1ltmt2', isParent: true, link: '/item-group/n8.1ltmt2' },
    { name: 'Nguyên liệu thô', isParent: false, link: '/item-group/Nguyên liệu thô' },
    { name: 'Nhôm', isParent: true, link: '/item-group/Nhôm' },
    { name: 'Nhôm hóa chất', isParent: true, link: '/item-group/Nhôm hóa chất' },
    { name: 'Nhôm kim loại', isParent: true, link: '/item-group/Nhôm kim loại' },
  ];

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewGroupName('');
  };

  const handleInputChange = (e) => {
    setNewGroupName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic tạo nhóm hàng mới, ví dụ: gửi newGroupName lên server
    console.log('Tạo nhóm hàng mới:', newGroupName);
    handleCloseModal();
  };

  return (
    <main className="flex-1 p-8 bg-gray-100">
      <Header />
    <div className="bg-white p-4 rounded-lg shadow-md relative">
      <h2 className="text-lg font-bold mb-4">Nhóm hàng</h2>

      {/* Header with buttons */}
      <div className="flex justify-end mb-4">
        <button
          className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg mr-2 flex items-center ${
            isExpanded ? 'text-red-500' : ''
          }`}
          onClick={handleToggleExpand}
        >
          {isExpanded ? 'Thu gọn tất cả' : 'Mở rộng tất cả'}
          <FaEllipsisV className="ml-2" />
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          onClick={handleOpenModal}
        >
          + Mới
        </button>
      </div>

      {/* List of Item Groups */}
      <ul className="space-y-2">
        {itemGroups.map((group, index) => (
          <li key={index} className="flex items-center">
            <span className="mr-2">
              {group.isParent ? (
                <FaFolder className="w-4 h-4" />
              ) : (
                <span className="w-4 h-4 inline-block rounded-full" />
              )}
            </span>
            <Link to={group.link} className="text-gray-700 hover:text-blue-500">
              {group.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Thêm Nhóm hàng</h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">
                  Tên nhóm mẫu hàng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="groupName"
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tên nhóm mẫu hàng"
                  value={newGroupName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                  Tạo mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </main>
  );
};

export default ItemGroupsPage;