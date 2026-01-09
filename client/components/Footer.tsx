"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-brand-dark border-t border-brand-surface pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16 text-sm">
                <div className="space-y-6">
                    <Link
                        href="/"
                        className="text-2xl font-bold tracking-tight text-white flex items-center gap-2"
                    >
                        <i className="fa-solid fa-compass text-brand-bronze"></i>
                        PATHFINDER<span className="text-brand-bronze">.AI</span>
                    </Link>
                    <p className="text-brand-muted leading-relaxed">
                        Bridging the gap between education and industrial demand through AI
                        synthesis.
                    </p>
                </div>

                <div>
                    <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
                        Platform
                    </h5>
                    <ul className="space-y-3 text-brand-muted">
                        <li>
                            <Link href="#" className="hover:text-brand-bronze transition">
                                The Oracle Engine
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-brand-bronze transition">
                                Skills Graph
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-brand-bronze transition">
                                Enterprise
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
                        Resources
                    </h5>
                    <ul className="space-y-3 text-brand-muted">
                        <li>
                            <Link href="#" className="hover:text-brand-bronze transition">
                                Global Labor Reports
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-brand-bronze transition">
                                Documentation
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-brand-bronze transition">
                                API Access
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
                        Company
                    </h5>
                    <ul className="space-y-3 text-brand-muted">
                        <li>
                            <Link href="#" className="hover:text-brand-bronze transition">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-brand-bronze transition">
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-brand-bronze transition">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 border-t border-brand-surface pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-muted">
                <p>© 2026 Pathfinder AI. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="#" className="hover:text-white transition">
                        Privacy Policy
                    </Link>
                    <Link href="#" className="hover:text-white transition">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
}
