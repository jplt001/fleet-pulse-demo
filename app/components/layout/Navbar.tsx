import React from 'react';
import { Menu, PanelsTopLeft, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router';

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = async () => {
    await dispatch<any>(signOut());
    navigate('/login');
  };
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-xl hover:bg-gray-100 transition"
            aria-label="Toggle menu"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 font-semibold text-gray-900">
            <PanelsTopLeft className="w-5 h-5 text-teal-600" />
            <span>FleetPulse</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onLogout} className="px-3 py-2 rounded-xl bg-gray-900 text-white hover:opacity-90 transition flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;


