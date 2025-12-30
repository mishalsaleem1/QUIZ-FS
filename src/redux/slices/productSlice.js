import watch from "../../assets/watch.png";
import headphones from "../../assets/headphones.png";
import charger from "../../assets/charger.png";

// Initial state with default products
const initialState = [
  {
    id: 1,
    name: "Smart Watch Pro",
    description: "Fitness tracking, heart rate monitor, 7-day battery life.",
    price: 79.99,
    image: watch,
  },
  {
    id: 2,
    name: "Noise-cancel Headphones",
    description: "Over-ear, active noise cancellation, 30h battery.",
    price: 129.5,
    image: headphones,
  },
  {
    id: 3,
    name: "Wireless Charger Pad",
    description: "Fast Qi charging, slim design, LED indicator.",
    price: 24.0,
    image: charger,
  },
];

// Action types
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

// Action creators
export const addProduct = (newProduct) => ({
  type: ADD_PRODUCT,
  payload: newProduct,
});

export const updateProduct = (productId, updatedData) => ({
  type: UPDATE_PRODUCT,
  payload: { productId, updatedData },
});

// Reducer function
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      // Generate new ID based on existing products
      const id = state.length ? Math.max(...state.map(p => p.id)) + 1 : 1;
      return [...state, { id, ...action.payload }];

    case UPDATE_PRODUCT:
      // Update product by ID
      return state.map((product) =>
        product.id === action.payload.productId
          ? { ...product, ...action.payload.updatedData }
          : product
      );

    default:
      return state;
  }
};

export default productReducer;
