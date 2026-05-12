import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, TrendingUp, Users, Radio, Calendar, Trophy, ChevronRight, Target, Library } from 'lucide-react';
import { User } from '../App';
import { DiscordLoginLink } from './Layout';

interface Stats {
  memberCount: number;
  activeVoice: number;
  onlineNow: number;
}

export function Dashboard({ user }: { user: User | null }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [goals, setGoals] = useState([
    { id: 1, text: "Physical Training Session", completed: false, category: "Fitness" },
    { id: 2, text: "60 Min Focused Skill Work", completed: false, category: "Skill" },
    { id: 3, text: "30 Min Mindset/Reading", completed: false, category: "Mindset" },
    { id: 4, text: "Review Weekly Targets", completed: false, category: "Clarity" },
  ]);

  useEffect(() => {
    fetch('/api/community/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const toggleGoal = (id: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Restricted Access</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The Dashboard is the central hub for the 1% Club. 
          You must verify your identity to access live stats and personal tools.
        </p>
        <DiscordLoginLink />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-10 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16 border-b border-white/5 pb-10">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gold-accent/20 blur-xl rounded-full"></div>
            <img
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              alt={user.username}
              className="relative w-20 h-20 border border-gold-accent p-1 bg-black"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="text-4xl font-serif italic text-white leading-none mb-2">Welcome, <span className="text-gold-accent">{user.username}</span></h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">Status: Elite • Efficiency Loop: Level 7</p>
          </div>
        </div>
        
        {stats && (
          <div className="flex gap-10">
            <div className="text-center">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Members</div>
              <div className="text-2xl font-serif italic text-white">{stats.memberCount.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1 flex items-center gap-2 justify-center">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Live
              </div>
              <div className="text-2xl font-serif italic text-white">{stats.activeVoice}</div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Discipline Checklist */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-[#111] border border-border-dark p-8 rounded-sm shadow-xl">
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-accent flex items-center gap-3">
                <div className="w-4 h-4 border border-gold-accent flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-gold-accent"></div>
                </div>
                Personal Goals
              </h2>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                {new Date().toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '.')}
              </span>
            </div>
            
            <div className="space-y-6">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className="w-full flex items-center justify-between group py-1"
                >
                  <div className="flex items-center gap-5 text-left">
                    <div className={cn(
                      "w-6 h-6 border transition-all flex items-center justify-center",
                      goal.completed ? "border-gold-accent bg-gold-accent/10" : "border-gray-700 bg-transparent group-hover:border-gray-500"
                    )}>
                      {goal.completed && <div className="w-2.5 h-2.5 bg-gold-accent shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>}
                    </div>
                    <div>
                      <div className={cn(
                        "text-sm uppercase tracking-wide font-bold transition-colors",
                        goal.completed ? "text-white" : "text-gray-500 group-hover:text-gray-400"
                      )}>
                        {goal.text}
                      </div>
                      <div className="text-[9px] text-gray-700 uppercase tracking-widest font-bold mt-1">
                        Category: {goal.category}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-all opacity-0 group-hover:opacity-100",
                    goal.completed ? "text-gold-accent" : "text-gray-600"
                  )} />
                </button>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/5">
               <div className="h-1.5 w-full bg-[#222] rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${(goals.filter(g => g.completed).length / goals.length) * 100}%` }}
                   className="h-full bg-gold-accent shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                 />
               </div>
               <div className="flex justify-between mt-3">
                 <span className="text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em]">Consistency Index</span>
                 <span className="text-[9px] text-gold-accent font-black uppercase tracking-widest">
                   {Math.round((goals.filter(g => g.completed).length / goals.length) * 100)}% Complete
                 </span>
               </div>
            </div>
          </section>

          {/* Activity Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/forge" className="bg-[#111] border border-border-dark p-8 rounded-sm group hover:border-gold-accent/30 transition-all flex flex-col h-48">
               <div className="flex justify-between items-start mb-6">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-accent">The Forge Assets</h3>
                 <Library className="w-5 h-5 text-gray-700 group-hover:text-gold-accent transition-colors" />
               </div>
               <p className="text-xs text-gray-500 mb-8 leading-relaxed italic">Access exclusive high-value repositories for verified members.</p>
               <div className="mt-auto text-[9px] text-gray-400 border-b border-gray-400 self-start">ENTER VAULT</div>
            </Link>
            
            <Link to="/leaderboard" className="bg-[#111] border border-border-dark p-8 rounded-sm group hover:border-gold-accent/30 transition-all flex flex-col h-48">
               <div className="flex justify-between items-start mb-6">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-accent">Hall of Fame</h3>
                 <Trophy className="w-5 h-5 text-gray-700 group-hover:text-gold-accent transition-colors" />
               </div>
               <p className="text-xs text-gray-500 mb-8 leading-relaxed italic">See where you stand among the top performers globally.</p>
               <div className="mt-auto text-[9px] text-gray-400 border-b border-gray-400 self-start">VIEW RANKINGS</div>
            </Link>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           <section className="bg-[#111] border border-border-dark rounded-sm p-8">
             <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-10 pb-4 border-b border-white/5">Upcoming Masterclass</h3>
             <div className="space-y-10">
               <div className="flex gap-6 group">
                 <div className="flex-shrink-0 w-14 h-14 border border-gold-accent/20 bg-white/[0.02] flex flex-col items-center justify-center relative">
                   <div className="absolute -top-1 -left-1 w-2 h-2 bg-gold-accent"></div>
                   <span className="text-[9px] text-gray-600 font-bold uppercase leading-none mb-1">05/15</span>
                   <span className="text-lg font-serif italic text-white">X</span>
                 </div>
                 <div>
                   <div className="text-xs font-black text-white uppercase tracking-wider mb-1">MW Wealth Ops</div>
                   <div className="text-[10px] text-gray-600 uppercase tracking-widest">Voice • 18:00 UTC</div>
                 </div>
               </div>
               
               <div className="flex gap-6 group">
                 <div className="flex-shrink-0 w-14 h-14 border border-gold-accent/20 bg-white/[0.02] flex flex-col items-center justify-center relative">
                   <div className="absolute -top-1 -left-1 w-2 h-2 bg-gold-accent"></div>
                   <span className="text-[9px] text-gray-600 font-bold uppercase leading-none mb-1">05/22</span>
                   <span className="text-lg font-serif italic text-white">N</span>
                 </div>
                 <div>
                   <div className="text-xs font-black text-white uppercase tracking-wider mb-1">Networking Night</div>
                   <div className="text-[10px] text-gray-600 uppercase tracking-widest">Regional Hubs</div>
                 </div>
               </div>
             </div>
           </section>

           <section className="p-8 border border-gold-accent/10 bg-gold-accent/[0.02] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-20 h-20 bg-gold-accent/5 blur-3xl rounded-full"></div>
             <div className="relative z-10">
               <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-gold-accent mb-6">Efficiency Pulse</h4>
               <p className="text-xs text-gray-400 leading-relaxed italic font-light">
                 "Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus."
               </p>
               <div className="mt-8 pt-6 border-t border-gold-accent/10 text-[8px] text-gray-600 uppercase tracking-[0.3em]">
                 RECOMMIT TO THE MISSION
               </div>
             </div>
           </section>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
