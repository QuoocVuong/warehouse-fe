import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import moment from 'moment';
import { callGolangAPI } from '../api/auth';

const AddProductPage = () => {
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
        const fetchNhomHangs = async () => {
            try {
                const data = await callGolangAPI('itemgroups', {}, 'get');
                setNhomHangs(data.data);
            } catch (error) {
                console.error('Error fetching item groups:', error);
            }
        };
        fetchNhomHangs();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (["coPhieuMoDau", "dinhGia", "tyGiaBanHangTieuChuan"].includes(name)) {
            newValue = value ? parseFloat(value) : 0;
        } else if (name === "nhomHangID") {
            newValue = parseInt(value, 10) || "";
        }

        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const formattedHanSuDung = moment(formData.hanSuDung).format('YYYY-MM-DDTHH:mm:ssZ');
            const payload = {
                ...formData,
                hanSuDung: formattedHanSuDung,
                coPhieuMoDau: parseFloat(formData.coPhieuMoDau),
                dinhGia: parseFloat(formData.dinhGia),
                tyGiaBanHangTieuChuan: parseFloat(formData.tyGiaBanHangTieuChuan),
            };
            await callGolangAPI('products', payload, 'post');
            navigate('/products');
        } catch (error) {
            console.error('Error adding product:', error);
            setError(error.response?.data?.error || 'Error adding product.');
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
