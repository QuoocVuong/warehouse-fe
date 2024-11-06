import { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState(''); // Lưu trữ dưới dạng string YYYY-MM-DD
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Kiểm tra validation ở frontend (có thể bổ sung thêm)
        if (password.length < 7) {
            setError('Password must be at least 7 characters');
            return;
        }

        // if (!/^\S+@\S+\.\S+$/.test(username)) {
        //     setError('Invalid email format');
        //     return;
        // }


        // Chuyển đổi ngày sinh sang đúng định dạng cho backend
        const dobDate = new Date(dob);
        const formattedDob = dobDate.toISOString().split('T')[0]; // Định dạng YYYY-MM-DD


        try {
            await register({
                username,
                password,
                firstName,
                lastName,
                dob: formattedDob, // Gửi định dạng ngày đúng cho backend
            });
            navigate('/login');
        } catch (error) {
            // Xử lý lỗi từ server và hiển thị thông báo lỗi cụ thể
            if (error.response) {
                const serverError = error.response.data.message;

                if (serverError.includes("USERNAME_INVALID")) {
                     setError("Username must be at least 4 characters");
                } else if (serverError.includes("PASSWORD_INVALID")) {
                    setError("Password must be at least 7 characters");
                }  else if (serverError.includes("USER_EXISTED")) {
                   setError("Username already exists");
                }
                 else if (serverError.includes("INVALID_DOB")) {
                    setError("Your age must be at least 15");
                 }else {
                    setError(serverError || 'Registration failed');
                }

            } else {
                setError('Registration failed');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-center">
                    <span className="text-2xl font-bold text-blue-500">E</span>
                </div>
                <h2 className="text-lg font-medium text-center mt-4 mb-6">Đăng Ký</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Họ</label>
                        <input
                            type="text"
                            id="firstName"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Tên</label>
                        <input
                            type="text"
                            id="lastName"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                        <input
                            type="date"
                            id="dob"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 mb-4" role="alert">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Đăng ký
                    </button>

                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-600">
                            Đã có tài khoản?{' '}
                            <Link to="/login" className="text-blue-500 hover:underline">Đăng Nhập</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;