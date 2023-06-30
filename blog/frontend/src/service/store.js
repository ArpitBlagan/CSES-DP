import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { blogsApi } from './blogs';
import { userApi } from './user';
import { queryApi } from './query';
const store=configureStore({
    reducer:{
        [blogsApi.reducerPath]:blogsApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [queryApi.reducerPath]:queryApi.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat([blogsApi.middleware,userApi.middleware,queryApi.middleware])
});
export default store;