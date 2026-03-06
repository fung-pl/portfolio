/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewMode } from './types';
import LandingPage from './components/LandingPage';
import ScientistView from './components/ScientistView';
import ArtistView from './components/ArtistView';
import Navbar from './components/Navbar';

export default function App() {
  const [view, setView] = useState<ViewMode>('landing');
  const [showNutshell, setShowNutshell] = useState(false);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // Handle back button/navigation
  useEffect(() => {
    const handlePopState = () => {
      setView('landing');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSetView = (newView: ViewMode) => {
    if (newView !== 'landing') {
      window.history.pushState({ view: newView }, '');
    }
    setView(newView);
  };

  return (
    <div className="min-h-screen font-sans">
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onSelect={handleSetView} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <Navbar currentView={view} setView={handleSetView} onOpenNutshell={() => setShowNutshell(true)} />
            <main>
              {view === 'scientist' && <ScientistView key="scientist" />}
              {view === 'artist' && <ArtistView key="artist" />}
            </main>
            
            <footer className={`py-12 px-[10%] text-center text-sm ${view === 'artist' ? 'bg-black text-zinc-500' : 'bg-slate-50 text-slate-400'}`}>
              <p>© {new Date().getFullYear()} — Dr. Fung. Built with precision and passion.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* In a Nutshell Overlay */}
      <AnimatePresence>
        {showNutshell && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-zinc-900/95 backdrop-blur-xl overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-2xl w-full bg-zinc-700 border border-zinc-600 p-8 md:p-12 rounded-[2rem] relative shadow-2xl mt-32 mb-12"
            >
              <button 
                onClick={() => setShowNutshell(false)}
                className="absolute top-6 right-6 text-zinc-300 hover:text-white transition-colors p-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-zinc-600 shadow-xl bg-zinc-800 flex items-center justify-center">
                    <img 
                      src="https://picsum.photos/seed/drfung/400/400" 
                      alt="Dr. Fung" 
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-8">
                  <div>
                    <h2 className="text-rose-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">info</h2>
                    <h3 className="text-3xl font-serif italic text-white mb-2">Scientist & Artist</h3>
                    <p className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase">Dr. Fung</p>
                  </div>

                  <div className="space-y-6 text-zinc-200 leading-relaxed text-sm md:text-base">
                    <p>
                      As a <span className="text-emerald-400 font-medium">scientist</span>, I am dedicated to understanding and mitigating the <span className="text-emerald-400 font-medium">environmental impacts</span> of <span className="text-emerald-400 font-medium">urban development</span>. My research focuses on <span className="text-emerald-400 font-medium">air quality modelling</span> and <span className="text-emerald-400 font-medium">traffic emissions</span>, utilizing advanced <span className="text-emerald-400 font-medium">machine learning</span> and <span className="text-emerald-400 font-medium">geospatial analysis</span> to develop <span className="text-emerald-400 font-medium">sustainable solutions</span> for our cities.
                    </p>
                    <p>
                      As an <span className="text-rose-400 font-medium">artist</span>, I translate these complex environmental datasets into <span className="text-rose-400 font-medium">visceral</span>, <span className="text-rose-400 font-medium">theatrical experiences</span>. My work explores the intersection of <span className="text-rose-400 font-medium">data and aesthetics</span>, using <span className="text-rose-400 font-medium">performance art</span> and <span className="text-rose-400 font-medium">kinetic sculpture</span> to make the invisible visible.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
