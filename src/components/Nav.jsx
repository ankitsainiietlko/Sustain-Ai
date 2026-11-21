import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, Camera, BarChart2, LogOut } from 'lucide-react';
import { getCurrentUser, logout } from '../services/auth';

const Nav = () => {
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setUser(getCurrentUser());
    }, [location]); // Re-check on route change

    if (!user) return null; // Don't show nav on login/signup pages typically, or just show home

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="glass px-6 py-3 rounded-full flex items-center gap-8 text-white/70">
                <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 hover:text-neon transition-colors ${isActive ? 'text-neon' : ''}`}>
                    <Home size={24} />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Home</span>
                </NavLink>

                <NavLink to="/scan" className={({ isActive }) => `flex flex-col items-center gap-1 hover:text-neon transition-colors ${isActive ? 'text-neon' : ''}`}>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-neon/20 blur-xl rounded-full opacity-0 hover:opacity-100 transition-opacity" />
                        <div className="bg-neon text-forest p-3 rounded-full -mt-8 border-4 border-forest shadow-lg hover:scale-110 transition-transform cursor-pointer">
                            <Camera size={28} />
                        </div>
                    </div>
                </NavLink>

                <NavLink to="/dashboard" className={({ isActive }) => `flex flex-col items-center gap-1 hover:text-neon transition-colors ${isActive ? 'text-neon' : ''}`}>
                    <BarChart2 size={24} />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Impact</span>
                </NavLink>

                <button onClick={logout} className="flex flex-col items-center gap-1 hover:text-red-400 transition-colors">
                    <LogOut size={24} />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Exit</span>
                </button>
            </div>
        </nav>
    );
};

export default Nav;
