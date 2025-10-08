import { getSupabaseClient } from '../../design/supabaseClient';

export type Driver = { id: string; name: string; email: string | null };

class DriverService {
	private static instance: DriverService | null = null;

	static getInstance(): DriverService {
		if (!DriverService.instance) DriverService.instance = new DriverService();
		return DriverService.instance;
	}

	async list(businessId: string): Promise<Driver[]> {
		const supabase = getSupabaseClient();
		const { data, error } = await supabase.from('drivers').select('id,name,email').eq('business_id', businessId);
		if (error) throw error;
		return data as Driver[];
	}
}

export default DriverService;


