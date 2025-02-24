import React, { useState } from 'react';
import '../Styles/ProductCard.css';

const ProductCard = ({ product, onSelect }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onSelect(product);
    setIsAdded(true);

   
    setTimeout(() => {
      setIsAdded(false);
    }, 2000); // 
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description || 'Описание товара скоро появится!'}</p>
        <p className="product-price">{product.price} руб.</p>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={isAdded}
        className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
      >
        {isAdded ? 'Товар добавлен в корзину' : 'Добавить в корзину'}
      </button>
    </div>
  );
};

export default ProductCard;
