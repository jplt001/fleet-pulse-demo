import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import authReducer from './slices/authSlice';
import businessReducer from './slices/businessSlice';
import roleReducer from './slices/roleSlice';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
    business: businessReducer,
    roles: roleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;