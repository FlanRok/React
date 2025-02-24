import { getFromLocalStorage } from '../../components/localStorage';

const initialState = {
  products: [],
  cart: getFromLocalStorage('cart', []),
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return { ...state, products: action.payload };
    case 'UPDATE_CART':
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

export default productReducer;
