import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/productActions';
import ProductCard from './ProductCard';

const ProductList = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const handleSelect = (product) => {
    dispatch(addToCart(product));
  };

  if (!Array.isArray(products)) {
    return <p>Загрузка данных...</p>;
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === 'price') return a.price - b.price;
    if (sortType === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const filteredProducts = filterCategory
    ? sortedProducts.filter((product) => product.category === filterCategory)
    : sortedProducts;

  return (
    <div>
      <h1 className="title">Добро пожаловать в FlanStore</h1>
      <p className="subtitle">
        У нас вы найдете лучшие товары для дома по отличным ценам!
      </p>

      <div className="filters">
        <label>
          Сортировать по:
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="">Без сортировки</option>
            <option value="price">Цена</option>
            <option value="name">Название</option>
          </select>
        </label>
        <label>
          Фильтр по категории:
          <select onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="">Все категории</option>
            <option value="kitchen">Кухонные приборы</option>
            <option value="appliances">Бытовая техника</option>
            <option value="clothes">Одежда</option>
          </select>
        </label>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
