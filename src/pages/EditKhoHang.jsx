import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header'; 

const EditKhoHang = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [tenKho, setTenKho] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKhoHang = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/v1/khohangs/${id}`); 
        setTenKho(response.data.data.tenKho);
      } catch (error) {
        setError('Lỗi khi lấy thông tin kho hàng');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
 // Chỉ fetch dữ liệu nếu ID kho hàng hợp lệ
 if (id) {
    fetchKhoHang();
  }
}, [id]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:8080/v1/khohangs/${id}`, { tenKho });
      console.log("Response từ API:", response.data); // Kiểm tra response từ API

      // Chuyển hướng về trang danh sách
      navigate('/warehouse'); 
    } catch (error) {
      setError('Lỗi khi cập nhật kho hàng');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header /> 
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white w-1/2 p-8 rounded shadow-md"> 
          <h2 className="text-3xl font-bold mb-6 text-center">Chỉnh sửa kho hàng</h2>
          
          {isLoading && (
            <div className="text-center text-gray-600">Đang tải...</div>
          )}

          {error && (
            <div className="text-center text-red-500">Có lỗi xảy ra: {error}</div>
          )}

          {!isLoading && !error && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="tenKho" className="block text-sm font-medium text-gray-700">
                  Tên kho hàng:
                </label>
                <input
                  type="text"
                  id="tenKho"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={tenKho}
                  onChange={(e) => setTenKho(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => navigate('/warehouse')}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-2"
                >
                  Hủy
                </button>
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

export default EditKhoHang;