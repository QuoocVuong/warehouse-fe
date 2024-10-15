import  { useState } from 'react';
import axios from 'axios';

const AddKhoHang = ({ onClose, onKhoHangAdded }) => {
  const [tenKho, setTenKho] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/v1/khohangs', { tenKho }); // Thay đổi đường dẫn API cho kho hàng
      if (onKhoHangAdded) {
        onKhoHangAdded(response.data.data); // Gọi hàm callback với dữ liệu kho hàng mới
      }
      onClose(); // Đóng form sau khi thêm
    } catch (error) {
      setError('Có lỗi xảy ra. Vui lòng thử lại!');
      console.error('Lỗi khi thêm kho hàng:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Thêm Kho Hàng</h2>

        {error && <div className="text-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="tenKho" className="block text-sm font-medium text-gray-700">
              Tên Kho Hàng:
            </label>
            <input
              type="text"
              id="tenKho"
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Nhập tên kho hàng"
              value={tenKho}
              onChange={(e) => setTenKho(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isSubmitting ? 'Đang tạo...' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKhoHang;