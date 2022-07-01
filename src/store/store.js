import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authSlice } from './auth'

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},

	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
})
