import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './redux/actions/productActions';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Form from './components/Form';
import Order from './components/Order';
import './Styles/styles.css';

const App = () => {

  const dispatch = useDispatch();
  const handleProductSelect = (product) => {
    console.log('Выбранный продукт:', product);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<ProductList onSelect={handleProductSelect} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Form />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
