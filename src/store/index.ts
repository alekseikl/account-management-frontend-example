import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from "immer"
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

export type RootState = ReturnType<typeof rootReducer>;
export { rootReducer };

enableMapSet()

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
