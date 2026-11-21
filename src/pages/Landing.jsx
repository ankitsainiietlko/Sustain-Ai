import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Recycle, Zap, Globe, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

const Landing = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center gap-12">

            {/* Hero Section */}
            <div className="space-y-6 max-w-2xl mt-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-neon/20 text-neon text-sm font-medium mx-auto"
                >
                    <Zap size={14} className="fill-neon" />
                    <span>AI-Powered Waste Management</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold leading-tight"
                >
                    Recycle Smart.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald-400 text-glow">
                        Save the Planet.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/60 text-lg md:text-xl max-w-xl mx-auto"
                >
                    Use our advanced AI vision to instantly identify waste types, track your eco-impact, and earn rewards.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center justify-center gap-4 pt-4"
                >
                    <Link to="/scan" className="bg-neon text-forest px-8 py-4 rounded-full font-bold text-lg hover:bg-neon/90 transition-all hover:scale-105 shadow-lg shadow-neon/20 flex items-center gap-2">
                        Start Scanning <ArrowRight size={20} />
                    </Link>
                    <Link to="/dashboard" className="px-8 py-4 rounded-full font-bold text-lg border border-white/10 hover:bg-white/5 transition-all">
                        View Impact
                    </Link>
                </motion.div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-10">
                <GlassCard delay={0.4} className="flex flex-col items-center text-center gap-4">
                    <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-400">
                        <Recycle size={32} />
                    </div>
                    <h3 className="text-xl font-bold">Instant Sort</h3>
                    <p className="text-white/50 text-sm">Snap a picture and let AI decide if it's compost, recycling, or trash in milliseconds.</p>
                </GlassCard>

                <GlassCard delay={0.5} className="flex flex-col items-center text-center gap-4">
                    <div className="p-4 rounded-full bg-blue-500/10 text-blue-400">
                        <BarChart2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold">Track Stats</h3>
                    <p className="text-white/50 text-sm">Visualize your carbon footprint reduction and see the tangible impact of your actions.</p>
                </GlassCard>

                <GlassCard delay={0.6} className="flex flex-col items-center text-center gap-4">
                    <div className="p-4 rounded-full bg-amber-500/10 text-amber-400">
                        <Globe size={32} />
                    </div>
                    <h3 className="text-xl font-bold">Global Leaderboard</h3>
                    <p className="text-white/50 text-sm">Compete with friends and the global community to become the top eco-warrior.</p>
                </GlassCard>
            </div>
        </div>
    );
};

export default Landing;
