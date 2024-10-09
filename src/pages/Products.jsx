import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../store/actions';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Content from '../components/Content';

function Products() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products); // Assuming you have a products slice in your Redux store

  const [filterOptions, setFilterOptions] = useState({
    receivedBy: '',
    createdBy: '',
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });
  };

  const filteredProducts = products.data ? products.data.filter((product) => {
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    if (filterOptions.receivedBy && product.receivedBy !== filterOptions.receivedBy) {
      return false;
    }

    if (filterOptions.createdBy && product.createdBy !== filterOptions.createdBy) {
      return false;
    }

    return true;
  })   : [];

  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 p-8">
        <Header />
        <Content>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Sản phẩm</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Thêm sản phẩm
            </button>
          </div>
          <div className="flex justify-between mb-4">
            <div className="flex space-x-4">
              <div>
                <label htmlFor="receivedBy" className="block text-gray-700 text-sm font-bold mb-2">
                  Được giao cho
                </label>
                <select
                  id="receivedBy"
                  name="receivedBy"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={filterOptions.receivedBy}
                  onChange={handleFilterChange}
                >
                  <option value="">Tất cả</option>
                  {/* Add options based on unique receivedBy values in products.data */}
                  {/* Example: */}
                  <option value="Người dùng A">Người dùng A</option>
                  <option value="Người dùng B">Người dùng B</option>
                </select>
              </div>
              <div>
                <label htmlFor="createdBy" className="block text-gray-700 text-sm font-bold mb-2">
                  Được tạo bởi
                </label>
                <select
                  id="createdBy"
                  name="createdBy"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={filterOptions.createdBy}
                  onChange={handleFilterChange}
                >
                  <option value="">Tất cả</option>
                  {/* Add options based on unique createdBy values in products.data */}
                  {/* Example: */}
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Tìm kiếm hoặc Gõ lệnh (Ctrl + G)"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Tên</th>
                <th className="px-4 py-2">Biến thể của</th>
                <th className="px-4 py-2">Tên mục</th>
                <th className="px-4 py-2">Nhóm hàng</th>
                <th className="px-4 py-2">Tên</th>
                <th className="px-4 py-2">20 trong tổng số 104</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">
                    {/* Display variant */}
                  </td>
                  <td className="border px-4 py-2">
                    {/* Display item name */}
                  </td>
                  <td className="border px-4 py-2">{product.group}</td>
                  <td className="border px-4 py-2">{product.productName}</td>
                  <td className="border px-4 py-2">
                    {/* Display quantity */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Content>
      </main>
    </div>
  );
}

export default Products;