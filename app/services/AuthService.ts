import { getSupabaseClient } from '../../design/supabaseClient';

export type AuthUser = { id: string; email: string | null };

class AuthService {
	private static instance: AuthService | null = null;

	static getInstance(): AuthService {
		if (!AuthService.instance) AuthService.instance = new AuthService();
		return AuthService.instance;
	}

	async signInWithEmail(email: string, password: string) {
		const supabase = getSupabaseClient();
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) throw error;
		return data;
	}

	async signUpWithEmail(email: string, password: string) {
		const supabase = getSupabaseClient();
		const { data, error } = await supabase.auth.signUp({ email, password });
		if (error) throw error;
		return data;
	}

	async signOut() {
		const supabase = getSupabaseClient();
		await supabase.auth.signOut();
	}

	onAuthStateChange(callback: (payload: { user: AuthUser | null; session: any | null }) => void) {
		const supabase = getSupabaseClient();
		const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
			callback({ user: (session?.user as any) || null, session });
		});
		return () => listener.subscription.unsubscribe();
	}
}

export default AuthService;


