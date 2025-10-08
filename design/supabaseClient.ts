import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
	if (cachedClient) return cachedClient;

	const url = (import.meta as any).env?.VITE_SUPABASE_URL as string | undefined;
	const anonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string | undefined;

	if (!url || !anonKey) {
		throw new Error('Supabase credentials are missing. Define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Vite env.');
	}

	cachedClient = createClient(url, anonKey);
	return cachedClient;
}


