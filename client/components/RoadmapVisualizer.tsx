"use client";

import { CheckCircle2, ChevronRight, Clock, Star } from "lucide-react";

interface RoadmapStep {
    title: string;
    duration: string;
    description: string;
    skills: string[];
    status: "completed" | "current" | "upcoming";
}

interface RoadmapVisualizerProps {
    steps?: RoadmapStep[];
}

export default function RoadmapVisualizer({ steps }: RoadmapVisualizerProps) {
    const defaultSteps: RoadmapStep[] = [
        {
            title: "Core Competency Diagnostic",
            duration: "Week 0",
            description: "Initial AI synthesis of spatial and logical aptitudes to establish the career vector.",
            skills: ["Diagnostic Analysis", "Pattern Recognition"],
            status: "completed",
        },
        {
            title: "Robotics Fundamentals & Sensors",
            duration: "Weeks 1-4",
            description: "Intensive training on industrial sensor arrays, LiDAR, and basic spatial logic.",
            skills: ["Sensory Systems", "Logic Mapping", "Hardware Maintenance"],
            status: "current",
        },
        {
            title: "Advanced Autonomous Systems",
            duration: "Weeks 5-12",
            description: "Specialization in autonomous navigation algorithms and disaster-recovery protocols.",
            skills: ["Pathfinding", "System Optimization", "Crisis Logic"],
            status: "upcoming",
        },
    ];

    const displaySteps = steps || defaultSteps;

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8 space-y-12">
            <div className="flex items-center justify-between mb-8 border-b border-brand-card pb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-widest">
                        Career Vector: <span className="text-brand-bronze">Robotics Field Tech</span>
                    </h2>
                    <p className="text-brand-muted text-sm">Target Industry: Advanced Manufacturing & Logistics</p>
                </div>
                <div className="hidden md:block bg-brand-bronze/10 border border-brand-bronze px-4 py-2 rounded-sm">
                    <span className="text-xs font-bold text-brand-bronze uppercase tracking-widest">Match Accuracy: 92%</span>
                </div>
            </div>

            <div className="relative">
                {/* Connection Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-brand-card -translate-x-1/2 hidden md:block"></div>

                <div className="space-y-16">
                    {displaySteps.map((step, i) => (
                        <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                            {/* Status Indicator */}
                            <div className="absolute left-0 md:left-1/2 -mt-1 md:-mt-0 p-1 bg-brand-dark z-10 -translate-x-1/2 md:-translate-x-1/2">
                                {step.status === "completed" ? (
                                    <CheckCircle2 className="text-green-500 w-6 h-6 md:w-8 md:h-8" />
                                ) : step.status === "current" ? (
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-brand-bronze animate-pulse flex items-center justify-center">
                                        <div className="w-3 h-3 md:w-4 md:h-4 bg-brand-bronze rounded-full"></div>
                                    </div>
                                ) : (
                                    <Clock className="text-slate-600 w-6 h-6 md:w-8 md:h-8" />
                                )}
                            </div>

                            {/* Content Card */}
                            <div className="w-full md:w-[45%] bg-brand-surface border border-brand-card p-6 md:p-8 rounded-sm hover:border-brand-bronze transition-all duration-500 group">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-brand-bronze font-mono text-[10px] md:text-xs tracking-widest uppercase">
                                        {step.duration}
                                    </span>
                                    {step.status === "current" && (
                                        <span className="bg-brand-bronze/20 text-brand-bronze text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                                            Active
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-brand-bronze transition">
                                    {step.title}
                                </h3>
                                <p className="text-brand-muted text-xs md:text-sm leading-relaxed mb-6">
                                    {step.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {step.skills.map((skill, si) => (
                                        <span key={si} className="text-[9px] md:text-[10px] bg-brand-dark border border-brand-card px-2 py-1 text-slate-400 font-bold uppercase tracking-wider">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Spacer for mobile */}
                            <div className="md:w-[45%]"></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-16 bg-brand-card p-8 text-center border-l-4 border-brand-bronze relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Star size={128} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">Final Protocol Milestone</h4>
                <p className="text-brand-muted text-sm max-w-xl mx-auto mb-8">
                    Upon completion of Phase 3, you will receive a verified Pathfinder Industrial Blueprint, granting you direct access to our partner manufacturing network.
                </p>
                <button className="bg-brand-bronze hover:bg-brand-bronze-hover text-white px-8 py-4 font-bold uppercase tracking-widest text-xs transition shadow-xl">
                    View Detail Requirements
                </button>
            </div>
        </div>
    );
}
