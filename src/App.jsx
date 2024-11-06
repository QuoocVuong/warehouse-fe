import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import AddProduct from './pages/AddProduct';
import ItemGroupsPage from './pages/ItemGroupsPage';
import StockItemsReport from './pages/StockItemsReport';
import EditProduct from './pages/EditProduct';
import DeleteProduct from './pages/DeleteProduct';
import AddItemGroup from './pages/AddItemGroup';
import EditItemGroup from './pages/EditItemGroup';
import DeleteItemGroup from './pages/DeleteItemGroup';
import KhoHangPage from './pages/KhoHangPage';
import AddKhoHang from './pages/AddKhoHang';
import EditKhoHang from './pages/EditKhoHang';
import LoginForm from './pages/LoginForm'; // Import LoginForm
import { isLoggedIn } from './api/auth'; // Import isLoggedIn
import RegisterForm from './pages/RegisterForm'; 


// Hàm kiểm tra đăng nhập, nếu chưa đăng nhập thì chuyển hướng sang trang `/login`
const ProtectedRoute = () => {
    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/*  React Router v6 không hỗ trợ thuộc tính element cho <Routes>
                        Chỉ component <Route> mới có element
                    */}
                     <Route path="/login" element={<LoginForm />} />
                     <Route path="/register" element={<RegisterForm />} />




                    <Route path="/login" element={<LoginForm />} />

                    <Route element={<ProtectedRoute/>}> {/*  */}

                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/item-groups" element={<ItemGroupsPage />} />
                        <Route path="/stock-items-report" element={<StockItemsReport />} />
                        <Route path="/edit-product/:id" element={<EditProduct />} />
                        <Route path="/delete-product/:id" element={<DeleteProduct />} />
                        <Route path="/add-item-group" element={<AddItemGroup />} />
                        <Route path="/edit-item-group/:id" element={<EditItemGroup />} />
                        <Route path="/delete-item-group/:id" element={<DeleteItemGroup />} />
                        <Route path="/warehouse" element={<KhoHangPage />} />
                        <Route path="/add-khohang" element={<AddKhoHang />} />
                        <Route path="/edit-khohang/:id" element={<EditKhoHang />} />


                    </Route>


                </Routes>
            </div>
        </Router>
    );
}

export default App;