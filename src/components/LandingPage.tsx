import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewMode } from '../types';
import { Beaker, Palette, Briefcase, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onSelect: (view: ViewMode) => void;
}

export default function LandingPage({ onSelect }: LandingPageProps) {
  const [hoveredView, setHoveredView] = useState<ViewMode | null>(null);

  const profilePic = `${import.meta.env.BASE_URL}images/profile.gif`.replace('//', '/');

  const views = [
    {
      id: 'scientist' as ViewMode,
      name: 'Scientist',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500',
      borderColor: 'border-emerald-500',
      icon: Beaker,
      position: 'top-0 left-1/2 -translate-x-1/2 -translate-y-[30%]',
      labelPosition: 'bottom-[60%]',
    },
    {
      id: 'artist' as ViewMode,
      name: 'Artist',
      color: 'bg-rose-500',
      textColor: 'text-rose-500',
      borderColor: 'border-rose-500',
      icon: Palette,
      position: 'bottom-0 left-0 -translate-x-[30%] translate-y-[30%]',
      labelPosition: 'top-[45%] right-[20%]',
    },
    {
      id: 'business' as ViewMode,
      name: 'Business',
      color: 'bg-amber-400',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-400',
      icon: Briefcase,
      position: 'bottom-0 right-0 translate-x-[30%] translate-y-[30%]',
      labelPosition: 'top-[45%] left-[20%]',
    },
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden relative">
      {/* Header Section: At least 15% or 100px */}
      <header className="flex justify-between items-center w-full px-8 md:px-16 z-50 min-h-[100px] h-[12vh]">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-slate-100 shadow-sm overflow-hidden bg-white"
        >
          <img 
            src={profilePic} 
            alt="Dr. Fung" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <motion.h1 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-2xl md:text-4xl font-bold tracking-tighter text-slate-900"
        >
          DR. FUNG
        </motion.h1>
      </header>

      {/* Main Circles Area: 20% side margins */}
      <main className="flex-1 relative mx-[20%] flex items-center justify-center">
        {/* Dynamic container for circles - scales with window */}
        <div className="relative w-[min(85vw,75vh)] h-[min(85vw,75vh)]">
          {/* Circles */}
          {views.map((view) => (
            <motion.div
              key={view.id}
              className={`absolute w-full h-full rounded-full ${view.color} mix-blend-multiply opacity-80 cursor-pointer transition-all duration-500 ${view.position}`}
              initial={false}
              animate={{
                scale: hoveredView === view.id ? 1.05 : 1,
                opacity: hoveredView && hoveredView !== view.id ? 0.2 : 0.8,
                zIndex: hoveredView === view.id ? 20 : 10,
              }}
              onMouseEnter={() => setHoveredView(view.id)}
              onMouseLeave={() => setHoveredView(null)}
              onClick={() => onSelect(view.id)}
            >
              {/* Label positioned inside circle but outside overlap */}
              <motion.div 
                animate={{ 
                  scale: hoveredView === view.id ? 1.4 : 1,
                }}
                className={`absolute ${view.labelPosition} flex flex-col items-center text-white pointer-events-none w-full text-center`}
              >
                <view.icon size={36} className="mb-1 opacity-70 mx-auto" />
                <span className="font-mono text-[min(3.15vw,21px)] font-bold tracking-[0.2em] uppercase">{view.name}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Empty Footer for spacing */}
      <footer className="h-[6vh] w-full" />
    </div>
  );
}
