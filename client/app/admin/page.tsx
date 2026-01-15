"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import {
    Wrench,
    TrendingUp,
    Users,
    Brain,
    Settings,
    LogOut
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [latency, setLatency] = useState(142);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                router.push("/login");
                return;
            }

            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            if (profileError || profile?.role !== 'admin') {
                router.push("/dashboard");
            }
        };
        checkAdmin();

        const interval = setInterval(() => {
            setLatency(Math.floor(Math.random() * (200 - 120 + 1) + 120));
        }, 3000);
        return () => clearInterval(interval);
    }, [router, supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    const users = [
        { uid: "US-9421-B", status: "Complete", sector: "Renewable Energy", confidence: "0.96" },
        { uid: "US-8812-X", status: "Processing", sector: "Robotics/Logistics", confidence: "0.74" },
    ];

    return (
        <div className="bg-brand-dark text-slate-200 h-screen flex overflow-hidden font-sans bg-noise">
            {/* Sidebar */}
            <aside className="w-64 bg-brand-surface border-r border-brand-card hidden md:flex flex-col">
                <div className="p-6 border-b border-brand-card flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-bronze rounded-sm flex items-center justify-center text-white shadow-lg">
                        <Wrench size={14} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Admin Core</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 bg-slate-800 text-white rounded-sm text-left">
                        <TrendingUp size={14} className="text-brand-bronze" />
                        <span className="text-sm font-semibold">System Overview</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white transition rounded-sm group text-left">
                        <Users size={14} />
                        <span className="text-sm font-semibold">User Registry</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white transition rounded-sm group text-left">
                        <Brain size={14} />
                        <span className="text-sm font-semibold">AI Model Logs</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white transition rounded-sm group text-left">
                        <Settings size={14} />
                        <span className="text-sm font-semibold">API Configurations</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-brand-card">
                    <div className="bg-red-900/10 border border-red-900/30 p-3 rounded-sm">
                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">System Load</p>
                        <div className="w-full bg-slate-800 h-1.5 mt-2 rounded-full overflow-hidden">
                            <div className="bg-red-500 h-full w-[24%] transition-all duration-1000"></div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2 text-slate-500 hover:text-white transition bg-brand-dark/50 rounded-sm"
                    >
                        <LogOut size={14} />
                        <span className="text-xs font-bold uppercase tracking-widest">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 border-b border-brand-card bg-brand-dark/50 flex items-center justify-between px-8 sticky top-0 z-50 backdrop-blur-md">
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
                        Environment: <span className="text-green-500">Production</span>
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                        <span>08 JAN 2026</span>
                        <span className="h-4 w-px bg-brand-card"></span>
                        <span className="text-white">Admin: Musibau</span>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-brand-surface border border-brand-card p-6 shadow-xl">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Total Nodes (Users)</p>
                            <p className="text-3xl font-bold text-white">1,284</p>
                        </div>
                        <div className="bg-brand-surface border border-brand-card p-6 shadow-xl">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">AI Requests (24h)</p>
                            <p className="text-3xl font-bold text-white">8,492</p>
                        </div>
                        <div className="bg-brand-surface border border-brand-card p-6 shadow-xl">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Avg Path Accuracy</p>
                            <p className="text-3xl font-bold text-brand-bronze">94.2%</p>
                        </div>
                        <div className="bg-brand-surface border border-brand-card p-6 shadow-xl">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">API Latency</p>
                            <p className={`text-3xl font-bold transition-colors duration-500 ${latency > 180 ? 'text-red-500' : 'text-green-500'}`}>
                                {latency}ms
                            </p>
                        </div>
                    </div>

                    <div className="bg-brand-surface border border-brand-card shadow-2xl">
                        <div className="p-6 border-b border-brand-card flex justify-between items-center">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Active Diagnostic Registry</h3>
                            <button className="text-[10px] font-bold uppercase bg-slate-800 px-3 py-1.5 rounded-sm hover:text-brand-bronze transition">
                                Export Log
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-brand-dark/50 text-[10px] uppercase tracking-widest text-slate-500">
                                    <tr>
                                        <th className="p-4 font-bold">User UID</th>
                                        <th className="p-4 font-bold">Status</th>
                                        <th className="p-4 font-bold">Detected Sector</th>
                                        <th className="p-4 font-bold">Confidence</th>
                                        <th className="p-4 font-bold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs border-t border-brand-card divide-y divide-brand-card/30">
                                    {users.map((user, i) => (
                                        <tr key={i} className="hover:bg-white/[0.02] transition">
                                            <td className="p-4 font-mono text-slate-400 italic">{user.uid}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${user.status === "Complete" ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"
                                                    }`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-white">{user.sector}</td>
                                            <td className="p-4 text-slate-300">{user.confidence}</td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={() => alert(`Opening Deep-Dive Log for User: ${user.uid}\nFetching vector weights from Gemini...`)}
                                                    className="text-brand-bronze font-bold hover:underline"
                                                >
                                                    Inspect
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
