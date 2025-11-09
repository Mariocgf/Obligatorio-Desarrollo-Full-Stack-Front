import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth.slice';
import usuarioReducer from '../features/usuarioInfo.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: usuarioReducer
  },
});