import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteProduct = async () => {
      try {
        await axios.delete(`http://localhost:8080/v1/products/${id}`);
        // Chuyển hướng về trang danh sách sản phẩm sau khi xóa thành công
        navigate('/products');
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        // Xử lý lỗi, hiển thị thông báo lỗi cho người dùng
      }
    };

    deleteProduct();
  }, [id]);

  return (
    <div>
      {/* Có thể thêm nội dung hiển thị trong khi đang xóa sản phẩm */}
      Đang xóa sản phẩm...
    </div>
  );
};

export default DeleteProductPage;