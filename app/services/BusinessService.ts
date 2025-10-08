import { getSupabaseClient } from '../../design/supabaseClient';

export type Business = { id: string; name: string };

class BusinessService {
	private static instance: BusinessService | null = null;

	static getInstance(): BusinessService {
		if (!BusinessService.instance) BusinessService.instance = new BusinessService();
		return BusinessService.instance;
	}

    async listForCurrentUser(): Promise<Business[]> {
        const supabase = getSupabaseClient();
        const { data: auth } = await supabase.auth.getUser();
        const userId = auth.user?.id;
        if (!userId) return [];
        const { data, error } = await supabase
            .from('user_business')
            .select('businesses(id,name)')
            .eq('user_id', userId);
        if (error) throw error;
        return (data || []).map((row: any) => row.businesses as Business);
    }

	async create(name: string): Promise<Business> {
		const supabase = getSupabaseClient();
		const { data, error } = await supabase.from('businesses').insert({ name }).select('id,name').single();
		if (error) throw error;
		return data as Business;
	}

    private async getOwnerRoleId(): Promise<string | null> {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.from('roles').select('id,name').eq('name', 'Owner').maybeSingle();
        if (error) return null;
        return (data as any)?.id || null;
    }

    async linkUserToBusinessAsOwner(userId: string, businessId: string): Promise<void> {
        const supabase = getSupabaseClient();
        const roleId = await this.getOwnerRoleId();
        const payload: any = { user_id: userId, business_id: businessId };
        if (roleId) payload.role_id = roleId;
        const { error } = await supabase.from('user_business').insert(payload);
        if (error) throw error;
    }

    async createBusinessForUser(userId: string, name: string): Promise<Business> {
        const business = await this.create(name);
        await this.linkUserToBusinessAsOwner(userId, business.id);
        return business;
    }
}

export default BusinessService;


