import { createStore, combineReducers } from "redux";
import productReducer from "./slices/productSlice";
import inventoryReducer from "./slices/inventorySlice";

// Combine all reducers
const rootReducer = combineReducers({
  products: productReducer,
  inventory: inventoryReducer,
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
