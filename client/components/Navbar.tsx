"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 top-0 transition-all duration-300 ${scrolled
                    ? "bg-brand-dark/80 backdrop-blur-lg border-b border-white/5 py-4"
                    : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link
                    href="/"
                    className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2 group"
                >
                    <i className="fa-solid fa-compass text-brand-bronze group-hover:rotate-45 transition duration-500"></i>
                    <span>
                        PATHFINDER<span className="text-brand-bronze">.AI</span>
                    </span>
                </Link>

                <div className="hidden md:flex space-x-10 text-xs font-semibold text-brand-muted uppercase tracking-widest">
                    <Link
                        href="#methodology"
                        className="hover:text-brand-bronze transition duration-300"
                    >
                        Methodology
                    </Link>
                    <Link
                        href="#sectors"
                        className="hover:text-brand-bronze transition duration-300"
                    >
                        Sectors
                    </Link>
                    <Link
                        href="#comparison"
                        className="hover:text-brand-bronze transition duration-300"
                    >
                        Impact
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="hidden md:block text-sm font-medium text-brand-text hover:text-white transition"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/signup"
                        className="px-8 py-3 bg-brand-bronze hover:bg-brand-bronze-hover text-white text-sm font-bold uppercase tracking-wider rounded-sm transition duration-300 shadow-lg"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
}
