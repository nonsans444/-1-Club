import React from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowRight, Zap, Target, Users } from 'lucide-react';
import { DiscordLoginLink } from '../components/Layout';
import { User } from '../App';
import { useNavigate } from 'react-router-dom';

export function Landing({ user }: { user: User | null }) {
  const navigate = useNavigate();

  if (user) {
    // Optionally redirect if desired, but landing page is still nice
  }

  const features = [
    {
      title: "Discipline",
      description: "Consistency is the ultimate performance enhancer. We give you the tools to remain steady when motivation fails.",
      icon: Target
    },
    {
      title: "Clarity",
      description: "Cut through the noise. Access curated libraries of high-value knowledge and actionable strategy.",
      icon: Zap
    },
    {
      title: "Network",
      description: "Your environment determines your ceiling. Join a room where everyone is pushing limits.",
      icon: Users
    }
  ];

  return (
    <div className="relative isolate">
      {/* Background elements */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-gold-accent to-[#1A1C1E] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 sm:pt-32 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex justify-center mb-12">
              <div className="px-6 py-2 border-x border-gold-accent/40 text-gold-accent text-[10px] font-bold tracking-[0.4em] uppercase">
                The Standard for High Performers
              </div>
            </div>
            
            <h1 className="text-[12vw] sm:text-[110px] font-serif italic font-black leading-[0.8] tracking-tighter text-white uppercase mb-10">
              ENTER THE <span className="text-gold-accent golden-glow">1%</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-16 font-light">
              The ultimate sanctuary for the disciplined, the skilled, and the relentless.<br className="hidden sm:block" /> 
              Transform your potential into peak performance within our exclusive network.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              {user ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-gold-accent hover:bg-gold-hover text-black px-12 py-5 font-bold uppercase tracking-[0.3em] text-sm transition-all flex items-center gap-3 group"
                >
                  Go to Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <DiscordLoginLink />
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="py-24 sm:py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-10 border border-border-dark bg-[#111] hover:border-gold-accent/20 transition-all group"
              >
                <div className="w-12 h-12 border border-gold-accent flex items-center justify-center mb-10 group-hover:bg-gold-accent group-hover:text-black transition-all">
                  <feature.icon className="w-5 h-5 text-gold-accent group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl font-serif italic mb-4 text-white uppercase tracking-tight group-hover:text-gold-accent transition-colors">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light italic text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-7xl font-serif italic text-gray-300 leading-[1.1] uppercase tracking-tighter">
              "Amateurs stay in their <span className="text-white">comfort zones</span>. Professionals seek the <span className="text-gold-accent">forge</span>."
            </h2>
            <div className="mt-16 flex items-center justify-center gap-4 text-gold-accent">
              <div className="h-px w-12 bg-gold-accent/30"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">The 1% Standard</span>
              <div className="h-px w-12 bg-gold-accent/30"></div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <img 
             src="https://picsum.photos/seed/luxury1pc/1920/1080?grayscale&blur=8" 
             alt="Background Texture" 
             className="w-full h-full object-cover"
             referrerPolicy="no-referrer"
           />
        </div>
      </div>
    </div>
  );
}
