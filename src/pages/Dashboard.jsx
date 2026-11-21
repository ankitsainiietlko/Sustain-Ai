import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { Leaf, Award, TrendingUp, Users } from 'lucide-react';
import { getCurrentUser } from '../services/auth';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    if (!user) return null; // Or loading spinner

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Your Impact, {user.name}</h2>
                    <p className="text-white/50 text-sm">Keep up the great work!</p>
                </div>
                <div className="flex items-center gap-2 bg-neon/10 px-4 py-2 rounded-full border border-neon/20">
                    <Award className="text-neon" size={20} />
                    <span className="text-neon font-bold">Level {user.stats.level}</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <GlassCard delay={0.1} className="flex flex-col gap-2">
                    <div className="text-white/50 text-xs uppercase tracking-wider">Total Scans</div>
                    <div className="text-3xl font-bold">{user.stats.scans}</div>
                    <div className="text-xs text-neon flex items-center gap-1"><TrendingUp size={12} /> Live Updates</div>
                </GlassCard>

                <GlassCard delay={0.2} className="flex flex-col gap-2">
                    <div className="text-white/50 text-xs uppercase tracking-wider">CO2 Saved</div>
                    <div className="text-3xl font-bold">{user.stats.co2Saved.toFixed(1)}kg</div>
                    <div className="text-xs text-emerald-400">Real Impact</div>
                </GlassCard>

                <GlassCard delay={0.3} className="flex flex-col gap-2">
                    <div className="text-white/50 text-xs uppercase tracking-wider">Recycled</div>
                    <div className="text-3xl font-bold">{user.stats.recycled}</div>
                    <div className="text-xs text-blue-400">Items diverted</div>
                </GlassCard>

                <GlassCard delay={0.4} className="flex flex-col gap-2">
                    <div className="text-white/50 text-xs uppercase tracking-wider">Points</div>
                    <div className="text-3xl font-bold text-amber-400">{user.stats.points}</div>
                    <div className="text-xs text-white/50">Next level at {user.stats.level * 500}</div>
                </GlassCard>
            </div>

            {/* Points System Legend */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <GlassCard className="flex items-center gap-4 bg-blue-500/10 border-blue-500/20">
                    <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
                        <Leaf size={20} />
                    </div>
                    <div>
                        <div className="font-bold text-lg">Recycle</div>
                        <div className="text-white/50 text-xs">+50 Points • 0.5kg CO2</div>
                    </div>
                </GlassCard>

                <GlassCard className="flex items-center gap-4 bg-green-500/10 border-green-500/20">
                    <div className="p-3 bg-green-500/20 rounded-full text-green-400">
                        <Leaf size={20} />
                    </div>
                    <div>
                        <div className="font-bold text-lg">Compost</div>
                        <div className="text-white/50 text-xs">+30 Points • 0.2kg CO2</div>
                    </div>
                </GlassCard>

                <GlassCard className="flex items-center gap-4 bg-white/5">
                    <div className="p-3 bg-white/10 rounded-full text-white/50">
                        <Leaf size={20} />
                    </div>
                    <div>
                        <div className="font-bold text-lg">Other</div>
                        <div className="text-white/50 text-xs">+10 Points • 0kg CO2</div>
                    </div>
                </GlassCard>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 gap-6">

                {/* Recent Activity */}
                <GlassCard className="space-y-4">
                    <h3 className="font-bold text-lg mb-4">Your Journey</h3>
                    {(!user.history || user.history.length === 0) ? (
                        <div className="text-center py-8 text-white/50">
                            No scans yet. Start scanning to see your impact!
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {user.history.map((record, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${record.type === 'Recycle' ? 'bg-blue-500/20 text-blue-400' :
                                            record.type === 'Compost' ? 'bg-green-500/20 text-green-400' :
                                                record.type === 'Hazardous' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-red-500/20 text-red-400'}`}>
                                            <Leaf size={16} />
                                        </div>
                                        <div>
                                            <div className="font-medium">{record.item}</div>
                                            <div className="text-xs text-white/70 italic mb-0.5">{record.action}</div>
                                            <div className="text-xs text-white/40">{new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </div>
                                    </div>
                                    <span className="text-neon font-bold text-sm">+{record.points} pts</span>
                                </div>
                            ))}
                        </div>
                    )}
                </GlassCard>
            </div>
        </div>
    );
};

export default Dashboard;
