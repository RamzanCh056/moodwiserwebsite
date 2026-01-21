'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function ProgramContent() {
    const [activeWeek, setActiveWeek] = useState(1);
    const [showDownloadModal, setShowDownloadModal] = useState(false);

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900 relative">
            {/* Download Modal */}
            {showDownloadModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowDownloadModal(false)}></div>
                    <div className="relative bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <button onClick={() => setShowDownloadModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">Download MoodWiser</h3>
                        <p className="text-slate-500 text-center mb-6 text-sm">Choose your platform to start your journey.</p>

                        <div className="space-y-3">
                            <a href="https://apps.apple.com/pk/app/moodwiser/id6755422630" target="_blank" className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:scale-[1.02] transition-all group">
                                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white shrink-0 group-hover:bg-slate-800">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Download on</div>
                                    <div className="text-base font-bold text-slate-900">App Store</div>
                                </div>
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.moodwiser.app" target="_blank" className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:scale-[1.02] transition-all group">
                                <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" fill="#4285F4" /><path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" fill="#34A853" /><path d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.19 15.22L14.54 12.85L17.19 10.47L20.16 10.81Z" fill="#FBBC04" /><path d="M16.81 8.88L14.54 11.15L6.05 2.66L16.81 8.88Z" fill="#EA4335" /></svg>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Get it on</div>
                                    <div className="text-base font-bold text-slate-900">Google Play</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100/50 transition-all duration-300">
                <nav className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 relative">
                                <Image
                                    src="/moodwiser.jpeg"
                                    alt="Moodwiser Logo"
                                    width={40}
                                    height={40}
                                    className="object-cover w-full h-full"
                                    priority
                                />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-sky-500 via-slate-500 to-purple-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity tracking-tight">
                                Moodwiser
                            </span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Home</Link>
                            <Link href="/#products" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Products</Link>
                            <Link href="/program" className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full transition-colors">
                                Program
                            </Link>
                            <Link href="/#blogs" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Blogs</Link>
                            <Link href="/#about" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">About Us</Link>
                            <Link href="/#contact" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Contact Us</Link>
                        </div>
                        {/* Mobile Menu Button Placeholder */}
                        <div className="md:hidden">
                            <button className="text-slate-800 cursor-pointer p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* COMPACT HERO SECTION */}
            <section className="pt-32 pb-16 px-6 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-sky-200/20 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[80px] animate-pulse delay-1000"></div>
                </div>

                <div className="container mx-auto max-w-6xl relative z-10 transition-all duration-1000 animate-in fade-in slide-in-from-bottom-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-left space-y-8">
                            <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-white border border-slate-200 text-slate-600 text-[11px] font-bold tracking-widest uppercase shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                The 21-Day Reset
                            </span>

                            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter leading-[1.0] text-slate-900">
                                Emotions Are <br />
                                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Wisdom.</span>
                            </h1>

                            <p className="text-xl text-slate-600 font-light leading-relaxed max-w-xl">
                                Stop fighting anxiety. Start understanding it. A guided audio journey to reclaim calm in a pressurised world.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                <button className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-3 min-w-[200px] overflow-hidden">
                                    <span className="text-2xl">🎓</span>
                                    <span>Start Program</span>
                                    <span className="text-indigo-100 font-normal border-l border-indigo-400/30 pl-3 ml-1">$27</span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </button>
                                <button
                                    onClick={() => setShowDownloadModal(true)}
                                    className="bg-white text-[#111827] border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 min-w-[200px]"
                                >
                                    Download App
                                </button>
                            </div>
                        </div>

                        {/* Hero Image/Card */}
                        <div className="relative">
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-indigo-900/10 border border-slate-100 aspect-[4/3] group">
                                <Image
                                    src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1200&auto=format&fit=crop"
                                    alt="Serene landscape"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">My Promise To You</p>
                                    <p className="text-white font-serif text-2xl italic leading-tight">
                                        "There is nothing wrong with you. You are responding to a world that rarely pauses."
                                    </p>
                                </div>
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 hidden lg:block animate-bounce-slow">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">🎧</div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase">Format</p>
                                        <p className="font-bold text-slate-800">Voice-Guided</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPACT DASHBOARD GRID (PHILOSOPHY + SIGNS) */}
            <section className="py-20 px-6 bg-slate-50 relative">
                <div className="container mx-auto max-w-6xl">
                    {/* Header for this section */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">This isn't just a course. <br /><span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">It's for everyone who feels...</span></h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: "📱", title: "Pressured by Social Media", desc: "Constant comparison and the feeling of never being 'enough'." },
                            { icon: "👁️", title: "Judged for Appearance", desc: "Weight, beauty, body image – the exhaustion of being looked at." },
                            { icon: "💔", title: "Emotionally Bullied", desc: " subtle disrespect at work, family pressure, or toxic relationships." },
                            { icon: "🌪️", title: "Anxious Without Reason", desc: "Waking up with a heavy chest, dreading the day for no clear cause." },
                            { icon: "🎭", title: "Exhausted from Pretending", desc: "Smiling when you're crumbling. The weight of being 'fine'." },
                            { icon: "🚫", title: "Tired of Fake Confidence", desc: "Sick of 'toxic positivity' and motivation that doesn't last." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-indigo-50 group-hover:scale-110 transition-colors duration-300">{item.icon}</div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Philosophy Quote */}
                    <div className="mt-16 bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]"></div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-2xl md:text-4xl font-bold mb-8 leading-tight">"We are taught to control, suppress, or medicate. But emotions are <span className="text-indigo-400">signals</span>, not enemies."</h2>

                            <div className="flex justify-center mb-8">
                                <button className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-full font-bold hover:shadow-2xl hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-3 min-w-[240px] overflow-hidden">
                                    <span className="text-2xl">🎓</span>
                                    <span className="text-lg">Start 21-Day Program</span>
                                    <span className="text-indigo-100 font-normal border-l border-indigo-400/30 pl-3 ml-1">$27</span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </button>
                            </div>

                            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                                "Modern life creates pressure, comparison, and emotional overload. MoodWiser helps you slow down, regulate anxiety, and respond with clarity — <span className="text-white font-medium">one day at a time.</span>"
                            </p>

                            <div className="flex flex-wrap justify-center gap-6">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/5">
                                    <span>🌿</span> <span className="font-bold text-sm">No Judgment</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/5">
                                    <span>🧠</span> <span className="font-bold text-sm">Emotional IQ</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/5">
                                    <span>🛡️</span> <span className="font-bold text-sm">Inner Safety</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPACT DAY 1 PREVIEW */}
            <section className="py-20 px-6 bg-white border-b border-slate-100">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider mb-8">Day 1 Sneak Peek</div>
                    <h2 className="text-4xl font-bold mb-8">Let me ask you something...</h2>
                    <div className="text-xl md:text-2xl text-slate-500 font-light max-w-3xl mx-auto leading-relaxed">
                        "When was the last time you felt truly calm? Not distracted, not numb, not pretending—but calm? If you can't remember, <span className="text-slate-900 font-medium">that's okay.</span>"
                    </div>
                </div>
            </section>

            {/* INTERACTIVE COURSE STRUCTURE (TABS) */}
            <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
                {/* Decorative background element for this section */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-slate-100 rounded-full blur-[120px] -z-10 opacity-60"></div>

                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 tracking-tight">The 21-Day Journey</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">Structured for real life. 8-12 minutes a day. A step-by-step path to reclaiming your calm.</p>
                    </div>

                    {/* Tabs Header */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-white/70 backdrop-blur-md p-2 rounded-full shadow-xl shadow-slate-200/50 border border-slate-100 inline-flex ring-1 ring-slate-100/50">
                            {[1, 2, 3].map((week) => (
                                <button
                                    key={week}
                                    onClick={() => setActiveWeek(week)}
                                    className={`px-10 py-4 rounded-full text-sm font-bold transition-all duration-300 relative overflow-hidden ${activeWeek === week
                                        ? 'bg-slate-900 text-white shadow-lg transform scale-105'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                        }`}
                                >
                                    Week {week}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px]">
                        {activeWeek === 1 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 border border-white/50 shadow-2xl shadow-indigo-100/40 relative overflow-hidden group">
                                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-700"></div>

                                    <div className="mb-10 flex items-center gap-6 relative z-10">
                                        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl shadow-sm transform group-hover:rotate-12 transition-transform duration-500">🌊</div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-slate-900 mb-1">Awareness & Relief</h3>
                                            <p className="text-lg text-slate-500 font-light">Goal: Stop blaming yourself. Understand the mechanism.</p>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4 relative z-10">
                                        {[
                                            { d: "01", t: "Why You're Not Weak", desc: "Anxiety is overload, not failure." },
                                            { d: "02", t: "Social Media & Comparison", desc: "Your brain vs infinite scroll." },
                                            { d: "03", t: "Beauty & Appearance", desc: "How shame forms anxiety." },
                                            { d: "04", t: "Silent Bullying", desc: "Subtle control and disrespect." },
                                            { d: "05", t: "Unrealistic Expectations", desc: "Why 'doing more' backfires." },
                                            { d: "06", t: "Why Motivation Fails", desc: "Discipline without calm breaks you." },
                                            { d: "07", t: "Emotional Reset", desc: "Reflection & grounding." }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/50 hover:bg-white transition-all duration-300 border border-transparent hover:border-emerald-100 hover:shadow-lg hover:shadow-emerald-100/20 group/item cursor-default">
                                                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-lg group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors duration-300">{item.d}</span>
                                                <div>
                                                    <h4 className="font-bold text-slate-800 text-sm group-hover/item:text-emerald-700 transition-colors">{item.t}</h4>
                                                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeWeek === 2 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 border border-white/50 shadow-2xl shadow-indigo-100/40 relative overflow-hidden group">
                                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-700"></div>

                                    <div className="mb-10 flex items-center gap-6 relative z-10">
                                        <div className="w-16 h-16 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl shadow-sm transform group-hover:rotate-12 transition-transform duration-500">⚡</div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-slate-900 mb-1">Inner Strength</h3>
                                            <p className="text-lg text-slate-500 font-light">Goal: Regain control. Practical tools for resilience.</p>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4 relative z-10">
                                        {[
                                            { d: "08", t: "Calm Is Not Weakness", desc: "Calm = clarity + power." },
                                            { d: "09", t: "Nervous System 101", desc: "Fight/flight explained simply." },
                                            { d: "10", t: "Emotional Boundaries", desc: "Stop absorbing others' emotions." },
                                            { d: "11", t: "Reframing Shame", desc: "Shame vs responsibility." },
                                            { d: "12", t: "Real Confidence", desc: "Internal safety over performance." },
                                            { d: "13", t: "Respect & Self-Worth", desc: "Internal vs external validation." },
                                            { d: "14", t: "Strength Checkpoint", desc: "Reinforce habits." }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/50 hover:bg-white transition-all duration-300 border border-transparent hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-100/20 group/item cursor-default">
                                                <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2.5 py-1 rounded-lg group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors duration-300">{item.d}</span>
                                                <div>
                                                    <h4 className="font-bold text-slate-800 text-sm group-hover/item:text-indigo-700 transition-colors">{item.t}</h4>
                                                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeWeek === 3 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 border border-white/50 shadow-2xl shadow-indigo-100/40 relative overflow-hidden group">
                                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-700"></div>

                                    <div className="mb-10 flex items-center gap-6 relative z-10">
                                        <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-600 flex items-center justify-center text-3xl shadow-sm transform group-hover:rotate-12 transition-transform duration-500">💎</div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-slate-900 mb-1">Integration & Power</h3>
                                            <p className="text-lg text-slate-500 font-light">Goal: Make it a lifestyle. Long-term emotional fitness.</p>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4 relative z-10">
                                        {[
                                            { d: "15", t: "Emotional Discipline", desc: "Consistency beats chaos." },
                                            { d: "16", t: "Handling Triggers", desc: "What to do when anxiety hits." },
                                            { d: "17", t: "Pressure Resilience", desc: "Training without collapsing." },
                                            { d: "18", t: "Redefining Success", desc: "Psychological freedom." },
                                            { d: "19", t: "Relationships & Safety", desc: "Choosing peace." },
                                            { d: "20", t: "New Emotional Identity", desc: "Strength without hardness." },
                                            { d: "21", t: "Calm Power Commitment", desc: "Transition to MoodWiser app." }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/50 hover:bg-white transition-all duration-300 border border-transparent hover:border-purple-100 hover:shadow-lg hover:shadow-purple-100/20 group/item cursor-default">
                                                <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2.5 py-1 rounded-lg group-hover/item:bg-purple-600 group-hover/item:text-white transition-colors duration-300">{item.d}</span>
                                                <div>
                                                    <h4 className="font-bold text-slate-800 text-sm group-hover/item:text-purple-700 transition-colors">{item.t}</h4>
                                                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* COMPACT APP CONNECTION */}
            <section className="py-24 px-6 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-indigo-900/30 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-black to-transparent"></div>
                </div>

                <div className="container mx-auto max-w-5xl relative z-10 flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 text-center md:text-left">
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold uppercase tracking-widest text-xs mb-6">The Ecosystem</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">Program + App = <br /><span className="text-indigo-400">Complete Care</span></h2>
                        <div className="space-y-6 text-lg text-slate-300 font-light leading-relaxed">
                            <p className="flex items-start gap-3">
                                <span className="text-indigo-400 text-xl mt-1">✦</span>
                                <span>The <span className="text-white font-medium">Program</span> is your emotional breakthrough bootcamp.</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="text-emerald-400 text-xl mt-1">✦</span>
                                <span>The <span className="text-white font-medium">App</span> is your daily maintenance tool.</span>
                            </p>
                        </div>
                        <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/10 italic text-indigo-100 backdrop-blur-sm">
                            "If you want to practice this feeling, Open MoodWiser. Just 8 minutes. No pressure."
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center perspective-1000">
                        <div className="relative w-full max-w-sm group">
                            <div className="absolute inset-0 bg-indigo-500/40 blur-[80px] rounded-full group-hover:bg-indigo-500/50 transition-all duration-500"></div>
                            <Image src="/app-dashboard-hd.png" alt="App" width={600} height={600} className="relative z-10 rounded-[2.5rem] shadow-2xl rotate-6 group-hover:rotate-2 transition-all duration-700 ease-out border-[8px] border-slate-900" />
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING & FOOTER (Combined) */}
            <section className="py-24 px-6 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        {/* App Card */}
                        <div className="bg-white rounded-[2.5rem] p-10 flex flex-col items-center text-center border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/80 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="mb-6 relative">
                                <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform duration-500">📱</div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">MoodWiser App</h3>
                            <p className="text-slate-500 mb-8 flex-1 leading-relaxed relative z-10">Ongoing daily mindfulness tools for your pocket.</p>
                            <button
                                onClick={() => setShowDownloadModal(true)}
                                className="w-full py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all relative z-10 shadow-sm"
                            >
                                Download ($11/mo)
                            </button>
                        </div>

                        {/* Program Card - Highlighted */}
                        <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-2xl shadow-indigo-900/40 relative overflow-hidden group transform hover:-translate-y-2 transition-transform duration-500">
                            <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-500 to-purple-500 text-[11px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">Best Value</div>

                            {/* Background Accents */}
                            <div className="absolute top-[30%] left-[-20%] w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[60px]"></div>

                            <div className="mb-6 relative">
                                <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center text-4xl shadow-inner backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-500">🎓</div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 relative z-10">21-Day Program</h3>
                            <p className="text-slate-400 mb-8 flex-1 leading-relaxed relative z-10">Lifetime access to the full course. Reset your mind.</p>
                            <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:brightness-110 transition-all shadow-lg shadow-indigo-900/50 relative z-10 overflow-hidden">
                                <span className="relative z-10">Start Now ($27)</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>
                        </div>
                    </div>

                    <div className="mt-24 text-center border-t border-slate-100 pt-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-3">You Don’t Need to Fix Yourself.</h2>
                        <p className="text-slate-500 text-lg">You need space to respond differently.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
