import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Star, ShieldCheck, MapPin, Search, ExternalLink, Lock } from 'lucide-react';
import { User } from '../App';
import { DiscordLoginLink } from '../components/Layout';

export function HallOfFame({ user }: { user: User | null }) {
  const leaderboard = [
    { rank: 1, name: "NexusPrime", points: 15420, wins: "7x Founder", status: "LEGEND" },
    { rank: 2, name: "Aurelius", points: 12100, wins: "Ultra Marathon", status: "ELITE" },
    { rank: 3, name: "Kora", points: 11850, wins: "Lead Architect", status: "ELITE" },
    { rank: 4, name: "Vanguard", points: 9400, wins: "Content Scale", status: "MEMBER" },
    { rank: 5, name: "EchoOne", points: 8800, wins: "Health Mastery", status: "MEMBER" },
  ];

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-40">
        <div className="max-w-md mx-auto text-center p-12 bg-[#111] border border-border-dark rounded-sm">
          <div className="mb-12 flex justify-center">
             <div className="w-16 h-16 border border-gold-accent rotate-45 flex items-center justify-center">
                <Lock className="w-6 h-6 text-gold-accent rotate-[-45deg]" />
             </div>
          </div>
          <h2 className="text-3xl font-serif italic text-white uppercase tracking-tighter mb-6">Network Locked</h2>
          <p className="text-gray-500 mb-10 leading-relaxed italic text-sm">
            The leaderboard and community vouch system are visible to verified members of the network only.
          </p>
          <DiscordLoginLink fullWidth />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-10 py-16">
      <div className="mb-20 border-b border-white/5 pb-12">
        <h1 className="text-6xl font-serif italic text-white leading-none mb-6">Hall of <span className="text-gold-accent">Fame</span></h1>
        <p className="text-gray-500 max-w-xl text-lg font-light leading-relaxed">
          Celebrating the wins, the milestones, and the high-achieving network that defines our standard.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Rankings */}
        <div className="lg:col-span-2">
           <div className="bg-[#111] border border-border-dark rounded-sm overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                 <h2 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 text-gold-accent font-sans">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Live Leaderboard
                 </h2>
                 <div className="flex items-center gap-3 px-4 py-2 bg-black border border-white/5">
                    <Search className="w-3.5 h-3.5 text-gray-600" />
                    <input type="text" placeholder="QUERY MEMBER..." className="bg-transparent border-none text-[10px] text-white focus:outline-none w-32 placeholder:text-gray-700 tracking-widest font-bold" />
                 </div>
              </div>
              
              <div className="divide-y divide-white/5">
                 {leaderboard.map((member, i) => (
                   <motion.div 
                     key={member.name}
                     initial={{ x: -10, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: i * 0.05 }}
                     className="p-8 flex items-center justify-between hover:bg-white/[0.02] transition-colors group"
                   >
                     <div className="flex items-center gap-8">
                        <span className={`font-serif italic text-2xl w-10 ${member.rank <=3 ? 'text-gold-accent' : 'text-gray-700'}`}>
                          {member.rank.toString().padStart(2, '0')}
                        </span>
                        <div>
                           <div className="flex items-center gap-3 mb-1">
                              <span className="font-bold text-base uppercase tracking-tight text-gray-200 group-hover:text-white transition-colors">{member.name}</span>
                              <ShieldCheck className="w-4 h-4 text-gold-accent/60" />
                           </div>
                           <div className="text-[9px] text-gray-600 uppercase tracking-[0.2em] font-bold">{member.wins}</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-lg font-serif italic tracking-tight text-white mb-1">{member.points.toLocaleString()} <span className="text-[10px] font-sans not-italic font-bold text-gray-600">PTS</span></div>
                        <div className={cn(
                           "text-[9px] font-black px-2 py-0.5 tracking-tighter uppercase",
                           member.status === 'LEGEND' ? 'bg-gold-accent text-black' : 'bg-[#1A1A1A] text-gray-500'
                        )}>
                           {member.status}
                        </div>
                     </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>

        {/* Community Wins Sidebar */}
        <div className="space-y-8">
           <section className="bg-[#111] border border-border-dark p-8 rounded-sm">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-gray-600 pb-4 border-b border-white/5">Live Win Feed</h3>
              <div className="space-y-8">
                 {[
                   { user: "Dante", action: "closed a $50k deal", time: "2h ago" },
                   { user: "Elena", action: "finished 100 days of discipline", time: "5h ago" },
                   { user: "Marcus", action: "launched AI SaaS MVP", time: "8h ago" }
                 ].map((win, i) => (
                   <div key={i} className="flex gap-5 items-start">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-gold-accent shadow-[0_0_8px_rgba(212,175,55,0.4)]"></div>
                      <div>
                         <div className="text-xs font-medium leading-relaxed"><span className="text-gold-accent font-bold uppercase tracking-tight">{win.user}</span> <span className="text-gray-400">{win.action}</span></div>
                         <div className="text-[9px] text-gray-700 mt-2 uppercase tracking-widest font-black">{win.time}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </section>

           <section className="bg-gold-accent/[0.02] border border-gold-accent/10 p-8 rounded-sm text-center group transition-all hover:bg-gold-accent/[0.04]">
              <Medal className="w-10 h-10 text-gold-accent mx-auto mb-8 opacity-40 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xs font-black mb-4 uppercase tracking-[0.3em] text-gray-400">Vouch Directory</h3>
              <p className="text-[10px] text-gray-600 mb-10 leading-relaxed uppercase tracking-tighter font-bold">
                 Browse verified professional skills of fellow members. Exchange value at the highest caliber.
              </p>
              <button className="w-full py-4 bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-gold-accent hover:border-gold-accent/50 transition-all">
                Search Directory
              </button>
           </section>
        </div>
      </div>
    </div>
  );
}
