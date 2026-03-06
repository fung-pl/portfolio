import { motion } from 'motion/react';
import { ViewMode } from '../types';
import { Beaker, Palette, Binary } from 'lucide-react';

interface LandingPageProps {
  onSelect: (view: ViewMode) => void;
}

export default function LandingPage({ onSelect }: LandingPageProps) {
  const scientistSections = [
    { name: 'Education', id: 'education' },
    { name: 'Experience', id: 'experience' },
    { name: 'Research', id: 'research' },
  ];

  const artistSections = [
    { name: 'Works', id: 'works' },
    { name: 'Outreach', id: 'outreach' },
    { name: 'Blog', id: 'blog' },
  ];

  const profilePic = "/images/profile.gif";

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-white relative">
      {/* Top Section (30%) */}
      <div className="h-[30vh] w-full z-30 p-6 md:p-12 bg-zinc-700 border-b border-zinc-600 flex items-center py-10 md:py-12">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto w-full flex justify-between items-center gap-8"
        >
          <div className="flex-1">
            <h1 className="text-[min(11vh,3rem)] md:text-5xl font-sans font-bold tracking-tight text-white mb-1 md:mb-2 leading-none">Dr. Fung</h1>
            <p className="text-xs md:text-sm font-mono tracking-widest text-zinc-300 uppercase">Sustainability Scientist & Data Artist</p>
          </div>
          <div className="flex-shrink-0">
            <div className="w-[min(15vh,4.5rem)] h-[min(15vh,4.5rem)] rounded-full overflow-hidden border-2 border-zinc-500 shadow-xl">
              <img 
                src={profilePic} 
                alt="Dr. Fung" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section (70%) */}
      <div className="h-[70vh] w-full flex flex-col md:flex-row">
        {/* Scientist Side */}
        <motion.div 
          className="relative flex-1 group cursor-pointer overflow-hidden bg-white border-b md:border-b-0 md:border-r border-slate-100"
          whileHover={{ flex: 1.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => onSelect('scientist')}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 z-10 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex mb-6 group-hover:scale-110 transition-transform"
            >
              <div className="p-4 rounded-full bg-emerald-100 text-emerald-600">
                <Beaker size={48} strokeWidth={1.5} />
              </div>
            </motion.div>
            
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <motion.h2 
                className="text-[min(11vh,3rem)] md:text-5xl font-sans font-light tracking-tighter text-slate-900"
                style={{ lineHeight: 1 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                SCIENTIST
              </motion.h2>
              
              {/* Graphic Logo next to word (Mobile only) */}
              <div className="md:hidden">
                <div className="w-[min(10vh,2.5rem)] h-[min(10vh,2.5rem)] rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Beaker size={20} strokeWidth={1.5} />
                </div>
              </div>
            </div>
            
            {/* Sub-sections (hidden on mobile) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden md:flex flex-wrap justify-center gap-3 max-w-sm mt-6"
            >
              {scientistSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect('scientist');
                    setTimeout(() => {
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="px-4 py-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm text-[10px] font-mono tracking-widest uppercase text-slate-500 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all"
                >
                  {sec.name}
                </button>
              ))}
            </motion.div>
          </div>
          
          {/* Background Decorative Elements */}
          <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-5 pointer-events-none hidden md:block">
            <Binary size={400} />
          </div>
        </motion.div>

        {/* Artist Side */}
        <motion.div 
          className="relative flex-1 group cursor-pointer overflow-hidden bg-black"
          whileHover={{ flex: 1.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => onSelect('artist')}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 z-10 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex mb-6 group-hover:scale-110 transition-transform"
            >
              <div className="p-4 rounded-full bg-rose-950 text-rose-500">
                <Palette size={48} strokeWidth={1.5} />
              </div>
            </motion.div>
            
            <div className="flex items-center justify-center gap-4 md:gap-6">
              {/* Graphic Logo next to word (Mobile only) */}
              <div className="md:hidden">
                <div className="w-[min(10vh,2.5rem)] h-[min(10vh,2.5rem)] rounded-full bg-rose-950 flex items-center justify-center text-rose-500">
                  <Palette size={20} strokeWidth={1.5} />
                </div>
              </div>
              
              <motion.h2 
                className="text-[min(11vh,3rem)] md:text-5xl font-serif italic text-white"
                style={{ lineHeight: 1 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                ARTIST
              </motion.h2>
            </div>

            {/* Sub-sections (hidden on mobile) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden md:flex flex-wrap justify-center gap-3 max-w-sm mt-6"
            >
              {artistSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect('artist');
                    setTimeout(() => {
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="px-4 py-2 rounded-full border border-zinc-800 bg-black/50 backdrop-blur-sm text-[10px] font-mono tracking-widest uppercase text-zinc-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all"
                >
                  {sec.name}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500/10 blur-[120px] rounded-full pointer-events-none hidden md:block" />
        </motion.div>
      </div>
    </div>
  );
}
