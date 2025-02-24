const initialState = {
    name: "",
    phone: "",
    email: "",
    cardNumber: "",
    address: "",
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_ORDER_DATA":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  