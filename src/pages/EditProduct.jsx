import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { callGolangAPI } from '../api/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';
import moment from 'moment';

const EditProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState(null);
    const [nhomHangs, setNhomHangs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
            const response = await callGolangAPI(`products/${id}`, {}, 'get');
            if (!response || !response.data || typeof response.data !== 'object') {
                throw new Error("Invalid product data received from API");
            }

            const productData = response.data;

            // Chuyển đổi nhomHangID sang số nếu nó tồn tại
            const parsedNhomHangID = productData.nhomHangID ? parseInt(productData.nhomHangID, 10) : null;
            productData.nhomHangID = parsedNhomHangID;

             // Định dạng ngày
            if (productData.hanSuDung) {
                productData.hanSuDung = moment(productData.hanSuDung).format('YYYY-MM-DD');
            }



            setFormData(productData);

        } catch (error) {
            console.error('Error fetching product:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
        const fetchNhomHangs = async () => {
            try {
                const data = await callGolangAPI('itemgroups', {}, 'get');
                setNhomHangs(data.data);
            } catch (error) {
                console.error('Error fetching item groups:', error);
            }
        };

        fetchProduct();
        fetchNhomHangs();
    }, [id]);

   
    const handleChange = (e) => {
      const { name, value } = e.target;
      let newValue = value;

      if (name === "nhomHangID") {
          newValue = parseInt(value, 10);
          if (isNaN(newValue)) {
              newValue = null; // Hoặc 0, tùy thuộc vào backend
          }
      } else if (name === "coPhieuMoDau" || name === "dinhGia" || name === "tyGiaBanHangTieuChuan") {
          newValue = parseFloat(value);
          if (isNaN(newValue)) {
            newValue = 0; 
          }
        }
        else if(name === "hanSuDung") {
          newValue = moment(value).format('YYYY-MM-DDTHH:mm:ssZ');
          console.log("hansudung",newValue)

        }


      setFormData(prevData => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
        const updatedData = { ...formData };
         // Chuyển đổi các trường số thành chuỗi nếu cần thiết bởi backend
         if (typeof updatedData.coPhieuMoDau === 'number') {
            updatedData.coPhieuMoDau = updatedData.coPhieuMoDau.toString();
        }
        if (typeof updatedData.dinhGia === 'number') {
            updatedData.dinhGia = updatedData.dinhGia.toString();
        }
        if (typeof updatedData.tyGiaBanHangTieuChuan === 'number') {
            updatedData.tyGiaBanHangTieuChuan = updatedData.tyGiaBanHangTieuChuan.toString();
        }
        

        if (updatedData.ChiDinhLoaiTaiSan) {
            updatedData.chiDinhLoaiTaiSan = updatedData.ChiDinhLoaiTaiSan;
            delete updatedData.ChiDinhLoaiTaiSan;
        }

        console.log("Data before sending:", updatedData); // Kiểm tra dữ liệu trước khi gửi

        await callGolangAPI(`products/${id}`, updatedData, 'patch');
        navigate('/products');
    } catch (error) {
        console.error('Error updating product:', error);
        setError(error.response?.data?.error || 'Error updating product.');
    }
};

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    if (!formData) {
        return <div>Product not found.</div>;
    }

    return (
      <div className="flex flex-col min-h-screen mx-auto max-w-[1200px] bg-gray-100">
        <Header />
        <div className="w-full py-12 px-20">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 py-3">Sửa Sản Phẩm</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cột 1 */}
              <div className="space-y-8">
                {/* maHang */}
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

                {/* nhomHangID */}
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
                      <option key={nhomHang.id} value={nhomHang.id.toString()}>
                        {nhomHang.tenNhom}
                      </option>
                    ))}
                  </select>
                </div>

                {/* tenSanPham */}
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


                {/* donViTinh */}
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
        {/* coPhieuMoDau */}
        <div>
            <label htmlFor="coPhieuMoDau" className="block text-sm font-medium text-gray-700">
                Cổ phiếu mở đầu
            </label>
            <input
                type="number"  // Use type="number" for numeric input
                id="coPhieuMoDau"
                name="coPhieuMoDau"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
                value={formData.coPhieuMoDau}
                onChange={handleChange}
            />
        </div>

{/* dinhGia */}
<div>
    <label htmlFor="dinhGia" className="block text-sm font-medium text-gray-700">
        Định giá
    </label>
    <input
        type="number" // Use type="number" for numeric input
        id="dinhGia"
        name="dinhGia"
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        required
        value={formData.dinhGia}
        onChange={handleChange}
    />
</div>

{/* tyGiaBanHangTieuChuan */}
<div>
    <label htmlFor="tyGiaBanHangTieuChuan" className="block text-sm font-medium text-gray-700">
        Tỷ giá bán hàng tiêu chuẩn
    </label>
    <input
        type="number"  // Use type="number" for numeric input
        id="tyGiaBanHangTieuChuan"
        name="tyGiaBanHangTieuChuan"
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        required
        value={formData.tyGiaBanHangTieuChuan}
        onChange={handleChange}
    />
</div>

{/* chiDinhLoaiTaiSan */}
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
        value={formData.ChiDinhLoaiTaiSan}
        onChange={handleChange}
    />
</div>

{/* hanSuDung */}
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


{/* status */}
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