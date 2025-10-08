import React from 'react';
import { Gauge, Truck, Users, Route as RouteIcon, Wrench, CheckSquare, Home } from 'lucide-react';
import { Link, NavLink } from 'react-router';

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: Gauge },
  { to: "/fleet", label: "Fleet", icon: Truck },
  { to: "/drivers", label: "Drivers", icon: Users },
  { to: "/trips", label: "Trips", icon: RouteIcon },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/maintenance", label: "Maintenance", icon: Wrench },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:block w-64 shrink-0 border-r border-gray-200 bg-white h-[calc(100dvh-56px)] sticky top-[56px]">
      <div className="p-3">
        <Link to="/" className="block px-3 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white text-sm text-center">
          New Trip
        </Link>
      </div>
      <nav className="px-2 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl transition ${
                isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;


