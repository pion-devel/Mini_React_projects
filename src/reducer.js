const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }

  if (action.type === "REMOVE_ITEM") {
    return {
      ...state,
      cart: state.cart.filter((cardItem) => cardItem.id !== action.payload),
    };
  }

  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }

  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        cartTotal.amount += amount;
        cartTotal.total += price * amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }

  let tempCart = state.cart.map((cartItem) => {
    if (cartItem.id === action.payload) {
      return {
        ...cartItem,
        amount:
          action.type === "INCREASE_ITEM"
            ? cartItem.amount + 1
            : cartItem.amount - 1,
      };
    }
    return cartItem;
  });
  if (action.type === "INCREASE_ITEM") {
    return { ...state, cart: tempCart };
  } else if (action.type === "DECREASE_ITEM") {
    return {
      ...state,
      cart: tempCart.filter((cartItem) => cartItem.amount !== 0),
    };
  } else {
    return state;
  }
};

export default reducer;

/* if(action.type === "INCREASE_ITEM"){
  let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload){
          return {...cartItem, amount : cartItem.amount +1}
      }
      return cartItem
  })
  return {...state, cart: tempCart}
}
if(action.type === "DECREASE_ITEM"){
  let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload){ 
          return {...cartItem, amount : cartItem.amount - 1 }
      }
      return cartItem
  }).filter((cartItem) => cartItem.amount !== 0)
  return {...state, cart: tempCart}
}
  return state
} */
