import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        console.log("Username:", username); // Log username
        console.log("Password:", password); // Log password

        try {
            const loginResponse = await login(username, password);  // Lưu response vào biến

            console.log("Login Response:", loginResponse); // Log toàn bộ response

            // Kiểm tra xem token có tồn tại trong response hay không
            if (loginResponse && loginResponse.token) {
                localStorage.setItem('token', loginResponse.token);
                navigate('/'); // Chuyển hướng sau khi đăng nhập thành công
            } else {
                setError('Login failed: No token received'); // Thông báo lỗi nếu không nhận được token
            }


        } catch (error) {
            console.error('Login failed:', error);
            if (error.response) {
                setError(error.response.data.message || 'Login failed'); // Hiển thị thông báo từ server hoặc thông báo mặc định
            } else {
                setError('Login failed: Network error or server down'); // Thông báo lỗi kết nối
            }
            
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-center">
                    <span className="text-2xl font-bold text-blue-500">E</span> {/* Logo */}
                </div>
                <h2 className="text-lg font-medium text-center mt-4 mb-6">Đăng Nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            placeholder="jane@example.com"value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 relative"> {/* Thêm relative để đặt icon eye */}
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'} // Ẩn/hiện mật khẩu
                            id="password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                            onClick={() => setShowPassword(!showPassword)} // Xử lý sự kiện click
                        >
                            <i className={`fa-solid fa-eye${showPassword ? '' : '-slash'}`}></i> {/* Icon eye */}
                        </button>
                    </div>
                    {error && (
                        <div className="text-red-500 mb-4" role="alert">
                            {error}
                        </div>
                    )}

                    <div className="mb-4 text-center">
                        <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">Quên Mật Khẩu?</Link>
                    </div>
                  
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Đăng Nhập
                    </button>



                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-600">
                        Chưa có tài khoản?{' '}
                        <Link to="/register" className="text-blue-500 hover:underline">Đăng Ký</Link>
                       </span>
                     </div>

                </form>
            </div>
        </div>
    );
};



export default LoginForm;