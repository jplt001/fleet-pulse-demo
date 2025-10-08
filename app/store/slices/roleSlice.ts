import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getSupabaseClient } from '../../../design/supabaseClient';
import type { Permissions } from '../../../design/rbac';

interface RoleState {
	permissions: Partial<Permissions> | null;
	loading: boolean;
}

const initialState: RoleState = {
	permissions: null,
	loading: false,
};

export const fetchRolePermissions = createAsyncThunk(
	'role/fetchPermissions',
	async (args: { businessId: string }) => {
		const supabase = getSupabaseClient();
		const { data, error } = await supabase
			.from('user_business')
			.select('roles(permissions)')
			.single();
		if (error) throw new Error(error.message);
		return (data as any)?.roles?.permissions as Permissions;
	}
);

const roleSlice = createSlice({
	name: 'roles',
	initialState,
	reducers: {
		setPermissions(state, action: PayloadAction<Partial<Permissions> | null>) {
			state.permissions = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRolePermissions.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchRolePermissions.fulfilled, (state, action) => {
				state.loading = false;
				state.permissions = action.payload;
			})
			.addCase(fetchRolePermissions.rejected, (state) => {
				state.loading = false;
			});
	},
});

export const { setPermissions } = roleSlice.actions;
export default roleSlice.reducer;


