import React from 'react';
import { motion } from 'motion/react';
import { Shield, Hammer, Users, Eye, Zap, FlameIcon } from 'lucide-react';

export function Manifesto() {
  const pillars = [
    {
      title: "Discipline",
      desc: "We prioritize long-term standards over short-term impulses. Discipline is not a punishment, but the ultimate freedom.",
      icon: Shield
    },
    {
      title: "Consistency",
      desc: "Intensity is for amateurs. Consistency is for professionals. We show up even when we don't feel like it.",
      icon: Zap
    },
    {
      title: "Elite Networking",
      desc: "Your network is your barometer. Surround yourself with individuals that force you to level up.",
      icon: Users
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-10 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-32"
      >
        <div className="inline-block mb-12">
           <div className="w-12 h-12 border border-gold-accent rotate-45 flex items-center justify-center">
              <div className="w-6 h-6 bg-gold-accent rotate-[-45deg] flex items-center justify-center">
                 <Shield className="w-3.5 h-3.5 text-black" />
              </div>
           </div>
        </div>
        <h1 className="text-7xl sm:text-9xl font-serif italic text-white leading-none tracking-tighter uppercase mb-10">THE <span className="text-gold-accent italic">MANIFESTO</span></h1>
        <p className="text-xl sm:text-2xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed italic">
          "The 1% mindset is not a destination. It is the relentless pursuit of the standard."
        </p>
      </motion.div>

      <div className="space-y-40">
        {/* Core Pillars */}
        <section>
          <div className="flex items-center justify-between mb-20 pb-6 border-b border-white/5">
             <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-gold-accent">I. THE CORE PILLARS</h2>
             <span className="text-[10px] text-gray-700 uppercase tracking-widest font-bold">EST. FOUNDATION</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {pillars.map((p, i) => (
              <div key={p.title} className="space-y-8">
                <div className="w-10 h-10 border border-gold-accent/20 flex items-center justify-center">
                   <p.icon className="w-5 h-5 text-gold-accent opacity-60" />
                </div>
                <h3 className="text-2xl font-serif italic text-white uppercase tracking-tight">{p.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm font-light">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Rules */}
        <section className="bg-[#111] border border-border-dark p-10 sm:p-20 rounded-sm">
          <div className="flex items-center justify-between mb-20 pb-6 border-b border-white/5">
             <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-gold-accent">II. THE RULES</h2>
             <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-gold-accent"></div>
                <div className="w-1.5 h-1.5 bg-gold-accent/40"></div>
                <div className="w-1.5 h-1.5 bg-gold-accent/10"></div>
             </div>
          </div>
          <div className="space-y-16">
            {[
              "Ego is checked at the door. We learn from everyone.",
              "Confidentiality is absolute. What happens in the forge stays in the forge.",
              "Value must be given before it is taken.",
              "Excuses are discarded in favor of solutions.",
              "Maintaining your status requires active contribution."
            ].map((rule, i) => (
              <div key={i} className="flex gap-10 group">
                <span className="font-serif italic text-4xl text-gray-900 group-hover:text-gold-accent/20 transition-colors">{(i+1).toString().padStart(2, '0')}</span>
                <p className="text-2xl sm:text-3xl font-serif italic text-gray-300 leading-tight pt-1 transition-colors group-hover:text-white uppercase tracking-tighter">{rule}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section className="text-center py-20 border-t border-white/5">
           <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-gold-accent mb-16">III. THE VISION</h2>
           <p className="text-3xl sm:text-5xl font-serif italic leading-tight text-gray-400 max-w-4xl mx-auto italic">
             To build the world's most concentrated node of <span className="text-white font-bold not-italic">human potential</span>. 
             A sanctuary for the elite to grow, build, and conquer the modern world together.
           </p>
           <div className="mt-24">
              <div className="w-12 h-12 border border-white/5 mx-auto flex items-center justify-center">
                 <Shield className="w-6 h-6 text-white/10" />
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
