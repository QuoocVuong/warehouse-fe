import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import moment from 'moment';

const EditProductPage = () => {
  const { id } = useParams();
  const [nhomHangs, setNhomHangs] = useState([]);
  const [formData, setFormData] = useState({
    maHang: '',
    nhomHangID: '',
    tenSanPham: '',
    donViTinh: '',
    coPhieuMoDau: 0,
    dinhGia: 0,
    tyGiaBanHangTieuChuan: 0,
    chiDinhLoaiTaiSan: '',
    hanSuDung: '',
    status: 'selling',
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/v1/products/${id}`);
        const productData = response.data.data;

        console.log('Response API:', response.data);

        // Format lại hạn sử dụng (nếu có)
        if (productData.hanSuDung) {
          productData.hanSuDung = moment(productData.hanSuDung).format('YYYY-MM-DD');
        }

        setFormData(productData); // Cập nhật state formData sau khi fetch dữ liệu
      } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
        setError(error.response?.data?.error || 'Lỗi khi lấy thông tin sản phẩm.');
      }
    };

    const fetchNhomHangs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/itemgroups');
        setNhomHangs(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhóm hàng:', error);
      }
    };

    fetchProduct();
    fetchNhomHangs();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Format HanSuDung sang định dạng ISO 8601 (nếu có)
      const formattedHanSuDung = formData.hanSuDung ? moment(formData.hanSuDung).format('YYYY-MM-DDTHH:mm:ssZ') : null;

      // Chuyển đổi kiểu dữ liệu nếu cần
      const parsedNhomHangID = parseInt(formData.nhomHangID, 10);
      const parsedCoPhieuMoDau = parseFloat(formData.coPhieuMoDau);
      const parsedDinhGia = parseFloat(formData.dinhGia);
      const parsedTyGiaBanHangTieuChuan = parseFloat(formData.tyGiaBanHangTieuChuan);

      await axios.patch(`http://localhost:8080/v1/products/${id}`, {
        ...formData,
        nhomHangID: parsedNhomHangID,
        coPhieuMoDau: parsedCoPhieuMoDau,
        dinhGia: parsedDinhGia,
        tyGiaBanHangTieuChuan: parsedTyGiaBanHangTieuChuan,
        hanSuDung: formattedHanSuDung,
      });
      navigate('/products');
    } catch (error) {
      console.error('Lỗi khi sửa sản phẩm:', error);
      setError(error.response?.data?.error || 'Lỗi khi sửa sản phẩm.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-[1200px] bg-gray-100">
      <Header />
      <div className="w-full py-12 px-20">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 py-3">Sửa Sản Phẩm</h2>

          {/* Hiển thị thông báo lỗi */}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Lỗi: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cột 1 */}
            <div className="space-y-8">
              {/* Mã hàng */}
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

              {/* Nhóm hàng */}
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

              {/* Tên sản phẩm */}
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

              {/* Đơn vị tính */}
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
              {/* Cổ phiếu mở đầu */}
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

              {/* Định giá */}
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

              {/* Tỷ giá bán hàng tiêu chuẩn */}
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

              {/* Chỉ định loại tài sản */}
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

              {/* Hạn sử dụng */}
              <div>
                <label htmlFor="hanSuDung" className="block text-sm font-medium text-gray-700">
                  Hạn sử dụng
                </label>
                <input
                  type="date"
                  id="hanSuDung"
                  name="hanSuDung"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.hanSuDung}
                  onChange={handleChange}
                />
              </div>

              {/* Trạng thái */}
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

            {/* Nút Lưu */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProductPage;