import { createSlice } from "@reduxjs/toolkit";
import productService from "../../services/productService";
import { call, put, takeLatest } from "redux-saga/effects";
import singleProductService from "../../services/singleProductService";
import sagaActions from "../sagaActions";

const initialState = {
  productList: [],
  product: {},
};

function* fetchProductsSaga(action) {
  try {
    const data = yield call(productService.getProductList, action.payload);
    yield put(setProducts(data.products));
  } catch (e) {
    throw new Error(e);
  }
}

function* fetchProductSaga(action) {
  try {
    const data = yield call(
      singleProductService.getProduct,
      action.id,
      action.payload
    );
    yield put(setProduct(data));
  } catch (e) {
    throw new Error(e);
  }
}

export function* productSaga() {
  yield takeLatest(sagaActions.FETCH_PRODUCTS, fetchProductsSaga);
  yield takeLatest(sagaActions.FETCH_PRODUCT, fetchProductSaga);
}

const addQuantity = (product) => {
  const isProducts = !!product.length;
  if (isProducts) {
    return product.map((product) => {
      return { quantity: 1, ...product };
    });
  }
  return { quantity: 1, ...product };
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productList = addQuantity(action.payload);
    },
    setProduct: (state, action) => {
      state.product = addQuantity(action.payload);
    },
  },
});

export const { setProduct, setProducts } = productsSlice.actions;

export default productsSlice.reducer;
