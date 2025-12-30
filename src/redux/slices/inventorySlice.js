// Initial state
const initialState = {
  totalValue: 203.49, // Sum of default products (79.99 + 129.5 + 24.0)
  productCount: 3,
};

// Action types
export const UPDATE_INVENTORY = "UPDATE_INVENTORY";

// Action creator
export const updateInventory = (totalValue, productCount) => ({
  type: UPDATE_INVENTORY,
  payload: { totalValue, productCount },
});

// Reducer function
const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INVENTORY:
      return {
        ...state,
        totalValue: action.payload.totalValue,
        productCount: action.payload.productCount,
      };

    default:
      return state;
  }
};

export default inventoryReducer;
