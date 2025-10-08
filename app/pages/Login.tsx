import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmail } from '../store/slices/authSlice';
import type { RootState } from '../store';
import { PanelsTopLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export default function LoginPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector((s: RootState) => s.auth.loading);
	const error = useSelector((s: RootState) => s.auth.error);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await dispatch<any>(signInWithEmail({ email, password }));
		if (!res.error) {
			const session = res.payload?.session;
			const emailConfirmed = Boolean(session?.user?.email_confirmed_at || session?.user?.confirmed_at);
			if (!emailConfirmed) {
				navigate('/verify');
			} else {
				navigate('/dashboard');
			}
		}
	};

	return (
		<main className="min-h-screen flex items-center justify-center relative p-6">
			{/* Dark gradient backdrop */}
			<div className="absolute inset-0 -z-10 bg-[#0b1014]" />
			<div className="absolute -z-10 inset-0 pointer-events-none">
				<div className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[46rem] rounded-full bg-gradient-to-r from-teal-500/25 to-blue-600/25 blur-3xl" />
				<div className="absolute top-48 right-10 h-56 w-56 rounded-full bg-gradient-to-tr from-indigo-600/20 to-blue-500/20 blur-2xl" />
			</div>
			<div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 text-white shadow-xl">
				<div className="flex items-center gap-2 font-semibold">
					<PanelsTopLeft className="w-5 h-5" />
					<span>FleetPulse</span>
				</div>
				<h1 className="mt-4 text-2xl font-bold">Login</h1>
				<form className="mt-6 space-y-4" onSubmit={onSubmit}>
					<input className="w-full border border-white/20 rounded-xl px-4 py-3 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<input className="w-full border border-white/20 rounded-xl px-4 py-3 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					{error && <div className="text-sm text-white">{error}</div>}
					<button disabled={loading} className="w-full px-4 py-3 rounded-xl bg-black text-white hover:bg-white/10 border border-white/20 transition">{loading ? 'Signing in...' : 'Sign In'}</button>
				</form>
				<div className="mt-4 text-sm text-white/80">
					No account? <Link to="/register" className="text-white underline">Register</Link>
				</div>
			</div>
		</main>
	);
}


