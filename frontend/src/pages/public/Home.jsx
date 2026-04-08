import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Shield, CheckCircle, Utensils, Lock } from 'lucide-react';
import Hostels from '../Hostels';
import FacilitiesSection from '../../components/FacilitiesSection';
import FoodMenuSection from '../../components/FoodMenuSection';
import FAQSection from '../../components/FAQSection';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            
            <section className="bg-[#0f172a] text-white pt-24 pb-20 lg:pt-32 lg:pb-32 px-4 overflow-hidden relative">
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
                    <div className="absolute inset-0 rounded-full bg-primary blur-[120px]"></div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
                    <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="inline-flex items-center gap-2.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 text-primary mb-6 backdrop-blur-sm">
                            <span className="flex h-1.5 w-1.5 relative">
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                            </span>
                            <span className="text-xs sm:text-[13px] font-bold tracking-wider uppercase">Designed for modern hostel management</span>
                        </div>
                        
                        <h1 className="text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5">
                            Student Hostel Living. 
                            <br className="hidden sm:block" />
                            Managed in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">One App.</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed font-medium mb-8">
                            Room info, daily meal menus, official notices, and maintenance tracking—everything you need for daily hostel operations in one secure place.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full sm:w-auto">
                            <Link to="/hostels" className="w-full sm:w-auto focus:outline-none">
                                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-blue-600 text-base font-bold px-8 h-14 rounded-xl shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] transition-all">
                                    Explore Hostels
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link to="/login" className="w-full sm:w-auto focus:outline-none">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white text-base font-bold px-8 h-14 rounded-xl backdrop-blur-sm shadow-sm transition-all">
                                    Student Portal
                                </Button>
                            </Link>
                        </div>
                        
                    
                        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 text-[13px] sm:text-sm font-medium text-slate-400 mt-2">
                            <div className="flex items-center gap-1.5">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span className="text-slate-300">Verified Hostel Spaces</span>
                            </div>
                            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-700"></div>
                            <div className="flex items-center gap-1.5">
                                <Utensils className="w-4 h-4 text-amber-500" />
                                <span className="text-slate-300">Daily Meal Plans</span>
                            </div>
                            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-700"></div>
                            <div className="flex items-center gap-1.5">
                                <Lock className="w-4 h-4 text-blue-500" />
                                <span className="text-slate-300">Secure Student Access</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:w-1/2 w-full mt-16 lg:mt-0">
                    
                        <div className="relative w-full max-w-lg mx-auto lg:max-w-none mb-10 lg:mb-0">
                            
                            <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-blue-500 rounded-[2.5rem] blur-2xl opacity-20 transform -rotate-3"></div>
                            
                            
                            <div className="relative flex justify-end items-end h-[400px] sm:h-[450px] lg:h-[550px] rounded-[2rem]">
                                
                                
                                <div className="absolute inset-0 bg-slate-900/20 rounded-[2rem] border border-white/10 overflow-hidden shadow-xl backdrop-blur-sm z-0">
                                    <img 
                                        src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80" 
                                        alt="Modern premium student hostel room interior" 
                                        className="w-full h-full object-cover"
                                    />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent"></div>
                                </div>

                                
                                <div className="relative z-10 w-[85%] sm:w-[75%] lg:w-[80%] xl:w-[70%] bg-slate-900/30 border border-white/5 backdrop-blur-2xl rounded-2xl shadow-xl shadow-black/10 p-5 sm:p-6 -mb-6 -mr-2 sm:-mr-6 lg:-mb-8 lg:-mr-10 transform hover:scale-[1.02] transition-transform duration-500">
                                    
                                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 overflow-hidden ring-2 ring-slate-900/50">
                                                <img src="https://i.pravatar.cc/100?img=11" alt="Student Profile" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="text-white text-[15px] font-bold tracking-tight">Hostello Dashboard</h3>
                                                <p className="text-slate-400 text-xs mt-0.5">Room 102 • Your Space 1</p>
                                            </div>
                                        </div>
                                        <div className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-md hidden sm:block">
                                            <span className="text-primary text-[10px] font-bold uppercase tracking-wider">Active</span>
                                        </div>
                                    </div>

                                    
                                    <div className="space-y-4">
                                        
                                        <div className="flex justify-between items-center rounded-xl transition-all">
                                            <div className="flex items-center gap-3.5">
                                                <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/10"><svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg></div>
                                                <span className="text-slate-300 text-[13px] font-medium">Today's Menu</span>
                                            </div>
                                            <span className="text-white text-[13px] font-semibold">Veg Menu</span>
                                        </div>
                                        
                                        
                                        <div className="flex justify-between items-center rounded-xl transition-all">
                                            <div className="flex items-center gap-3.5">
                                                <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/10"><svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg></div>
                                                <span className="text-slate-300 text-[13px] font-medium">Latest Notice</span>
                                            </div>
                                            <span className="text-white text-[13px] font-semibold truncate max-w-[120px]" title="Water Supply Timing">Water Timing Up...</span>
                                        </div>
                                        
                                        
                                        <div className="flex justify-between items-center rounded-xl transition-all">
                                            <div className="flex items-center gap-3.5">
                                                <div className="bg-amber-500/10 p-2 rounded-lg border border-amber-500/10"><svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></div>
                                                <span className="text-slate-300 text-[13px] font-medium">Complaint Status</span>
                                            </div>
                                            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">In Progress</span>
                                        </div>
                                        
                                        
                                        <div className="h-11 mt-6 w-full bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl flex items-center justify-center cursor-pointer transition-all">
                                            <span className="text-primary text-[13px] font-bold">View Dashboard</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <div id="hostels-section" className="-mt-16">
                <Hostels />
            </div>

            <FacilitiesSection />
            
            <FoodMenuSection />
            <FAQSection />


        </div>
    );
};

export default Home;
