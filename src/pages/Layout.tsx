import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, Library, Trophy, FileText, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from '../App';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  loading: boolean;
}

export function Layout({ children, user, loading }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, protected: true },
    { name: 'The Forge', path: '/forge', icon: Library, protected: true },
    { name: 'Hall of Fame', path: '/leaderboard', icon: Trophy, protected: true },
    { name: 'Manifesto', path: '/manifesto', icon: FileText, protected: false },
  ];

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F8F9FA] flex flex-col">
      <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-gold-accent/20 w-full">
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 border border-gold-accent rotate-45 flex items-center justify-center">
                <div className="w-4 h-4 bg-gold-accent rotate-[-45deg]"></div>
              </div>
              <span className="font-serif italic text-2xl tracking-tighter ml-2 uppercase">THE <span className="text-gold-accent">1%</span> CLUB</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-[11px] uppercase tracking-[0.2em] font-semibold transition-all hover:text-white pb-1",
                  location.pathname === item.path ? "text-gold-accent border-b border-gold-accent" : "text-gray-400"
                )}
              >
                {item.name}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-1">Status: Member</p>
                  <p className="text-xs font-bold text-white uppercase">{user.username}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-gold-accent/50 bg-[#1A1A1A] overflow-hidden flex items-center justify-center">
                  <img
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                    alt={user.username}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <DiscordLoginLink />
            )}
          </div>

          {/* Mobile bridge */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 bg-[#0a0a0a] overflow-y-auto max-h-[calc(100vh-5rem)]"
            >
              <div className="px-4 py-8 space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 text-xl uppercase tracking-[0.2em] font-bold p-2",
                      location.pathname === item.path ? "text-gold-accent" : "text-gray-400"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                ))}
                {!user ? (
                  <div className="pt-6 border-t border-white/5">
                    <DiscordLoginLink fullWidth />
                  </div>
                ) : (
                  <div className="pt-6 border-t border-white/5">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-4 text-xl uppercase tracking-[0.2em] font-bold p-2 text-red-500"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="h-16 px-4 sm:px-10 border-t border-white/5 flex items-center justify-between bg-black text-[9px] uppercase tracking-[0.3em] text-gray-600 relative z-10 w-full mt-auto">
        <div className="hidden sm:block">&copy; 2024 THE 1% CLUB. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-6 flex-wrap justify-center sm:justify-end w-full sm:w-auto">
          <span className="text-gold-accent">Discipline</span>
          <span>Consistency</span>
          <span>Elite Networking</span>
          <a href="https://discord.gg/c54aSUp4dE" target="_blank" rel="noreferrer" className="hover:text-white">Discord</a>
        </div>
      </footer>
    </div>
  );
}

export function DiscordLoginLink({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <a
      href="https://discord.gg/c54aSUp4dE"
      target="_blank"
      rel="noreferrer"
      className={cn(
        "bg-gold-accent hover:bg-gold-hover text-black px-10 py-4 font-bold uppercase tracking-[0.3em] text-[10px] transition-colors flex items-center justify-center gap-3",
        fullWidth && "w-full"
      )}
    >
      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
      </svg>
      JOIN THE 1 PERCENT
    </a>
  );
}
