import  { useState } from 'react';
import { FaFileExcel, FaChartBar, FaSyncAlt, FaEllipsisV } from 'react-icons/fa';
import Header from '../components/Header';

const StockItemsReport = () => {
  const [tableData] = useState([
    {
      ngay: '02-10-2024 15:06',
      sanPham: '1111: Sắt',
      tenMuc: 'Sắt',
      donVi: 'Số',
      soLuong: '123,000',
      soLuongNhap: '0,000',
      daiLuong: '123,000',
      chungTu: 'MAT-STE-2024-00...',
      khoHang: 'Cửa hàng - MO',
      nhomHang: 'Dịch vụ',
      nhan: '1',
    },
    {
      ngay: '02-10-2024 15:09',
      sanPham: '1111: Sắt',
      tenMuc: 'Sắt',
      donVi: 'Số',
      soLuong: '123.123,00',
      soLuongNhap: '0,000',
      daiLuong: '123.246,000',
      chungTu: 'MAT-STE-2024-00...',
      khoHang: 'Cửa hàng - MO',
      nhomHang: 'Dịch vụ',
      nhan: '1',
    },
    {
      ngay: '07-10-2024 21:23',
      sanPham: '4S-A-STL-F...',
      tenMuc: 'Khớp nối bản...',
      donVi: 'Số',
      soLuong: '1,000',
      soLuongNhap: '0,000',
      daiLuong: '1,000',
      chungTu: 'MAT-STE-2024-00...',
      khoHang: 'Cửa hàng - MO',
      nhomHang: 'Tiêu hao',
      nhan: '1',
    },
    // ... (Thêm dữ liệu cho các hàng khác)
  ]);

  return (
    <main className="flex-1 p-8 bg-gray-100">
      <Header />
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Số cái hàng tồn kho</h2>

      {/* Header with filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Công Ty M-offer"
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="09-09-2024"
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="09-10-2024"
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Số hiệu lô"
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhân"
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Chứng từ #"
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Kho hàng"
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Dự Án"
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Sản phẩm"
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Bao gồm UOM"
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhóm hàng"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mb-4">
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mr-2 flex items-center">
          <FaFileExcel className="mr-2" /> Tạo thẻ
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mr-2 flex items-center">
          <FaChartBar className="mr-2" /> Đặt biểu đồ
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mr-2">
          <FaSyncAlt />
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md">
          <FaEllipsisV />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ngày
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sản phẩm
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tên mục
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Đơn vị
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Số lượng
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Số lượng nhập
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Dài lượng
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Chứng từ #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kho hàng
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nhóm hàng
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nhân
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.ngay}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.sanPham}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.tenMuc}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.donVi}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {row.soLuong}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {row.soLuongNhap}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {row.daiLuong}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.chungTu}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.khoHang}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.nhomHang}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {row.nhan}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {/* <div className="mt-4 text-sm text-gray-500">
        Để so sánh, sử dụng >, <, >=, <=, != hoặc =.Đối với phạm vi, sử dụng 5:10 (cho các giá trị trong khoảng từ 5 đến 10).
        <br/>
        Thời gian thực hiện: 0.019885 giây
      </div> */}
    </div>
    </main>
  );
};

export default StockItemsReport;