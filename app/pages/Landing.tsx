import React from 'react';
import { PanelsTopLeft, Gauge, Truck, Users, Route as RouteIcon, CheckSquare, Wrench, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const Stat: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 flex items-center gap-4 hover:border-white/20 transition">
    <div className="p-3 rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 text-white">
      {icon}
    </div>
    <div>
      <div className="text-sm text-white/80">{label}</div>
      <div className="text-xl font-semibold text-white">{value}</div>
    </div>
  </div>
);

const Feature: React.FC<{ icon: React.ReactNode; title: string; desc: string; to: string }> = ({ icon, title, desc, to }) => (
  <Link to={to} className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 flex flex-col gap-3 hover:border-white/20 hover:-translate-y-0.5 transition">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-teal-400 to-blue-500 text-white">
      {icon}
    </div>
    <div className="text-lg font-semibold text-white">{title}</div>
    <div className="text-sm text-white/80 leading-6">{desc}</div>
    <div className="text-sm font-medium text-white/90 mt-1 group-hover:underline">Open {title}</div>
  </Link>
);

export default function Landing() {
  const isAuthed = useSelector((s: RootState) => Boolean(s.auth.user));
  return (
    <main className="pt-10 relative">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[46rem] rounded-full bg-gradient-to-r from-teal-500/25 to-blue-600/25 blur-3xl" />
        <div className="absolute top-48 right-10 h-56 w-56 rounded-full bg-gradient-to-tr from-indigo-600/20 to-blue-500/20 blur-2xl" />
      </div>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[#0b1014]" />
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white text-black border border-black/10">
            <PanelsTopLeft className="w-4 h-4" />
            <span className="text-sm font-medium">FleetPulse</span>
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Run Your Fleet with Confidence
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            A modern platform to manage vehicles, drivers, trips, tasks, and maintenance — fast, simple, and reliable.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            {isAuthed ? (
              <Link to="/dashboard" className="px-5 py-3 rounded-xl bg-white text-black hover:bg-black/10 transition">
                Go to Dashboard
              </Link>
            ) : (
              <Link to="/login" className="px-5 py-3 rounded-xl bg-white text-black hover:bg-black/10 transition">
                Login / Get Started
              </Link>
            )}
            <Link to="/tasks" className="px-5 py-3 rounded-xl bg-black text-white hover:bg-white/10 border border-white/20 transition">
              Explore Tasks
            </Link>
          </div>

          {/* Preview */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-sm hover:shadow-md transition">
              <div className="h-52 rounded-xl bg-gradient-to-r from-teal-400 to-blue-500 opacity-90" />
              <div className="mt-4 text-left">
                <div className="font-semibold text-white">Live Metrics</div>
                <div className="text-sm text-white/70">Dashboard snapshot of vehicles, drivers, tasks, and alerts.</div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-sm hover:shadow-md transition">
              <div className="h-52 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-90" />
              <div className="mt-4 text-left">
                <div className="font-semibold text-white">Task Board</div>
                <div className="text-sm text-white/70">Three-panel workflow with filters, list, and details.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat icon={<Gauge className="w-5 h-5" />} label="Uptime" value="99.9%" />
        <Stat icon={<Truck className="w-5 h-5" />} label="Vehicles Managed" value="500+" />
        <Stat icon={<Users className="w-5 h-5" />} label="Active Drivers" value="1,200" />
        <Stat icon={<CheckSquare className="w-5 h-5" />} label="Tasks Completed" value="48K" />
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Feature
          icon={<Gauge className="w-5 h-5" />}
          title="Dashboard"
          desc="Instant KPIs with responsive cards and charts for operational clarity."
          to="/dashboard"
        />
        <Feature
          icon={<Truck className="w-5 h-5" />}
          title="Fleet"
          desc="Track vehicle health, status, and assignments with quick actions."
          to="/fleet"
        />
        <Feature
          icon={<Users className="w-5 h-5" />}
          title="Drivers"
          desc="Profiles, licensing, and assignment overview with fast search."
          to="/drivers"
        />
        <Feature
          icon={<RouteIcon className="w-5 h-5" />}
          title="Trips"
          desc="Plan, start, and complete trips with status tracking."
          to="/trips"
        />
        <Feature
          icon={<CheckSquare className="w-5 h-5" />}
          title="Tasks"
          desc="Kanban-like task flow with filters and details panel."
          to="/tasks"
        />
        <Feature
          icon={<Wrench className="w-5 h-5" />}
          title="Maintenance"
          desc="Service logs, upcoming reminders, and overdue highlights."
          to="/maintenance"
        />
      </section>

      {/* Trust band */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl bg-white/5 border border-white/10 text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6" />
            <div>
              <div className="text-lg font-semibold">Secure by Design</div>
              <div className="text-sm text-white/80">Role-based access, audit trails, and best practices out of the box.</div>
            </div>
          </div>
          <Link to="/dashboard" className="px-5 py-3 rounded-xl bg-white text-black hover:bg-black/10 transition inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Launch Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}


