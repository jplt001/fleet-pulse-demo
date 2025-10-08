import { getSupabaseClient } from '../../design/supabaseClient';

export type Maintenance = { id: string; date: string; cost: number; status: string; vehicle_id: string; notes?: string };

class MaintenanceService {
	private static instance: MaintenanceService | null = null;

	static getInstance(): MaintenanceService {
		if (!MaintenanceService.instance) MaintenanceService.instance = new MaintenanceService();
		return MaintenanceService.instance;
	}

	async list(businessId: string): Promise<Maintenance[]> {
		const supabase = getSupabaseClient();
		const { data, error } = await supabase.from('maintenance').select('*').eq('business_id', businessId).order('date', { ascending: false });
		if (error) throw error;
		return data as Maintenance[];
	}
}

export default MaintenanceService;


