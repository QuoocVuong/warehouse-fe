import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import moment from 'moment';
import { callGolangAPI } from '../api/auth'; // Import callGolangAPI

const AddProductPage = () => {
    const [nhomHangs, setNhomHangs] = useState([]);
    const [formData, setFormData] = useState({
        maHang: '',
        nhomHangID: '', // Lưu trữ ID của nhóm hàng dưới dạng chuỗi
        tenSanPham: '',
        donViTinh: '',
        coPhieuMoDau: 0,
        dinhGia: 0,
        tyGiaBanHangTieuChuan: 0,
        chiDinhLoaiTaiSan: '',
        hanSuDung: '', // Lưu trữ ngày dưới dạng chuỗi YYYY-MM-DD
        status: 'selling',
    });
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchNhomHangs = async () => {
            try {
                const data = await callGolangAPI('itemgroups', {}, 'get'); // Sử dụng callGolangAPI
                setNhomHangs(data.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách nhóm hàng:', error);
            }
        };

        fetchNhomHangs();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Xử lý trường hợp name là number
        let newValue = value;

        // Chuyển đổi giá trị sang đúng kiểu dữ liệu
        if (name === "coPhieuMoDau" || name === "dinhGia" || name === "tyGiaBanHangTieuChuan") {
          if (value === '') {
            newValue = 0; // Hoặc để trống nếu bạn muốn cho phép giá trị rỗng
          } else {
            newValue = parseFloat(value);
            if (isNaN(newValue)) {
              newValue = 0; // Hoặc xử lý lỗi khác nếu cần
            }
          }
        } else if (name === 'nhomHangID') {
          newValue = value.toString(); // Chuyển đổi nhomHangID thành chuỗi
        }
        if (name === "nhomHangID") {
          newValue = parseInt(value, 10) || ""; // Chuyển đổi thành số hoặc chuỗi rỗng nếu không parse được
        }


        setFormData({ ...formData, [name]: newValue });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Format HanSuDung sang định dạng ISO 8601 nếu cần
            const formattedHanSuDung = moment(formData.hanSuDung).format('YYYY-MM-DDTHH:mm:ssZ');
            // const parsedNhomHangID = parseInt(formData.nhomHangID, 10);
            const parsedCoPhieuMoDau = parseFloat(formData.coPhieuMoDau);
            const parsedDinhGia = parseFloat(formData.dinhGia);
            const parsedTyGiaBanHangTieuChuan = parseFloat(formData.tyGiaBanHangTieuChuan);
           

            // Gửi dữ liệu lên backend bằng callGolangAPI
            await callGolangAPI('products', { ...formData, hanSuDung: formattedHanSuDung }, 'post', {
              ...formData,
            //  nhomHangID: parsedNhomHangID,
             coPhieuMoDau: parsedCoPhieuMoDau, 
             dinhGia: parsedDinhGia, 
             tyGiaBanHangTieuChuan: parsedTyGiaBanHangTieuChuan,
             hanSuDung: formattedHanSuDung,
           });
            navigate('/products');
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            setError(error.response?.data?.error || 'Lỗi khi thêm sản phẩm.');
        }
    };

  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-[1200px] bg-gray-100">
      <Header />
      <div className="w-full py-12 px-20">
        <div className="bg-white p-6 rounded-lg shadow-md"> 
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 py-3">Thêm Sản Phẩm</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Lỗi: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
            {/* Cột 1 */}
            <div className="space-y-8">
              <div>
                <label htmlFor="maHang" className="block text-sm font-medium text-gray-700">
                  Mã hàng
                </label>
                <input
                  type="text"
                  id="maHang"
                  name="maHang"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                  value={formData.maHang}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="nhomHangID" className="block text-sm font-medium text-gray-700">
                  Nhóm Hàng
                </label>
                <select
                  id="nhomHangID"
                  name="nhomHangID"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  required
                  value={formData.nhomHangID}
                  onChange={handleChange}
                >
                  <option value="">Chọn nhóm hàng</option>
                  {nhomHangs.map((nhomHang) => (
                    <option key={nhomHang.id} value={nhomHang.id}>
                      {nhomHang.tenNhom}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tenSanPham" className="block text-sm font-medium text-gray-700">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  id="tenSanPham"
                  name="tenSanPham"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                  value={formData.tenSanPham}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="donViTinh" className="block text-sm font-medium text-gray-700">
                  Đơn vị tính
                </label>
                <input
                  type="text"
                  id="donViTinh"
                  name="donViTinh"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                  value={formData.donViTinh}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Cột 2 */}
            <div className="space-y-8"> 
              <div>
                <label htmlFor="coPhieuMoDau" className="block text-sm font-medium text-gray-700">
                  Cổ phiếu mở đầu
                </label>
                <input
                  type="number"
                  id="coPhieuMoDau"
                  name="coPhieuMoDau"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                  value={formData.coPhieuMoDau}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="dinhGia" className="block text-sm font-medium text-gray-700">
                  Định giá
                </label>
                <input
                  type="number"
                  id="dinhGia"
                  name="dinhGia"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                  value={formData.dinhGia}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="tyGiaBanHangTieuChuan" className="block text-sm font-medium text-gray-700">
                  Tỷ giá bán hàng tiêu chuẩn
                </label>
                <input
                  type="number"
                  id="tyGiaBanHangTieuChuan"
                  name="tyGiaBanHangTieuChuan"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                  value={formData.tyGiaBanHangTieuChuan}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="chiDinhLoaiTaiSan" className="block text-sm font-medium text-gray-700">
                  Chỉ định loại tài sản
                </label>
                <input
                  type="text"
                  id="chiDinhLoaiTaiSan"
                  name="chiDinhLoaiTaiSan"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                  value={formData.chiDinhLoaiTaiSan}
                  onChange={handleChange}
                />
              </div>

              <div>
              <label htmlFor="hanSuDung" className="block text-sm font-medium text-gray-700">
                Hạn sử dụng
              </label>
              <input
                type="date"
                id="hanSuDung"
                name="hanSuDung"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.hanSuDung} // Bỏ moment ở đây
                onChange={handleChange} 
              />
            </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Trạng thái
                </label>
                <select
                  id="status"
                  name="status"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  required
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="selling">selling</option>
                  <option value="out_of_stock">out_of_stock</option>
                  <option value="deleted">deleted</option>
                </select>
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end"> 
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AddProductPage;