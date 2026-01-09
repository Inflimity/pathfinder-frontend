"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (loginError) {
            setError(loginError.message);
            setLoading(false);
        } else {
            // Fetch user profile to check role
            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", data.user.id)
                .single();

            if (profileError || !profile) {
                // Fallback or handle error
                console.error("Error fetching profile:", profileError);
                router.push("/dashboard");
            } else if (profile.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/dashboard");
            }
        }
    };

    return (
        <div className="bg-brand-dark text-slate-200 min-h-screen flex flex-col justify-center items-center px-4 bg-noise">
            <div className="mb-10 text-center">
                <Link href="/" className="text-2xl font-bold tracking-tight text-white inline-flex items-center gap-2">
                    <i className="fa-solid fa-compass text-brand-bronze"></i>
                    PATHFINDER<span className="text-brand-bronze">.AI</span>
                </Link>
            </div>

            <div className="w-full max-w-md bg-brand-surface border border-brand-card p-8 md:p-10 shadow-2xl">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Initialize Access</h1>
                    <p className="text-slate-400 text-sm">Provide your credentials to access the Pathfinder Protocol.</p>
                </header>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-sm text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-brand-dark border border-brand-card px-4 py-3 text-white rounded-sm focus:outline-none focus:border-brand-bronze transition-colors placeholder:text-slate-700"
                            placeholder="engineer@pathfinder.ai"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" title="Security Key" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                Security Key
                            </label>
                            <Link href="#" className="text-[10px] font-bold uppercase text-brand-bronze hover:text-white transition">
                                Reset Key
                            </Link>
                        </div>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-brand-dark border border-brand-card px-4 py-3 text-white rounded-sm focus:outline-none focus:border-brand-bronze transition-colors placeholder:text-slate-700"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-bronze hover:bg-brand-bronze-hover text-white py-4 font-bold uppercase tracking-widest text-xs transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Access Protocol
                    </button>
                </form>

                <footer className="mt-10 pt-6 border-t border-brand-card text-center">
                    <p className="text-xs text-slate-500">
                        Unauthorized access is strictly monitored. <br className="hidden sm:block" />
                        New user? <Link href="/signup" className="text-brand-bronze font-bold hover:underline">Register Node</Link>
                    </p>
                </footer>
            </div>

            <div className="mt-8">
                <Link href="/" className="text-xs text-slate-600 hover:text-slate-400 transition flex items-center gap-2">
                    <i className="fa-solid fa-arrow-left"></i>
                    Back to Global Landing
                </Link>
            </div>
        </div>
    );
}
