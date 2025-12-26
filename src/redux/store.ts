import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";

const store = configureStore({
   reducer: {
      products: productSlice,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export default store;
