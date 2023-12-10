import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/Auth";
import { userApi } from "../services/User";
import authSlice from "../slices/authSlice";
import { garageApi } from "../services/Garage";
import { serviceApi } from "../services/Service";
import { formApi } from "../services/OrderForm";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [garageApi.reducerPath]: garageApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [formApi.reducerPath]: formApi.reducer,
    authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      garageApi.middleware,
      serviceApi.middleware,
      formApi.middleware
    ),
});
setupListeners(store.dispatch);
