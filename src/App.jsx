
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

//import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
//import ItemGroups from "./pages/ItemGroups";



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
         
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/add-product" element={<AddProductPage />} />  
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
{/* <Route path="/add-product" element={<AddProductPage />} /> */}