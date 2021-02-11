import { all, call } from "redux-saga/effects";
import transactions from './transactions'

export default function* () {
  yield all([
    call(transactions)
  ]);
}