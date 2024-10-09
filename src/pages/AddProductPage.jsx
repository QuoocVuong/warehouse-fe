import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const AddProductPage = () => {
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [itemGroup, setItemGroup] = useState('');
  const [unit, setUnit] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salesPrice, setSalesPrice] = useState('');
  const [openingStock, setOpeningStock] = useState('');
  const [reorderPoint, setReorderPoint] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý logic thêm sản phẩm ở đây
    console.log({
      productName,
      productCode,
      itemGroup,
      unit,
      brand,
      category,
      purchasePrice,
      salesPrice,
      openingStock,
      reorderPoint,
      description,
    });
  };

  return (
    <main className="flex-1 p-8 bg-gray-100">
      <Header />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Thêm Sản phẩm</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cột 1 */}
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                Tên Sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="productName"
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập tên sản phẩm"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="productCode" className="block text-sm font-medium text-gray-700">
                Mã Sản phẩm
              </label>
              <input
                type="text"
                id="productCode"
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập mã sản phẩm"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="itemGroup" className="block text-sm font-medium text-gray-700">
                Nhóm Hàng
              </label>
              <select
                id="itemGroup"
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={itemGroup}
                onChange={(e) => setItemGroup(e.target.value)}
              >
                <option value="">Chọn nhóm hàng</option>
                {/* Thêm các tùy chọn nhóm hàng */}
              </select>
            </div>
            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                Đơn vị
              </label>
              <input
                type="text"
                id="unit"
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập đơn vị"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
            {/* Cột 2 */}
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                Thương hiệu
              </label>
              <input
                type="text"
                id="brand"
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập thương hiệu"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Danh mục
              </label>
              <input
                type="text"
                id="category"
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập danh mục"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">
                Giá Mua
              </label>
              <input
                type="number"
                id="purchasePrice"
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập giá mua"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="salesPrice" className="block text-sm font-medium text-gray-700">
                Giá Bán
              </label>
              <input
                type="number"
                id="salesPrice"
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập giá bán"
                value={salesPrice}
                onChange={(e) => setSalesPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="openingStock" className="block text-sm font-medium text-gray-700">
                Tồn kho ban đầu
              </label>
              <input
                type="number"
                id="openingStock"
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập tồn kho ban đầu"
                value={openingStock}
                onChange={(e) => setOpeningStock(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="reorderPoint" className="block text-sm font-medium text-gray-700">
                Điểm đặt hàng lại
              </label>
              <input
                type="number"
                id="reorderPoint"
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập điểm đặt hàng lại"
                value={reorderPoint}
                onChange={(e) => setReorderPoint(e.target.value)}
              />
            </div>
          </div>

          {/* Mô tả */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <textarea
              id="description"
              rows="3"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Nhập mô tả sản phẩm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end">
            <Link to="/products" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md mr-2 transition duration-150 ease-in-out">
              Hủy
            </Link>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddProductPage;