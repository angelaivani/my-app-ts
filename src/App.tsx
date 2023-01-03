import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import AddProduct from './pages/AddProduct'
import ProductList from './pages/ProductList'
import './App.css';

function App() {
  


  return (
    <div className="App">
      <h1>hello</h1>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/list" element={<ProductList />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
