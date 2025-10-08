import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { PanelsTopLeft, Mail } from 'lucide-react';
import { Link } from 'react-router';

export default function VerifyNoticePage() {
    const user = useSelector((s: RootState) => s.auth.user as any);
    return (
        <main className="min-h-screen flex items-center justify-center relative p-6">
            <div className="absolute inset-0 -z-10 bg-[#0b1014]" />
            <div className="absolute -z-10 inset-0 pointer-events-none">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[46rem] rounded-full bg-gradient-to-r from-teal-500/25 to-blue-600/25 blur-3xl" />
                <div className="absolute top-48 right-10 h-56 w-56 rounded-full bg-gradient-to-tr from-indigo-600/20 to-blue-500/20 blur-2xl" />
            </div>
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 text-white shadow-xl text-center">
                <div className="mx-auto w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 font-semibold">
                    <PanelsTopLeft className="w-5 h-5" />
                    <span>FleetPulse</span>
                </div>
                <h1 className="mt-2 text-2xl font-bold">Verify your email</h1>
                <p className="mt-2 text-white/80">We've sent a confirmation link to {user?.email || 'your email'}. Please verify to unlock all features.</p>
                <div className="mt-6">
                    <Link to="/login" className="px-5 py-3 rounded-xl bg-white text-black hover:bg-black/10 transition">Back to Login</Link>
                </div>
            </div>
        </main>
    );
}


