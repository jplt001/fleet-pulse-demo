import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpWithEmail } from '../store/slices/authSlice';
import type { RootState } from '../store';
import { PanelsTopLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export default function RegisterPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector((s: RootState) => s.auth.loading);
	const error = useSelector((s: RootState) => s.auth.error);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [accountType, setAccountType] = useState<'individual' | 'business'>('individual');
	const [businessName, setBusinessName] = useState('');
	const [notice, setNotice] = useState('');
	const [success, setSuccess] = useState(false);
	const clearFields = () => {
		setFirstName('');
		setLastName('');
		setEmail('');
		setPassword('');
		setAccountType('individual');
		setBusinessName('');
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (password.length < 8) {
			setNotice('Password must be at least 8 characters.');
			return;
		}
		const res = await dispatch<any>(signUpWithEmail({ email, password, firstName, lastName, accountType, businessName: accountType==='business' ? businessName : undefined }));
		if (!res.error) {
			setSuccess(true);
			clearFields();
			setTimeout(() => navigate('/login'), 1200);
			setNotice('Check your email to confirm your account, then log in.');
		}
	};

	return (
		<main className="min-h-screen flex items-center justify-center relative p-6">
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
				<h1 className="mt-4 text-2xl font-bold">Create account</h1>
				{/* Move account type selection to top */}
				<div className="mt-4">
					<div role="tablist" aria-label="Account type" className="rounded-xl border border-white/20 p-1 flex">
						<button
							type="button"
							role="tab"
							aria-selected={accountType==='individual'}
							onClick={() => setAccountType('individual')}
							className={`flex-1 px-4 py-2 rounded-lg transition ${accountType==='individual' ? 'bg-white text-black' : 'text-white/80 hover:text-white'}`}
						>
							I'm an Individual
						</button>
						<button
							type="button"
							role="tab"
							aria-selected={accountType==='business'}
							onClick={() => setAccountType('business')}
							className={`flex-1 px-4 py-2 rounded-lg transition ${accountType==='business' ? 'bg-white text-black' : 'text-white/80 hover:text-white'}`}
						>
							I'm a Business
						</button>
					</div>
					{accountType === 'business' && (
						<div className="mt-3">
							<input className="w-full border border-white/20 rounded-xl px-4 py-3 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="Business name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
						</div>
					)}
				</div>

				<form className="mt-6 space-y-4" onSubmit={onSubmit}>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<input className="w-full border border-white/20 rounded-xl px-4 py-3 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
						<input className="w-full border border-white/20 rounded-xl px-4 py-3 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
					</div>
					<input className="w-full border border-white/20 rounded-xl px-4 py-3 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<input className="w-full border border-white/20 rounded-xl px-4 py-3 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					{(error || notice) && (
						<div className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-3 text-white">
							<svg className="w-5 h-5 flex-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4"/><path d="M2 12h4"/><path d="M12 2v4"/><path d="M12 22v-4"/><path d="M19.07 4.93l-2.83 2.83"/><path d="M7.76 16.24l-2.83 2.83"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/></svg>
							<div className="text-sm leading-6">
								<div className="font-semibold">{error ? 'Something went wrong' : 'Email confirmation required'}</div>
								<div className="opacity-80">{error || notice}</div>
							</div>
						</div>
					)}
					<button disabled={loading} className="w-full px-4 py-3 rounded-xl bg-black text-white hover:bg-white/10 border border-white/20 transition">{loading ? 'Creating...' : 'Create account'}</button>
				</form>
				<div className="mt-4 text-sm text-white/80">
					Have an account? <Link to="/login" className="text-white underline">Login</Link>
				</div>
			</div>

			{/* Success Overlay */}
			{success && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div className="absolute inset-0 bg-black/60" />
					<div role="alertdialog" aria-modal="true" className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-8 text-white text-center shadow-2xl animate-[fadeIn_.2s_ease-out]">
						<div className="mx-auto w-16 h-16 rounded-full bg-white text-black flex items-center justify-center animate-[pop_.25s_ease-out]">
							<svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
						</div>
						<h2 className="mt-4 text-xl font-bold">Account created</h2>
						<p className="mt-1 text-white/80">Redirecting to login…</p>
						<div className="mt-4 h-1 w-full bg-white/20 rounded-full overflow-hidden">
							<div className="h-full w-0 bg-white animate-[loadBar_1.1s_linear_forwards]" />
						</div>
						<button onClick={() => navigate('/login')} className="mt-4 px-4 py-2 rounded-xl bg-white text-black hover:bg-black/10 transition">Continue now</button>
						<div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none">
							<div className="absolute left-1/2 top-0 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-teal-500/30 to-blue-600/30 blur-3xl animate-pulse" />
							{/* simple sparkles */}
							<div className="absolute inset-0">
								{Array.from({ length: 12 }).map((_, i) => (
									<span key={i} className="absolute block w-1 h-1 bg-white rounded-full" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, opacity: 0.7 }} />
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}


