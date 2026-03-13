import { motion } from 'motion/react';
import { Briefcase, Mail, Calendar, Linkedin, ExternalLink } from 'lucide-react';
import StatsWidget from './StatsWidget';

export default function BusinessView() {
  return (
    <div className="bg-amber-50 min-h-screen pb-20 px-[10%]">
      <section className="max-w-7xl mx-auto pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-amber-600 font-mono text-sm tracking-widest uppercase mb-6 block">Business & Sustainability Strategy</span>
          <h1 className="text-5xl md:text-6xl font-sans font-bold text-slate-900 mb-8 leading-tight">
            Driving <span className="text-amber-600">Impact</span> through Systems Change.
          </h1>
          <p className="max-w-2xl text-xl text-slate-600 leading-relaxed mb-10">
            Bridging the gap between scientific insight and corporate sustainability. 
            Helping organizations navigate complex environmental challenges with data-driven strategies.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100">
              <h3 className="text-lg font-bold mb-4">Sustainability Consulting</h3>
              <p className="text-sm text-slate-500">Strategic guidance on carbon roadmaps and environmental compliance.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100">
              <h3 className="text-lg font-bold mb-4">Data-Driven Insights</h3>
              <p className="text-sm text-slate-500">Leveraging air quality and traffic data for smarter urban solutions.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100">
              <h3 className="text-lg font-bold mb-4">Systems Thinking</h3>
              <p className="text-sm text-slate-500">Applying holistic approaches to solve complex organizational challenges.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <a href="https://calendar.app.google/B5RbC99xpbNb7aBR6" target="_blank" className="bg-amber-600 text-white px-8 py-4 rounded-full font-mono text-xs font-bold tracking-widest hover:bg-amber-700 transition-colors flex items-center gap-2">
              <Calendar size={14} /> SCHEDULE CONSULTATION
            </a>
            <a href="https://www.linkedin.com/in/alan-pak-lun-fung/" target="_blank" className="border border-amber-200 text-amber-900 px-8 py-4 rounded-full font-mono text-xs font-bold tracking-widest hover:bg-amber-100 transition-colors flex items-center gap-2">
              <Linkedin size={14} /> CONNECT ON LINKEDIN
            </a>
          </div>
        </motion.div>
      </section>
      <StatsWidget view="scientist" />
    </div>
  );
}
