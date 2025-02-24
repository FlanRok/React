import axios from 'axios';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/products.json'); 
      dispatch({
        type: 'FETCH_PRODUCTS',
        payload: response.data,
      });
    } catch (error) {
      console.error('Ошибка загрузки продуктов:', error);
    }
  };
};

export const addToCart = (product) => (dispatch, getState) => {
  const { cart } = getState().products;
  const existingItemIndex = cart.findIndex((item) => item.id === product.id);

  let updatedCart;

  if (existingItemIndex !== -1) {
    updatedCart = [...cart];
    updatedCart[existingItemIndex].quantity += 1;
  } else {
    updatedCart = [...cart, { ...product, quantity: 1 }];
  }

  dispatch({
    type: 'UPDATE_CART',
    payload: updatedCart,
  });
};

export const removeFromCart = (productId) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId,
});

export const updateCart = (updatedCart) => ({
  type: 'UPDATE_CART',
  payload: updatedCart,
});
