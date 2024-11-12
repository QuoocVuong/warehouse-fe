import axios from 'axios';

const IDENTITY_SERVICE_URL = 'http://localhost:8081/identity';
const GOLANG_API_URL = 'http://localhost:8080/v1';


export const isTokenExpired = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Giả sử token là JWT
      const expirationTime = decodedToken.exp * 1000; // Thời gian hết hạn (mili giây)
  
      return Date.now() > expirationTime;
    } catch (error) {
      return true; // Giả sử token không hợp lệ
    }
  };

const register = async (userData) => {
    try {
        console.log("Data being sent:", userData); // Kiểm tra dữ liệu gửi đi
        const response = await axios.post(`${IDENTITY_SERVICE_URL}/users`, userData);
        console.log("Server response:", response); // Kiểm tra response
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        } else if (error.request) {
            console.error("Request:", error.request);
        } else {
            console.error('Error', error.message);
        }
        throw error;
    }
};



export { register };

const login = async (username, password) => {
    try {
        const response = await axios.post(`${IDENTITY_SERVICE_URL}/auth/token`, {
            username,
            password,
        });

        // Kiểm tra xem response có dữ liệu không trước khi truy cập
        const token = response.data?.result?.token;
        if (!token) {
            throw new Error("Login failed: Invalid response data"); // Hoặc thông báo lỗi cụ thể hơn
        }
        
        localStorage.setItem('token', token);
        return response.data.result;
    } catch (error) {
        console.error('Login failed:', error);
        // Xử lý lỗi chi tiết hơn nếu cần (ví dụ: hiển thị thông báo lỗi cụ thể cho từng trường hợp)
         if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.error(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
          }

        throw error; // Re-throw error để component xử lý
    }
};

const callIdentityAPI = async (endpoint, params = {}, method = 'get') => {
    try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const url = new URL(`${IDENTITY_SERVICE_URL}/${endpoint}`);

        if (method === 'get') {
            for (const key in params) {
                if (Object.hasOwn(params, key) && params[key] !== undefined && params[key] !== null && params[key] !== '') {
                    url.searchParams.append(key, params[key]);
                }
            }
        }

        const response = await axios({
            method,
            url: url.toString(),
            headers: {
                ...headers,
                'Content-Type': method !== 'get' ? 'application/json' : undefined,
            },
            data: method !== 'get' ? params : undefined,
        });

        return response.data; // Trả về dữ liệu từ response


    } catch (error) {
        console.error('Error calling Identity API:', error); // Sửa thông báo lỗi

        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = '/login';
        } else if (error.response) {
            console.log(error.response.data.message); // Log thông báo lỗi từ server
        }
       
        throw error; // Ném lỗi để component xử lý

    }
};
const callGolangAPI = async (endpoint, params = {}, method = 'get') => {
    try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const url = new URL(`${GOLANG_API_URL}/${endpoint}`); // Sử dụng URL object để build URL

        if (method === 'get') {
            for (const key in params) {
                if (Object.hasOwn(params, key) && params[key] !== undefined && params[key] !== null && params[key] !== '') {
                    url.searchParams.append(key, params[key]);
                }
            }
        }

        const response = await axios({
            method,
            url: url.toString(), // Chuyển đổi URL object thành string
            headers: {
                ...headers,
                'Content-Type': method !== 'get' ? 'application/json' : undefined,
            },
            data: method !== 'get' ? params : undefined, // Không cần stringify data
        });
        return response.data;
    } catch (error) {
        console.error('Error calling Golang API:', error);

         if (error.response && error.response.status === 401) {
            // Token hết hạn hoặc không hợp lệ, xử lý đăng xuất tự động
            localStorage.removeItem("token");
            window.location.href = '/login';  // Redirect về trang login
          } else if(error.response) {
            console.log(error.response.data.message);
          }

        throw error; 
    }
};



const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        if (token) { // Chỉ gọi API logout nếu có token
            await axios.post(`${IDENTITY_SERVICE_URL}/auth/logout`, { token });
        }
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Logout failed:', error);
        // Có thể xử lý lỗi cụ thể hơn (ví dụ: hiển thị thông báo lỗi)
        // hoặc im lặng bỏ qua lỗi logout (localStorage vẫn sẽ bị xóa)

        // Ở đây, chúng ta chọn im lặng bỏ qua lỗi và vẫn xóa localStorage
        localStorage.removeItem('token');
    }
};




const isLoggedIn = () => {
    return !!localStorage.getItem('token');
};

export { login, logout, callGolangAPI, isLoggedIn, callIdentityAPI };