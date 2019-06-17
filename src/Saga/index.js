import { takeLatest, all } from "redux-saga/effects";
import { TestTypes } from "../Redux/TestRedux";
import { testFunction } from "./TestSaga";

export default function* root() {
  yield all([takeLatest(TestTypes.ON_TEST_REQUEST, testFunction)]);
}
