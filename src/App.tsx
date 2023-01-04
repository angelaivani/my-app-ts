import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from "react-router-dom";

import Landing from './pages/Landing'
import AddProduct from './pages/AddProduct'
import ProductList from './pages/ProductList'
import BuggyPage from './pages/BuggyPage'
import './App.css';

function App() {
  


  return (
    <div className="App">              
        <BrowserRouter>
        <Link to="/" style={{ marginRight: '15px' }}>Landing Page</Link>
        <Link to="/product/list" style={{ marginRight: '15px' }}>Product List</Link>
        <Link to="/product/add" style={{ marginRight: '15px' }}>Product Add</Link>
        <Link to="/buggy-page" style={{ marginRight: '15px' }}>Buggy Page</Link>
        <br />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/list" element={<ProductList />} />          
          <Route path="/buggy-page" element={<BuggyPage />} />
        
          
        </Routes>
        </BrowserRouter>      
    </div>
  );
}

export default App;
