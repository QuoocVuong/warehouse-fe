import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { callGolangAPI } from '../api/auth'; // Import callGolangAPI
import Header from '../components/Header';


const EditItemGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenNhom, setTenNhom] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemGroup = async () => {
      setIsLoading(true);
      try {
        const response = await callGolangAPI(`itemgroups/${id}`, {}, 'get'); // Use callGolangAPI
        if (response && response.data && response.data.tenNhom) { // Check for data existence
            setTenNhom(response.data.tenNhom);
        } else {
            throw new Error("Invalid item group data received from API");
        }
      } catch (error) {
        setError('Lỗi khi lấy thông tin nhóm hàng: ' + error.message); // Show more detailed error
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemGroup();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await callGolangAPI(`itemgroups/${id}`, { tenNhom }, 'patch'); // Use callGolangAPI
      navigate('/item-groups');
    } catch (error) {
      setError('Lỗi khi cập nhật nhóm hàng: ' + error.message); // Show detailed error
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Hiển thị component Header */}
      <div className="flex-grow flex items-center justify-center">
        {/* Form chỉnh sửa nhóm hàng */}
        <div className="bg-white w-1/2 p-8 rounded shadow-md"> 
          <h2 className="text-3xl font-bold mb-6 text-center">Chỉnh sửa nhóm hàng</h2>
          
          {isLoading && (
            <div className="text-center text-gray-600">Đang tải...</div>
          )}

          {error && (
            <div className="text-center text-red-500">Có lỗi xảy ra: {error}</div>
          )}

          {!isLoading && !error && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="tenNhom" className="block text-sm font-medium text-gray-700">
                  Tên nhóm hàng:
                </label>
                <input
                  type="text"
                  id="tenNhom"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={tenNhom}
                  onChange={(e) => setTenNhom(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Lưu Thay Đổi
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditItemGroup;