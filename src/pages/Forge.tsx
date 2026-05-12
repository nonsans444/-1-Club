import React from 'react';
import { motion } from 'motion/react';
import { Library, BookOpen, Clock, FileText, Download, Play, Lock } from 'lucide-react';
import { User } from '../App';
import { DiscordLoginLink } from './Layout';

export function Forge({ user }: { user: User | null }) {
  const resources = [
    {
      category: "Skill Mastery",
      items: [
        { title: "The Python Blueprint", type: "Guide", time: "15 min read", level: "Elite" },
        { title: "High-Ticket Sales Psychology", type: "Workshop", time: "45 min video", level: "Standard" },
        { title: "Content Engine v2.0", type: "Template", time: "Notion", level: "Elite" },
      ]
    },
    {
      category: "The Vault",
      items: [
        { title: "6-Week Hypertrophy Protocol", type: "PDF", time: "Workout", level: "Standard" },
        { title: "Mental Model Toolkit", type: "Guide", time: "10 min read", level: "Standard" },
        { title: "Deep Work Scheduler", type: "Template", time: "Excel", level: "Standard" },
      ]
    }
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
          <h2 className="text-3xl font-serif italic text-white uppercase tracking-tighter mb-6">Access Restricted</h2>
          <p className="text-gray-500 mb-10 leading-relaxed italic text-sm">
            Exclusive resources, templates, and masterclasses are reserved for verified members of the network.
          </p>
          <DiscordLoginLink fullWidth />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-10 py-16">
      <div className="mb-20 border-b border-white/5 pb-12">
        <h1 className="text-6xl font-serif italic text-white leading-none mb-6 italic">The <span className="text-gold-accent">Forge</span></h1>
        <p className="text-gray-500 max-w-xl text-lg font-light leading-relaxed">
          Curated guides, exclusive templates, and deep-dive archives. The weaponization of knowledge for the elite network.
        </p>
      </div>

      <div className="space-y-32">
        {resources.map((section, idx) => (
          <section key={section.category}>
            <div className="flex justify-between items-center mb-10">
               <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-accent">{section.category}</h2>
               <button className="text-[9px] text-gray-500 border-b border-gray-500 hover:text-white hover:border-white transition-colors">VIEW CATEGORY</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#111] border border-border-dark p-8 rounded-sm hover:border-gold-accent/40 transition-all group flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-[9px] bg-[#1A1A1A] border-l-2 border-gold-accent px-3 py-1 text-gray-400 uppercase font-black tracking-widest">
                       {item.type}
                    </div>
                    <span className={cn(
                      "text-[9px] font-black px-2 py-0.5 border uppercase tracking-tighter",
                      item.level === 'Elite' ? 'border-gold-accent text-gold-accent bg-gold-accent/5' : 'border-gray-800 text-gray-600'
                    )}>
                      {item.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 uppercase tracking-tight group-hover:text-gold-accent transition-colors">{item.title}</h3>
                  <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-10 font-bold">
                    EST. Completion: {item.time}
                  </div>
                  <button className="mt-auto w-full flex items-center justify-center gap-3 bg-white/[0.02] hover:bg-gold-accent hover:text-black py-4 border border-white/5 font-bold uppercase tracking-[0.2em] text-[10px] transition-all">
                    Access Asset <Download className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
