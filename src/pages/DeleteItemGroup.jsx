
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteItemGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/v1/itemgroups/${id}`);
      navigate('/item-groups');
    } catch (error) {
      console.error('Lỗi khi xóa nhóm hàng', error);
      // Xử lý lỗi, hiển thị thông báo lỗi cho người dùng
    }
  };

  return (
    <div>
      <p>Bạn có chắc chắn muốn xóa nhóm hàng này?</p>
      <button onClick={handleDelete}>Xóa</button>
      <button onClick={() => navigate(-1)}>Hủy</button> 
    </div>
  );
};

export default DeleteItemGroup;