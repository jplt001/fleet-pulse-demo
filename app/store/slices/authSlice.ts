import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getSupabaseClient } from '../../../design/supabaseClient';
import BusinessService from '../../services/BusinessService';

export interface AuthUser {
	id: string;
	email: string | null;
}

export interface SessionState {
	user: AuthUser | null;
	session: any | null;
	loading: boolean;
	error: string | null;
}

const initialState: SessionState = {
	user: null,
	session: null,
	loading: false,
	error: null,
};

export const signInWithEmail = createAsyncThunk(
	'auth/signInWithEmail',
	async (payload: { email: string; password: string }) => {
		const supabase = getSupabaseClient();
		const { data, error } = await supabase.auth.signInWithPassword(payload);
		if (error) throw new Error(error.message);
		return data;
	}
);

export const signUpWithEmail = createAsyncThunk(
    'auth/signUpWithEmail',
    async (payload: { email: string; password: string; firstName?: string; lastName?: string; accountType?: 'individual' | 'business'; businessName?: string }) => {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.auth.signUp({
            email: payload.email,
            password: payload.password,
            options: {
                emailRedirectTo: (typeof window !== 'undefined' ? window.location.origin : '') + '/login',
                data: {
                    first_name: payload.firstName || null,
                    last_name: payload.lastName || null,
                    account_type: payload.accountType || 'individual',
                    business_name: payload.businessName || null,
                },
            },
        } as any);
        if (error) throw new Error(error.message);
        // Do not create business immediately if email confirmation is required.
        // We'll handle first-business creation after the user confirms and logs in.
        return data;
    }
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
	const supabase = getSupabaseClient();
	await supabase.auth.signOut();
	return true;
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setSession(state, action: PayloadAction<{ user: AuthUser | null; session: any | null }>) {
			state.user = action.payload.user;
			state.session = action.payload.session;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signInWithEmail.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signInWithEmail.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user as any;
				state.session = action.payload.session;
			})
			.addCase(signInWithEmail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Sign in failed';
			})
			.addCase(signUpWithEmail.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signUpWithEmail.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user as any;
				state.session = action.payload.session;
			})
			.addCase(signUpWithEmail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Sign up failed';
			})
			.addCase(signOut.fulfilled, (state) => {
				state.user = null;
				state.session = null;
			});
	},
});

export const { setSession } = authSlice.actions;
export default authSlice.reducer;


