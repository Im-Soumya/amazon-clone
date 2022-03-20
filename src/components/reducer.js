export const initialState = {
  basket: []
}

export const getBasketTotal = (basket) =>
  basket?.reduce((amt, item) => item.price + amt, 0)

const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item]
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(item => item.id === action.id)
      let newBasket = [...state.basket]
      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn(`Can't remove the product ${action.id} as it's not there in the basket!`)
      }

      return {
        ...state,
        basket: newBasket
      }

    default:
      return state;
  }
}

export default reducer;