import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'
import Landing from './pages/Landing'
import AddProduct from './pages/AddProduct'
import ProductList from './pages/ProductList'
import BuggyPage from './pages/BuggyPage'
import './App.css';

function App() {
  


  return (
    <div className="App">
      <ErrorBoundary>
        <h1>hello</h1>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/list" element={<ProductList />} />
          <Route path="/buggy-page" element={<BuggyPage />} />
        </Routes>
        </BrowserRouter>
      </ErrorBoundary>      
    </div>
  );
}

export default App;
