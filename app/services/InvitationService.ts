import { getSupabaseClient } from '../../design/supabaseClient';

export type InvitationInput = { email: string; business_id: string; role_id: string };

class InvitationService {
	private static instance: InvitationService | null = null;

	static getInstance(): InvitationService {
		if (!InvitationService.instance) InvitationService.instance = new InvitationService();
		return InvitationService.instance;
	}

	async invite(input: InvitationInput) {
		const supabase = getSupabaseClient();
		const { data, error } = await supabase.from('invitations').insert(input).select('*').single();
		if (error) throw error;
		return data;
	}
}

export default InvitationService;


