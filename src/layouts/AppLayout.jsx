import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
import { Leaf } from 'lucide-react';

const AppLayout = ({ children }) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-forest selection:bg-neon selection:text-forest">
            {/* Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <header className="fixed top-0 w-full z-40 p-6 flex justify-between items-center glass border-none !bg-transparent !shadow-none !backdrop-blur-none">
                <div className="flex items-center gap-2">
                    <Leaf className="text-neon" size={24} />
                    <h1 className="text-xl font-bold tracking-tight">Sustain<span className="text-neon">AI</span></h1>
                </div>
            </header>

            <main className="relative z-10 pb-32 pt-20 px-4 md:px-8 max-w-7xl mx-auto">
                {children}
            </main>

            <div className="fixed bottom-4 right-6 z-40 hidden md:block">
                <p className="text-xs text-white/30 font-medium">Made by <span className="text-neon/50">Ankit Saini</span></p>
            </div>

            <Nav />
        </div>
    );
};

export default AppLayout;
