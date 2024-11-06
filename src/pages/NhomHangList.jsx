import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { callGolangAPI } from '../api/auth'; // Import callGolangAPI

const ItemGroupList = () => {
    const [nhomHangs, setNhomHangs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNhomHangs = async () => {
            setIsLoading(true);
            try {
                const data = await callGolangAPI('itemgroups', {}, 'get'); // Sử dụng callGolangAPI
                if (data.data) { // Kiểm tra xem data.data có tồn tại không
                  setNhomHangs(data.data);
                } else {
                  console.error("Invalid data format from API:", data);
                  setError(new Error("Invalid data format from API"));
                }
            } catch (error) {
                setError(error);
                console.error("Error fetching item groups:", error); // Log ra lỗi cụ thể hơn
            } finally {
                setIsLoading(false);
            }
        };

        fetchNhomHangs();
    }, []);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Hiển thị message của lỗi
    }


    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Danh sách Nhóm Hàng</h2>
            <ul className="space-y-3">
                {nhomHangs.map((nhomHang) => (
                    <li key={nhomHang.id} className="px-4 py-2 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out">
                        <Link to={`/nhom-hangs/${nhomHang.id}`} className="text-gray-800">
                            {nhomHang.tenNhom}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemGroupList;