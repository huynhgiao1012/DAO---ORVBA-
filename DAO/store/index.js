import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
// import {authApi} from '../services/Auth';
// import {userApi} from '../services/User';
import {mapApi} from '../services/Map';
// import authSlice from '../slices/authSlice';
// import {companyApi} from '../services/Company';
// import {serviceApi} from '../services/Service';
// import {notiApi} from '../services/Notification';
// import {formApi} from '../services/OrderForm';
// import {fbApi} from '../services/Feedback';

export const store = configureStore({
  reducer: {
    [mapApi.reducerPath]: mapApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(mapApi.middleware),
});
setupListeners(store.dispatch);
