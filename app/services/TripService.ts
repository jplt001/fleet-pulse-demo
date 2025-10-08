import { getSupabaseClient } from '../../design/supabaseClient';

export type Trip = { id: string; origin: string; destination: string; vehicle_id: string; driver_id: string; schedule: string; status: string };

class TripService {
	private static instance: TripService | null = null;

	static getInstance(): TripService {
		if (!TripService.instance) TripService.instance = new TripService();
		return TripService.instance;
	}

	async list(businessId: string): Promise<Trip[]> {
		const supabase = getSupabaseClient();
		const { data, error } = await supabase.from('trips').select('*').eq('business_id', businessId).order('created_at', { ascending: false });
		if (error) throw error;
		return data as Trip[];
	}
}

export default TripService;


