import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddItemGroup = () => {
  const [tenNhom, setTenNhom] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // Reset error message

    try {
      const response = await axios.post('http://localhost:8080/v1/itemgroups', {
        tenNhom,
      });

      if (response.status === 201) {
        // Redirect to Item Groups page after successful creation
        navigate('/item-groups'); 
      } else {
        setError('Có lỗi xảy ra. Vui lòng thử lại sau!');
      }
    } catch (error) {
      setError('Có lỗi xảy ra. Vui lòng thử lại sau!');
      console.error('Lỗi khi thêm nhóm hàng:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Thêm Nhóm hàng
                </h3>
                <div className="mt-2">
                  {error && <div className="text-red-500">{error}</div>}
                  <form onSubmit={handleSubmit} className="w-full max-w-lg">
                    <div className="mb-4">
                      <label htmlFor="tenNhom" className="block text-gray-700 font-bold mb-2">
                        Tên nhóm mẫu hàng *
                      </label>
                      <input
                        type="text"
                        id="tenNhom"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Nhập tên nhóm hàng"
                        value={tenNhom}
                        onChange={(e) => setTenNhom(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md mr-2"
                        onClick={() => navigate(-1)} // Sử dụng navigate(-1) để quay lại trang trước
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                      >
                        {isSubmitting ? 'Đang tạo...' : 'Tạo mới'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemGroup;