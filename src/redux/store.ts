import {configureStore} from "@reduxjs/toolkit";
import {api} from "@/redux/api/apiSlice";
import userReducer from "./features/users/userSlice";
import cartReducer from "./cart/cartSlice";

let user;
if (typeof window !== "undefined") {
  const userString: string | null = localStorage.getItem('user');
  if (userString) {
    user = JSON.parse(userString);
  }
}

let cart;
if (typeof window !== "undefined") {
  const cartString: string | null = localStorage.getItem('cart');
  if (cartString) {
    cart = JSON.parse(cartString);
  }
}

const initialState = {
  user: {
    userInfo: user?.userInfo || null,
    accessToken: user?.accessToken || null,
  },
  cart: cart || undefined,
};

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  preloadedState: initialState,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

if (typeof window !== "undefined") {
  store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('cart', JSON.stringify(state.cart));
  });
}

export default store
