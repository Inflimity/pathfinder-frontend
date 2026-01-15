"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                router.push("/dashboard");
            }
        };
        checkSession();
    }, [router, supabase]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error: signupError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    role: "user", // Default role
                },
            },
        });

        if (signupError) {
            setError(signupError.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
            // Wait a bit and redirect
            setTimeout(() => router.push("/login"), 3000);
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
                    <h1 className="text-2xl font-bold text-white mb-2">Register Node</h1>
                    <p className="text-slate-400 text-sm">Create your account to begin the career diagnostic protocol.</p>
                </header>

                {success ? (
                    <div className="bg-green-500/10 border border-green-500/50 p-4 rounded-sm text-green-500 text-sm text-center mb-6">
                        Registration successful! Please check your email to verify your account. Redirecting to login...
                    </div>
                ) : (
                    <form onSubmit={handleSignup} className="space-y-5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-sm text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full bg-brand-dark border border-brand-card px-4 py-3 text-white rounded-sm focus:outline-none focus:border-brand-bronze transition-colors placeholder:text-slate-700"
                                placeholder="e.g. Musibau Bamidele"
                            />
                        </div>

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
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" title="Security Key" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                Security Key
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-brand-dark border border-brand-card px-4 py-3 text-white rounded-sm focus:outline-none focus:border-brand-bronze transition-colors placeholder:text-slate-700"
                                placeholder="Min. 8 characters"
                            />
                            <p className="text-[9px] text-slate-600 italic">Ensure your key contains letters, numbers, and symbols.</p>
                        </div>

                        <div className="flex items-start gap-3 py-2">
                            <input type="checkbox" id="terms" required className="mt-1 accent-brand-bronze" />
                            <label htmlFor="terms" className="text-[11px] text-slate-500 leading-tight">
                                I agree to the <Link href="#" className="text-brand-bronze hover:underline">Diagnostic Terms</Link> and
                                acknowledge the data processing protocol.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-bronze hover:bg-brand-bronze-hover text-white py-4 font-bold uppercase tracking-widest text-xs transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            Create Account
                        </button>
                    </form>
                )}

                <footer className="mt-8 pt-6 border-t border-brand-card text-center">
                    <p className="text-xs text-slate-500">
                        Already registered? <Link href="/login" className="text-brand-bronze font-bold hover:underline">Log In</Link>
                    </p>
                </footer>
            </div>

            <div className="mt-8">
                <Link href="/" className="text-xs text-slate-600 hover:text-slate-400 transition flex items-center gap-2">
                    <i className="fa-solid fa-arrow-left"></i>
                    Return to Landing
                </Link>
            </div>
        </div>
    );
}
