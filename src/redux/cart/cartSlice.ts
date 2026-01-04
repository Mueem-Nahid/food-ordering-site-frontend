import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface Addon {
  quantity: number;
  addon: { price: number };
}

interface SoftDrink {
  quantity: number;
  softDrink: { price: number };
}

interface Product {
  price: number;
  id: string;
  [key: string]: any;
}

interface CartItem {
  product: Product;
  quantity: number;
  addons: Addon[];
  softDrinks: SoftDrink[];
  prod_id: string;
  [key: string]: any;
}

interface CartState {
  cartItems: CartItem[];
  totalItems: number;
  amount: number;
}

const initialState: CartState = {
  cartItems: [],
  totalItems: 0,
  amount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<CartItem>) => {
      // Ensure deliveryDay is set in product
      const cartItem = {
        ...payload,
        product: {
          ...payload.product,
          deliveryDay: payload.product.deliveryDay || null,
        },
      };
      console.log("Cart item being added:", cartItem);
      state.cartItems = state.cartItems.concat(cartItem);
      state.totalItems += 1;
      payload.addons.forEach((element) => {
        state.amount += element.quantity * element.addon.price;
      });
      payload.softDrinks.forEach((element) => {
        state.amount += element.quantity * element.softDrink.price;
      });
      state.amount = payload.product.price * payload.quantity + state.amount;
      toast.success("Product Added To Cart!");
    },
    delCartItem: (state, { payload }: PayloadAction<{ id: string; price: number }>) => {
      const find = state.cartItems.find(
        (item) => item.product.id === payload.id
      );
      if (!find) return;
      const filter = state.cartItems.filter((item) => {
        return item.product.id !== payload.id;
      });
      find.addons.forEach((element) => {
        state.amount -= element.quantity * element.addon.price;
      });
      find.softDrinks.forEach((element) => {
        state.amount -= element.quantity * element.softDrink.price;
      });
      state.amount -= find.quantity * payload.price;
      state.cartItems = filter;
      state.totalItems -= 1;
    },
    increaseItemQuantity: (state, { payload }: PayloadAction<string>) => {
      const findItem = state.cartItems.find((item) => item.prod_id === payload);
      if (findItem === undefined) {
        return;
      }
      findItem.quantity += 1;
      state.amount += findItem.product.price;
    },
    decreaseItemQuantity: (state, { payload }: PayloadAction<string>) => {
      const findItem = state.cartItems.find((item) => item.prod_id === payload);
      if (findItem === undefined) {
        return;
      }
      findItem.quantity -= 1;
      state.amount -= findItem.product.price;
    },
    updateCartItem: (state, { payload }: PayloadAction<CartItem>) => {
      const find = state.cartItems.find(
        (item) => item.product.id === payload.prod_id
      );
      if (!find) return;
      find.addons.forEach((element) => {
        state.amount -= element.quantity * element.addon.price;
      });
      find.softDrinks.forEach((element) => {
        state.amount -= element.quantity * element.softDrink.price;
      });
      const filter = state.cartItems.filter((item) => {
        return item.product.id !== payload.prod_id;
      });
      state.amount -= find.quantity * payload.product.price;
      state.cartItems = filter;
      state.totalItems -= 1;
      // Ensure deliveryDay is set in product
      const cartItem = {
        ...payload,
        product: {
          ...payload.product,
          deliveryDay: payload.product.deliveryDay || null,
        },
      };
      console.log("Cart item being updated:", cartItem);
      state.cartItems = state.cartItems.concat(cartItem);
      state.totalItems += 1;
      payload.addons.forEach((element) => {
        state.amount += element.quantity * element.addon.price;
      });
      payload.softDrinks.forEach((element) => {
        state.amount += element.quantity * element.softDrink.price;
      });
      state.amount = payload.product.price * payload.quantity + state.amount;
      toast.success("Product Updated!");
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
      state.amount = 0;
    },
  },
});
export const {
  addToCart,
  delCartItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  updateCartItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
