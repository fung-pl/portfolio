import React from 'react';
import { motion } from 'motion/react';
import { ViewMode } from '../types';
import { ArrowLeft, Beaker, Palette, Briefcase, Mail, User } from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
  onOpenNutshell: () => void;
}

export default function Navbar({ currentView, setView, onOpenNutshell }: NavbarProps) {
  const isArtist = currentView === 'artist';
  const isBusiness = currentView === 'business';

  const scientistLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Research', href: '#research' },
    { name: 'Blog', href: '#blog' },
    { name: 'Collaborators', href: '#collaborators' },
    { name: 'Contact', href: '#contact' },
  ];

  const artistLinks = [
    { name: 'About', href: '#about' },
    { name: 'Works', href: '#works' },
    { name: 'Outreach', href: '#outreach' },
    { name: 'Blog', href: '#blog' },
    { name: 'Collaborators', href: '#collaborators' },
    { name: 'Contact', href: '#contact' },
  ];

  const businessLinks = [
    { name: 'Strategy', href: '#strategy' },
    { name: 'Consulting', href: '#consulting' },
    { name: 'Impact', href: '#impact' },
    { name: 'Contact', href: '#contact' },
  ];

  const links = isArtist ? artistLinks : isBusiness ? businessLinks : scientistLinks;

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      <nav className={`w-full backdrop-blur-md border-b transition-colors duration-500 ${
        isArtist ? 'bg-black border-zinc-800 text-white' : 
        isBusiness ? 'bg-amber-50/80 border-amber-200 text-amber-900' :
        'bg-white/80 border-slate-200 text-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto px-[5%] sm:px-[10%] h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-6">
            <button 
              onClick={() => setView('landing')}
              className="group flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-mono tracking-tighter hover:opacity-70 transition-opacity"
            >
              <ArrowLeft size={12} className="sm:w-[14px] group-hover:-translate-x-1 transition-transform" />
              BACK
            </button>
            
            <div className={`h-4 w-px ${isArtist ? 'bg-zinc-800' : isBusiness ? 'bg-amber-200' : 'bg-slate-200'}`} />
            
            <div className="flex items-center gap-2">
              <span className={`text-sm font-sans font-bold tracking-tight whitespace-nowrap ${isArtist ? 'text-white' : isBusiness ? 'text-amber-900' : 'text-slate-900'}`}>
                Dr. Fung
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenNutshell}
              className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all ${
                isArtist 
                  ? 'border-zinc-800 text-zinc-400 hover:border-rose-500 hover:text-rose-500' 
                  : isBusiness
                  ? 'border-amber-200 text-amber-600 hover:border-amber-600 hover:text-amber-700'
                  : 'border-slate-200 text-slate-500 hover:border-emerald-600 hover:text-emerald-600'
              }`}
            >
              <span className="hidden sm:inline">In a nutshell</span>
              <span className="sm:hidden">Info</span>
            </button>

            <button 
              onClick={() => setView('scientist')}
              className={`flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full transition-all ${
                currentView === 'scientist' 
                  ? 'bg-sky-100 text-sky-600' 
                  : isArtist ? 'hover:bg-white/10' : isBusiness ? 'hover:bg-amber-100' : 'hover:bg-slate-100'
              }`}
            >
              <Beaker size={12} />
              <span className="hidden sm:inline">Scientist</span>
              <span className="sm:hidden">SCI</span>
            </button>

            <button 
              onClick={() => setView('artist')}
              className={`flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full transition-all ${
                currentView === 'artist' 
                  ? 'bg-rose-950 text-rose-500' 
                  : isArtist ? 'hover:bg-white/10' : isBusiness ? 'hover:bg-amber-100' : 'hover:bg-slate-100'
              }`}
            >
              <Palette size={12} />
              <span className="hidden sm:inline">Artist</span>
              <span className="sm:hidden">ART</span>
            </button>

            <button 
              onClick={() => setView('business')}
              className={`flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full transition-all ${
                currentView === 'business' 
                  ? 'bg-amber-200 text-amber-900' 
                  : isArtist ? 'hover:bg-white/10' : isBusiness ? 'hover:bg-amber-100' : 'hover:bg-slate-100'
              }`}
            >
              <Briefcase size={12} />
              <span className="hidden sm:inline">Business</span>
              <span className="sm:hidden">BIZ</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Secondary Sub-navigation Header */}
      <div className={`w-full border-b backdrop-blur-sm transition-colors duration-500 ${
        isArtist ? 'bg-black border-zinc-800 text-zinc-400' : 
        isBusiness ? 'bg-amber-50/50 border-amber-200 text-amber-900/60' :
        'bg-slate-50/50 border-slate-200 text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-[10%] h-10 flex items-center justify-center sm:justify-start gap-6 overflow-x-auto scrollbar-hide">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className={`text-[10px] font-mono tracking-widest uppercase whitespace-nowrap transition-colors ${
                isArtist ? 'hover:text-rose-500' : isBusiness ? 'hover:text-amber-600' : 'hover:text-sky-600'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
