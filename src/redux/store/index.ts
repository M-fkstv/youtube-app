import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { videoApi } from '../api/api';
import { searchApi } from '../api/searchApi';
import { categoryReducer } from '../slices/categorySlise';

const store = configureStore({
  // reducer: {
  //   [videoApi.reducerPath]: videoApi.reducer,
  //   [searchApi.reducerPath]: searchApi.reducer,
  //   category: categoryReducer,
  // },
  reducer: combineReducers({
    [videoApi.reducerPath]: videoApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    category: categoryReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(videoApi.middleware, searchApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
