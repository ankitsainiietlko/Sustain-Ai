import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { login } from '../services/auth';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        try {
            login(email, password);
            window.location.href = '/dashboard'; // Force reload to update auth state
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <GlassCard className="w-full max-w-md p-8 relative overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-neon/20 rounded-full blur-2xl"></div>

                <div className="mb-8 text-center">
                    <div className="w-16 h-16 bg-neon/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-neon">
                        <LogIn size={32} />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-white/50">Sign in to continue your eco-journey</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl mb-6 text-center text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-neon text-forest font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(132,204,22,0.3)] mt-2"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-white/50">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-neon hover:underline font-medium">
                        Create one
                    </Link>
                </div>
            </GlassCard>
        </div>
    );
};

export default Login;
