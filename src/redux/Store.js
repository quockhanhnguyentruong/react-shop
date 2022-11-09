import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/cartSlice";
import loggedReducer from "./Slices/loggedSlice";
import productsReducer from "./Slices/productsSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import { confirmReducer } from "./Slices/confirmSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    isLogged: loggedReducer,
    products: productsReducer,
    confirm: confirmReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
