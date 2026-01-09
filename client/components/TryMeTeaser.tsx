"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function TryMeTeaser() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        setLoading(true);
        setResponse("");

        try {
            const res = await fetch("http://localhost:5171/api/chat/teaser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input })
            });

            if (!res.ok) throw new Error("Teaser failed");

            const data = await res.json();
            setResponse(data.response);
        } catch (error) {
            console.error(error);
            setResponse("Vector synthesis interrupted. Intelligence engine offline.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto lg:mx-0 p-4 bg-brand-surface/50 border border-brand-card rounded-sm backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="e.g. I like machinery but I'm good at math"
                    className="flex-1 bg-brand-dark/50 border border-brand-card text-white text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-bronze transition-colors placeholder:text-slate-600"
                />
                <button
                    disabled={loading}
                    className="bg-brand-bronze hover:bg-brand-bronze-hover text-white px-3 py-2.5 rounded-sm transition-colors flex items-center justify-center disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <i className="fa-solid fa-paper-plane text-xs"></i>
                    )}
                </button>
            </form>
            {response && (
                <div className="mt-3 text-xs text-brand-muted animate-in fade-in slide-in-from-top-1 duration-500">
                    <p className="border-l-2 border-brand-bronze pl-2">{response}</p>
                </div>
            )}
        </div>
    );
}
