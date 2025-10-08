import { getSupabaseClient } from '../../design/supabaseClient';
import type { Permissions } from '../../design/rbac';

class RoleService {
	private static instance: RoleService | null = null;

	static getInstance(): RoleService {
		if (!RoleService.instance) RoleService.instance = new RoleService();
		return RoleService.instance;
	}

	async getPermissionsForCurrentUser(businessId: string): Promise<Partial<Permissions> | null> {
		const supabase = getSupabaseClient();
		const { data, error } = await supabase
			.from('user_business')
			.select('roles(permissions)')
			.eq('business_id', businessId)
			.single();
		if (error) throw error;
		return (data as any)?.roles?.permissions || null;
	}
}

export default RoleService;


