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
                productData.nhomHangID = productData.nhomHangID ? parseInt(productData.nhomHangID, 10) : null;
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
                newValue = null;
            }
        } else if (name === "coPhieuMoDau" || name === "dinhGia" || name === "tyGiaBanHangTieuChuan") {
            newValue = parseFloat(value);
            if (isNaN(newValue)) {
              newValue = 0;
            }
        } else if (name === "hanSuDung") {
            newValue = value; // Keep the date value as a string
        }

        setFormData(prevData => ({ ...prevData, [name]: newValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const updatedData = { ...formData };

          // Convert number fields to string if required by the backend
          ["coPhieuMoDau", "dinhGia", "tyGiaBanHangTieuChuan"].forEach(field => {
              if (typeof updatedData[field] === 'number') {
                  updatedData[field] = updatedData[field].toString();
              }
          });

          if (updatedData.ChiDinhLoaiTaiSan) {
            updatedData.chiDinhLoaiTaiSan = updatedData.ChiDinhLoaiTaiSan;
            delete updatedData.ChiDinhLoaiTaiSan;
          }
          // Correct the hanSuDung format if it exists
          if (updatedData.hanSuDung) {
              updatedData.hanSuDung = moment(updatedData.hanSuDung).format('YYYY-MM-DDTHH:mm:ssZ'); // ISO 8601 format
          }

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

                    <form onSubmit={handleSubmit}>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-md shadow-md">
                                <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
                                    {[
                                        { label: "Mã hàng", id: "maHang", type: "text" },
                                        { label: "Nhóm Hàng", id: "nhomHangID", type: "select", options: nhomHangs },
                                        { label: "Tên sản phẩm", id: "tenSanPham", type: "text" },
                                        { label: "Đơn vị tính", id: "donViTinh", type: "text" },
                                        { label: "Cổ phiếu mở đầu", id: "coPhieuMoDau", type: "number" },
                                        { label: "Định giá", id: "dinhGia", type: "number" },
                                        { label: "Tỷ giá bán hàng tiêu chuẩn", id: "tyGiaBanHangTieuChuan", type: "number" },
                                        { label: "Chỉ định loại tài sản", id: "chiDinhLoaiTaiSan", type: "text" },
                                        { label: "Hạn sử dụng", id: "hanSuDung", type: "date" },
                                        { label: "Trạng thái", id: "status", type: "select", options: [{ id: "selling", tenNhom: "Selling" }, { id: "out_of_stock", tenNhom: "Out of Stock" }] }
                                    ].map(({ label, id, type, options }) => (
                                        <tr key={id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium">{label}</td>
                                            <td className="px-4 py-3">
                                                {type === "select" ? (
                                                    <select
                                                        id={id}
                                                        name={id}
                                                        value={formData[id]}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    >
                                                        <option value="">Select {label}</option>
                                                        {options.map((option) => (
                                                            <option key={option.id} value={option.id}>
                                                                {option.tenNhom}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        type={type}
                                                        id={id}
                                                        name={id}
                                                        value={formData[id]}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md"
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-end mt-6">
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
