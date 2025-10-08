export type PermissionKey =
	| 'manage_vehicles'
	| 'manage_drivers'
	| 'manage_trips'
	| 'manage_maintenance'
	| 'view_dashboard'
	| 'switch_business'
	| 'manage_settings';

export type Role = 'Owner' | 'Manager' | 'Driver' | 'Custom';

export type Permissions = Record<PermissionKey, boolean>;

export const defaultRolePermissions: Record<Role, Permissions> = {
	Owner: {
		manage_vehicles: true,
		manage_drivers: true,
		manage_trips: true,
		manage_maintenance: true,
		view_dashboard: true,
		switch_business: true,
		manage_settings: true,
	},
	Manager: {
		manage_vehicles: true,
		manage_drivers: true,
		manage_trips: true,
		manage_maintenance: true,
		view_dashboard: true,
		switch_business: true,
		manage_settings: false,
	},
	Driver: {
		manage_vehicles: false,
		manage_drivers: false,
		manage_trips: false,
		manage_maintenance: false,
		view_dashboard: true,
		switch_business: false,
		manage_settings: false,
	},
	Custom: {
		manage_vehicles: false,
		manage_drivers: false,
		manage_trips: false,
		manage_maintenance: false,
		view_dashboard: true,
		switch_business: false,
		manage_settings: false,
	},
};

export function hasPermission(permissions: Partial<Permissions> | null | undefined, key: PermissionKey): boolean {
	if (!permissions) return false;
	return Boolean((permissions as any)[key]);
}


