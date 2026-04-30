import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';

// Components (fixed path)
import Navbar from '../Components/Common/Navbar';

// Icons
import { Search, BookOpen, MessageSquare, ArrowRight, FileText, Settings, User, CreditCard, X } from "lucide-react";

const Support = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // --- Configuration ---
    const WHATSAPP_NUMBER = "917017909119"; // Apna number yahan country code ke sath likhein
    const SUPPORT_EMAIL = "support@yournursery.com";

    const categories = [
        { title: "Getting Started", icon: <User size={24} />, count: "12 Articles", desc: "Learn account setup and basics." },
        { title: "Orders & Shipping", icon: <CreditCard size={24} />, count: "18 Articles", desc: "Track your plant delivery status." },
        { title: "Plant Care", icon: <FileText size={24} />, count: "25 Articles", desc: "Expert tips for healthy plants." },
        { title: "Account Settings", icon: <Settings size={24} />, count: "10 Articles", desc: "Manage privacy and preferences." },
    ];

    // --- Functional Handlers ---
    const handleWhatsApp = () => {
        const message = encodeURIComponent("Hi Nursery Support! I need some help with...");
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    };

    const handleEmail = () => {
        window.location.href = `mailto:${SUPPORT_EMAIL}?subject=Support Request`;
    };

    // Filter Logic
    const filteredCategories = categories.filter(cat =>
        cat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#f0f9f4] text-gray-800 font-sans selection:bg-green-100">
            <Navbar />

            <main className="pt-40 pb-20 px-6 lg:px-16 max-w-[1200px] mx-auto">

                {/* 1. HERO SEARCH SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tight">
                        Hi, how can we <span className="text-green-600">help you?</span>
                    </h1>
                    <p className="text-gray-500 text-lg mb-8">Search our knowledge base or browse categories below.</p>

                    <div className="max-w-2xl mx-auto relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for articles, guides, and more..."
                            className="w-full bg-white border border-green-100 rounded-3xl py-6 pl-16 pr-14 shadow-xl shadow-green-900/5 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-lg"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* 2. QUICK ACTION CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <div className="group bg-white p-10 rounded-[2.5rem] border border-green-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                            <BookOpen size={28} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-3 uppercase tracking-tight">Browse articles</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">Explore How-To's and learn best practices from our extensive knowledge base.</p>
                        <button className="flex items-center space-x-2 text-green-600 font-bold uppercase text-[10px] tracking-widest group/btn">
                            <span>Go to Knowledge Base</span>
                            <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                        </button>
                    </div>

                    <div className="group bg-white p-10 rounded-[2.5rem] border border-green-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                            <MessageSquare size={28} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-3 uppercase tracking-tight">WhatsApp Support</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">Chat directly with our botanical experts for instant help and order updates.</p>
                        <button
                            onClick={handleWhatsApp}
                            className="flex items-center space-x-2 text-emerald-600 font-bold uppercase text-[10px] tracking-widest group/btn"
                        >
                            <span>Chat on WhatsApp</span>
                            <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* 3. KNOWLEDGE BASE CATEGORIES */}
                <section>
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h3 className="text-sm font-black text-green-600 uppercase tracking-[0.3em] mb-2">General Support</h3>
                            <h2 className="text-3xl font-black text-gray-900">Knowledge base</h2>
                        </div>
                        <button className="text-gray-400 hover:text-green-600 font-bold text-sm transition-colors">View all articles</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <AnimatePresence mode='popLayout'>
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((cat, idx) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        key={cat.title}
                                        className="bg-white/60 backdrop-blur-md border border-white p-8 rounded-3xl hover:bg-white hover:shadow-lg transition-all cursor-pointer group"
                                    >
                                        <div className="text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                                            {cat.icon}
                                        </div>
                                        <h4 className="font-black text-gray-900 mb-1">{cat.title}</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">{cat.count}</p>
                                        <p className="text-xs text-gray-500 line-clamp-2">{cat.desc}</p>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full text-center py-10 text-gray-400 font-bold uppercase tracking-widest"
                                >
                                    No articles found for "{searchQuery}"
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* 4. FOOTER SUPPORT BANNER */}
                <div className="mt-24 bg-gray-900 rounded-[3rem] p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full"></div>
                    <div className="relative z-10 text-center lg:text-left">
                        <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 italic">Still need help?</h2>
                        <p className="text-white/50 max-w-md">Our botanical experts are available 24/7 to help you with your green journey.</p>
                    </div>
                    <div className="relative z-10 flex flex-wrap justify-center gap-4">
                        <button
                            onClick={handleWhatsApp}
                            className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-green-500 transition-all shadow-xl shadow-green-900/40 active:scale-95"
                        >
                            Chat with us
                        </button>
                        <a
                            href="mailto:singhbrijveer92@gmail.com"
                            className="bg-white/10 text-white border border-white/10 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/20 transition-all active:scale-95"
                        >
                            Contact Email
                        </a>
                    </div>
                </div>

            </main>

        </div>
    );
};

export default Support;