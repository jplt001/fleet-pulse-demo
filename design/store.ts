import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import businessReducer from './slices/businessSlice';
import roleReducer from './slices/roleSlice';
import vehicleReducer from './slices/vehicleSlice';
import driverReducer from './slices/driverSlice';
import tripReducer from './slices/tripSlice';
import maintenanceReducer from './slices/maintenanceSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		business: businessReducer,
		roles: roleReducer,
		vehicles: vehicleReducer,
		drivers: driverReducer,
		trips: tripReducer,
		maintenance: maintenanceReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


