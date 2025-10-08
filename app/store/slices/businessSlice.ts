import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getSupabaseClient } from '../../../design/supabaseClient';
import BusinessService from '../../services/BusinessService';

export interface Business {
	id: string;
	name: string;
}

interface BusinessState {
	currentBusinessId: string | null;
	all: Business[];
	loading: boolean;
}

const initialState: BusinessState = {
	currentBusinessId: null,
	all: [],
	loading: false,
};

export const fetchBusinesses = createAsyncThunk('business/fetch', async () => {
    const svc = BusinessService.getInstance();
    return await svc.listForCurrentUser();
});

const businessSlice = createSlice({
	name: 'business',
	initialState,
	reducers: {
		setCurrentBusinessId(state, action: PayloadAction<string | null>) {
			state.currentBusinessId = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBusinesses.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchBusinesses.fulfilled, (state, action) => {
				state.loading = false;
				state.all = action.payload;
				if (!state.currentBusinessId && action.payload.length > 0) {
					state.currentBusinessId = action.payload[0].id;
				}
			})
			.addCase(fetchBusinesses.rejected, (state) => {
				state.loading = false;
			});
	},
});

export const { setCurrentBusinessId } = businessSlice.actions;
export default businessSlice.reducer;


