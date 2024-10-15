
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

//import Products from './pages/Products';
//import About from './pages/About';
//import Contact from './pages/Contact';
import ProductsPage from './pages/ProductsPage';
import AddProduct from './pages/AddProduct';
//import ItemGroups from "./pages/ItemGroups";
import  ItemGroupsPage from './pages/ItemGroupsPage';
import StockItemsReport from './pages/StockItemsReport';
import { useEffect } from 'react';
import productApi from './api/productsApi';
import EditProduct from './pages/EditProduct';
import DeleteProduct from './pages/DeleteProduct';
// import AddKhoHang from './pages/AddKhoHang'
import AddItemGroup from './pages/AddItemGroup';
import EditItemGroup from './pages/EditItemGroup';
import DeleteItemGroup from './pages/DeleteItemGroup';
import KhoHangPage from './pages/KhoHangPage';
import AddKhoHang from './pages/AddKhoHang';
import EditKhoHang from './pages/EditKhoHang';


function App() {
  useEffect (() => {
    const fetchProduct = async () => {
      const productList = await productApi.getAll();
      console.log(productList);
    }
   
    fetchProduct ();
  },[]);


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
         
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/item-groups" element={<ItemGroupsPage />} />  
          <Route path="/stock-items-report" element={<StockItemsReport />} />  
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/delete-product/:id" element={<DeleteProduct />} /> 
          {/* <Route path="/warehouse" element={<AddKhoHang />} /> */}
          <Route path="/add-item-group" element={<AddItemGroup />} />
          <Route path="/edit-item-group/:id" element={<EditItemGroup />} />
          <Route path="/delete-item-group/:id" element={<DeleteItemGroup />} />
          <Route path="/warehouse" element={<KhoHangPage />} /> {/* Route cho danh sách kho hàng */}
          <Route path="/add-khohang" element={<AddKhoHang />} /> {/* Route cho form thêm kho hàng */}
          <Route path="/edit-khohang/:id" element={<EditKhoHang />} /> {/* Route cho form sửa kho hàng */}
          
          
      
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
{/* <Route path="/add-product" element={<AddProductPage />} /> */}