import { all } from "redux-saga/effects";
import { productSaga } from "./Slices/productsSlice";

export default function* rootSaga() {
  yield all([productSaga()]);
}
