import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Eye, BookOpen } from 'lucide-react';

interface StatsWidgetProps {
  view: 'scientist' | 'artist' | 'business';
}

export default function StatsWidget({ view }: StatsWidgetProps) {
  const [stats, setStats] = useState<{ views: number; citations: number } | null>(null);

  useEffect(() => {
    // Increment views on mount
    const incrementViews = async () => {
      try {
        await fetch('/api/increment-views', { method: 'POST' });
        const res = await fetch('/api/stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };

    incrementViews();
  }, []);

  if (!stats) return null;

  const isScientist = view === 'scientist';
  const isBusiness = view === 'business';
  
  const bgColor = isScientist ? 'bg-white/80' : isBusiness ? 'bg-amber-50/80' : 'bg-zinc-900/80';
  const borderColor = isScientist ? 'border-slate-200' : isBusiness ? 'border-amber-100' : 'border-zinc-800';
  const textColor = isScientist ? 'text-slate-600' : isBusiness ? 'text-amber-800/60' : 'text-zinc-400';
  const accentColor = isScientist ? 'text-emerald-600' : isBusiness ? 'text-amber-600' : 'text-rose-500';
  const valueColor = isScientist ? 'text-slate-900' : isBusiness ? 'text-amber-900' : 'text-white';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed bottom-8 right-8 z-50 flex items-center gap-6 px-6 py-3 rounded-full border ${borderColor} ${bgColor} backdrop-blur-md shadow-lg`}
    >
      <div className="flex items-center gap-2">
        <Eye size={16} className={accentColor} />
        <div className="flex flex-col">
          <span className={`text-[10px] font-mono uppercase tracking-widest ${textColor}`}>Views</span>
          <span className={`text-sm font-bold ${valueColor}`}>{stats.views.toLocaleString()}</span>
        </div>
      </div>
      
      <div className={`w-px h-8 ${isScientist ? 'bg-slate-200' : isBusiness ? 'bg-amber-200' : 'bg-zinc-800'}`} />
      
      <a 
        href="https://scholar.google.com/citations?user=AGbCZG4AAAAJ&hl=en" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <BookOpen size={16} className={accentColor} />
        <div className="flex flex-col">
          <span className={`text-[10px] font-mono uppercase tracking-widest ${textColor}`}>Citations</span>
          <span className={`text-sm font-bold ${valueColor}`}>{stats.citations.toLocaleString()}</span>
        </div>
      </a>
    </motion.div>
  );
}
