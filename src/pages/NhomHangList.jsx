import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ItemGroupList = () => {
  const [nhomHangs, setNhomHangs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNhomHangs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/nhom-hangs'); // Thay /api/nhom-hangs bằng endpoint API của bạn
        setNhomHangs(response.data);
      } catch (error) {
        setError(error);
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
    return <div>Error: {error.message}</div>;
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