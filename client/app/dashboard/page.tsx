"use client";
export const dynamic = "force-dynamic";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
    Compass,
    Plus,
    Map as MapIcon,
    LogOut,
    Bot,
    User,
    ChevronRight,
    Menu,
    Send,
    Loader2
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import RoadmapVisualizer from "@/components/RoadmapVisualizer";

export default function UserDashboard() {
    const [view, setView] = useState<"chat" | "roadmap">("chat");
    const [messages, setMessages] = useState([
        {
            role: "oracle",
            text: "Diagnostics initialized. I am the Pathfinder Oracle. To map your career path, I need to understand the intersection of your physical aptitudes and technical logic.",
        },
        {
            role: "oracle",
            text: "Question 01: When faced with a complex problem, do you prefer to resolve it by manipulating physical components (hardware/tools) or by restructuring logical systems (software/data)?",
        },
        {
            role: "user",
            text: "I prefer logical systems, but I enjoy seeing those systems manifest in the physical world, like robotics or automated infrastructure.",
        },
    ]);
    const [input, setInput] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, view]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || loading) return;

        const userText = input.trim();
        const currentMessages = [...messages, { role: "user", text: userText }];
        setMessages(currentMessages);
        setInput("");
        setLoading(true);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            if (token) {
                try {
                    const header = JSON.parse(atob(token.split('.')[0]));
                    console.log("Token Header (KID):", header.kid);
                    console.log("Token starts with:", token.substring(0, 10) + "...");
                } catch (e) {
                    console.warn("Token header decode skipped:", e);
                }
            }

            const chatHistory = messages.map(msg => ({
                isUser: msg.role === "user",
                content: msg.text
            }));

            console.log("Sending request with token:", token ? "Token present" : "MISSING");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/oracle`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: userText,
                    history: chatHistory
                })
            });

            console.log("Response Status:", response.status);
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Backend Error Response:", errorText);
                throw new Error(errorText || `Backend returned ${response.status}`);
            }

            const data = await response.json();
            setMessages((prev) => [...prev, { role: "oracle", text: data.response }]);

            // Advance view if heuristic meta-goal met (e.g., after 5 turns)
            if (currentMessages.length > 5 && view === "chat") {
                setTimeout(() => setView("roadmap"), 1500);
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "oracle", text: "Error connecting to the Intelligence Engine. Please ensure the backend is active." }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-brand-dark text-slate-200 h-screen flex overflow-hidden font-sans bg-noise">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? "flex absolute inset-0 z-[100] w-full" : "hidden"
                    } md:flex w-64 bg-brand-surface border-r border-brand-card flex-col transition-all duration-300`}
            >
                <div className="p-6 border-b border-brand-card flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <i className="fa-solid fa-compass text-brand-bronze"></i>
                        PATHFINDER
                    </Link>
                    <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 px-2">Navigation</p>

                    <button
                        onClick={() => setView("chat")}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-sm transition ${view === "chat" ? "bg-brand-bronze/10 text-brand-bronze border-l-2 border-brand-bronze" : "text-slate-400 hover:bg-brand-card hover:text-white"
                            }`}
                    >
                        <Plus size={14} />
                        <span className="text-sm font-semibold">New Diagnostic</span>
                    </button>

                    <button
                        onClick={() => setView("roadmap")}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-sm transition ${view === "roadmap" ? "bg-brand-bronze/10 text-brand-bronze border-l-2 border-brand-bronze" : "text-slate-400 hover:bg-brand-card hover:text-white"
                            }`}
                    >
                        <MapIcon size={14} className={view === "roadmap" ? "text-brand-bronze" : "group-hover:text-brand-bronze"} />
                        <span className="text-sm font-semibold">Saved Roadmaps</span>
                    </button>

                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-8 mb-4 px-2">Recent Sessions</p>
                    <div className="space-y-1">
                        <button className="w-full text-left block px-3 py-2 text-xs text-slate-500 hover:text-white truncate transition">
                            Engineering Transition...
                        </button>
                        <button className="w-full text-left block px-3 py-2 text-xs text-slate-500 hover:text-white truncate transition">
                            Industrial Robotics Path
                        </button>
                    </div>
                </nav>

                <div className="p-4 border-t border-brand-card bg-brand-dark/50">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <div className="w-8 h-8 rounded-sm bg-brand-bronze flex items-center justify-center text-white font-bold text-xs uppercase">
                            MB
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-white truncate">Musibau Bamidele</p>
                            <p className="text-[10px] text-slate-500 truncate">System Lead</p>
                        </div>
                        <button onClick={handleLogout} className="text-slate-500 hover:text-white transition">
                            <LogOut size={14} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative">
                <header className="h-16 border-b border-brand-card flex items-center justify-between px-6 bg-brand-dark/50 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Diagnostic Console</span>
                        <ChevronRight size={8} className="text-slate-700" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-bronze">
                            {view === "chat" ? "Active Session" : "Result Synthesis"}
                        </span>
                    </div>

                    <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(true)}>
                        <Menu size={20} />
                    </button>
                </header>

                <section ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 scroll-smooth">
                    {view === "chat" ? (
                        <>
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex gap-4 max-w-3xl ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
                                    <div
                                        className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-brand-bronze text-white shadow-lg" : "bg-brand-surface border border-brand-card text-brand-bronze"
                                            }`}
                                    >
                                        {msg.role === "user" ? <User size={12} /> : <i className="fa-solid fa-robot text-[10px]"></i>}
                                    </div>
                                    <div className={`${msg.role === "user" ? "bg-brand-surface border border-brand-card p-4 rounded-sm" : "space-y-4"}`}>
                                        <p className={`text-sm leading-relaxed ${msg.role === "user" ? "text-white" : "text-slate-300"}`}>{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex gap-4 max-w-3xl">
                                    <div className="w-8 h-8 rounded-sm bg-brand-surface border border-brand-card flex items-center justify-center text-brand-bronze shrink-0">
                                        <i className="fa-solid fa-robot text-[10px]"></i>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Loader2 size={14} className="animate-spin" />
                                        <span className="text-xs font-mono uppercase tracking-widest">Oracle Thinking...</span>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <RoadmapVisualizer />
                    )}
                </section>

                {view === "chat" && (
                    <footer className="p-6 bg-brand-dark">
                        <form onSubmit={handleSend} className="max-w-3xl mx-auto relative">
                            <textarea
                                rows={1}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                className="w-full bg-brand-surface border border-brand-card text-white text-sm px-4 py-4 pr-16 rounded-sm focus:outline-none focus:border-brand-bronze transition-colors placeholder:text-slate-700 resize-none"
                                placeholder="Type your response..."
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-bronze hover:bg-brand-bronze-hover text-white flex items-center justify-center transition shadow-lg active:scale-90"
                            >
                                <Send size={14} />
                            </button>
                        </form>
                        <p className="text-center text-[9px] text-slate-600 mt-3 uppercase tracking-tighter">
                            Session secured via Pathfinder Protocol | Powered by Gemini 1.5 Flash
                        </p>
                    </footer>
                )}
            </main>
        </div>
    );
}
