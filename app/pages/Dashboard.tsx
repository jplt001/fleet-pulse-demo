import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { fetchBusinesses, setCurrentBusinessId } from '../store/slices/businessSlice';
import { useEffect as useEffectReact } from 'react';
import { fetchRolePermissions } from '../store/slices/roleSlice';
import { hasPermission } from '../../design/rbac';
import { Gauge, Truck, Route as RouteIcon, Wrench } from 'lucide-react';

const Card: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
	<div className="bg-white rounded-2xl shadow p-5 border border-gray-200">
		<div className="flex items-center justify-between">
			<div>
				<div className="text-sm text-gray-500">{title}</div>
				<div className="text-2xl font-semibold text-gray-900">{value}</div>
			</div>
			<div className="p-3 rounded-xl bg-gray-900 text-white">{icon}</div>
		</div>
	</div>
);

export default function DashboardPage() {
	const dispatch = useDispatch();
	const businesses = useSelector((s: RootState) => s.business.all);
	const currentBusinessId = useSelector((s: RootState) => s.business.currentBusinessId);
	const permissions = useSelector((s: RootState) => s.roles.permissions);

	useEffect(() => {
		dispatch<any>(fetchBusinesses());
	}, [dispatch]);

	useEffectReact(() => {
		if (currentBusinessId) {
			dispatch<any>(fetchRolePermissions({ businessId: currentBusinessId }));
		}
	}, [dispatch, currentBusinessId]);

	return (
		<main className="pt-10 mx-auto max-w-7xl px-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
				{hasPermission(permissions, 'switch_business') && (
					<select
						value={currentBusinessId || ''}
						onChange={(e) => dispatch<any>(setCurrentBusinessId(e.target.value))}
						className="border rounded-xl px-3 py-2"
					>
						{businesses.map((b) => (
							<option key={b.id} value={b.id}>{b.name}</option>
						))}
					</select>
				)}
			</div>
			<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card title="Active Vehicles" value="12" icon={<Truck className="w-5 h-5" />} />
				<Card title="Ongoing Trips" value="7" icon={<Gauge className="w-5 h-5" />} />
				<Card title="Pending Maintenance" value="3" icon={<Wrench className="w-5 h-5" />} />
				<Card title="Alerts" value="2" icon={<RouteIcon className="w-5 h-5" />} />
			</div>
		</main>
	);
}


